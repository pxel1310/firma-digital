import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { keys } from "../../../utils";

import { db } from "../../../database";
import { Signatures } from "../../../models";
import { ISignature } from "../../../interfaces";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getSignature(req, res);

    case "POST":
      return postSignature(req, res);

    case "DELETE":
      return deleteSignature(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const getSignature = async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await db.connect();
    const signature = await Signatures.find().lean();
    await db.disconnect();
    res.status(200).json(signature);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const postSignature = async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fileArray = req.body as ISignature[];

  for (let i = 0; i < fileArray.length; i++) {
    const { base64File, privateKey } = fileArray[i];

    fileArray[i] = {
      ...fileArray[i],
      signature: keys.getSignature(privateKey, base64File),
    };
  }

  try {
    await db.connect();
    await Signatures.insertMany(fileArray);
    await db.disconnect();
    res.status(200).json({
      message: "Archivos firmados correctamente",
      signature: fileArray[0].signature,
    });
  } catch (e) {
    res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

const deleteSignature = async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { _id } = req.body as ISignature;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    await db.connect();
    await Signatures.findByIdAndDelete(_id);
    await db.disconnect();
    res.status(200).json({
      message: "Signature deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
