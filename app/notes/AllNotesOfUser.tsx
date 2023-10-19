"use client"

import Loading from "@/components/Loading"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
} from "@/components/ui/card"
import axios from "axios"
import { Terminal, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
   userNote: NOTE_TYPE[]
   setRender: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AllNotesOfUser({ userNote, setRender }: Props) {
   const [loading, setLoading] = useState(false)
   const [success, setSuccess] = useState(false)

   const session = useSession()

   // const [userNote, setUserNote] = useState<NOTE_TYPE[]>([])

   // useEffect(() => {
   //    axios
   //       .get("/api/users_notes")
   //       .then((res) => {
   //          const notes: NOTE_TYPE[] = res.data
   //          const user_note = notes.filter((note) => note.userId === userId)
   //          setUserNote(user_note)
   //       })
   //       .finally(() => {
   //          setLoading(false)
   //       })
   //       .catch((err) => {
   //          console.log(err)
   //       })
   // }, [userId])

   // const fetchNotes = useCallback(async () => {
   //    const data = await fetch("/api/users_notes", {
   //       cache: "no-cache",
   //    })
   //    const notes: NOTE_TYPE[] = await data.json()
   //    const user_note = notes.filter((note) => note.userId === userId)
   //    setUserNote(user_note)
   // }, [userId])

   // useEffect(() => {
   //    fetchNotes()
   // }, [fetchNotes])

   const router = useRouter()
   if (session.status === "unauthenticated") {
      router.push("/")
      return (
         <div className="flex justify-center items-center min-h-[20]">
            <Loading />
         </div>
      )
   }

   async function deleteNote(id: string) {
      try {
         setLoading(true)
         await axios.delete("api/delete_note", { data: { id: id } })
         setSuccess(true)
         setRender((prev) => !prev)
      } catch (error) {
         console.log("error - " + error)
      }
      setTimeout(() => {
         setSuccess(false)
      }, 1500)
   }

   return (
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
         {success && (
            <Alert className="mb-3 bg-green-50">
               <Terminal className="h-4 w-4 !text-green-600" />
               <AlertDescription className="text-green-600">
                  Deleted successfully!
               </AlertDescription>
            </Alert>
         )}
         {userNote.map((note) => (
            <Card key={note.id}>
               <CardHeader className="flex justify-between items-center flex-row">
                  <h2 className="text-xl font-semibold">{note.title}</h2>
                  <button
                     onClick={() => deleteNote(note.id)}
                     disabled={loading}
                  >
                     <Trash2 className="w-5 h-5 hover:text-primary cursor-pointer" />
                  </button>
               </CardHeader>
               <CardContent>
                  <CardDescription>{note.description}</CardDescription>
               </CardContent>
            </Card>
         ))}
      </main>
   )
}
