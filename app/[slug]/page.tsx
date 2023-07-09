"use client";
import DefaultLayout from "@/components/layout/defaultLayout";
import parse from "html-react-parser";
import Image from "next/image";
import dateFormat from "dateformat";
import { useAuth } from "@/hooks/useAuth";
import CommentForm from "@/components/common/commentform";
import { GithubAuthButton } from "@/components/button";
import useSWR from "swr";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface finalProps {
  id: string;
  title: string;
  content: string;
  meta: string;
  tags: string[];
  slug: string;
  thumbnail: string;
  createdAt: string;
}

interface UpdatedPost {
  id: string;
  slug: string;
  post: finalProps;
}

interface Props {
  params: UpdatedPost;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const SinglePost: NextPage<Props> = ({ params }) => {
  const paramsSlug = params.slug;
  const profile = useAuth();

  const { data, error } = useSWR(`/api/posts?slug=${paramsSlug}`, fetcher);

  const [post, setPost] = useState<finalProps>();

  useEffect(() => {
    if (data?.post) {
      setPost(data.post);
    }
  }, [data]);

  if (error) return <div>Failed to load post</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <DefaultLayout title={post?.title} desc={post?.meta}>
      <div>
        {post?.thumbnail ? (
          <div className="relative aspect-video">
            <Image src={post?.thumbnail} fill alt={post?.title} />
          </div>
        ) : null}
        <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2">
          {" "}
          {post?.title}{" "}
        </h1>
        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
          {post?.tags.map((t, index) => (
            <span key={index}> {t} </span>
          ))}
          <span> {dateFormat(post?.createdAt, "d-mmm-yyyy")} </span>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(post?.content ? post.content : "")}
        </div>

        <div className="py-20">
          {profile ? (
            <CommentForm title="Add Comment" />
          ) : (
            <div className="flex flex-col items-end space-y-2">
              <h3 className="text-secondary-dark text-xl font-semibold">
                log in to add commnet
              </h3>
              <GithubAuthButton />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;
