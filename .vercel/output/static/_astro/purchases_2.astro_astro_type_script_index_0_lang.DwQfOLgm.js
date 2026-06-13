let r=1,d="",i="",o="",c="",l="";async function s(){const t=document.getElementById("purchasesTableBody");if(t){t.innerHTML=`
      <tr>
        <td colspan="7" style="text-align: center; padding: 48px;">
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </td>
      </tr>
    `;try{const a=new URLSearchParams({page:String(r),...d&&{search:d},...i&&{type:i},...o&&{status:o},...c&&{from:c},...l&&{to:l}}),e=await fetch(`/api/admin/purchases?${a}`);if(!e.ok)throw new Error("Failed to load purchases");const n=await e.json();m(n.purchases||[]),h(n.page||1,n.totalPages||1,n.total||0)}catch(a){console.error("Error loading purchases:",a),t.innerHTML=`
        <tr>
          <td colspan="7" style="text-align: center; color: var(--admin-danger); padding: 48px;">
            Failed to load purchases. Please try again.
          </td>
        </tr>
      `}}}function m(t){const a=document.getElementById("purchasesTableBody");if(a){if(t.length===0){a.innerHTML=`
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <p class="empty-state-title">No purchases found</p>
              <p>Try adjusting your filters</p>
            </div>
          </td>
        </tr>
      `;return}a.innerHTML=t.map(e=>`
      <tr data-purchase-id="${e.id}">
        <td>
          <div class="user-cell">
            <div class="user-avatar">${(e.user_name||"U").charAt(0).toUpperCase()}</div>
            <div class="user-info">
              <a href="/admin/users/${e.user_id}" style="font-weight: 500; color: var(--admin-primary); text-decoration: none;">
                ${e.user_name||"Unknown"}
              </a>
              ${e.user_phone?`<span class="user-phone">${e.user_phone}</span>`:""}
            </div>
          </div>
        </td>
        <td>
          <div class="type-info">
            <span class="badge ${e.purchase_type==="subscription"?"badge-success":"badge-info"}">
              ${e.purchase_type==="subscription"?"Subscription":"Credit Pack"}
            </span>
            ${e.tier_name||e.pack_name?`<span class="type-detail">${e.tier_name||e.pack_name}</span>`:""}
          </div>
        </td>
        <td class="amount-cell">₪${e.amount_ils.toLocaleString()}</td>
        <td>
          <span class="badge ${f(e.status)}">${e.status}</span>
        </td>
        <td>
          <code style="font-size: 12px; color: var(--admin-text-muted);">
            ${e.transaction_id?e.transaction_id.slice(0,16)+"...":"N/A"}
          </code>
          ${e.payment_gateway?`<br><span style="font-size: 11px; color: var(--admin-text-muted);">(${e.payment_gateway})</span>`:""}
        </td>
        <td style="white-space: nowrap; color: var(--admin-text-muted);">
          ${y(e.created_at)}
        </td>
        <td>
          <span style="color: var(--admin-text-muted); font-size: 12px;">—</span>
        </td>
      </tr>
    `).join("")}}function h(t,a,e){const n=document.getElementById("purchasesPagination");if(!n)return;const u=n.querySelector(".pagination-info");if(u){const g=(t-1)*20+1,p=Math.min(t*20,e);u.textContent=`Showing ${g} to ${p} of ${e.toLocaleString()} results`}}function y(t){return new Date(t).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function f(t){switch(t){case"completed":return"badge-success";case"pending":return"badge-warning";case"failed":return"badge-danger";case"refunded":return"badge-info";case"cancelled":return"badge-neutral";default:return"badge-neutral"}}window.addEventListener("admin:search",t=>{const a=t.detail;a.inputId==="purchasesSearch"&&(d=a.query,r=1,s())});window.addEventListener("admin:page-change",t=>{const a=t.detail;a.paginationId==="purchasesPagination"&&(r=a.page,s())});document.getElementById("typeFilter")?.addEventListener("change",t=>{i=t.target.value,r=1,s()});document.getElementById("statusFilter")?.addEventListener("change",t=>{o=t.target.value,r=1,s()});document.getElementById("dateFrom")?.addEventListener("change",t=>{c=t.target.value,r=1,s()});document.getElementById("dateTo")?.addEventListener("change",t=>{l=t.target.value,r=1,s()});s();
