import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";
// import { prisma } from "./db/client";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async jwt({token, user}) {
           
          return token
        },
        async signIn({user}) {
          const existinguser = await prisma.user.findUnique({
            where: {
              email: user.email!
            }
          })

          if (existinguser) return true;

          await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!
            }
          })
            return true;
        }
      }
}