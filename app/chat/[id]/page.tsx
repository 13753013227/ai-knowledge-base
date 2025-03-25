'use client';

import { useParams } from 'next/navigation';
import ChatComponent from '../../components/Chat/page';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;

  return (
    <ChatComponent
      title={chatId}
      assistantId={chatId}
    />
  );
}
