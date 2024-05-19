import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

function useEditor() {
     const context = useContext(EditorContext)

     if (!context) {
          throw new Error("useDesigner must be used within a DesignerContext");
     }

     return context;
}

export default useEditor;