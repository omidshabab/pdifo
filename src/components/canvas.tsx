import { pages } from "@/lib/data";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const Canvas = () => {
     return (
          <div className="flex flex-col flex-grow">
               <p className="text-[16px] text-center font-normal text-slate-900 px-6 py-5">
                    pdf_name
               </p>
               <Separator
                    orientation="horizontal"
                    className="bg-primary/10" />
               <ScrollArea className="flex flex-col">
                    {pages.map((page, index) => (
                         <>
                              <div
                                   key={index}
                                   className="flex flex-col flex-grow relative aspect-[3/4] w-full bg-primary/5">
                                   <div className="absolute right-0 bottom-0 text-[12px] opacity-50 bg-primary/10 text-orange-900 px-[8px] py-[2px] mx-[10px] my-[10px] rounded-full">
                                        {(index + 1) + " / " + (pages.length)}
                                   </div>
                              </div>
                              {(index + 1) < pages.length && (
                                   <Separator
                                        orientation="horizontal"
                                        className="h-[3px] bg-primary/10" />
                              )}
                         </>
                    ))}
               </ScrollArea>
          </div>
     );
}

export default Canvas;