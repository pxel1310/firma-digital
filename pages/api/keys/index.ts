import type { NextApiRequest, NextApiResponse } from "next";
import { keys } from "../../../utils";

type Data = { message: string } | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getKeys(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const getKeys = async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const llaves = keys.getKeys();

    res.status(200).json({ ...llaves });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
