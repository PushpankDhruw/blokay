const model = (sequelize: any, DataTypes: any) => {
  const UserPermission = sequelize.define(
    "UserPermission",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: true },
      viewId: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      paranoid: true,
      tableName: "user_permissions",
    }
  );

  UserPermission.associate = function (models: any) {
    models.UserPermission.belongsTo(models.User);
    models.UserPermission.belongsTo(models.View);
  };

  return UserPermission;
};

export default model;
