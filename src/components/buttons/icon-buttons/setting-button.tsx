import { SettingsIcon } from "lucide-react";
import IconButton from "../icon-button";

const SettingButton = ({ ...props }) => {
     return (
          <IconButton {...props}>
               <SettingsIcon size={18} />
          </IconButton>
     );
}

export default SettingButton;