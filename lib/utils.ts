import Post, { IPostModelSchema } from "@/models/post";
import dbConnect from "./dbConnect"
import { PostDetails } from "@/utils/types";

export const readPostFromDb = async (limit: number, pageNumber: number) => {
    const skip = limit * pageNumber;
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: 'desc' }).select('-content').skip(skip).limit(limit);
    return posts;
}

export const formatPost =  (posts: IPostModelSchema[]): PostDetails[] => {
    return posts.map((post) => ({
        title: post.title,
        slug: post.slug,
        createdAt: post.createdAt.toString(),
        thumbnail: post.thumbnail?.url || '',
        meta: post.meta,
        tags: post.tags,
    }));
}