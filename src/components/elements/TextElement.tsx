import { z } from "zod";
import { Element, ElementInstance, ElementType } from "../Element";
import { TypeIcon } from "lucide-react";
import { useEffect } from "react";
import useEditor from "@/lib/hooks/useEditor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "antd";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils";
import { englishBricolageGrotesqueFont } from "@/lib/fonts";

const { TextArea } = Input;

const type: ElementType = "Text";

const extraAttributes = {
     title: "Text Element",
};

const propertiesSchema = z.object({
     title: z.string().max(500),
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
          <Form {...form}>
               <form
                    onBlur={form.handleSubmit(applyChanges)}
                    className="space-y-3 w-full">
                    <FormField
                         control={form.control}
                         name="title"
                         render={({ field }) => (
                              <FormItem>
                                   <FormControl>
                                        <TextArea
                                             {...field}
                                             onKeyDown={(e) => {
                                                  if (e.key === "Enter") e.currentTarget.blur();
                                             }}
                                             placeholder="type here..."
                                             variant="borderless"
                                             autoSize
                                             autoFocus
                                             onMouseDown={(e) => {
                                                  e.stopPropagation();
                                             }}
                                             maxLength={500}
                                             autoComplete="off"
                                             className={cn(
                                                  "text-left text-[16px] w-full rounded-none px-0 none-scroll-bar cursor-text",
                                                  englishBricolageGrotesqueFont.className,
                                             )}
                                        />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         )}
                    />
               </form>
          </Form>
     )
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
          <div className="flex flex-col gap-y-[15px]">
               Properties builder
               <Form {...form}>
                    <form
                         onBlur={form.handleSubmit(applyChanges)}
                         onSubmit={(e) => {
                              e.preventDefault();
                         }}
                         className="space-y-3">
                         <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormControl>
                                             <TextArea
                                                  {...field}
                                                  onKeyDown={(e) => {
                                                       if (e.key === "Enter") e.currentTarget.blur();
                                                  }}
                                                  placeholder="type here..."
                                                  variant="borderless"
                                                  autoSize
                                                  autoFocus={false}
                                                  maxLength={500}
                                                  autoComplete="off"
                                                  className={cn(
                                                       "text-left h-full text-[15px] px-0 py-0 none-scroll-bar",
                                                       englishBricolageGrotesqueFont.className,
                                                  )}
                                             />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                    </form>
               </Form>
          </div>

     );
}