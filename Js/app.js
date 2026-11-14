(function () {
  "use strict";
  var app = document.getElementById("app");
  var KEY = "amigos_naturaleza_v1";
  var STORIES = window.STORIES, CONFIG = window.CONFIG || {};
  var db = load();
  var Q = null;          // estado del cuestionario en curso
  var adultOK = false;   // sesión del panel del adulto
  var READ_KEY = "amigos_naturaleza_texto";
  var textScale = parseFloat(localStorage.getItem(READ_KEY) || "1") || 1;

  /* ---------- utilidades ---------- */
  function load() {
    try { var d = JSON.parse(localStorage.getItem(KEY)); if (d && d.results) return d; } catch (e) {}
    return { name: "", results: [] };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function plain(h) { return h.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " "); }
  function stars(n, total) {
    var s = "";
    for (var i = 0; i < total; i++) s += '<span class="' + (i < n ? "on" : "") + '">★</span>';
    return '<span class="stars" aria-label="' + n + " de " + total + ' estrellas">' + s + "</span>";
  }
  function setTheme(color) { document.documentElement.style.setProperty("--c", color || "#E4572E"); }
  function render(html, focus) {
    app.innerHTML = html;
    window.scrollTo(0, 0);
    if (focus !== false) { var h = app.querySelector("h1,h2"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES"; u.rate = 0.85;
    var v = window.speechSynthesis.getVoices().filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf("es") === 0; })[0];
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  }
  function stopSpeak() { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }
  var canSpeak = "speechSynthesis" in window;
  function bestOf(name, n) {
    var best = null;
    db.results.forEach(function (r) { if (r.name === name && r.story === n && (best === null || r.score > best)) best = r.score; });
    return best;
  }

  /* ---------- rutas ---------- */
  function route() {
    stopSpeak();
    var h = location.hash.replace(/^#\/?/, "").split("/");
    if (h[0] === "adulto") return adultView();
    if (!db.name) return nameView();
    if (h[0] === "cuento") {
      var s = STORIES[parseInt(h[1], 10) - 1];
      if (s) {
        if (h[2] === "leer") { Q = null; return readView(s, Math.max(0, parseInt(h[3], 10) || 0)); }
        if (h[2] === "preguntas") { if (!Q || Q.n !== s.n) Q = { n: s.n, i: 0, answers: [], locked: false }; return quizView(s); }
      }
    }
    Q = null;
    homeView();
  }
  window.addEventListener("hashchange", route);

  /* ---------- nombre ---------- */
  function nameView() {
    setTheme("#E4572E");
    render(
      '<div class="book"><div class="frame"><div class="namebox">' +
      "<h1>¡Hola! ¿Cómo te llamas?</h1>" +
      '<form id="nameForm"><label class="sr" for="nm" style="position:absolute;left:-999px">Tu nombre</label>' +
      '<input id="nm" autocomplete="off" maxlength="30" placeholder="Escribe tu nombre" required>' +
      '<button class="btn" type="submit">Empezar a leer</button></form>' +
      '<p style="margin-top:1.4rem"><a class="linkbtn" href="#/adulto">Soy el adulto</a></p>' +
      "</div></div></div>", false);
    var inp = document.getElementById("nm"); inp.focus();
    document.getElementById("nameForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = inp.value.trim().replace(/\s+/g, " ");
      if (!v) return;
      db.name = v; save(); location.hash = "#/";
      route();
    });
  }

  /* ---------- inicio ---------- */
  function homeView() {
    setTheme("#E4572E");
    var items = STORIES.map(function (s) {
      var best = bestOf(db.name, s.n);
      var meta = best === null ? "Todavía no respondes" : "Mejor resultado: " + best + " de " + s.quiz.length;
      return '<li style="--c:' + s.color + '"><a href="#/cuento/' + s.n + '/leer/0" aria-label="Cuento ' + s.n + ": " + esc(s.title) + '">' +
        '<div class="thumb"><img src="img/' + s.cover + '.jpg" alt=""></div><div><h2>' + esc(s.title) + "</h2>" +
        stars(best || 0, s.quiz.length) + '<div class="meta">' + meta + "</div></div></a></li>";
    }).join("");
    render(
      '<div class="book"><div class="frame"><section class="hero">' +
      '<div><h1>Amigos de la Naturaleza</h1><p>Mi libro de lectura. Lee un cuento y luego contesta las preguntas.</p></div>' +
      '<div class="pic" style="--c:#E4572E"><img src="img/bruno_full.jpg" alt="El dragón Bruno y un patito juegan con humo de colores."></div></section>' +
      '<p class="hello"><strong>Hola, ' + esc(db.name) + '</strong> <button class="linkbtn" id="chg">No soy yo</button></p>' +
      '<ul class="shelf">' + items + "</ul>" +
      '<p class="center" style="margin-top:1.6rem"><a class="linkbtn" href="#/adulto">Panel del adulto</a></p>' +
      "</div></div>", false);
    document.getElementById("chg").addEventListener("click", function () { db.name = ""; save(); route(); });
  }

  /* ---------- lectura ---------- */
  function banner(s, label) {
    return '<header class="banner"><span class="num">' + s.n + '</span><span class="grow">Cuento ' + s.n + ": " + esc(s.title) + '</span><a href="#/">Inicio</a></header>';
  }
  function readView(s, i) {
    if (i >= s.pages.length) i = s.pages.length - 1;
    setTheme(s.color);
    var p = s.pages[i], last = i === s.pages.length - 1;
    var dots = s.pages.map(function (_, k) { return '<i class="' + (k === i ? "on" : "") + '"></i>'; }).join("");
    var paras = p.paras.map(function (t) { return "<p>" + t + "</p>"; }).join("");
    render(
      '<div class="book"><div class="frame">' + banner(s) +
      '<section class="spread"><div class="pic"><img src="img/' + p.img + '.jpg" alt="' + esc(p.alt) + '"></div>' +
      '<div class="text" id="txt" style="font-size:calc(var(--read)*' + textScale + ')">' + (p.sub ? '<span class="sub">' + p.sub + "</span>" : "") + paras + (p.fin ? '<p class="fin">¡Fin!</p>' : "") + "</div></section>" +
      '<div class="tools">' + (canSpeak ? '<button class="btn small ghost" id="say">🔊 Escuchar</button>' : "") +
      '<button class="btn small ghost" id="minus" aria-label="Letra más pequeña">A−</button><button class="btn small ghost" id="plus" aria-label="Letra más grande">A+</button></div>' +
      '<nav class="pager"><button class="btn ghost" id="prev"' + (i === 0 ? " disabled" : "") + '>← Atrás</button><div class="dots" aria-label="Página ' + (i + 1) + " de " + s.pages.length + '">' + dots + "</div>" +
      '<button class="btn" id="next">' + (last ? "Responder ✓" : "Seguir →") + "</button></nav>" +
      "</div></div>", false);
    var base = "#/cuento/" + s.n + "/";
    document.getElementById("prev").addEventListener("click", function () { if (i > 0) location.hash = base + "leer/" + (i - 1); });
    document.getElementById("next").addEventListener("click", function () { location.hash = last ? base + "preguntas" : base + "leer/" + (i + 1); });
    var say = document.getElementById("say");
    if (say) say.addEventListener("click", function () { speak(p.paras.map(plain).join(" ") + (p.fin ? " Fin." : "")); });
    function scale(d) { textScale = Math.min(1.5, Math.max(0.8, +(textScale + d).toFixed(2))); try { localStorage.setItem(READ_KEY, textScale); } catch (e) {} document.getElementById("txt").style.fontSize = "calc(var(--read)*" + textScale + ")"; }
    document.getElementById("minus").addEventListener("click", function () { scale(-0.1); });
    document.getElementById("plus").addEventListener("click", function () { scale(0.1); });
  }

  /* ---------- preguntas ---------- */
  function quizView(s) {
    setTheme(s.color);
    if (Q.i >= s.quiz.length) return resultView(s);
    var q = s.quiz[Q.i];
    var prog = s.quiz.map(function (_, k) { return '<i class="' + (k < Q.i ? "done" : "") + '"></i>'; }).join("");
    var opts = q.options.map(function (o, k) {
      return '<button class="opt" data-k="' + k + '"><span class="box">' + "ABC"[k] + "</span><span>" + esc(o) + "</span></button>";
    }).join("");
    render(
      '<div class="book"><div class="frame">' + banner(s) +
      '<div class="qwrap"><div class="qprog" aria-label="Pregunta ' + (Q.i + 1) + " de " + s.quiz.length + '">' + prog + "</div>" +
      '<div class="q"><span class="qn">' + (Q.i + 1) + "</span><span>" + esc(q.q) + "</span></div>" +
      (canSpeak ? '<div class="tools"><button class="btn small ghost" id="say">🔊 Escuchar la pregunta</button></div>' : "") +
      '<div class="opts" id="opts">' + opts + '</div><div class="feedback" id="fb" role="status"></div>' +
      '<div class="center"><button class="btn" id="go" hidden>' + (Q.i === s.quiz.length - 1 ? "Ver mi resultado" : "Siguiente →") + "</button></div></div>" +
      "</div></div>", false);
    var say = document.getElementById("say");
    if (say) say.addEventListener("click", function () { speak(q.q + ". " + q.options.map(function (o, k) { return "Opción " + "ABC"[k] + ": " + o; }).join(". ")); });
    document.getElementById("opts").addEventListener("click", function (e) {
      var b = e.target.closest(".opt"); if (!b || Q.locked) return;
      Q.locked = true;
      var k = parseInt(b.getAttribute("data-k"), 10), ok = k === q.answer;
      Q.answers.push({ q: q.q, chosen: q.options[k], correct: q.options[q.answer], ok: ok });
      Array.prototype.forEach.call(document.querySelectorAll(".opt"), function (el, idx) {
        el.disabled = true;
        if (idx === q.answer) el.classList.add("ok");
        else if (idx === k) el.classList.add("bad");
        else el.classList.add("dim");
      });
      var fb = document.getElementById("fb");
      fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.textContent = ok ? "¡Muy bien! Esa es la respuesta." : "Casi. La respuesta era: " + q.options[q.answer];
      var go = document.getElementById("go"); go.hidden = false; go.focus();
    });
    document.getElementById("go").addEventListener("click", function () { Q.i++; Q.locked = false; quizView(s); });
  }

  function resultView(s) {
    var score = Q.answers.filter(function (a) { return a.ok; }).length, total = s.quiz.length;
    var attempt = db.results.filter(function (r) { return r.name === db.name && r.story === s.n; }).length + 1;
    var rec = { id: Date.now() + "-" + Math.random().toString(36).slice(2, 7), name: db.name, story: s.n, storyTitle: s.title, date: new Date().toISOString(), attempt: attempt, score: score, total: total, answers: Q.answers };
    db.results.push(rec); save(); sendResult(rec);
    var msg = score === total ? ["¡Excelente lectura!", "Contestaste todo bien."] :
      score >= 2 ? ["¡Muy bien!", "Casi lo logras. Puedes leer otra vez y probar de nuevo."] :
      ["¡Buen intento!", "Lee el cuento otra vez con calma y vuelve a probar."];
    var next = STORIES[s.n] ? '<a class="btn" href="#/cuento/' + (s.n + 1) + '/leer/0">Siguiente cuento →</a>' : '<a class="btn" href="#/">Ver todos los cuentos</a>';
    var rev = Q.answers.map(function (a) {
      return '<li class="' + (a.ok ? "" : "x") + '">' + (a.ok ? "✓ " : "✗ ") + esc(a.q) + "<br><strong>" + esc(a.ok ? a.chosen : "Respuesta: " + a.correct) + "</strong></li>";
    }).join("");
    Q = null;
    render(
      '<div class="book"><div class="frame">' + banner(s) +
      '<section class="result"><div class="big">' + stars(score, total) + "</div><h1>" + msg[0] + "</h1><p>" + esc(db.name) + ", acertaste " + score + " de " + total + ". " + msg[1] + "</p>" +
      '<div class="row"><a class="btn ghost" href="#/cuento/' + s.n + '/leer/0">Leer otra vez</a><a class="btn ghost" href="#/cuento/' + s.n + '/preguntas">Probar de nuevo</a>' + next + "</div>" +
      '<ul class="review">' + rev + "</ul></section></div></div>");
  }

  function sendResult(rec) {
    if (!CONFIG.RESULTS_ENDPOINT) return;
    try {
      fetch(CONFIG.RESULTS_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(rec) }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- panel del adulto ---------- */
  function adultView() {
    setTheme("#374151");
    if (!adultOK) {
      render('<div class="book adult"><div class="frame"><div class="namebox"><h1>Panel del adulto</h1>' +
        '<form id="pinForm"><input id="pin" type="password" inputmode="numeric" autocomplete="off" placeholder="Clave" aria-label="Clave" required>' +
        '<div id="pinErr" class="feedback bad" role="alert" style="justify-content:center;min-height:2rem"></div>' +
        '<button class="btn" type="submit">Entrar</button></form><p style="margin-top:1.2rem"><a class="linkbtn" href="#/">Volver al libro</a></p></div></div></div>', false);
      document.getElementById("pin").focus();
      document.getElementById("pinForm").addEventListener("submit", function (e) {
        e.preventDefault();
        if (document.getElementById("pin").value === String(CONFIG.PIN)) { adultOK = true; adultView(); }
        else document.getElementById("pinErr").textContent = "Clave incorrecta.";
      });
      return;
    }
    var names = []; db.results.forEach(function (r) { if (names.indexOf(r.name) < 0) names.push(r.name); });
    var filter = adultView.filter || "";
    var rows = db.results.filter(function (r) { return !filter || r.name === filter; });
    var sel = '<select id="who" aria-label="Filtrar por alumno"><option value="">Todos los alumnos</option>' +
      names.map(function (n) { return '<option value="' + esc(n) + '"' + (n === filter ? " selected" : "") + ">" + esc(n) + "</option>"; }).join("") + "</select>";

    var shown = filter ? [filter] : names;
    var summary = shown.map(function (n) {
      var cells = STORIES.map(function (s) {
        var rs = db.results.filter(function (r) { return r.name === n && r.story === s.n; });
        if (!rs.length) return "<td>—</td>";
        var best = Math.max.apply(null, rs.map(function (r) { return r.score; }));
        var cls = best === s.quiz.length ? "g" : best >= 2 ? "y" : "r";
        return '<td><span class="pill ' + cls + '">' + best + "/" + s.quiz.length + "</span> <small>(" + rs.length + (rs.length === 1 ? " intento" : " intentos") + ")</small></td>";
      }).join("");
      return "<tr><td><strong>" + esc(n) + "</strong></td>" + cells + "</tr>";
    }).join("");

    var detail = rows.slice().reverse().map(function (r) {
      var list = r.answers.map(function (a) { return "<li>" + (a.ok ? "✓" : "✗") + " " + esc(a.q) + " — eligió <strong>" + esc(a.chosen) + "</strong>" + (a.ok ? "" : " (correcta: " + esc(a.correct) + ")") + "</li>"; }).join("");
      return "<details><summary>" + esc(new Date(r.date).toLocaleString("es")) + " · " + esc(r.name) + " · Cuento " + r.story + " · " + r.score + "/" + r.total + " (intento " + r.attempt + ")</summary><ul>" + list + "</ul></details>";
    }).join("");

    render('<div class="book adult"><div class="frame"><header class="banner"><span class="grow">Panel del adulto</span><a href="#/">Volver al libro</a></header>' +
      "<h1>Resultados</h1>" +
      '<p class="note">Los resultados se guardan en este navegador y dispositivo' + (CONFIG.RESULTS_ENDPOINT ? ", y también se envían a tu hoja de cálculo" : "") + ".</p>" +
      '<div class="actions">' + sel + '<button class="btn small dark" id="csv">Descargar CSV</button><button class="btn small dark" id="prn">Imprimir informe</button><button class="btn small ghost dark" id="clr">Borrar todo</button></div>' +
      (db.results.length ? '<h2>Mejor resultado por cuento</h2><div class="tablewrap"><table><thead><tr><th>Alumno</th>' + STORIES.map(function (s) { return "<th>Cuento " + s.n + "</th>"; }).join("") + "</tr></thead><tbody>" + summary + "</tbody></table></div>" +
        "<h2>Detalle de intentos</h2>" + detail : "<p>Todavía no hay intentos guardados.</p>") +
      "</div></div>", false);
    document.getElementById("who").addEventListener("change", function (e) { adultView.filter = e.target.value; adultView(); });
    document.getElementById("prn").addEventListener("click", function () { window.print(); });
    document.getElementById("csv").addEventListener("click", function () { exportCSV(rows); });
    document.getElementById("clr").addEventListener("click", function () {
      if (confirm("¿Borrar todos los resultados guardados en este navegador? Esta acción no se puede deshacer.")) { db.results = []; save(); adultView(); }
    });
  }
  window.addEventListener("beforeprint", function () { Array.prototype.forEach.call(document.querySelectorAll("details"), function (d) { d.open = true; }); });

  function exportCSV(rows) {
    function cell(v) { v = String(v == null ? "" : v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
    var head = ["Fecha", "Alumno", "Cuento", "Intento", "Aciertos", "Total", "P1", "P2", "P3"];
    var lines = [head.join(",")].concat(rows.map(function (r) {
      var a = r.answers.map(function (x) { return x.chosen + (x.ok ? " (OK)" : " (X)"); });
      return [new Date(r.date).toLocaleString("es"), r.name, r.storyTitle, r.attempt, r.score, r.total, a[0], a[1], a[2]].map(cell).join(",");
    }));
    var blob = new Blob(["\ufeff" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "resultados_lectura.csv";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  route();
})();
