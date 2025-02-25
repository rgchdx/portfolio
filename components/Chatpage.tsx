"use client";

import React, { useRef, useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/utils/supabaseSetup";
import { createClient } from "@supabase/supabase-js";


const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; 
//since the API key is being passed and the genAI const requires a type of 
//string and not string||undefined, we will take the string if there is a string and "" if undefined
//const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
//const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

type Message = {
    text: string;
    type: "user" | "bot" | "error";
}
type MessageState = {
    setup: Message[];
    convos: Message[];
}

const ChatPage = () => {
    
    //state variables for the chat
    const [inputValue, setInputValue] = useState("");
    const [messages,setMessages] = useState<MessageState>({setup:[],convos:[]});
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(API_KEY);
    //const supabase = createClient(SUPABASE_URL, SUPABASE_KEY); // Initialize supabase client

    // Initialization of the supabase client side
    const [data,setData] = useState<any[]>([]);

    console.log("supabase client initialized");

    //create useeffect for each table??
    useEffect(() => {
        console.log("useEffect for supabase");
        const fetchData = async () => {
            console.log("Fetching data...");
            try {
                const { data, error } = await supabase.from("friends").select("*");
                
                if (error) {
                    console.error("Supabase fetch error:", error);
                    setError(error.message);
                } else {
                    setData(data);
                    console.log("Fetched data:", data);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                setError("Unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    //scroll to the bottom when the message updates
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages,loading]);

    useEffect(() => {
        //if(data.length === 0) return; //not executing here
        //fetchData();
        const makeChatReady = async () => {
            //const introduction = data.map((item) => item.introduction).join("\n");
            const userMessage = `Hey! I will call you Vixer and behave like a friendly friend of Richie. Use the information from the supabase dataset provided only and nothing outside that. The dataset is: ${data}`;
            setMessages((prev) => ({
                ...prev,
                setup: [...prev.setup, {text: userMessage, type: "user"}]
            }))
            try{
                const context = messages.setup.map((msg) => msg.text).join("\n") + "\n" + userMessage;
                const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"});
                const result = await model.generateContent(context);
                const botMessage = result.response.text();
                setMessages((prev) => ({
                    ...prev,
                    setup: [...prev.setup, {text: botMessage, type: "bot"}]
                }))
            }catch(error){
                console.log("Something went wrong: "+error);
                setMessages((prev) => ({
                    ...prev,
                    setup: [...prev.setup, {text: "Something went wrong", type: "error"}]
                }))
            }finally{
                setLoading(false);
            }
        };
        makeChatReady();
    },[])

    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => { //check this later
        setInputValue(e.target.value);
    }

    const getResponseForGivenPrompt = async () => {
        if (!inputValue.trim()) return;
    
        const userMessage = inputValue;
        setMessages(prev => ({
            ...prev,
            convos: [...prev.convos, { text: userMessage, type: "user" }]
        }));
        setInputValue("");
    
        try {
            setLoading(true);
    
            const context = [
                ...messages.setup.map(msg => msg.text),
                ...messages.convos.map(msg => msg.text),
                userMessage
            ].join("\n");
    
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = await model.generateContent(context);
            const botMessage = result.response.text();
    
            setMessages(prev => ({
                ...prev,
                convos: [...prev.convos, { text: botMessage, type: "bot" }]
            }));
        } catch (error) {
            console.error("Something went wrong:", error);
            setMessages(prev => ({
                ...prev,
                setup: [...prev.setup, { text: "Something went wrong", type: "error" }]
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
        if(e.key === "Enter") {
            e.preventDefault();
            getResponseForGivenPrompt();
        }
    }

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