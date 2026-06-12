-- Migration 005: Usage Tracking
-- Tracks all user actions and resource usage with monthly partitioning

-- Usage logs table (partitioned by month)
CREATE TABLE IF NOT EXISTS public.usage_logs (
  id UUID DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Action details
  action_type TEXT NOT NULL,
  action_name TEXT NOT NULL,
  credits_used BIGINT NOT NULL CHECK (credits_used >= 0),

  -- Resource tracking
  resource_type TEXT,
  resource_id TEXT,

  -- Request details
  request_metadata JSONB,
  response_metadata JSONB,

  -- Status and error tracking
  status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failed', 'partial')),
  error_message TEXT,

  -- Performance tracking
  duration_ms INTEGER,

  -- Transaction reference
  credit_transaction_id UUID REFERENCES public.credit_transactions(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Partitioning key
  CONSTRAINT usage_logs_pkey PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create initial partitions (current month + next 2 months)
DO $$
DECLARE
  partition_date DATE;
  partition_name TEXT;
  start_date TEXT;
  end_date TEXT;
BEGIN
  FOR i IN 0..2 LOOP
    partition_date := DATE_TRUNC('month', CURRENT_DATE + (i || ' months')::INTERVAL);
    partition_name := 'usage_logs_' || TO_CHAR(partition_date, 'YYYY_MM');
    start_date := partition_date::TEXT;
    end_date := (partition_date + INTERVAL '1 month')::TEXT;

    EXECUTE format(
      'CREATE TABLE IF NOT EXISTS public.%I PARTITION OF public.usage_logs
       FOR VALUES FROM (%L) TO (%L)',
      partition_name, start_date, end_date
    );
  END LOOP;
END $$;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON public.usage_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_logs_action_type ON public.usage_logs(action_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_logs_status ON public.usage_logs(status) WHERE status != 'success';
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON public.usage_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only view their own usage logs
CREATE POLICY "Users can view own usage logs"
  ON public.usage_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all usage logs (for backend operations)
CREATE POLICY "Service role can manage all usage logs"
  ON public.usage_logs
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Function to automatically create next month's partition
CREATE OR REPLACE FUNCTION public.create_next_usage_logs_partition()
RETURNS void AS $$
DECLARE
  next_month DATE;
  partition_name TEXT;
  start_date TEXT;
  end_date TEXT;
BEGIN
  next_month := DATE_TRUNC('month', CURRENT_DATE + INTERVAL '3 months');
  partition_name := 'usage_logs_' || TO_CHAR(next_month, 'YYYY_MM');
  start_date := next_month::TEXT;
  end_date := (next_month + INTERVAL '1 month')::TEXT;

  EXECUTE format(
    'CREATE TABLE IF NOT EXISTS public.%I PARTITION OF public.usage_logs
     FOR VALUES FROM (%L) TO (%L)',
    partition_name, start_date, end_date
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log usage
CREATE OR REPLACE FUNCTION public.log_usage(
  p_user_id UUID,
  p_action_type TEXT,
  p_action_name TEXT,
  p_credits_used BIGINT,
  p_credit_transaction_id UUID DEFAULT NULL,
  p_resource_type TEXT DEFAULT NULL,
  p_resource_id TEXT DEFAULT NULL,
  p_request_metadata JSONB DEFAULT NULL,
  p_response_metadata JSONB DEFAULT NULL,
  p_status TEXT DEFAULT 'success',
  p_error_message TEXT DEFAULT NULL,
  p_duration_ms INTEGER DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO public.usage_logs (
    user_id,
    action_type,
    action_name,
    credits_used,
    credit_transaction_id,
    resource_type,
    resource_id,
    request_metadata,
    response_metadata,
    status,
    error_message,
    duration_ms,
    created_at
  )
  VALUES (
    p_user_id,
    p_action_type,
    p_action_name,
    p_credits_used,
    p_credit_transaction_id,
    p_resource_type,
    p_resource_id,
    p_request_metadata,
    p_response_metadata,
    p_status,
    p_error_message,
    p_duration_ms,
    NOW()
  )
  RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE public.usage_logs IS 'Usage tracking logs partitioned by month for performance';
COMMENT ON COLUMN public.usage_logs.credits_used IS 'Credits consumed by this action * 100';
COMMENT ON COLUMN public.usage_logs.duration_ms IS 'Action duration in milliseconds for performance tracking';
