import { isAuth } from "@/utils/helper";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return createNewComment(req, res);
    default:
      return res.status(400).send("Not Found!");
  }
};

const createNewComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  console.log(user);
  if (!user) return res.status(403).json({ error: "Unauthorized request!" });
};

export default handler;
