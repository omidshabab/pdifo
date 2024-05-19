import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import AddPageButton from "../buttons/icon/AddPageButton";
import React, { useState } from "react";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";

import {
     ContextMenu,
     ContextMenuContent,
     ContextMenuItem,
     ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Trash2Icon, SquarePenIcon } from 'lucide-react';
import { defaultDropAnimationSideEffects, DndContext, DragEndEvent, DragOverlay, DragStartEvent, DropAnimation, MeasuringConfiguration, MeasuringStrategy, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { CSS, isKeyboardEvent } from '@dnd-kit/utilities';
import { createRange } from "@/lib/utils";
import { PageType } from "@/types";
import { pages } from "@/lib/data";

const measuring: MeasuringConfiguration = {
     droppable: {
          strategy: MeasuringStrategy.Always,
     },
};

const dropAnimation: DropAnimation = {
     keyframes({ transform }) {
          return [
               { transform: CSS.Transform.toString(transform.initial) },
               {
                    transform: CSS.Transform.toString({
                         scaleX: 0.98,
                         scaleY: 0.98,
                         x: transform.final.x - 10,
                         y: transform.final.y - 10,
                    }),
               },
          ];
     },
     sideEffects: defaultDropAnimationSideEffects({
          className: {
               // active: pageStyles.active,
          },
     }),
};

const PageSidebar = () => {
     const [items, setItems] = useState(() =>
          createRange<UniqueIdentifier>(pages.length, (index) => `${index + 1}`)
     );

     const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
     const activeIndex = activeId ? items.indexOf(activeId) : -1;
     const sensors = useSensors(
          useSensor(PointerSensor),
     );

     return (
          <div className="hidden lg:flex flex-col w-[200px]">
               <div className="flex items-center pb-[20px] px-6 py-5">
                    <h2 className="flex flex-grow text-[15px]">
                         Pages
                    </h2>
                    <AddPageButton />
               </div>
               <Separator
                    orientation="horizontal"
                    className="bg-primary/10" />
               <ScrollArea className="none-scroll-bar">
                    <div className="flex flex-col px-6 py-6 gap-y-[15px]">
                         <DndContext
                              id="PageSidebar"
                              onDragStart={handleDragStart}
                              onDragEnd={handleDragEnd}
                              onDragCancel={handleDragCancel}
                              sensors={sensors}
                              measuring={measuring}>
                              <SortableContext items={items}>
                                   <Pages />
                              </SortableContext>

                              <DragOverlay dropAnimation={dropAnimation}>
                                   {activeId && (
                                        <PageOverlay />
                                   )}
                              </DragOverlay>
                         </DndContext>
                    </div>
               </ScrollArea>
          </div>
     );

     function handleDragStart({ active }: DragStartEvent) {
          setActiveId(active.id);
     }

     function handleDragCancel() {
          setActiveId(null);
     }

     function handleDragEnd({ over }: DragEndEvent) {
          if (over) {
               const overIndex = items.indexOf(over.id);

               if (activeIndex !== overIndex) {
                    const newIndex = overIndex;

                    setItems((items) => arrayMove(items, activeIndex, newIndex));
               }
          }

          setActiveId(null);
     }
}

const Page = ({
     page,
     index,
}: {
     page: PageType,
     index: number,
}) => {
     const {
          setNodeRef,
          attributes,
          listeners,
          transform,
          transition,
          isDragging,
     } = useSortable({
          id: page.id,
     });

     const style = {
          transition,
          transform: CSS.Transform.toString(transform),
     };

     if (isDragging) {
          return (
               <div
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className="aspect-[3/4] w-full bg-primary/[8%] border-[2px] border-primary/10 relative rounded-[15px] cursor-pointer" />
          );
     }

     return (
          <ContextMenu>
               <ContextMenuTrigger>
                    <div ref={setNodeRef}
                         style={style}
                         {...attributes}
                         {...listeners}
                         className="flex justify-center items-center aspect-[3/4] w-full bg-primary/[3%] border-[1px] border-primary/5 text-[15px] relative rounded-[15px] cursor-pointer">
                         {page.content}
                         <div className="absolute flex w-[20px] opacity-50 h-[20px] justify-center items-center aspect-square right-0 bottom-0 text-[12px] bg-primary/10 text-orange-900 mx-[10px] my-[10px] rounded-full">
                              {index + 1}
                         </div>
                    </div>
               </ContextMenuTrigger>
               <ContextMenuContent className="w-auto">
                    <ContextMenuItem className="flex gap-x-2 text-slate-800">
                         <SquarePenIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         Go to this
                    </ContextMenuItem>
                    <ContextMenuItem className="flex gap-x-2 text-text">
                         <Trash2Icon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         Delete it
                    </ContextMenuItem>
               </ContextMenuContent>
          </ContextMenu>
     )
}

const Pages = () => {
     return (
          <>
               {pages.map((page, index) => (
                    <Page
                         key={index}
                         index={index}
                         page={page} />
               ))}
          </>
     )
}

const PageOverlay = () => {
     return (
          <div className="aspect-[3/4] w-full bg-primary/5 border-[2px] border-primary/10 relative rounded-[15px] cursor-pointer" />
     )
}

export default PageSidebar;