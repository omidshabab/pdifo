import { pages } from "@/lib/data";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import Editor from "./Editor";
import { Input } from "./ui/input";
import { useState } from "react";
import UndoButton from "./buttons/icon/UndoButton";
import RedoButton from "./buttons/icon/RedoButton";
import { Button } from "./ui/button";
import PreviewButton from "./buttons/icon/PreviewButton";
import OpenSidebarButton from "./buttons/icon/OpenSidebarButton";

const Designer = () => {
     const [inputValue, setInputValue] = useState<string>("Untitled")

     return (
          <div className="flex flex-col flex-grow">
               <div className="flex flex-grow w-full items-center justify-center gap-x-[25px] text-[16px] text-center font-normal text-slate-900 px-[20px] py-[18px]">
                    <div className="flex gap-x-[8px]">
                         <OpenSidebarButton />
                         <UndoButton />
                         <RedoButton />
                    </div>
                    <Input
                         value={inputValue}
                         placeholder="Type your pdf name here"
                         onChange={(e) => {
                              setInputValue(e.currentTarget.value)
                         }}
                         maxLength={50}
                         className="flex flex-grow border-none p-0 text-[16px] focus:border-none focus:ring-none" />
                    <div className="flex gap-x-[10px]">
                         <PreviewButton />
                         <Button
                              size="sm"
                              variant="secondary">
                              Save the pdf
                         </Button>
                    </div>
               </div>
               <Separator
                    orientation="horizontal"
                    className="bg-primary/10" />
               <ScrollArea className="flex flex-col none-scroll-bar">
                    {pages.map((page, index) => (
                         <div key={index}>
                              <div className="flex flex-col flex-grow relative aspect-[3/4] w-full bg-primary/[3%]">
                                   {/* <div className="h-full px-[30px] py-[25px]">
                                        {page.content}
                                   </div> */}
                                   <Editor />
                                   <div className="absolute right-0 bottom-0 text-[12px] opacity-50 bg-primary/10 text-orange-900 px-[8px] py-[2px] mx-[10px] my-[10px] rounded-full">
                                        {(index + 1) + " / " + (pages.length)}
                                   </div>
                              </div>
                              {(index + 1) < pages.length && (
                                   <Separator
                                        orientation="horizontal"
                                        className="h-[3px] bg-primary/10" />
                              )}
                         </div>
                    ))}
                    {/* <Editor key={index} /> */}
               </ScrollArea>
          </div>
     );
}

export default Designer;