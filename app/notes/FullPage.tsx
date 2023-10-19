"use client"

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import AllNotesOfUser from "./AllNotesOfUser"
import CreatingNote from "./CreatingNote"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function FullPage() {
   const [userNote, setUserNote] = useState<NOTE_TYPE[]>([])
   const [render, setRender] = useState(false)

   const router = useRouter()

   const session = useSession()
   const userId = session.data?.user?.id as string

   const [fetchingDataLoading, setFetchingDataLoading] = useState(false)

   const fetchingData = useCallback(async () => {
      try {
         setFetchingDataLoading(true)
         await axios
            .get(`/api/notes?userId=${userId}`)
            .then((res) => {
               const notes: NOTE_TYPE[] = res.data
               setUserNote(notes)
               setFetchingDataLoading(false)
            })
            .catch((err) => {
               setFetchingDataLoading(false)
               console.log("The error while getting the notes is: ", err)
            })
      } catch (error) {
         setFetchingDataLoading(false)
         console.log("error - " + error)
      }
      setFetchingDataLoading(false)
   }, [userId])

   useEffect(() => {
      // axios
      //    .get(`/api/notes?userId=${userId}`)
      //    .then((res) => {
      //       const notes: NOTE_TYPE[] = res.data
      //       setUserNote(notes)
      //    })
      //    .catch((err) => {
      //       console.log("The error while getting the notes is: ", err)
      //    })
      fetchingData()
   }, [userId, render, fetchingData])

   if (session.status === "authenticated") {
      router.replace(`/notes?userId=${userId}`)
   }

   return (
      <>
         <Card className="min-w-[350px] w-full">
            <CardHeader>
               <CardTitle>All The Notes</CardTitle>
               <CardDescription>
                  See all of your notes, that you have created!
               </CardDescription>
            </CardHeader>
            <CardContent>
               <AllNotesOfUser
                  userNote={userNote}
                  setRender={setRender}
                  fetchingDataLoading={fetchingDataLoading}
               />
            </CardContent>
         </Card>
         <div>
            <CreatingNote setRender={setRender} />
         </div>
      </>
   )
}
