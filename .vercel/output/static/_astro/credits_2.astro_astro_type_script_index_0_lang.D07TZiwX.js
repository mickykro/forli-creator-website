let o=1,s="",d="",c="",l="",u="";async function i(){const t=document.getElementById("transactionsTableBody");if(t){t.innerHTML=`
      <tr>
        <td colspan="6" style="text-align: center; padding: 48px;">
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </td>
      </tr>
    `;try{const n=new URLSearchParams({page:String(o),...s&&{search:s},...d&&{type:d},...c&&{source:c},...l&&{from:l},...u&&{to:u}}),e=await fetch(`/api/admin/credits?${n}`);if(!e.ok)throw new Error("Failed to load transactions");const a=await e.json();y(a.transactions||[]),f(a.page||1,a.totalPages||1,a.total||0)}catch(n){console.error("Error loading transactions:",n),t.innerHTML=`
        <tr>
          <td colspan="6" style="text-align: center; color: var(--admin-danger); padding: 48px;">
            Failed to load transactions. Please try again.
          </td>
        </tr>
      `}}}function y(t){const n=document.getElementById("transactionsTableBody");if(n){if(t.length===0){n.innerHTML=`
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <p class="empty-state-title">No transactions found</p>
              <p>Try adjusting your filters</p>
            </div>
          </td>
        </tr>
      `;return}n.innerHTML=t.map(e=>`
      <tr data-transaction-id="${e.id}">
        <td>
          <a href="/admin/users/${e.user_id}" class="user-link">
            ${e.user_name||"Unknown"}
          </a>
        </td>
        <td>
          <span class="badge ${e.transaction_type==="credit"?"badge-success":"badge-danger"}">
            ${e.transaction_type==="credit"?"+":"-"}
          </span>
        </td>
        <td class="amount-cell ${e.transaction_type==="credit"?"positive":"negative"}">
          ${e.transaction_type==="credit"?"+":"-"}${m(e.amount)}
        </td>
        <td>
          <div class="source-cell">
            <span class="source-label">${h(e.source_type)}</span>
            ${e.action_type?`<span class="action-label">${b(e.action_type)}</span>`:""}
            ${e.description?`<span class="description">${e.description}</span>`:""}
          </div>
        </td>
        <td style="font-variant-numeric: tabular-nums; color: var(--admin-text-muted);">
          ${m(e.balance_after)}
        </td>
        <td style="white-space: nowrap; color: var(--admin-text-muted);">
          ${v(e.created_at)}
        </td>
      </tr>
    `).join("")}}function f(t,n,e){const a=document.getElementById("transactionsPagination");if(!a)return;const r=a.querySelector(".pagination-info");if(r){const p=(t-1)*50+1,g=Math.min(t*50,e);r.textContent=`Showing ${p} to ${g} of ${e.toLocaleString()} results`}}function m(t){return(t/100).toLocaleString()}function v(t){return new Date(t).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function h(t){return{purchase:"Credit Pack Purchase",subscription:"Subscription Credits",bonus:"Bonus Credits",refund:"Refund",action_usage:"Action Usage",admin_adjustment:"Admin Adjustment",migration:"Data Migration"}[t]||t}function b(t){return{standard_image:"Image Generation",carousel:"Carousel Creation",standard_video:"Video Generation",premium_video:"Premium Video",text_consultation:"Text Consultation"}[t]||t}async function w(){try{const t=new URLSearchParams({format:"csv",...s&&{search:s},...d&&{type:d},...c&&{source:c},...l&&{from:l},...u&&{to:u}}),n=await fetch(`/api/admin/credits/export?${t}`);if(!n.ok)throw new Error("Export failed");const e=await n.blob(),a=window.URL.createObjectURL(e),r=document.createElement("a");r.href=a,r.download=`credit-transactions-${new Date().toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(a),r.remove()}catch{alert("Failed to export CSV. Please try again.")}}window.addEventListener("admin:search",t=>{const n=t.detail;n.inputId==="creditsSearch"&&(s=n.query,o=1,i())});window.addEventListener("admin:page-change",t=>{const n=t.detail;n.paginationId==="transactionsPagination"&&(o=n.page,i())});document.getElementById("typeFilter")?.addEventListener("change",t=>{d=t.target.value,o=1,i()});document.getElementById("sourceFilter")?.addEventListener("change",t=>{c=t.target.value,o=1,i()});document.getElementById("dateFrom")?.addEventListener("change",t=>{l=t.target.value,o=1,i()});document.getElementById("dateTo")?.addEventListener("change",t=>{u=t.target.value,o=1,i()});document.getElementById("exportCsvBtn")?.addEventListener("click",w);i();
