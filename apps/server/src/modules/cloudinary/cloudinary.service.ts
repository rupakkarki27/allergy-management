import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { Readable } from 'stream';
import { Config } from '../../common/config';

cloudinary.config({
  cloud_name: Config.CLOUDINARY_CLOUD_NAME,
  api_key: Config.CLOUDINARY_API_KEY,
  api_secret: Config.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  constructor() {}

  /**
   * Method to upload the file from form data to cloudinary
   * @param file
   * @returns
   */
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      // create a new upload stream for cloudinary
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      // from our buffer create a new stream
      const stream = Readable.from(file.buffer);

      // pipe the stream to our upload stream
      stream.pipe(upload);
    });
  }
}
