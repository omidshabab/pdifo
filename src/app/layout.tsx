import type { Metadata } from "next";
import "@/styles/globals.css";
import EditorContextProvider from "@/lib/context/EditorContext";
import { LangFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pdifo - An online tool to create Pdfs with Drag & Drop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const font = LangFont("en");

  return (
    <html lang="en">
      <body className={cn(
        font,
        "cursor-default",
      )}>
        <div className="w-full h-screen relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-orange-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <EditorContextProvider>
            {children}
          </EditorContextProvider>
        </div>
      </body>
    </html>
  );
}