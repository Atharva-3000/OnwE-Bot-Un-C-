import React, { useState } from "react";
import getChatCompletion from "./helpers/getChatCompletion";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

const App = () => {
  const [input, setInput] = useState("");
  const [chatCompletion, setChatCompletion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetChatCompletion = async () => {
    if (!input) return; // Avoid calling API with empty input
    setLoading(true);
    const response = await getChatCompletion(input);
    setChatCompletion(response);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGetChatCompletion();
  };

  return (
    <div className="flex justify-center flex-col items-center mt-5 w-auto mx-10">
      <div className="justify-start">

      <p className="text-4xl font-semibold">OnwE Bot</p>
      </div>
      <div>
        <form onSubmit={handleFormSubmit} className="w-[50vw] items-center justify-center flex flex-col gap-4 mb-5">
          <Textarea value={input} onChange={handleInputChange} placeholder="Enter your question..." className="bg-white border border-gray-500 rounded-lg"/>
          <Button variant={"secondary"} type="submit" className="bg-black border  rounded-xl text-white w-1/3 hover:bg-blue-600 hover:text-white">Answer</Button>
        </form>
      </div>
      {chatCompletion && (
        <div className="bg-gray-200 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold">Reply:</h3>
          {loading ? "Loading..." : <p className="text-gray-600">{chatCompletion}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
