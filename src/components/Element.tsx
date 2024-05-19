import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { TextElement } from "./elements/TextElement";
import { cn } from "@/lib/utils";
import { IconElement } from "./elements/IconElement";
import { ImageElement } from "./elements/ImageElement";
// import { ColumnElement } from "./elements/ColumnElement";
// import { CodeElement } from "./elements/CodeElement";
import { ButtonElement } from "./elements/ButtonElement";

export type ElementType =
     // | "Code"
     // | "Column"
     | "Icon"
     | "Image"
     | "Text"
     | "Button"

export type Element = {
     type: ElementType

     construct: (id: string) => ElementInstance;

     editorElement: {
          icon: React.ElementType;
          label: string;
     };

     canvasComponent: React.FC<{
          elementInstance: ElementInstance;
     }>
     previewComponent: React.FC<{
          elementInstance: ElementInstance;
     }>
     propertiesComponent: React.FC<{
          elementInstance: ElementInstance;
     }>

     validate: (formElement: ElementInstance, currentValue: string) => boolean;
}

export type ElementInstance = {
     id: string;
     type: ElementType;
     extraAttributes?: Record<string, any>;
};

type ElementsType = {
     [key in ElementType]: Element;
};

export const Elements: ElementsType = {
     Text: TextElement,
     Button: ButtonElement,
     Icon: IconElement,
     Image: ImageElement,
     // Code: CodeElement,
     // Column: ColumnElement,
};

const ElementComponent = ({ element }: { element: Element }) => {
     const { label, icon: Icon } = element.editorElement;

     const draggable = useDraggable({
          id: `designer-btn-${element.type}`,
          data: {
               type: element.type,
               isDesignerBtnElement: true,
          },
     });

     return (
          <div
               ref={draggable.setNodeRef}
               className={cn(
                    "flex items-center w-full border border-primary/10 px-[15px] py-[10px] cursor-pointer hover:bg-primary/5 rounded-[8px]",
                    draggable.isDragging && "border-[2px] border-primary/10",
               )}
               {...draggable.listeners}
               {...draggable.attributes}>
               <p className="flex flex-grow">
                    {label}
               </p>
               <Icon
                    className="h-[15px] text-text/50" />
          </div>
     )
}

export function SidebarElementDragOverlay({ element }: { element: Element }) {
     const { label, icon: Icon } = element.editorElement;

     return (
          <div className="flex items-center w-full border border-primary/10 px-[15px] py-[10px] cursor-pointer hover:bg-primary/5 rounded-[10px]">
               <p className="flex flex-grow">
                    {label}
               </p>
               <Icon
                    className="h-[15px] text-text/50" />
          </div>
     );
}

export default ElementComponent