/* eslint-disable */
// @ts-nocheck
/* @ts-ignore */

function copyToClipboard(string: string) {
  let textarea;
  let result;

  try {
    textarea = document.createElement("textarea");
    textarea.setAttribute("readonly", true);
    textarea.setAttribute("contenteditable", true);
    textarea.style.position = "fixed";
    textarea.value = string;

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand("copy");
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    document.body.removeChild(textarea);
  }

  // manual copy fallback using prompt
  if (!result) {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const copyHotkey = isMac ? "⌘C" : "CTRL+C";
    result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
    if (!result) {
      return false;
    }
  }
  return true;
}

const handleDocumentString = (item: Record<string, any>): string => {
  return `【${item?.name}】【${item?.group}】【${item?.description}】${item?.contents}`;
};

export const handleMetadataCopy = (item: Record<string, any>): boolean => {
    const returnString = `【${item?.name}】【${item?.group}】【${item?.description}】${item?.contents}`;
    console.log(returnString);
    return copyToClipboard(returnString);
}