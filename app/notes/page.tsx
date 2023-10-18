import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import AllNotesOfUser from "./AllNotesOfUser"
import CreatingNote from "./CreatingNote"

export function generateMetadata() {
   return {
      title: "All Notes",
   }
}

export default function Notes() {
   return (
      <main className="flex gap-5 w-full md:flex-row flex-col mt-[3rem] mb-[4rem]">
         <Card className="min-w-[350px] w-full">
            <CardHeader>
               <CardTitle>All The Notes</CardTitle>
               <CardDescription>
                  See all of your notes, that you have created!
               </CardDescription>
            </CardHeader>
            <CardContent>
               <AllNotesOfUser />
            </CardContent>
         </Card>
         <div>
            <CreatingNote />
         </div>
      </main>
   )
}
