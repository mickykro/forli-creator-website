import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_BEeWRyRY.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { $ as $$Dashboard } from './Dashboard_9y6MD7SZ.mjs';
import { $ as $$SearchBar, a as $$Pagination } from './Pagination_CbrvlfVO.mjs';

const $$Credits2 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Credits", "activeNav": "credits", "data-astro-cid-j5yiiynj": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="search-bar" data-astro-cid-j5yiiynj> ${renderComponent($$result2, "SearchBar", $$SearchBar, { "placeholder": "Search by user name or transaction ID...", "id": "creditsSearch", "data-astro-cid-j5yiiynj": true })} <div class="filters" data-astro-cid-j5yiiynj> <select class="admin-input admin-select filter-select" id="typeFilter" data-astro-cid-j5yiiynj> <option value="" data-astro-cid-j5yiiynj>All Types</option> <option value="credit" data-astro-cid-j5yiiynj>Credits Added</option> <option value="debit" data-astro-cid-j5yiiynj>Credits Used</option> </select> <select class="admin-input admin-select filter-select" id="sourceFilter" data-astro-cid-j5yiiynj> <option value="" data-astro-cid-j5yiiynj>All Sources</option> <option value="purchase" data-astro-cid-j5yiiynj>Purchase</option> <option value="subscription" data-astro-cid-j5yiiynj>Subscription</option> <option value="bonus" data-astro-cid-j5yiiynj>Bonus</option> <option value="refund" data-astro-cid-j5yiiynj>Refund</option> <option value="action_usage" data-astro-cid-j5yiiynj>Action Usage</option> <option value="admin_adjustment" data-astro-cid-j5yiiynj>Admin Adjustment</option> </select> <input type="date" class="admin-input" id="dateFrom" placeholder="From" data-astro-cid-j5yiiynj> <input type="date" class="admin-input" id="dateTo" placeholder="To" data-astro-cid-j5yiiynj> <button class="admin-btn admin-btn-secondary" id="exportCsvBtn" data-astro-cid-j5yiiynj> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j5yiiynj> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-j5yiiynj></path> <polyline points="7 10 12 15 17 10" data-astro-cid-j5yiiynj></polyline> <line x1="12" y1="15" x2="12" y2="3" data-astro-cid-j5yiiynj></line> </svg>
Export CSV
</button> </div> </div>  <div class="card" data-astro-cid-j5yiiynj> <div class="transaction-table-wrapper" data-astro-cid-j5yiiynj> <table class="admin-table" id="transactionsTable" data-astro-cid-j5yiiynj> <thead data-astro-cid-j5yiiynj> <tr data-astro-cid-j5yiiynj> <th data-astro-cid-j5yiiynj>User</th> <th data-astro-cid-j5yiiynj>Type</th> <th data-astro-cid-j5yiiynj>Amount</th> <th data-astro-cid-j5yiiynj>Source</th> <th data-astro-cid-j5yiiynj>Balance After</th> <th data-astro-cid-j5yiiynj>Date</th> </tr> </thead> <tbody id="transactionsTableBody" data-astro-cid-j5yiiynj> <tr data-astro-cid-j5yiiynj> <td colspan="6" style="text-align: center; color: var(--admin-text-muted); padding: 48px;" data-astro-cid-j5yiiynj> <div class="loading-spinner" style="margin: 0 auto;" data-astro-cid-j5yiiynj></div> <p style="margin-top: 12px;" data-astro-cid-j5yiiynj>Loading transactions...</p> </td> </tr> </tbody> </table> </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": 1, "totalPages": 1, "totalItems": 0, "id": "transactionsPagination", "data-astro-cid-j5yiiynj": true })} </div> ` })}  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/credits 2.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/credits 2.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/credits 2.astro";
const $$url = "/admin/credits 2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Credits2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
