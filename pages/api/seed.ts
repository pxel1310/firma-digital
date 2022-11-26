import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { User, Signatures } from "../../models";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este API" });
  }

  await db.connect();

  // await User.deleteMany();

  await Signatures.deleteMany();

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
