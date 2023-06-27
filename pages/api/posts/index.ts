import dbConnect from "@/lib/dbConnect";
import { readFile } from "@/lib/readFile";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import { NextApiHandler } from "next";
import { NextApiRequestWithFiles } from "@/lib/readFile";
import Post from "@/models/post";
import cloudinary from "@/lib/cloudinary";


export const config = {
    api: {
        bodyParser: false
    }
}

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET': {
                await dbConnect();
                res.json({ ok: true });
            }
            break;
        case 'POST': return createNewPost(req, res);
        default:
            break;
    }
};

const createNewPost: NextApiHandler = async (req, res) => {
    const { files, body } = await readFile(req as NextApiRequestWithFiles, res);
    
    let tags = [];
    if (body.tags) tags = JSON.parse(body.tags);
    
    const error = validateSchema(postValidationSchema, {...body, tags});
    if (error) return res.status(400).json({ error });

    const { title, content, slug, meta } = body;

    await dbConnect();
    const alreadyExist = await Post.findOne({ slug });
    if (alreadyExist) return res.status(400).json({ error:  "Slug need to be uniqe!"});

    const newPost = new Post({
        title,
        content,
        slug,
        meta,
        tags
    });

    if (files && files[0]) {
        const { path: url, filename: public_id } = files[0];
        newPost.thumbnail = { url, public_id }
    }

    await newPost.save();

    res.json({post: newPost});

}

export default handler;