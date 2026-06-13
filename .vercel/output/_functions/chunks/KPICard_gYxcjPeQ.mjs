import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { m as maybeRenderHead, u as unescapeHTML, h as addAttribute, r as renderTemplate } from './entrypoint_BEeWRyRY.mjs';
import 'clsx';

const $$KPICard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$KPICard;
  const { title, value, change, icon = "revenue", prefix = "", suffix = "" } = Astro2.props;
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const icons = {
    revenue: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    subscriptions: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    credits: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M6 12h12"/></svg>`
  };
  return renderTemplate`${maybeRenderHead()}<div class="kpi-card" data-astro-cid-bjnbk25s> <div class="kpi-header" data-astro-cid-bjnbk25s> <span class="kpi-icon" data-astro-cid-bjnbk25s>${unescapeHTML(icons[icon])}</span> <span class="kpi-title" data-astro-cid-bjnbk25s>${title}</span> </div> <div class="kpi-value" data-astro-cid-bjnbk25s> ${prefix}<span class="kpi-number" data-astro-cid-bjnbk25s>${value}</span>${suffix} </div> ${change !== void 0 && renderTemplate`<div${addAttribute(["kpi-change", { positive: isPositive, negative: isNegative }], "class:list")} data-astro-cid-bjnbk25s> ${isPositive && renderTemplate`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-bjnbk25s> <polyline points="18 15 12 9 6 15" data-astro-cid-bjnbk25s></polyline> </svg>`} ${isNegative && renderTemplate`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-bjnbk25s> <polyline points="6 9 12 15 18 9" data-astro-cid-bjnbk25s></polyline> </svg>`} <span data-astro-cid-bjnbk25s>${Math.abs(change)}%</span> <span class="kpi-change-label" data-astro-cid-bjnbk25s>vs last month</span> </div>`} </div>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/admin/KPICard.astro", void 0);

export { $$KPICard as $ };
