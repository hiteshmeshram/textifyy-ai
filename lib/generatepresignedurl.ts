import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function generatepreSignedURL(file: File): Promise<string> {
    const S3 = new S3Client({
        region: "auto", // Required by SDK but not used by R2
        endpoint: process.env.ENDPOINT_R3,
        credentials: {
          accessKeyId: 'process.env.ACCESS_KEY_ID',
          secretAccessKey: 'process.env.SECRET_ACCESS_KEY',
        },
      });
      
      const putUrl = await getSignedUrl(
        S3,
        new PutObjectCommand({
          Bucket: "textiffy-ai",
          Key: file.name,
          ContentType: file.type,
        }),
        { expiresIn: 3600 },
      );

      console.log(putUrl)
      return putUrl;
}