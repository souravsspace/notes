import { AiFillBug } from "react-icons/ai"
import { Separator } from "./ui/separator"
import Link from "next/link"
import NavbarButton from "./NavbarButton"

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

   return (
      <nav className="pt-5 sticky top-0 backdrop-blur-md z-50">
         <div className="container flex justify-between items-center">
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
            <section className="flex gap-x-1 items-center">
               <NavbarButton />
            </section>
         </div>
         <Separator className="my-5" />
      </nav>
   )
}
