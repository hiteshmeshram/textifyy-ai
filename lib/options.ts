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
        async signIn({user}) {
          const existinguser = await prisma.user.findUnique({
            where: {
              email: user.email!
            }
          })

          if (!existinguser) {
            const newUser = await prisma.user.create({
              data: {
                name: user.name!,
                email: user.email!
              }
            })
            user.id = newUser.id.toString();  
          } else {
            user.id = existinguser.id.toString();
          }

            return true;
        },

        async jwt({token, user}) {
           if (user) {
            token.id = user.id;
           }
          return token
        },
        async session({session, token, user}) {
          return session;
        }     
      }
}