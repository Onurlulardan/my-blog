import { NextApiResponse, NextApiRequest } from "next";
import multer from "multer";
import cloudinary from "@/lib/cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { MulterFile } from "@/pages/api/image";

export interface NextApiRequestWithFiles extends NextApiRequest {
    files: MulterFile[];
}

interface UploadResult {
    files: MulterFile[];
    body: any; // burada daha spesifik bir tip de belirtebilirsiniz.
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: 'dev-blogs',
            public_id: `${Date.now()}-${file.originalname}`,
        };
    },
});

const upload = multer({ storage });

export const readFile = async (req: NextApiRequestWithFiles, res: NextApiResponse): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    upload.any()(req as any, res as any, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ files: req.files, body: req.body });
      }
    });
  });
};