import { Model, DataTypes } from 'sequelize';
import sequelize from '..';
import { Uuid } from "../../types/Basetypes";
import User from './user';

class Evaluation extends Model {
  public uuid!: Uuid;
  public userUuid!: Uuid;
  public date!: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Evaluation.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now'),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Evaluation',
  indexes: [
    {
      unique: false,
      fields: ['userUuid'],
    },
  ]
});

Evaluation.belongsTo(User, {
    foreignKey: 'userUuid',
});

export default Evaluation;