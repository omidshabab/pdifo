"use client"

import { ArrowRightToLineIcon } from "lucide-react"
import NavIconButton from "../NavIconButton";

const OpenSidebarButton = () => {
     return (
          <NavIconButton
               onClick={() => null}>
               <ArrowRightToLineIcon className="text-text h-5 w-5" />
          </NavIconButton>
     );
}

export default OpenSidebarButton;