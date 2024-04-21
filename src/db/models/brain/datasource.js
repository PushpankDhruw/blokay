import { Sequelize } from "sequelize";
const model = (sequelize, DataTypes) => {
  const Datasource = sequelize.define(
    "Datasource",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      type: { type: DataTypes.STRING, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: true },
      businessId: { type: DataTypes.INTEGER, allowNull: true },
      config: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          let json = this.getDataValue("config");
          json = json || "{}";
          try {
            return JSON.parse(json);
          } catch (err) {
            console.error(
              "neuron config error parse: " + this.getDataValue("id"),
              err
            );
            return {};
          }
        },
        set(value) {
          this.setDataValue("config", JSON.stringify(value));
        },
      },

      structure: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          let json = this.getDataValue("structure");
          json = json || "{}";
          try {
            return JSON.parse(json);
          } catch (err) {
            console.error(
              "neuron structure error parse: " + this.getDataValue("id"),
              err
            );
            return {};
          }
        },
        set(value) {
          this.setDataValue("structure", JSON.stringify(value));
        },
      },
    },
    {
      paranoid: true,
      tableName: "datasources",
    }
  );

  Datasource.prototype.getDb = async function (conn) {
    let tables = {};
    let sql = `select \`TABLE_NAME\` as "table",
    \`COLUMN_NAME\` as "column", 
    DATA_TYPE as \`type\`, 
    COLUMN_DEFAULT as dflt_value,
    IF(COLUMN_NAME = "id", 1, 0) as pk,
    \`TABLE_SCHEMA\` AS db
    from information_schema.COLUMNS
    where TABLE_SCHEMA NOT IN ("information_schema", "MYSQL", "performance_schema")
    and \`TABLE_SCHEMA\` = '${this.config.database.database}'
    group by COLUMN_NAME, TABLE_NAME
    order by COLUMNS.ORDINAL_POSITION ASC`;
    let result = await conn.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
    });

    result.map((r) => {
      if (!tables[r.table]) {
        tables[r.table] = { columns: [], name: r.table };
      }

      tables[r.table].columns.push({
        type: r.type,
        name: r.column,
        pk: r.pk,
        default: r.dflt_value,
        unsaved: false,
        exist: true,
      });
    });

    return { tables: Object.values(tables) };
  };

  return Datasource;
};

export default model;
