import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Props = {
   control: any
   name: string
   label: string
   type: string
   placeholder: string
}

export function FormFieldData({
   control,
   name,
   label,
   type,
   placeholder,
}: Props) {
   return (
      <FormField
         control={control}
         name={name as any}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input
                     type={type}
                     className="!ring-0"
                     placeholder={placeholder}
                     {...field}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
