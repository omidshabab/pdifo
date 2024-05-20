"use client"

import { RedoIcon } from "lucide-react"
import NavIconButton from "../NavIconButton";

const RedoButton = () => {
     return (
          <NavIconButton
               onClick={() => null}>
               <RedoIcon className="text-text h-5 w-5" />
          </NavIconButton>
     );
}

export default RedoButton;