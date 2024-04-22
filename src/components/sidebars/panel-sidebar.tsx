"use client"

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { ArrowLeftIcon } from "lucide-react";
import SettingButton from "../buttons/icon-buttons/setting-button";
import PreviewButton from "../buttons/icon-buttons/preview-button";
import { elements } from "@/lib/data";
import React from "react";
import Link from "next/link";

type SidebarType = "widgets" | "settings"

const PanelSidebar = () => {
     const [type, setType] = React.useState<SidebarType>("widgets")

     return (
          <div className="hidden sm:flex flex-col justify-between w-[250px]">
               <div className="flex items-center px-6 pt-5">
                    <Link
                         href="/"
                         className="flex flex-grow text-[18px] font-medium text-orange-900">
                         Pdifo
                    </Link>
                    <div className="flex flex-row gap-[10px]">
                         <SettingButton onClick={() => setType("settings")} />
                         <PreviewButton />
                    </div>
               </div>

               {type === "widgets" && (
                    <ScrollArea className="flex flex-col flex-grow px-6 py-5">
                         {elements.map((element, index) => (
                              <>
                                   {element}

                                   {index < elements.length && (
                                        <div className="h-[10px]" />
                                   )}
                              </>
                         ))}
                    </ScrollArea>
               )}

               {type === "settings" && (
                    <div className="flex flex-col flex-grow px-6 py-5">
                         <div
                              onClick={() => setType("widgets")}
                              className="flex w-min gap-x-[5px] items-center bg-primary/5 px-[8px] py-[4px] rounded-[8px] cursor-pointer hover:bg-primary/10 transition-all duration-300 text-orange-900">
                              <ArrowLeftIcon className="w-[15px] h-[15px]" />
                              <div className="text-[15px]">
                                   back
                              </div>
                         </div>
                    </div>
               )}
               <Separator
                    orientation="horizontal"
                    className="bg-primary/10" />
               <div className="px-6 py-5">
                    <Button
                         variant="outline"
                         className="w-full bg-transparent rounded-none border-primary/10 px-[15px] py-[10px] text-orange-900 hover:bg-primary/5 hover:text-orange-900">
                         Export the PDF
                    </Button>
               </div>
          </div>
     );
}

export default PanelSidebar;