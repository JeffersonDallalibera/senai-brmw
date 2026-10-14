/* ==============================================================================
   📚 BASE DE CONHECIMENTO & DOCUMENTAÇÃO INTERATIVA • SENAI BRMW
   Baseada na documentação oficial do brmodelo web e nos padrões curriculares
   ============================================================================== */

export const DOCS_SECTIONS = [
  {
    id: "introducao",
    category: "1. Primeiros Passos",
    icon: "🚀",
    title: "Bem-vindo ao brModelo Web & Engenharia de Dados",
    description: "Visão geral da ferramenta web de modelagem e seus objetivos pedagógicos.",
    content: `
      <h2>O que é o brModelo Web?</h2>
      <p>O <strong>brModelo Web</strong> (brmodeloweb.com) é a evolução moderna baseada em nuvem do clássico software acadêmico brasileiro brModelo. Ele permite criar, editar, compartilhar e exportar diagramas de banco de dados diretamente no navegador, eliminando problemas de instalação local do Java.</p>
      
      <div class="alert-box alert-info">
        <span class="alert-icon">💡</span>
        <div>
          <strong>Propósito no SENAI:</strong> Esta plataforma interactiva serve como companheira de estudos para transformar regras de negócios em modelos conceituais (Peter Chen) e lógicos (Ted Codd) de alta qualidade técnica.
        </div>
      </div>

      <h2>Vantagens da Versão Web</h2>
      <div class="card-grid">
        <div class="feature-card">
          <div class="card-icon">🌐</div>
          <div class="card-title">100% no Navegador</div>
          <div class="card-desc">Funciona em qualquer computador (Windows, Linux, Chromebook), sem baixar arquivos .jar ou configurar variáveis de ambiente.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">🔗</div>
          <div class="card-title">Compartilhamento por Link</div>
          <div class="card-desc">Permite gerar URLs públicas para o professor ou colegas visualizarem o modelo instantaneamente.</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <div class="card-title">Conversão Automática</div>
          <div class="card-desc">Transforma o modelo conceitual de Peter Chen diretamente em modelo lógico relacional com chaves estrangeiras.</div>
        </div>
      </div>
    `
  },
  {
    id: "operacoes-basicas",
    category: "1. Primeiros Passos",
    icon: "📂",
    title: "Gerenciamento de Modelos no brModelo Web",
    description: "Como criar, duplicar, renomear, excluir, importar e exportar modelos.",
    content: `
      <h2>Operações Essenciais</h2>
      <p>A barra lateral e o menu principal do brmodelo web organizam os seus projetos em três etapas fundamentais:</p>

      <h3>1. Criando um Novo Modelo</h3>
      <p>Ao clicar no botão <strong>"+ Novo Modelo"</strong>, você escolhe entre:</p>
      <ul>
        <li><strong>Modelo Conceitual:</strong> Diagrama Entidade-Relacionamento (DER) usando a notação de Peter Chen (Retângulos, Losangos e Elipses).</li>
        <li><strong>Modelo Lógico:</strong> Diagrama Relacional de Tabelas com Chaves Primárias (PK) e Estrangeiras (FK).</li>
      </ul>

      <h3>2. Importação e Exportação</h3>
      <p>O brmodelo web permite salvar e carregar modelos em formato JSON estruturado:</p>
      <div class="code-container">
        <div class="code-header">
          <span>formato_modelo.json</span>
          <button class="code-copy-btn" onclick="navigator.clipboard.writeText('{\\n  \"name\": \"estoque_db\",\\n  \"type\": \"conceptual\"\\n}')">Copiar</button>
        </div>
        <pre><code>{
  "name": "Controle_Estoque_SENAI",
  "version": "2.0",
  "type": "conceptual",
  "elements": [...]
}</code></pre>
      </div>

      <div class="alert-box alert-tip">
        <span class="alert-icon">⚡</span>
        <div>
          <strong>Super Recurso desta Documentação:</strong> Na aba <em>"Gerador por Layout / IA"</em> deste portal, você pode gerar modelos conceituais completos e exportar o arquivo pronto para importação no brmodelo web com 1 clique!
        </div>
      </div>
    `
  },
  {
    id: "modelo-conceitual",
    category: "2. Modelo Conceitual (Peter Chen)",
    icon: "📦",
    title: "Entidades: Os Substantivos do Sistema",
    description: "Definição, boas práticas de nomenclatura e os 3 tipos de entidades.",
    content: `
      <h2>O que é uma Entidade?</h2>
      <p>Uma <strong>Entidade</strong> representa um objeto, pessoa, evento ou conceito do mundo real sobre o qual a empresa necessita armazenar dados. No modelo de Peter Chen (1976), ela é representada graficamente por um <strong>RETÂNGULO</strong>.</p>

      <h3>Regras de Ouro de Nomenclatura:</h3>
      <ul>
        <li><strong>Sempre no SINGULAR:</strong> Escreva <code>PRODUTO</code>, <code>CLIENTE</code>, <code>FORNECEDOR</code> (nunca <em>"Produtos"</em> ou <em>"Clientes"</em>). A entidade representa o conceito abstrato da coisa, não a lista de itens.</li>
        <li><strong>Sempre em MAIÚSCULAS:</strong> Facilita a leitura e diferencia termos de negócio de colunas físicas.</li>
        <li><strong>Substantivos Concretos:</strong> Evite nomes de ações como "Cadastrar" ou "Vender". Quem vende é o relacionamento!</li>
      </ul>

      <h2>Tipos de Entidades no brModelo Web:</h2>
      <div class="card-grid">
        <div class="feature-card">
          <div class="card-title">1. Entidade Regular (Forte)</div>
          <div class="card-desc">Possui existência própria e identificador único independente (ex: <code>CLIENTE</code>, <code>PRODUTO</code>). Representada por retângulo simples.</div>
        </div>
        <div class="feature-card">
          <div class="card-title">2. Entidade Fraca</div>
          <div class="card-desc">Sua existência depende de outra entidade proprietária (ex: <code>DEPENDENTE</code> depende de <code>FUNCIONARIO</code>). Representada por retângulo duplo.</div>
        </div>
        <div class="feature-card">
          <div class="card-title">3. Entidade Associativa</div>
          <div class="card-desc">Nasce de um relacionamento muitos-para-muitos (N:N) que possui atributos próprios (ex: <code>ITEM_PEDIDO</code> que guarda quantidade e desconto).</div>
        </div>
      </div>
    `
  },
  {
    id: "atributos-e-chaves",
    category: "2. Modelo Conceitual (Peter Chen)",
    icon: "🏷️",
    title: "Atributos & O Sagrado Identificador Único ⚫",
    description: "Como mapear características, o papel dos identificadores e tipos de atributos.",
    content: `
      <h2>O que são Atributos?</h2>
      <p>Atributos são as características, propriedades ou dados elementares que descrevem uma entidade. Graficamente, são representados por <strong>CÍRCULOS ou ELIPSES</strong> conectados ao retângulo da entidade por linhas simples.</p>

      <h2>O Identificador Único (Bolinha Preta ⚫)</h2>
      <p>O <strong>Identificador Único</strong> (ou Chave Primária Conceitual) é o atributo sagrado que <strong>NUNCA se repete</strong> e distingue um registro específico de todos os outros no universo da empresa.</p>
      
      <div class="alert-box alert-warn">
        <span class="alert-icon">⚠️</span>
        <div>
          <strong>O Perigo dos Homônimos:</strong> Nunca use <code>nome_cliente</code> como identificador único! Se dois clientes chamados <em>"Lucas da Silva"</em> comprarem na loja, o sistema misturaria suas compras e dívidas. Use <code>cpf</code> ou <code>id_cliente</code> ⚫!
        </div>
      </div>

      <h3>Classificação dos Atributos:</h3>
      <ul>
        <li><strong>Identificador (⚫ Bolinha preenchida):</strong> Valor exclusivo por registro (ex: <code>id_produto</code>, <code>cnpj</code>, <code>codigo_barra</code>).</li>
        <li><strong>Simples / Descritivo (⚪ Bolinha clara):</strong> Armazena um único dado informativo (ex: <code>preco</code>, <code>descricao</code>).</li>
        <li><strong>Composto:</strong> Atributo que se subdivide em partes menores (ex: <code>Endereco</code> ➔ <code>Rua</code>, <code>Numero</code>, <code>Bairro</code>, <code>CEP</code>).</li>
        <li><strong>Multivalorado (Círculo Duplo 🔘):</strong> Pode conter múltiplos valores para o mesmo registro (ex: <code>telefones</code> de um fornecedor).</li>
      </ul>
    `
  },
  {
    id: "relacionamentos-cardinalidades",
    category: "2. Modelo Conceitual (Peter Chen)",
    icon: "🔗",
    title: "Relacionamentos & As 2 Perguntas Mágicas das Cardinalidades",
    description: "Losangos, verbos de negócio e o fim definitivo do terror do (0,n) e (1,1).",
    content: `
      <h2>O que é um Relacionamento?</h2>
      <p>Entidades isoladas são ilhas sem valor para a empresa. O <strong>Relacionamento</strong> é a conexão lógica que representa a regra de negócio unindo duas ou mais entidades. Graficamente, é desenhado como um <strong>LOSANGO</strong> contendo um verbo de ação em maiúsculas (ex: <code>FORNECE</code>, <code>COMPRA</code>, <code>CONTÉM</code>).</p>

      <h2>O Segredo das Cardinalidades: As 2 Perguntas Mágicas</h2>
      <p>A cardinalidade define o número <strong>mínimo</strong> e <strong>máximo</strong> de vezes que uma entidade participa da relação. Para descobrir sem errar, aplique a técnica das duas perguntas em cada ponta:</p>

      <div class="card-grid">
        <div class="feature-card">
          <div class="card-title">Pergunta 1: MÍNIMO (0 ou 1?)</div>
          <div class="card-desc">
            <em>"Essa entidade recém-cadastrada é OBRIGADA a já participar da relação hoje?"</em><br>
            • Se <strong>NÃO</strong> é obrigada ➔ Mínimo = <strong>0</strong>.<br>
            • Se <strong>SIM</strong>, é obrigatória ➔ Mínimo = <strong>1</strong>.
          </div>
        </div>
        <div class="feature-card">
          <div class="card-title">Pergunta 2: MÁXIMO (1 ou N?)</div>
          <div class="card-desc">
            <em>"No limite máximo, ela pode se conectar com quantos elementos?"</em><br>
            • Se no máximo <strong>UM</strong> ➔ Máximo = <strong>1</strong>.<br>
            • Se pode se conectar a <strong>VÁRIOS</strong> ➔ Máximo = <strong>n</strong> (muitos).
          </div>
        </div>
      </div>

      <h3>Exemplo Real: CLIENTE faz PEDIDO</h3>
      <ul>
        <li><strong>Ponta do CLIENTE ➔ PEDIDO:</strong> O cliente acabou de baixar o app, precisa já ter pedido feito? Não (0). Pode fazer vários? Sim (n). Logo: <code>(0,n)</code>.</li>
        <li><strong>Ponta do PEDIDO ➔ CLIENTE:</strong> Um pedido pode existir voando sem cliente? Não, precisa de dono (1). Um pedido pode pertencer a dois clientes diferentes? Não, é de um só (1). Logo: <code>(1,1)</code>.</li>
      </ul>
    `
  },
  {
    id: "modelo-logico-relacional",
    category: "3. Modelo Lógico (Ted Codd)",
    icon: "📊",
    title: "Modelo Lógico & As Regras de Mapeamento",
    description: "Como o modelo conceitual vira tabelas, colunas, Primary Keys e Foreign Keys.",
    content: `
      <h2>A Transição: Do Conceitual para o Lógico</h2>
      <p>Enquanto o Modelo Conceitual foi feito para os seres humanos entenderem a regra de negócio, o <strong>Modelo Lógico</strong> foi formalizado por Edgar F. Codd em 1970 para ser implementado nos computadores através de tabelas relacionais.</p>

      <h3>As 3 Regras de Transformação do MER para Lógico:</h3>
      
      <div class="card-grid">
        <div class="feature-card">
          <div class="card-title">1. Relacionamento 1 : 1</div>
          <div class="card-desc">A chave primária de uma tabela migra como Chave Estrangeira (FK) para a outra, geralmente naquela de participação obrigatória.</div>
        </div>
        <div class="feature-card">
          <div class="card-title">2. Relacionamento 1 : N</div>
          <div class="card-desc"><strong>A regra do lado 'N':</strong> A Chave Primária (PK) do lado 1 SEMPRE migra para a tabela do lado N como Chave Estrangeira (FK). <em>Ex: id_cliente entra na tabela PEDIDO</em>.</div>
        </div>
        <div class="feature-card">
          <div class="card-title">3. Relacionamento N : N</div>
          <div class="card-desc"><strong>Nasce uma nova tabela associativa!</strong> O relacionamento vira uma tabela intermediária composta pelas duas chaves estrangeiras como chave primária composta. <em>Ex: item_pedido(id_pedido, id_produto, qtd)</em>.</div>
        </div>
      </div>
    `
  },
  {
    id: "projeto-fisico-sql",
    category: "4. Projeto Físico & SQL DDL",
    icon: "💻",
    title: "Geração de Código SQL (DDL)",
    description: "Como converter o modelo lógico em scripts CREATE TABLE para MySQL Workbench.",
    content: `
      <h2>Do Diagrama para o Código SQL</h2>
      <p>No final do fluxo de engenharia, o brModelo web permite exportar o script DDL (<em>Data Definition Language</em>). Esse script é o código real executado no MySQL Workbench ou PostgreSQL para criar fisicamente os arquivos no disco SSD.</p>

      <h3>Exemplo de DDL Gerado para MySQL:</h3>
      <div class="code-container">
        <div class="code-header">
          <span>schema_estoque.sql</span>
          <button class="code-copy-btn" onclick="navigator.clipboard.writeText('CREATE DATABASE estoque_db;')">Copiar</button>
        </div>
        <pre><code>CREATE DATABASE IF NOT EXISTS estoque_db
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE estoque_db;

CREATE TABLE FORNECEDOR (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    telefone VARCHAR(20)
) ENGINE=InnoDB;

CREATE TABLE PRODUTO (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(120) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL,
    id_fornecedor INT NOT NULL,
    CONSTRAINT fk_produto_fornecedor
        FOREIGN KEY (id_fornecedor) 
        REFERENCES FORNECEDOR(id_fornecedor)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;</code></pre>
      </div>
    `
  }
];
