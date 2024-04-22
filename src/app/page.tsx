"use client"

import Canvas from "@/components/Canvas";
import PagesSidebar from "@/components/sidebars/PageSidebar";
import PanelSidebar from "@/components/sidebars/PanelSidebar";
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
        <PagesSidebar />
      </div>
    </DndContext>
  );
}

export default Page;