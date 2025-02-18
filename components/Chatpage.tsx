import React from 'react'

const Chatpage = () => {
  return (
    <main>
    <h1 className="text-xl font-bold mb-4">Chatbot</h1>
    
    <div className="w-full max-w-lg shadow-lg rounded-lg p-4 h-[500px] overflow-y-auto flex flex-col gap-2">
        <div className="self-start bg-green-500 text-white rounded-lg p-3 max-w-[75%]">
            ask me anything
        </div>
        <div className="self-end bg-blue-500 text-white rounded-lg p-3 max-w-[75%]">
            what is your name
        </div>
        <div className="self-start bg-green-500 text-white rounded-lg p-3 max-w-[75%]">
            I am chatbot
        </div>
    </div>
    <form className="w-full max-w-lg flex mt-4  p-2 rounded-lg shadow-md">
        <input type="text" placeholder="Ask me anything!" className="flex justify-between mt-2 flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Send
        </button>
    </form>
</main>
  )
}

export default Chatpage