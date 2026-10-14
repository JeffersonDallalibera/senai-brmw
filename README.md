# 🌐 SENAI BRMW • Guia Interativo & Documentação do brModelo Web
### Plataforma de Apoio Pedagógico e Modelagem de Banco de Dados para Estudantes de TI
**Instituição:** SESI SENAI (Curso Técnico em Desenvolvimento de Sistemas)  
**Docente:** Prof. Jefferson Miguel Dallalibera  
**Link do GitHub Pages:** *Disponível após publicação na branch `main` (Settings > Pages).*

---

## 🧭 Visão Geral do Projeto

Este projeto é uma plataforma web educacional moderna, acessível e 100% interativa, desenvolvida para capacitar estudantes de 14 a 17 anos a dominarem a modelagem de banco de dados no **brModelo Web** ([app.brmodeloweb.com](https://app.brmodeloweb.com)).

O foco do projeto é **100% pedagógico e centrado na autonomia do estudante**: em vez de gerar modelos prontos por IA, a plataforma guia o aluno passo a passo em cada ação dentro do brModelo Web, prevenindo erros clássicos, consolidando a notação de Peter Chen e as regras de transformação para o Modelo Lógico de Codd.

---

## 🌟 As 6 Ferramentas Pedagógicas da Plataforma:

1. 📖 **Documentação & Tutoriais Detalhados:**
   * 10 artigos completos organizados por trilha de aprendizagem.
   * Da interface web à geração de scripts SQL físicos para o MySQL Workbench.
   * Dicionário visual de símbolos (Peter Chen vs Modelo Lógico) e as 3 Leis de Conversão (1:1, 1:N, N:N).

2. 🧭 **Guia Passo a Passo de Ações ("Como Faço Para...?"):**
   * Seletor interativo com os 9 processos mais executados no brModelo Web:
     * Inserir Entidade (Regra do Singular e Maiúsculas)
     * Marcar o Identificador Único com a Bolinha Preta ⚫
     * Conectar Losango de Relacionamento com verbos em maiúsculas
     * Configurar cardinalidades `(0,1)`, `(1,1)`, `(0,n)`, `(1,n)`
     * Modelar Especialização / Generalização (Herança de Peter Chen)
     * Converter para Modelo Lógico em 1 clique
     * Fazer backup em arquivo `.json` para não perder dados no laboratório
     * Exportar imagem PNG em alta resolução para relatórios escolares
     * Gerar script SQL DDL para o MySQL Workbench
   * Cada ação inclui: diagramas vetoriais SVG, cliques exatos do mouse, onde 90% dos alunos erram e dicas do professor.

3. 🎮 **Simulador de Cardinalidades ("As 2 Perguntas Mágicas"):**
   * Elimina o medo das cardinalidades com cenários práticos e cotidianos (E-Commerce, Escola SENAI, Peças Mecânicas, Hospital, Streaming de Música).
   * Aluno responde interativamente às 2 perguntas da regra de negócio e visualiza a dedução lógica em tempo real.

4. ✅ **Checklist Pré-Entrega do Aluno ("Auditor Nota 10 🏆"):**
   * Ferramenta de auditoria que o estudante preenche antes de enviar a atividade.
   * 10 critérios rigorosos de conformidade (nomes no singular, bolinhas pretas ⚫ presentes, nenhum retângulo direto em retângulo, etc.).
   * Termômetro de progresso (0% a 100%), medalha dinâmica e botão para copiar relatório formatado para o Google Classroom.
   * Persistência automática em `localStorage` para não perder as caixas marcadas ao fechar a aba.

5. 🆘 **SOS brModelo Web (Central de Emergências):**
   * Solução direta para os 8 problemas mais comuns enfrentados em aulas práticas:
     * "Fechei a janela e perdi meu modelo no laboratório!"
     * "O brModelo Web não gerou a Foreign Key [FK]!"
     * "Como mudo o texto da cardinalidade de (0,n) para (1,1)?"
     * "Liguei dois retângulos direto e deu erro!"
     * "Como colocar atributos em relacionamento N:N?"
     * "A imagem exportada saiu cortada!"
     * "Erro de 'No database selected' no MySQL Workbench!"
     * "A tela do brModelo Web travou!"

6. 🧠 **Quiz Formativo de Fixação:**
   * 10 questões técnicas baseadas em situações reais de laboratório.
   * Feedback imediato e explicação pedagógica para cada resposta, com pontuação final e opção de refazer.

---

## 🚀 Como Publicar no GitHub Pages

Este repositório foi construído em padrões web modernos (HTML5 semântico, CSS com variáveis e paleta do SENAI, e JavaScript modular ES6). **Zero dependências, zero comandos de build (npm/webpack)**: basta abrir o `index.html` ou hospedar no GitHub Pages.

### Passo a Passo para o GitHub Pages:
1. Crie um repositório no seu GitHub (ex: `senai-brmw-docs`).
2. No terminal do Windows:
   ```bash
   cd C:\SENAI
   git remote add origin https://github.com/SEU_USUARIO/senai-brmw-docs.git
   git branch -M main
   git push -u origin main
   ```
3. No GitHub, abra **Settings ➔ Pages**:
   * Em **Source**, escolha **Deploy from a branch**.
   * Em **Branch**, selecione `main` e a pasta `/ (root)`.
   * Clique em **Save**.
4. Em menos de 1 minuto, seu site estará disponível na web:  
   `https://SEU_USUARIO.github.io/senai-brmw-docs/`

---

## 🛠️ Estrutura de Arquivos

```
C:\SENAI\
├── .gitignore                   # Arquivos ignorados pelo Git
├── README.md                    # Manual do projeto e instruções
├── index.html                   # Aplicação SPA moderna com 6 módulos integrados
├── assets/
│   └── senai-logo.svg           # Logo oficial SESI SENAI vetorizado
├── css/
│   ├── style.css                # Design System completo (variáveis, temas claro/escuro)
│   └── canvas.css               # Estilos complementares de diagramação
└── js/
    ├── app.js                   # Orquestrador central e controle de navegação
    ├── docs-data.js             # Base com 10 artigos completos e regras de modelagem
    ├── action-guide.js          # Dados e passos exatos do "Como Faço Para...?"
    ├── simulator.js             # Cenários interativos do Simulador das 2 Perguntas
    ├── checklist.js             # Lógica de auditoria, cálculo de nota e localStorage
    ├── sos-guide.js             # Resolução passo a passo dos 8 maiores erros de alunos
    └── quiz.js                  # Engine do quiz formativo de 10 questões
```

---

## 👨‍🏫 Autor & Créditos
* **Docente Responsável:** Prof. Jefferson Miguel Dallalibera
* **Unidade:** SESI SENAI Santa Catarina
* **Base Técnica:** Documentação oficial [brmodeloweb.com](https://docs.brmodeloweb.com/) e Teoria Relacional de Peter Chen (1976) & Edgar F. Codd (1970).
