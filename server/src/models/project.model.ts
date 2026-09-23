import mongoose, { Schema, type Model } from "mongoose";

export interface IProject {
  name: string;
  description?: string;
  createdBy?: mongoose.Types.ObjectId;
}

type ProjectModel = Model<IProject>;

const projectSchema = new Schema<IProject, ProjectModel>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    createdBy: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      type:String
    },
  },
  {
    timestamps: true,
  },
);

export const Project = mongoose.model<IProject, ProjectModel>( "Project", projectSchema);
