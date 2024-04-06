import { PlusIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { pages } from "@/app/page";
import AddPageButton from "../buttons/icon-buttons/add-page-button";

const PagesSidebar = () => {
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
                                   <div
                                        key={index}
                                        className="aspect-[3/4] w-full bg-primary/5 relative cursor-pointer">
                                        <div className="absolute flex w-[20px] opacity-50 h-[20px] justify-center items-center aspect-square right-0 bottom-0 text-[12px] bg-primary/10 text-orange-900 mx-[10px] my-[10px] rounded-full">
                                             {index + 1}
                                        </div>
                                   </div>
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

export default PagesSidebar;