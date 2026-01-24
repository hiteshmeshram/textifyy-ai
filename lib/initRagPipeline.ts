'use server'

import axios from "axios"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeEmbeddings } from "@langchain/pinecone";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import { prisma } from "./db";


async function getUser() {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        }
    })
    return user;
}
export async function intiRagPipeline(filename: string): Promise<void> {
    const user = await getUser()
    const embeddings = new PineconeEmbeddings({
        model: "multilingual-e5-large",
      });
    const bucketName = "textiffy-ai";
   
    try {
        const url = await getURL(filename, bucketName);
        const res = await axios.get(url, {
            responseType: "arraybuffer"
        })
        
        const loader = new PDFLoader(new Blob([res.data]))
        const docs = await loader.load();
    
        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 })
        const texts = await splitter.splitDocuments(docs);

        const textsWithMetadata = texts.map(text => ({
            ...text,
            metadata: {...text.metadata, fileName: filename, userId: user?.id.toString()}
        }) )

        const pinecone = new PineconeClient({
            apiKey: process.env.PINECONE_API_KEY!
        });

        const index = pinecone.index(process.env.PINECONE_INDEX!)

        const vectorStore = await PineconeStore.fromDocuments(textsWithMetadata, embeddings, {
            pineconeIndex: index,
            namespace: user?.email
            
        })

    } catch(e) {
        console.error(e);
    }
    
}


export async function getURL(filename: string, bucketName: string): Promise<string> {
    const S3 = new S3Client({
        region: "auto", // Required by SDK but not used by R2
        endpoint: process.env.ENDPOINT_R3,
        credentials: {
          accessKeyId: process.env.ACCESS_KEY_ID!,
          secretAccessKey: process.env.SECRET_ACCESS_KEY!,
        },
      });
    const command = new GetObjectCommand({Bucket: bucketName, Key: filename});
    const signedurl = getSignedUrl(S3, command, {expiresIn: 3000});
    return signedurl;
        
}