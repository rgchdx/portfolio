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