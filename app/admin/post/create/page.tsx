"use client";
import { NextPage } from "next";
import Editor, { FinalPost } from "@/components/editor";
import AdminLayOut from "@/components/layout/adminLayout";
import axios from "axios";

interface Props {}

const Create: NextPage<Props> = async () => {

    const handlePostSubmit = async (post: FinalPost) => {
        try {
            const formdata = new FormData();
            for (let key in post) {
                const value = (post as any)[key];
                if (key === "tags" && value.trim()) {
                    const tags = value
                        .split(',')
                        .map((tag: string) => tag.trim())
                        .filter(Boolean);
                    formdata.append("tags", JSON.stringify(tags));
                } else {
                    formdata.append(key, value);
                }
            }
    
            const { data } = await axios.post('/api/posts', formdata);
            console.log(data);
        } catch (error: any) {
            console.log(error.response.data);
        }
    }

    return (
        <AdminLayOut title={'New Post'}>
            <div className="max-w-4xl mx-auto">
                <Editor onSubmit={(post) => handlePostSubmit(post)} />
            </div>
        </AdminLayOut>
    )
}

export default Create
