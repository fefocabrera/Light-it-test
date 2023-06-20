import { Model, DataTypes } from 'sequelize';
import { Uuid } from "../../types/Basetypes";
import sequelize from '..';
import Evaluation from './evaluation';

class externalApiToken extends Model {
  public token!: string;
  public validThrough!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

externalApiToken.init({
  token: {
    type: DataTypes.STRING(1000),
    defaultValue: '',
    allowNull: false,
  },
  validThrough: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'ExternalApiToken',
});

export default externalApiToken;