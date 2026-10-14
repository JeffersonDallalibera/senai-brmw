/* ==============================================================================
   📚 BASE DE CONHECIMENTO & GUIA PASSO A PASSO • brModelo Web & SENAI
   Documentação exaustiva, intuitiva e didática para estudantes de 14 a 17 anos
   ============================================================================== */

export const DOCS_SECTIONS = [
  {
    id: "visao-geral",
    category: "1. Conhecendo o brModelo Web",
    icon: "🌐",
    title: "O que é o brModelo Web e Primeiros Passos",
    description: "Visão geral da interface, vantagens do formato web e como acessar.",
    content: `
      <h2>O que é o brModelo Web?</h2>
      <p>O <strong>brModelo Web</strong> (<a href="https://app.brmodeloweb.com" target="_blank">app.brmodeloweb.com</a>) é a versão online e moderna da ferramenta de modelagem mais utilizada no ensino técnico brasileiro. Ele roda <strong>100% no navegador</strong>, sem precisar instalar Java nem baixar arquivos <code>.jar</code>.</p>

      <div class="alert-box alert-tip">
        <span class="alert-icon">💡</span>
        <div>
          <strong>Link Oficial de Acesso:</strong> Você pode acessar diretamente em <a href="https://app.brmodeloweb.com" target="_blank">app.brmodeloweb.com</a>. Funciona no Chrome, Edge, Firefox, no computador do SENAI e no seu celular ou notebook em casa.
        </div>
      </div>

      <h2>A Interface do brModelo Web em 4 Áreas:</h2>
      <div class="card-grid">
        <div class="feature-card">
          <div class="card-icon">1️⃣</div>
          <div class="card-title">Barra Superior (Menu)</div>
          <div class="card-desc">Contém o nome do modelo, botões de Salvar, Desfazer (Ctrl+Z), Refazer (Ctrl+Y), Exportar Imagem e o botão mágico de <strong>Conversão para Lógico</strong>.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">2️⃣</div>
          <div class="card-title">Barra Lateral de Ferramentas</div>
          <div class="card-desc">Onde ficam os botões para arrastar ou clicar: <strong>Entidade</strong> (Retângulo), <strong>Atributo</strong> (Círculo), <strong>Relacionamento</strong> (Losango), <strong>Especialização</strong> e <strong>Conector</strong>.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">3️⃣</div>
          <div class="card-title">Canvas (Área de Desenho)</div>
          <div class="card-desc">A grade quadriculada infinita onde você desenha, posiciona e conecta os elementos do seu banco de dados.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">4️⃣</div>
          <div class="card-title">Painel de Propriedades (Direita)</div>
          <div class="card-desc">Abre ao clicar em qualquer elemento. Permite mudar nome, marcar se o atributo é <strong>Identificador (Chave ⚫)</strong>, definir cardinalidades e tipos.</div>
        </div>
      </div>
    `
  },
  {
    id: "gerenciar-modelos",
    category: "1. Conhecendo o brModelo Web",
    icon: "📂",
    title: "Como Criar, Salvar e Compartilhar Modelos",
    description: "Passo a passo para iniciar um projeto, salvar na nuvem e exportar para entrega.",
    content: `
      <h2>1. Como Criar um Novo Modelo (Passo a Passo)</h2>
      <ol>
        <li>Acesse <a href="https://app.brmodeloweb.com" target="_blank">app.brmodeloweb.com</a>.</li>
        <li>No painel inicial, clique no botão azul <strong>"+ Novo Modelo"</strong>.</li>
        <li>Escolha a opção <strong>"Modelo Conceitual"</strong> (para começar com Peter Chen) ou <strong>"Modelo Lógico"</strong> (tabelas relacionais).</li>
        <li>Dê um nome significativo ao seu projeto (ex: <code>Controle_Estoque_SENAI</code> ou <code>Auto_Pecas_Loja</code>).</li>
      </ol>

      <h2>2. Como Salvar o Seu Trabalho</h2>
      <p>O brModelo Web salva automaticamente no armazenamento local do seu navegador, mas para <strong>garantir que você não perca seu trabalho ao fechar o computador do laboratório</strong>:</p>
      <ul>
        <li><strong>Criar Conta Gratuita:</strong> Faça login com seu Google ou e-mail para que seus modelos fiquem salvos na sua nuvem pessoal.</li>
        <li><strong>Exportar Arquivo (.json):</strong> No menu superior, clique em <strong>Arquivo ➔ Exportar Modelo</strong>. Guarde esse arquivo no seu Google Drive ou pen-drive!</li>
      </ul>

      <h2>3. Como Exportar a Imagem para o Relatório do SENAI</h2>
      <ol>
        <li>No menu superior, clique no botão <strong>"Exportar Imagem"</strong> (ícone de câmera ou foto).</li>
        <li>Escolha o formato <strong>PNG</strong> (com fundo transparente ou branco).</li>
        <li>A imagem com o seu diagrama em alta resolução será baixada na pasta Downloads, pronta para você colar no Word, Google Docs ou entregar na Situação de Aprendizagem!</li>
      </ol>
    `
  },
  {
    id: "passo-entidades",
    category: "2. Passo a Passo no Canvas Conceitual",
    icon: "📦",
    title: "Como Adicionar e Configurar Entidades",
    description: "Criando retângulos, renomeando e definindo tipos de entidades no brModelo Web.",
    content: `
      <h2>Como Inserir uma Entidade no brModelo Web</h2>
      <ol>
        <li>Na barra lateral esquerda de ferramentas, localize o ícone de <strong>Retângulo</strong> (Entidade).</li>
        <li>Clique sobre o ícone e em seguida clique no local desejado do Canvas (ou arraste para o centro).</li>
        <li>Dê um duplo clique sobre o texto da entidade ou use o painel da direita para digitar o nome.</li>
      </ol>

      <div class="alert-box alert-warn">
        <span class="alert-icon">⚠️</span>
        <div>
          <strong>Regra Inviolável de Nomenclatura no SENAI:</strong><br>
          • <strong>SEMPRE no SINGULAR:</strong> Digite <code>PRODUTO</code> (nunca <em>"Produtos"</em>).<br>
          • <strong>SEMPRE em MAIÚSCULAS:</strong> Digite <code>CLIENTE</code>, <code>FORNECEDOR</code>, <code>VEICULO</code>.<br>
          • <strong>Substantivos Concretos:</strong> Uma entidade é uma "coisa" que existe no mundo real, nunca uma ação.
        </div>
      </div>

      <h2>Tipos de Entidades Disponíveis no Painel Direito:</h2>
      <ul>
        <li><strong>Entidade Comum / Regular (Retângulo Simples):</strong> A entidade padrão com ID próprio (ex: <code>CLIENTE</code>, <code>PRODUTO</code>).</li>
        <li><strong>Entidade Fraca (Retângulo com borda dupla):</strong> Entidade cuja existência depende de outra (ex: <code>DEPENDENTE</code> só existe se existir <code>FUNCIONARIO</code>).</li>
        <li><strong>Entidade Associativa:</strong> Usada quando um relacionamento N:N precisa guardar atributos próprios (ex: <code>ITEM_PEDIDO</code> guardando quantidade e desconto).</li>
      </ul>
    `
  },
  {
    id: "passo-atributos",
    category: "2. Passo a Passo no Canvas Conceitual",
    icon: "🏷️",
    title: "Como Adicionar Atributos e Marcar a Bolinha Preta ⚫",
    description: "Conectando círculos, marcando chaves primárias e evitando o caos de homônimos.",
    content: `
      <h2>Como Inserir Atributos no brModelo Web</h2>
      <ol>
        <li>Na barra lateral esquerda, clique no ícone de <strong>Círculo / Elipse</strong> (Atributo).</li>
        <li>Clique próximo à entidade correspondente no Canvas.</li>
        <li>Para ligar o atributo à entidade: selecione a ferramenta de <strong>Linha / Conector</strong>, clique na entidade e puxe até o círculo do atributo.</li>
        <li>Dê duplo clique no círculo para dar um nome descritivo em minúsculas (ex: <code>preco_venda</code>, <code>descricao</code>, <code>data_cadastro</code>).</li>
      </ol>

      <h2>O Momento Mais Importante: A Bolinha Preta ⚫ (Identificador)</h2>
      <p>Toda entidade do mundo precisa de um atributo que <strong>NUNCA se repete</strong>, a "impressão digital" do registro.</p>

      <h3>Como transformar em Identificador no brModelo Web:</h3>
      <ol>
        <li>Clique sobre o círculo do atributo que será o ID (ex: <code>id_produto</code> ou <code>cnpj</code>).</li>
        <li>No painel de propriedades na lateral direita da tela, localize a opção <strong>"Identificador"</strong> (ou <em>"Chave Primária"</em>).</li>
        <li>Marque a caixinha de seleção (checkbox).</li>
        <li><strong>Veja a mágica acontecer:</strong> o círculo ficará preenchido de <strong>PRETO SÓLIDO ⚫</strong>!</li>
      </ol>

      <div class="alert-box alert-info">
        <span class="alert-icon">⚫</span>
        <div>
          <strong>Por que a Bolinha Preta é obrigatória?</strong> Se você não definir um identificador único para cada entidade, pessoas com nomes iguais (homônimos como <em>"Lucas da Silva"</em>) misturarão cadastros e compras no banco de dados!
        </div>
      </div>

      <h2>Por que e quando colocar Cardinalidade no Atributo?</h2>
      <p>Muitos alunos acham que cardinalidade <code>(0,1)</code>, <code>(1,1)</code> ou <code>(0,n)</code> só existe em relacionamentos entre retângulos. Mas colocar <strong>cardinalidade em um atributo</strong> é uma das ferramentas mais poderosas da modelagem!</p>

      <div class="card-grid">
        <div class="feature-card">
          <div class="card-icon">1️⃣</div>
          <div class="card-title">O Mínimo (0 ou 1): Opcional vs Obrigatório</div>
          <div class="card-desc">
            • <strong>Mínimo = 0:</strong> O campo é <em>opcional</em> (no banco físico aceita <code>NULL</code>). Ex: <code>complemento_endereco</code>.<br>
            • <strong>Mínimo = 1:</strong> O campo é <em>obrigatório</em> (no banco físico vira <code>NOT NULL</code>). Ex: <code>nome</code>, <code>cpf</code>.
          </div>
        </div>
        <div class="feature-card">
          <div class="card-icon">2️⃣</div>
          <div class="card-title">O Máximo (1 ou n): Monovalorado vs Multivalorado</div>
          <div class="card-desc">
            • <strong>Máximo = 1:</strong> O registro só pode ter <em>um valor</em>. Ex: <code>data_nascimento</code>.<br>
            • <strong>Máximo = n:</strong> O registro aceita <em>vários valores</em>! Ex: <code>telefone</code> (residencial, celular, recado).
          </div>
        </div>
      </div>

      <h3>As 4 Combinações Possíveis na Prática:</h3>
      <ul>
        <li><code>(1,1)</code> ➔ <strong>Obrigatório e Único:</strong> É o padrão da maioria dos campos (ex: <code>cpf</code>).</li>
        <li><code>(0,1)</code> ➔ <strong>Opcional e Único:</strong> Pode ficar em branco, mas se preencher, tem só 1 (ex: <code>apelido</code>, <code>cnh</code>).</li>
        <li><code>(0,n)</code> ➔ <strong>Opcional e Multivalorado:</strong> Pode não ter nenhum ou ter vários (ex: <code>telefone</code>).</li>
        <li><code>(1,n)</code> ➔ <strong>Obrigatório e Multivalorado:</strong> Tem que ter ao menos 1 e pode ter vários (ex: <code>idioma_fluente</code>).</li>
      </ul>

      <div class="alert-box alert-tip">
        <span class="alert-icon">⚡</span>
        <div>
          <strong>O Efeito Mágico no Modelo Lógico (1ª Forma Normal):</strong><br>
          Bancos relacionais proíbem guardar múltiplos telefones separados por vírgula na mesma célula. Quando você define um atributo com máximo <code>n</code> (ex: <code>telefone (0,n)</code>) e clica em <strong>Converter para Lógico</strong> no brModelo Web, o sistema <strong>cria automaticamente uma tabela separada</strong> (ex: <code>telefone_cliente</code>) com Chave Estrangeira ligada à entidade!
        </div>
      </div>
    `
  },
  {
    id: "passo-relacionamentos",
    category: "2. Passo a Passo no Canvas Conceitual",
    icon: "🔗",
    title: "Como Ligar Entidades com Losangos e Cardinalidades",
    description: "Inserindo relacionamentos, conectando linhas e configurando (0,n) e (1,1).",
    content: `
      <h2>Como Inserir um Relacionamento no brModelo Web</h2>
      <ol>
        <li>Na barra de ferramentas, clique no ícone de <strong>Losango</strong> (Relacionamento).</li>
        <li>Clique no Canvas exatamente no espaço entre as duas entidades que conversam entre si.</li>
        <li>Dê duplo clique dentro do losango e escreva um <strong>VERBO DE AÇÃO em maiúsculas</strong> (ex: <code>FORNECE</code>, <code>REALIZA</code>, <code>CONTÉM</code>, <code>PERTENCE</code>).</li>
        <li>Selecione a ferramenta de <strong>Conector (Linha)</strong> e faça duas ligações:
          <ul>
            <li>Ligue a <strong>Entidade A ➔ Losango</strong>.</li>
            <li>Ligue o <strong>Losango ➔ Entidade B</strong>.</li>
          </ul>
        </li>
      </ol>

      <div class="alert-box alert-warn">
        <span class="alert-icon">🚫</span>
        <div>
          <strong>Erro Clássico de Aluno no brModelo Web:</strong> NUNCA ligue um retângulo direto em outro retângulo com uma linha! No modelo de Peter Chen, duas entidades SEMPRE se comunicam através de um losango no meio.
        </div>
      </div>

      <h2>Como Configurar a Cardinalidade nas Pontas das Linhas:</h2>
      <ol>
        <li>Ao ligar a linha, o brModelo Web coloca automaticamente um número padrão na ponta (como <code>(0,n)</code> ou <code>(1,1)</code>).</li>
        <li>Dê um <strong>duplo clique sobre a sigla da cardinalidade</strong> na ponta da linha (ou selecione a linha e olhe o painel direito).</li>
        <li>Escolha a cardinalidade correta de acordo com as regras de negócio:
          <ul>
            <li><code>(0,1)</code>: Mínimo 0 (opcional), Máximo 1.</li>
            <li><code>(1,1)</code>: Mínimo 1 (obrigatório), Máximo 1.</li>
            <li><code>(0,n)</code>: Mínimo 0 (opcional), Máximo muitos.</li>
            <li><code>(1,n)</code>: Mínimo 1 (obrigatório), Máximo muitos.</li>
          </ul>
        </li>
      </ol>
    `
  },
  {
    id: "passo-especializacao",
    category: "2. Passo a Passo no Canvas Conceitual",
    icon: "🔱",
    title: "Como Fazer Especialização / Generalização (Herança)",
    description: "Criando o triângulo de herança, definindo subclasses e disjunção (d) ou sobreposição (o).",
    content: `
      <h2>O que é Especialização / Generalização?</h2>
      <p>É o mecanismo similar à herança da Orientação a Objetos. Usamos quando uma entidade genérica possui tipos específicos que compartilham atributos comuns, mas têm detalhes exclusivos.</p>
      <p><em>Exemplo clássico:</em> <code>CLIENTE</code> é genérico. Mas pode se especializar em <code>PESSOA_FISICA</code> (tem CPF) ou <code>PESSOA_JURIDICA</code> (tem CNPJ).</p>

      <h2>Como Fazer no brModelo Web (Passo a Passo):</h2>
      <ol>
        <li>Desenhe a entidade genérica pai (ex: <code>CLIENTE</code>).</li>
        <li>Desenhe as duas entidades filhas abaixo dela (ex: <code>PESSOA_FISICA</code> e <code>PESSOA_JURIDICA</code>).</li>
        <li>Na barra de ferramentas, clique no ícone de <strong>Triângulo / Especialização</strong> e coloque entre o pai e os filhos.</li>
        <li>Conecte o pai à ponta superior do triângulo e os filhos às pontas inferiores.</li>
        <li>No painel direito do triângulo, escolha as duas propriedades de ouro:
          <ul>
            <li><strong>Disjunção (d) vs Sobreposição (o):</strong>
              <br>• <strong>(d) Disjunta:</strong> Um cliente é OU física OU jurídica, nunca os dois ao mesmo tempo.
              <br>• <strong>(o) Sobreposta:</strong> Um elemento pode ser ambos (ex: um <code>FUNCIONARIO</code> que também é <code>ALUNO</code>).
            </li>
            <li><strong>Total (t) vs Parcial (p):</strong>
              <br>• <strong>Total:</strong> Todo cliente OBRIGATORIAMENTE tem que ser física ou jurídica.
              <br>• <strong>Parcial:</strong> Podem existir clientes que não se enquadram em nenhuma das duas categorias.
            </li>
          </ul>
        </li>
      </ol>
    `
  },
  {
    id: "conversao-logico",
    category: "3. Modelo Lógico & Conversão Automática",
    icon: "⚡",
    title: "O Botão Mágico: Convertendo Conceitual em Lógico",
    description: "Como o brModelo Web gera as tabelas relacionais com chaves estrangeiras automaticamente.",
    content: `
      <h2>A Mágica da Conversão Automática</h2>
      <p>Depois que o seu Modelo Conceitual (Peter Chen) estiver completo, com todas as entidades, identificadores ⚫ e relacionamentos com cardinalidades, você não precisa redesenhar tudo do zero para fazer o Modelo Lógico!</p>

      <h2>Como Executar a Conversão no brModelo Web:</h2>
      <ol>
        <li>Com o seu modelo conceitual aberto no Canvas, olhe para a barra de menus superior.</li>
        <li>Clique no botão <strong>"Converter para Lógico"</strong> (ícone com setas ou tabelas).</li>
        <li>O brModelo Web criará automaticamente um <strong>novo modelo lógico</strong> em uma nova aba!</li>
        <li><strong>O que o sistema faz automaticamente por você:</strong>
          <ul>
            <li>Cada retângulo de entidade vira uma <strong>TABELA</strong> relacional.</li>
            <li>Cada círculo de atributo vira uma <strong>COLUNA</strong>.</li>
            <li>O atributo com bolinha preta vira a <strong>PRIMARY KEY [PK]</strong>.</li>
            <li>Nas relações 1:N, a chave primária do lado 1 migra automaticamente para o lado N como <strong>FOREIGN KEY [FK]</strong>!</li>
            <li>Nas relações N:N, o sistema cria automaticamente uma nova <strong>tabela associativa intermediária</strong>!</li>
          </ul>
        </li>
      </ol>

      <div class="alert-box alert-tip">
        <span class="alert-icon">🎯</span>
        <div>
          <strong>Dica do Professor:</strong> Após a conversão, sempre faça uma revisão visual nas tabelas geradas para conferir se todas as Foreign Keys (FKs) receberam os nomes adequados antes de gerar o SQL final.
        </div>
      </div>
    `
  },
  {
    id: "gerar-sql-fisico",
    category: "4. Projeto Físico & Código SQL",
    icon: "💻",
    title: "Como Gerar o Script SQL DDL para o MySQL",
    description: "Exportando CREATE TABLE com chaves primárias e constraints para o MySQL Workbench.",
    content: `
      <h2>Gerando o Código SQL no brModelo Web</h2>
      <ol>
        <li>Abra o seu <strong>Modelo Lógico</strong> gerado na etapa anterior.</li>
        <li>No menu superior, clique no botão <strong>"Gerar Físico"</strong> (ou <em>"Gerar Código SQL"</em>).</li>
        <li>Selecione o SGBD alvo (escolha <strong>MySQL</strong> ou <strong>PostgreSQL</strong>).</li>
        <li>Uma janela se abrirá contendo todo o script com os comandos <code>CREATE TABLE</code>, tipos de dados, <code>PRIMARY KEY</code> e <code>FOREIGN KEY</code> com integridade referencial!</li>
        <li>Clique em <strong>"Copiar Código"</strong>.</li>
      </ol>

      <h2>Como Rodar no MySQL Workbench (Laboratório do SENAI):</h2>
      <ol>
        <li>Abra o <strong>MySQL Workbench</strong> no computador do laboratório.</li>
        <li>Conecte-se na sua instância local (<code>localhost:3306</code>).</li>
        <li>Abra uma nova aba de Query SQL (atalho: <code>Ctrl + T</code>).</li>
        <li>Cole o código gerado pelo brModelo Web.</li>
        <li>Adicione no topo as duas linhas protetivas:
          <pre><code>CREATE DATABASE IF NOT EXISTS estoque_db;
USE estoque_db;</code></pre>
        </li>
        <li>Pressione o botão do Raio ⚡ (ou <code>Ctrl + Shift + Enter</code>) para executar e ver todas as tabelas criadas no banco de verdade!</li>
      </ol>
    `
  },
  {
    id: "anatomia-elementos",
    category: "3. Modelo Lógico & Conversão Automática",
    icon: "📐",
    title: "Dicionário Visual: Símbolos de Peter Chen vs Modelo Lógico",
    description: "Tabela comparativa dos símbolos conceituais e como eles viram tabelas no modelo lógico.",
    content: `
      <h2>Equivalência entre Notação de Peter Chen e Modelo Lógico</h2>
      <p>Compreenda como cada elemento conceitual se traduz nas estruturas relacionais desenvolvidas por Edgar F. Codd:</p>

      <div class="card-grid">
        <div class="feature-card">
          <div class="card-icon">📦</div>
          <div class="card-title">Retângulo (Entidade)</div>
          <div class="card-desc"><strong>No Lógico:</strong> Vira uma <strong>TABELA</strong> relacional (ex: tabela <code>cliente</code>). Representa um conjunto de tuplas/linhas.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">⚫</div>
          <div class="card-title">Círculo Preto (Identificador)</div>
          <div class="card-desc"><strong>No Lógico:</strong> Vira a <strong>PRIMARY KEY [PK]</strong>. O campo que garante que nenhuma linha se repita no banco.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">⚪</div>
          <div class="card-title">Círculo Branco (Atributo Comum)</div>
          <div class="card-desc"><strong>No Lógico:</strong> Vira uma <strong>COLUNA</strong> comum na tabela (ex: <code>nome</code>, <code>preco</code>, <code>data_cadastro</code>).</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">🔗</div>
          <div class="card-title">Losango 1:N</div>
          <div class="card-desc"><strong>No Lógico:</strong> Vira uma <strong>FOREIGN KEY [FK]</strong> na tabela do lado N, apontando para a PK do lado 1.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">🔀</div>
          <div class="card-title">Losango N:N</div>
          <div class="card-desc"><strong>No Lógico:</strong> Vira uma <strong>NOVA TABELA ASSOCIATIVA</strong> contendo as duas chaves estrangeiras combinadas.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">🔱</div>
          <div class="card-title">Triângulo (Herança)</div>
          <div class="card-desc"><strong>No Lógico:</strong> Pode virar uma tabela por subclasse (com a mesma PK da mãe como PK/FK) ou uma tabela única unificada.</div>
        </div>
      </div>
    `
  },
  {
    id: "regras-transformacao",
    category: "3. Modelo Lógico & Conversão Automática",
    icon: "📜",
    title: "As 3 Regras de Ouro da Conversão para o Modelo Lógico",
    description: "Entenda o que o brModelo Web faz por trás dos panos nas relações 1:1, 1:N e N:N.",
    content: `
      <h2>As 3 Regras que Todo Estudante Precisa Dominar:</h2>
      
      <h3>Regra 1: Relacionamento 1:N (Um para Muitos)</h3>
      <p>É o tipo mais comum no dia a dia (ex: <code>CLIENTE (1) --- REALIZA --- (N) PEDIDO</code>).</p>
      <div class="alert-box alert-tip">
        <span class="alert-icon">💡</span>
        <div>
          <strong>A Regra:</strong> A Chave Primária [PK] do lado "1" <strong>SEMPRE MIGRA</strong> para a tabela do lado "N" como Chave Estrangeira [FK].<br>
          <em>Resultado:</em> A tabela <code>PEDIDO</code> ganha a coluna <code>id_cliente [FK]</code>!
        </div>
      </div>

      <h3>Regra 2: Relacionamento N:N (Muitos para Muitos)</h3>
      <p>Exemplo clássico: <code>PRODUTO (N) --- COMPÕE --- (N) PEDIDO</code>.</p>
      <div class="alert-box alert-info">
        <span class="alert-icon">✨</span>
        <div>
          <strong>A Regra:</strong> O relacionamento N:N <strong>SEMPRE CRIA UMA NOVA TABELA</strong> (Tabela Associativa).<br>
          <em>Resultado:</em> Nasce a tabela <code>ITEM_PEDIDO</code> contendo <code>id_pedido [FK]</code> + <code>id_produto [FK]</code> e atributos da transação (como <code>quantidade</code> e <code>preco_unitario</code>).
        </div>
      </div>

      <h3>Regra 3: Relacionamento 1:1 (Um para Um)</h3>
      <p>Exemplo: <code>FUNCIONARIO (1) --- GERE --- (1) DEPARTAMENTO</code>.</p>
      <div class="alert-box alert-warn">
        <span class="alert-icon">🔍</span>
        <div>
          <strong>A Regra:</strong> A Chave Primária de qualquer um dos dois lados pode migrar para o outro lado, mas a boa prática recomenda migrar a chave para a entidade com participação <strong>obrigatória</strong> (mínimo = 1).
        </div>
      </div>
    `
  }
];
