import prisma from "@/prisma/client"
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "@/validation/zod"

export const options: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: {
               label: "Email:",
               type: "email",
               placeholder: "your@email.com",
            },
            password: {
               label: "Password:",
               type: "password",
               placeholder: "********",
            },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null

            const credentialsUser = loginSchema.safeParse(credentials)
            if (!credentialsUser.success) return null

            const user = await prisma.user.findUnique({
               where: {
                  email: credentialsUser.data.email,
               },
            })
            if (!user) return null

            const isPasswordValid = await compare(
               credentialsUser.data.password,
               user.password
            )
            if (!isPasswordValid) return null

            return user
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         // passing user object to jwt will make it available in session
         if (user) {
            return {
               ...token,
               id: user.id,
               name: user.name,
               email: user.email,
            }
         }
         return token
      },
      async session({ session, token }) {
         // passing user object to session will make it available in useSession hook
         return {
            ...session,
            user: {
               id: token.id,
               name: token.name,
               email: token.email,
            },
         }
      },
   },
   session: {
      strategy: "jwt",
   },
   pages: {
      signIn: "/login",
   },
   secret: process.env.NEXTAUTH_SECRET,
}
