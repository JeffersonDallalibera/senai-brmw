/* ==============================================================================
   🎮 SIMULADOR DE CARDINALIDADES • SENAI BRMW
   Implementa a técnica das "2 Perguntas Mágicas" da regra de negócio
   ============================================================================== */

export const SIMULATOR_SCENARIOS = [
  {
    id: "cliente_pedido",
    title: "E-Commerce: Cliente vs Pedido",
    entA: "CLIENTE",
    entB: "PEDIDO",
    verb: "REALIZA",
    desc: "Plataforma de compras online registrando pedidos de clientes cadastrados.",
    ida: {
      qMin: "Um cliente que acabou de se cadastrar no site é OBRIGADO a já ter feito um pedido no primeiro segundo?",
      optMin: [
        { val: "0", label: "Não! Ele pode apenas navegar sem comprar nada ainda (Mínimo = 0).", correct: true },
        { val: "1", label: "Sim! Se não comprar no ato do cadastro, a conta é excluída (Mínimo = 1).", correct: false }
      ],
      qMax: "Ao longo do tempo, quantos pedidos no máximo esse mesmo cliente pode realizar no site?",
      optMax: [
        { val: "1", label: "Apenas 1 único pedido na vida inteira (Máximo = 1).", correct: false },
        { val: "n", label: "Quantos pedidos ele quiser comprar! 1, 5, 50... (Máximo = n).", correct: true }
      ],
      result: "(0,n)",
      justification: "Como ele não é obrigado a comprar logo de cara (0) e pode comprar várias vezes (n), a ponta é (0,n)!"
    },
    volta: {
      qMin: "Um pedido pode existir voando no sistema sem pertencer a nenhum cliente cadastrado?",
      optMin: [
        { val: "0", label: "Sim, pode ser um pedido fantasma sem dono (Mínimo = 0).", correct: false },
        { val: "1", label: "Não! Todo pedido precisa obrigatoriamente ter um cliente associado (Mínimo = 1).", correct: true }
      ],
      qMax: "Uma nota ou pedido específico pode pertencer simultaneamente a quantos clientes diferentes?",
      optMax: [
        { val: "1", label: "Apenas 1 único cliente titular daquela compra (Máximo = 1).", correct: true },
        { val: "n", label: "A vários clientes dividindo a mesma conta fiscal (Máximo = n).", correct: false }
      ],
      result: "(1,1)",
      justification: "Todo pedido exige um cliente (1) e pertence exclusivamente a esse cliente (1), logo a ponta é (1,1)!"
    }
  },
  {
    id: "aluno_turma",
    title: "Escola SENAI: Aluno vs Turma",
    entA: "ALUNO",
    entB: "TURMA",
    verb: "PERTENCE",
    desc: "Gestão acadêmica do SESI SENAI vinculando estudantes às suas respectivas turmas.",
    ida: {
      qMin: "Um aluno matriculado na escola pode existir sem estar vinculado a nenhuma turma?",
      optMin: [
        { val: "0", label: "Sim, aluno pode ficar flutuando sem turma nem sala (Mínimo = 0).", correct: false },
        { val: "1", label: "Não! Todo aluno do SENAI é matriculado em ao menos 1 turma (Mínimo = 1).", correct: true }
      ],
      qMax: "Neste curso técnico específico, em quantas turmas simultâneas o aluno pode estar alocado?",
      optMax: [
        { val: "1", label: "Apenas na sua turma específica de turma (Máximo = 1).", correct: true },
        { val: "n", label: "Em 10 turmas diferentes ao mesmo tempo (Máximo = n).", correct: false }
      ],
      result: "(1,1)",
      justification: "O aluno obrigatoriamente tem turma (1) e estuda em 1 turma por vez (1): ponta (1,1)!"
    },
    volta: {
      qMin: "Uma turma recém-aberta no sistema já precisa ter alunos cadastrados no primeiro minuto?",
      optMin: [
        { val: "0", label: "Não! A turma pode ser aberta pela coordenação antes das matrículas (Mínimo = 0).", correct: true },
        { val: "1", label: "Sim! Se não houver alunos, a turma não pode nem ter código no sistema (Mínimo = 1).", correct: false }
      ],
      qMax: "Ao longo do semestre, quantos alunos no máximo uma turma do SENAI pode ter?",
      optMax: [
        { val: "1", label: "Apenas 1 único aluno em aula particular (Máximo = 1).", correct: false },
        { val: "n", label: "Vários estudantes (30 a 40 alunos por laboratório) (Máximo = n).", correct: true }
      ],
      result: "(0,n)",
      justification: "A turma pode abrir antes do início das matrículas (0) e abrigar muitos alunos (n): ponta (0,n)!"
    }
  },
  {
    id: "fornecedor_produto",
    title: "Distribuidora: Fornecedor vs Produto",
    entA: "FORNECEDOR",
    entB: "PRODUTO",
    verb: "FORNECE",
    desc: "Distribuidora comercial de autopeças adquirindo mercadorias para o almoxarifado.",
    ida: {
      qMin: "Um fornecedor recém-cadastrado já precisa ter entregue produtos no estoque?",
      optMin: [
        { val: "0", label: "Não! O cadastro dele pode ser homologado antes da primeira compra (Mínimo = 0).", correct: true },
        { val: "1", label: "Sim, é proibido cadastrar fornecedor sem mercadorias no pátio (Mínimo = 1).", correct: false }
      ],
      qMax: "Quantos tipos de produtos diferentes esse fornecedor pode nos fornecer ao longo da parceria?",
      optMax: [
        { val: "1", label: "Apenas um produto exclusivo (Máximo = 1).", correct: false },
        { val: "n", label: "Centenas de produtos diferentes do seu catálogo (Máximo = n).", correct: true }
      ],
      result: "(0,n)",
      justification: "O fornecedor pode existir antes de fornecer (0) e fornecer muitos itens (n): ponta (0,n)!"
    },
    volta: {
      qMin: "Um produto no catálogo da loja precisa obrigatoriamente ter uma origem de fornecedor?",
      optMin: [
        { val: "0", label: "Não, produtos podem surgir do nada sem fabricante (Mínimo = 0).", correct: false },
        { val: "1", label: "Sim! Toda peça comprada é faturada por 1 fornecedor parceiro (Mínimo = 1).", correct: true }
      ],
      qMax: "Na regra simples da nossa loja, cada código de produto é comprado de quantos fornecedores homologados?",
      optMax: [
        { val: "1", label: "De 1 fornecedor principal responsável pelo item (Máximo = 1).", correct: true },
        { val: "n", label: "De múltiplos concorrentes misturados (Máximo = n).", correct: false }
      ],
      result: "(1,1)",
      justification: "Cada peça de estoque tem 1 fornecedor obrigatório: ponta (1,1)!"
    }
  },
  {
    id: "medico_consulta",
    title: "Hospital: Médico vs Consulta",
    entA: "MEDICO",
    entB: "CONSULTA",
    verb: "ATENDE",
    desc: "Sistema hospitalar agendando e realizando atendimentos médicos.",
    ida: {
      qMin: "Um médico recém-contratado pelo hospital é obrigado a já ter realizado uma consulta?",
      optMin: [
        { val: "0", label: "Não! Ele pode estar no primeiro dia de trabalho ou em plantão sem atendimentos (Mínimo = 0).", correct: true },
        { val: "1", label: "Sim! Não se contrata médico sem consulta já feita no passado (Mínimo = 1).", correct: false }
      ],
      qMax: "Quantas consultas no máximo esse médico pode atender ao longo de sua carreira no hospital?",
      optMax: [
        { val: "1", label: "Apenas 1 consulta única (Máximo = 1).", correct: false },
        { val: "n", label: "Milhares de consultas ao longo dos anos (Máximo = n).", correct: true }
      ],
      result: "(0,n)",
      justification: "Médico recém-admitido começa com 0 consultas e atenderá muitas (n): ponta (0,n)!"
    },
    volta: {
      qMin: "Uma consulta médica pode acontecer no prontuário sem nenhum médico responsável?",
      optMin: [
        { val: "0", label: "Sim, consulta fantasma (Mínimo = 0).", correct: false },
        { val: "1", label: "Não! Toda consulta exige a assinatura de 1 médico responsável (Mínimo = 1).", correct: true }
      ],
      qMax: "No momento da realização daquela consulta específica, quantos médicos titulares assinam o atendimento?",
      optMax: [
        { val: "1", label: "Apenas 1 médico titular responsável (Máximo = 1).", correct: true },
        { val: "n", label: "Uma equipe inteira de 10 médicos como titulares da mesma ficha (Máximo = n).", correct: false }
      ],
      result: "(1,1)",
      justification: "Toda consulta tem 1 e apenas 1 médico responsável: ponta (1,1)!"
    }
  },
  {
    id: "artista_album",
    title: "Streaming de Música: Artista vs Álbum",
    entA: "ARTISTA",
    entB: "ALBUM",
    verb: "LANÇA",
    desc: "Plataforma estilo Spotify gerenciando discografias e faixas musicais.",
    ida: {
      qMin: "Um músico com perfil criado no app precisa já ter lançado um álbum completo no catálogo?",
      optMin: [
        { val: "0", label: "Não! Pode ter lançado apenas singles ou estar preparando o primeiro álbum (Mínimo = 0).", correct: true },
        { val: "1", label: "Sim! Sem álbum completo ele não pode ter conta no Spotify (Mínimo = 1).", correct: false }
      ],
      qMax: "Quantos álbuns esse artista pode publicar ao longo de sua carreira?",
      optMax: [
        { val: "1", label: "Apenas 1 álbum na vida inteira (Máximo = 1).", correct: false },
        { val: "n", label: "Vários álbuns em sua discografia (Máximo = n).", correct: true }
      ],
      result: "(0,n)",
      justification: "Pode começar sem álbuns (0) e lançar múltiplos trabalhos (n): ponta (0,n)!"
    },
    volta: {
      qMin: "Um álbum musical pode ser publicado na plataforma sem nenhum artista vinculado?",
      optMin: [
        { val: "0", label: "Sim, álbum sem autoria conhecida (Mínimo = 0).", correct: false },
        { val: "1", label: "Não! Todo álbum precisa do registro de autoria do artista/banda (Mínimo = 1).", correct: true }
      ],
      qMax: "Considerando álbuns autorais individuais, a quantos artistas titulares pertence aquele álbum?",
      optMax: [
        { val: "1", label: "A 1 artista ou banda principal que detém os direitos autorais (Máximo = 1).", correct: true },
        { val: "n", label: "A múltiplos artistas concorrentes simultaneamente (Máximo = n).", correct: false }
      ],
      result: "(1,1)",
      justification: "Cada álbum tem 1 titular e autor principal obrigatório: ponta (1,1)!"
    }
  }
];
