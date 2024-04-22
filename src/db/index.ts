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
  [index: string]: any; //index signature

  private models: any = {
    _QueryExecution,
    Datasource,
    NeuronGroup,
    Neuron,
    View,
    Session,
    User,
  };

  public sequelize: any = null;
  public Sequelize: any = Sequelize;
  public Op: any = Sequelize.Op;

  constructor() {
    this.connect();
    this.createModels();
    this.associate();
  }

  createModels() {
    for (let key in this.models) {
      this[key] = this.models[key](this.sequelize, this.Sequelize.DataTypes);
    }
  }

  associate() {
    for (let key in this.models) {
      if (this[key].associate) {
        this[key].associate(this);
      }
    }
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
