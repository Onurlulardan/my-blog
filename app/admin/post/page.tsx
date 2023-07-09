"use client";
import InfinityScrollPosts from "@/components/common/infinitescrollpost";
import { NextPage } from "next";
import AdminLayOut from "@/components/layout/adminLayout";
import useSWR from "swr";
import axios from "axios";
import { PostDetails } from "@/utils/types";
import { useState, useEffect, useCallback } from "react";
import { filterPosts } from "@/utils/helper";

interface Props {}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Post: NextPage<Props> = () => {
  let pageNumber = 0;
  const limit = 9;

  const { data, error } = useSWR(
    `/api/posts?limit=${limit}&pageNumber=${pageNumber}`,
    fetcher
  );

  const [post, setPost] = useState<PostDetails[]>([]);
  const [hasMorePost, setHasMorePost] = useState(post.length >= limit);


  useEffect(() => {
    if (data?.posts) {
      setPost(data.posts);
    }
  }, [data]);

  const fetchMorePost = useCallback(async () => {
    try {
      pageNumber++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${post.length}`
      );
      if (data.posts.length < limit) {
        setPost((oldPosts) => [...oldPosts, ...data.posts]);
        setHasMorePost(false);
      } else {
        setPost((oldPosts) => [...oldPosts, ...data.posts]);
      }
    } catch (error) {
      setHasMorePost(false);
      console.log(error);
    }
  }, [pageNumber, post]);

  if (error) return <div>Failed to load post</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <AdminLayOut>
        <InfinityScrollPosts
          hasMore={hasMorePost}
          next={fetchMorePost}
          dataLength={post.length}
          post={post}
          showControls
          onPostRemoved={(posts) => setPost(filterPosts(post, posts as any))}
        />
      </AdminLayOut>
    </>
  );
};

export default Post;
