import { z } from "zod";
import { Element, ElementInstance, ElementType } from "../Element";
import { Text, TypeIcon } from "lucide-react";
import { useEffect } from "react";
import useEditor from "@/lib/hooks/useEditor";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const type: ElementType = "Text";

const extraAttributes = {
     title: "Text Element",
};

const propertiesSchema = z.object({
     title: z.string().min(2).max(50),
});

export const TextElement: Element = {
     type,

     construct: (id: string) => ({
          id,
          type,
          extraAttributes,
     }),

     editorElement: {
          icon: TypeIcon,
          label: "Text",
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
          <div>
               Properties builder
          </div>
          // <Form {...form}>
          //      <form
          //           onBlur={form.handleSubmit(applyChanges)}
          //           onSubmit={(e) => {
          //                e.preventDefault();
          //           }}
          //           className="space-y-3"
          //      >
          //           {/* <FormField
          //                control={form.control}
          //                name="title"
          //                render={({ field }) => (
          //                     <FormItem>
          //                          <FormLabel>Title</FormLabel>
          //                          <FormControl>
          //                               <Input
          //                                    {...field}
          //                                    onKeyDown={(e) => {
          //                                         if (e.key === "Enter") e.currentTarget.blur();
          //                                    }}
          //                               />
          //                          </FormControl>
          //                          <FormMessage />
          //                     </FormItem>
          //                )}
          //           /> */}
          //      </form>
          // </Form>
     );
}