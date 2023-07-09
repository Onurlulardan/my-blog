import Post from "@/models/post";
import { NextApiHandler } from "next";
import { readFile, NextApiRequestWithFiles } from "@/lib/readFile";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "PATCH":
      return updatePost(req, res);
    case "DELETE":
      return removePost(req, res);
    default:
      res.status(404).send("Not Found!");
  }
};

const removePost: NextApiHandler = async (req, res) => {
  try {
    const { postId } = req.query;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: "Post Not Found!" });

    const publicId = post?.thumbnail?.public_id;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    res.json({ removed: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost: NextApiHandler = async (req, res) => {
  const { postId } = req.query;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post Not Found!" });

  const { files, body } = await readFile(req as NextApiRequestWithFiles, res);

  let tags = [];
  if (body.tags) tags = JSON.parse(body.tags);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  if (files && files[0]) {
    const { path: urlget, filename: public_ids } = files[0];
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      urlget,
      { folder: "dev-blogs" }
    );

    const publicId = post.thumbnail?.public_id;
    if (publicId) await cloudinary.uploader.destroy(publicId);

    post.thumbnail = { url, public_id };
  }

  await post.save();

  res.json({ post });
};

export default handler;
