/* ==============================================================================
   🎮 SIMULADOR DE CARDINALIDADES & AUDITOR DE MER • SENAI BRMW
   Implementa a técnica das "2 Perguntas Mágicas" e validação de regras de Peter Chen
   ============================================================================== */

export const SIMULATOR_SCENARIOS = [
  {
    id: "cliente_pedido",
    entA: "CLIENTE",
    entB: "PEDIDO",
    verb: "REALIZA",
    desc: "Um e-commerce registrando compras de clientes cadastrados.",
    // Ida: CLIENTE -> PEDIDO
    ida: {
      qMin: "Um cliente que acabou de se cadastrar no site é OBRIGADO a já ter feito um pedido?",
      optMin: [
        { val: "0", label: "Não! Ele pode apenas navegar sem comprar nada ainda (Mínimo = 0).", correct: true },
        { val: "1", label: "Sim! Se não comprar no segundo do cadastro, a conta é excluída (Mínimo = 1).", correct: false }
      ],
      qMax: "Ao longo do tempo, quantos pedidos no máximo esse cliente pode fazer?",
      optMax: [
        { val: "1", label: "Apenas 1 único pedido na vida inteira (Máximo = 1).", correct: false },
        { val: "n", label: "Quantos pedidos ele quiser comprar! 1, 5, 50... (Máximo = n).", correct: true }
      ],
      result: "(0,n)",
      justification: "Como ele não é obrigado a comprar logo de cara (0) e pode comprar várias vezes (n), a ponta é (0,n)!"
    },
    // Volta: PEDIDO -> CLIENTE
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
    id: "fornecedor_produto",
    entA: "FORNECEDOR",
    entB: "PRODUTO",
    verb: "FORNECE",
    desc: "Distribuidora comercial adquirindo itens para abastecer o armazém.",
    ida: {
      qMin: "Um fornecedor recém-homologado já precisa ter peças entregues no primeiro instante?",
      optMin: [
        { val: "0", label: "Não! O cadastro pode ser feito antes do primeiro pedido de compra (Mínimo = 0).", correct: true },
        { val: "1", label: "Sim, é proibido cadastrar fornecedor sem mercadoria no armazém (Mínimo = 1).", correct: false }
      ],
      qMax: "Quantos tipos diferentes de produtos esse fornecedor pode vender para a distribuidora?",
      optMax: [
        { val: "1", label: "Apenas um produto exclusivo (Máximo = 1).", correct: false },
        { val: "n", label: "Centenas de produtos diferentes do seu catálogo (Máximo = n).", correct: true }
      ],
      result: "(0,n)",
      justification: "O fornecedor pode existir antes da primeira compra (0) e fornecer múltiplos itens (n): ponta (0,n)!"
    },
    volta: {
      qMin: "Um produto cadastrado pode vir de um fabricante homologado?",
      optMin: [
        { val: "0", label: "Pode ser produto de fabricação própria sem fornecedor (Mínimo = 0).", correct: false },
        { val: "1", label: "Obrigatoriamente precisa ter a origem de um fornecedor cadastrado (Mínimo = 1).", correct: true }
      ],
      qMax: "Na regra simples da nossa loja, cada peça é comprada de quantos fornecedores principais?",
      optMax: [
        { val: "1", label: "De 1 fornecedor homologado que emite a nota fiscal do item (Máximo = 1).", correct: true },
        { val: "n", label: "De múltiplos fornecedores concorrentes (Máximo = n).", correct: false }
      ],
      result: "(1,1)",
      justification: "Cada produto no estoque está vinculado a 1 fornecedor de origem: ponta (1,1)!"
    }
  }
];

/**
 * Validador e Auditor Pedagógico de Modelos Conceituais (Audita erros comuns de alunos)
 */
export function auditModel(model) {
  const issues = [];

  model.entities.forEach(ent => {
    // 1. Checa se o nome está no plural
    if (ent.name.endsWith("S") && !ent.name.endsWith("SS") && !ent.name.endsWith("STATUS")) {
      issues.push({
        type: "warning",
        title: `Nome no Plural: "${ent.name}"`,
        message: `Por convenção de Peter Chen, nomes de entidades devem ficar SEMPRE no SINGULAR (ex: mude para "${ent.name.slice(0, -1)}").`
      });
    }

    // 2. Checa se o nome tem termos de banco físico
    if (ent.name.toLowerCase().includes("tabela") || ent.name.toLowerCase().includes("tbl_")) {
      issues.push({
        type: "error",
        title: `Termo Físico no Modelo Conceitual: "${ent.name}"`,
        message: `No Modelo Conceitual não existem "tabelas", apenas Entidades do mundo real! Remova o prefixo "Tabela_".`
      });
    }

    // 3. Checa se possui Identificador Único (Chave Primária ⚫)
    const hasPk = ent.attributes && ent.attributes.some(a => a.isPk);
    if (!hasPk) {
      issues.push({
        type: "error",
        title: `Ausência de Identificador Único em "${ent.name}"`,
        message: `Toda entidade precisa OBRIGATORIAMENTE de ao menos um atributo com a bolinha preta ⚫ (Identificador Único) para evitar o caos de homônimos.`
      });
    }
  });

  return issues;
}
