import { inet_ntoa, inet_aton } from "../../helpers/ip";

export default (sequelize: any, DataTypes: any) => {
  const Session = sequelize.define(
    "Session",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      deviceId: { type: DataTypes.INTEGER, allowNull: true },
      token: { type: DataTypes.STRING, allowNull: false },
      active: { type: DataTypes.TINYINT, allowNull: false },
      withExpiration: { type: DataTypes.TINYINT, allowNull: true },
      ipAddress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        get(): string {
          let objThis: any = this;
          return inet_ntoa(objThis.getDataValue("ipAddress"));
        },
        set(valueToBeSet: string): void {
          let objThis: any = this;
          objThis.setDataValue("ipAddress", inet_aton(valueToBeSet));
        },
      },
      name: { type: DataTypes.STRING, allowNull: true },
      lastActivity: { type: DataTypes.DATE, allowNull: true },
      geoLat: { type: DataTypes.DECIMAL, allowNull: true },
      geoLon: { type: DataTypes.DECIMAL, allowNull: true },
      geoAccuracy: { type: DataTypes.DECIMAL, allowNull: true },
    },
    {
      paranoid: true,
      tableName: "sessions",
    }
  );

  Session.associate = function (models: any) {
    models.Session.belongsTo(models.User);
  };

  Session.findByToken = async function (token: string) {
    let queryBuilder = {
      include: [
        {
          model: sequelize.models.User,
          required: true,
        },
      ],
      where: {
        token,
        active: 1,
      },
    };
    let session = await sequelize.models.Session.findOne(queryBuilder);

    return session;
  };

  Session.createToken = function (length: number) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  Session.createSession = async function (
    user: any,
    ip: string,
    agent = "",
    deviceId = null
  ) {
    let data = {
      deviceId,
      name: agent,
      ip: ip,
      userId: user.id,
      lastActivity: Date.now(),
      token: "" + Date.now() + Session.createToken(64),
      active: 1,
    };

    let session = await Session.create(data);
    return session;
  };

  return Session;
};
