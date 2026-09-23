import mongoose, { Schema, type Model } from "mongoose";

export interface ITask {
  title: string;
  description?: string;
  // project?: mongoose.Types.ObjectId;
  // assignee?: mongoose.Types.ObjectId;
  assignee?: string;
  dueDate?: Date;
  status: "todo" | "in-progress" | "completed";
  createdBy?: mongoose.Types.ObjectId;
}

type TaskModel = Model<ITask>;

const taskSchema = new Schema<ITask, TaskModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    // project: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Project",
    // },
    assignee: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      type:String
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

taskSchema.index({assignee : 1})
taskSchema.index({status : 1})

export const Task = mongoose.model<ITask, TaskModel>("Task", taskSchema);