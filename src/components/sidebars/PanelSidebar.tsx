"use client"

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import SettingButton from "../buttons/icon/SettingButton";
import CloseSidebarButton from "../buttons/icon/CloseSidebarButton";
import React, { ReactNode, useEffect } from "react";
import Link from "next/link";
import { SidebarType } from "@/lib/context/EditorContext";
import useEditor from "@/lib/hooks/useEditor";
import BackToPanelButton from "../buttons/text/BackToPanelButton";
import ElementComponent, { Elements } from "../Element";

const PanelSidebar = ({
     children,
     sidebarType
}: {
     children?: ReactNode,
     sidebarType?: SidebarType
}) => {
     const { panelType, setPanelType, selectedElement, setSelectedElement } = useEditor()

     useEffect(() => {
          if (sidebarType) setPanelType(sidebarType)
     }, [setPanelType, sidebarType])

     return (
          <div className="hidden md:flex flex-col justify-between w-[250px]">
               <div className="flex items-center px-6 pt-5">
                    <Link
                         href="/"
                         className="flex flex-grow text-[18px] font-medium text-orange-900 cursor-pointer">
                         Pdifo
                    </Link>
                    <div className="flex flex-row gap-[10px]">
                         <SettingButton onClick={() => {
                              setSelectedElement(null)
                              setPanelType("settings")
                         }} />
                         <CloseSidebarButton />
                    </div>
               </div>

               <ScrollArea className="flex flex-col flex-grow px-6 py-5 none-scroll-bar">
                    {panelType === "widgets" && !selectedElement && (
                         <ScrollArea className="flex flex-col flex-grow none-scroll-bar">
                              <div className="flex flex-col gap-y-[10px]">
                                   <ElementComponent element={Elements.Text} />
                                   <ElementComponent element={Elements.Icon} />
                                   <ElementComponent element={Elements.Button} />
                                   <ElementComponent element={Elements.Image} />
                                   {/* <ElementComponent element={Elements.Column} /> */}
                                   {/* <ElementComponent element={Elements.Code} /> */}
                              </div>
                         </ScrollArea>
                    )}

                    {panelType === "settings" && !selectedElement && (
                         <div className="flex flex-col flex-grow gap-y-[20px]">
                              <BackToPanelButton />

                              <div className="flex flex-col gap-y-[10px]">
                                   <p className="text-[16px] font-medium">
                                        Settings
                                   </p>

                                   <div className="flex-grow">
                                        content
                                   </div>
                              </div>
                         </div>
                    )}

                    {children}
               </ScrollArea>

               <Separator
                    orientation="horizontal"
                    className="bg-primary/10" />
               <div className="px-6 py-5">
                    <Button
                         variant="outline"
                         className="w-full bg-transparent rounded-[8px] border-primary/10 px-[15px] py-[10px] text-text hover:bg-primary/5 hover:text-text">
                         Export the PDF
                    </Button>
               </div>
          </div>
     );
}

export default PanelSidebar;