'use client';

import { useAppStore } from '../../store';

export default function AssistantInfo() {
  const currentMenuItem = useAppStore((state) => state.currentMenuItem);

  if (!currentMenuItem || currentMenuItem.id === 'home') {
    return null;
  }

  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
      <span className="text-xl">{currentMenuItem.icon}</span>
      <span className="text-lg font-medium">{currentMenuItem.title}</span>
    </div>
  );
}
