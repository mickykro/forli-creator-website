import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_BEeWRyRY.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { $ as $$Dashboard } from './Dashboard_9y6MD7SZ.mjs';
import { $ as $$SearchBar, a as $$Pagination } from './Pagination_CbrvlfVO.mjs';

const $$Purchases2 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Payments", "activeNav": "purchases", "data-astro-cid-lph2gmt4": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="search-bar" data-astro-cid-lph2gmt4> ${renderComponent($$result2, "SearchBar", $$SearchBar, { "placeholder": "Search by user or transaction ID...", "id": "purchasesSearch", "data-astro-cid-lph2gmt4": true })} <div class="filters" data-astro-cid-lph2gmt4> <select class="admin-input admin-select filter-select" id="typeFilter" data-astro-cid-lph2gmt4> <option value="" data-astro-cid-lph2gmt4>All Types</option> <option value="credit_pack" data-astro-cid-lph2gmt4>Credit Packs</option> <option value="subscription" data-astro-cid-lph2gmt4>Subscriptions</option> </select> <select class="admin-input admin-select filter-select" id="statusFilter" data-astro-cid-lph2gmt4> <option value="" data-astro-cid-lph2gmt4>All Status</option> <option value="completed" data-astro-cid-lph2gmt4>Completed</option> <option value="pending" data-astro-cid-lph2gmt4>Pending</option> <option value="failed" data-astro-cid-lph2gmt4>Failed</option> <option value="refunded" data-astro-cid-lph2gmt4>Refunded</option> </select> <input type="date" class="admin-input" id="dateFrom" data-astro-cid-lph2gmt4> <input type="date" class="admin-input" id="dateTo" data-astro-cid-lph2gmt4> </div> </div>  <div class="card" data-astro-cid-lph2gmt4> <div class="purchases-table-wrapper" data-astro-cid-lph2gmt4> <table class="admin-table" id="purchasesTable" data-astro-cid-lph2gmt4> <thead data-astro-cid-lph2gmt4> <tr data-astro-cid-lph2gmt4> <th data-astro-cid-lph2gmt4>User</th> <th data-astro-cid-lph2gmt4>Type</th> <th data-astro-cid-lph2gmt4>Amount</th> <th data-astro-cid-lph2gmt4>Status</th> <th data-astro-cid-lph2gmt4>Transaction ID</th> <th data-astro-cid-lph2gmt4>Date</th> <th data-astro-cid-lph2gmt4>Actions</th> </tr> </thead> <tbody id="purchasesTableBody" data-astro-cid-lph2gmt4> <tr data-astro-cid-lph2gmt4> <td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 48px;" data-astro-cid-lph2gmt4> <div class="loading-spinner" style="margin: 0 auto;" data-astro-cid-lph2gmt4></div> <p style="margin-top: 12px;" data-astro-cid-lph2gmt4>Loading purchases...</p> </td> </tr> </tbody> </table> </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": 1, "totalPages": 1, "totalItems": 0, "id": "purchasesPagination", "data-astro-cid-lph2gmt4": true })} </div> ` })}  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/purchases 2.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/purchases 2.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/purchases 2.astro";
const $$url = "/admin/purchases 2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Purchases2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
