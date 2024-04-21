import Sequelize from "sequelize";
// Models
import _QueryExecution from "./models/_query_executions";
import Neuron from "./models/brain/neuron";
import NeuronGroup from "./models/brain/neuron-group";
import View from "./models/brain/view";
import Session from "./models/user/session";
import User from "./models/user/user";
import Datasource from "./models/brain/datasource";

function Models(this: any) {
  this.models = {
    Datasource,
    _QueryExecution,
    NeuronGroup,
    Neuron,
    View,
    User,
    Session,
  };

  this.sequelize = null;
  this.Sequelize = Sequelize;
  this.Op = Sequelize.Op;

  this.associate = function () {
    let names = Object.keys(this.models);
    for (let i = 0; i < names.length; i++) {
      let modelData = this.models[names[i]];
      let model = modelData(this.sequelize, this.Sequelize.DataTypes);
      this[model.name] = model;
    }

    for (var i = 0; i < names.length; i++) {
      let modelName = names[i];
      if (this[modelName].associate) {
        this[modelName].associate(this);
      }
    }
  };

  this.connect = function () {
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
        operatorsAliases: this.operatorsAliases,
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
  };

  this.connect();
  this.associate();
}

export default Models;
