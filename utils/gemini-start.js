import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import supabase from './supabaseClient';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function getSupabaseData(tableName) {
    const{ data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error(`Error fetching data from ${tableName}:`, error);
        return null;
    } else if (tableName == null){
        tableName = "general";
        const { data, error } = await supabase.from(tableName).select('*');
    }
    return data;
}


//find maybe a better way for here
function determineTable(userQuery) {
    const tableMapping = {
        "friends": "friends",
        "food": "food",
        "sports": "sports",
        "music": "music",
        "hobbies": "hobbies",
        "games": "games"
    };

    // Check if the query contains any keywords matching a table name
    for (const key in tableMapping) {
        if (userQuery.toLowerCase().includes(key)) {
            return tableMapping[key];
        }
    }
    
    return "general"; 
}

async function getResponse(userQuery) {
    const tableName = determineTable(userQuery);
    const data = await getSupabaseData(tableName);
    if (!data) {
        return "Sorry, I couldn't fetch the data.";
    }

    const formatData = JSON.stringify(data, null, 2);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Based on the following database records, answer the query: "${userQuery}"\n\nData:\n${formattedData}`;
        
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        const response = result.response.text();

        return response;
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "I encountered an error while generating the response.";
    }
}