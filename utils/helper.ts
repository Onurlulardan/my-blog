import { FinalPost } from "@/components/editor";
import { PostDetails } from "./types";

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
