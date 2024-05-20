"use client"

import { UndoIcon } from "lucide-react"
import NavIconButton from "../NavIconButton";

const UndoButton = () => {
     return (
          <NavIconButton
               onClick={() => null}>
               <UndoIcon className="text-text h-5 w-5" />
          </NavIconButton>
     );
}

export default UndoButton;