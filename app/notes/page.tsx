import FullPage from "./FullPage"

export function generateMetadata() {
   return {
      title: "All Notes",
   }
}

export default function Notes() {
   return (
      <main className="flex gap-5 w-full md:flex-row flex-col mt-[3rem] mb-[4rem]">
         <FullPage />
      </main>
   )
}
