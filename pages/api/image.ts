import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import cloudinary from "@/lib/cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import fs from 'fs';

        export const config = {
            api: {
                bodyParser: false
            }
        }

        export interface MulterFile {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            size: number;
            destination: string;
            filename: string;
            path: string;
            buffer: Buffer;
        }

        export interface NextApiRequestWithFile extends NextApiRequest {
            file: MulterFile;
        }

        // Multer config
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: (req, file) => {
                return {
                    folder: 'dev-blogs',
                    public_id: `${Date.now()}-${file.originalname}`,
                };
            },
        });

        
        

        const uploadMiddleware = (req: any, res: any) => {
            return new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err) {
                return reject(err)
                }
                resolve(true)
            })
            })
        }

        const upload = multer({ storage });

        const handler: NextApiHandler = async (req, res) => {
        const { method } = req;

        switch (method) {
            case 'POST': return uploadNewImage(req as NextApiRequestWithFile, res);
            case 'GET': return readAllImages(req, res);

            default: return res.status(404).send("Not Found!");
        }
    }

    const uploadNewImage = async (req: NextApiRequestWithFile, res: NextApiResponse) => {
        await uploadMiddleware(req, res)
      
        const imageFile = req.file as any
        if (!imageFile) {
          return res.status(400).json({ error: 'Dosya yok - file' })
        }
        res.json({ images: imageFile.path, src: imageFile.filename })
      }

    const readAllImages: NextApiHandler = async (req, res) => {
        try {
            const { resources } =  await cloudinary.api.resources({
                resource_type: 'image',
                type: 'upload',
                prefix: 'dev-blogs',
            });
    
            const images = resources.map(({secure_url}: any) => ({ src: secure_url }));
    
            res.json({ images });
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }

    }

export default handler;
