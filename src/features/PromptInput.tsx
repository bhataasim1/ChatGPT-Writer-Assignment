import React, { useEffect, useRef, useState } from "react"
import { Icons } from "~common/Icons"
import { RESPONSE_MESSAGE } from "~constants/constants";
import { dispatchInputEvent } from "~events/dispatchEvent";

interface PromptInputProps {
  targetElement: HTMLElement | null;
  onClose: () => void;
}

const PromptInput = ({ targetElement, onClose }: PromptInputProps) => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const targetElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (targetElement) {
      targetElementRef.current = targetElement;
    }
  }, [targetElement]);

  const handleGenerate = () => {
    setResponse(RESPONSE_MESSAGE);
  }

  const insertTextIntoTarget = () => {
    const target = targetElementRef.current;
    if (target) {
      if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
        const inputElement = target as HTMLInputElement;
        inputElement.value = response;
        dispatchInputEvent(inputElement);
      } else if (target.getAttribute("contenteditable") === "true") {
        const pElement = target.querySelector("p");
        if (pElement) {
          pElement.innerText = response;
        } else {
          target.innerHTML = `<p>${response}</p>`;
        }
        dispatchInputEvent(target);
      }
      onClose();
    }
  }

  const handleInsert = () => {
    insertTextIntoTarget();
  }

  return (
    <div className="flex flex-col p-2 rounded-lg w-[400px]">
      <input
        type="text"
        placeholder="Reply thanking for the opportunity"
        className="flex-grow p-4 border border-gray-300 rounded-lg mb-2"
        value={response ? response : prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex justify-end mt-2 space-x-2">
        {response ? (
          <>
            <button
              className="flex px-4 py-2 rounded-lg border-input border-2 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
              onClick={handleInsert}
            >
              <Icons.InsertIcon className="text-xs mr-2" />
              Insert
            </button>

            <button
              className="flex px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              onClick={handleGenerate}
            >
              <Icons.ReGenerateIcons className="text-xs mr-2" />
              Regenerate
            </button>
          </>
        ) : (
          <button
            className="flex px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
            onClick={handleGenerate}
          >
            <Icons.GenerateIcon className="text-xs mr-2" />
            Generate
          </button>
        )}
      </div>
    </div>
  )
}

export default PromptInput
