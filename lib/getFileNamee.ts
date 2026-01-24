"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./options"
import { prisma } from "./db";

export async function getFileNamee(chatId: string): Promise<string | void> {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        }
    })
    const document = await prisma.document.findFirst({
        where: {
            id: Number(chatId),
            userId: user!.id 
        }
    })

    if (!document) return;

    return document.name
}