import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import AddPageButton from "../Buttons/IconButtons/AddPageButton";
import { pages } from "@/lib/data";
import React from "react";

import {
     ContextMenu,
     ContextMenuContent,
     ContextMenuItem,
     ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Trash2Icon, ReplyIcon, SquarePenIcon } from 'lucide-react';

const PageSidebar = () => {
     return (
          <div className="hidden sm:flex flex-col w-[200px]">
               <div className="flex items-center pb-[20px] px-6 py-5">
                    <h2 className="flex flex-grow text-[15px]">
                         Pages
                    </h2>
                    <AddPageButton />
               </div>
               <Separator
                    orientation="horizontal"
                    className="bg-primary/10" />
               <ScrollArea>
                    <div className="flex flex-col px-6 py-6">
                         {pages.map((page, index) => (
                              <>
                                   <Page key={index} index={index}>
                                        <div>

                                        </div>
                                   </Page>
                                   {(index + 1) < pages.length && (
                                        <div className="h-[10px]" />
                                   )}
                              </>
                         ))}
                    </div>
               </ScrollArea>
          </div>
     );
}

const Page = ({
     index,
     children
}: {
     index: number,
     children: React.ReactNode,
}) => {
     return (
          <ContextMenu>
               <ContextMenuTrigger>
                    <div className="aspect-[3/4] w-full bg-primary/5 relative cursor-pointer">
                         {children}
                         <div className="absolute flex w-[20px] opacity-50 h-[20px] justify-center items-center aspect-square right-0 bottom-0 text-[12px] bg-primary/10 text-orange-900 mx-[10px] my-[10px] rounded-full">
                              {index + 1}
                         </div>
                    </div>
               </ContextMenuTrigger>
               <ContextMenuContent className="w-auto">
                    <ContextMenuItem className="flex gap-x-2 text-slate-800">
                         <SquarePenIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         Go to this Page
                    </ContextMenuItem>
                    <ContextMenuItem className="flex gap-x-2 text-text">
                         <Trash2Icon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         Delete the page
                    </ContextMenuItem>
               </ContextMenuContent>
          </ContextMenu>
     )
}

export default PageSidebar;