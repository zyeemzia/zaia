/* ZyeemZia certification engine — shared helpers for the site (app.js) and the book (book.js). */
window.TRACK = window.TRACK || { modules: [], exam: [] };
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  /* inline markup: **bold**, `code`, line breaks */
  const md = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  const plain = s => String(s == null ? '' : s).replace(/\*\*|`/g, '');

  function prepare() {
    const T = window.TRACK;
    const modules = (T.modules || []).slice().sort((a, b) => a.order - b.order);
    const lessons = [];
    modules.forEach(m => m.lessons.forEach((l, i) => { l.module = m; l.index = i; l.gi = lessons.length; lessons.push(l); }));
    const exam = [].concat(...(T.exam || []).map(x => Array.isArray(x) ? x : [x]));
    const terms = []; const seen = new Set();
    lessons.forEach(l => l.blocks.forEach(b => { if (b.type === 'terms') b.items.forEach(t => { const k = t.term.toLowerCase(); if (!seen.has(k)) { seen.add(k); terms.push(Object.assign({ lesson: l }, t)); } }); }));
    terms.sort((a, b) => a.term.localeCompare(b.term));
    return { meta: T.meta || {}, modules, lessons, exam, terms };
  }

  /* signature diagrams */
  function loopSVG(modules, opts) {
    const o = opts || {}; const n = modules.length || 8; const cx = 200, cy = 200, R = 140;
    const pts = modules.map((m, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return { m, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), a }; });
    const arcs = pts.map((p, i) => { const q = pts[(i + 1) % n]; const a1 = p.a + 0.2, a2 = q.a - 0.2 + (i + 1 === n ? 2 * Math.PI : 0);
      const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
      return `<path class="sg-arc" d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" marker-end="url(#sgArrow)"/>`; }).join('');
    const nodes = pts.map((p, i) => {
      const lx = cx + (R + 0) * Math.cos(p.a), ly = cy + (R + 0) * Math.sin(p.a);
      const tag = o.link ? `a href="#module/${p.m.id}"` : 'g';
      return `<${tag} class="sg-node ${o.done && o.done(p.m) ? 'done' : ''}"><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="31"/>
        <text x="${lx.toFixed(1)}" y="${(ly - 3).toFixed(1)}" class="sg-n">${String(i + 1).padStart(2, '0')}</text>
        <text x="${lx.toFixed(1)}" y="${(ly + 13).toFixed(1)}" class="sg-c">${esc(p.m.code)}</text></${o.link ? 'a' : 'g'}>`;
    }).join('');
    return `<svg class="sg sg-loop" viewBox="0 0 400 400" role="img" aria-label="${esc(o.name || 'Framework')}">
      <defs><marker id="sgArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="sg-arrow"/></marker></defs>
      <circle cx="${cx}" cy="${cy}" r="${R}" class="sg-ring"/>${arcs}
      <text x="${cx}" y="${cy - 8}" class="sg-title">${esc(o.center || '')}</text><text x="${cx}" y="${cy + 16}" class="sg-sub">${esc(o.centerSub || '')}</text>
      ${nodes}</svg>`;
  }
  function stackSVG(modules, opts) {
    const o = opts || {}; const list = modules.slice(); const trust = list.length > 1 ? list.pop() : null;
    const W = 460, top = 40, h = 36, gap = 6, x = 20, w = 420;
    const rows = list.slice().reverse().map((m, i) => {
      const y = top + i * (h + gap); const idx = list.length - i; const tag = o.link ? `a href="#module/${m.id}"` : 'g';
      return `<${tag} class="sg-layer ${o.done && o.done(m) ? 'done' : ''}"><rect x="${x + 14}" y="${y}" width="${w - 28}" height="${h}" rx="6"/>
        <text x="${x + 30}" y="${y + h / 2 + 5}" class="sg-n" text-anchor="start">${String(idx).padStart(2, '0')}</text>
        <text x="${x + 62}" y="${y + h / 2 + 5}" class="sg-c" text-anchor="start">${esc(m.code)}</text>
        <text x="${x + w - 28}" y="${y + h / 2 + 5}" class="sg-t" text-anchor="end">${esc(trunc(plain(m.title).split(/[—:]/).pop().trim(), Math.max(8, Math.floor((w - 28 - 62 - 14 - m.code.length * 8.4) / 6.5))))}</text></${o.link ? 'a' : 'g'}>`;
    }).join('');
    const H = top + list.length * (h + gap) + 30;
    const trustTag = trust ? (o.link ? `a href="#module/${trust.id}"` : 'g') : null;
    const frame = trust ? `<${trustTag} class="sg-trust ${o.done && o.done(trust) ? 'done' : ''}"><rect x="${x}" y="${top - 26}" width="${w}" height="${H - top + 30}" rx="14"/>
      <text x="${W / 2}" y="${top - 9}" class="sg-c">${String(modules.length).padStart(2, '0')} · ${esc(trust.code)} — wraps every layer</text></${o.link ? 'a' : 'g'}>` : '';
    return `<svg class="sg sg-stack" viewBox="0 0 ${W} ${H + 20}" role="img" aria-label="${esc(o.name || 'Framework')}">${frame}${rows}</svg>`;
  }
  const trunc = (s, n) => s.length > n ? s.slice(0, n - 1) + '…' : s;
  function signatureSVG(D, opts) {
    const type = (D.meta.signature || {}).type;
    return type === 'stack' ? stackSVG(D.modules, opts) : loopSVG(D.modules, Object.assign({ center: D.meta.short, centerSub: 'Value Loop' }, opts));
  }

  /* small hash for credential IDs */
  function hash(str) { let h1 = 0xdeadbeef ^ str.length, h2 = 0x41c6ce57 ^ str.length; for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36).toUpperCase(); }
  function seeded(seed) { let s = seed >>> 0 || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }

  window.ZZ = { esc, md, plain, prepare, signatureSVG, hash, seeded };
})();
