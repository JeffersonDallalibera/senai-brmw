/* ==============================================================================
   ✅ CHECKLIST INTERATIVO DE PRÉ-ENTREGA • SENAI BRMW
   Auditor de conformidade antes de enviar a tarefa para o professor
   ============================================================================== */

export const CHECKLIST_ITEMS = [
  {
    id: "check_singular",
    category: "Conceitual",
    title: "Entidades no SINGULAR",
    desc: "Todas as entidades estão escritas no singular (ex: PRODUTO, CLIENTE, e nunca 'Produtos' ou 'Clientes').",
    tip: "Peter Chen definiu que a entidade representa o molde/classe de um único registro por vez."
  },
  {
    id: "check_uppercase",
    category: "Conceitual",
    title: "Entidades em MAIÚSCULAS",
    desc: "O nome de todas as entidades está todo em caixa alta (ex: FORNECEDOR, PEDIDO, DEPARTAMENTO).",
    tip: "Ajuda a diferenciar visualmente entidades de atributos."
  },
  {
    id: "check_pk",
    category: "Conceitual",
    title: "Identificador Único (Bolinha Preta ⚫) em TODAS as Entidades",
    desc: "Toda e qualquer entidade possui ao menos um atributo com a bolinha preenchida de preto ⚫.",
    tip: "Sem bolinha preta, o brModelo Web não saberá quem é a Chave Primária [PK] no modelo lógico!"
  },
  {
    id: "check_no_direct",
    category: "Conceitual",
    title: "Nenhum retângulo ligado direto em outro retângulo",
    desc: "Todas as conexões entre duas entidades passam obrigatoriamente por um Losango de relacionamento no meio.",
    tip: "Linha reta entre retângulos é um erro gravíssimo de sintaxe conceitual."
  },
  {
    id: "check_verbs",
    category: "Conceitual",
    title: "Verbos de Ação dentro dos Losangos",
    desc: "Os losangos contêm verbos em maiúsculas (ex: COMPRA, POSSUI, FORNECE, LOTADO_EM) e não substantivos soltos.",
    tip: "Evite verbos fracos como 'TEM' ou 'FAZ'; use o vocabulário da empresa."
  },
  {
    id: "check_cardinalities",
    category: "Conceitual",
    title: "Cardinalidades preenchidas em AMBAS as pontas",
    desc: "Tanto o lado A quanto o lado B possuem suas notações (0,1), (1,1), (0,n) ou (1,n) revisadas com as 2 perguntas mágicas.",
    tip: "Nunca deixe cardinalidade com valor padrão esquecido."
  },
  {
    id: "check_snake_case",
    category: "Conceitual",
    title: "Atributos sem espaços e sem acentos",
    desc: "Nomes de campos em minúsculas e separados por underline (ex: data_nascimento, preco_venda, id_cliente).",
    tip: "Espaços e caracteres especiais geram erros ao criar tabelas no MySQL."
  },
  {
    id: "check_logical",
    category: "Lógico",
    title: "Conversão para Modelo Lógico realizada",
    desc: "Você clicou no botão 'Converter para Lógico' no brModelo Web e visualizou as tabelas geradas.",
    tip: "A entrega técnica completa do SENAI exige tanto o modelo conceitual quanto o lógico."
  },
  {
    id: "check_fk",
    category: "Lógico",
    title: "Chaves Estrangeiras [FK] conferidas",
    desc: "Nas relações 1:N, o ID do lado 1 migrou corretamente para a tabela do lado N com a sigla [FK].",
    tip: "Se a FK não apareceu, confira se você marcou a bolinha preta na entidade de origem."
  },
  {
    id: "check_exports",
    category: "Entrega",
    title: "Backup JSON e Imagem PNG salvos no seu Drive",
    desc: "Você exportou o arquivo .json (para poder reabrir depois) e a imagem .png (para anexar na entrega).",
    tip: "Nunca confie apenas na memória do computador do laboratório escolar!"
  }
];

const STORAGE_KEY = "senai_brmw_checklist_v1";

export function loadChecklistState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveChecklistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Erro ao salvar checklist no storage:", e);
  }
}

export function calculateProgress(state) {
  const total = CHECKLIST_ITEMS.length;
  let checkedCount = 0;
  CHECKLIST_ITEMS.forEach(item => {
    if (state[item.id]) checkedCount++;
  });
  const percent = Math.round((checkedCount / total) * 100);
  return { checkedCount, total, percent };
}
