"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSeparator,
   MenubarShortcut,
   MenubarTrigger,
} from "@/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Cloud, Github, LifeBuoy, LogOut } from "lucide-react"

export default function NavbarButton() {
   const session = useSession()
   if (session.status === "authenticated")
      return (
         <Menubar className="!border-none">
            <MenubarMenu>
               <MenubarTrigger>
                  <Avatar>
                     {session.data?.user?.image && (
                        <AvatarImage alt={session.data?.user?.name as string} />
                     )}
                     <AvatarFallback>
                        {session.data?.user?.name?.slice(0, 2).toUpperCase()}
                     </AvatarFallback>
                  </Avatar>
               </MenubarTrigger>
               <MenubarContent className="!mr-2">
                  <MenubarItem>
                     <Github className="mr-2 h-4 w-4" />
                     <Link
                        href="https://github.com/souravsspace"
                        target="_blank"
                     >
                        GitHub
                     </Link>
                  </MenubarItem>
                  <MenubarItem disabled>
                     <LifeBuoy className="mr-2 h-4 w-4" />
                     <span>Support</span>
                  </MenubarItem>
                  <MenubarItem disabled>
                     <Cloud className="mr-2 h-4 w-4" />
                     <span>Coming soon..</span>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => signOut()}>
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Log out</span>
                     <MenubarShortcut>⇧⌘Q</MenubarShortcut>
                  </MenubarItem>
               </MenubarContent>
            </MenubarMenu>
         </Menubar>
      )
   return (
      <>
         <Button variant="secondary">
            <Link href="/register">Register</Link>
         </Button>
         <Button>
            <Link href="/login">Login</Link>
         </Button>
      </>
   )
}
