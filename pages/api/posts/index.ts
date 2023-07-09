import dbConnect from "@/lib/dbConnect";
import { readFile, NextApiRequestWithFiles } from "@/lib/readFile";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import { NextApiHandler } from "next";
import Post from "@/models/post";
import { readPostFromDb } from "@/lib/utils";
import { isAdmin } from "@/utils/helper";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.slug) {
        return getPostBySlug(req, res);
      } else {
        return getAllPost(req, res);
      }
    case "POST":
      return createNewPost(req, res);
    default:
      break;
  }
};

const getPostBySlug: NextApiHandler = async (req, res) => {
  try {
    const { slug } = req.query;

    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPost: NextApiHandler = async (req, res) => {
  const limit = Number(req.query.limit as string) || 10;
  const pageNumber = Number(req.query.pageNumber as string) || 0;
  const skip = Number(req.query.skip as string);

  await dbConnect();

  const posts = await readPostFromDb(limit, pageNumber, skip);

  res.json({ posts });
};

const createNewPost: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(401).json({ error: "Unauthorized request!" });

  const { files, body } = await readFile(req as NextApiRequestWithFiles, res);

  let tags = [];
  if (body.tags) tags = JSON.parse(body.tags);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, slug, meta } = body;

  await dbConnect();
  const alreadyExist = await Post.findOne({ slug });
  if (alreadyExist)
    return res.status(400).json({ error: "Slug need to be uniqe!" });

  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  if (files && files[0]) {
    const { path: url, filename: public_id } = files[0];
    newPost.thumbnail = { url, public_id };
  }

  await newPost.save();

  res.json({ post: newPost });
};

export default handler;
