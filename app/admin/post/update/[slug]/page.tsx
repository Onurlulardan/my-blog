"use client";
import { NextPage } from "next";
import Editor, { FinalPost } from "@/components/editor";
import AdminLayOut from "@/components/layout/adminLayout";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { generateFormData } from "@/utils/helper";
import axios from "axios";
import NotFound from "@/app/not-found";
import Loading from "@/components/common/loading";

interface UpdatedPost {
  id: string;
  slug: string;
  post: FinalPost;
}

interface Props {
  params: UpdatedPost;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Update: NextPage<Props> = ({ params }) => {
  const slug = params.slug;

  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    title: "",
    content: "",
    thumbnail: "",
    tags: "",
    meta: "",
    slug: "",
  });

  const { data, error } = useSWR(`/api/posts?slug=${slug}`, fetcher);

  useEffect(() => {
    if (data?.post) {
      const { _id, title, content, thumbnail, tags, meta } = data.post;
      setUpdatedPost({
        id: _id,
        title,
        content,
        tags: tags.join(","),
        thumbnail: thumbnail?.url || "",
        slug: slug as any,
        meta,
      });
    }
  }, [data]);

  const handleSubmit = async (post: FinalPost) => {
    try {
      const formdata = generateFormData(post);

      const { data } = await axios.patch("/api/posts/" + post.id, formdata);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  if (error) return <NotFound />;
  if (!data) return <Loading />;

  return (
    <AdminLayOut title="Update">
      <div className="max-w-4xl mx-auto">
        <Editor
          initialValue={updatedPost}
          onSubmit={(post) => handleSubmit(post)}
          btnTitle="Update"
        />
      </div>
    </AdminLayOut>
  );
};

export default Update;
