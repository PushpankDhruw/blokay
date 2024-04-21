const model = (sequelize, DataTypes) => {
  const NeuronGroup = sequelize.define(
    "NeuronGroup",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: true },
    },
    {
      paranoid: true,
      tableName: "neuron_groups",
    }
  );

  // NeuronGroup.associate = function (models) {
  // models.NeuronGroup.belongsTo(models.RolPrivilege);
  // };

  return NeuronGroup;
};

export default model;
