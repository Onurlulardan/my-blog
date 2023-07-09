"use client";
import React, { FC, ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "@/components/common/postcard";
import { PostDetails } from "@/utils/types";
import ConfirmModal from "./confirmModal";
import axios from "axios";

type Props = {
  post: PostDetails[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onPostRemoved(post: PostDetails[]): void;
};

const InfinityScrollPosts: FC<Props> = ({
  post,
  showControls,
  dataLength,
  hasMore,
  loader,
  next,
  onPostRemoved,
}): JSX.Element => {
  const [showconfirmModal, setShowConfirmModal] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetails | null>(null);
  const defaultLoader = (
    <div className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      Loading...
    </div>
  );

  const handleOnDeleteClick = (post: PostDetails[]) => {
    setPostToRemove(post as any);
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();
    setShowConfirmModal(false);
    setRemoving(true);

    const { data } = await axios.delete(`/api/posts/${postToRemove._id}`);

    if (data.removed) onPostRemoved(postToRemove as any);

    setRemoving(false);
  };

  return (
    <>
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
                    onDeleteClick={() => {
                      handleOnDeleteClick(postItem as any);
                    }}
                    controls={showControls}
                  />
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
      <ConfirmModal
        visible={showconfirmModal}
        onClose={handleDeleteCancel}
        onCancel={handleDeleteCancel}
        onConfirm={() => {
          handleDeleteConfirm();
        }}
        title="Are You Sure?"
        subTitle="This action will remove this post permanently!"
        busy={removing}
      />
    </>
  );
};

export default InfinityScrollPosts;
