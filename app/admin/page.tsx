import AdminLayOut from "@/components/layout/adminLayout";
import { NextPage } from "next";

interface Props {}


const Admin: NextPage<Props> = async () => {
    return (
        <AdminLayOut>
            <div>admin page</div>
        </AdminLayOut>
    )
}

export default Admin
