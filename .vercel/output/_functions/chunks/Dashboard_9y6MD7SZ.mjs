import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { n as renderHead, u as unescapeHTML, h as addAttribute, r as renderTemplate, p as renderSlot } from './entrypoint_BEeWRyRY.mjs';
import 'clsx';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { B as BUSINESS } from './brand_CnEBFwtm.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Dashboard;
  const { title, activeNav = "dashboard" } = Astro2.props;
  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: "grid" },
    { id: "users", label: "Users", href: "/admin/users", icon: "users" },
    { id: "subscriptions", label: "Subscriptions", href: "/admin/subscriptions", icon: "credit-card" },
    { id: "credits", label: "Credits", href: "/admin/credits", icon: "coins" },
    { id: "purchases", label: "Payments", href: "/admin/purchases", icon: "receipt" },
    { id: "usage", label: "Usage", href: "/admin/usage", icon: "chart" },
    { id: "settings", label: "Settings", href: "/admin/settings", icon: "settings" }
  ];
  const icons = {
    grid: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    "credit-card": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    coins: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`,
    receipt: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M8 10h8"/><path d="M8 14h6"/></svg>`,
    chart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };
  return renderTemplate`<html lang="en" dir="ltr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${title} | ${BUSINESS.brandName} Admin</title><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body> <div class="admin-layout"> <!-- Mobile Header --> <header class="mobile-header"> <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu"> <span class="menu-icon">${unescapeHTML(icons.menu)}</span> <span class="close-icon">${unescapeHTML(icons.close)}</span> </button> <span class="mobile-title">${title}</span> <div class="mobile-user" id="mobileUserInfo"></div> </header> <!-- Sidebar --> <aside class="sidebar" id="sidebar"> <div class="sidebar-header"> <a href="/admin" class="logo"> <span class="logo-icon">F</span> <span class="logo-text">${BUSINESS.brandName}</span> </a> <span class="logo-badge">Admin</span> </div> <nav class="sidebar-nav"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(["nav-item", { active: activeNav === item.id }], "class:list")}> <span class="nav-icon">${unescapeHTML(icons[item.icon])}</span> <span class="nav-label">${item.label}</span> </a>`)} </nav> <div class="sidebar-footer"> <button class="nav-item logout-btn" id="logoutBtn"> <span class="nav-icon">${unescapeHTML(icons.logout)}</span> <span class="nav-label">Logout</span> </button> </div> </aside> <!-- Main Content --> <main class="main-content"> <header class="content-header"> <div class="header-left"> <h1 class="page-title">${title}</h1> </div> <div class="header-right"> <div class="user-info" id="userInfo"> <span class="user-name">Loading...</span> <span class="user-email"></span> </div> </div> </header> <div class="content-body"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div> <!-- Overlay for mobile --> <div class="sidebar-overlay" id="sidebarOverlay"></div> ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/layouts/Dashboard.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/layouts/Dashboard.astro", void 0);

export { $$Dashboard as $ };
