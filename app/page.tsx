"use client";
import { NextPage } from "next";
import DefaultLayout from "@/components/layout/defaultLayout";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PostDetails, UserProfile } from "@/utils/types";
import useSWR from "swr";
import InfinityScrollPosts from "@/components/common/infinitescrollpost";
import { useSession } from "next-auth/react";
import { filterPosts } from "@/utils/helper";

interface Props {}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Home: NextPage = () => {
  const [hasMorePost, setHasMorePost] = useState(true);
  let pageNumber = 0;
  const limit = 9;
  const session = useSession();
  const profile = session.data?.user as UserProfile;
  const isAdmin = profile && profile.role === "admin";

  const { data, error } = useSWR(
    `/api/posts?limit=${limit}&pageNumber=${pageNumber}`,
    fetcher
  );

  const [post, setPost] = useState<PostDetails[]>([]);

  useEffect(() => {
    if (data?.posts) {
      setPost(data.posts);
    }
  }, [data]);

  const fetchMorePost = useCallback(async () => {
    try {
      pageNumber++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&pageNumber=${pageNumber}`
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
    <DefaultLayout>
      <div className="p-20">
        <InfinityScrollPosts
          hasMore={hasMorePost}
          next={fetchMorePost}
          dataLength={post.length}
          post={post}
          showControls={isAdmin}
          onPostRemoved={(posts) => setPost(filterPosts(post, posts as any))}
        />
      </div>
    </DefaultLayout>
  );
};

export default Home;
