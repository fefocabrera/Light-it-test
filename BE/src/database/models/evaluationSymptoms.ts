import { Model, DataTypes } from 'sequelize';
import { Uuid } from "../../types/Basetypes";
import sequelize from '..';
import Evaluation from './evaluation';

class EvaluationSymptoms extends Model {
  public uuid!: Uuid;
  public evaluationUuid!: Uuid;
  public externalApiId!: number;
  public description!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

EvaluationSymptoms.init({
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
  }
}, {
  sequelize,
  modelName: 'EvaluationSymptoms',
  indexes: [
    {
      unique: false,
      fields: ['evaluationUuid'],
    },
  ]
});

EvaluationSymptoms.belongsTo(Evaluation, {
  foreignKey: 'evaluationUuid',
});

export default EvaluationSymptoms;