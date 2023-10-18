import { Alert, AlertDescription } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

type Props = {
   message: string | undefined
}

export default function TheAlert({ message }: Props) {
   return (
      <Alert variant="destructive" className="mb-3">
         <Terminal className="h-4 w-4" />
         <AlertDescription>{message}</AlertDescription>
      </Alert>
   )
}
