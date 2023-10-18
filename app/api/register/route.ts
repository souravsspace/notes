import prisma from "@/prisma/client"
import { createAccountSchema } from "@/validation/zod"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
   const body = await request.json()

   const validation = createAccountSchema.safeParse(body)
   if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
   }
   const { name, email, password }: Partial<USER_TYPE> = validation.data

   if (!name || !email || !password) {
      return NextResponse.json("Please fill all the fields", { status: 400 })
   }

   const exixtingUser = await prisma.user.findUnique({
      where: {
         email: email,
      },
   })

   if (exixtingUser?.email === email) {
      return NextResponse.json("User already exists", { status: 400 })
   }

   const hasedPassword = await bcrypt.hash(password, 10)

   try {
      const createUser = await prisma.user.create({
         data: { name: name, email: email, password: hasedPassword },
      })
      return NextResponse.json(createUser, { status: 201 })
   } catch (error) {
      return NextResponse.json("The error is : " + error, { status: 500 })
   }
}
