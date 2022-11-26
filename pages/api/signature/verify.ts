import type { NextApiRequest, NextApiResponse } from "next";
import { keys } from "../../../utils";

import { db } from "../../../database";
import { Signatures } from "../../../models";

type Data = { verify: any } | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return postVerify(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const postVerify = async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { base64File } = req.body;

  try {
    await db.connect();
    const file = await Signatures.findOne({ base64File }).lean();
    await db.disconnect();

    if (!file) {
      return res.status(404).json({
        verify: false,
      });
    }


    res.status(200).json({
      verify: keys.verifySignature(file.publicKey, base64File, file.signature),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salió mal",
    });
  }
};
