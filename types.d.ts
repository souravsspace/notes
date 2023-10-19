type USER_TYPE = {
   id: string
   name: string
   email: string
   password: string
   createdAt: Date
   updatedAt: Date
   notes?: NOTE_TYPE[]
}

type NOTE_TYPE = {
   id: string
   title: string
   description: string
   createdAt: Date
   updatedAt: Date
   user?: USER_TYPE
   userId?: string | null
}
