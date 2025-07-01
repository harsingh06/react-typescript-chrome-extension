document.body.style.backgroundColor = 'lightblue';
chrome.runtime.sendMessage({ message: "Hello from google.com content script" });
