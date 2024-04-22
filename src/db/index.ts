import Sequelize from "sequelize";
// Models
import _QueryExecution from "./models/_query_executions";
import Neuron from "./models/brain/neuron";
import NeuronGroup from "./models/brain/neuron-group";
import View from "./models/brain/view";
import Session from "./models/user/session";
import User from "./models/user/user";
import Datasource from "./models/brain/datasource";

class DB {
  public _QueryExecution: any = null;
  public Datasource = null;
  public NeuronGroup = null;
  public Neuron = null;
  public View = null;
  public User = null;
  public Session = null;

  public sequelize: any = null;
  public Sequelize: any = Sequelize;
  public Op: any = Sequelize.Op;

  constructor() {
    this.connect();
    this.createModels();
    this.associate();
  }

  createModels() {
    this.Datasource = Datasource(this.sequelize, this.Sequelize.DataTypes);
    this.NeuronGroup = NeuronGroup(this.sequelize, this.Sequelize.DataTypes);
    this.Neuron = Neuron(this.sequelize, this.Sequelize.DataTypes);
    this.View = View(this.sequelize, this.Sequelize.DataTypes);
    this.User = User(this.sequelize, this.Sequelize.DataTypes);
    this.Session = Session(this.sequelize, this.Sequelize.DataTypes);
    this._QueryExecution = _QueryExecution(
      this.sequelize,
      this.Sequelize.DataTypes
    );
  }

  associate() {
    // for (var i = 0; i < names.length; i++) {
    //   let modelName = names[i];
    //   if (this[modelName].associate) {
    //     this[modelName].associate(this);
    //   }
    // }
  }

  connect() {
    let SequelizeObj: any = Sequelize;
    this.sequelize = new SequelizeObj(
      process.env.DATABASE_NAME,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      {
        host: process.env.DATABASE_HOSTNAME,
        pool: {
          max: 20,
          min: 0,
          idle: 20000,
          acquire: 200000,
        },
        dialect: "mysql",
        define: {
          charset: "utf8",
          collate: "utf8_general_ci",
        },
        timezone: "-05:00",
        dialectModule: require("mysql2"),
        operatorsAliases: this.Op,
        benchmark: true,
        logging: (str: string, time: number) => {
          if (time > 2000) {
            this._QueryExecution.create({
              sql: str,
              ms: time,
              type: "alert_register",
            });
          }
        },
      }
    );
  }
}

export default DB;
