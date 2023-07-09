type Thumbnail = string | { url: string; public_id: string };

export interface PostDetails {
  _id: string;
  createdAt: string;
  meta: string;
  slug: string;
  tags: string[];
  thumbnail?: Thumbnail;
  title: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  role: "user" | "admin";
}
