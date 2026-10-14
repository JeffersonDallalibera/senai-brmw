/* ==============================================================================
   🆘 GUIA SOS & SOLUÇÃO DE PROBLEMAS • brModelo Web
   Os 8 erros mais frequentes de alunos do SENAI e como resolver na hora
   ============================================================================== */

export const SOS_ITEMS = [
  {
    id: "sos-perdi-modelo",
    title: "1. 'Fechei a janela e perdi meu modelo no laboratório!'",
    urgency: "alta",
    icon: "🚨",
    symptom: "Você fechou o Chrome ou o computador reiniciou e a tela do brModelo Web abriu vazia.",
    cause: "Os computadores de laboratório escolar possuem proteção de reinicialização (Deep Freeze) que limpa o histórico e o cache do navegador.",
    fix: [
      "Se você exportou o arquivo <code>.json</code> para o Google Drive: basta clicar em <strong>Arquivo ➔ Importar Modelo</strong> no brModelo Web e selecionar o arquivo para continuar exatamente de onde parou!",
      "Se você fez login com a sua conta Google no brModelo Web: clique no botão de perfil no topo direito e abra seus modelos salvos na nuvem.",
      "<strong>Regra de Ouro Preventiva:</strong> Ao final de toda aula no SENAI, exporte o arquivo <code>.json</code> e salve no Google Drive antes de sair do laboratório."
    ]
  },
  {
    id: "sos-sem-fk",
    title: "2. 'O brModelo Web não gerou a Chave Estrangeira [FK] na conversão!'",
    urgency: "alta",
    icon: "🔑",
    symptom: "Ao converter para o Modelo Lógico, uma tabela ficou sem a chave estrangeira esperada ou com campos vazios.",
    cause: "A entidade forte de origem (do lado 1) estava sem o identificador único marcado com a bolinha preta ⚫.",
    fix: [
      "Volte para a aba do seu <strong>Modelo Conceitual</strong>.",
      "Clique no círculo do atributo identificador da entidade mãe (ex: <code>id_cliente</code>).",
      "No <strong>Painel de Propriedades (à direita)</strong>, marque a caixa de seleção <strong>'Identificador'</strong>.",
      "Confirme visualmente que o círculo virou uma <strong>bolinha preta sólida ⚫</strong>.",
      "Clique novamente no botão <strong>'Converter para Lógico'</strong>. A Chave Estrangeira [FK] aparecerá perfeita na tabela de destino!"
    ]
  },
  {
    id: "sos-mudar-cardinalidade",
    title: "3. 'Como mudo o texto da cardinalidade de (0,n) para (1,1)?'",
    urgency: "media",
    icon: "✏️",
    symptom: "Ao clicar na linha, ela fica selecionada, mas o aluno não consegue digitar o número da cardinalidade.",
    cause: "O clique foi dado no corpo da linha ou no retângulo, e não exatamente sobre o texto da notação.",
    fix: [
      "Dê um <strong>duplo clique bem em cima das letras</strong> da cardinalidade na ponta da linha (ex: bem em cima do texto <code>(0,n)</code>).",
      "Uma caixinha de edição se abrirá no próprio Canvas para você escolher a opção.",
      "Alternativa: clique na linha com um clique simples e olhe para o <strong>Painel de Propriedades na lateral direita</strong>. Altere os campos <em>Cardinalidade Mínima</em> e <em>Cardinalidade Máxima</em>."
    ]
  },
  {
    id: "sos-retangulo-direto",
    title: "4. 'Liguei dois retângulos direto e as linhas ficaram bugadas!'",
    urgency: "alta",
    icon: "🚫",
    symptom: "Uma linha reta conecta dois retângulos de entidades e o brModelo não deixa configurar o relacionamento nem colocar verbos.",
    cause: "Na notação conceitual de Peter Chen, é proibido ligar retângulos diretamente sem um losango intermediário.",
    fix: [
      "Clique na linha direta entre os dois retângulos e pressione a tecla <strong>Delete</strong> no teclado.",
      "Clique na ferramenta <strong>Relacionamento (Losango)</strong> na barra esquerda e coloque no meio das duas entidades.",
      "Dê duplo clique no losango e digite o verbo em maiúsculas (ex: <code>REALIZA</code>, <code>POSSUI</code>, <code>FORNECE</code>).",
      "Conecte com a ferramenta de linha: <strong>Entidade A ➔ Losango</strong> e depois <strong>Losango ➔ Entidade B</strong>."
    ]
  },
  {
    id: "sos-entidade-associativa",
    title: "5. 'Como colocar atributos em um relacionamento N:N?'",
    urgency: "media",
    icon: "📦",
    symptom: "Em uma venda de produtos, onde guardar a quantidade comprada e o desconto, se eles não pertencem nem ao Produto nem ao Pedido sozinhos?",
    cause: "Relacionamentos N:N com atributos próprios necessitam de uma Entidade Associativa.",
    fix: [
      "No brModelo Web, selecione a ferramenta de <strong>Atributo (Círculo)</strong> e puxe uma linha conectando-a <strong>diretamente no Losango</strong> do relacionamento N:N (ex: ligue <code>quantidade</code> e <code>preco_unitario</code> no losango <code>CONTÉM</code>).",
      "Ao clicar em <strong>Converter para Lógico</strong>, o brModelo criará automaticamente a tabela associativa intermediária (ex: <code>ITEM_PEDIDO</code>) contendo as duas FKs e os atributos da venda!"
    ]
  },
  {
    id: "sos-imagem-cortada",
    title: "6. 'A imagem PNG exportada saiu minúscula ou com partes cortadas!'",
    urgency: "baixa",
    icon: "🖼️",
    symptom: "O arquivo PNG exportado veio com uma barra branca gigante ou com letras cortadas.",
    cause: "Os elementos do modelo estavam espalhados por áreas distantes do Canvas infinito.",
    fix: [
      "Pressione <code>Ctrl + A</code> no teclado para selecionar todos os elementos do seu modelo.",
      "Arraste todo o bloco em conjunto para mais perto do canto superior esquerdo da tela quadriculada.",
      "Clique no botão de <strong>Centralizar / 100% de Zoom</strong>.",
      "Clique em <strong>Exportar Imagem ➔ Formato PNG ➔ Fundo Branco</strong>. O resultado será um arquivo nítido e perfeito para colar no seu relatório."
    ]
  },
  {
    id: "sos-erro-mysql",
    title: "7. 'Deu erro de sintaxe ao rodar o script no MySQL Workbench!'",
    urgency: "alta",
    icon: "🐬",
    symptom: "Ao colar o script e clicar no raio ⚡, o MySQL Workbench acusa erro com cruz vermelha: <em>'No database selected'</em>.",
    cause: "O MySQL não sabe dentro de qual banco de dados deve criar as tabelas.",
    fix: [
      "No topo da sua aba de Query no MySQL Workbench, adicione estas duas linhas antes de qualquer CREATE TABLE:",
      "<pre><code>CREATE DATABASE IF NOT EXISTS escola_db;\nUSE escola_db;</code></pre>",
      "Selecione todo o texto (Ctrl+A) e execute com <strong>Ctrl + Shift + Enter</strong>.",
      "Abra o painel esquerdo 'Schemas' e clique no botão de atualizar 🔄 para ver todas as tabelas criadas no banco!"
    ]
  },
  {
    id: "sos-tela-travada",
    title: "8. 'A página do brModelo Web travou ou os botões não respondem!'",
    urgency: "media",
    icon: "🔄",
    symptom: "Você clica nas ferramentas mas nada acontece ou o cursor do mouse fica com o ícone de bloqueio.",
    cause: "Cache temporário corrompido ou uma janela modal invisível aberta em segundo plano.",
    fix: [
      "Pressione a tecla <strong>ESC</strong> duas vezes para fechar qualquer diálogo oculto.",
      "Pressione <strong>Ctrl + Shift + R</strong> (ou Ctrl + F5) para forçar o recarregamento do navegador limpando o cache temporário.",
      "Se persistir, abra o brModelo Web em uma <strong>Janela Anônima (Ctrl + Shift + N)</strong>."
    ]
  }
];
