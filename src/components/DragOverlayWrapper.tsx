import useEditor from "@/lib/hooks/useEditor";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { Elements, ElementType, SidebarElementDragOverlay } from "./Element";

function DragOverlayWrapper() {
     const { elements } = useEditor();
     const [draggedItem, setDraggedItem] = useState<Active | null>(null);

     useDndMonitor({
          onDragStart: (event) => {
               setDraggedItem(event.active);
          },
          onDragCancel: () => {
               setDraggedItem(null);
          },
          onDragEnd: () => {
               setDraggedItem(null);
          },
     });

     if (!draggedItem) return null;

     let node = <div>No drag overlay</div>;
     const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

     if (isSidebarBtnElement) {
          const type = draggedItem.data?.current?.type as ElementType;
          node = <SidebarElementDragOverlay element={Elements[type]} />;
     }

     const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
     if (isDesignerElement) {
          const elementId = draggedItem.data?.current?.elementId;
          const element = elements.find((el) => el.id === elementId);
          if (!element) node = <div>Element not found!</div>;
          else {
               const DesignerElementComponent = Elements[element.type].canvasComponent;

               node = (
                    <div className="relative flex flex-col text-foreground hover:cursor-pointer hover:bg-primary/[3%] border-[2px] border-dashed border-primary/20 hover:border-primary/35 px-[20px] py-[15px] rounded-[10px] transition-all duration-300">
                         <DesignerElementComponent elementInstance={element} />
                    </div>
               );
          }
     }

     return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;