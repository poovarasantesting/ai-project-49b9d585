import React from 'react';
import { Navbar } from '@/components/navbar';
import { FlowEditorWithProvider } from '@/components/flow-chart/flow-editor';
import { Toaster } from 'sonner';

export function EditorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <FlowEditorWithProvider />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}