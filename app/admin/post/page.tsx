"use client";
import { NextPage } from "next";
import AdminLayOut from "@/components/layout/adminLayout";
import PostCard from "@/components/common/postcard";
import useSWR from 'swr'; 
import axios from "axios";
import { PostDetails } from "@/utils/types";



interface Props {
    post: PostDetails
}

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

const Post: NextPage<Props> = () => {
    let pageNumber = 0;
    const limit = 9;

    const { data, error } = useSWR(`/api/posts?limit=${limit}&pageNumber=${pageNumber}`, fetcher); 
    let post: PostDetails[] = data?.posts;
    
    if (error) return <div>Failed to load post</div>
    if (!data) return <div>Loading...</div>


    console.log(post)

    return (
        <AdminLayOut>
            <div className="max-w-4xl mx-auto p-3">
                <div className="grid grid-cols-3 gap-4">
                    {post && post.map((postItem) => {
                        return (
                            <PostCard key={postItem.slug} post={postItem} onDeleteClick={() => {}} />
                        )
                    })}
                </div>
            </div>
        </AdminLayOut>
    )
}

export default Post
