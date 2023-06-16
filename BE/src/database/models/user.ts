import { Model, DataTypes } from 'sequelize';
import sequelize from '..';
import { Uuid } from "../../types/Basetypes";

class User extends Model {
  public uuid!: Uuid;
  public firstName!: string;
  public lastName!: string;
  public genre?: string;
  public birthdate!: Date;
  public username!: string;
  public password!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;