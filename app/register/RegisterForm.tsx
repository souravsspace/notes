"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { createAccountSchema } from "@/validation/zod"
import { useForm } from "react-hook-form"
import {
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { formOptions } from "./formOptions"
import TheAlert from "@/components/TheAlert"
import Link from "next/link"
import { FormFieldData } from "./FormFieldData"
import axios from "axios"
import { useState } from "react"
import Loading from "@/components/Loading"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

type USER = z.infer<typeof createAccountSchema>

export default function RegisterForm() {
   const form = useForm()
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<USER>({
      resolver: zodResolver(createAccountSchema),
   })

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [success, setSuccess] = useState(false)

   const router = useRouter()

   const onSubmit = handleSubmit(async (data) => {
      try {
         setLoading(true)
         await axios.post("/api/register", data)
         setSuccess(true)
      } catch (error) {
         setLoading(false)
         setError("Something went wrong, please try again later!")
      }
      setLoading(false)
      setError("")
      setTimeout(() => {
         router.push("/login")
      }, 1500)
   })

   const session = useSession()
   if (session.status === "authenticated") {
      router.push("/")
      return (
         <div className="flex justify-center items-center min-h-[20]">
            <Loading />
         </div>
      )
   }

   return (
      <Form {...form}>
         <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
               Enter your information to create an account.
            </CardDescription>
         </CardHeader>
         <div>
            {(errors.name ||
               errors.email ||
               errors.password ||
               errors.confirmPassword ||
               error !== "") && (
               <TheAlert
                  message={
                     errors.name?.message ||
                     errors.email?.message ||
                     errors.password?.message ||
                     errors.confirmPassword?.message ||
                     error
                  }
               />
            )}
            {success && (
               <Alert className="mb-3 bg-green-50">
                  <Terminal className="h-4 w-4 !text-green-600" />
                  <AlertDescription className="text-green-600">
                     Account created successfully!
                  </AlertDescription>
               </Alert>
            )}
         </div>
         <form onSubmit={onSubmit} className="space-y-8">
            <CardContent>
               {formOptions.map(({ name, type, label, placeholder }, index) => (
                  <FormFieldData
                     key={index}
                     control={control}
                     name={name}
                     type={type}
                     label={label}
                     placeholder={placeholder}
                  ></FormFieldData>
               ))}
            </CardContent>
            <CardFooter className="flex justify-end gap-1">
               <Button disabled={loading} type="button" variant="secondary">
                  <Link href="/">Back</Link>
               </Button>
               <Button disabled={loading} type="submit">
                  Register
                  {loading && (
                     <div className="scale-[0.7]">
                        <Loading />
                     </div>
                  )}
               </Button>
            </CardFooter>
         </form>
      </Form>
   )
}
