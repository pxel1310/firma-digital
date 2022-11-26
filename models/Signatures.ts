import mongoose, { Schema, model, Model } from "mongoose";
import { ISignature } from "../interfaces";

const signatureSchema = new Schema(
  {
    user: { type: String, required: true },
    email: { type: String, required: true },

    title: { type: String, required: true },
    lastModified: { type: Number, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    base64File: { type: String, required: true },

    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    signature: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Signatures: Model<ISignature> =
  mongoose.models.Signatures || model("Signatures", signatureSchema);

export default Signatures;
