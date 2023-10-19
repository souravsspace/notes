import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import { ThemeProvider } from "@/components/theme-provider"
import Provider from "@/lib/Provider"
import "@/style/tailwind.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Notes",
   description: "Notes",
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <Provider>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  <NavBar />
                  <main className="mx-auto px-3 md:px-8 py-2 md:py-6">
                     {children}
                  </main>
                  <Footer />
               </ThemeProvider>
            </Provider>
         </body>
      </html>
   )
}
