'use server'

import { getServerSession } from "next-auth"
import { prisma } from "./db"
import { authOptions } from "./options"

export async function storeUrlToDb(fileName: string): Promise<number> {
    const public_R2_URL = `https://pub-56504bb1448d4106825f78e87af791b6.r2.dev/${fileName}`
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        }
    })

    const document = await prisma.document.create({
        data: {
            name: fileName,
            url: public_R2_URL,
            userId: user!.id
        }
    })

    return document.id;
}