const model = (sequelize, DataTypes) => {
  const Neuron = sequelize.define(
    "Neuron",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      executions: { type: DataTypes.INTEGER, allowNull: true },
      timeMs: { type: DataTypes.INTEGER, allowNull: true },
      key: { type: DataTypes.STRING, allowNull: true },
      // icon: { type: DataTypes.STRING, allowNull: true },
      // group: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      rolPrivilegeId: { type: DataTypes.INTEGER, allowNull: true },
      // neuronGroupId: { type: DataTypes.INTEGER, allowNull: true },
      // neuronId: { type: DataTypes.INTEGER, allowNull: true },
      businessId: { type: DataTypes.INTEGER, allowNull: true },
      parentId: { type: DataTypes.INTEGER, allowNull: true },
      filters: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          let json = this.getDataValue("filters");
          json = json || "{}";
          try {
            return JSON.parse(json);
          } catch (err) {
            console.error(
              "neuron filters error parse: " + this.getDataValue("id"),
              err
            );
            return {};
          }
        },
        set(value) {
          this.setDataValue("filters", JSON.stringify(value));
        },
      },

      history: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          let json = this.getDataValue("history");
          json = json || "[]";
          try {
            return JSON.parse(json);
          } catch (err) {
            console.error(
              "neuron history error parse: " + this.getDataValue("id"),
              err
            );
            return {};
          }
        },
        set(value) {
          this.setDataValue("history", JSON.stringify(value));
        },
      },

      synapse: { type: DataTypes.STRING, allowNull: true },
      executable: { type: DataTypes.STRING, allowNull: true },
    },
    {
      paranoid: true,
      tableName: "neurons",
    }
  );

  Neuron.associate = function (models) {
    // models.Neuron.belongsTo(models.NeuronGroup);
    // models.Neuron.hasMany(models.Neuron);
    // models.Neuron.belongsTo(models.RolPrivilege);
  };

  return Neuron;
};

export default model;
