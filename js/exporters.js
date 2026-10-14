/* ==============================================================================
   📤 MOTOR DE EXPORTAÇÃO MULTI-FORMATO • SENAI BRMW
   Gera arquivos prontos para importação no brModelo Web, Draw.io, Mermaid e SQL DDL
   ============================================================================== */

export class ModelExporters {
  /**
   * 1. Exporta no Formato Oficial do brModelo Web (JSON Estruturado)
   * Compatível com a importação no app.brmodeloweb.com
   */
  static toBrModeloWebJSON(model) {
    const brmwData = {
      app: "brmodeloweb",
      version: "2.5.0",
      type: "conceptual",
      name: model.title || "modelo_conceitual",
      createdAt: new Date().toISOString(),
      elements: []
    };

    // Mapeia Entidades
    model.entities.forEach(ent => {
      brmwData.elements.push({
        id: ent.id,
        type: "entity",
        name: ent.name,
        position: { x: ent.x, y: ent.y },
        size: { width: 130, height: 50 },
        entityType: "regular"
      });

      // Mapeia Atributos
      if (ent.attributes) {
        ent.attributes.forEach((attr, idx) => {
          brmwData.elements.push({
            id: attr.id,
            type: "attribute",
            name: attr.name,
            isIdentifier: attr.isPk,
            isOptional: false,
            isMultivalued: false,
            isComposite: false,
            parentId: ent.id,
            position: { x: ent.x + (idx * 60) - 40, y: ent.y - 60 }
          });
        });
      }
    });

    // Mapeia Relacionamentos
    model.relations.forEach(rel => {
      brmwData.elements.push({
        id: rel.id,
        type: "relationship",
        name: rel.name,
        position: { x: rel.x, y: rel.y },
        size: { width: 70, height: 50 },
        connections: [
          { entityId: rel.source, cardinality: rel.cardSource || "(0,n)" },
          { entityId: rel.target, cardinality: rel.cardTarget || "(1,1)" }
        ]
      });
    });

    return JSON.stringify(brmwData, null, 2);
  }

