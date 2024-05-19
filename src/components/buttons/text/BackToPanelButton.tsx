import useEditor from "@/lib/hooks/useEditor";
import { ArrowLeftIcon } from "lucide-react";

const BackToPanelButton = () => {
     const { setPanelType, setSelectedElement } = useEditor()

     return (
          <div
               onClick={() => {
                    setSelectedElement(null)
                    setPanelType("widgets")
               }}
               className="flex w-min gap-x-[5px] items-center bg-primary/5 px-[8px] py-[4px] rounded-[8px] cursor-pointer hover:bg-primary/10 transition-all duration-300 text-orange-900">
               <ArrowLeftIcon className="w-[15px] h-[15px]" />
               <div className="text-[15px]">
                    back
               </div>
          </div>
     );
}

export default BackToPanelButton;