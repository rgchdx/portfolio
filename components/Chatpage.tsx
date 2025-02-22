"use client";

import React, { useRef, useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; 
//since the API key is being passed and the genAI const requires a type of 
//string and not string||undefined, we will take the string if there is a string and "" if undefined

const ChatPage = () => {
    
    const [inputValue, setInputValue] = useState("");
    const [messages,setMessages] = useState({setup:[],convos:[]});
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement|null>(null);

    const genAI = new GoogleGenerativeAI(API_KEY);

    //scroll to the bottom when the message updates
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages,loading]);

    useEffect(() => {
        const makeChatReady = async () => {
            const userMessage = "Hey! I will call you Vex"
        }
    },[])

    return(
        <div className="flex flex-col h-screen bg-black-100">
            {/* picture and header */}
            <div className="p-4 flex flex-col items-center ">
                <img src="/images/vixer.png" alt="vixer" className="w-40 h-40 rounded-full"/>
                <h1 className="mt-4 text-3xl md:text-3xl font-extrabold text-green-500 tracking-wide drop-shadow-lg">VIXER</h1>
            </div>

            {/* chat messages */}
            <main className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.convos.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`max-w-3xl p-4 rounded-md break-words ${
                        msg.type === 'user' 
                        ? 'bg-white text-black self-end ml-auto' 
                        : 'bg-green-500 text-white self-start'
                        }`}
                    >
                        {msg.text} 
                    </div>
                ))}
                {
                    loading && (
                    <div className="flex self-start my-4">
                        <div className="p-4 bg-green-300 text-white slef-start rounded-md ">
                            <div className="w-6 h-6 border-4 border-green-300 animate-spin border-dashed rouded-full">

                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef}></div>
            </main>

            {/* input form */}
            <footer className="bg-white border-t border-green-300 p-4 ">
                <div className="flex space-x-2">
                    <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything!"
                    className="flex-1 p-3 border-green-500 rounded-md focus:outline-none focus:ring focus:ring-green-300 resize-none"
                    rows={1}
                    >
                    </textarea>
                    <button 
                    onClick={getResponseForGivenPrompt}
                    className="flex-shrink-0 p-3 bg-green-500 text-white rounded-md focus:outline-none focus:ring focus:ring-color-300 hover:bg-green-900"
                    >
                        {loading ? "..." : "Send"}
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default ChatPage;