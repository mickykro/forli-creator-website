import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_BEeWRyRY.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { $ as $$Dashboard } from './Dashboard_9y6MD7SZ.mjs';
import { $ as $$KPICard } from './KPICard_gYxcjPeQ.mjs';
import { $ as $$UsageChart } from './UsageChart_CTUotKAx.mjs';

const $$Index2 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Dashboard", "activeNav": "dashboard" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="kpi-grid"> ${renderComponent($$result2, "KPICard", $$KPICard, { "title": "Monthly Recurring Revenue", "value": "0", "prefix": "₪", "icon": "revenue", "change": 0 })} ${renderComponent($$result2, "KPICard", $$KPICard, { "title": "Active Subscribers", "value": "0", "icon": "subscriptions", "change": 0 })} ${renderComponent($$result2, "KPICard", $$KPICard, { "title": "Trial Users", "value": "0", "icon": "users", "change": 0 })} ${renderComponent($$result2, "KPICard", $$KPICard, { "title": "This Month Revenue", "value": "0", "prefix": "₪", "icon": "revenue", "change": 0 })} </div>  <div class="admin-grid admin-grid-2"> <div class="card"> <div class="card-header"> <div> <h3 class="card-title">Revenue Trend</h3> <p class="card-subtitle">Last 30 days</p> </div> <select class="admin-input admin-select" id="revenuePeriod" style="width: auto;"> <option value="30">Last 30 days</option> <option value="90">Last 90 days</option> <option value="365">Last year</option> </select> </div> ${renderComponent($$result2, "UsageChart", $$UsageChart, { "id": "revenueChart", "chartType": "line" })} </div> <div class="card"> <div class="card-header"> <div> <h3 class="card-title">Subscription Distribution</h3> <p class="card-subtitle">By tier</p> </div> </div> ${renderComponent($$result2, "UsageChart", $$UsageChart, { "id": "subscriptionChart", "chartType": "doughnut", "height": 260 })} </div> </div>  <div class="admin-grid admin-grid-2" style="margin-top: 24px;"> <!-- Recent Payments --> <div class="card"> <div class="card-header"> <div> <h3 class="card-title">Recent Payments</h3> <p class="card-subtitle">Last 10 transactions</p> </div> <a href="/admin/purchases" class="admin-btn admin-btn-sm admin-btn-secondary">View All</a> </div> <table class="admin-table" id="recentPaymentsTable"> <thead> <tr> <th>User</th> <th>Type</th> <th>Amount</th> <th>Date</th> </tr> </thead> <tbody> <tr> <td colspan="4" style="text-align: center; color: var(--admin-text-muted); padding: 24px;">
Loading...
</td> </tr> </tbody> </table> </div> <!-- Top Users by Credit Usage --> <div class="card"> <div class="card-header"> <div> <h3 class="card-title">Top Users by Credits</h3> <p class="card-subtitle">This month</p> </div> <a href="/admin/usage" class="admin-btn admin-btn-sm admin-btn-secondary">View All</a> </div> <table class="admin-table" id="topUsersTable"> <thead> <tr> <th>User</th> <th>Credits Used</th> <th>Actions</th> </tr> </thead> <tbody> <tr> <td colspan="3" style="text-align: center; color: var(--admin-text-muted); padding: 24px;">
Loading...
</td> </tr> </tbody> </table> </div> </div> ` })} ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/index 2.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/index 2.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/index 2.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/index 2.astro";
const $$url = "/admin/index 2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
