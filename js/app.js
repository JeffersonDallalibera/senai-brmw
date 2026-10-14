/* ==============================================================================
   🚀 APLICAÇÃO PRINCIPAL & ORQUESTRADOR • SENAI BRMW GUIA INTERATIVO
   Plataforma de aprendizado do brModelo Web e Modelagem de Dados
   ============================================================================== */

import { DOCS_SECTIONS } from "./docs-data.js";
import { ACTION_GUIDES } from "./action-guide.js";
import { SIMULATOR_SCENARIOS } from "./simulator.js";
import { 
  CHECKLIST_ITEMS, 
  loadChecklistState, 
  saveChecklistState, 
  calculateProgress 
} from "./checklist.js";
import { SOS_ITEMS } from "./sos-guide.js";
import { QUIZ_QUESTIONS } from "./quiz.js";

class SenaiBrmwApp {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.currentDocId = DOCS_SECTIONS[0].id;
    this.activeSimScenario = SIMULATOR_SCENARIOS[0];
    this.simAnswers = { idaMin: "0", idaMax: "n", voltaMin: "1", voltaMax: "1" };
    this.checklistState = loadChecklistState();
    this.quizIndex = 0;
    this.quizScore = 0;

    this.initDOM();
    this.initTheme();
    this.initNavigation();
    this.initDocs();
    this.initActionGuides();
    this.initSimulator();
    this.initChecklist();
    this.initSos();
    this.initQuiz();
    this.initSearch();
    this.initModals();
  }

  initDOM() {
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.navTabBtns = document.querySelectorAll(".tab-btn");
    this.viewSections = document.querySelectorAll(".view-section");
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

    // Suporte a hash na URL (ex: #actions, #simulator)
    const hash = window.location.hash.replace("#", "");
    if (hash && document.getElementById(`view-${hash}`)) {
      this.switchView(hash);
    }
  }

  switchView(viewId) {
    this.navTabBtns.forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-view") === viewId);
    });

    this.viewSections.forEach(section => {
      section.classList.toggle("active", section.id === `view-${viewId}`);
    });

    window.location.hash = viewId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ==============================================================================
     📖 MÓDULO 1: DOCUMENTAÇÃO & TUTORIAIS
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

    // Renderiza Sidebar
    let sidebarHtml = "";
    Object.keys(categories).forEach(cat => {
      sidebarHtml += `
        <div class="sidebar-category">
          <div class="category-title">${cat}</div>
          <div class="category-links">
            ${categories[cat].map(doc => `
              <a href="#docs" class="doc-link ${doc.id === this.currentDocId ? 'active' : ''}" data-doc-id="${doc.id}">
                <span>${doc.icon}</span> ${doc.title}
              </a>
            `).join("")}
          </div>
        </div>
      `;
    });
    sidebar.innerHTML = sidebarHtml;

    // Listeners nos links da sidebar
    sidebar.querySelectorAll(".doc-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const docId = link.getAttribute("data-doc-id");
        this.renderDocArticle(docId);
      });
    });

    // Renderiza artigo inicial
    this.renderDocArticle(this.currentDocId);
  }

  renderDocArticle(docId) {
    const doc = DOCS_SECTIONS.find(d => d.id === docId);
    if (!doc) return;

    this.currentDocId = docId;

    // Atualiza links ativos na sidebar
    document.querySelectorAll(".doc-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("data-doc-id") === docId);
    });

    const content = document.getElementById("docsContent");
    content.innerHTML = `
      <div class="doc-header">
        <div class="doc-breadcrumb">${doc.category} ➔ Artigo</div>
        <h1 class="doc-title">${doc.icon} ${doc.title}</h1>
        <p class="doc-lead">${doc.description}</p>
      </div>
      <div class="doc-body">
        ${doc.content}
      </div>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ==============================================================================
     🧭 MÓDULO 2: GUIA DE AÇÕES PASSO A PASSO
     ============================================================================== */
  initActionGuides() {
    const grid = document.getElementById("actionsGrid");
    const filterBar = document.getElementById("actionsFilterBar");

    const renderGrid = (filter = "all") => {
      const filtered = filter === "all" 
        ? ACTION_GUIDES 
        : ACTION_GUIDES.filter(a => a.category === filter);

      grid.innerHTML = filtered.map(action => `
        <div class="action-card" data-action-id="${action.id}">
          <div>
            <div class="action-card-header">
              <div class="action-card-icon">${action.icon}</div>
              <div>
                <span class="action-card-category">${action.category}</span>
                <h3 class="action-card-title">${action.title}</h3>
              </div>
            </div>
            <p class="action-card-desc">${action.summary}</p>
          </div>
          <div class="action-card-footer">
            <span>${action.steps.length} passos com cliques</span>
            <span>Ver Passo a Passo ➔</span>
          </div>
        </div>
      `).join("");

      // Clique nos cards para abrir o modal de detalhes
      grid.querySelectorAll(".action-card").forEach(card => {
        card.addEventListener("click", () => {
          const actionId = card.getAttribute("data-action-id");
          this.openActionModal(actionId);
        });
      });
    };

    filterBar.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderGrid(btn.getAttribute("data-filter"));
      });
    });

    renderGrid("all");
  }

  openActionModal(actionId) {
    const action = ACTION_GUIDES.find(a => a.id === actionId);
    if (!action) return;

    document.getElementById("actionModalIcon").textContent = action.icon;
    document.getElementById("actionModalTitle").textContent = action.title;
    document.getElementById("actionModalCategory").textContent = action.category;

    const body = document.getElementById("actionModalBody");
    body.innerHTML = `
      <div class="action-preview-box">
        ${action.svgPreview}
      </div>

      <h4 style="margin-bottom: 0.75rem; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; color: var(--senai-blue);">
        🖱️ Sequência Exata de Passos:
      </h4>

      <div class="action-steps-list">
        ${action.steps.map(step => `
          <div class="action-step-item">
            <div class="action-step-num">${step.num}</div>
            <div class="action-step-text">
              <span class="action-step-badge">${step.badge}</span><br>
              ${step.instruction}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="alert-box alert-warn" style="margin-bottom: 1rem;">
        <span class="alert-icon">⚠️</span>
        <div>
          <strong>Onde 90% dos Alunos Erram:</strong><br>
          ${action.commonMistake}
        </div>
      </div>

      <div class="alert-box alert-tip">
        <span class="alert-icon">💡</span>
        <div>
          <strong>Dica de Mestre do Professor:</strong><br>
          ${action.proTip}
        </div>
      </div>
    `;

    const modal = document.getElementById("actionModal");
    modal.classList.add("open");
  }

  /* ==============================================================================
     🎮 MÓDULO 3: SIMULADOR DE CARDINALIDADES (2 PERGUNTAS MÁGICAS)
     ============================================================================== */
  initSimulator() {
    const select = document.getElementById("simScenarioSelect");
    select.innerHTML = SIMULATOR_SCENARIOS.map(s => `
      <option value="${s.id}">${s.title}</option>
    `).join("");

    select.addEventListener("change", (e) => {
      this.activeSimScenario = SIMULATOR_SCENARIOS.find(s => s.id === e.target.value);
      this.renderSimQuestions();
      this.updateSimResult();
    });

    this.renderSimQuestions();
    this.updateSimResult();
  }

  renderSimQuestions() {
    const s = this.activeSimScenario;

    document.getElementById("simEntA").textContent = s.entA;
    document.getElementById("simVerb").textContent = s.verb;
    document.getElementById("simEntB").textContent = s.entB;

    // Pergunta 1: CLIENTE -> PEDIDO (Ida)
    const q1Box = document.getElementById("simQ1Box");
    q1Box.innerHTML = `
      <div class="sim-card-step">Passo 1: ${s.entA} ➔ ${s.entB}</div>
      <div class="sim-question-text">1. ${s.ida.qMin}</div>
      <div class="sim-options-grid">
        ${s.ida.optMin.map(opt => `
          <label class="sim-option-label">
            <input type="radio" name="sim_ida_min" value="${opt.val}" ${opt.val === "0" ? "checked" : ""}>
            <span>${opt.label}</span>
          </label>
        `).join("")}
      </div>
      <div class="sim-question-text" style="margin-top: 1rem;">2. ${s.ida.qMax}</div>
      <div class="sim-options-grid">
        ${s.ida.optMax.map(opt => `
          <label class="sim-option-label">
            <input type="radio" name="sim_ida_max" value="${opt.val}" ${opt.val === "n" ? "checked" : ""}>
            <span>${opt.label}</span>
          </label>
        `).join("")}
      </div>
    `;

    // Pergunta 2: PEDIDO -> CLIENTE (Volta)
    const q2Box = document.getElementById("simQ2Box");
    q2Box.innerHTML = `
      <div class="sim-card-step">Passo 2: ${s.entB} ➔ ${s.entA}</div>
      <div class="sim-question-text">1. ${s.volta.qMin}</div>
      <div class="sim-options-grid">
        ${s.volta.optMin.map(opt => `
          <label class="sim-option-label">
            <input type="radio" name="sim_volta_min" value="${opt.val}" ${opt.val === "1" ? "checked" : ""}>
            <span>${opt.label}</span>
          </label>
        `).join("")}
      </div>
      <div class="sim-question-text" style="margin-top: 1rem;">2. ${s.volta.qMax}</div>
      <div class="sim-options-grid">
        ${s.volta.optMax.map(opt => `
          <label class="sim-option-label">
            <input type="radio" name="sim_volta_max" value="${opt.val}" ${opt.val === "1" ? "checked" : ""}>
            <span>${opt.label}</span>
          </label>
        `).join("")}
      </div>
    `;

    // Listeners dos inputs
    q1Box.querySelectorAll("input").forEach(inp => {
      inp.addEventListener("change", () => this.updateSimResult());
    });
    q2Box.querySelectorAll("input").forEach(inp => {
      inp.addEventListener("change", () => this.updateSimResult());
    });
  }

  updateSimResult() {
    const s = this.activeSimScenario;

    const idaMin = document.querySelector('input[name="sim_ida_min"]:checked')?.value || "0";
    const idaMax = document.querySelector('input[name="sim_ida_max"]:checked')?.value || "n";
    const voltaMin = document.querySelector('input[name="sim_volta_min"]:checked')?.value || "1";
    const voltaMax = document.querySelector('input[name="sim_volta_max"]:checked')?.value || "1";

    const pontaA = `(${voltaMin},${voltaMax})`;
    const pontaB = `(${idaMin},${idaMax})`;

    document.getElementById("simResultDisplay").textContent = 
      `${s.entA} ${pontaB} --- [${s.verb}] --- ${pontaA} ${s.entB}`;

    const isIdaCorrect = (idaMin === "0" && idaMax === "n") || (idaMin === "1" && idaMax === "1");
    document.getElementById("simJustification").innerHTML = `
      <strong>💡 Dedução Lógica:</strong><br>
      • Ponta ${s.entB}: Mínimo ${idaMin} e Máximo ${idaMax} ➔ ${pontaB}. ${s.ida.justification}<br>
      • Ponta ${s.entA}: Mínimo ${voltaMin} e Máximo ${voltaMax} ➔ ${pontaA}. ${s.volta.justification}
    `;
  }

  /* ==============================================================================
     ✅ MÓDULO 4: CHECKLIST PRÉ-ENTREGA DO ALUNO
     ============================================================================== */
  initChecklist() {
    const container = document.getElementById("checklistItemsGrid");
    const percentEl = document.getElementById("checklistPercent");
    const gradeBadge = document.getElementById("checklistGradeBadge");
    const btnReset = document.getElementById("btnResetChecklist");
    const btnCopy = document.getElementById("btnCopyChecklistReport");

    const render = () => {
      container.innerHTML = CHECKLIST_ITEMS.map(item => {
        const isChecked = !!this.checklistState[item.id];
        return `
          <div class="checklist-item-card ${isChecked ? 'checked' : ''}" data-item-id="${item.id}">
            <input type="checkbox" class="check-input" ${isChecked ? 'checked' : ''}>
            <div class="check-content">
              <div class="check-title">${item.title}</div>
              <div class="check-desc">${item.desc}</div>
              <div class="check-tip">💡 ${item.tip}</div>
            </div>
          </div>
        `;
      }).join("");

      // Atualiza progresso
      const { checkedCount, total, percent } = calculateProgress(this.checklistState);
      percentEl.textContent = `${percent}%`;

      if (percent === 100) {
        gradeBadge.textContent = "Aprovado Nota 10! 🏆";
        gradeBadge.style.background = "#ecfdf5";
        gradeBadge.style.color = "#047857";
      } else if (percent >= 70) {
        gradeBadge.textContent = "Quase Lá! (8/10)";
        gradeBadge.style.background = "#fffbeb";
        gradeBadge.style.color = "#b45309";
      } else if (percent > 0) {
        gradeBadge.textContent = "Em Progresso";
        gradeBadge.style.background = "#eff6ff";
        gradeBadge.style.color = "#1d4ed8";
      } else {
        gradeBadge.textContent = "Iniciando";
        gradeBadge.style.background = "#ffffff";
        gradeBadge.style.color = "var(--senai-blue)";
      }

      // Listeners
      container.querySelectorAll(".checklist-item-card").forEach(card => {
        const itemId = card.getAttribute("data-item-id");
        const checkbox = card.querySelector(".check-input");

        const toggle = () => {
          this.checklistState[itemId] = !this.checklistState[itemId];
          saveChecklistState(this.checklistState);
          render();
        };

        checkbox.addEventListener("change", (e) => {
          e.stopPropagation();
          toggle();
        });

        card.addEventListener("click", () => toggle());
      });
    };

    btnReset.addEventListener("click", () => {
      if (confirm("Deseja realmente limpar todas as caixas marcadas do checklist?")) {
        this.checklistState = {};
        saveChecklistState(this.checklistState);
        render();
      }
    });

    btnCopy.addEventListener("click", () => {
      const { checkedCount, total, percent } = calculateProgress(this.checklistState);
      let report = `📋 COMPROVANTE DE AUDITORIA • SESI SENAI (brModelo Web)\n`;
      report += `Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}\n`;
      report += `Resultado: ${checkedCount} de ${total} itens verificados (${percent}% de conformidade)\n\n`;
      
      CHECKLIST_ITEMS.forEach((item, idx) => {
        const mark = this.checklistState[item.id] ? "✅ [OK]" : "❌ [PENDENTE]";
        report += `${idx + 1}. ${mark} ${item.title}\n`;
      });

      report += `\nStatus: ${percent === 100 ? "PRONTO PARA ENTREGA (NOTA 10) 🏆" : "REQUER AJUSTES ANTES DA ENTREGA ⚠️"}\n`;

      this.openCodeModal("Relatório de Validação Pré-Entrega", report);
    });

    render();
  }

  /* ==============================================================================
     🆘 MÓDULO 5: SOS & SOLUÇÃO DE PROBLEMAS
     ============================================================================== */
  initSos() {
    const grid = document.getElementById("sosGrid");
    grid.innerHTML = SOS_ITEMS.map(item => `
      <div class="sos-card">
        <div class="sos-card-header">
          <div class="sos-card-title">
            <span>${item.icon}</span> ${item.title}
          </div>
          <span class="urgency-badge urgency-${item.urgency}">
            Gravidade: ${item.urgency}
          </span>
        </div>

        <div class="sos-symptom-box">
          <strong>O que acontece:</strong> ${item.symptom}<br>
          <span style="color: var(--text-muted); font-size: 0.84rem;"><em>Causa raiz: ${item.cause}</em></span>
        </div>

        <div class="sos-fix-box">
          <h4>🛠️ Como Resolver na Hora (Passo a Passo):</h4>
          <ol class="sos-fix-list">
            ${item.fix.map(f => `<li>${f}</li>`).join("")}
          </ol>
        </div>
      </div>
    `).join("");
  }

  /* ==============================================================================
     🧠 MÓDULO 6: QUIZ DE FIXAÇÃO
     ============================================================================== */
  initQuiz() {
    this.renderQuizQuestion();

    const nextBtn = document.getElementById("btnQuizNext");
    nextBtn.addEventListener("click", () => {
      this.quizIndex++;
      if (this.quizIndex < QUIZ_QUESTIONS.length) {
        this.renderQuizQuestion();
      } else {
        this.renderQuizFinalScreen();
      }
    });
  }

  renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[this.quizIndex];
    document.getElementById("quizCounter").textContent = `Questão ${this.quizIndex + 1} de ${QUIZ_QUESTIONS.length}`;
    
    const percent = ((this.quizIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    document.getElementById("quizProgressBar").style.width = `${percent}%`;

    document.getElementById("quizQuestionTitle").textContent = q.question;

    const optList = document.getElementById("quizOptionsList");
    optList.innerHTML = q.options.map((opt, i) => `
      <button class="quiz-opt-btn" data-index="${i}">
        ${String.fromCharCode(65 + i)}) ${opt.text}
      </button>
    `).join("");

    const feedback = document.getElementById("quizFeedback");
    feedback.style.display = "none";
    feedback.className = "quiz-feedback";

    const nextBtn = document.getElementById("btnQuizNext");
    nextBtn.style.display = "none";

    optList.querySelectorAll(".quiz-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        this.handleQuizAnswer(idx);
      });
    });
  }

  handleQuizAnswer(selectedIndex) {
    const q = QUIZ_QUESTIONS[this.quizIndex];
    const isCorrect = q.options[selectedIndex].correct;
    if (isCorrect) this.quizScore++;

    const optButtons = document.querySelectorAll(".quiz-opt-btn");
    optButtons.forEach((b, i) => {
      b.disabled = true;
      if (q.options[i].correct) {
        b.classList.add("correct");
      } else if (i === selectedIndex) {
        b.classList.add("incorrect");
      }
    });

    const feedback = document.getElementById("quizFeedback");
    feedback.style.display = "block";
    feedback.style.backgroundColor = isCorrect ? "var(--accent-emerald-light)" : "var(--accent-rose-light)";
    feedback.style.border = `1.5px solid ${isCorrect ? "var(--accent-emerald)" : "var(--accent-rose)"}`;
    feedback.style.color = isCorrect ? "#065f46" : "#9f1239";
    
    feedback.innerHTML = `
      <strong>${isCorrect ? "🎉 Parabéns! Resposta Correta!" : "❌ Quase lá, resposta incorreta!"}</strong><br>
      <p style="margin-top: 0.35rem; font-size: 0.9rem;">${q.explanation}</p>
    `;

    const nextBtn = document.getElementById("btnQuizNext");
    nextBtn.style.display = "inline-flex";
  }

  renderQuizFinalScreen() {
    const container = document.getElementById("quizContainer");
    const percent = Math.round((this.quizScore / QUIZ_QUESTIONS.length) * 100);

    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <span style="font-size: 3.5rem;">${percent >= 70 ? "🏆" : "📚"}</span>
        <h2 style="font-size: 1.8rem; margin: 1rem 0 0.5rem 0;">Quiz Concluído com Sucesso!</h2>
        <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1.5rem;">
          Você acertou <strong>${this.quizScore} de ${QUIZ_QUESTIONS.length}</strong> questões (${percent}% de acerto).
        </p>
        <div style="display: inline-block; padding: 0.6rem 1.25rem; border-radius: 9999px; font-weight: 800; font-size: 1.1rem; margin-bottom: 2rem; background: ${percent >= 70 ? 'var(--accent-emerald-light)' : 'var(--accent-amber-light)'}; color: ${percent >= 70 ? '#047857' : '#b45309'}; border: 1.5px solid ${percent >= 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">
          ${percent >= 70 ? "Excelente! Você domina o brModelo Web!" : "Bom esforço! Revise a documentação para gabaritar."}
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button id="btnRestartQuiz" class="btn-senai">Refazer o Quiz 🔄</button>
          <button id="btnQuizGoDocs" class="filter-btn">Ver Documentação 📖</button>
        </div>
      </div>
    `;

    document.getElementById("btnRestartQuiz").addEventListener("click", () => {
      this.quizIndex = 0;
      this.quizScore = 0;
      location.reload();
    });

    document.getElementById("btnQuizGoDocs").addEventListener("click", () => {
      this.switchView("docs");
    });
  }

  /* ==============================================================================
     🔍 BUSCA GLOBAL (Ctrl + K)
     ============================================================================== */
  initSearch() {
    const searchInput = document.getElementById("globalSearchInput");

    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) return;

      // Busca na documentação
      const matchedDoc = DOCS_SECTIONS.find(d => 
        d.title.toLowerCase().includes(term) || d.content.toLowerCase().includes(term)
      );

      if (matchedDoc) {
        this.switchView("docs");
        this.renderDocArticle(matchedDoc.id);
      }
    });

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  /* ==============================================================================
     🪟 CONTROLE DE MODAIS
     ============================================================================== */
  initModals() {
    // Modal da Ação
    const actionModal = document.getElementById("actionModal");
    const actionCloseBtn = document.getElementById("actionModalCloseBtn");
    actionCloseBtn.addEventListener("click", () => actionModal.classList.remove("open"));

    // Modal de Código / Relatório
    const codeModal = document.getElementById("codeModal");
    const codeCloseBtn = document.getElementById("modalCloseBtn");
    codeCloseBtn.addEventListener("click", () => codeModal.classList.remove("open"));

    const copyBtn = document.getElementById("modalCopyBtn");
    copyBtn.addEventListener("click", () => {
      const code = document.getElementById("modalCodeBlock").textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = "Copiado com Sucesso! ✅";
        setTimeout(() => copyBtn.textContent = "Copiar Texto 📋", 2000);
      });
    });

    // Fechar ao clicar fora
    [actionModal, codeModal].forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
      });
    });
  }

  openCodeModal(title, text) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalCodeBlock").textContent = text;
    document.getElementById("codeModal").classList.add("open");
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.senaiApp = new SenaiBrmwApp();
});
