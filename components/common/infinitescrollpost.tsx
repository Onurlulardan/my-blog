"use client";
import React, { FC, ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "@/components/common/postcard";
import { PostDetails } from "@/utils/types";

type Props = {
  post: PostDetails[];
  showControls?: boolean;
  hasMore: boolean,
  next(): void,
  dataLength: number,
  loader?: ReactNode
};



const InfinityScrollPosts: FC<Props> = ({ post, showControls, dataLength, hasMore, loader, next }): JSX.Element => {
  

  const defaultLoader = <div className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">Loading...</div>;

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={next}
      dataLength={dataLength}
      loader={loader || defaultLoader}
    >
      <div className="max-w-4xl mx-auto p-3">
        <div className="grid grid-cols-3 gap-4">
          {post &&
            post.map((postItem) => {
              return (
                <PostCard
                  key={postItem.slug}
                  post={postItem}
                  onDeleteClick={() => {}}
                  controls={showControls}
                />
              );
            })}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfinityScrollPosts;
