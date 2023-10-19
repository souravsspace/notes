import prisma from "@/prisma/client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
   const url = new URL(request.url)
   const userId = url.searchParams.get("userId")

   if (!userId)
      return NextResponse.json({ error: "User id not found" }, { status: 404 })

   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
   })
   if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 })

   const notes = await prisma.notes.findMany({
      where: {
         userId: userId,
      },
   })
   if (!notes || notes.length === 0)
      return NextResponse.json({ error: "Notes not found" }, { status: 404 })

   return NextResponse.json(notes, { status: 200 })
}
