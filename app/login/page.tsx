import { Card } from "@/components/ui/card"
import { Metadata } from "next"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
   title: "Login",
}

export default function Login() {
   return (
      <Card className="mx-auto max-w-md md:mt-28">
         <LoginForm />
      </Card>
   )
}
