import { z } from "zod";
import { Element, ElementInstance, ElementType } from "../Element";
import { SparklesIcon, Text } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import useEditor from "@/lib/hooks/useEditor";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const type: ElementType = "Icon";

const extraAttributes = {
     title: "Icon Element",
};

const propertiesSchema = z.object({
     title: z.string().min(2).max(50),
});

export const IconElement: Element = {
     type,

     construct: (id: string) => ({
          id,
          type,
          extraAttributes,
     }),

     editorElement: {
          icon: SparklesIcon,
          label: "Icon",
     },

     canvasComponent: CanvasComponent,
     previewComponent: PreviewComponent,
     propertiesComponent: PropertiesComponent,

     validate: () => true,
}

type CustomInstance = ElementInstance & {
     extraAttributes: typeof extraAttributes;
};

function CanvasComponent({ elementInstance }: { elementInstance: ElementInstance }) {
     const element = elementInstance as CustomInstance;
     const { title } = element.extraAttributes;
     return (
          <div className="flex flex-col gap-2 w-full">
               {title}
          </div>
     );
}

function PreviewComponent({ elementInstance }: { elementInstance: ElementInstance }) {
     const element = elementInstance as CustomInstance;

     const { title } = element.extraAttributes;
     return <p className="text-xl">{title}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: ElementInstance }) {
     const element = elementInstance as CustomInstance;
     const { updateElement } = useEditor();
     const form = useForm<propertiesFormSchemaType>({
          resolver: zodResolver(propertiesSchema),
          mode: "onBlur",
          defaultValues: {
               title: element.extraAttributes.title,
          },
     });

     useEffect(() => {
          form.reset(element.extraAttributes);
     }, [element, form]);

     function applyChanges(values: propertiesFormSchemaType) {
          const { title } = values;
          updateElement(element.id, {
               ...element,
               extraAttributes: {
                    title,
               },
          });
     }

     return (
          <div className="flex flex-col gap-[10px]">
               <Form {...form}>
                    <form
                         onBlur={form.handleSubmit(applyChanges)}
                         onSubmit={(e) => {
                              e.preventDefault();
                         }}>
                         <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                   <FormItem className="flex flex-col gap-y-[5px]">
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  onKeyDown={(e) => {
                                                       if (e.key === "Enter") e.currentTarget.blur();
                                                  }}
                                                  placeholder="Type the icon title"
                                                  className="px-0"
                                             />
                                        </FormControl>
                                        <FormMessage className="text-text font-normal text-[12px]" />
                                   </FormItem>
                              )}
                         />
                    </form>
               </Form>
          </div>
     );
}