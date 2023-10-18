"use client"

import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { createNotesSchema } from "@/validation/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import TheAlert from "@/components/TheAlert"
import { createUserOptions } from "./createUserOptions"
import Loading from "@/components/Loading"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CreatingNote() {
   const router = useRouter()

   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const [success, setSuccess] = useState(false)

   const form = useForm()
   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<NOTE_TYPE>({
      resolver: zodResolver(createNotesSchema),
   })

   const onSubmit = handleSubmit(async (data) => {
      const user_data = {
         id: session.data?.user?.id,
         title: data.title,
         description: data.description,
      }
      try {
         setLoading(true)
         await axios.post("api/create_note", user_data)
         setSuccess(true)
      } catch (error) {
         setLoading(false)
         setError("Something went wrong, please try again later!")
      }
      setLoading(false)
      reset({
         title: "",
         description: "",
      })
   })

   const session = useSession()
   if (session.status === "unauthenticated") {
      router.push("/")
      return (
         <div className="flex justify-center items-center min-h-[20]">
            <Loading />
         </div>
      )
   }

   return (
      <Form {...form}>
         <Card className="min-w-[350px]">
            <CardHeader>
               <CardTitle>Create Notes</CardTitle>
               <CardDescription>
                  What area are you wanting to save?
               </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit} className="space-y-2">
               <CardContent>
                  {success && (
                     <Alert className="mb-3 bg-green-50">
                        <Terminal className="h-4 w-4 !text-green-600" />
                        <AlertDescription className="text-green-600">
                           Note saved successfully!
                        </AlertDescription>
                     </Alert>
                  )}
                  {(errors.title || errors.description || error !== "") && (
                     <TheAlert
                        message={
                           errors.title?.message ||
                           errors.description?.message ||
                           error
                        }
                     />
                  )}
                  {createUserOptions.map(
                     ({ name, type, label, placeholder, isDes }, index) => (
                        <FormField
                           key={index}
                           control={control}
                           name={name as any}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>{label}</FormLabel>
                                 <FormControl>
                                    {!isDes ? (
                                       <Input
                                          type={type}
                                          className="!ring-0"
                                          placeholder={placeholder}
                                          {...field}
                                       />
                                    ) : (
                                       <Textarea
                                          className="!ring-0"
                                          placeholder={placeholder}
                                          {...field}
                                       />
                                    )}
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )
                  )}
               </CardContent>
               <CardFooter className="flex justify-end gap-2">
                  <Button
                     type="button"
                     variant="secondary"
                     onClick={() =>
                        reset({
                           title: "",
                           description: "",
                        })
                     }
                  >
                     Reset
                  </Button>
                  <Button disabled={loading} type="submit">
                     Save it!
                     {loading && (
                        <div className="scale-[0.7]">
                           <Loading />
                        </div>
                     )}
                  </Button>
               </CardFooter>
            </form>
         </Card>
      </Form>
   )
}
