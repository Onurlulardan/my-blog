import dbConnect from "@/lib/dbConnect";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/comment";
import Post from "@/models/post";
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
  if (!user) return res.status(403).json({ error: "Unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  //create Comment
  await dbConnect();
  const { belongsTo, content } = req.body;
  const post = await Post.findById(belongsTo);
  if (!post) return res.status(401).json({ error: "Invalid Post!" });

  const comment = new Comment({
    content,
    belongsTo,
    owner: user.id,
    chiefComment: true,
  });

  await comment.save();
  res.status(201).json(comment);
};

export default handler;
