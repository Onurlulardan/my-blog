"use client";
import { NextPage } from "next";
import Editor, { FinalPost } from "@/components/editor";
import AdminLayOut from "@/components/layout/adminLayout";
import axios from "axios";
import { generateFormData } from "@/utils/helper";

interface Props {}

const Create: NextPage<Props> = async () => {
  const handlePostSubmit = async (post: FinalPost) => {
    try {
      const formdata = generateFormData(post);

      const { data } = await axios.post("/api/posts", formdata);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AdminLayOut title={"New Post"}>
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={(post) => handlePostSubmit(post)} />
      </div>
    </AdminLayOut>
  );
};

export default Create;
