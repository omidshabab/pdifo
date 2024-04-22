import Canvas from "@/components/Canvas";
import PagesSidebar from "@/components/Sidebars/PageSidebar";
import PanelSidebar from "@/components/Sidebars/PanelSidebar";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="flex flex-row w-full h-full z-20">
      <PanelSidebar />
      <Separator
        orientation="vertical"
        className="bg-primary/10" />
      <Canvas />
      <Separator
        orientation="vertical"
        className="bg-primary/10" />
      <PagesSidebar />
    </div>
  );
}

export default Page;