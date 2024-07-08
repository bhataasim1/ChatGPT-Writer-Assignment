import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { Icons } from "~common/Icons"
import PromptInput from "~features/PromptInput"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [showPromptInput, setShowPromptInput] = useState<boolean>(false)

  const handleFocusIn = (event: FocusEvent) => {
    const target = event.target as HTMLElement
    if (
      target.tagName === "TEXTAREA" ||
      target.getAttribute("contenteditable") === "true"
    ) {
      setIsFocused(true)
      setTargetElement(target)
    }
  }

  const handleFocusOut = (event: FocusEvent) => {
    const target = event.target as HTMLElement
    if (
      target.tagName === "TEXTAREA" ||
      target.getAttribute("contenteditable") === "true"
    ) {
      setTimeout(() => {
        setIsFocused(false)
        setTargetElement(null)
      }, 200)
    }
  }

  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn)
    document.addEventListener("focusout", handleFocusOut)

    return () => {
      document.removeEventListener("focusin", handleFocusIn)
      document.removeEventListener("focusout", handleFocusOut)
    }
  }, [])

  const handlePromptClick = () => {
    setShowPromptInput(true)
  }

  const handleClosePrompt = () => {
    setShowPromptInput(false)
  }

  return (
    <>
      {isFocused && targetElement && (
        <div
          className="fixed z-50"
          style={{
            top:
              targetElement.getBoundingClientRect().top +
              window.scrollY +
              targetElement.offsetHeight -
              36,
            left:
              targetElement.getBoundingClientRect().left +
              window.scrollX +
              targetElement.offsetWidth -
              40
          }}>
          <button onClick={handlePromptClick}>
            <Icons.AIIcon />
          </button>
        </div>
      )}
      {showPromptInput && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleClosePrompt}>
          <div
            className="bg-white p-4 rounded-md"
            onClick={(e) => e.stopPropagation()}>
            <PromptInput
              targetElement={targetElement}
              onClose={handleClosePrompt}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PlasmoOverlay
