const model = (sequelize: any, DataTypes: any) => {
  const View = sequelize.define(
    "View",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      icon: { type: DataTypes.STRING, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: true },
      slug: { type: DataTypes.STRING, allowNull: true },
      businessId: { type: DataTypes.INTEGER, allowNull: true },
      layout: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          let objThis: any = this;
          let json = objThis.getDataValue("layout");
          json = json || "{}";
          try {
            return JSON.parse(json);
          } catch (err) {
            console.error(
              "neuron filters error parse: " + objThis.getDataValue("id"),
              err
            );
            return {};
          }
        },
        set(value: any) {
          let objThis: any = this;
          objThis.setDataValue("layout", JSON.stringify(value));
        },
      },
    },
    {
      paranoid: true,
      tableName: "views",
    }
  );

  return View;
};

export default model;
