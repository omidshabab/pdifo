import { widgets } from "@/app/page";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { GripIcon, PanelRightOpen, SettingsIcon } from "lucide-react";
import SettingButton from "../buttons/icon-buttons/settings-button";
import PreviewButton from "../buttons/icon-buttons/preview-button";

const WidgetsSidebar = () => {
     return (
          <div className="hidden sm:flex flex-col justify-between w-[250px]">
               <div className="flex items-center px-6 pt-5">
                    <h1 className="flex flex-grow text-[18px] font-medium text-orange-900">
                         Pdifo
                    </h1>
                    <div className="flex flex-row gap-[10px]">
                         <SettingButton />
                         <PreviewButton />
                    </div>
               </div>
               <ScrollArea className="flex flex-col flex-grow px-6 py-5">
                    {widgets.map((widget, index) => (
                         <>
                              <div
                                   key={index}
                                   className="flex items-center w-full border border-primary/10 px-[15px] py-[10px] cursor-pointer hover:bg-primary/5">
                                   <p className="flex flex-grow">
                                        text
                                   </p>
                                   <div>
                                        <GripIcon
                                             size={15}
                                             className="text-primary/50" />
                                   </div>
                              </div>
                              {index < widgets.length && (
                                   <div className="h-[10px]" />
                              )}
                         </>
                    ))}
               </ScrollArea>
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

export default WidgetsSidebar;