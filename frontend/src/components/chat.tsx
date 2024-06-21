'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useWebSocket from "@/lib/hooks/useWebsocket";
import { useState } from "react";

export function Chat() {
  const { messages, sendMessage } = useWebSocket('wss://websockets-example-1.onrender.com');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-semibold">Chat with AI</h1>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <span className="text-sm">AI Assistant</span>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div className={`flex items-start gap-4 ${index % 2 === 0 ? '' : 'justify-end'}`} key={index}>
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{index % 2 === 0 ? 'You' : 'AI'}</AvatarFallback>
            </Avatar>
            <div className={`bg-${index % 2 === 0 ? 'muted' : 'primary'} text-${index % 2 === 0 ? 'muted' : 'primary'}-foreground rounded-lg p-4 max-w-[75%]`}>
              <p>{message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-background border-t px-6 py-4">
      <div className="relative">
        <Textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..." 
          className="pr-16 rounded-lg" 
          rows={1} 
        />
        <Button 
          onClick={handleSend}
          type="submit" 
          size="icon" 
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
    </div>
  )
}

function LoaderIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  )
}


function SendIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}
