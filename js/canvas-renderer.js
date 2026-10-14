/* ==============================================================================
   🖼️ RENDERIZADOR SVG DO CANVAS INTERATIVO • SENAI BRMW
   Renderiza tanto o Modelo Conceitual (Peter Chen) quanto o Modelo Lógico (Ted Codd)
   ============================================================================== */

export class CanvasRenderer {
  constructor(svgElement, onSelectElement) {
    this.svg = svgElement;
    this.onSelectElement = onSelectElement;
    this.mode = "conceptual"; // "conceptual" | "logical"
    this.currentModel = null;
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.startPan = { x: 0, y: 0 };

    this.draggedNode = null;
    this.dragOffset = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    this.svg.addEventListener("mousedown", (e) => this.onMouseDown(e));
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("mouseup", () => this.onMouseUp());
    this.svg.addEventListener("wheel", (e) => this.onWheel(e));
  }

  setModel(model) {
    this.currentModel = JSON.parse(JSON.stringify(model)); // Deep clone
    this.render();
  }

  setMode(mode) {
    this.mode = mode;
    this.render();
  }

  resetZoom() {
    this.zoom = 1;
    this.panX = 40;
    this.panY = 30;
    this.render();
  }

  zoomIn() {
    this.zoom = Math.min(2.5, this.zoom + 0.15);
    this.render();
  }

  zoomOut() {
    this.zoom = Math.max(0.4, this.zoom - 0.15);
    this.render();
  }

  onMouseDown(e) {
    if (e.target === this.svg || e.target.tagName === "svg") {
      this.isPanning = true;
      this.startPan = { x: e.clientX - this.panX, y: e.clientY - this.panY };
    }
  }

  onMouseMove(e) {
    if (this.isPanning) {
      this.panX = e.clientX - this.startPan.x;
      this.panY = e.clientY - this.startPan.y;
      this.render();
    } else if (this.draggedNode) {
      const pt = this.getSvgCoords(e);
      this.draggedNode.x = pt.x - this.dragOffset.x;
      this.draggedNode.y = pt.y - this.dragOffset.y;
      this.render();
    }
  }

  onMouseUp() {
    this.isPanning = false;
    this.draggedNode = null;
  }

  onWheel(e) {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    this.zoom = Math.max(0.4, Math.min(2.5, this.zoom * zoomFactor));
    this.render();
  }

