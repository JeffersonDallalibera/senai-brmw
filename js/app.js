/* ==============================================================================
   🚀 APLICAÇÃO PRINCIPAL & ORQUESTRADOR • SENAI BRMW GUIA INTERATIVO
   ============================================================================== */

import { DOCS_SECTIONS } from "./docs-data.js";
import { PRESET_LAYOUTS, generateModelFromPrompt } from "./generator.js";
import { CanvasRenderer } from "./canvas-renderer.js";
import { ModelExporters } from "./exporters.js";
import { SIMULATOR_SCENARIOS, auditModel } from "./simulator.js";
import { QUIZ_QUESTIONS } from "./quiz.js";

class SenaiBrmwApp {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.currentDocId = DOCS_SECTIONS[0].id;
    this.currentModel = PRESET_LAYOUTS[0].model;
    this.activeSimScenario = SIMULATOR_SCENARIOS[0];
    this.quizIndex = 0;
    this.quizScore = 0;

    this.initDOM();
    this.initTheme();
    this.initNavigation();
    this.initDocs();
    this.initGenerator();
    this.initSimulator();
    this.initQuiz();
    this.initSearch();
  }

  initDOM() {
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.navTabBtns = document.querySelectorAll(".tab-btn");
    this.viewSections = document.querySelectorAll(".view-section");
    
    // Canvas
    const svgEl = document.getElementById("diagramSvg");
    this.renderer = new CanvasRenderer(svgEl, (type, data) => this.onSelectDiagramElement(type, data));
    this.renderer.setModel(this.currentModel);
  }

  /* ==============================================================================
     🎨 CONTROLE DE TEMA (DARK / LIGHT)
     ============================================================================== */
  initTheme() {
    document.documentElement.setAttribute("data-theme", this.currentTheme);
    this.updateThemeIcon();

    this.themeToggleBtn.addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", this.currentTheme);
      localStorage.setItem("theme", this.currentTheme);
      this.updateThemeIcon();
      this.renderer.render(); // Re-renderiza para atualizar paletas do SVG
    });
  }

  updateThemeIcon() {
    this.themeToggleBtn.textContent = this.currentTheme === "light" ? "🌙" : "☀️";
  }

  /* ==============================================================================
     🧭 NAVEGAÇÃO ENTRE ABAS
     ============================================================================== */
  initNavigation() {
    this.navTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetView = btn.getAttribute("data-view");
        this.switchView(targetView);
      });
    });
  }

  switchView(viewId) {
    this.navTabBtns.forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-view") === viewId);
    });

    this.viewSections.forEach(section => {
      section.classList.toggle("active", section.id === `view-${viewId}`);
    });

    if (viewId === "generator") {
      setTimeout(() => this.renderer.resetZoom(), 50);
    }
  }

  /* ==============================================================================
     📖 MÓDULO 1: DOCUMENTAÇÃO
     ============================================================================== */
  initDocs() {
    const sidebar = document.getElementById("docsSidebar");
    const content = document.getElementById("docsContent");

    // Agrupa seções por categoria
    const categories = {};
    DOCS_SECTIONS.forEach(doc => {
      if (!categories[doc.category]) categories[doc.category] = [];
      categories[doc.category].push(doc);
    });

    sidebar.innerHTML = "";
    Object.keys(categories).forEach(cat => {
      const catDiv = document.createElement("div");
      catDiv.className = "sidebar-category";
      catDiv.innerHTML = `<div class="category-title">${cat}</div>`;

      categories[cat].forEach(doc => {
        const link = document.createElement("a");
        link.href = `#${doc.id}`;
        link.className = `nav-link ${doc.id === this.currentDocId ? "active" : ""}`;
        link.innerHTML = `<span>${doc.icon}</span> <span>${doc.title}</span>`;
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.loadDocArticle(doc.id);
        });
        catDiv.appendChild(link);
      });

      sidebar.appendChild(catDiv);
    });

    this.loadDocArticle(this.currentDocId);
  }

  loadDocArticle(docId) {
    this.currentDocId = docId;
    const doc = DOCS_SECTIONS.find(d => d.id === docId);
    if (!doc) return;

    // Atualiza links ativos
    document.querySelectorAll(".docs-sidebar .nav-link").forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === `#${docId}`);
    });

    const content = document.getElementById("docsContent");
    content.innerHTML = `
      <article class="doc-article">
        <span class="brand-badge">${doc.category}</span>
        <h1 style="margin-top: 0.6rem;">${doc.icon} ${doc.title}</h1>
        <p class="doc-lead">${doc.description}</p>
        ${doc.content}
      </article>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ==============================================================================
     ⚡ MÓDULO 2: GERADOR POR LAYOUT / IA & CANVAS
     ============================================================================== */
  initGenerator() {
    // Renderiza a lista de presets
    const presetContainer = document.getElementById("presetList");
    presetContainer.innerHTML = "";

    PRESET_LAYOUTS.forEach((preset, idx) => {
      const card = document.createElement("div");
      card.className = `preset-card ${idx === 0 ? "active" : ""}`;
      card.innerHTML = `
        <div class="preset-icon">${preset.icon}</div>
        <div>
          <div class="preset-name">${preset.name}</div>
          <div class="preset-entities">${preset.model.entities.map(e => e.name).join(" • ")}</div>
        </div>
      `;
      card.addEventListener("click", () => {
        document.querySelectorAll(".preset-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        this.currentModel = preset.model;
        this.renderer.setModel(this.currentModel);
        this.renderer.resetZoom();
        this.runAuditor();
      });
      presetContainer.appendChild(card);
    });

    // Sub-abas do Gerador: Presets vs IA Prompt
    const genTabBtns = document.querySelectorAll(".gen-tab-btn");
    genTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        genTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.getAttribute("data-tab");
        document.getElementById("tab-presets").style.display = tab === "presets" ? "block" : "none";
        document.getElementById("tab-ai").style.display = tab === "ai" ? "block" : "none";
      });
    });

    // Botão de Geração com IA
    document.getElementById("btnAiGenerate").addEventListener("click", () => {
      const prompt = document.getElementById("aiPromptInput").value;
      if (!prompt.trim()) {
        alert("Digite ao menos uma frase com o segmento do sistema!");
        return;
      }
      this.currentModel = generateModelFromPrompt(prompt);
      this.renderer.setModel(this.currentModel);
      this.renderer.resetZoom();
      this.runAuditor();
      alert(`✨ Modelo "${this.currentModel.title}" gerado com sucesso!`);
    });

    // Alternador de Modo de Visualização (Conceitual Peter Chen vs Lógico Relacional)
    document.querySelectorAll(".mode-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mode");
        this.renderer.setMode(mode);
      });
    });

    // Controles de Zoom do Canvas
    document.getElementById("btnZoomIn").addEventListener("click", () => this.renderer.zoomIn());
    document.getElementById("btnZoomOut").addEventListener("click", () => this.renderer.zoomOut());
    document.getElementById("btnZoomReset").addEventListener("click", () => this.renderer.resetZoom());

    // Botões de Exportação
    this.initExportButtons();
    this.runAuditor();
  }

  onSelectDiagramElement(type, data) {
    const drawer = document.getElementById("inspectorDrawer");
    const drawerContent = document.getElementById("drawerContent");
    drawer.classList.add("open");

    if (type === "entity") {
      drawerContent.innerHTML = `
        <span class="brand-badge">Entidade (Peter Chen)</span>
        <h3 style="margin-top: 0.5rem;">${data.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">Representa um conceito central do negócio.</p>
        <div style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem;">Atributos Mapeados:</div>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem;">
          ${data.attributes.map(a => `<li>${a.isPk ? "⚫ <strong>" + a.name + " (ID)</strong>" : "⚪ " + a.name}</li>`).join("")}
        </ul>
      `;
    } else if (type === "relation") {
      drawerContent.innerHTML = `
        <span class="brand-badge" style="background: var(--accent-amber-light); color: var(--accent-amber);">Relacionamento (Losango)</span>
        <h3 style="margin-top: 0.5rem;">${data.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">Verbo de ação conectando entidades.</p>
        <div style="font-size: 0.85rem; background: var(--bg-surface-elevated); padding: 0.6rem; border-radius: 6px;">
          <strong>Regra de Cardinalidade:</strong><br>
          Origem: <code>${data.cardSource}</code> ➔ Destino: <code>${data.cardTarget}</code>
        </div>
      `;
    } else if (type === "table") {
      drawerContent.innerHTML = `
        <span class="brand-badge" style="background: var(--senai-blue-light); color: var(--senai-blue);">Tabela Lógica (Ted Codd)</span>
        <h3 style="margin-top: 0.5rem;">${data.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">Tabela relacional pronta para SQL.</p>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem; font-family: monospace;">
          ${data.columns.map(c => `<li>${c.isPk ? "<strong>[PK] " + c.name + "</strong>" : c.isFk ? "<span style='color:var(--accent-cyan);'>[FK] " + c.name + "</span>" : c.name}</li>`).join("")}
        </ul>
      `;
    }
  }

  initExportButtons() {
    document.getElementById("drawerCloseBtn").addEventListener("click", () => {
      document.getElementById("inspectorDrawer").classList.remove("open");
    });

    // 1. Exportar brModelo Web JSON
    document.getElementById("btnExportBrmw").addEventListener("click", () => {
      const jsonStr = ModelExporters.toBrModeloWebJSON(this.currentModel);
      ModelExporters.downloadFile(jsonStr, `${this.currentModel.title}_brmodelo.json`, "application/json");
      alert("📥 Arquivo JSON do brModelo Web baixado! No app.brmodeloweb.com, use 'Importar' para carregar este arquivo.");
    });

    // 2. Exportar Draw.io XML
    document.getElementById("btnExportDrawio").addEventListener("click", () => {
      const xmlStr = ModelExporters.toDrawIoXML(this.currentModel);
      ModelExporters.downloadFile(xmlStr, `${this.currentModel.title}.drawio`, "application/xml");
      alert("📥 Arquivo .drawio baixado! Abra diretamente no app.diagrams.net ou no VS Code.");
    });

    // 3. Exportar Mermaid ERD
    document.getElementById("btnExportMermaid").addEventListener("click", () => {
      const mmd = ModelExporters.toMermaidERD(this.currentModel);
      this.openCodeModal("Código Mermaid ERD", mmd, "mermaid");
    });

    // 4. Exportar SQL DDL
    document.getElementById("btnExportSql").addEventListener("click", () => {
      const sql = ModelExporters.toMySQLDDL(this.currentModel);
      this.openCodeModal("Script SQL DDL (MySQL)", sql, "sql");
    });
  }

  openCodeModal(title, code, lang) {
    const modal = document.getElementById("codeModal");
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalCodeBlock").textContent = code;
    modal.classList.add("open");

    document.getElementById("modalCopyBtn").onclick = () => {
      navigator.clipboard.writeText(code);
      alert("📋 Código copiado para a área de transferência!");
    };
    document.getElementById("modalCloseBtn").onclick = () => {
      modal.classList.remove("open");
    };
  }

  runAuditor() {
    const issues = auditModel(this.currentModel);
    const box = document.getElementById("auditorBox");
    if (issues.length === 0) {
      box.innerHTML = `<span style="color:var(--accent-emerald); font-size:0.8rem; font-weight:700;">✅ Modelo aderente às regras de Peter Chen!</span>`;
    } else {
      box.innerHTML = issues.map(i => `<div style="font-size:0.75rem; color:${i.type === 'error' ? 'var(--accent-rose)' : 'var(--accent-amber)'}; margin-bottom:4px;">⚠️ ${i.message}</div>`).join("");
    }
  }

  /* ==============================================================================
     🎮 MÓDULO 3: SIMULADOR DE CARDINALIDADES
     ============================================================================== */
  initSimulator() {
    const select = document.getElementById("simScenarioSelect");
    select.innerHTML = SIMULATOR_SCENARIOS.map(s => `<option value="${s.id}">${s.entA} --- [${s.verb}] --- ${s.entB}</option>`).join("");

    select.addEventListener("change", () => {
      this.activeSimScenario = SIMULATOR_SCENARIOS.find(s => s.id === select.value);
      this.renderSimQuestions();
    });

    this.renderSimQuestions();
  }

  renderSimQuestions() {
    const sc = this.activeSimScenario;
    document.getElementById("simEntA").textContent = sc.entA;
    document.getElementById("simEntB").textContent = sc.entB;
    document.getElementById("simVerb").textContent = sc.verb;

    // Pergunta 1: Ida Mínimo
    const box1 = document.getElementById("simQ1Box");
    box1.innerHTML = `
      <div class="question-step-tag">Ponta 1 (Mínimo): ${sc.entA} ➔ ${sc.entB}</div>
      <div class="question-text">${sc.ida.qMin}</div>
      <div class="sim-options">
        ${sc.ida.optMin.map((o, idx) => `
          <label class="sim-option-label">
            <input type="radio" name="ida_min" value="${o.val}" ${idx === 0 ? "checked" : ""}>
            <span>${o.label}</span>
          </label>
        `).join("")}
      </div>
    `;

    // Pergunta 2: Ida Máximo
    const box2 = document.getElementById("simQ2Box");
    box2.innerHTML = `
      <div class="question-step-tag">Ponta 1 (Máximo): ${sc.entA} ➔ ${sc.entB}</div>
      <div class="question-text">${sc.ida.qMax}</div>
      <div class="sim-options">
        ${sc.ida.optMax.map((o, idx) => `
          <label class="sim-option-label">
            <input type="radio" name="ida_max" value="${o.val}" ${idx === 0 ? "checked" : ""}>
            <span>${o.label}</span>
          </label>
        `).join("")}
      </div>
    `;

    const updateDisplay = () => {
      const minVal = document.querySelector("input[name='ida_min']:checked")?.value || "0";
      const maxVal = document.querySelector("input[name='ida_max']:checked")?.value || "n";
      const card = `(${minVal},${maxVal})`;

      document.getElementById("simResultDisplay").textContent = `${sc.entA} ${card} --- < ${sc.verb} > --- (1,1) ${sc.entB}`;
      document.getElementById("simJustification").textContent = sc.ida.justification;
    };

    box1.querySelectorAll("input").forEach(i => i.addEventListener("change", updateDisplay));
    box2.querySelectorAll("input").forEach(i => i.addEventListener("change", updateDisplay));
    updateDisplay();
  }

  /* ==============================================================================
     🧠 MÓDULO 4: QUIZ DE FIXAÇÃO
     ============================================================================== */
  initQuiz() {
    this.quizIndex = 0;
    this.quizScore = 0;
    this.renderQuizQuestion();

    document.getElementById("btnQuizNext").addEventListener("click", () => {
      if (this.quizIndex < QUIZ_QUESTIONS.length - 1) {
        this.quizIndex++;
        this.renderQuizQuestion();
      } else {
        this.showQuizResult();
      }
    });
  }

  renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[this.quizIndex];
    document.getElementById("quizCounter").textContent = `Questão ${this.quizIndex + 1} de ${QUIZ_QUESTIONS.length}`;
    document.getElementById("quizProgressBar").style.width = `${((this.quizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;
    document.getElementById("quizQuestionTitle").textContent = q.question;

    const optList = document.getElementById("quizOptionsList");
    optList.innerHTML = "";
    const feedbackBox = document.getElementById("quizFeedback");
    feedbackBox.style.display = "none";
    document.getElementById("btnQuizNext").style.display = "none";

    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "quiz-opt-btn";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => {
        // Desabilita botões
        optList.querySelectorAll("button").forEach(b => b.disabled = true);

        if (opt.correct) {
          btn.classList.add("correct");
          this.quizScore++;
          feedbackBox.className = "quiz-feedback alert-tip";
          feedbackBox.innerHTML = `<strong>✅ Resposta Correta!</strong><br>${q.explanation}`;
        } else {
          btn.classList.add("incorrect");
          feedbackBox.className = "quiz-feedback alert-warn";
          feedbackBox.innerHTML = `<strong>❌ Resposta Incorreta.</strong><br>${q.explanation}`;
        }

        feedbackBox.style.display = "block";
        document.getElementById("btnQuizNext").style.display = "inline-flex";
      });
      optList.appendChild(btn);
    });
  }

  showQuizResult() {
    const container = document.getElementById("quizContainer");
    const perc = Math.round((this.quizScore / QUIZ_QUESTIONS.length) * 100);
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎓</div>
        <h2>Quiz Concluído com Sucesso!</h2>
        <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1.5rem;">
          Você acertou <strong>${this.quizScore} de ${QUIZ_QUESTIONS.length}</strong> questões (${perc}% de aproveitamento).
        </p>
        <button class="btn-senai" onclick="location.reload();">Fazer Novamente 🔄</button>
      </div>
    `;
  }

  /* ==============================================================================
     🔍 BUSCA INSTANTÂNEA
     ============================================================================== */
  initSearch() {
    const searchInput = document.getElementById("globalSearchInput");
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) return;

      // Busca na documentação
      const match = DOCS_SECTIONS.find(d => 
        d.title.toLowerCase().includes(q) || 
        d.description.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q)
      );

      if (match) {
        this.switchView("docs");
        this.loadDocArticle(match.id);
      }
    });
  }
}

// Inicializa a aplicação ao carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
  window.senaiApp = new SenaiBrmwApp();
});
