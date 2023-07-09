import { FinalPost } from "@/components/editor";
import { PostDetails, UserProfile } from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export const generateFormData = (post: FinalPost) => {
  const formdata = new FormData();
  for (let key in post) {
    const value = (post as any)[key];
    if (key === "tags" && value.trim()) {
      const tags = value
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean);
      formdata.append("tags", JSON.stringify(tags));
    } else {
      formdata.append(key, value);
    }
  }
  return formdata;
};

export const filterPosts = (post: PostDetails[], postToFilter: PostDetails) => {
  return post.filter((post) => {
    return post._id !== postToFilter._id;
  });
};

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as UserProfile;
  return user && user.role === "admin";
};

export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;
  if (user) return user as UserProfile;
};
