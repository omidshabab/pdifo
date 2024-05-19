"use client"

import { ElementInstance } from "@/components/Element"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type EditorContextType = {
     elements: ElementInstance[]
     setElements: Dispatch<SetStateAction<ElementInstance[]>>;
     addElement: (index: number, element: ElementInstance) => void;
     removeElement: (id: string) => void;

     selectedElement: ElementInstance | null;
     setSelectedElement: Dispatch<SetStateAction<ElementInstance | null>>;

     panelType: SidebarType | null
     setPanelType: Dispatch<SetStateAction<SidebarType>>;

     updateElement: (id: string, element: ElementInstance) => void;
}

export const EditorContext = createContext<EditorContextType | null>(null);

export type SidebarType = "widgets" | "settings" | "editor"

export default function EditorContextProvider({ children }: { children: ReactNode }) {
     const [elements, setElements] = useState<ElementInstance[]>([]);
     const [selectedElement, setSelectedElement] = useState<ElementInstance | null>(null);
     const [panelType, setPanelType] = useState<SidebarType>("widgets");

     const addElement = (index: number, element: ElementInstance) => {
          setElements((prev) => {
               const newElements = [...prev];
               newElements.splice(index, 0, element);
               return newElements;
          });
     };

     const removeElement = (id: string) => {
          setElements((prev) => prev.filter((element) => element.id !== id));
     };

     const updateElement = (id: string, element: ElementInstance) => {
          setElements((prev) => {
               const newElements = [...prev];
               const index = newElements.findIndex((el) => el.id === id);
               newElements[index] = element;
               return newElements;
          });
     };

     return (
          <EditorContext.Provider
               value={{
                    elements,
                    setElements,
                    addElement,
                    removeElement,

                    selectedElement,
                    setSelectedElement,

                    panelType,
                    setPanelType,

                    updateElement,
               }}
          >
               {children}
          </EditorContext.Provider>
     );
}