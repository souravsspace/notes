import Link from "next/link"
import { Icons } from "./ui/icons"
import { Separator } from "./ui/separator"

export default function Footer() {
   return (
      <footer>
         <Separator className="my-5" />
         <main className="mb-5 container flex justify-between items-center flex-col md:flex-row gap-2">
            <h1 className="text-center">
               All copyrights reserved to{" "}
               <span className="cursor-pointer underline text-zinc-500 hover:text-zinc-800 transition-all">
                  @souravspace
               </span>
            </h1>
            <section className="flex items-center justify-center gap-x-4">
               <span className="cursor-pointer underline text-zinc-500 hover:text-zinc-800 mr-5 transition-all">
                  @souravukil
               </span>
               <Link href="https://github.com/souravsspace" target="_blank">
                  <Icons.gitHub className="h-5 w-5 text-zinc-500 hover:text-zinc-800 cursor-pointer" />
               </Link>
               <Icons.google className="h-5 w-5 text-zinc-500 hover:text-zinc-800 cursor-pointer" />
            </section>
         </main>
      </footer>
   )
}
