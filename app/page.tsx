"use client"
import Loading from "@/components/Loading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"

export default function Home() {
   const session = useSession()

   if (session.status === "loading") {
      return (
         <div className="flex justify-center items-center min-h-[20]">
            <Loading />
         </div>
      )
   }
   if (session.status === "unauthenticated") {
      return (
         <div className="flex justify-center items-center min-h-[68vh]">
            <h1 className="text-center text-xl">Not Authenticated</h1>
         </div>
      )
   }
   return (
      <main className="flex flex-col justify-center items-center max-h-[40vh] mt-24 mb-[8.5rem]">
         <Card>
            <CardHeader>
               <CardTitle className="text-center">
                  Welcome back,{" "}
                  <span className="capitalize">{session.data?.user?.name}</span>
                  !
               </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center gap-2">
               <Avatar className="w-40 h-40">
                  {session.data?.user?.image && (
                     <AvatarImage alt={session.data?.user?.name as string} />
                  )}
                  <AvatarFallback>
                     {session.data?.user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <h3>{session.data?.user?.email}</h3>
            </CardContent>
         </Card>
      </main>
   )
}
