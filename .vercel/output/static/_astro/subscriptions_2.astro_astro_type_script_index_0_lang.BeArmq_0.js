let r=1,c="",o="",d="";async function i(){const e=document.getElementById("subscriptionsTableBody");if(e){e.innerHTML=`
      <tr>
        <td colspan="6" style="text-align: center; padding: 48px;">
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </td>
      </tr>
    `;try{const n=new URLSearchParams({page:String(r),...c&&{search:c},...o&&{tier:o},...d&&{status:d}}),t=await fetch(`/api/admin/subscriptions?${n}`);if(!t.ok)throw new Error("Failed to load subscriptions");const a=await t.json();p(a.subscriptions||[]),v(a.page||1,a.totalPages||1,a.total||0)}catch(n){console.error("Error loading subscriptions:",n),e.innerHTML=`
        <tr>
          <td colspan="6" style="text-align: center; color: var(--admin-danger); padding: 48px;">
            Failed to load subscriptions. Please try again.
          </td>
        </tr>
      `}}}function p(e){const n=document.getElementById("subscriptionsTableBody");if(n){if(e.length===0){n.innerHTML=`
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <p class="empty-state-title">No subscriptions found</p>
              <p>Try adjusting your filters</p>
            </div>
          </td>
        </tr>
      `;return}n.innerHTML=e.map(t=>`
      <tr data-sub-id="${t.id}">
        <td>
          <div class="user-cell">
            <div class="user-avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
            <div class="user-info">
              <span>${t.user_name||"Unknown"}</span>
              ${t.user_phone?`<span class="user-phone">${t.user_phone}</span>`:""}
            </div>
          </div>
        </td>
        <td>
          <span class="badge ${f(t.tier_id)}">${t.tier_name||t.tier_id}</span>
        </td>
        <td>
          <span class="badge ${b(t.status)}">${t.status}</span>
        </td>
        <td style="color: var(--admin-text-muted);">${u(t.start_date)}</td>
        <td style="color: var(--admin-text-muted);">${t.status==="active"?u(t.next_billing_date):"-"}</td>
        <td>
          <div class="actions-dropdown">
            <button class="admin-btn admin-btn-sm admin-btn-secondary actions-trigger" data-sub-id="${t.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
            <div class="actions-menu" data-menu-for="${t.id}">
              <a href="/admin/users/${t.user_id}" class="actions-menu-item">View User</a>
              ${t.status==="active"?`
                <button class="actions-menu-item extend-btn" data-sub-id="${t.id}">Extend 30 Days</button>
                <button class="actions-menu-item change-tier-btn" data-sub-id="${t.id}">Change Tier</button>
                <button class="actions-menu-item danger cancel-btn" data-sub-id="${t.id}">Cancel</button>
              `:""}
              ${t.status==="cancelled"?`
                <button class="actions-menu-item reactivate-btn" data-sub-id="${t.id}">Reactivate</button>
              `:""}
            </div>
          </div>
        </td>
      </tr>
    `).join(""),y()}}function y(){document.querySelectorAll(".actions-trigger").forEach(e=>{e.addEventListener("click",n=>{n.stopPropagation();const t=e.dataset.subId,a=document.querySelector(`[data-menu-for="${t}"]`);document.querySelectorAll(".actions-menu.open").forEach(s=>{s!==a&&s.classList.remove("open")}),a?.classList.toggle("open")})}),document.querySelectorAll(".cancel-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.subId;confirm("Are you sure you want to cancel this subscription?")&&await l(n,"cancel")})}),document.querySelectorAll(".extend-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.subId;await l(n,"extend")})}),document.querySelectorAll(".change-tier-btn").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.subId;h(n)})})}async function l(e,n,t){try{if(!(await fetch("/api/admin/subscription/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subscriptionId:e,action:n,data:t})})).ok)throw new Error("Failed to update subscription");i()}catch{alert("Failed to update subscription. Please try again.")}}function h(e){const n=document.getElementById("changeTierModal"),t=document.getElementById("changeTierSubId");n&&t&&(t.value=e,n.classList.add("open"))}function v(e,n,t){const a=document.getElementById("subscriptionsPagination");if(!a)return;const s=a.querySelector(".pagination-info");if(s){const g=(e-1)*20+1,m=Math.min(e*20,t);s.textContent=`Showing ${g} to ${m} of ${t} results`}}function u(e){return e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"-"}function b(e){switch(e){case"active":return"badge-success";case"cancelled":return"badge-warning";case"expired":return"badge-danger";case"suspended":return"badge-danger";default:return"badge-neutral"}}function f(e){switch(e){case"starter":return"badge-info";case"growth":return"badge-success";case"pro":return"badge-warning";default:return"badge-neutral"}}document.addEventListener("click",()=>{document.querySelectorAll(".actions-menu.open").forEach(e=>e.classList.remove("open"))});window.addEventListener("admin:search",e=>{const n=e.detail;n.inputId==="subscriptionSearch"&&(c=n.query,r=1,i())});window.addEventListener("admin:page-change",e=>{const n=e.detail;n.paginationId==="subscriptionsPagination"&&(r=n.page,i())});document.getElementById("tierFilter")?.addEventListener("change",e=>{o=e.target.value,r=1,i()});document.getElementById("statusFilter")?.addEventListener("change",e=>{d=e.target.value,r=1,i()});document.getElementById("closeChangeTierModal")?.addEventListener("click",()=>{document.getElementById("changeTierModal")?.classList.remove("open")});document.getElementById("cancelChangeTier")?.addEventListener("click",()=>{document.getElementById("changeTierModal")?.classList.remove("open")});document.getElementById("changeTierForm")?.addEventListener("submit",async e=>{e.preventDefault();const n=document.getElementById("changeTierSubId").value,t=document.getElementById("newTier").value;await l(n,"change_tier",{newTier:t}),document.getElementById("changeTierModal")?.classList.remove("open")});i();
