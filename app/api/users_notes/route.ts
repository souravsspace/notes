import prisma from "@/prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
   try {
      const getNotes = await prisma.notes.findMany()
      return NextResponse.json(getNotes, { status: 200 })
   } catch (error) {
      return NextResponse.json(error, { status: 500 })
   }
}
