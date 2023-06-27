import { NextPage } from "next";
import AdminLayOut from "@/components/layout/adminLayout";

interface Props {}

const Post: NextPage<Props> = async () => {
    return (
        <AdminLayOut>
            <div> post page</div>
        </AdminLayOut>
    )
}

export default Post
