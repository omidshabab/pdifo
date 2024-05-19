import { SettingsIcon } from "lucide-react";
import IconButton from "../IconButton";

const SettingButton = ({ ...props }) => {
     return (
          <IconButton {...props}>
               <SettingsIcon size={18} />
          </IconButton>
     );
}

export default SettingButton;