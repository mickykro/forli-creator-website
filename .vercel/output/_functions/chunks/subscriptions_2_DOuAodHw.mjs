import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BEeWRyRY.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { $ as $$Dashboard } from './Dashboard_9y6MD7SZ.mjs';
import { $ as $$SearchBar, a as $$Pagination } from './Pagination_CbrvlfVO.mjs';
import { P as PRICING_TIERS } from './brand_CnEBFwtm.mjs';

const $$Subscriptions2 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Subscriptions", "activeNav": "subscriptions", "data-astro-cid-vhcc5jgy": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="search-bar" data-astro-cid-vhcc5jgy> ${renderComponent($$result2, "SearchBar", $$SearchBar, { "placeholder": "Search by user name or phone...", "id": "subscriptionSearch", "data-astro-cid-vhcc5jgy": true })} <div class="filters" data-astro-cid-vhcc5jgy> <select class="admin-input admin-select filter-select" id="tierFilter" data-astro-cid-vhcc5jgy> <option value="" data-astro-cid-vhcc5jgy>All Tiers</option> ${PRICING_TIERS.map((tier) => renderTemplate`<option${addAttribute(tier.id, "value")} data-astro-cid-vhcc5jgy>${tier.nameEn}</option>`)} </select> <select class="admin-input admin-select filter-select" id="statusFilter" data-astro-cid-vhcc5jgy> <option value="" data-astro-cid-vhcc5jgy>All Status</option> <option value="active" data-astro-cid-vhcc5jgy>Active</option> <option value="cancelled" data-astro-cid-vhcc5jgy>Cancelled</option> <option value="expired" data-astro-cid-vhcc5jgy>Expired</option> <option value="suspended" data-astro-cid-vhcc5jgy>Suspended</option> </select> </div> </div>  <div class="card" data-astro-cid-vhcc5jgy> <div class="subscription-table-wrapper" data-astro-cid-vhcc5jgy> <table class="admin-table" id="subscriptionsTable" data-astro-cid-vhcc5jgy> <thead data-astro-cid-vhcc5jgy> <tr data-astro-cid-vhcc5jgy> <th data-astro-cid-vhcc5jgy>User</th> <th data-astro-cid-vhcc5jgy>Tier</th> <th data-astro-cid-vhcc5jgy>Status</th> <th data-astro-cid-vhcc5jgy>Start Date</th> <th data-astro-cid-vhcc5jgy>Next Billing</th> <th data-astro-cid-vhcc5jgy>Actions</th> </tr> </thead> <tbody id="subscriptionsTableBody" data-astro-cid-vhcc5jgy> <tr data-astro-cid-vhcc5jgy> <td colspan="6" style="text-align: center; color: var(--admin-text-muted); padding: 48px;" data-astro-cid-vhcc5jgy> <div class="loading-spinner" style="margin: 0 auto;" data-astro-cid-vhcc5jgy></div> <p style="margin-top: 12px;" data-astro-cid-vhcc5jgy>Loading subscriptions...</p> </td> </tr> </tbody> </table> </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": 1, "totalPages": 1, "totalItems": 0, "id": "subscriptionsPagination", "data-astro-cid-vhcc5jgy": true })} </div>  <div class="modal-overlay" id="changeTierModal" data-astro-cid-vhcc5jgy> <div class="modal" data-astro-cid-vhcc5jgy> <div class="modal-header" data-astro-cid-vhcc5jgy> <h3 data-astro-cid-vhcc5jgy>Change Subscription Tier</h3> <button class="modal-close" id="closeChangeTierModal" data-astro-cid-vhcc5jgy>&times;</button> </div> <form id="changeTierForm" data-astro-cid-vhcc5jgy> <input type="hidden" id="changeTierSubId" data-astro-cid-vhcc5jgy> <div class="form-group" data-astro-cid-vhcc5jgy> <label for="newTier" data-astro-cid-vhcc5jgy>New Tier</label> <select id="newTier" class="admin-input admin-select" required data-astro-cid-vhcc5jgy> ${PRICING_TIERS.map((tier) => renderTemplate`<option${addAttribute(tier.id, "value")} data-astro-cid-vhcc5jgy>${tier.nameEn} - ₪${tier.priceMonthly}/mo</option>`)} </select> </div> <div class="modal-actions" data-astro-cid-vhcc5jgy> <button type="button" class="admin-btn admin-btn-secondary" id="cancelChangeTier" data-astro-cid-vhcc5jgy>Cancel</button> <button type="submit" class="admin-btn admin-btn-primary" data-astro-cid-vhcc5jgy>Change Tier</button> </div> </form> </div> </div> ` })}  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/subscriptions 2.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/subscriptions 2.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/subscriptions 2.astro";
const $$url = "/admin/subscriptions 2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Subscriptions2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
