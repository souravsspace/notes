"use client"

import { AiFillBug } from "react-icons/ai"
import { Separator } from "./ui/separator"
import Link from "next/link"
import NavbarButton from "./NavbarButton"
import { useSession } from "next-auth/react"

export default function NavBar() {
   const NavLinks = [
      {
         title: "Dashboard",
         href: "/",
      },
      {
         title: "Notes",
         href: "/notes",
      },
   ]

   const session = useSession()

   return (
      <nav className="pt-5 sticky top-0 backdrop-blur-md z-50">
         <div
            className={`${
               session.status === "authenticated"
                  ? "flex-row"
                  : "flex-col-reverse"
            } container flex justify-between items-center gap-3 md:flex-row`}
         >
            <section className="flex gap-x-6 items-center">
               <Link
                  className="text-zinc-500 hover:text-zinc-800 transition-all text-2xl"
                  href="/"
               >
                  <AiFillBug />
               </Link>
               {NavLinks.map((link, index) => (
                  <Link
                     className="text-zinc-500 hover:text-zinc-800 transition-all"
                     href={link.href}
                     key={index}
                  >
                     {link.title}
                  </Link>
               ))}
            </section>
            <section className="flex gap-2 items-center">
               <NavbarButton />
            </section>
         </div>
         <Separator className="my-5" />
      </nav>
   )
}
