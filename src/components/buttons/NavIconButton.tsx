import { ReactNode } from "react";

const NavIconButton = ({
     children,
     onClick
}: {
     children?: ReactNode,
     onClick?: () => void
}) => {
     return (
          <div
               onClick={onClick}
               className="flex justify-center items-center w-[40px] h-[40px] aspect-square bg-primary/5 hover:bg-primary/10 transition-all duration-500 p-2 rounded-full cursor-pointer">
               {children}
          </div>
     );
}

export default NavIconButton;