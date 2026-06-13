import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_BEeWRyRY.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { $ as $$Dashboard } from './Dashboard_9y6MD7SZ.mjs';
import { $ as $$SearchBar, a as $$Pagination } from './Pagination_CbrvlfVO.mjs';

const $$Purchases = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Payments", "activeNav": "purchases", "data-astro-cid-76rswxic": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="search-bar" data-astro-cid-76rswxic> ${renderComponent($$result2, "SearchBar", $$SearchBar, { "placeholder": "Search by user or transaction ID...", "id": "purchasesSearch", "data-astro-cid-76rswxic": true })} <div class="filters" data-astro-cid-76rswxic> <select class="admin-input admin-select filter-select" id="typeFilter" data-astro-cid-76rswxic> <option value="" data-astro-cid-76rswxic>All Types</option> <option value="credit_pack" data-astro-cid-76rswxic>Credit Packs</option> <option value="subscription" data-astro-cid-76rswxic>Subscriptions</option> </select> <select class="admin-input admin-select filter-select" id="statusFilter" data-astro-cid-76rswxic> <option value="" data-astro-cid-76rswxic>All Status</option> <option value="completed" data-astro-cid-76rswxic>Completed</option> <option value="pending" data-astro-cid-76rswxic>Pending</option> <option value="failed" data-astro-cid-76rswxic>Failed</option> <option value="refunded" data-astro-cid-76rswxic>Refunded</option> </select> <input type="date" class="admin-input" id="dateFrom" data-astro-cid-76rswxic> <input type="date" class="admin-input" id="dateTo" data-astro-cid-76rswxic> </div> </div>  <div class="card" data-astro-cid-76rswxic> <div class="purchases-table-wrapper" data-astro-cid-76rswxic> <table class="admin-table" id="purchasesTable" data-astro-cid-76rswxic> <thead data-astro-cid-76rswxic> <tr data-astro-cid-76rswxic> <th data-astro-cid-76rswxic>User</th> <th data-astro-cid-76rswxic>Type</th> <th data-astro-cid-76rswxic>Amount</th> <th data-astro-cid-76rswxic>Status</th> <th data-astro-cid-76rswxic>Transaction ID</th> <th data-astro-cid-76rswxic>Date</th> <th data-astro-cid-76rswxic>Actions</th> </tr> </thead> <tbody id="purchasesTableBody" data-astro-cid-76rswxic> <tr data-astro-cid-76rswxic> <td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 48px;" data-astro-cid-76rswxic> <div class="loading-spinner" style="margin: 0 auto;" data-astro-cid-76rswxic></div> <p style="margin-top: 12px;" data-astro-cid-76rswxic>Loading purchases...</p> </td> </tr> </tbody> </table> </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": 1, "totalPages": 1, "totalItems": 0, "id": "purchasesPagination", "data-astro-cid-76rswxic": true })} </div> ` })}  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/purchases.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/purchases.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/purchases.astro";
const $$url = "/admin/purchases";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Purchases,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
