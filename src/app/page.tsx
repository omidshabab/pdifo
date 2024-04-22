"use client"

import Canvas from "@/components/canvas";
import PageSidebar from "@/components/sidebars/page-sidebar";
import PanelSidebar from "@/components/sidebars/panel-sidebar";
import { Separator } from "@/components/ui/separator";
import { DndContext } from "@dnd-kit/core";

const Page = () => {
  return (
    <DndContext>
      <div className="flex flex-row w-full h-full z-20">
        <PanelSidebar />
        <Separator
          orientation="vertical"
          className="bg-primary/10" />
        <Canvas />
        <Separator
          orientation="vertical"
          className="bg-primary/10" />
        <PageSidebar />
      </div>
    </DndContext>
  );
}

export default Page;