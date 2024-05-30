import { z } from "zod";
import { Element, ElementInstance, ElementType } from "../Element";
import { ImageIcon, UploadIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const type: ElementType = "Image";

const extraAttributes = {
     title: "Image Element",
};

const propertiesSchema = z.object({
     image: z.string(),
     title: z.string().max(50),
});

export const ImageElement: Element = {
     type,

     construct: (id: string) => ({
          id,
          type,
          extraAttributes,
     }),

     editorElement: {
          icon: ImageIcon,
          label: "Image",
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
          <div className="flex flex-col gap-2 w-full gap-y-[10px]">
               <div className="flex flex-col max-w-[250px] aspect-square bg-primary/5">

               </div>
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

function PropertiesComponent({
     elementInstance,
}: {
     elementInstance: ElementInstance;
}) {
     const element = elementInstance as CustomInstance;
     // const { updateElement } = useDesigner();
     // const form = useForm<propertiesFormSchemaType>({
     //      resolver: zodResolver(propertiesSchema),
     //      mode: "onBlur",
     //      defaultValues: {
     //           image: element.extraAttributes.title,
     //      },
     // });

     // useEffect(() => {
     //      form.reset(element.extraAttributes);
     // }, [element, form]);

     // function applyChanges(values: propertiesFormSchemaType) {
     //      const { title } = values;
     //      updateElement(element.id, {
     //           ...element,
     //           extraAttributes: {
     //                title,
     //           },
     //      });
     // }

     const [isOver, setIsOver] = useState(false)
     const [image, setImage] = useState<File | undefined>()
     const [imageUrl, setImageUrl] = useState<string | null>()
     const uploadImageRef = useRef<HTMLInputElement>(null);

     const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement & {
               files: FileList
          }

          setImage(target.files[0])

          e.preventDefault()

          if (typeof image === 'undefined') return

          const formData = new FormData()

          formData.append("file", image)
          formData.append("upload_preset", `${process.env.CLOUDINARY_UPLOAD_PRESET}`)
          formData.append("public_id", `${process.env.CLOUDINARY_PUBLIC_ID_FOLDER}/${element.id}`)
          formData.append("api_key", `${process.env.CLOUDINARY_API_KEY}`)

          const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
               method: "POST",
               body: formData
          }).then(r => r.json())

          setImageUrl(results["url"])
     }

     return (
          <div>
               {imageUrl && <div>{`${image}`}</div>}
               {!imageUrl && <div
                    onDragOver={() => setIsOver(true)}
                    onDragEnd={() => setIsOver(false)}
                    className={cn(
                         "flex flex-col justify-center items-center bg-primary/[3%] text-center gap-y-[10px] w-full aspect-video rounded-[12px] px-[25px] py-[20px] border-dashed border-[2px] border-primary/15 cursor-pointer text-text font-semibold text-[15px] leading-[1.5rem] hover:bg-primary/[6%] hover:border-primary/30 transition-all duration-500",
                         isOver && "bg-primary/[6%] border-primary/30"
                    )}
                    onClick={() => uploadImageRef.current?.click()}>
                    <UploadIcon className="h-[25px] w-[25px]" />
                    Drag and Drop or Click to upload an image
                    <input
                         type="file"
                         name="image"
                         accept="image/png, image/jpg"
                         ref={uploadImageRef}
                         onChange={handleOnChange}
                         hidden
                    />
               </div>}
          </div>
          // <Form {...form}>
          //      <form
          //           onBlur={form.handleSubmit(applyChanges)}
          //           onSubmit={(e) => {
          //                e.preventDefault();
          //           }}
          //           className="space-y-3"
          //      >
          //           <FormField
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
          //           />
          //      </form>
          // </Form>
     );
}
