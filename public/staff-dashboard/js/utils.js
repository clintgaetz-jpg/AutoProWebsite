// ===================== SHARED UTILITIES =====================

// Supabase fetch helper
async function supabaseFetch(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    ...options.headers
  };
  
  const response = await fetch(url, { ...options, headers });
  if (!response.ok && options.method !== 'DELETE') {
    throw new Error(`HTTP ${response.status}`);
  }
  return response;
}

// GET helper
async function supabaseGet(endpoint) {
  const response = await supabaseFetch(endpoint);
  return response.json();
}

// PATCH helper
async function supabasePatch(endpoint, data) {
  return supabaseFetch(endpoint, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
    body: JSON.stringify(data)
  });
}

// POST helper
async function supabasePost(endpoint, data, returnData = false) {
  return supabaseFetch(endpoint, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Prefer': returnData ? 'return=representation' : 'return=minimal' 
    },
    body: JSON.stringify(data)
  });
}

// DELETE helper
async function supabaseDelete(endpoint) {
  return supabaseFetch(endpoint, { method: 'DELETE' });
}

// ===================== FORMATTERS =====================

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-CA');
}

function formatCurrency(amount) {
  if (amount == null) return '-';
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '-';
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`;
}

// ===================== CLIPBOARD =====================

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = '✓';
    btn.classList.add('bg-green-100', 'text-green-700');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('bg-green-100', 'text-green-700');
    }, 1000);
  });
}

function copyBtn(value, small = false) {
  if (value == null || value === '' || value === '-') return '';
  const cleanValue = String(value).replace(/"/g, '&quot;');
  const sizeClasses = small ? 'w-5 h-5 text-xs' : 'w-6 h-6 text-xs';
  return `<button onclick="event.stopPropagation(); copyToClipboard('${cleanValue}', this)" class="${sizeClasses} inline-flex items-center justify-center rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors ml-1" title="Copy">📋</button>`;
}

// ===================== UI HELPERS =====================

function renderLoading() {
  return `
    <div class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <span class="ml-3 text-slate-600">Loading...</span>
    </div>
  `;
}

function renderError(message) {
  return `<div class="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">${message}</div>`;
}

function renderEmpty(message) {
  return `
    <div class="text-center py-12">
      <div class="text-slate-400 text-5xl mb-4">📭</div>
      <p class="text-slate-500">${message}</p>
    </div>
  `;
}

// ===================== HEADER COMPONENT =====================

function renderHeader(activeTab) {
  const tabs = [
    { id: 'invoices', label: 'Invoices', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>' },
    { id: 'cores-warranty', label: 'Core & Warranty', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>' },
    { id: 'emails', label: 'Emails', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>' },
    { id: 'statements', label: 'Statements', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>' },
    { id: 'bookkeeper', label: 'Bookkeeper', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>' },
    { id: 'chat', label: 'Ask Protractor', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>' },
    { id: 'search', label: 'Search', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>' },
    { id: 'settings', label: '⚙️', icon: null, small: true }
  ];

  return `
    <header class="bg-blue-900 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex items-center gap-4">
          <div class="bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded text-lg">NAPA</div>
          <div>
            <h1 class="text-xl font-semibold">Sylvan Lake AutoPro</h1>
            <p class="text-blue-200 text-sm">Business Dashboard</p>
          </div>
          <div class="ml-auto">
            <button onclick="location.reload()" class="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 rounded-lg text-sm transition-colors">
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      <div class="bg-blue-800">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-end pt-2 overflow-x-auto">
            ${tabs.map(tab => {
              const isActive = tab.id === activeTab;
              const href = tab.id === 'index' ? 'index.html' : `${tab.id}.html`;
              
              if (tab.small) {
                return `
                  <a href="${href}" class="flex items-center justify-center w-10 h-10 rounded-t-lg transition-all ml-1 ${isActive ? 'bg-white text-slate-800 border-t border-l border-r border-slate-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-transparent'}" title="Settings">
                    ${tab.label}
                  </a>
                `;
              }
              
              return `
                <a href="${href}" class="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${tab.id !== tabs[0].id ? 'ml-1' : ''} whitespace-nowrap ${isActive ? 'bg-white text-slate-800 border-t border-l border-r border-slate-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-transparent'}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">${tab.icon}</svg>
                  ${tab.label}
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </header>
  `;
}
