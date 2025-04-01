import { Model, DataTypes, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";

class CompletedTask extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public readonly userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CompletedTask.init(
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "CompletedTasks",
    sequelize: sequelize,
  },
);

export default CompletedTask;