import useEditor from "@/lib/hooks/useEditor";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { ElementInstance, Elements, ElementType } from "./Element";
import { idGenerator } from "@/lib/idGenerator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { ClipboardCheck, ClipboardCopyIcon, ClipboardPasteIcon, ClipboardPenLine, SquarePen, Trash2Icon } from "lucide-react";

const Editor = () => {
     const { elements, addElement, removeElement, selectedElement, setSelectedElement, setPanelType } = useEditor();

     const droppable = useDroppable({
          id: "designer-drop-area",
          data: {
               isDesignerDropArea: true,
          },
     });

     useDndMonitor({
          onDragEnd: (event: DragEndEvent) => {
               const { active, over } = event;
               if (!active || !over) return;

               const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
               const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;

               const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;

               // First scenario
               if (droppingSidebarBtnOverDesignerDropArea) {
                    const type = active.data?.current?.type;
                    const newElement = Elements[type as ElementType].construct(idGenerator());

                    addElement(elements.length, newElement);
                    return;
               }

               const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;

               const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;

               const isDroppingOverDesignerElement =
                    isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;

               const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;

               // Second scenario
               if (droppingSidebarBtnOverDesignerElement) {
                    const type = active.data?.current?.type;
                    const newElement = Elements[type as ElementType].construct(idGenerator());

                    const overId = over.data?.current?.elementId;

                    const overElementIndex = elements.findIndex((el) => el.id === overId);
                    if (overElementIndex === -1) {
                         throw new Error("element not found");
                    }

                    let indexForNewElement = overElementIndex; // i assume i'm on top-half
                    if (isDroppingOverDesignerElementBottomHalf) {
                         indexForNewElement = overElementIndex + 1;
                    }

                    addElement(indexForNewElement, newElement);
                    return;
               }

               // Third scenario
               const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

               const draggingDesignerElementOverAnotherDesignerElement =
                    isDroppingOverDesignerElement && isDraggingDesignerElement;

               if (draggingDesignerElementOverAnotherDesignerElement) {
                    const activeId = active.data?.current?.elementId;
                    const overId = over.data?.current?.elementId;

                    const activeElementIndex = elements.findIndex((el) => el.id === activeId);

                    const overElementIndex = elements.findIndex((el) => el.id === overId);

                    if (activeElementIndex === -1 || overElementIndex === -1) {
                         throw new Error("element not found");
                    }

                    const activeElement = { ...elements[activeElementIndex] };
                    removeElement(activeId);

                    let indexForNewElement = overElementIndex; // i assume i'm on top-half
                    if (isDroppingOverDesignerElementBottomHalf) {
                         indexForNewElement = overElementIndex + 1;
                    }

                    addElement(indexForNewElement, activeElement);
               }
          },
     });

     return (
          <div
               onClick={() => {
                    if (selectedElement) {
                         setSelectedElement(null)
                         setPanelType("widgets")
                    };
               }}
               ref={droppable.setNodeRef}
               className={cn(
                    "h-full flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto px-[40px] py-[40px]",
                    droppable.isOver && "bg-primary/[3%] transition-all duration-300",
               )}>

               {!droppable.isOver && elements.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full gap-y-[25px] px-[25px] py-[30px] border-[2px] border-dashed border-primary/20 rounded-[10px] cursor-pointer hover:bg-primary/[3%] transition-all duration-500">
                         {/* <div className="flex gap-x-[10px]">
                              <div className="flex items-center justify-center h-[45px] w-[45px] p-[10px] border-[2px] border-text/15 rounded-full text-text">
                                   <IconButton>
                                        <PlusIcon className="w-[25px] h-[25px]" />
                                   </IconButton>
                              </div>
                              <div className="flex items-center justify-center h-[45px] w-[45px] p-[10px] border-[2px] border-text/15 rounded-full text-text bg-primary/5">
                                   <IconButton>
                                        <FolderIcon className="w-[25px] h-[25px]" />
                                   </IconButton>
                              </div>
                         </div> */}
                         <div className="flex flex-col gap-y-[8px] text-center">
                              <p className="text-[18px] text-text font-medium">
                                   Drag a widget here
                              </p>
                              <p className="w-[250px] text-[15px] leading-[2rem] font-normal">
                                   Just simply drag and drop a widget from the sidebar panel here to start building this page of your pdf
                              </p>
                         </div>
                    </div>
               )}

               {droppable.isOver && elements.length === 0 && (
                    <div className="w-full h-full flex justify-center items-center">
                         Drop it here
                    </div>
               )}

               {elements.length > 0 && (
                    <div className="flex flex-col w-full gap-2">
                         {elements.map((element) => (
                              <EditorElementWrapper key={element.id} element={element} />
                         ))}
                    </div>
               )}
          </div>
     );
}

