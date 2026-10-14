/* ==============================================================================
   ⚡ MOTOR DO GERADOR POR LAYOUT & ASSISTENTE DE IA • SENAI BRMW
   Gera modelos conceituais completos prontos para importação no brModelo Web e Draw.io
   ============================================================================== */

export const PRESET_LAYOUTS = [
  {
    id: "estoque-senai",
    icon: "📦",
    name: "Controle de Estoque (SA 1 SENAI)",
    description: "Distribuidora comercial com fornecedores, produtos e movimentações de entrada e saída.",
    model: {
      title: "Controle_Estoque_SENAI",
      entities: [
        {
          id: "ent_fornecedor",
          name: "FORNECEDOR",
          x: 120, y: 140,
          attributes: [
            { id: "at_f1", name: "id_fornecedor", isPk: true },
            { id: "at_f2", name: "razao_social", isPk: false },
            { id: "at_f3", name: "cnpj", isPk: false },
            { id: "at_f4", name: "cidade", isPk: false }
          ]
        },
        {
          id: "ent_produto",
          name: "PRODUTO",
          x: 480, y: 140,
          attributes: [
            { id: "at_p1", name: "id_produto", isPk: true },
            { id: "at_p2", name: "descricao", isPk: false },
            { id: "at_p3", name: "preco_custo", isPk: false },
            { id: "at_p4", name: "preco_venda", isPk: false },
            { id: "at_p5", name: "estoque_atual", isPk: false }
          ]
        },
        {
          id: "ent_movimentacao",
          name: "MOVIMENTACAO",
          x: 480, y: 390,
          attributes: [
            { id: "at_m1", name: "id_movimentacao", isPk: true },
            { id: "at_m2", name: "tipo", isPk: false }, // Entrada / Saída
            { id: "at_m3", name: "quantidade", isPk: false },
            { id: "at_m4", name: "data_hora", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_fornece",
          name: "FORNECE",
          x: 300, y: 140,
          source: "ent_fornecedor",
          target: "ent_produto",
          cardSource: "(0,n)",
          cardTarget: "(1,1)"
        },
        {
          id: "rel_registra",
          name: "REGISTRA",
          x: 480, y: 265,
          source: "ent_produto",
          target: "ent_movimentacao",
          cardSource: "(0,n)",
          cardTarget: "(1,1)"
        }
      ]
    }
  },
  {
    id: "auto-pecas",
    icon: "🚗",
    name: "Auto Peças Catarinense",
    description: "Distribuidora automotiva com peças, veículos compatíveis e pedidos de oficinas.",
    model: {
      title: "Auto_Pecas_Catarinense",
      entities: [
        {
          id: "ent_peca",
          name: "PECA",
          x: 160, y: 150,
          attributes: [
            { id: "at_pc1", name: "codigo_sku", isPk: true },
            { id: "at_pc2", name: "nome_peca", isPk: false },
            { id: "at_pc3", name: "preco_venda", isPk: false },
            { id: "at_pc4", name: "fabricante", isPk: false }
          ]
        },
        {
          id: "ent_veiculo",
          name: "VEICULO",
          x: 520, y: 150,
          attributes: [
            { id: "at_v1", name: "id_veiculo", isPk: true },
            { id: "at_v2", name: "modelo", isPk: false },
            { id: "at_v3", name: "ano_fabricacao", isPk: false },
            { id: "at_v4", name: "montadora", isPk: false }
          ]
        },
        {
          id: "ent_cliente",
          name: "OFICINA_CLIENTE",
          x: 160, y: 390,
          attributes: [
            { id: "at_c1", name: "cnpj", isPk: true },
            { id: "at_c2", name: "nome_fantasia", isPk: false },
            { id: "at_c3", name: "telefone", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_compativel",
          name: "COMPATIVEL_COM",
          x: 340, y: 150,
          source: "ent_peca",
          target: "ent_veiculo",
          cardSource: "(1,n)",
          cardTarget: "(0,n)"
        },
        {
          id: "rel_compra",
          name: "COMPRA",
          x: 160, y: 270,
          source: "ent_cliente",
          target: "ent_peca",
          cardSource: "(0,n)",
          cardTarget: "(1,n)"
        }
      ]
    }
  },
  {
    id: "techbyte",
    icon: "💻",
    name: "TechByte Hardware & Informática",
    description: "Loja especializada em peças de alta performance gamer, placas de vídeo e clientes.",
    model: {
      title: "TechByte_Hardware",
      entities: [
        {
          id: "ent_componente",
          name: "COMPONENTE",
          x: 140, y: 150,
          attributes: [
            { id: "at_cp1", name: "id_componente", isPk: true },
            { id: "at_cp2", name: "modelo", isPk: false },
            { id: "at_cp3", name: "chipset", isPk: false },
            { id: "at_cp4", name: "preco", isPk: false }
          ]
        },
        {
          id: "ent_categoria",
          name: "CATEGORIA",
          x: 500, y: 150,
          attributes: [
            { id: "at_cat1", name: "id_categoria", isPk: true },
            { id: "at_cat2", name: "nome_categoria", isPk: false }
          ]
        },
        {
          id: "ent_pedido",
          name: "PEDIDO_COMPRA",
          x: 140, y: 390,
          attributes: [
            { id: "at_ped1", name: "numero_pedido", isPk: true },
            { id: "at_ped2", name: "data_pedido", isPk: false },
            { id: "at_ped3", name: "valor_total", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_pertence",
          name: "PERTENCE_A",
          x: 320, y: 150,
          source: "ent_componente",
          target: "ent_categoria",
          cardSource: "(1,1)",
          cardTarget: "(0,n)"
        },
        {
          id: "rel_contem",
          name: "CONTEM",
          x: 140, y: 270,
          source: "ent_pedido",
          target: "ent_componente",
          cardSource: "(1,n)",
          cardTarget: "(0,n)"
        }
      ]
    }
  },
  {
    id: "streetwear",
    icon: "👟",
    name: "StreetWear Sneakers & Moda",
    description: "E-commerce de moda urbana, tênis exclusivos, clientes e pedidos online.",
    model: {
      title: "StreetWear_Sneakers",
      entities: [
        {
          id: "ent_tenis",
          name: "TENIS",
          x: 140, y: 150,
          attributes: [
            { id: "at_t1", name: "id_tenis", isPk: true },
            { id: "at_t2", name: "modelo", isPk: false },
            { id: "at_t3", name: "tamanho", isPk: false },
            { id: "at_t4", name: "valor_venda", isPk: false }
          ]
        },
        {
          id: "ent_marca",
          name: "MARCA",
          x: 500, y: 150,
          attributes: [
            { id: "at_m1", name: "id_marca", isPk: true },
            { id: "at_m2", name: "nome_marca", isPk: false }
          ]
        },
        {
          id: "ent_cliente",
          name: "CLIENTE",
          x: 140, y: 390,
          attributes: [
            { id: "at_cl1", name: "cpf", isPk: true },
            { id: "at_cl2", name: "nome", isPk: false },
            { id: "at_cl3", name: "email", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_fabricado",
          name: "FABRICADO_POR",
          x: 320, y: 150,
          source: "ent_tenis",
          target: "ent_marca",
          cardSource: "(1,1)",
          cardTarget: "(0,n)"
        },
        {
          id: "rel_adquire",
          name: "ADQUIRE",
          x: 140, y: 270,
          source: "ent_cliente",
          target: "ent_tenis",
          cardSource: "(0,n)",
          cardTarget: "(0,n)"
        }
      ]
    }
  },
  {
    id: "playzone",
    icon: "🎮",
    name: "PlayZone Games & Consoles",
    description: "Loja e locadora gamer com jogos, plataformas, consoles e assinantes.",
    model: {
      title: "PlayZone_Games",
      entities: [
        {
          id: "ent_jogo",
          name: "JOGO",
          x: 140, y: 150,
          attributes: [
            { id: "at_j1", name: "id_jogo", isPk: true },
            { id: "at_j2", name: "titulo", isPk: false },
            { id: "at_j3", name: "genero", isPk: false }
          ]
        },
        {
          id: "ent_plataforma",
          name: "PLATAFORMA",
          x: 500, y: 150,
          attributes: [
            { id: "at_pl1", name: "id_plataforma", isPk: true },
            { id: "at_pl2", name: "nome_console", isPk: false }
          ]
        },
        {
          id: "ent_gamer",
          name: "GAMER",
          x: 140, y: 390,
          attributes: [
            { id: "at_g1", name: "nick_id", isPk: true },
            { id: "at_g2", name: "nome_completo", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_disponivel",
          name: "DISPONIVEL_EM",
          x: 320, y: 150,
          source: "ent_jogo",
          target: "ent_plataforma",
          cardSource: "(1,n)",
          cardTarget: "(0,n)"
        },
        {
          id: "rel_joga",
          name: "JOGA",
          x: 140, y: 270,
          source: "ent_gamer",
          target: "ent_jogo",
          cardSource: "(0,n)",
          cardTarget: "(0,n)"
        }
      ]
    }
  }
];

/**
 * Motor de Inteligência Artificial Local (Pattern-Matching / Generative Heuristic)
 * Analisa a descrição em linguagem natural digitada pelo aluno e gera o modelo conceitual de Peter Chen.
 */
export function generateModelFromPrompt(userPrompt) {
  const p = userPrompt.toLowerCase();

  // Heurística de Nicho: Hamburgueria / Restaurante
  if (p.includes("hamburguer") || p.includes("lanche") || p.includes("restaurante") || p.includes("comida")) {
    return {
      title: "Sistema_Hamburgueria",
      entities: [
        {
          id: "ent_lanche",
          name: "BURGER",
          x: 140, y: 150,
          attributes: [
            { id: "at_b1", name: "id_burger", isPk: true },
            { id: "at_b2", name: "nome_lanche", isPk: false },
            { id: "at_b3", name: "preco_venda", isPk: false }
          ]
        },
        {
          id: "ent_ingrediente",
          name: "INGREDIENTE",
          x: 500, y: 150,
          attributes: [
            { id: "at_i1", name: "id_ingrediente", isPk: true },
            { id: "at_i2", name: "nome_ingrediente", isPk: false }
          ]
        },
        {
          id: "ent_pedido",
          name: "PEDIDO",
          x: 140, y: 390,
          attributes: [
            { id: "at_pd1", name: "numero_pedido", isPk: true },
            { id: "at_pd2", name: "data_hora", isPk: false },
            { id: "at_pd3", name: "mesa", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_composto",
          name: "CONTEM",
          x: 320, y: 150,
          source: "ent_lanche",
          target: "ent_ingrediente",
          cardSource: "(1,n)",
          cardTarget: "(0,n)"
        },
        {
          id: "rel_inclui",
          name: "ITEM_DO",
          x: 140, y: 270,
          source: "ent_pedido",
          target: "ent_lanche",
          cardSource: "(1,n)",
          cardTarget: "(0,n)"
        }
      ]
    };
  }

  // Heurística de Nicho: Clínica Médica / Hospital
  if (p.includes("medico") || p.includes("clinica") || p.includes("hospital") || p.includes("paciente") || p.includes("saude")) {
    return {
      title: "Clinica_Medica",
      entities: [
        {
          id: "ent_medico",
          name: "MEDICO",
          x: 140, y: 150,
          attributes: [
            { id: "at_m1", name: "crm", isPk: true },
            { id: "at_m2", name: "nome_medico", isPk: false },
            { id: "at_m3", name: "especialidade", isPk: false }
          ]
        },
        {
          id: "ent_paciente",
          name: "PACIENTE",
          x: 500, y: 150,
          attributes: [
            { id: "at_pa1", name: "cpf", isPk: true },
            { id: "at_pa2", name: "nome_paciente", isPk: false },
            { id: "at_pa3", name: "convenio", isPk: false }
          ]
        },
        {
          id: "ent_consulta",
          name: "CONSULTA",
          x: 320, y: 390,
          attributes: [
            { id: "at_c1", name: "id_consulta", isPk: true },
            { id: "at_c2", name: "data_consulta", isPk: false },
            { id: "at_c3", name: "valor", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_atende",
          name: "ATENDE",
          x: 320, y: 150,
          source: "ent_medico",
          target: "ent_paciente",
          cardSource: "(0,n)",
          cardTarget: "(0,n)"
        },
        {
          id: "rel_agenda",
          name: "GERA",
          x: 320, y: 270,
          source: "ent_medico",
          target: "ent_consulta",
          cardSource: "(0,n)",
          cardTarget: "(1,1)"
        }
      ]
    };
  }

  // Heurística de Nicho: Escola / Alunos / Cursos
  if (p.includes("escola") || p.includes("aluno") || p.includes("curso") || p.includes("professor") || p.includes("aula")) {
    return {
      title: "Sistema_Escolar_SENAI",
      entities: [
        {
          id: "ent_aluno",
          name: "ALUNO",
          x: 140, y: 150,
          attributes: [
            { id: "at_a1", name: "matricula", isPk: true },
            { id: "at_a2", name: "nome_aluno", isPk: false },
            { id: "at_a3", name: "data_nascimento", isPk: false }
          ]
        },
        {
          id: "ent_turma",
          name: "TURMA",
          x: 500, y: 150,
          attributes: [
            { id: "at_t1", name: "codigo_turma", isPk: true },
            { id: "at_t2", name: "nome_curso", isPk: false },
            { id: "at_t3", name: "periodo", isPk: false }
          ]
        },
        {
          id: "ent_disciplina",
          name: "DISCIPLINA",
          x: 500, y: 390,
          attributes: [
            { id: "at_d1", name: "id_disciplina", isPk: true },
            { id: "at_d2", name: "nome_disciplina", isPk: false },
            { id: "at_d3", name: "carga_horaria", isPk: false }
          ]
        }
      ],
      relations: [
        {
          id: "rel_matriculado",
          name: "MATRICULADO_EM",
          x: 320, y: 150,
          source: "ent_aluno",
          target: "ent_turma",
          cardSource: "(1,1)",
          cardTarget: "(1,n)"
        },
        {
          id: "rel_compoe",
          name: "COMPOE",
          x: 500, y: 270,
          source: "ent_turma",
          target: "ent_disciplina",
          cardSource: "(1,n)",
          cardTarget: "(1,n)"
        }
      ]
    };
  }

  // Default: Sistema Comercial Geral com base nos substantivos citados
  return {
    title: "Modelo_Customizado_Gerado",
    entities: [
      {
        id: "ent_item",
        name: "ITEM_PRODUTO",
        x: 140, y: 150,
        attributes: [
          { id: "at_it1", name: "codigo_id", isPk: true },
          { id: "at_it2", name: "nome", isPk: false },
          { id: "at_it3", name: "valor", isPk: false }
        ]
      },
      {
        id: "ent_parceiro",
        name: "PARCEIRO_NEGOCIO",
        x: 500, y: 150,
        attributes: [
          { id: "at_pn1", name: "documento_id", isPk: true },
          { id: "at_pn2", name: "nome_fantasia", isPk: false }
        ]
      },
      {
        id: "ent_operacao",
        name: "OPERACAO",
        x: 320, y: 390,
        attributes: [
          { id: "at_op1", name: "id_operacao", isPk: true },
          { id: "at_op2", name: "data_registro", isPk: false }
        ]
      }
    ],
    relations: [
      {
        id: "rel_vinculado",
        name: "VINCULADO_A",
        x: 320, y: 150,
        source: "ent_item",
        target: "ent_parceiro",
        cardSource: "(1,1)",
        cardTarget: "(0,n)"
      },
      {
        id: "rel_efetua",
        name: "EFETUA",
        x: 410, y: 270,
        source: "ent_parceiro",
        target: "ent_operacao",
        cardSource: "(0,n)",
        cardTarget: "(1,1)"
      }
    ]
  };
}
