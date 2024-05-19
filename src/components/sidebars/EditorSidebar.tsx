import useEditor from "@/lib/hooks/useEditor";
import ElementComponent, { ElementInstance, Elements } from "../Element";
import BackToPanelButton from "../buttons/text/BackToPanelButton";
import { FC } from "react";

const EditorSidebar = () => {
     const { selectedElement, panelType } = useEditor();

     let PropertiesForm: FC<{
          elementInstance: ElementInstance;
     }> = ({ elementInstance }) => {
          return (
               <div>
                    {elementInstance.extraAttributes?.title}
               </div>
          )
     }

     if (selectedElement) {
          PropertiesForm = Elements[selectedElement.type].propertiesComponent;
     }

     return (
          <div>
               {selectedElement && panelType === "editor" && (
                    <div className="flex flex-col flex-grow gap-y-[20px]">
                         <BackToPanelButton />

                         <div className="flex flex-col gap-y-[10px]">
                              <p className="text-[16px] font-medium">
                                   {selectedElement.extraAttributes?.title}
                              </p>

                              <PropertiesForm elementInstance={selectedElement} />
                         </div>
                    </div>
               )}
          </div>
     );
}

export default EditorSidebar;