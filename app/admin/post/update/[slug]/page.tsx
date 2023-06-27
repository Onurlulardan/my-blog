// "use client";
// import { NextPage } from "next";
// import Editor, { FinalPost } from "@/components/editor";
// import dbConnect from "@/lib/dbConnect";
// import Post from "@/models/post";
// import { notFound } from "next/navigation";
// import AdminLayOut from "@/components/layout/adminLayout";
// import { useEffect } from "react";

// interface Params {
//   slug: string[],
//   id: string,
// }

// interface Props {
//   params: Params,
//   postProps: FinalPost
// }


// const Update: NextPage<Props> =  ({ params, postProps }) => {
//   console.log("==> ", params.slug);
//   const slug = params.slug;

//   useEffect(() => {
//     const getData = async () => {
//       await dbConnect();
//       const post = await Post.findOne({slug});
//       if(!post) return notFound();

//       const { _id, title, content, thumbnail, tags,  } = post;

//     }
//     getData();
//   }, [])

  

//   return (
//     <AdminLayOut>
//       <Editor initialValue={postProps} onSubmit={() => {}} btnTitle="Update" />
//     </AdminLayOut>
//     )
// };

// export default Update;
