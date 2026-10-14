/* ==============================================================================
   🧭 GUIA DE AÇÕES PASSO A PASSO • brModelo Web
   Instruções exatas, didáticas e visuais para estudantes do SESI SENAI
   ============================================================================== */

export const ACTION_GUIDES = [
  {
    id: "action-nova-entidade",
    title: "Como Criar e Renomear uma Entidade",
    category: "1. Modelagem Conceitual",
    icon: "📦",
    summary: "Inserir o retângulo fundamental no canvas e aplicar a regra de ouro de nomenclatura.",
    steps: [
      {
        num: 1,
        instruction: "Na barra de ferramentas lateral esquerda do brModelo Web, clique na ferramenta <strong>Entidade (Retângulo)</strong>.",
        badge: "Clique Ferramenta"
      },
      {
        num: 2,
        instruction: "Mova o mouse para a área quadriculada do Canvas e dê um clique no ponto onde deseja posicionar o elemento.",
        badge: "Clique no Canvas"
      },
      {
        num: 3,
        instruction: "Dê um <strong>duplo clique</strong> diretamente sobre o texto do retângulo (ou selecione-o e use o Painel de Propriedades na direita).",
        badge: "Duplo Clique"
      },
      {
        num: 4,
        instruction: "Digite o nome da entidade <strong>SEMPRE NO SINGULAR</strong> e <strong>EM MAIÚSCULAS</strong> (ex: <code>CLIENTE</code>, <code>PRODUTO</code>, <code>VEICULO</code>). Pressione Enter para confirmar.",
        badge: "Regra SENAI"
      }
    ],
    commonMistake: "Escrever no plural (ex: <code>PRODUTOS</code> ou <code>CLIENTES</code>) ou usar jargões de banco de dados físico como <code>TBL_PRODUTO</code>. Entidade conceitual é uma ideia do mundo real, sempre no singular!",
    proTip: "Você pode redimensionar o retângulo puxando as pequenas alças nos cantos ou arrastá-lo livremente segurando o botão esquerdo do mouse.",
    svgPreview: `
      <svg viewBox="0 0 240 100" class="action-preview-svg">
        <rect x="30" y="25" width="180" height="50" rx="4" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="2.5" />
        <text x="120" y="55" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="var(--text-main)">PRODUTO</text>
      </svg>
    `
  },
  {
    id: "action-bolinha-preta",
    title: "Como Inserir Atributo e Ativar a Bolinha Preta ⚫ (ID)",
    category: "1. Modelagem Conceitual",
    icon: "⚫",
    summary: "Garantir a unicidade de cada registro e evitar o erro fatal de homônimos.",
    steps: [
      {
        num: 1,
        instruction: "Na barra lateral esquerda, clique na ferramenta de <strong>Atributo (Círculo / Elipse)</strong>.",
        badge: "Ferramenta Círculo"
      },
      {
        num: 2,
        instruction: "Dê um clique no Canvas próximo à entidade que receberá este atributo.",
        badge: "Posicionar Atributo"
      },
      {
        num: 3,
        instruction: "Selecione a ferramenta <strong>Conector (Linha)</strong>, clique na entidade e arraste até o círculo para ligar os dois.",
        badge: "Ligar com Linha"
      },
      {
        num: 4,
        instruction: "Dê um duplo clique no círculo e digite o nome descritivo em minúsculas (ex: <code>id_produto</code> ou <code>cpf</code>).",
        badge: "Nomear Campo"
      },
      {
        num: 5,
        instruction: "Clique sobre o círculo do atributo para selecioná-lo. No <strong>Painel de Propriedades (à direita)</strong>, marque a opção <strong>'Identificador'</strong> (ou 'Chave').",
        badge: "Bolinha Preta ⚫"
      },
      {
        num: 6,
        instruction: "Observe o círculo: ele ficará preenchido com a <strong>bolinha preta sólida ⚫</strong>. Parabéns, seu identificador único está ativo!",
        badge: "Confirmação Visual"
      }
    ],
    commonMistake: "Esquecer de marcar o Identificador ⚫ em alguma entidade. Sem ele, o brModelo Web não saberá quem é a Chave Primária [PK] ao converter para o modelo lógico!",
    proTip: "Sempre dê nomes intuitivos com prefixo como <code>id_cliente</code>, <code>id_pedido</code>, <code>codigo_peca</code>. Evite usar nomes de pessoas ou apelidos como identificadores.",
    svgPreview: `
      <svg viewBox="0 0 280 120" class="action-preview-svg">
        <line x1="140" y1="40" x2="140" y2="70" stroke="var(--border-focus)" stroke-width="2" />
        <circle cx="140" cy="30" r="14" fill="var(--text-main)" stroke="var(--text-main)" stroke-width="2" />
        <rect x="60" y="70" width="160" height="42" rx="4" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="2" />
        <text x="140" y="96" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="var(--text-main)">CLIENTE</text>
        <text x="165" y="34" font-family="sans-serif" font-size="11" font-weight="600" fill="var(--text-muted)">id_cliente ⚫</text>
      </svg>
    `
  },
  {
    id: "action-losango-relacionamento",
    title: "Como Ligar Entidades com Losangos de Relacionamento",
    category: "1. Modelagem Conceitual",
    icon: "🔗",
    summary: "Fazer duas entidades conversarem através de verbos de negócio sem cruzar fios.",
    steps: [
      {
        num: 1,
        instruction: "Na barra de ferramentas, clique na ferramenta de <strong>Relacionamento (Losango)</strong>.",
        badge: "Ferramenta Losango"
      },
      {
        num: 2,
        instruction: "Clique no Canvas exatamente no espaço livre entre as duas entidades envolvidas.",
        badge: "Posicionar Losango"
      },
      {
        num: 3,
        instruction: "Dê um duplo clique dentro do losango e digite um <strong>VERBO DE AÇÃO em maiúsculas</strong> (ex: <code>REALIZA</code>, <code>CONTÉM</code>, <code>FORNECE</code>, <code>PERTENCE</code>).",
        badge: "Verbo de Ação"
      },
      {
        num: 4,
        instruction: "Selecione a ferramenta <strong>Conector (Linha)</strong>. Clique na Entidade A e arraste a linha até o Losango.",
        badge: "Conexão Linha 1"
      },
      {
        num: 5,
        instruction: "Clique novamente com o conector do Losango e arraste até a Entidade B.",
        badge: "Conexão Linha 2"
      }
    ],
    commonMistake: "Ligar um retângulo diretamente a outro retângulo com uma linha! No modelo de Peter Chen, isso é um erro grave de sintaxe. Duas entidades SEMPRE se comunicam através de um losango.",
    proTip: "Evite nomes genéricos como 'TEM' ou 'FAZ'. Prefira verbos ricos de negócio: <code>MINISTRA</code>, <code>LOTADO_EM</code>, <code>EMITE</code>, <code>ATENDE</code>.",
    svgPreview: `
      <svg viewBox="0 0 360 110" class="action-preview-svg">
        <line x1="85" y1="55" x2="180" y2="55" stroke="var(--border-focus)" stroke-width="2" />
        <line x1="180" y1="55" x2="275" y2="55" stroke="var(--border-focus)" stroke-width="2" />
        <rect x="15" y="35" width="85" height="40" rx="3" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="2" />
        <text x="57" y="59" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="var(--text-main)">CLIENTE</text>
        <polygon points="180,30 215,55 180,80 145,55" fill="var(--accent-purple-light)" stroke="var(--accent-purple)" stroke-width="2" />
        <text x="180" y="58" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="var(--accent-purple)">REALIZA</text>
        <rect x="260" y="35" width="85" height="40" rx="3" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="2" />
        <text x="302" y="59" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="var(--text-main)">PEDIDO</text>
      </svg>
    `
  },
  {
    id: "action-cardinalidade",
    title: "Como Configurar e Alterar as Cardinalidades (0,n), (1,1)",
    category: "1. Modelagem Conceitual",
    icon: "🔢",
    summary: "Definir se uma relação é opcional ou obrigatória e se aceita múltiplos itens.",
    steps: [
      {
        num: 1,
        instruction: "Ao ligar uma linha entre entidade e losango, repare que o brModelo Web insere uma sigla automática na ponta (como <code>(0,n)</code> ou <code>(1,1)</code>).",
        badge: "Identificar Sigla"
      },
      {
        num: 2,
        instruction: "Dê um <strong>duplo clique direto sobre o texto da cardinalidade</strong> na ponta da linha.",
        badge: "Duplo Clique no Texto"
      },
      {
        num: 3,
        instruction: "No menu ou campo que abrir, selecione a opção desejada de acordo com as 2 perguntas de negócio:",
        badge: "Escolha da Regra"
      },
      {
        num: 4,
        instruction: "• <code>(0,1)</code>: Mínimo 0 (opcional), no máximo 1 único elemento.<br>• <code>(1,1)</code>: Mínimo 1 (obrigatório), no máximo 1 elemento.<br>• <code>(0,n)</code>: Mínimo 0 (opcional), podendo se relacionar com muitos.<br>• <code>(1,n)</code>: Mínimo 1 (obrigatório), devendo se relacionar com muitos.",
        badge: "Significados"
      },
      {
        num: 5,
        instruction: "Repita o mesmo processo na outra ponta da linha para a outra entidade!",
        badge: "Ambos os Lados"
      }
    ],
    commonMistake: "Editar apenas um lado da relação e esquecer o outro, deixando um padrão incorreto que depois bagunçará a criação das Chaves Estrangeiras.",
    proTip: "Use o nosso 'Simulador de Cardinalidades' na aba ao lado para entender a lógica das perguntas antes de preencher no brModelo Web!",
    svgPreview: `
      <svg viewBox="0 0 300 80" class="action-preview-svg">
        <line x1="40" y1="40" x2="260" y2="40" stroke="var(--border-focus)" stroke-width="2" />
        <rect x="20" y="25" width="60" height="30" rx="3" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="1.5" />
        <text x="50" y="44" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="var(--text-main)">ALUNO</text>
        <text x="95" y="32" font-family="sans-serif" font-size="11" font-weight="bold" fill="var(--senai-blue)">(1,1)</text>
        <polygon points="150,22 170,40 150,58 130,40" fill="var(--accent-purple-light)" stroke="var(--accent-purple)" stroke-width="1.5" />
        <text x="205" y="32" font-family="sans-serif" font-size="11" font-weight="bold" fill="var(--senai-blue)">(0,n)</text>
        <rect x="220" y="25" width="60" height="30" rx="3" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="1.5" />
        <text x="250" y="44" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="var(--text-main)">CURSO</text>
      </svg>
    `
  },
  {
    id: "action-especializacao",
    title: "Como Fazer Especialização / Generalização (Triângulo de Herança)",
    category: "1. Modelagem Conceitual",
    icon: "🔱",
    summary: "Herdar atributos de uma entidade mãe para entidades filhas específicas.",
    steps: [
      {
        num: 1,
        instruction: "Crie a entidade mãe genérica no alto da tela (ex: <code>PESSOA</code> ou <code>VEICULO</code>).",
        badge: "Entidade Mãe"
      },
      {
        num: 2,
        instruction: "Crie as entidades filhas especializadas posicionadas abaixo (ex: <code>PESSOA_FISICA</code> e <code>PESSOA_JURIDICA</code>).",
        badge: "Entidades Filhas"
      },
      {
        num: 3,
        instruction: "Na barra de ferramentas lateral, clique no ícone de <strong>Especialização (Triângulo)</strong> e posicione-o entre a mãe e as filhas.",
        badge: "Triângulo"
      },
      {
        num: 4,
        instruction: "Com a ferramenta de Conector, ligue a entidade mãe ao vértice superior do triângulo e as filhas à base do triângulo.",
        badge: "Conexões"
      },
      {
        num: 5,
        instruction: "No painel direito, defina as regras: <strong>Disjunta (d)</strong> (ou uma ou outra) vs <strong>Sobreposta (o)</strong> (pode ser ambas), e <strong>Total (t)</strong> vs <strong>Parcial (p)</strong>.",
        badge: "Regras d/o e t/p"
      }
    ],
    commonMistake: "Criar o atributo de ID (bolinha preta) e os mesmos atributos comuns repetidos dentro de cada entidade filha. A regra de ouro é: filhas herdam tudo da mãe!",
    proTip: "No triângulo, a letra 'd' indica que alguém não pode ser Pessoa Física e Jurídica ao mesmo tempo; a letra 't' indica que toda pessoa cadastrada precisa ser de um dos dois tipos.",
    svgPreview: `
      <svg viewBox="0 0 280 130" class="action-preview-svg">
        <rect x="95" y="10" width="90" height="30" rx="3" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="2" />
        <text x="140" y="29" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="var(--text-main)">CLIENTE</text>
        <line x1="140" y1="40" x2="140" y2="55" stroke="var(--border-focus)" stroke-width="2" />
        <polygon points="140,55 155,75 125,75" fill="var(--accent-amber-light)" stroke="var(--accent-amber)" stroke-width="2" />
        <text x="140" y="70" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="var(--accent-amber)">d, t</text>
        <line x1="130" y1="75" x2="65" y2="95" stroke="var(--border-focus)" stroke-width="2" />
        <line x1="150" y1="75" x2="215" y2="95" stroke="var(--border-focus)" stroke-width="2" />
        <rect x="20" y="95" width="90" height="28" rx="3" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="1.5" />
        <text x="65" y="112" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="var(--text-main)">FISICA</text>
        <rect x="170" y="95" width="90" height="28" rx="3" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="1.5" />
        <text x="215" y="112" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="var(--text-main)">JURIDICA</text>
      </svg>
    `
  },
  {
    id: "action-conversao-logico",
    title: "Como Converter para Modelo Lógico em 1 Clique (Botão Mágico)",
    category: "2. Modelo Lógico",
    icon: "⚡",
    summary: "Transformar retângulos e círculos em tabelas relacionais com PKs e FKs automáticas.",
    steps: [
      {
        num: 1,
        instruction: "Faça uma revisão no seu Modelo Conceitual: verifique se todas as entidades possuem bolinha preta ⚫ e se os relacionamentos têm cardinalidades.",
        badge: "Revisão Prévia"
      },
      {
        num: 2,
        instruction: "Na barra de menus superior do brModelo Web, localize e clique no botão <strong>'Converter para Lógico'</strong> (ícone de grade ou setas circulares).",
        badge: "Botão Mágico"
      },
      {
        num: 3,
        instruction: "O brModelo Web abrirá imediatamente uma nova aba com o <strong>Modelo Lógico Relacional</strong> estruturado!",
        badge: "Nova Aba Gerada"
      },
      {
        num: 4,
        instruction: "Observe o que o sistema construiu para você:<br>• Entidades viraram <strong>TABELAS</strong>.<br>• Bolinhas pretas viraram <strong>[PK] (Primary Key)</strong>.<br>• Nas relações 1:N, o ID do lado 1 migrou para o lado N como <strong>[FK] (Foreign Key)</strong>.<br>• Nas relações N:N, nasceu uma <strong>nova tabela associativa</strong> com ambas as FKs!",
        badge: "Regras de Codd"
      }
    ],
    commonMistake: "Tentar converter um modelo conceitual incompleto ou com linhas soltas sem conector. O brModelo avisará erro ou gerará tabelas vazias sem FKs.",
    proTip: "No modelo lógico gerado, reposicione as tabelas na tela para que as linhas de Foreign Key fiquem esticadas e fáceis de ler.",
    svgPreview: `
      <svg viewBox="0 0 320 110" class="action-preview-svg">
        <rect x="15" y="15" width="130" height="80" rx="4" fill="var(--bg-surface)" stroke="var(--senai-blue)" stroke-width="2" />
        <rect x="15" y="15" width="130" height="24" fill="var(--senai-blue)" rx="3" />
        <text x="80" y="31" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#fff">CLIENTE</text>
        <text x="25" y="55" font-family="sans-serif" font-size="10" font-weight="bold" fill="var(--senai-blue)">[PK] id_cliente</text>
        <text x="25" y="75" font-family="sans-serif" font-size="10" fill="var(--text-muted)">nome_cliente</text>

        <path d="M 145 55 L 180 55" stroke="var(--accent-emerald)" stroke-width="2" stroke-dasharray="3,3" />

        <rect x="180" y="15" width="130" height="80" rx="4" fill="var(--bg-surface)" stroke="var(--senai-blue)" stroke-width="2" />
        <rect x="180" y="15" width="130" height="24" fill="var(--senai-blue)" rx="3" />
        <text x="245" y="31" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#fff">PEDIDO</text>
        <text x="190" y="52" font-family="sans-serif" font-size="9" font-weight="bold" fill="var(--senai-blue)">[PK] id_pedido</text>
        <text x="190" y="68" font-family="sans-serif" font-size="9" font-weight="bold" fill="var(--accent-emerald)">[FK] id_cliente</text>
        <text x="190" y="84" font-family="sans-serif" font-size="9" fill="var(--text-muted)">data_pedido</text>
      </svg>
    `
  },
  {
    id: "action-salvar-json",
    title: "Como Salvar em Arquivo (.json) para Não Perder no Laboratório",
    category: "3. Gestão & Entrega",
    icon: "💾",
    summary: "Fazer backup do seu trabalho antes de desligar os computadores do SENAI.",
    steps: [
      {
        num: 1,
        instruction: "No topo do brModelo Web, clique no menu <strong>Arquivo</strong> (ou no ícone de disquete).",
        badge: "Menu Arquivo"
      },
      {
        num: 2,
        instruction: "Selecione a opção <strong>'Exportar Modelo'</strong> (ou 'Baixar Arquivo .json').",
        badge: "Exportar JSON"
      },
      {
        num: 3,
        instruction: "O navegador fará o download instantâneo de um arquivo com final <code>.json</code> na sua pasta de Downloads.",
        badge: "Download Feito"
      },
      {
        num: 4,
        instruction: "<strong>O passo mais importante:</strong> Salve este arquivo no seu <strong>Google Drive escolar</strong> ou pendrive!",
        badge: "Google Drive"
      },
      {
        num: 5,
        instruction: "Na próxima aula: para continuar seu modelo, clique em <strong>Arquivo ➔ Importar Modelo</strong> e selecione o seu <code>.json</code>.",
        badge: "Reabrir Futuramente"
      }
    ],
    commonMistake: "Apenas fechar a aba do navegador achando que está salvo na nuvem. Os computadores dos laboratórios escolares reiniciam e limpam o cache!",
    proTip: "Crie o hábito de salvar uma versão nova a cada 30 minutos: <code>loja_v1.json</code>, <code>loja_v2.json</code>.",
    svgPreview: `
      <svg viewBox="0 0 260 90" class="action-preview-svg">
        <rect x="30" y="15" width="200" height="60" rx="8" fill="var(--bg-surface-elevated)" stroke="var(--accent-emerald)" stroke-width="2" />
        <text x="130" y="42" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="var(--accent-emerald)">📦 modelo_backup.json</text>
        <text x="130" y="62" text-anchor="middle" font-family="sans-serif" font-size="11" fill="var(--text-muted)">Salvo com segurança no seu Drive</text>
      </svg>
    `
  },
  {
    id: "action-exportar-png",
    title: "Como Exportar Imagem PNG em Alta Resolução para Entrega",
    category: "3. Gestão & Entrega",
    icon: "🖼️",
    summary: "Gerar a imagem cristalina para colar no relatório, Word ou Classroom.",
    steps: [
      {
        num: 1,
        instruction: "Com o seu diagrama concluído e alinhado na tela, clique no botão <strong>'Exportar Imagem'</strong> (ícone de câmera fotográfica ou imagem).",
        badge: "Ícone Câmera"
      },
      {
        num: 2,
        instruction: "Escolha a extensão de arquivo <strong>PNG</strong>.",
        badge: "Formato PNG"
      },
      {
        num: 3,
        instruction: "Mantenha a cor de fundo como <strong>Branca</strong> (para relatórios em PDF) ou <strong>Transparente</strong>.",
        badge: "Fundo Branco"
      },
      {
        num: 4,
        instruction: "Clique em <strong>Confirmar / Download</strong>. A imagem em alta resolução estará salva na sua pasta Downloads.",
        badge: "Download Concluído"
      }
    ],
    commonMistake: "Tirar foto torta da tela do monitor com o celular para mandar para o professor. Além de ilegível, perde pontos de apresentação técnica no SENAI!",
    proTip: "Antes de clicar para exportar imagem, certifique-se de que nenhum elemento está selecionado com caixa azul de seleção para o diagrama sair 100% limpo.",
    svgPreview: `
      <svg viewBox="0 0 260 90" class="action-preview-svg">
        <rect x="30" y="15" width="200" height="60" rx="8" fill="var(--bg-surface-elevated)" stroke="var(--senai-blue)" stroke-width="2" />
        <text x="130" y="42" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="var(--senai-blue)">🖼️ diagrama_trabalho.png</text>
        <text x="130" y="62" text-anchor="middle" font-family="sans-serif" font-size="11" fill="var(--text-muted)">Alta Resolução 300 DPI para Entrega</text>
      </svg>
    `
  },
  {
    id: "action-gerar-sql",
    title: "Como Gerar Script SQL DDL (CREATE TABLE) para o MySQL",
    category: "4. Banco Físico & Código",
    icon: "🐬",
    summary: "Transformar o modelo lógico em código executável no MySQL Workbench.",
    steps: [
      {
        num: 1,
        instruction: "Abra a aba do seu <strong>Modelo Lógico</strong> gerado no brModelo Web.",
        badge: "Modelo Lógico"
      },
      {
        num: 2,
        instruction: "No menu superior, clique no botão <strong>'Gerar Esquema Físico'</strong> (ou 'Gerar Código SQL').",
        badge: "Gerar Físico"
      },
      {
        num: 3,
        instruction: "Selecione o Sistema Gerenciador alvo: marque <strong>MySQL</strong>.",
        badge: "Opção MySQL"
      },
      {
        num: 4,
        instruction: "Uma janela se abrirá com o script pronto contendo comandos <code>CREATE TABLE</code>, <code>PRIMARY KEY</code> e <code>ADD CONSTRAINT FOREIGN KEY</code>.",
        badge: "Script Gerado"
      },
      {
        num: 5,
        instruction: "Clique no botão <strong>'Copiar Código'</strong>.",
        badge: "Copiar Código"
      },
      {
        num: 6,
        instruction: "No <strong>MySQL Workbench</strong>, abra uma nova aba de Query (Ctrl+T), cole o código e adicione no topo:<br><code>CREATE DATABASE IF NOT EXISTS meu_banco;</code><br><code>USE meu_banco;</code><br>E aperte o botão do Raio ⚡ para rodar!",
        badge: "Rodar no Workbench"
      }
    ],
    commonMistake: "Tentar gerar SQL direto do Modelo Conceitual. O SQL só pode ser gerado a partir do Modelo Lógico!",
    proTip: "No MySQL Workbench, o comando <code>SHOW TABLES;</code> mostra todas as tabelas criadas com sucesso.",
    svgPreview: `
      <svg viewBox="0 0 280 100" class="action-preview-svg">
        <rect x="20" y="10" width="240" height="80" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
        <text x="35" y="32" font-family="monospace" font-size="10" fill="#f43f5e">CREATE TABLE</text>
        <text x="115" y="32" font-family="monospace" font-size="10" fill="#f8fafc">cliente (</text>
        <text x="50" y="50" font-family="monospace" font-size="10" fill="#38bdf8">id_cliente INT PRIMARY KEY,</text>
        <text x="50" y="68" font-family="monospace" font-size="10" fill="#94a3b8">nome VARCHAR(100)</text>
        <text x="35" y="84" font-family="monospace" font-size="10" fill="#f8fafc">);</text>
      </svg>
    `
  }
];
