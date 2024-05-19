import { pages } from "@/lib/data";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import Editor from "./Editor";
import { Input } from "./ui/input";
import { useState } from "react";

const Canvas = () => {
     const [inputValue, setInputValue] = useState<string>("pdifo_pdf_name")

     return (
          <div className="flex flex-col flex-grow">
               <div className="flex flex-grow w-full items-center justify-center gap-x-[5px] text-[16px] text-center font-normal text-slate-900 px-6 py-5">
                    <Input
                         value={inputValue}
                         placeholder="Type your pdf name here"
                         onChange={(e) => {
                              setInputValue(e.currentTarget.value)
                         }}
                         maxLength={50}
                         className="flex flex-grow border-none text-center p-0 text-[16px] focus:border-none focus:ring-none" />
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

export default Canvas;