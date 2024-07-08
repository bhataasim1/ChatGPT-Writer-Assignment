export const dispatchInputEvent = (element: HTMLElement) => {
  const event = new Event("input", { bubbles: true })
  element.dispatchEvent(event)
}
