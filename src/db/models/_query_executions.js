export default (sequelize, DataTypes) => {

	const _QueryExecution = sequelize.define('_QueryExecution', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		ms: { type: DataTypes.INTEGER, allowNull: false },
    sql: { type: DataTypes.STRING, allowNull: true },
    // name: { type: DataTypes.STRING, allowNull: true },
    // description: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true }
  }, 
  {
    paranoid: true,
    tableName: '_query_executions',
  });

  return _QueryExecution;
};