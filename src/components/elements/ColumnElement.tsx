// import { z } from "zod";
// import { Element, ElementInstance, ElementType } from "../Element";
// import { Columns2Icon, Text } from "lucide-react";
// import { ReactNode, useEffect } from "react";
// import { EditorElementWrapper } from "../Editor";

// const type: ElementType = "Column";

// const extraAttributes = {
//      title: "Column Element",
// };

// const propertiesSchema = z.object({
//      title: z.string().min(2).max(50),
// });

// export const ColumnElement: Element = {
//      type,

//      construct: (id: string) => ({
//           id,
//           type,
//           extraAttributes,
//      }),

//      editorElement: {
//           icon: Columns2Icon,
//           label: "Column",
//      },

//      canvasComponent: CanvasComponent,
//      previewComponent: PreviewComponent,
//      propertiesComponent: PropertiesComponent,

//      validate: () => true,
// }

// type CustomInstance = ElementInstance & {
//      extraAttributes: typeof extraAttributes;
// };

// function CanvasComponent({ elementInstance }: { elementInstance: ElementInstance }) {
//      const element = elementInstance as CustomInstance;
//      const { title } = element.extraAttributes;

//      return (
//           <div className="flex gap-[15px] w-full px-[10px] py-[10px]">
//                <div className="flex-grow px-[20px] py-[20px] border-[2px] border-dashed border-primary/20 rounded-[8px]">
//                     {title}
//                </div>

//                <div className="flex-grow px-[20px] py-[20px] border-[2px] border-dashed border-primary/20 rounded-[8px]">
//                     {title}
//                </div>
//           </div>
//      );
// }

// function PreviewComponent({ elementInstance }: { elementInstance: ElementInstance }) {
//      const element = elementInstance as CustomInstance;

//      const { title } = element.extraAttributes;
//      return <p className="text-xl">{title}</p>;
// }

// type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

// function PropertiesComponent({ elementInstance }: { elementInstance: ElementInstance }) {
//      const element = elementInstance as CustomInstance;
//      // const { updateElement } = useDesigner();
//      // const form = useForm<propertiesFormSchemaType>({
//      //      resolver: zodResolver(propertiesSchema),
//      //      mode: "onBlur",
//      //      defaultValues: {
//      //           title: element.extraAttributes.title,
//      //      },
//      // });

//      // useEffect(() => {
//      //      form.reset(element.extraAttributes);
//      // }, [element, form]);

//      // function applyChanges(values: propertiesFormSchemaType) {
//      //      const { title } = values;
//      //      updateElement(element.id, {
//      //           ...element,
//      //           extraAttributes: {
//      //                title,
//      //           },
//      //      });
//      // }

//      return (
//           <div>
//                Properties builder
//           </div>
//           // <Form {...form}>
//           //      <form
//           //           onBlur={form.handleSubmit(applyChanges)}
//           //           onSubmit={(e) => {
//           //                e.preventDefault();
//           //           }}
//           //           className="space-y-3"
//           //      >
//           //           <FormField
//           //                control={form.control}
//           //                name="title"
//           //                render={({ field }) => (
//           //                     <FormItem>
//           //                          <FormLabel>Title</FormLabel>
//           //                          <FormControl>
//           //                               <Input
//           //                                    {...field}
//           //                                    onKeyDown={(e) => {
//           //                                         if (e.key === "Enter") e.currentTarget.blur();
//           //                                    }}
//           //                               />
//           //                          </FormControl>
//           //                          <FormMessage />
//           //                     </FormItem>
//           //                )}
//           //           />
//           //      </form>
//           // </Form>
//      );
// }