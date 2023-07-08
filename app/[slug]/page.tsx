import DefaultLayout from "@/components/layout/defaultLayout";
import { notFound } from "next/navigation";
import Post from "@/models/post";
import dbConnect from "@/lib/dbConnect";
import parse from "html-react-parser";
import Image from "next/image";
import dateFormat from "dateformat";

interface Props {
  id: string;
  title: string;
  content: string;
  meta: string;
  tags: string[];
  slug: string;
  thumbnail: string;
  createdAt: string;
}

const getPostBySlug = async (slug: string) => {
  await dbConnect();
  const post = await Post.findOne({ slug });
  if (!post) return notFound();
  return post;
};

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);
  const { _id, title, meta, thumbnail, slug, tags, createdAt, content } = post;

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="pb-20">
        {thumbnail ? (
          <div className="relative aspect-video">
            <Image src={thumbnail.url} fill alt={title} />
          </div>
        ) : null}
        <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2"> {title} </h1>
        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
          {tags.map((t, index) => (
            <span key={index}> {t} </span>
          ))}
          <span> {dateFormat(createdAt, "d-mmm-yyyy")} </span>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(content)}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;
