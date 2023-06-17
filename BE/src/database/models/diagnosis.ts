import { Model, DataTypes } from 'sequelize';
import { Uuid } from "../../types/Basetypes";
import sequelize from '..';
import Evaluation from './evaluation';

class Diagnosis extends Model {
  public uuid!: Uuid;
  public evaluationUuid!: Uuid;
  public externalApiId!: number;
  public description!: string;
  public precision!: number;
  public confirmed?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Diagnosis.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  externalApiId: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precision: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Diagnosis',
  indexes: [
    {
      unique: false,
      fields: ['evaluationUuid'],
    },
  ]
});

Diagnosis.belongsTo(Evaluation, {
  foreignKey: 'evaluationUuid',
});

export default Diagnosis;