import React from "react";
import { FaLinkedin, FaMagic, FaRobot, FaComments } from "react-icons/fa";
import "~style.css";

const IndexPopup = () => {
  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-[480px]">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h1 className="text-xl font-bold text-blue-600">AI Reply Generator</h1>
        <FaLinkedin className="text-3xl text-blue-600" />
      </div>
      <p className="text-sm mb-6 text-gray-600">Enhance your LinkedIn conversations with AI-powered responses</p>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Feature 
          icon={<FaMagic />}
          title="Smart Replies"
          description="Context-aware responses"
        />
        <Feature 
          icon={<FaRobot />}
          title="AI-Powered"
          description="Advanced language AI"
        />
        <Feature 
          icon={<FaComments />}
          title="Customizable"
          description="Personalize with ease"
        />
      </div>
      
      <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Get Started
      </button>
    </div>
  );
};
const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-3xl mb-2 text-blue-500">{icon}</div>
    <h2 className="font-semibold text-sm mb-1">{title}</h2>
    <p className="text-gray-500 text-xs">{description}</p>
  </div>
);

export default IndexPopup;