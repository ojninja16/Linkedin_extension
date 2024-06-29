import React, { useEffect, useState } from "react";
import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";
import { createRoot } from "react-dom/client";
import { FaMagic, FaDownload, FaRedo,FaPaperPlane, FaArrowDown, FaSync } from "react-icons/fa"; // Importing icons from react-icons

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
};

// export const getStyle = () => {
//   const style = document.createElement("style");
//   style.textContent = cssText;
//   return style;
// };
const AIIcon = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [iconPosition, setIconPosition] = useState({ top: 10, left: 30 });
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector(".msg-form__contenteditable");
      if (messageInput) {
        const handleFocus = () => {
          setShowIcon(true);
          const rect = messageInput.getBoundingClientRect();
          setIconPosition({ top: rect.bottom - 30, left: rect.right - 30 });
        };
        const handleBlur = () => {
          if (!isInteracting) {
            setShowIcon(false);
          }
        };
        messageInput.addEventListener("focus", handleFocus);
        messageInput.addEventListener("blur", handleBlur);
        return () => {
          messageInput.removeEventListener("focus", handleFocus);
          messageInput.removeEventListener("blur", handleBlur);
        };
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [isInteracting]);
  const handleGenerate = () => {
    setGeneratedText("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
  };
  const handleInsert = () => {
    const messageInput = document.querySelector(".msg-form__contenteditable p");
    if (messageInput) {
      messageInput.innerHTML = generatedText;
      const inputEvent = new Event('input', { bubbles: true });
      messageInput.dispatchEvent(inputEvent);
      const changeEvent = new Event('change', { bubbles: true });
      messageInput.dispatchEvent(changeEvent);
      setShowModal(false);
    }
  };
  return (
    <>
      {showIcon && (
        <div
          className="fixed z-50 p-3 bg-white text-blue-500 rounded-full cursor-pointer text-xl shadow-lg"
          style={{ top: iconPosition.top, left: iconPosition.left }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsInteracting(true);
            setShowModal(true);
          }}
        >
          <FaMagic />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-xl p-8 w-[500px] max-w-[90vw] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {generatedText && (
              <div className="flex flex-col items-start mb-6">
                <div className="self-end p-3 mb-3 bg-gray-200 rounded font-medium text-sm">
                  {prompt}
                </div>
                <div className="self-start p-3 bg-blue-100 rounded font-medium text-base">
                  {generatedText}
                </div>
              </div>
            )}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your prompt"
                className="w-full p-3 mb-4 border border-gray-300 rounded font-medium text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-end">
                {!generatedText ? (
                  <button
                    className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 font-semibold text-base"
                    onClick={handleGenerate}
                  >
                    <FaPaperPlane className="mr-2" />
                    Generate
                  </button>
                ) : (
                  <>
                    <button
                      className="flex items-center justify-center px-6 py-3 mr-3 bg-gray-500 text-white rounded hover:bg-gray-700 font-semibold text-base"
                      onClick={handleInsert}
                    >
                      <FaArrowDown className="mr-2" />
                      Insert
                    </button>
                    <button
                      className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 font-semibold text-base"
                      onClick={handleGenerate}
                    >
                      <FaSync className="mr-2" />
                      Regenerate
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = createRoot(rootElement);
root.render(<AIIcon />);

export default AIIcon;
