import React from "react";

const IconButton = ({
     children,
     onClick
}: {
     children: React.ReactNode,
     onClick?: () => void
}) => {
     return (
          <div
               onClick={onClick}
               className="cursor-pointer hover:opacity-60 transition-all duration-300">
               {children}
          </div>
     );
}

export default IconButton;