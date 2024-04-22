const model = (sequelize: any, DataTypes: any) => {
  const ViewGroup = sequelize.define(
    "ViewGroup",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: true },
      businessId: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      paranoid: true,
      tableName: "view_groups",
    }
  );

  return ViewGroup;
};

export default model;
