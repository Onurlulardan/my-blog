import dbConnect from "@/lib/dbConnect";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/comment";
import { isAuth } from "@/utils/helper";
import { isValidObjectId } from "mongoose";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return updateLike(req, res);
    default:
      return res.status(400).send("Not Found!");
  }
};

const updateLike: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "Unauthorized request!" });

  const { commentId } = req.body;

  if (!isValidObjectId(commentId))
    return res.status(422).json({ error: "Invalid comment id!" });
  await dbConnect();

  const comment = await Comment.findById(commentId);

  if (!comment) return res.status(404).json({ error: "Comment not found!" });

  const oldLikes = comment.likes || [];
  const likeBy = user.id as any;

  if (oldLikes.includes(likeBy)) {
    comment.likes = oldLikes.filter(
      (like) => like.toString() !== likeBy.toString()
    );
  } else {
    comment.likes = [...oldLikes, likeBy];
  }

  await comment.save();

  res.status(201).json({ comment });
};

export default handler;
