// Payout holds: the investigations analyst's dashboard, in Paystack's dashboard language.
// Every number on screen is read or derived from data.js. All names and figures are fictional.
(function () {
  const D = window.DATA, E = D.ebun, P = D.pane, C = D.clock;
  const naira = n => 'NGN ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const FLAGGED = E.flagged.amount;
  const TOTAL = P.payout.reduce((a, p) => a + p.amount, 0);
  const OTHER = TOTAL - FLAGGED;
  const RULE = k => D.rules[k];
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  // ---------- Merchant messages: only safe-to-share sentences (never the rule, a score or a comparison) ----------
  const MSG = {
    partOnWay: () => `${naira(OTHER)} of your payout is on its way and will reach your bank by ${C.arrives}.`,
    onHold: part => part ? `One payment of ${naira(FLAGGED)} from ${E.flagged.date} is still being checked.` : `Your payout of ${naira(TOTAL)} from ${E.payoutDue} is on hold while we check one payment of ${naira(FLAGGED)} from ${E.flagged.date}.`,
    askDocs: (items, by) => `To release it, please send ${items} by ${by}. Reply to this email or upload them in your dashboard.`,
    mistake: part => part ? `We held ${naira(FLAGGED)} of your payout by mistake.` : `We held your payout of ${naira(TOTAL)} by mistake.`,
    released: () => `It has been released and will reach your bank by ${C.arrives}.`,
    sorry: () => "We're sorry for the delay. We've told the team responsible, so it's less likely to happen again.",
    lifted: part => part ? `The remaining ${naira(FLAGGED)} of your payout has been released and will reach your bank by ${C.arrives}. Thank you for sending the documents.` : `Your payout of ${naira(TOTAL)} has been released and will reach your bank by ${C.arrives}. Thank you for your patience.`,
    review: () => "Your payout is still under review. We'll contact you as soon as we have an update."
  };
  const DOCS = { po: 'the purchase order or invoice', dn: 'the delivery note', cc: "your customer's contact details" };
  const joinItems = keys => { const n = keys.map(k => DOCS[k]); return n.length <= 1 ? n.join('') : n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1]; };

  // ---------- Icons ----------
  const I = {
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18"/>',
    esc: '<path d="M7 17L17 7M9 7h8v8"/>', bot: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>', chev: '<path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>',
    panel: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/>', bell: '<path d="M6 16V11a6 6 0 1112 0v5l2 2H4z"/><path d="M10 20a2 2 0 004 0"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1-1.5 2M12 17h.01"/>',
    cog: '<path d="M10.3 4.3a1.7 1.7 0 013.4 0 1.7 1.7 0 002.6 1.1 1.7 1.7 0 012.4 2.4 1.7 1.7 0 001.1 2.6 1.7 1.7 0 010 3.4 1.7 1.7 0 00-1.1 2.6 1.7 1.7 0 01-2.4 2.4 1.7 1.7 0 00-2.6 1.1 1.7 1.7 0 01-3.4 0 1.7 1.7 0 00-2.6-1.1 1.7 1.7 0 01-2.4-2.4 1.7 1.7 0 00-1.1-2.6 1.7 1.7 0 010-3.4 1.7 1.7 0 001.1-2.6 1.7 1.7 0 012.4-2.4 1.7 1.7 0 002.6-1.1z"/><circle cx="12" cy="12" r="3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>', down: '<path d="M6 9l6 6 6-6"/>',
    bank: '<path d="M4 10h16M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M12 4l8 4H4z"/>', more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  const ic = (n, s = 18) => `<svg class="i" viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true">${I[n]}</svg>`;
  const SEVC = { Critical: '#d92d20', High: '#e8590c', Medium: '#b7791f', Low: '#646a71' };
  const tri = lvl => `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M7.1 1.9a1 1 0 011.8 0l6 11A1 1 0 0114 14.5H2a1 1 0 01-.9-1.6z" fill="${SEVC[lvl]}"/><rect x="7.3" y="5.5" width="1.4" height="4.6" rx=".7" fill="#fff"/><circle cx="8" cy="12" r=".85" fill="#fff"/></svg>`;
  const sev = lvl => `<span class="sev ${lvl}">${tri(lvl)}${lvl}</span>`;
  const STATUS_CLASS = { 'New': 'b-info', 'In review': 'b-warn', 'Escalated': 'b-bad', 'Waiting on merchant': 'b-grey', 'Documents received': 'b-info', 'Waiting for approval': 'b-warn', 'Closed': 'b-ok' };
  const STATUS_SHORT = { 'Waiting on merchant': 'Waiting', 'Waiting for approval': 'Approval' };
  const badge = s => `<span class="badge ${STATUS_CLASS[s] || 'b-grey'}">${esc(STATUS_SHORT[s] || s)}</span>`;
  const initials = n => !n ? '—' : n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const who = n => `<span class="who"><span class="av">${n ? initials(n) : '—'}</span>${n ? esc(n) : '<span style="color:var(--ink-3)">Unassigned</span>'}</span>`;

  // ---------- State ----------
  const S = {
    view: 'cases', sel: null, tab: 'overview', wide: false, details: false, filterOpen: true, q: '',
    modal: null, form: {}, toast: null, menu: null, spot: {},
    ebun: { status: 'New', assignee: null, partReleased: false, outcome: null, reasons: [], note: '', asked: null, team: null, events: [], heldInError: false, message: null },
    over: {}
  };
  const ME = D.analyst.short;
  const x = () => S.ebun;
  const ebunHeld = () => x().partReleased ? FLAGGED : TOTAL;
  const log = (who, text) => x().events.push([who, C.start.replace('09:30', clockNow()), text]);
  let minute = 31; const clockNow = () => { minute += 4; const h = 9 + Math.floor(minute / 60), m = minute % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; };

  // ---------- Cases ----------
  const SEV = ['Critical', 'High', 'Medium', 'Low'];
  const toMin = t => { if (!t) return 1e9; const m = t.match(/(?:(\d+)d)?\s*(?:(\d+)h)?\s*(?:(\d+)m)?/); return (+(m[1] || 0)) * 1440 + (+(m[2] || 0)) * 60 + (+(m[3] || 0)); };
  const created = t => { const d = { Mon: 0, Tue: 1, Wed: 2 }[t.slice(0, 3)]; const [h, m] = t.split(', ')[1].split(':'); return d * 1440 + (+h) * 60 + (+m); };
  function allCases() {
    const e = { id: 'ebun', name: E.name, severity: P.severity, dueIn: P.dueIn, held: ebunHeld(), rule: 'amount', created: P.created, status: x().status, assignee: x().assignee };
    return [e, ...D.others.map(o => ({ id: o.id, name: o.name, severity: o.severity, dueIn: o.dueIn, held: o.held, rule: o.rule, created: o.created, status: o.status, assignee: o.assignee, ...(S.over[o.id] || {}) }))];
  }
  const isOpen = c => c.status !== 'Closed';
  const rank = c => (c.status === 'Closed' ? 9e7 : 0) + SEV.indexOf(c.severity) * 1e7 + (c.status === 'Waiting on merchant' ? 5e6 : 0) + Math.min(toMin(c.dueIn), 99999) * 10 + created(c.created) / 1e4;
  function visibleCases(only) {
    let list = allCases();
    if (only === 'escalated') list = list.filter(c => c.status === 'Escalated');
    else if (S.filterOpen) list = list.filter(isOpen);
    if (S.q.trim()) { const q = S.q.trim().toLowerCase(); list = list.filter(c => (c.name + ' ' + (c.id === 'ebun' ? E.id : '') + ' ' + RULE(c.rule).id).toLowerCase().includes(q)); }
    return list.sort((a, b) => rank(a) - rank(b));
  }
  function counts() {
    const open = allCases().filter(isOpen);
    return { critical: open.filter(c => c.severity === 'Critical').length, open: open.length, mine: open.filter(c => c.assignee === ME).length, fresh: open.filter(c => c.status === 'New' && !c.assignee).length, escalated: open.filter(c => c.status === 'Escalated').length };
  }

  // ---------- Shell ----------
  function shell(inner) {
    const c = counts();
    const nav = (v, icon, label, count) => `<button data-act="nav" data-v="${v}" ${S.view === v ? 'aria-current="page"' : ''}>${ic(icon)}${label}${count ? `<span class="count" aria-label="${count} open">${count}</span>` : ''}</button>`;
    return `<div class="app">
      <aside class="side" aria-label="Main">
        <div class="ws"><div class="av" aria-hidden="true">P</div><div><b>Paystack Risk</b><small>Investigations</small></div>${ic('chev')}</div>
        <nav class="nav">${nav('cases', 'briefcase', 'My cases', c.open)}${nav('escalated', 'esc', 'Escalated')}${nav('auto', 'bot', 'Auto-review')}${nav('rules', 'shield', 'Rules')}</nav>
        <div class="me"><span class="av" aria-hidden="true">IO</span>${esc(D.analyst.name)}</div>
      </aside>
      <div class="main">
        <div class="top">${ic('panel')}<span class="sp"></span>
          <button class="iconbtn" data-act="toast" data-v="1 new case in the last hour: Bolu Prints (Medium)." aria-label="Notifications">${ic('bell', 20)}</button>
          <button class="iconbtn" data-act="guide" aria-label="How to use this prototype">${ic('help', 20)}</button>
          <button class="iconbtn" aria-label="Settings" data-act="toast" data-v="Settings are not part of this prototype.">${ic('cog', 20)}</button>
        </div>
        <div class="sheets">${inner}</div>
      </div>
    </div>`;
  }
  const dateChip = `<span class="datechip">${ic('cal', 16)}Today, Wed 18 Nov 2026${ic('down', 14)}</span>`;
  const stat = (l, v, cls = '') => `<div class="stat"><div class="l">${l}</div><div class="v ${cls}">${v}</div></div>`;

  // ---------- Cases page ----------
  function casesPage(only) {
    const c = counts(), pane = !!S.sel;
    const list = visibleCases(only);
    const full = !pane;
    const rows = list.map(k => `<tr class="click" data-act="open" data-v="${k.id}" tabindex="0" aria-selected="${S.sel === k.id}">
      <td><span class="sevcell">${sev(k.severity)}<span class="due">${k.status === 'Closed' ? 'Resolved' : (k.dueIn || '—')}</span></span></td>
      <td>${esc(k.name)}</td>
      <td class="r">${naira(k.held)}</td>
      ${full ? `<td class="trunc">${RULE(k.rule).id} ${esc(RULE(k.rule).name)}</td><td class="muted">${k.created}</td>` : ''}
      <td>${badge(k.status)}</td>
      <td>${who(k.assignee)}</td>
      <td class="r"><button class="more" data-act="menu" data-v="${k.id}" aria-label="More actions for ${esc(k.name)}">${ic('more')}</button></td></tr>`).join('');
    const title = only === 'escalated' ? 'Escalated' : 'Investigations dashboard';
    const menu = S.menu ? menuFor(S.menu) : '';
    return `<main class="sheet page" id="main" tabindex="-1">
      <div class="page-head"><h1>${title}</h1><span class="sp"></span>${dateChip}</div>
      ${only === 'escalated' ? '' : `<div class="stats">${stat('Critical', c.critical, 'crit')}${stat('Open cases', c.open)}${stat('Assigned to me', c.mine)}${stat('New, unassigned', c.fresh)}</div>`}
      <section class="tcard" aria-label="Cases">
        <div class="tbar"><h2>Cases</h2>
          <button class="chip dash" data-act="toast" data-v="Filters by severity, rule, amount and assignee would sit here.">${ic('plus', 14)}Add filter</button>
          ${S.filterOpen && only !== 'escalated' ? `<button class="chip" data-act="clearfilter" aria-label="Remove filter: status is open"><span class="k">Status is</span> Open ${ic('x', 14)}</button>` : ''}
          <span class="sp"></span>
          <label class="search">${ic('search', 16)}<span class="sr" style="position:absolute;left:-9999px">Search</span><input id="q" type="search" placeholder="Search business or case ID" value="${esc(S.q)}" data-act="search"></label>
        </div>
        <div class="twrap" style="position:relative">${list.length ? `<table>
          <thead><tr><th>Severity / due in</th><th>Business</th><th class="r">Amount</th>${full ? '<th>Case type</th><th>Created on</th>' : ''}<th>Status</th><th>Assignee</th><th><span style="position:absolute;left:-9999px">Actions</span></th></tr></thead>
          <tbody>${rows}</tbody></table>${menu}` : `<p class="empty">No cases match.</p>`}</div>
        <div class="tfoot"><span>Showing ${list.length} of ${list.length} ${S.filterOpen && only !== 'escalated' ? 'open ' : ''}cases.</span><span class="sp"></span><button class="btn sm" disabled>Previous</button><button class="btn sm" disabled>Next</button></div>
      </section>
    </main>${pane ? casePane() : ''}`;
  }
  function menuFor(id) {
    const k = allCases().find(c => c.id === id); if (!k) return '';
    return `<div class="menu" role="menu" style="top:${48 + 52 * visibleCases().findIndex(c => c.id === id)}px">
      <button role="menuitem" data-act="open" data-v="${id}">Open case</button>
      ${id === 'ebun' && !x().assignee ? '<button role="menuitem" data-act="assign">Assign to me</button>' : ''}
      <button role="menuitem" data-act="closemenu">Close menu</button></div>`;
  }

  // ---------- Case pane: exactly the four tabs in Victor's Figma (Overview, Transactions, Accounts, Activity) ----------
  const OPEN_ACT = ['New', 'In review', 'Waiting on merchant', 'Documents received', 'Escalated'];
  const caseInfo = id => {
    if (id === 'ebun') return { name: E.name, caseId: E.id, held: ebunHeld(), sender: E.flagged.payer, rule: 'amount', flagged: `Flagged ${naira(FLAGGED)} · Card · ${E.flagged.when}`, payout: P.payout, business: P.business, party: P.counterparty, activity: [...P.activity, ...x().events] };
    const o = D.others.find(c => c.id === id), d = D.details[id], st = S.over[id] || {};
    return { name: o.name, caseId: d.caseId, held: o.held, sender: d.sender, rule: o.rule, flagged: d.flaggedNote, payout: d.payout, business: d.business, party: d.party, activity: [...d.activity, ...(st.events || [])], resolution: st.resolution || d.resolution, since: d.since };
  };
  function casePane() {
    const id = S.sel, k = allCases().find(c => c.id === id);
    if (!k) return '';
    const info = caseInfo(id);
    const tabs = ['overview', 'transactions', 'accounts', 'activity'];
    const tabNames = { overview: 'Overview', transactions: 'Transactions', accounts: 'Accounts', activity: 'Activity' };
    const body = { overview, transactions, accounts, activity }[S.tab](k, info);
    const canAct = OPEN_ACT.includes(k.status);
    return `<aside class="sheet pane" aria-label="Case ${esc(k.name)}" style="${S.wide ? 'width:auto;flex:1' : ''}">
      <div class="pane-head"><h2>${esc(k.name)}</h2><span class="id">${info.caseId}</span>${badge(k.status)}<span class="sp"></span>
        <button class="iconbtn" data-act="closepane" aria-label="Close case">${ic('x')}</button></div>
      <div class="tabs" role="tablist">${tabs.map(t => `<button role="tab" id="tab-${t}" aria-selected="${S.tab === t}" data-act="tab" data-v="${t}">${tabNames[t]}</button>`).join('')}</div>
      <div class="pane-body" role="tabpanel" aria-labelledby="tab-${S.tab}">${body}</div>
      ${canAct ? `<div class="pane-foot"><button class="btn pri" data-act="modal" data-v="resolve">Resolve</button><button class="btn" data-act="modal" data-v="escalate">Escalate</button><button class="btn" data-act="modal" data-v="ask" ${k.status === 'Waiting on merchant' ? 'disabled' : ''}>Request info</button><span class="sp"></span><button class="link" data-act="wide">${S.wide ? 'Back to list' : 'View case'}</button></div>` : ''}
    </aside>`;
  }
  function overview(k, info) {
    const e = x(), isE = k.id === 'ebun';
    const top = [];
    // States the Figma doesn't draw are kept to one line each: approval (maker-checker) and waiting on the business.
    if (k.status === 'Waiting for approval') top.push(`<div class="banner warn" role="status"><b>Waiting for ${D.checker.short} to approve.</b><div class="row"><button class="btn sm pri" data-act="approve">Demo: approve as ${D.checker.short}</button></div></div>`);
    if (k.status === 'Waiting on merchant' && isE) top.push(`<div class="banner info" role="status"><b>Waiting for Ebun until ${e.asked.by}.</b><div class="row"><button class="btn sm" data-act="docsin">Demo: Ebun sends the documents</button></div></div>`);
    if (k.status === 'Closed') {
      const r = isE ? { outcome: 'False positive', line1: `${naira(ebunHeld())} released · Arrives ${C.arrives}`, line2: `Approved by ${D.checker.name}`, message: e.message } : info.resolution;
      if (r) top.push(`<div class="stat sm res" role="status"><div class="l">Resolution</div><div class="v">${esc(r.outcome)}</div><div class="n">${esc(r.line1)}</div>${r.line2 ? `<div class="n">${esc(r.line2)}</div>` : ''}${r.message ? `<div class="told"><div class="l">What ${esc(isE ? 'Ebun' : k.name)} was told</div><div class="tm">${esc(r.message)}</div></div>` : ''}</div>`);
    }
    const sevNote = k.status === 'Closed' ? 'Resolved' : k.dueIn ? `Due in ${k.dueIn}` : 'Deadline set by the team';
    const since = isE ? (e.assignee ? `Since ${C.tookCase.split(', ')[1]}` : '') : (S.over[k.id] && S.over[k.id].assignee === ME ? 'Since just now' : info.since);
    return `${top.join('')}
      <div class="facts">
        <div class="stat sm wide"><div class="l">Payout held</div><div class="v">${naira(info.held)}</div><div class="n">${esc(info.name)} · ${esc(info.flagged)}</div></div>
        <div class="stat sm"><div class="l">Severity</div><div class="v ${k.severity}">${sev(k.severity)}</div><div class="n">${sevNote}</div></div>
        <div class="stat sm"><div class="l">Assignee</div><div class="v">${esc(k.assignee || 'Unassigned')}</div>${!k.assignee ? '<button class="link" data-act="assign" style="font-size:13px">Assign to me</button>' : since ? `<div class="n">${esc(since)}</div>` : ''}</div>
      </div>
      <div class="sec"><div class="sec-h"><h3>Who is involved</h3></div><div class="list">
        <div class="lrow"><span class="ico">${ic('bank', 16)}</span><div class="grow"><small>Receiver</small><b>${esc(info.name)}</b></div></div>
        <div class="lrow"><span class="ico">${ic('bank', 16)}</span><div class="grow"><small>Sender</small><b>${esc(info.sender)}</b></div></div>
        <div class="lrow"><span class="ico">${ic('bank', 16)}</span><div class="grow"><small>Flagged rule</small><b>${RULE(info.rule).id} · ${esc(RULE(info.rule).name)}</b></div></div>
      </div></div>
      <button class="link" data-act="wide">${S.wide ? 'Back to list' : 'View case details'}</button>`;
  }
  function transactions(k, info) {
    const row = p => `<div class="lrow"><div class="grow"><b>${esc(p.who)}</b><small>${esc(p.via)}</small></div><div class="amt"><b>${naira(p.amount)}</b><small>${p.when}</small></div></div>`;
    return `<div class="sec"><div class="sec-h"><h3>Recent transactions</h3></div><div class="list">
        <div class="lrow total"><div class="grow" style="color:var(--ink-3)">Total amount on hold</div><b>${naira(info.held)}</b></div>
        ${info.payout.map(row).join('')}
      </div></div>`;
  }
  // The rows and their order come from the Figma; other cases' data is mapped onto the same rows.
  const BIZ_ROWS = ['Name', 'Verification', 'Limit', 'Restrictions before', 'Past holds', 'Disputes, 90 days', 'Refunds, 90 days', 'Sanctions and PEP', 'Linked accounts', 'Contact'];
  const PARTY_ROWS = ['Name', 'Card', 'On Paystack', 'Disputes and chargebacks', 'Restrictions and blocklists', 'Sanctions and PEP'];
  const KEYMAP = { 'Who': 'Name', 'Cards': 'Card', 'Disputes': 'Disputes, 90 days', 'Refunds': 'Refunds, 90 days' };
  const FILL = { 'Card': ['None', 'Paid by bank transfer'], 'Disputes and chargebacks': ['None'], 'Restrictions and blocklists': ['None'], 'Sanctions and PEP': ['No match'] };
  function shape(rows, order) {
    const m = {}; rows.forEach(r => { const key = KEYMAP[r[0]] || r[0]; if (order.includes(key)) m[key] = [key, r[1], r[2]]; });
    return order.filter(key => m[key] || FILL[key]).map(key => m[key] || [key, ...FILL[key]]);
  }
  const kv = rows => `<div class="list">${rows.map(r => `<div class="lrow kv"><span class="k">${esc(r[0])}</span><span class="v"><b>${esc(r[1])}</b>${r[2] ? `<small>${esc(r[2])}</small>` : ''}</span></div>`).join('')}</div>`;
  function accounts(k, info) {
    return `<div class="sec"><div class="sec-h"><h3>Business</h3></div>${kv(shape(info.business, BIZ_ROWS))}</div>
      <div class="sec"><div class="sec-h"><h3>Counterparty</h3></div>${kv(shape(info.party, PARTY_ROWS))}</div>`;
  }
  function activity(k, info) {
    const ev = info.activity;
    return `<div class="sec"><div class="sec-h"><h3>Timeline</h3></div><div class="tl">${ev.map((e, i) => `<div class="ev ${i === ev.length - 1 ? 'now' : ''}"><div class="rail"><i></i><span></span></div><div class="txt"><b>${esc(e[0])}</b><small>${esc(e[1])}</small><p>${esc(e[2])}</p></div></div>`).join('')}</div></div>`;
  }

  // ---------- Auto-review ----------
  function autoPage() {
    const A = D.autoReview.summary;
    const VB = { 'Passed to analysts': 'b-warn', 'Cleared automatically': 'b-ok', 'Evaluating': 'b-grey', 'Sent to compliance': 'b-bad', 'Taken over by you': 'b-info' };
    const rows = D.autoReview.rows.map(r => {
      const verdict = S.spot[r.id] === 'taken' ? 'Taken over by you' : r.verdict;
      const held = r.held == null ? TOTAL : r.held;
      const why = r.id === 'ebun' ? `No card history with this payer; ${Math.round(FLAGGED / E.largestCardPayment)} times their largest card payment` : r.why;
      const act = r.verdict === 'Cleared automatically' ? (S.spot[r.id] ? '<span class="badge b-ok">Spot-checked</span>' : `<button class="link" data-act="spot" data-v="${r.id}">Spot-check</button>`)
        : r.verdict === 'Evaluating' ? (S.spot[r.id] ? '<span class="badge b-info">Yours now</span>' : `<button class="link" data-act="takeover" data-v="${r.id}">Take over</button>`)
          : r.verdict === 'Passed to analysts' ? `<button class="link" data-act="open" data-v="${r.id}">Open case</button>` : `<button class="link" data-act="toast" data-v="Sanctions matches stay with the compliance team.">View</button>`;
      return `<tr><td class="two">${esc(r.name)}<small>Checked ${r.when}</small></td><td class="two" style="font-weight:400">${RULE(r.rule).id} · ${esc(RULE(r.rule).name)}</td><td class="r">${naira(held)}</td><td><span class="badge ${VB[verdict]}">${verdict}</span></td><td class="why">${esc(why)}</td><td>${act}</td></tr>`;
    }).join('');
    return `<main class="sheet page" id="main" tabindex="-1">
      <div class="page-head"><h1>Auto-review</h1><span class="sp"></span>${dateChip}</div>
      <div class="stats">${stat('Holds checked', A.held)}${stat('Cleared automatically', A.cleared)}${stat('Passed to analysts', A.toAnalysts)}${stat('Sent to specialists', A.toSpecialists)}</div>
      <section class="tcard" aria-label="Auto-review decisions"><div class="tbar"><h2>Cases</h2><button class="chip dash" data-act="toast" data-v="Filters would sit here.">${ic('plus', 14)}Add filter</button><button class="chip" data-act="toast" data-v="Shows holds auto-review checked today."><span class="k">Status is</span> Open ${ic('x', 14)}</button><span class="sp"></span><label class="search">${ic('search', 16)}<input type="search" placeholder="Search business or case ID" aria-label="Search"></label></div>
        <div class="twrap"><table><thead><tr><th>Business</th><th>Rule</th><th class="r">Amount held</th><th>Verdict</th><th>Why</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
        <div class="tfoot"><span>Showing ${D.autoReview.rows.length} of ${A.held} holds checked.</span><span class="sp"></span><button class="btn sm" disabled>Previous</button><button class="btn sm" disabled>Next</button></div></section>
    </main>`;
  }

  // ---------- Rules ----------
  function rulesPage() {
    const rows = Object.entries(D.rules).map(([k, r]) => {
      const h = D.ruleHealth.find(z => z.rule === k) || { holds: 0, autoCleared: 0, heldInError: 0 };
      const err = h.heldInError + (k === 'amount' && x().heldInError ? 1 : 0);
      return `<tr><td class="two">${r.id} · ${esc(r.name)}<small>${esc(r.looksFor)}</small></td><td>${r.auto ? '<span class="badge b-ok">Can clear</span>' : '<span class="badge b-grey">Never clears</span>'}</td><td style="font-weight:400">${esc(r.to)}</td><td class="r">${h.holds}</td><td class="r">${h.autoCleared}</td><td class="r">${err}${err >= 4 ? ' <span class="badge b-warn">Review rule</span>' : ''}</td></tr>`;
    }).join('');
    return `<main class="sheet page" id="main" tabindex="-1">
      <div class="page-head"><h1>Rules</h1><span class="sp"></span><span class="datechip">This week</span><p class="sub">Which rules hold payouts, who gets the case, and how often a hold turned out to be a mistake.</p></div>
      <section class="tcard"><div class="twrap"><table><thead><tr><th>Rule</th><th>Auto-review</th><th>Goes to</th><th class="r">Holds</th><th class="r">Cleared automatically</th><th class="r">Held in error</th></tr></thead><tbody>${rows}</tbody></table></div></section>
    </main>`;
  }

  // ---------- Dialogs ----------
  // Resolve is exactly Victor's spec: outcome, reasons (more than one allowed), notes, submit.
  function dialog() {
    if (!S.modal) return '';
    const f = S.form, k = S.sel ? allCases().find(c => c.id === S.sel) : null;
    const info = k ? caseInfo(k.id) : null;
    let title, sub = k ? `${info.name} · ${info.caseId} · ${naira(info.held)} held` : '', body = '', foot = '';
    const err = f.error ? `<p class="err" role="alert">${f.error}</p>` : '';
    if (S.modal === 'resolve') {
      title = 'Resolve case';
      const opts = [['fp', 'False positive', 'The payment is genuine. Release the payout.'], ['tp', 'True positive', 'The risk is real. The hold stays and the financial crime team takes over.']];
      const reasons = f.outcome ? D.reasons[f.outcome] : [];
      body = `<fieldset class="field"><legend>Outcome</legend>${opts.map(([v, t, d]) => `<label class="opt ${f.outcome === v ? 'on' : ''}"><input type="radio" name="outcome" value="${v}" ${f.outcome === v ? 'checked' : ''} data-act="outcome" id="o-${v}"><span><b>${t}</b><small>${d}</small></span></label>`).join('')}</fieldset>
        ${f.outcome ? `<fieldset class="field"><legend>Reason for resolution</legend><span class="hint" style="margin-top:-6px">Select all that apply.</span><div class="cbs">${reasons.map((r, i) => `<label class="cb"><input type="checkbox" data-act="reason" value="${esc(r)}" id="r-${i}" ${(f.reasons || []).includes(r) ? 'checked' : ''}><span>${esc(r)}</span></label>`).join('')}</div></fieldset>` : ''}
        <div class="field"><label class="t" for="rnote">Notes</label><textarea id="rnote" data-act="formnote" placeholder="What did you see that decided it?">${esc(f.note || '')}</textarea></div>${err}`;
      foot = `<span class="note"></span><button class="btn" data-act="cancel">Cancel</button><button class="btn pri" data-act="submitresolve">Submit</button>`;
    } else if (S.modal === 'escalate') {
      title = 'Escalate case';
      const teams = [['Financial crime', 'Signs of laundering or fraud beyond this payment'], ['Compliance', 'Sanctions, PEP or a request from an authority'], ['Investigations lead', 'You need a second opinion or more authority']];
      body = `<fieldset class="field"><legend>Send to</legend>${teams.map(([t, d], i) => `<label class="opt ${f.team === t ? 'on' : ''}"><input type="radio" name="team" value="${t}" ${f.team === t ? 'checked' : ''} data-act="team" id="t-${i}"><span><b>${t}</b><small>${d}</small></span></label>`).join('')}</fieldset>
        <div class="field"><label class="t" for="rnote">Notes</label><textarea id="rnote" data-act="formnote" placeholder="What should the team look at first?">${esc(f.note || '')}</textarea></div>${err}`;
      foot = `<span class="note"></span><button class="btn" data-act="cancel">Cancel</button><button class="btn pri" data-act="submitescalate">Escalate</button>`;
    } else if (S.modal === 'ask') {
      title = 'Request info';
      const items = f.items || ['po', 'dn'];
      const w = C.windows[f.window || 2];
      const isE = k && k.id === 'ebun';
      const msg = isE ? [MSG.onHold(x().partReleased), items.length ? MSG.askDocs(joinItems(items), w.by) : null].filter(Boolean).join(' ')
        : `Your payout of ${naira(info.held)} is on hold while we check some payments.${items.length ? ' ' + MSG.askDocs(joinItems(items), w.by) : ''}`;
      body = `<fieldset class="field"><legend>Ask for</legend><div class="cbs">${Object.entries(DOCS).map(([key, t]) => `<label class="cb"><input type="checkbox" data-act="item" value="${key}" id="i-${key}" ${items.includes(key) ? 'checked' : ''}><span>${t.charAt(0).toUpperCase() + t.slice(1)}</span></label>`).join('')}</div></fieldset>
        <div class="field"><label class="t" for="win">Reply by</label><select id="win" data-act="window">${[1, 2, 3].map(n => `<option value="${n}" ${(f.window || 2) === n ? 'selected' : ''}>${n} working day${n > 1 ? 's' : ''}: ${C.windows[n].by}</option>`).join('')}</select></div>
        <div class="field"><span class="t" style="font-weight:500">Message to ${esc(info.name)}</span><div class="preview">${esc(msg)}</div></div>${err}`;
      foot = `<span class="note"></span><button class="btn" data-act="cancel">Cancel</button><button class="btn pri" data-act="submitask">Send request</button>`;
    } else if (S.modal === 'guide') {
      title = 'How to use this prototype'; sub = 'A design exercise for a Paystack take-home, not a Paystack product. Every name and number is fictional.';
      body = `<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px">
        <li>The dashboard puts the most severe case first. Severity is based on time: High means the payout is already late.</li>
        <li>Open <b>Ebun Furniture Studio</b> and read the tabs: Overview, Transactions, Accounts, Activity.</li>
        <li>Resolve it: pick false positive, select the reasons, add a note and submit. Over ${naira(D.thresholds.approvalOver)}, ${D.checker.short} approves before money moves.</li>
        <li>Or try Escalate and Request info, or open Auto-review from the side menu.</li></ol>`;
      foot = `<span class="note"></span><button class="btn pri" data-act="cancel">Got it</button>`;
    }
    return `<div class="scrim" data-act="scrim"><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
      <div class="d-head"><div><h2 id="dlg-title">${title}</h2><p>${esc(sub)}</p></div><span class="sp"></span><button class="iconbtn" data-act="cancel" aria-label="Close">${ic('x')}</button></div>
      <div class="d-body">${body}</div><div class="d-foot">${foot}</div></div></div>`;
  }

  // ---------- Actions ----------
  const ov = id => (S.over[id] = S.over[id] || { events: [] });
  const logTo = (id, who, text) => id === 'ebun' ? log(who, text) : ov(id).events.push([who, C.start.replace('09:30', clockNow()), text]);
  function assign(id = S.sel || 'ebun') {
    if (id === 'ebun') { const e = x(); if (!e.assignee) { e.assignee = ME; if (e.status === 'New') e.status = 'In review'; log(ME, 'Assigned the case to herself'); } return; }
    const k = allCases().find(c => c.id === id), o = ov(id);
    if (!k.assignee) { o.assignee = ME; if (k.status === 'New') o.status = 'In review'; logTo(id, ME, 'Assigned the case to herself'); }
  }
  function toast(t) { S.toast = t; clearTimeout(toast.t); toast.t = setTimeout(() => { S.toast = null; render(); }, 3200); }
  function submitResolve() {
    const f = S.form, id = S.sel;
    if (!f.outcome) return (f.error = 'Choose an outcome.');
    if (!(f.reasons || []).length) return (f.error = 'Select at least one reason.');
    if (!(f.note || '').trim()) return (f.error = 'Add a note.');
    assign(id); const note = f.note.trim();
    if (id === 'ebun') {
      const e = x(); e.outcome = f.outcome; e.reasons = f.reasons; e.note = note;
      if (f.outcome === 'tp') { e.status = 'Escalated'; e.team = 'Financial crime'; e.assignee = 'Financial crime'; log(ME, `Resolved as a true positive (${f.reasons.join('; ')}). The hold stays; sent to Financial crime. Note: ${note}`); toast('Resolved as a true positive. The hold stays.'); }
      else {
        e.heldInError = f.reasons.some(r => D.reasons.fp.indexOf(r) >= 0 && D.reasons.fp.indexOf(r) <= 2);
        e.message = f.reasons.includes(D.reasons.fp[3]) ? MSG.lifted(e.partReleased) : `${MSG.mistake(e.partReleased)} ${MSG.released()} ${MSG.sorry()}`;
        if (ebunHeld() > D.thresholds.approvalOver) { e.status = 'Waiting for approval'; log(ME, `Resolved as a false positive (${f.reasons.join('; ')}) and sent to ${D.checker.short} for approval. Note: ${note}`); toast(`Sent to ${D.checker.short} for approval.`); }
        else approve('ebun');
      }
    } else {
      const k = allCases().find(c => c.id === id), o = ov(id);
      if (f.outcome === 'tp') { o.status = 'Escalated'; o.assignee = 'Financial crime'; logTo(id, ME, `Resolved as a true positive (${f.reasons.join('; ')}). Sent to Financial crime. Note: ${note}`); toast('Resolved as a true positive. The hold stays.'); }
      else if (k.held > D.thresholds.approvalOver) { o.status = 'Waiting for approval'; o.pending = f.reasons; logTo(id, ME, `Resolved as a false positive (${f.reasons.join('; ')}) and sent to ${D.checker.short} for approval. Note: ${note}`); toast(`Sent to ${D.checker.short} for approval.`); }
      else { o.pending = f.reasons; approve(id, true); }
    }
    S.modal = null; S.form = {}; S.tab = 'overview';
  }
  function approve(id = S.sel, self) {
    if (id === 'ebun') { const e = x(); e.status = 'Closed'; log(D.checker.short, `Approved. ${naira(ebunHeld())} released; arrives ${C.arrives}.`); log('System', `Ebun was told: ${e.message}`); if (e.heldInError) log('System', `Reason sent to the owners of rule ${RULE('amount').id} and auto-review.`); toast(`Released ${naira(ebunHeld())}. Arrives ${C.arrives}.`); return; }
    const k = allCases().find(c => c.id === id), o = ov(id);
    o.status = 'Closed';
    o.resolution = { outcome: 'False positive', line1: `${naira(k.held)} released · Arrives ${C.arrives}`, line2: self ? `Closed by ${ME}` : `Approved by ${D.checker.name}`, message: `Your payout of ${naira(k.held)} has been released and will reach your bank by ${C.arrives}.` };
    logTo(id, self ? ME : D.checker.short, `${self ? 'Closed' : 'Approved'}. ${naira(k.held)} released; arrives ${C.arrives}.`);
    toast(`Released ${naira(k.held)}. Arrives ${C.arrives}.`);
  }

  const app = document.getElementById('app');
  function render() {
    const active = document.activeElement && document.activeElement.id;
    const inner = S.view === 'auto' ? autoPage() : S.view === 'rules' ? rulesPage() : casesPage(S.view === 'escalated' ? 'escalated' : null);
    app.innerHTML = shell(inner) + dialog() + (S.toast ? `<div class="toast" role="status">${esc(S.toast)}</div>` : '');
    const back = active && document.getElementById(active);
    if (back) { back.focus(); if (back.tagName === 'INPUT' && back.type !== 'checkbox' && back.type !== 'radio') { try { back.setSelectionRange(back.value.length, back.value.length); } catch (e) { /* not a text field */ } } } else if (S.modal) { const d = app.querySelector('.dialog input, .dialog select, .dialog textarea, .dialog button'); d && d.focus(); }
  }

  app.addEventListener('click', ev => {
    const t = ev.target.closest('[data-act]'); if (!t) return;
    const a = t.dataset.act, v = t.dataset.v;
    if (a === 'scrim') { if (ev.target === t) { S.modal = null; S.form = {}; render(); } return; }
    if (['outcome', 'team', 'reason', 'item', 'releasepartcb', 'search', 'formnote', 'window'].includes(a)) return; // handled on change
    if (a === 'more' || a === 'menu') { ev.stopPropagation(); S.menu = S.menu === v ? null : v; return render(); }
    S.menu = null;
    switch (a) {
      case 'nav': S.view = v; S.sel = null; S.wide = false; break;
      case 'open': S.view = S.view === 'auto' ? 'cases' : S.view; if (S.view === 'auto' || S.view === 'rules') S.view = 'cases'; S.sel = v; S.tab = 'overview'; S.details = false; S.wide = false; break;
      case 'closepane': S.sel = null; S.wide = false; break;
      case 'closemenu': break;
      case 'tab': S.tab = v; break;
      case 'wide': S.wide = !S.wide; break;
      case 'details': S.details = !S.details; break;
      case 'clearfilter': S.filterOpen = false; break;
      case 'assign': assign(); toast('Assigned to you.'); break;
      case 'modal': S.modal = v; S.form = v === 'ask' ? { items: ['po', 'dn'], window: 2 } : {}; break;
      case 'guide': S.modal = 'guide'; break;
      case 'cancel': S.modal = null; S.form = {}; break;
      case 'submitresolve': submitResolve(); break;
      case 'submitescalate': { const f = S.form, id = S.sel; if (!f.team) { f.error = 'Choose a team.'; break; } if (!(f.note || '').trim()) { f.error = 'Add a note for the team.'; break; } assign(id); if (id === 'ebun') { const e = x(); e.status = 'Escalated'; e.team = f.team; e.assignee = f.team; } else { const o = ov(id); o.status = 'Escalated'; o.assignee = f.team; } logTo(id, ME, `Escalated to ${f.team}. Note: ${f.note.trim()}`); S.modal = null; S.form = {}; toast(`Escalated to ${f.team}.`); break; }
      case 'submitask': { const f = S.form, id = S.sel; if (!(f.items || []).length) { f.error = 'Choose at least one thing to ask for.'; break; } assign(id); const w = C.windows[f.window || 2];
        if (id === 'ebun') { const e = x(); e.asked = { items: f.items, by: w.by, reminder: w.reminder }; e.status = 'Waiting on merchant'; } else { ov(id).status = 'Waiting on merchant'; }
        logTo(id, ME, `Asked for ${joinItems(f.items)} by ${w.by}.`); S.modal = null; S.form = {}; toast('Request sent.'); break; }
      case 'releasepart': assign(); x().partReleased = true; log(ME, `Released the ${naira(OTHER)} not in question. It arrives ${C.arrives}.`); toast(`${naira(OTHER)} released. Arrives ${C.arrives}.`); break;
      case 'docsin': x().status = 'Documents received'; log('Ebun', `Sent ${E.proof.map(p => p.title).join(' and ')}.`); toast('Ebun sent 2 documents.'); break;
      case 'approve': approve(S.sel); break;
      case 'sendback': { const e = x(); e.status = 'In review'; log(D.checker.short, 'Sent it back: add the August delivery confirmation to the note.'); toast('Sent back to you.'); break; }
      case 'spot': S.spot[v] = 'agreed'; toast('Spot-check recorded: you agree with auto-review.'); break;
      case 'takeover': S.spot[v] = 'taken'; toast('You took this case over from auto-review.'); break;
      case 'toast': toast(v); break;
    }
    render();
  });
  app.addEventListener('change', ev => {
    const t = ev.target, a = t.dataset.act, f = S.form;
    if (a === 'outcome') { f.outcome = t.value; f.reasons = []; f.error = null; }
    else if (a === 'team') { f.team = t.value; f.error = null; }
    else if (a === 'reason') { f.reasons = f.reasons || []; f.reasons = t.checked ? [...f.reasons, t.value] : f.reasons.filter(r => r !== t.value); f.error = null; }
    else if (a === 'item') { f.items = f.items || []; f.items = t.checked ? [...f.items, t.value] : f.items.filter(r => r !== t.value); f.error = null; }
    else if (a === 'releasepartcb') f.releasePart = t.checked;
    else if (a === 'window') f.window = +t.value;
    else return;
    render();
  });
  app.addEventListener('input', ev => {
    const t = ev.target;
    if (t.dataset.act === 'formnote') S.form.note = t.value;
    if (t.dataset.act === 'search') { S.q = t.value; render(); }
  });
  app.addEventListener('submit', ev => {
    ev.preventDefault(); const inp = document.getElementById('note');
    if (inp && inp.value.trim()) { log(ME, `Note: ${inp.value.trim()}`); inp.value = ''; render(); }
  });
  app.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') { if (S.modal) { S.modal = null; S.form = {}; render(); } else if (S.menu) { S.menu = null; render(); } else if (S.sel) { S.sel = null; render(); } }
    if (ev.key === 'Enter' && ev.target.matches('tr.click')) { S.sel = ev.target.dataset.v; S.tab = 'overview'; render(); }
    if (ev.key === 'Tab' && S.modal) { const els = [...app.querySelectorAll('.dialog button, .dialog input, .dialog select, .dialog textarea')]; const i = els.indexOf(document.activeElement); if (ev.shiftKey && i <= 0) { ev.preventDefault(); els[els.length - 1].focus(); } else if (!ev.shiftKey && i === els.length - 1) { ev.preventDefault(); els[0].focus(); } }
  });
  render();
})();
