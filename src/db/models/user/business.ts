export default (sequelize: any, DataTypes: any) => {
  const Business = sequelize.define(
    "Business",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      ownerId: { type: DataTypes.INTEGER, allowNull: true },
      coreToken: { type: DataTypes.STRING, allowNull: true },
      logo: { type: DataTypes.STRING, allowNull: true },
      website: { type: DataTypes.STRING, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: true },
    },
    {
      paranoid: true,
      tableName: "businesses",
    }
  );

  Business.associate = function (models: any) {
    models.Business.belongsTo(models.User, {
      foreignKey: "ownerId",
      as: "owner",
    });
  };

  return Business;
};