  getSvgCoords(e) {
    const rect = this.svg.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - this.panX) / this.zoom,
      y: (e.clientY - rect.top - this.panY) / this.zoom
    };
  }

  render() {
    if (!this.currentModel) return;
    this.svg.innerHTML = "";

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`);
    this.svg.appendChild(g);

    if (this.mode === "conceptual") {
      this.renderConceptual(g);
    } else {
      this.renderLogical(g);
    }
  }

  /* ==============================================================================
     🎨 RENDERIZAÇÃO DO MODELO CONCEITUAL (PETER CHEN)
     ============================================================================== */
  renderConceptual(g) {
    const { entities, relations } = this.currentModel;

    // 1. Linhas entre Entidades e Relacionamentos (Losangos)
    relations.forEach(rel => {
      const src = entities.find(e => e.id === rel.source);
      const tgt = entities.find(e => e.id === rel.target);
      if (!src || !tgt) return;

      // Linha Source -> Rel
      this.drawEdge(g, src.x + 65, src.y + 25, rel.x + 35, rel.y + 25, rel.cardSource);
      // Linha Rel -> Target
      this.drawEdge(g, rel.x + 35, rel.y + 25, tgt.x + 65, tgt.y + 25, rel.cardTarget);

      // Losango de Relacionamento
      this.drawRelationNode(g, rel);
    });

    // 2. Entidades e seus Atributos
    entities.forEach(ent => {
      this.drawEntityNode(g, ent);

      // Desenha as elipses dos atributos em arco ou satélites
      if (ent.attributes) {
        ent.attributes.forEach((attr, idx) => {
          const total = ent.attributes.length;
          // Distribui atributos acima e abaixo da entidade
          const isTop = idx < Math.ceil(total / 2);
          const offsetIndex = isTop ? idx : idx - Math.ceil(total / 2);
          const xOffset = (offsetIndex - (Math.ceil(total / 2) - 1) / 2) * 80;
          const yOffset = isTop ? -55 : 85;

          const ax = ent.x + 65 + xOffset;
          const ay = ent.y + 25 + yOffset;

          // Linha Entidade -> Atributo
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", ent.x + 65);
          line.setAttribute("y1", ent.y + 25);
          line.setAttribute("x2", ax);
          line.setAttribute("y2", ay);
          line.setAttribute("class", "edge-line");
          g.appendChild(line);

          // Nó de Atributo
          this.drawAttributeNode(g, attr, ax, ay, ent);
        });
      }
    });
  }

  drawEdge(g, x1, y1, x2, y2, cardinality) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("class", "edge-line");
    g.appendChild(line);

    if (cardinality) {
      // Posição próxima da ponta final (70% do caminho)
      const cx = x1 + (x2 - x1) * 0.45;
      const cy = y1 + (y2 - y1) * 0.45 - 8;

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", cx);
      text.setAttribute("y", cy);
      text.setAttribute("class", "edge-cardinality");
      text.textContent = cardinality;
      g.appendChild(text);
    }
  }

  drawEntityNode(g, ent) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "node-entity");
    group.setAttribute("transform", `translate(${ent.x}, ${ent.y})`);

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "130");
    rect.setAttribute("height", "50");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "65");
    text.setAttribute("y", "26");
    text.textContent = ent.name;

    group.appendChild(rect);
    group.appendChild(text);

    group.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      this.draggedNode = ent;
      const pt = this.getSvgCoords(e);
      this.dragOffset = { x: pt.x - ent.x, y: pt.y - ent.y };
      this.onSelectElement("entity", ent);
    });

    g.appendChild(group);
  }

  drawRelationNode(g, rel) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "node-relation");
    group.setAttribute("transform", `translate(${rel.x}, ${rel.y})`);

    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", "35,0 70,25 35,50 0,25");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "35");
    text.setAttribute("y", "26");
    text.textContent = rel.name;

    group.appendChild(poly);
    group.appendChild(text);

    group.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      this.draggedNode = rel;
      const pt = this.getSvgCoords(e);
      this.dragOffset = { x: pt.x - rel.x, y: pt.y - rel.y };
      this.onSelectElement("relation", rel);
    });

    g.appendChild(group);
  }

  drawAttributeNode(g, attr, x, y, parentEnt) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", `node-attribute ${attr.isPk ? "pk" : ""}`);
    group.setAttribute("transform", `translate(${x}, ${y})`);

    const el = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    el.setAttribute("cx", "0");
    el.setAttribute("cy", "0");
    el.setAttribute("rx", "36");
    el.setAttribute("ry", "17");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "0");
    text.setAttribute("y", "1");
    text.textContent = (attr.isPk ? "⚫ " : "") + attr.name;

    group.appendChild(el);
    group.appendChild(text);

    group.addEventListener("click", (e) => {
      e.stopPropagation();
      this.onSelectElement("attribute", { ...attr, entityName: parentEnt.name });
    });

    g.appendChild(group);
  }

  /* ==============================================================================
     📊 RENDERIZAÇÃO DO MODELO LÓGICO RELACIONAL (TABELAS DE TED CODD)
     ============================================================================== */
  renderLogical(g) {
    const { entities, relations } = this.currentModel;

    // Converte entidades em tabelas lógicas com Chaves Primárias e Estrangeiras
    const tables = entities.map(ent => {
      const cols = [];

      // Atributos próprios
      ent.attributes.forEach(a => {
        cols.push({
          name: a.name,
          type: a.isPk ? "INT AUTO_INCREMENT" : "VARCHAR(100)",
          isPk: a.isPk,
          isFk: false
        });
      });

      // Se a entidade for o lado N de um relacionamento 1:N, herda a FK!
      relations.forEach(r => {
        if (r.target === ent.id && r.cardTarget.includes("1") && r.cardSource.includes("n")) {
          const srcEnt = entities.find(e => e.id === r.source);
          const srcPk = srcEnt ? srcEnt.attributes.find(a => a.isPk) : null;
          if (srcPk) {
            cols.push({
              name: `${srcPk.name}_fk`,
              type: "INT",
              isPk: false,
              isFk: true,
              refTable: srcEnt.name
            });
          }
        }
      });

      return {
        id: ent.id,
        name: ent.name,
        x: ent.x,
        y: ent.y,
        columns: cols
      };
    });

    // Desenha as tabelas relacionais
    tables.forEach(t => {
      const rowHeight = 22;
      const headerHeight = 30;
      const totalHeight = headerHeight + t.columns.length * rowHeight + 10;
      const width = 175;

      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute("class", "relational-table");
      group.setAttribute("transform", `translate(${t.x}, ${t.y})`);

      // Fundo total
      const bodyBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bodyBg.setAttribute("width", width);
      bodyBg.setAttribute("height", totalHeight);
      bodyBg.setAttribute("class", "table-body-bg");
      group.appendChild(bodyBg);

      // Cabeçalho da Tabela
      const headerBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      headerBg.setAttribute("width", width);
      headerBg.setAttribute("height", headerHeight);
      headerBg.setAttribute("class", "table-header-bg");
      group.appendChild(headerBg);

      const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
      title.setAttribute("x", width / 2);
      title.setAttribute("y", 19);
      title.setAttribute("class", "table-title");
      title.textContent = t.name;
      group.appendChild(title);

      // Colunas
      t.columns.forEach((col, idx) => {
        const cy = headerHeight + idx * rowHeight + 16;

        // Badge PK ou FK
        if (col.isPk) {
          const pkBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
          pkBadge.setAttribute("x", 12);
          pkBadge.setAttribute("y", cy);
          pkBadge.setAttribute("class", "badge-pk");
          pkBadge.textContent = "PK";
          group.appendChild(pkBadge);
        } else if (col.isFk) {
          const fkBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
          fkBadge.setAttribute("x", 12);
          fkBadge.setAttribute("y", cy);
          fkBadge.setAttribute("class", "badge-fk");
          fkBadge.textContent = "FK";
          group.appendChild(fkBadge);
        }

        // Nome da Coluna
        const colText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        colText.setAttribute("x", 32);
        colText.setAttribute("y", cy);
        colText.setAttribute("class", "col-text");
        colText.textContent = col.name;
        group.appendChild(colText);
      });

      group.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        const entObj = entities.find(e => e.id === t.id);
        this.draggedNode = entObj;
        const pt = this.getSvgCoords(e);
        this.dragOffset = { x: pt.x - entObj.x, y: pt.y - entObj.y };
        this.onSelectElement("table", t);
      });

      g.appendChild(group);
    });
  }
}
