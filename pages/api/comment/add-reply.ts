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
      return addReplyToComment(req, res);
    default:
      return res.status(400).send("Not Found!");
  }
};

const addReplyToComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "Unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  const { repliedTo } = req.body;
  if (!isValidObjectId(repliedTo))
    return res.status(422).json({ error: "Invalid comment id!" });
  await dbConnect();

  const chiefComment = await Comment.findOne({
    _id: repliedTo,
    chiefComment: true,
  });

  if (!chiefComment)
    return res.status(404).json({ error: "Comment not found!" });

  const replyComment = new Comment({
    owner: user.id,
    repliedTo,
    content: req.body.content,
  });

  if (chiefComment.replies)
    chiefComment.replies = [...chiefComment.replies, replyComment._id];

  await chiefComment.save();
  await replyComment.save();

  res.status(201).json({ comment: replyComment });
};

export default handler;
