// Shared tab configuration - edit order here
const TABS = [
  { id: 'invoices', label: 'Invoices', href: 'invoices.html', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'cores_warranty', label: 'Core & Warranty', href: 'cores-warranty.html', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { id: 'chat', label: 'Ask Protractor', href: 'chat.html', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { id: 'emails', label: 'Emails', href: 'emails.html', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'statements', label: 'Statements', href: 'statements.html', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'bookkeeper', label: 'Bookkeeper', href: 'bookkeeper.html', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'search', label: 'Search', href: 'search.html', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { id: 'settings', label: '', href: 'settings.html', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', isSettings: true }
];

function renderTabsHeader(activeTab, rightContent = '') {
  return `<header class="bg-blue-900 text-white shadow-lg flex-shrink-0">
    <div class="max-w-7xl mx-auto px-4 py-3"><div class="flex items-center gap-4">
      <div class="bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded text-lg">NAPA</div>
      <div><h1 class="text-xl font-semibold">Sylvan Lake AutoPro</h1><p class="text-blue-200 text-sm">Business Dashboard</p></div>
      <div class="ml-auto">${rightContent || `<button onclick="location.reload()" class="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 rounded-lg text-sm">🔄 Refresh</button>`}</div>
    </div></div>
    <div class="bg-blue-800"><div class="max-w-7xl mx-auto px-4"><div class="flex items-end pt-2 overflow-x-auto">
      ${TABS.map((t, i) => {
        const isActive = t.id === activeTab;
        const baseClass = isActive 
          ? 'bg-white text-slate-800 border-t border-l border-r border-slate-300' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-transparent';
        if (t.isSettings) {
          return `<a href="${t.href}" class="flex items-center justify-center w-10 h-10 rounded-t-lg ml-1 ${baseClass}" title="Settings"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${t.icon}"></path></svg></a>`;
        }
        return `<a href="${t.href}" class="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg ${i > 0 ? 'ml-1' : ''} whitespace-nowrap ${baseClass}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${t.icon}"></path></svg>${t.label}</a>`;
      }).join('')}
    </div></div></div>
  </header>`;
}
