import Canvas from "@/components/canvas";
import PagesSidebar from "@/components/sidebars/pages-sidebar";
import WidgetsSidebar from "@/components/sidebars/widgets-sidebar";
import { Separator } from "@/components/ui/separator";

export const widgets = [1, 2, 3, 4, 5, 6];
export const pages = [1, 2, 3, 4, 5, 6]

const Page = () => {
  return (
    <div className="flex flex-row w-full h-full z-20">
      <WidgetsSidebar />
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