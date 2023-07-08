import { PostDetails } from "@/utils/types";
import Image from "next/image";
import React, { FC } from "react";
import dateformat from "dateformat";
import Link from "next/link";

interface Props {
  post: PostDetails;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + "...";
};

const PostCard: FC<Props> = ({
  post,
  busy,
  controls = false,
  onDeleteClick,
}): JSX.Element => {
  const { createdAt, meta, slug, tags, title, thumbnail } = post;
  const imageUrl = typeof thumbnail === "string" ? thumbnail : thumbnail?.url;

  return (
    <div className="rounded shadow-sm shadow-secondary-dark overflow-hidden  bg-primary dark:bg-primary-dark flex flex-col h-full">
      <div className="aspect-video relative">
        {!thumbnail ? (
          <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold">
            No Image
          </div>
        ) : (
          <Image src={imageUrl as string} alt="Thumbnail" fill />
        )}
      </div>

      <Link href={"/" + slug}>
        <div className="p-2 flex-1 flex flex-col ">
          <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
            <div className="flex items-center space-x-1">
              {tags.map((tag, index) => {
                return <span key={index}> #{tag} </span>;
              })}
            </div>
            <span> {dateformat(createdAt, "d-mmm-yyyy")} </span>
          </div>
        </div>
        <h1 className="font-semibold text-primary-dark dark:text-primary">
          {" "}
          {trimText(title, 50)}{" "}
        </h1>
        <p className="text-secondary-dark-dark dark:text-secondary-light">
          {" "}
          {trimText(meta, 70)}{" "}
        </p>
      </Link>

      {controls && (
        <div className="flex justify-end items-center h-8 mt-auto space-x-4  text-primary-dark dark:text-primary">
          {busy ? (
            <span className="animate-pulse "> Removing </span>
          ) : (
            <>
              <Link
                href={"/admin/post/update/" + slug}
                className="hover:underline"
              >
                {" "}
                Edit{" "}
              </Link>
              <button onClick={onDeleteClick} className="hover:underline">
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
