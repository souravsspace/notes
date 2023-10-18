import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Props = {
   name: string
   type: string
   label: string
   placeholder: string
   control: any
}

export function FormFieldData({
   name,
   type,
   label,
   placeholder,
   control,
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
