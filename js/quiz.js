/* ==============================================================================
   🧠 QUIZ FORMATIVO INTERATIVO • SENAI BRMW
   10 Questões de fixação com feedback imediato e explicação pedagógica
   ============================================================================== */

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Qual forma geométrica representa uma ENTIDADE na notação clássica de Peter Chen (1976)?",
    options: [
      { text: "Losango central", correct: false },
      { text: "Retângulo com o nome no singular", correct: true },
      { text: "Elipse com traço duplo", correct: false },
      { text: "Cilindro com três linhas", correct: false }
    ],
    explanation: "Na notação de Peter Chen, Entidades (substantivos do mundo real) são sempre representadas por RETÂNGULOS e escritas no singular e em maiúsculas."
  },
  {
    id: 2,
    question: "O que representa a 'Bolinha Preta ⚫' no diagrama de Modelo Entidade-Relacionamento?",
    options: [
      { text: "Um atributo que pode ser nulo ou vazio", correct: false },
      { text: "Um campo que aceita múltiplos valores simultâneos", correct: false },
      { text: "O Identificador Único (Chave Primária Conceitual) que nunca se repete", correct: true },
      { text: "Um relacionamento que foi excluído do sistema", correct: false }
    ],
    explanation: "A bolinha preenchida de preto ⚫ indica o Identificador Único da entidade (ex: CPF, CNPJ, Código SKU), que identifica exclusivamente cada registro sem duplicidade."
  },
  {
    id: 3,
    question: "Por que NUNCA devemos utilizar o atributo 'nome_cliente' como identificador único de clientes?",
    options: [
      { text: "Porque nomes em português ocupam muitos bytes no disco rígido", correct: false },
      { text: "Porque existem homônimos (pessoas distintas com o mesmo nome), misturando compras e dívidas", correct: true },
      { text: "Porque o MySQL proíbe o uso de textos como chave primária", correct: false },
      { text: "Porque nomes de pessoas devem ficar apenas em arquivos do Excel", correct: false }
    ],
    explanation: "Pessoas podem ter exatamente o mesmo nome (homônimos). Se o nome fosse o ID, o sistema trataria dois clientes chamados 'Lucas Silva' como se fossem a mesma pessoa!"
  },
  {
    id: 4,
    question: "Em um relacionamento 1:N entre FORNECEDOR (1) e PRODUTO (N), para onde migra a Chave Estrangeira (FK)?",
    options: [
      { text: "A PK do Fornecedor migra para a tabela PRODUTO (lado N)", correct: true },
      { text: "A PK do Produto migra para a tabela FORNECEDOR (lado 1)", correct: false },
      { text: "Nenhuma chave migra; cria-se sempre uma tabela associativa intermediária", correct: false },
      { text: "As duas tabelas são fundidas em um único arquivo de texto", correct: false }
    ],
    explanation: "A Regra de Ouro do 1:N diz: a Chave Primária do lado '1' SEMPRE migra para o lado 'N' como Chave Estrangeira (FK). Logo, id_fornecedor entra na tabela PRODUTO."
  },
  {
    id: 5,
    question: "Quando um relacionamento é Muitos-para-Muitos (N:N), o que acontece na conversão para o Modelo Lógico?",
    options: [
      { text: "O relacionamento é descartado por ser considerado um erro de projeto", correct: false },
      { text: "Nasce uma nova tabela associativa intermediária contendo as PKs das duas entidades", correct: true },
      { text: "O banco de dados trava e exige reiniciar o MySQL Workbench", correct: false },
      { text: "Cria-se uma coluna com array de números dentro da primeira tabela", correct: false }
    ],
    explanation: "Relacionamentos N:N não podem ser ligados diretamente no modelo relacional. Eles dão origem a uma nova tabela associativa que herda as chaves das duas pontas."
  },
  {
    id: 6,
    question: "O que a cardinalidade '(0,n)' indica na ponta de uma entidade em relação a outra?",
    options: [
      { text: "A participação é obrigatória e pode ocorrer apenas uma vez", correct: false },
      { text: "A participação é opcional (mínimo 0) e pode ocorrer múltiplas vezes (máximo n)", correct: true },
      { text: "A entidade não pode se conectar com nenhum registro do sistema", correct: false },
      { text: "O registro é excluído automaticamente após zero segundos", correct: false }
    ],
    explanation: "(0,n) significa que o elemento não é obrigado a se relacionar de imediato (mínimo 0) e pode se conectar a vários elementos ao longo do tempo (máximo n)."
  },
  {
    id: 7,
    question: "Qual das seguintes opções apresenta a nomenclatura CORRETA para uma entidade de produtos?",
    options: [
      { text: "Tabela_De_Produtos", correct: false },
      { text: "produtos_cadastrados", correct: false },
      { text: "PRODUTO", correct: true },
      { text: "Cadastrar_Item", correct: false }
    ],
    explanation: "No modelo conceitual, entidades são substantivos no SINGULAR e com letras MAIÚSCULAS: PRODUTO."
  },
  {
    id: 8,
    question: "Qual software de diagramação vetorial moderno foi adotado para substituir o clássico brModelo local?",
    options: [
      { text: "Draw.io (diagrams.net)", correct: true },
      { text: "Microsoft Paint", correct: false },
      { text: "Bloco de Notas do Windows", correct: false },
      { text: "Corel Draw 10", correct: false }
    ],
    explanation: "O Draw.io roda direto no navegador e no VS Code, suporta os símbolos de Peter Chen e exporta em arquivos vetoriais limpos em SVG e PNG."
  },
  {
    id: 9,
    question: "Qual o papel do comando 'USE estoque_db;' executado no MySQL Workbench?",
    options: [
      { text: "Excluir permanentemente o banco de dados do disco", correct: false },
      { text: "Ativar o schema específico para que os próximos comandos sejam executados dentro dele", correct: true },
      { text: "Fazer o download de dados da internet", correct: false },
      { text: "Trocar a senha de administrador do servidor", correct: false }
    ],
    explanation: "O comando USE define qual banco de dados está ativo na sessão atual, colocando seu nome em negrito na árvore de Schemas do Workbench."
  },
  {
    id: 10,
    question: "Por que o motor InnoDB do MySQL é mandatório para sistemas de controle de estoque comercial?",
    options: [
      { text: "Porque ele é o único que permite colocar imagens coloridas em tabelas", correct: false },
      { text: "Porque garante propriedades ACID completas e bloqueio a nível de linha contra saldo negativo", correct: true },
      { text: "Porque não exige o uso de senhas de acesso", correct: false },
      { text: "Porque funciona apenas sem conexão com a internet", correct: false }
    ],
    explanation: "O InnoDB suporta transações atômicas seguras (ACID) e Row-Level Locking, garantindo que compras simultâneas não gerem saldo físico negativo no armazém."
  }
];
