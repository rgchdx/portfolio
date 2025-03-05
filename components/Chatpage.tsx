"use client";

import React, { useRef, useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/utils/supabaseSetup";


const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; 
//since the API key is being passed and the genAI const requires a type of 
//string and not string||undefined, we will take the string if there is a string and "" if undefined
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase URL and Key are required.");
}

//Creating message type here 
type Message = {
    text: string;
    type: "user" | "bot" | "error";
}
//Creating the states for the messages
type MessageState = {
    setup: Message[];
    convos: Message[];
}

const ChatPage = () => {
    
    //state variables for the chat
    const [inputValue, setInputValue] = useState("");
    const [messages,setMessages] = useState<MessageState>({setup:[],convos:[]});
    const [loading, setLoading] = useState(false);
    //For scrolling
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [formattedData, setFormattedData] = useState<string>("");

    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(API_KEY);
    //const supabase = createClient(SUPABASE_URL, SUPABASE_KEY); // Initialize supabase client

    // Initialization of the supabase client side

    //console.log("supabase client initialized");

    //create useeffect for each table??
    useEffect(() => {
        //console.log("Fetching data from multiple tables...");
    
        //fetching from each of the different tables in supabase
        const fetchData = async () => {
            try {
                // Fetch data from multiple tables simultaneously
                const [
                    { data: foodData, error: foodError },
                    { data: friendsData, error: friendsError },
                    { data: gamesData, error: gamesError },
                    { data: generalData, error: generalError },
                    { data: hobbiesData, error: hobbiesError },
                    { data: musicData, error: musicError },
                    { data: sportsData, error: sportsError }
                ] = await Promise.all([
                    supabase.from("food").select("*"),
                    supabase.from("friends").select("*"),
                    supabase.from("games").select("*"),
                    supabase.from("general").select("*"),
                    supabase.from("hobbies").select("*"),
                    supabase.from("music").select("*"),
                    supabase.from("sports").select("*"),
                ]);
    
                // Handle errors
                if (foodError || friendsError || gamesError || generalError || hobbiesError || musicError || sportsError) {
                    console.error("Error fetching data:", {
                        foodError, friendsError, gamesError, generalError, hobbiesError, musicError, sportsError
                    });
                    setError("Error fetching data from Supabase");
                    return;
                }
    
                // Ensure there's data
                if (
                    (!foodData || foodData.length === 0) &&
                    (!friendsData || friendsData.length === 0) &&
                    (!gamesData || gamesData.length === 0) &&
                    (!generalData || generalData.length === 0) &&
                    (!hobbiesData || hobbiesData.length === 0) &&
                    (!musicData || musicData.length === 0) &&
                    (!sportsData || sportsData.length === 0)
                ) {
                    console.warn("No data found in any Supabase table.");
                    return;
                }
    
                // Format each dataset
                const formatSection = <T,>(data: T[], title: string, fields: (keyof T)[]) => 
                    data?.map(item => `${title}: ${fields.map(field => `${String(field)}: ${item[field]}`).join(", ")}`).join("\n") || "";

                const formattedFood = formatSection(foodData, "Food", ["name", "level_of_liking", "food_from_where", "memo"]);
                const formattedFriends = formatSection(friendsData, "Friend", ["name", "where_we_met","memo", "friend_group"]);
                const formattedGames = formatSection(gamesData, "Game", ["years_played", "when_i_played", "memo"]);
                const formattedGeneral = formatSection(generalData, "General", ["about", "memo"]);
                const formattedHobbies = formatSection(hobbiesData, "Hobby", ["name", "memo"]);
                const formattedMusic = formatSection(musicData, "Music", ["artist", "song", "genre","concerts","memo"]);
                const formattedSports = formatSection(sportsData, "Sport", ["sports_name", "level_of_interest", "memo"]);
                console.log("Formatted Food:", formattedFood);
                console.log("Formatted Friends:", formattedFriends);
                console.log("Formatted Games:", formattedGames);
                console.log("Formatted General:", formattedGeneral);
                console.log("Formatted Hobbies:", formattedHobbies);
                console.log("Formatted Music:", formattedMusic);
                console.log("Formatted Sports:", formattedSports);
    
                // Combine formatted data from all tables
                const formattedString = [
                    formattedFood,
                    formattedFriends,
                    formattedGames,
                    formattedGeneral,
                    formattedHobbies,
                    formattedMusic,
                    formattedSports
                ].filter(Boolean).join("\n\n"); // Remove empty sections and add spacing
    
                console.log("Formatted Data:", formattedString);
                setFormattedData(formattedString);
    
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

    //initial setup of the AI when we get the formatted data
    useEffect(() => {
        if (!formattedData) return; //Don't run AI setup if no formatted data
    
        const makeChatReady = async () => {
            console.log("Formatted Data for AI:", formattedData); // Debugging
    
            //prompt setting here
            const userMessage = `Hey! I will call you Vixer and behave like a friendly friend of Richie. Use the information from the Supabase dataset provided only and nothing outside that. The dataset is:\n\n${formattedData}. The people who will be asking you questions will be people who are not familiar with Richie. The person who will be asking you questions will not be Richie. So please be friendly and helpful to them. Please answer the questions in a friendly manner and be as helpful as possible. When getting the data from the dataset, do not use * to indicate special names or fields but fix them into a normal conversational format.`;
    
            //state update function provided by the useState hook. Adds to the array of userMessages to keep track
            setMessages((prev) => ({
                ...prev,
                setup: [...prev.setup, { text: userMessage, type: "user" }]
            }));
    
            try {
                //initialization of the AI model and generating content
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
                const result = await model.generateContent(userMessage);
                const botMessage = result.response.text();
    
                //updating and adding to the array of botMessages to keep track
                setMessages((prev) => ({
                    ...prev,
                    setup: [...prev.setup, { text: botMessage, type: "bot" }]
                }));
            } catch (error) {
                console.error("Something went wrong:", error);
                setMessages((prev) => ({
                    ...prev,
                    setup: [...prev.setup, { text: "Something went wrong", type: "error" }]
                }));
            } finally {
                setLoading(false);
            }
        };
    
        makeChatReady(); //calling the async function
    }, [formattedData]); //dependency array and when this is null, will not run

    //function to handle the input change
    //e is the event object that is passed in when the user types
    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    }

    //taking in the input value and getting the response from the AI
    const getResponseForGivenPrompt = async () => {
        //if there is no input value, return
        if (!inputValue.trim()) return;
    
        const userMessage = inputValue;
        //add it to the array again
        setMessages(prev => ({
            ...prev,
            convos: [...prev.convos, { text: userMessage, type: "user" }]
        }));
        //reset the input value to the default
        setInputValue("");
    
        try {
            //while operating, set loading to true
            setLoading(true);
    
            //creating a single string context by concatenating the text of messages from two arrays, setup and convos
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

    //sending in the response and calling getResponseForGivenPrompt
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
                                <div>
                                    {error && <div className="text-red-500">{error}</div>}
                                </div>
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