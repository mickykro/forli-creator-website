let s=1,o="",i="",c="";async function r(){const e=document.getElementById("usersTableBody");if(e){e.innerHTML=`
      <tr>
        <td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 48px;">
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </td>
      </tr>
    `;try{const n=new URLSearchParams({page:String(s),...o&&{search:o},...i&&{tier:i},...c&&{status:c}}),t=await fetch(`/api/admin/users?${n}`);if(!t.ok)throw new Error("Failed to load users");const a=await t.json();m(a.users||[]),y(a.page||1,a.totalPages||1,a.total||0)}catch(n){console.error("Error loading users:",n),e.innerHTML=`
        <tr>
          <td colspan="7" style="text-align: center; color: var(--admin-danger); padding: 48px;">
            Failed to load users. Please try again.
          </td>
        </tr>
      `}}}function m(e){const n=document.getElementById("usersTableBody");if(n){if(e.length===0){n.innerHTML=`
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <p class="empty-state-title">No users found</p>
              <p>Try adjusting your search or filters</p>
            </div>
          </td>
        </tr>
      `;return}n.innerHTML=e.map(t=>`
      <tr data-user-id="${t.id}">
        <td>
          <div class="user-cell">
            <div class="user-avatar">${(t.display_name||"U").charAt(0).toUpperCase()}</div>
            <span>${t.display_name||"Unknown"}</span>
          </div>
        </td>
        <td style="font-family: monospace;">${t.phone_number||"-"}</td>
        <td style="font-variant-numeric: tabular-nums;">${f(t.credits_balance)}</td>
        <td>
          <span class="badge ${t.subscription_tier?"badge-info":"badge-neutral"}">
            ${t.subscription_tier||"None"}
          </span>
        </td>
        <td>
          <span class="badge ${h(t.subscription_status)}">
            ${t.subscription_status||"None"}
          </span>
        </td>
        <td style="color: var(--admin-text-muted);">${v(t.created_at)}</td>
        <td>
          <div class="actions-dropdown">
            <button class="admin-btn admin-btn-sm admin-btn-secondary actions-trigger" data-user-id="${t.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
            <div class="actions-menu" data-menu-for="${t.id}">
              <a href="/admin/users/${t.id}" class="actions-menu-item">View Details</a>
              <button class="actions-menu-item add-credits-btn" data-user-id="${t.id}" data-user-name="${t.display_name||"Unknown"}">Add Credits</button>
              <button class="actions-menu-item danger ban-user-btn" data-user-id="${t.id}">Ban User</button>
            </div>
          </div>
        </td>
      </tr>
    `).join(""),g()}}function g(){document.querySelectorAll(".actions-trigger").forEach(e=>{e.addEventListener("click",n=>{n.stopPropagation();const t=e.dataset.userId,a=document.querySelector(`[data-menu-for="${t}"]`);document.querySelectorAll(".actions-menu.open").forEach(d=>{d!==a&&d.classList.remove("open")}),a?.classList.toggle("open")})}),document.querySelectorAll(".add-credits-btn").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.userId;e.dataset.userName,p(n)})}),document.querySelectorAll(".ban-user-btn").forEach(e=>{e.addEventListener("click",async()=>{e.dataset.userId,confirm("Are you sure you want to ban this user?")&&alert("Ban functionality would be implemented here")})})}function p(e,n){const t=document.getElementById("addCreditsModal"),a=document.getElementById("creditsUserId");t&&a&&(a.value=e,t.classList.add("open"))}function y(e,n,t){const a=document.getElementById("usersPagination");if(!a)return;const d=a.querySelector(".pagination-info");if(d){const l=(e-1)*20+1,u=Math.min(e*20,t);d.textContent=`Showing ${l} to ${u} of ${t} results`}a.dataset.current=String(e),a.dataset.total=String(n)}function f(e){return e===void 0?"-":(e/100).toLocaleString()}function v(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}function h(e){switch(e){case"active":return"badge-success";case"trial":return"badge-info";case"cancelled":return"badge-warning";case"expired":return"badge-danger";default:return"badge-neutral"}}document.addEventListener("click",()=>{document.querySelectorAll(".actions-menu.open").forEach(e=>e.classList.remove("open"))});window.addEventListener("admin:search",e=>{const n=e.detail;n.inputId==="userSearch"&&(o=n.query,s=1,r())});window.addEventListener("admin:page-change",e=>{const n=e.detail;n.paginationId==="usersPagination"&&(s=n.page,r())});document.getElementById("tierFilter")?.addEventListener("change",e=>{i=e.target.value,s=1,r()});document.getElementById("statusFilter")?.addEventListener("change",e=>{c=e.target.value,s=1,r()});document.getElementById("closeCreditsModal")?.addEventListener("click",()=>{document.getElementById("addCreditsModal")?.classList.remove("open")});document.getElementById("cancelCreditsBtn")?.addEventListener("click",()=>{document.getElementById("addCreditsModal")?.classList.remove("open")});document.getElementById("addCreditsForm")?.addEventListener("submit",async e=>{e.preventDefault();const n=document.getElementById("creditsUserId").value,t=Number(document.getElementById("creditsAmount").value),a=document.getElementById("creditsReason").value;try{if(!(await fetch("/api/admin/credits/grant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:n,amount:t*100,reason:a})})).ok)throw new Error("Failed to add credits");document.getElementById("addCreditsModal")?.classList.remove("open"),document.getElementById("addCreditsForm").reset(),r()}catch{alert("Failed to add credits. Please try again.")}});r();
