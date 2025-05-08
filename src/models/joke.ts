import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/index';

// Definimos una interfaz para los campos de la tabla
interface JokeAttributes {
  id: number;
  text: string;
}

interface JokeCreationAttributes extends Optional<JokeAttributes, 'id'> {}

class Joke extends Model<JokeAttributes, JokeCreationAttributes> implements JokeAttributes {
  public id!: number;
  public text!: string;
}

Joke.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'jokes',
    timestamps: false, // Si no usás createdAt y updatedAt
  }
);

 


export { Joke };
