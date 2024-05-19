"use client"

import Canvas from "@/components/canvas";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import EditorSidebar from "@/components/sidebars/EditorSidebar";
import PageSidebar from "@/components/sidebars/PageSidebar";
import PanelSidebar from "@/components/sidebars/PanelSidebar";
import { Separator } from "@/components/ui/separator";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

const Page = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext id="EditorContext" sensors={sensors}>
      <div className="flex flex-row w-full h-full z-20">
        <PanelSidebar>
          <EditorSidebar />
        </PanelSidebar>
        <Separator
          orientation="vertical"
          className="bg-primary/10" />
        <Canvas />
        <Separator
          orientation="vertical"
          className="bg-primary/10" />
        <PageSidebar />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default Page;