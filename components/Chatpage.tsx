"use client";

import React, { useState } from "react";

const functionUrl = 'https.xxxxxxxxx.lambda-url.us-east-1.on.aws/'; // Replace with your actual function URL

// Message object to store chat messages
type Message = {
  text: string;
  sender: "ai" | "user";
};

const Chatpage = () => {
  // State to store the input value
  const [newInputValue,setNewInputValue] = useState('');
  
  // State to store messages
  const [messages, setMessages] = useState<Message[]>([]); // Initialize with an empty array since chat is an array

  const newMessage: React.FormEventHandler = async (e) => {
    e.preventDefault(); //stopping any propagation of the event before
    setNewInputValue(''); //so that they know that they registered it
    const newMessages: Message[] = [...messages,  { //take whatever messages are there (...) and add a new message
        text: newInputValue,
        sender: "user",
    }];
    //we send the entire array of messages to the backend (to the ai)
    const response = await fetch(functionUrl, { //fetch will make an http post request to the url
        method: 'POST',
        body: JSON.stringify({messages: newMessages})
      }); 
    setMessages([...newMessages,{
        sender:'ai',
        text: await response.text() //awaiting the response from the server
    }]) //updating the messages
  }


  return (
    <main className="flex flex-col items-center justify-center p-6 w-full h-screen">
      <h1 className="text-3xl font-bold mb-6">Chatbot</h1>

      <div className="w-full max-w-4xl flex-grow shadow-lg rounded-lg p-6 h-[70vh] overflow-y-auto flex flex-col gap-4">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`rounded-lg p-3 max-w-[75%] ${
              message.sender === "ai"
                ? "bg-green-600 text-white self-start"
                : "bg-gray-200 text-black self-end"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>

      <form className="flex w-full max-w-4xl justify-between mt-4" onSubmit={newMessage}>
        <input
          type="text"
          placeholder="Ask me anything!"
          value={newInputValue}
          onChange={(e) => setNewInputValue(e.currentTarget.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="ml-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Send
        </button>
      </form>
    </main>
  );
};

export default Chatpage;
