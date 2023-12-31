import Post, { IPostModelSchema } from "@/models/post";
import dbConnect from "./dbConnect";
import { PostDetails } from "@/utils/types";

export const readPostFromDb = async (
  limit: number,
  pageNumber: number,
  skip?: number
) => {
  const finalSkip = skip || limit * pageNumber;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(finalSkip)
    .limit(limit);
  return posts;
};

export const formatPost = (posts: IPostModelSchema[]): PostDetails[] => {
  return posts.map((post) => ({
    _id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
  }));
};
