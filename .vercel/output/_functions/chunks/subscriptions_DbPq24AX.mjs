import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BEeWRyRY.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { $ as $$Dashboard } from './Dashboard_9y6MD7SZ.mjs';
import { $ as $$SearchBar, a as $$Pagination } from './Pagination_CbrvlfVO.mjs';
import { P as PRICING_TIERS } from './brand_CnEBFwtm.mjs';

const $$Subscriptions = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Subscriptions", "activeNav": "subscriptions", "data-astro-cid-dbchstk3": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="search-bar" data-astro-cid-dbchstk3> ${renderComponent($$result2, "SearchBar", $$SearchBar, { "placeholder": "Search by user name or phone...", "id": "subscriptionSearch", "data-astro-cid-dbchstk3": true })} <div class="filters" data-astro-cid-dbchstk3> <select class="admin-input admin-select filter-select" id="tierFilter" data-astro-cid-dbchstk3> <option value="" data-astro-cid-dbchstk3>All Tiers</option> ${PRICING_TIERS.map((tier) => renderTemplate`<option${addAttribute(tier.id, "value")} data-astro-cid-dbchstk3>${tier.nameEn}</option>`)} </select> <select class="admin-input admin-select filter-select" id="statusFilter" data-astro-cid-dbchstk3> <option value="" data-astro-cid-dbchstk3>All Status</option> <option value="active" data-astro-cid-dbchstk3>Active</option> <option value="cancelled" data-astro-cid-dbchstk3>Cancelled</option> <option value="expired" data-astro-cid-dbchstk3>Expired</option> <option value="suspended" data-astro-cid-dbchstk3>Suspended</option> </select> </div> </div>  <div class="card" data-astro-cid-dbchstk3> <div class="subscription-table-wrapper" data-astro-cid-dbchstk3> <table class="admin-table" id="subscriptionsTable" data-astro-cid-dbchstk3> <thead data-astro-cid-dbchstk3> <tr data-astro-cid-dbchstk3> <th data-astro-cid-dbchstk3>User</th> <th data-astro-cid-dbchstk3>Tier</th> <th data-astro-cid-dbchstk3>Status</th> <th data-astro-cid-dbchstk3>Start Date</th> <th data-astro-cid-dbchstk3>Next Billing</th> <th data-astro-cid-dbchstk3>Actions</th> </tr> </thead> <tbody id="subscriptionsTableBody" data-astro-cid-dbchstk3> <tr data-astro-cid-dbchstk3> <td colspan="6" style="text-align: center; color: var(--admin-text-muted); padding: 48px;" data-astro-cid-dbchstk3> <div class="loading-spinner" style="margin: 0 auto;" data-astro-cid-dbchstk3></div> <p style="margin-top: 12px;" data-astro-cid-dbchstk3>Loading subscriptions...</p> </td> </tr> </tbody> </table> </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": 1, "totalPages": 1, "totalItems": 0, "id": "subscriptionsPagination", "data-astro-cid-dbchstk3": true })} </div>  <div class="modal-overlay" id="changeTierModal" data-astro-cid-dbchstk3> <div class="modal" data-astro-cid-dbchstk3> <div class="modal-header" data-astro-cid-dbchstk3> <h3 data-astro-cid-dbchstk3>Change Subscription Tier</h3> <button class="modal-close" id="closeChangeTierModal" data-astro-cid-dbchstk3>&times;</button> </div> <form id="changeTierForm" data-astro-cid-dbchstk3> <input type="hidden" id="changeTierSubId" data-astro-cid-dbchstk3> <div class="form-group" data-astro-cid-dbchstk3> <label for="newTier" data-astro-cid-dbchstk3>New Tier</label> <select id="newTier" class="admin-input admin-select" required data-astro-cid-dbchstk3> ${PRICING_TIERS.map((tier) => renderTemplate`<option${addAttribute(tier.id, "value")} data-astro-cid-dbchstk3>${tier.nameEn} - ₪${tier.priceMonthly}/mo</option>`)} </select> </div> <div class="modal-actions" data-astro-cid-dbchstk3> <button type="button" class="admin-btn admin-btn-secondary" id="cancelChangeTier" data-astro-cid-dbchstk3>Cancel</button> <button type="submit" class="admin-btn admin-btn-primary" data-astro-cid-dbchstk3>Change Tier</button> </div> </form> </div> </div> ` })}  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/subscriptions.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/subscriptions.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/subscriptions.astro";
const $$url = "/admin/subscriptions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Subscriptions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
