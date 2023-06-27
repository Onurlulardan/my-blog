"use client";
import { NextPage } from "next";
import Editor from "@/components/editor";
import AdminLayOut from "@/components/layout/adminLayout";

interface Props {}

const Create: NextPage<Props> = async () => {
    return (
        <AdminLayOut title={'New Post'}>
            <div className="max-w-4xl mx-auto">
                <Editor onSubmit={(post) => console.log(post)} />
            </div>
        </AdminLayOut>
    )
}

export default Create
