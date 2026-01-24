'use server'

import { getServerSession } from "next-auth";
import { prisma } from "./db"
import { authOptions } from "./options";

export async function getAllDocuments() {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        }
    })
    const userId = user?.id;
    const documents = await prisma.document.findMany({
        where: {
            userId
        }
    })
    
    return documents;
}