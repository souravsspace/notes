import { Card } from "@/components/ui/card"
import { Metadata } from "next"
import RegisterForm from "./RegisterForm"

export const metadata: Metadata = {
   title: "Register",
}

export default function Register() {
   return (
      <Card className="mx-auto max-w-md md:mt-14">
         <RegisterForm />
      </Card>
   )
}
