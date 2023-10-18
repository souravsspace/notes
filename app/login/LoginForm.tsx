"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { loginSchema } from "@/validation/zod"
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
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormFieldData } from "./FormFieldData"
import { useState } from "react"
import Loading from "@/components/Loading"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

type USER = z.infer<typeof loginSchema>

export default function LoginForm() {
   const form = useForm()
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<USER>({
      resolver: zodResolver(loginSchema),
   })

   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const [success, setSuccess] = useState(false)

   const onSubmit = handleSubmit(async (data) => {
      const { email, password } = data
      try {
         setLoading(true)
         const sign = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
         })
         if (sign?.ok) {
            setSuccess(true)
            return setTimeout(() => {
               router.push("/")
            }, 1500)
         }
         if (sign?.error) {
            setLoading(false)
            return setError("Something went wrong, please try again later!")
         }
      } catch (error) {
         setLoading(false)
         setError("Something went wrong, please try again later!")
      }
      setLoading(false)
   })

   const router = useRouter()
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
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
               Enter your information to login your account.
            </CardDescription>
         </CardHeader>
         {success && (
            <Alert className="mb-3 bg-green-50">
               <Terminal className="h-4 w-4 !text-green-600" />
               <AlertDescription className="text-green-600">
                  Login successful!
               </AlertDescription>
            </Alert>
         )}
         {(errors.email || errors.password || error !== "") && (
            <TheAlert
               message={
                  errors.email?.message || errors.password?.message || error
               }
            />
         )}
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
                  />
               ))}
            </CardContent>
            <CardFooter className="flex justify-end gap-1">
               <Button type="button" variant="secondary">
                  <Link href="/">Back</Link>
               </Button>
               <Button disabled={loading} type="submit">
                  Login
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
