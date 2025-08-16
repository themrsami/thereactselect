"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { CodeBlock } from "./code-block";
import { cn } from "../../lib/utils";

interface ExampleCardProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  className?: string;
}

export function ExampleCard({ 
  title, 
  description, 
  preview, 
  code, 
  className 
}: ExampleCardProps) {
  return (
    <div className={cn(
      "space-y-4 p-6 rounded-lg border border-border bg-card",
      className
    )}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-4">
          <div className="min-h-[100px] p-4 rounded-md border border-border bg-background/50 flex items-center">
            {preview}
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="mt-4">
          <CodeBlock code={code} language="tsx" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
