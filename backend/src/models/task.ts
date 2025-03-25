import { Model, DataTypes, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";


class Task extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { 
        type: DataTypes.STRING,
        allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Tasks",
    sequelize: sequelize,
  },
);

export default Task;