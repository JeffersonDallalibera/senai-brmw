# 🌐 SENAI BRMW • Guia Interativo & Modelador de Banco de Dados
### Documentação Web & Gerador de Modelos Conceituais para Estudantes de TI
**Instituição:** SESI SENAI (Curso Técnico em Desenvolvimento de Sistemas)  
**Docente:** Prof. Jefferson Miguel Dallalibera  
**Link do GitHub Pages:** *Disponível após publicação na branch `main` (Settings > Pages).*

---

## 🧭 Visão Geral do Projeto

Este projeto é uma plataforma web educacional moderna e 100% interativa criada para revolucionar a forma como os estudantes de Desenvolvimento de Sistemas aprendem **Modelagem Conceitual (Peter Chen)** e **Modelagem Lógica Relacional (Edgar F. Codd)**, integrando-se nativamente ao ecossistema do **brModelo Web** e **Draw.io**.

### 🌟 Destaques Principais:
1. **Documentação Viva e Interativa:** Guia completo de conceitos de banco de dados, regras de Peter Chen, identificadores únicos ⚫, constraints e geração física SQL DDL.
2. **Gerador por Layouts / IA:**
   * **Layouts Prontos do SENAI:** Cenários reais de mercado (*Controle de Estoque SA 1, Auto Peças, TechByte Hardware, StreetWear Sneakers, PlayZone Games*).
   * **Assistente de IA:** O aluno descreve a regra de negócio em português e a IA gera na hora o diagrama conceitual completo!
   * **Canvas Interativo:** Arrastável, com zoom e alternância em tempo real entre o modelo conceitual (Peter Chen) e o modelo lógico relacional (tabelas e chaves estrangeiras).
3. **Exportação Multi-Formato Pronta para Importação:**
   * 🌐 **brModelo Web (`.json`):** Arquivo pronto para clicar em *"Importar"* dentro do [app.brmodeloweb.com](https://app.brmodeloweb.com).
   * 📐 **Draw.io (`.drawio`):** Arquivo XML vetorial compatível com [app.diagrams.net](https://app.diagrams.net) e extensão do VS Code.
   * 🧜 **Mermaid ERD:** Bloco de código para colar no GitHub, Notion ou Mermaid Live Editor.
   * 🐬 **MySQL DDL (`.sql`):** Script SQL transacional com motor InnoDB e integridade referencial para rodar no MySQL Workbench.
4. **Simulador de Cardinalidades ("As 2 Perguntas Mágicas"):**
   * Ferramenta pedagógica para deduzir cardinalidades mínimas e máximas `(0,1)`, `(1,1)`, `(0,n)` e `(1,n)` com linguagem humana e clara.
5. **Quiz Formativo Interativo:**
   * 10 questões com correção imediata e justificativa pedagógica para os estudantes revisarem antes de provas e entregas de SA.

---

## 🚀 Como Publicar no GitHub Pages

Este repositório foi construído utilizando padrões web puros (HTML5 semântico, CSS moderno com variáveis e JavaScript modular ES6), **sem exigir nenhum comando de build (npm/vite/webpack)**. Ele funciona perfeitamente direto no navegador ou no GitHub Pages!

### Passo a Passo no GitHub:
1. Crie um novo repositório no seu GitHub (ex: `senai-brmw-docs`).
2. Vincule e envie o código local:
   ```bash
   cd C:\SENAI
   git remote add origin https://github.com/SEU_USUARIO/senai-brmw-docs.git
   git branch -M main
   git push -u origin main
   ```
3. No GitHub, acesse **Settings ➔ Pages**:
   * Em **Source**, selecione **Deploy from a branch**.
   * Em **Branch**, selecione `main` e a pasta `/ (root)`.
   * Clique em **Save**.
4. Em menos de 1 minuto, o site estará no ar na URL:  
   `https://SEU_USUARIO.github.io/senai-brmw-docs/`

---

## 🛠️ Estrutura de Arquivos

```
C:\SENAI\
├── .gitignore                   # Arquivos ignorados pelo Git
├── README.md                    # Este manual de instruções
├── index.html                   # Aplicação SPA moderna com 4 abas interativas
├── assets/
│   └── senai-logo.svg           # Logo oficial estético do SENAI e BRMW
├── css/
│   ├── style.css                # Design System completo (variáveis, temas, tipografia)
│   └── canvas.css               # Estilos dos nós SVG de Peter Chen e tabelas relacionais
└── js/
    ├── app.js                   # Controlador principal e roteamento por abas
    ├── docs-data.js             # Base de conhecimento e conteúdo da documentação
    ├── generator.js             # Presets de layouts do SENAI e assistente de IA
    ├── canvas-renderer.js       # Renderizador SVG interativo (pan, zoom, drag & drop)
    ├── exporters.js             # Exportadores para brModelo Web, Draw.io, Mermaid e SQL
    ├── simulator.js             # Simulador de cardinalidades e auditor de regras
    └── quiz.js                  # Engine do quiz interativo de 10 questões
```

---

## 👨‍🏫 Autor & Créditos
* **Docente Titular:** Prof. Jefferson Miguel Dallalibera
* **Instituição:** SESI SENAI Santa Catarina
* **Base Técnica:** Documentação oficial [brmodeloweb.com](https://docs.brmodeloweb.com/) e Teoria Relacional de Peter Chen (1976) & Edgar F. Codd (1970).
