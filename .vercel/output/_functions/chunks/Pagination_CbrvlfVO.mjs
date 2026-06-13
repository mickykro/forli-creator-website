import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { r as renderTemplate, o as defineScriptVars, h as addAttribute, m as maybeRenderHead } from './entrypoint_BEeWRyRY.mjs';
import 'clsx';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$SearchBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SearchBar;
  const { placeholder = "Search...", id = "searchInput" } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div class="search-input-wrapper" data-astro-cid-gyrmpb4y> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-gyrmpb4y> <circle cx="11" cy="11" r="8" data-astro-cid-gyrmpb4y></circle> <line x1="21" y1="21" x2="16.65" y2="16.65" data-astro-cid-gyrmpb4y></line> </svg> <input type="text"', ' class="admin-input"', ' autocomplete="off" data-astro-cid-gyrmpb4y> </div>  <script>(function(){', "\n  // Debounced search\n  let debounceTimer;\n  const input = document.getElementById(id);\n\n  input?.addEventListener('input', (e) => {\n    clearTimeout(debounceTimer);\n    debounceTimer = setTimeout(() => {\n      const value = (e.target as HTMLInputElement).value;\n      window.dispatchEvent(new CustomEvent('admin:search', { detail: { query: value, inputId: id } }));\n    }, 300);\n  });\n})();<\/script>"])), maybeRenderHead(), addAttribute(id, "id"), addAttribute(placeholder, "placeholder"), defineScriptVars({ id }));
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/admin/SearchBar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, totalItems, pageSize = 10, id = "pagination" } = Astro2.props;
  function getPageNumbers(current, total) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages = [];
    if (current <= 3) {
      pages.push(1, 2, 3, 4, "ellipsis", total);
    } else if (current >= total - 2) {
      pages.push(1, "ellipsis", total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, "ellipsis", current - 1, current, current + 1, "ellipsis", total);
    }
    return pages;
  }
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const showingFrom = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const showingTo = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;
  return renderTemplate(_a || (_a = __template(["", '<div class="pagination"', "", "", " data-astro-cid-7wcks5k6> ", ' <div class="pagination-controls" data-astro-cid-7wcks5k6> <button class="pagination-btn prev-btn"', "", ' data-astro-cid-7wcks5k6> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-7wcks5k6> <polyline points="15 18 9 12 15 6" data-astro-cid-7wcks5k6></polyline> </svg> </button> ', ' <button class="pagination-btn next-btn"', "", ' data-astro-cid-7wcks5k6> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-7wcks5k6> <polyline points="9 18 15 12 9 6" data-astro-cid-7wcks5k6></polyline> </svg> </button> </div> </div>  <script>(function(){', "\n  const pagination = document.getElementById(id);\n\n  pagination?.querySelectorAll('.pagination-btn[data-page]').forEach((btn) => {\n    btn.addEventListener('click', () => {\n      if ((btn as HTMLButtonElement).disabled) return;\n      const page = Number((btn as HTMLElement).dataset.page);\n      window.dispatchEvent(new CustomEvent('admin:page-change', { detail: { page, paginationId: id } }));\n    });\n  });\n})();<\/script>"])), maybeRenderHead(), addAttribute(id, "id"), addAttribute(currentPage, "data-current"), addAttribute(totalPages, "data-total"), totalItems !== void 0 && renderTemplate`<div class="pagination-info" data-astro-cid-7wcks5k6>
Showing ${showingFrom} to ${showingTo} of ${totalItems.toLocaleString()} results
</div>`, addAttribute(currentPage <= 1, "disabled"), addAttribute(currentPage - 1, "data-page"), pageNumbers.map(
    (page) => page === "ellipsis" ? renderTemplate`<span class="pagination-ellipsis" data-astro-cid-7wcks5k6>...</span>` : renderTemplate`<button${addAttribute(["pagination-btn", { active: page === currentPage }], "class:list")}${addAttribute(page, "data-page")} data-astro-cid-7wcks5k6> ${page} </button>`
  ), addAttribute(currentPage >= totalPages, "disabled"), addAttribute(currentPage + 1, "data-page"), defineScriptVars({ id }));
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/admin/Pagination.astro", void 0);

export { $$SearchBar as $, $$Pagination as a };
