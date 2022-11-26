import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { Signatures, User } from "../../../models";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return allUsers(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const allUsers = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await db.connect();
  const users = await User.find().select("name email -_id").lean();
  const numOfSignaturesForEmail = await Signatures.aggregate([
    {
      $group: {
        _id: "$email",
        numOfSignatures: { $sum: 1 },
      },
    },
  ]);

  await db.disconnect();

  const usersWithNumOfSignatures = users.map((user) => {
    const numOfSignatures = numOfSignaturesForEmail.find(
      (num) => num._id === user.email
    )?.numOfSignatures;
    return {
      ...user,
      numOfSignatures: numOfSignatures || 0,
    };
  });

  return res.status(200).json(usersWithNumOfSignatures);
};