export const EditorElementWrapper = ({ element }: { element: ElementInstance }) => {
     const { removeElement, selectedElement, setSelectedElement, setPanelType } = useEditor();

     const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

     const topHalf = useDroppable({
          id: element.id + "-top",
          data: {
               type: element.type,
               elementId: element.id,
               isTopHalfDesignerElement: true,
          },
     });

     const bottomHalf = useDroppable({
          id: element.id + "-bottom",
          data: {
               type: element.type,
               elementId: element.id,
               isBottomHalfDesignerElement: true,
          },
     });

     const draggable = useDraggable({
          id: element.id + "-drag-handler",
          data: {
               type: element.type,
               elementId: element.id,
               isDesignerElement: true,
          },
     });

     if (draggable.isDragging) return null; // temporary remove the element from editor

     const EditorElement = Elements[element.type].canvasComponent;

     return (
          <div
               ref={draggable.setNodeRef}
               {...draggable.listeners}
               {...draggable.attributes}
               className="flex flex-col gap-y-[10px]">

               {topHalf.isOver && <div className="w-full h-[3px] bg-primary/10 rounded-full" />}

               <div
                    className={cn(
                         "relative flex flex-col text-foreground hover:cursor-pointer hover:bg-primary/[3%] border-[2px] border-dashed border-primary/20 hover:border-primary/35 px-[20px] py-[15px] rounded-[10px] transition-all duration-300",
                         mouseIsOver || selectedElement?.id === element.id && "border-primary/35"
                    )}
                    onMouseEnter={() => {
                         setMouseIsOver(true);
                    }}
                    onMouseLeave={() => {
                         setMouseIsOver(false);
                    }}
                    onClick={(e) => {
                         e.stopPropagation();
                         setSelectedElement(element);
                         setPanelType("editor")
                    }}>

                    <ContextMenu>
                         <ContextMenuTrigger>
                              <div
                                   className="flex flex-col w-full items-center pointer-events-none opacity-100">
                                   <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-full" />

                                   <EditorElement elementInstance={element} />

                                   <div ref={bottomHalf.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-full" />
                              </div>
                         </ContextMenuTrigger>
                         <ContextMenuContent className="w-auto">
                              {/* <ContextMenuItem
                                   onClick={() => null}
                                   className="flex gap-x-2">
                                   <ClipboardCopyIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                                   Copy
                              </ContextMenuItem> */}
                              {/* <ContextMenuItem
                                   onClick={() => null}
                                   className="flex gap-x-2">
                                   <ClipboardPasteIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                                   Paste style
                              </ContextMenuItem> */}
                              {/* <ContextMenuItem
                                   onClick={() => null}
                                   className="flex gap-x-2">
                                   <ClipboardCheck className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                                   Duplicate
                              </ContextMenuItem> */}
                              <ContextMenuItem
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedElement(element);
                                        setPanelType("editor")
                                   }}
                                   className="flex gap-x-2">
                                   <SquarePen className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                                   Edit this
                              </ContextMenuItem>
                              <ContextMenuItem
                                   onClick={(e) => {
                                        e.stopPropagation(); // avoid selection of element while deleting
                                        removeElement(element.id);
                                        setSelectedElement(null)
                                        setPanelType("widgets")
                                   }}
                                   className="flex gap-x-2 text-text">
                                   <Trash2Icon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                                   Delete it
                              </ContextMenuItem>
                         </ContextMenuContent>
                    </ContextMenu>

               </div>

               {bottomHalf.isOver && <div className="w-full h-[3px] bg-primary/10 rounded-full" />}
          </div>
     )
}

export default Editor;