  /**
   * 2. Exporta no Formato do Draw.io (XML .drawio)
   * Abre nativamente no app.diagrams.net ou na extensão do VS Code
   */
  static toDrawIoXML(model) {
    let cellsXml = `
      <mxCell id="0" />
      <mxCell id="1" parent="0" />
    `;
    let cellId = 2;

    // Entidades (Retângulos)
    const entityMap = {};
    model.entities.forEach(ent => {
      const eid = cellId++;
      entityMap[ent.id] = eid;
      cellsXml += `
        <mxCell id="${eid}" value="${ent.name}" style="rounded=0;whiteSpace=wrap;html=1;fontStyle=1;strokeColor=#005594;strokeWidth=2;fillColor=#FFFFFF;fontColor=#005594;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="${ent.x}" y="${ent.y}" width="130" height="50" as="geometry" />
        </mxCell>
      `;

      // Atributos (Elipses)
      ent.attributes.forEach((attr, idx) => {
        const aid = cellId++;
        const isPk = attr.isPk;
        const style = isPk
          ? "ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;"
          : "ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;fontColor=#0F172A;fontSize=11;";

        cellsXml += `
          <mxCell id="${aid}" value="${isPk ? '⚫ ' : ''}${attr.name}" style="${style}" vertex="1" parent="1">
            <mxGeometry x="${ent.x + (idx * 50) - 20}" y="${ent.y - 50}" width="80" height="35" as="geometry" />
          </mxCell>
          <mxCell id="${cellId++}" edge="1" parent="1" source="${eid}" target="${aid}" style="endArrow=none;html=1;strokeColor=#64748B;">
            <mxGeometry relative="1" as="geometry" />
          </mxCell>
        `;
      });
    });

    // Relacionamentos (Losangos)
    model.relations.forEach(rel => {
      const rid = cellId++;
      cellsXml += `
        <mxCell id="${rid}" value="${rel.name}" style="rhombus;whiteSpace=wrap;html=1;fontStyle=1;strokeColor=#F59E0B;strokeWidth=2;fillColor=#FFFFFF;fontColor=#D97706;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="${rel.x}" y="${rel.y}" width="70" height="50" as="geometry" />
        </mxCell>
        <mxCell id="${cellId++}" value="${rel.cardSource}" edge="1" parent="1" source="${entityMap[rel.source]}" target="${rid}" style="endArrow=none;html=1;strokeColor=#64748B;fontSize=10;fontColor=#F43F5E;fontStyle=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="${cellId++}" value="${rel.cardTarget}" edge="1" parent="1" source="${rid}" target="${entityMap[rel.target]}" style="endArrow=none;html=1;strokeColor=#64748B;fontSize=10;fontColor=#F43F5E;fontStyle=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      `;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="SENAI-BRMW-Documentation">
  <diagram id="diagram_senai" name="${model.title || 'modelo_conceitual'}">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827">
      <root>
        ${cellsXml}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  }

  /**
   * 3. Exporta em Mermaid ERD (Markdown / GitHub / Notion)
   */
  static toMermaidERD(model) {
    let mermaid = "erDiagram\n";

    // Entidades e atributos
    model.entities.forEach(ent => {
      mermaid += `    ${ent.name} {\n`;
      ent.attributes.forEach(attr => {
        const type = attr.isPk ? "int" : "string";
        const pk = attr.isPk ? "PK" : "";
        mermaid += `        ${type} ${attr.name} ${pk}\n`;
      });
      mermaid += `    }\n`;
    });

    // Relacionamentos com notação crow's foot correspondente
    model.relations.forEach(rel => {
      const src = model.entities.find(e => e.id === rel.source);
      const tgt = model.entities.find(e => e.id === rel.target);
      if (!src || !tgt) return;

      // Mapeia cardinalidades (0,n)/(1,1) para Mermaid crow's foot
      const leftSym = rel.cardSource.includes("n") ? "}o" : "||";
      const rightSym = rel.cardTarget.includes("n") ? "o{" : "||";
      const verb = rel.name.toLowerCase().replace(/_/g, "-");

      mermaid += `    ${src.name} ${leftSym}--${rightSym} ${tgt.name} : "${verb}"\n`;
    });

    return mermaid;
  }

  /**
   * 4. Exporta em Script SQL DDL (MySQL InnoDB Completo)
   */
  static toMySQLDDL(model) {
    const dbName = (model.title || "meu_banco_db").toLowerCase().replace(/[^a-z0-9_]/g, "_");
    let sql = `-- ==============================================================================
-- 🏛️ SCRIPT SQL DDL • GERADO VIA SENAI BRMW MODELADOR
-- SGBD Alvo: MySQL 8.0+ (Motor InnoDB com Conformidade ACID)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`${dbName}\`
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE \`${dbName}\`;

`;

    // Tabelas primárias
    model.entities.forEach(ent => {
      sql += `-- Tabela: ${ent.name}\n`;
      sql += `CREATE TABLE IF NOT EXISTS \`${ent.name.toLowerCase()}\` (\n`;

      const colDefs = [];
      let pkCol = null;

      ent.attributes.forEach(attr => {
        if (attr.isPk) {
          pkCol = attr.name;
          colDefs.push(`    \`${attr.name}\` INT AUTO_INCREMENT`);
        } else {
          colDefs.push(`    \`${attr.name}\` VARCHAR(150) NOT NULL`);
        }
      });

      // Chaves estrangeiras decorrentes de 1:N
      model.relations.forEach(rel => {
        if (rel.target === ent.id && rel.cardTarget.includes("1") && rel.cardSource.includes("n")) {
          const srcEnt = model.entities.find(e => e.id === rel.source);
          const srcPk = srcEnt ? srcEnt.attributes.find(a => a.isPk) : null;
          if (srcPk) {
            colDefs.push(`    \`${srcPk.name}_fk\` INT NOT NULL`);
          }
        }
      });

      if (pkCol) {
        colDefs.push(`    PRIMARY KEY (\`${pkCol}\`)`);
      }

      // Constraints de Foreign Key
      model.relations.forEach(rel => {
        if (rel.target === ent.id && rel.cardTarget.includes("1") && rel.cardSource.includes("n")) {
          const srcEnt = model.entities.find(e => e.id === rel.source);
          const srcPk = srcEnt ? srcEnt.attributes.find(a => a.isPk) : null;
          if (srcPk) {
            colDefs.push(`    CONSTRAINT \`fk_${ent.name.toLowerCase()}_${srcEnt.name.toLowerCase()}\` FOREIGN KEY (\`${srcPk.name}_fk\`) REFERENCES \`${srcEnt.name.toLowerCase()}\`(\`${srcPk.name}\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
          }
        }
      });

      sql += colDefs.join(",\n");
      sql += `\n) ENGINE=InnoDB;\n\n`;
    });

    return sql;
  }

  /**
   * Dispara o download de um arquivo de texto no navegador
   */
  static downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
