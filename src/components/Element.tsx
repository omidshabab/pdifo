import { useDraggable } from "@dnd-kit/core";
import { GripIcon } from "lucide-react";

export type ElementType =
     | "Code"
     | "Column"
     | "Icon"
     | "Image"
     | "Text"

const Element = ({
     id,
     text
}: {
     id: string,
     text: string
}) => {
     const { attributes, listeners, setNodeRef, transform } = useDraggable({
          id: id,
     });
     const style = transform ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
     } : undefined;

     return (
          <div
               ref={setNodeRef}
               style={style}
               {...listeners}
               {...attributes}
               className="flex items-center w-full border border-primary/10 px-[15px] py-[10px] cursor-pointer hover:bg-primary/5">
               <p className="flex flex-grow">
                    {text}
               </p>
               <div>
                    <GripIcon
                         size={15}
                         className="text-primary/50" />
               </div>
          </div>
     )
}

export default Element