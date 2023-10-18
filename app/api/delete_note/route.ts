import prisma from "@/prisma/client"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
   const { id }: Partial<NOTE_TYPE> = await request.json()

   if (!id) {
      return NextResponse.json(
         { error: "Please provide a valid note id" },
         { status: 400 }
      )
   }

   const findNote = await prisma.notes.findUnique({ where: { id } })
   if (!findNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
   }

   try {
      await prisma.notes.delete({ where: { id } })
      return NextResponse.json(
         { message: "Note deleted successfully" },
         { status: 200 }
      )
   } catch (error) {
      return NextResponse.json(
         { error: "Something went wrong" },
         { status: 500 }
      )
   }
}
