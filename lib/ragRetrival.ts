'use server'
import { PineconeEmbeddings, PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import { prisma } from "./db";
import { use } from "react";

async function getUser() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!
    }
  })
  return user;
}

export async function ragRetrival(query: string, fileName: string) {
    const user = await getUser()
    const embeddings = new PineconeEmbeddings({
        model: "multilingual-e5-large",
      });
      
    const pinecone = new PineconeClient({
        apiKey: process.env.PINECONE_API_KEY!
    });

    const index = pinecone.index(process.env.PINECONE_INDEX!)

      const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: index,
        namespace: user?.email
       
      })

      try {  
        const result = await vectorStore.similaritySearch(query, 4, {
            "fileName": fileName.toString(),
            "userId": user?.id!.toString()
          
        });
        if (!result) return "";
        return JSON.stringify(result);

      } catch(e) {
        console.error(e)
      }

      
}