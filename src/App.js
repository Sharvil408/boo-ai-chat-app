import React, { useState, useRef, useEffect, useCallback } from 'react';

// Main App component
const App = () => {
  // State to control the visibility of the "Made by Sharvil897" popup
  const [showMadeByPopup, setShowMadeByPopup] = useState(true); // Set to true to show on load

  // State to store the chat history (messages from user and AI)
  const [chatHistory, setChatHistory] = useState([]);
  // State to store the current user input
  const [userInput, setUserInput] = useState('');
  // State to manage loading indicator during AI response generation
  const [loading, setLoading] = useState(false);
  // Ref to automatically scroll to the bottom of the chat history
  const chatEndRef = useRef(null);

  // States for the code preview modal
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeContent, setCodeContent] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('');
  const [codeTitle, setCodeTitle] = useState('');
  // New state to toggle between code view and live preview in the modal
  const [showLivePreview, setShowLivePreview] = useState(false);
  // State for the custom "Copied!" toast message
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  // Effect to scroll to the bottom whenever chatHistory updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Function to handle image generation
  const handleGenerateImage = async (prompt) => {
    try {
      const payload = { instances: { prompt: prompt }, parameters: { "sampleCount": 1 } };
      const apiKey = "AIzaSyAnrKsK5cwWxRGw8ylwAS34FphuCGG1MGo"; // <--- PASTE YOUR API KEY HERE
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
        setChatHistory((prev) => [...prev, { sender: 'ai', url: imageUrl, messageType: 'image', prompt: prompt }]);
      } else {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Error: Image generation failed or no image was returned. Please try a different prompt.', messageType: 'text' }]);
        console.error('Image generation API response structure or content missing:', result);
      }
    } catch (error) {
      setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Error: Failed to generate image. Please check your network connection.', messageType: 'text' }]);
      console.error('Image generation API call failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle code generation (simulated)
  const handleGenerateCode = async (prompt) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    let generatedCode = '';
    let language = 'html';
    let title = 'Generated HTML Code';

    if (prompt.toLowerCase().includes('html')) {
      generatedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boo AI HTML Example</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { 
          font-family: 'Inter', sans-serif; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          min-height: 100vh; 
          background-color: #F2F2F7; /* iOS system background */
          margin: 0;
          overflow: hidden;
        }
        .card {
            padding: 2.5rem; 
            background-color: #FFFFFF; /* iOS system fill */
            border-radius: 1.25rem; /* More rounded */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle iOS shadow */
            text-align: center;
            border: 1px solid #E5E5EA; /* iOS separator */
            transform: scale(1);
            transition: all 0.2s ease-in-out;
        }
        .card:hover {
            transform: scale(1.01); 
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
        .card-title {
            font-size: 2.25rem; 
            font-weight: 700; /* Bold */
            color: #1C1C1E; /* iOS system gray 6 */
            margin-bottom: 1.25rem; 
        }
        .card-description {
            color: #6C6C70; /* iOS system gray */
            font-size: 1.1rem;
            line-height: 1.6;
        }
        .action-button {
            margin-top: 2rem; 
            padding: 0.75rem 1.75rem; 
            background-color: #007AFF; /* iOS system blue */
            color: #FFFFFF;
            border-radius: 0.625rem; 
            font-weight: 600;
            transition: all 0.1s ease-in-out;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .action-button:hover {
            background-color: #006EE6; /* Darker blue on hover */
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
        }
        .action-button:active {
            transform: translateY(1px); /* Press effect */
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="card">
        <h1 class="card-title">Welcome to Boo AI's Page!</h1>
        <p class="card-description">This is a beautifully crafted HTML example generated by your AI assistant, showcasing a modern design with Tailwind CSS.</p>
        <button class="action-button">Explore More</button>
    </div>
</body>
</html>`;
      language = 'html';
      title = 'Enhanced HTML Page';
    } else if (prompt.toLowerCase().includes('react')) {
      generatedCode = `import React from 'react';

const MyAdvancedComponent = ({ userName, theme = 'light' }) => {
  const bgColor = theme === 'light' ? 'bg-ios-system-fill' : 'bg-ios-system-fill-dark';
  const textColor = theme === 'light' ? 'text-ios-label' : 'text-ios-label-dark';
  const buttonBg = theme === 'light' ? 'bg-ios-system-blue' : 'bg-ios-system-blue-dark';
  const buttonHover = theme === 'light' ? 'hover:bg-ios-system-blue-dark' : 'hover:bg-ios-system-blue';

  return (
    <div className={\`p-8 rounded-2xl shadow-ios-card-light text-center \${bgColor} \${textColor} border border-ios-separator\`}>
      <h2 className="text-3xl font-bold mb-4">Hello, {userName || 'Guest'}!</h2>
      <p className="text-lg mb-6">This is a dynamic React component with theme support.</p>
      <button className={\`px-6 py-3 rounded-xl font-semibold \${buttonBg} \${buttonHover} text-white transition-all duration-200 shadow-ios-button-light\`}>
        Learn More
      </button>
    </div>
  );
};

export default MyAdvancedComponent;`;
      language = 'jsx';
      title = 'Advanced React Component';
    } else if (prompt.toLowerCase().includes('python')) {
        generatedCode = `import math

def calculate_area_of_circle(radius):
    """Calculates the area of a circle given its radius."""
    if radius < 0:
        return "Radius cannot be negative."
    area = math.pi * (radius ** 2)
    return f"The area of a circle with radius {radius} is: {area:.2f}"

# Example usage:
print(calculate_area_of_circle(5))
print(calculate_area_of_circle(10.5))
`;
        language = 'python';
        title = 'Python Circle Area Calculator';
    } else {
      generatedCode = `// A more complex JavaScript example
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Example usage:
// fetchData('https://jsonplaceholder.typicode.com/todos/1');
`;
      language = 'javascript';
      title = 'Advanced JavaScript Fetch Example';
    }

    setChatHistory((prev) => [...prev, { sender: 'ai', text: `Here is the ${language} code you requested:`, messageType: 'text' }]);
    setChatHistory((prev) => [...prev, { sender: 'ai', code: generatedCode, language: language, title: title, messageType: 'code' }]);

    // Open the code modal
    setCodeContent(generatedCode);
    setCodeLanguage(language);
    setCodeTitle(title);
    setShowCodeModal(true);
    setShowLivePreview(language === 'html'); // Automatically show preview for HTML
    setLoading(false);
  };

  // Function to handle text generation using Gemini API
  const handleTextGeneration = async (prompt, type) => {
    try {
      const chatHistoryForAPI = chatHistory
        .filter(msg => msg.messageType === 'text')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));
      chatHistoryForAPI.push({ role: 'user', parts: [{ text: prompt }] });

      const payload = { contents: chatHistoryForAPI };
      const apiKey = "AIzaSyAnrKsK5cwWxRGw8ylwAS34FphuCGG1MGo"; // <--- PASTE YOUR API KEY HERE
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setChatHistory((prev) => [...prev, { sender: 'ai', text: aiResponseText, messageType: 'text' }]);
      } else {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: `Error: Could not get a response from Boo AI for ${type}. Please try again.`, messageType: 'text' }]);
        console.error('Unexpected API response structure:', result);
      }
    } catch (error) {
      setChatHistory((prev) => [...prev, { sender: 'ai', text: `Error: Failed to connect to Boo AI for ${type}. Please check your network connection.`, messageType: 'text' }]);
      console.error('API call failed:', error);
    } finally {
      setLoading(false);
    }
  };


  // Function to handle sending a message (text, image, or code command)
  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    setChatHistory((prev) => [...prev, { sender: 'user', text: trimmedInput, messageType: 'text' }]);
    setUserInput('');

    setLoading(true);

    const lowerCaseInput = trimmedInput.toLowerCase();

    if (lowerCaseInput.startsWith('/image ')) {
      const imagePrompt = trimmedInput.substring('/image '.length).trim();
      if (!imagePrompt) {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Please provide a prompt for the image. Example: /image a red car', messageType: 'text' }]);
        setLoading(false);
        return;
      }
      setChatHistory((prev) => [...prev, { sender: 'ai', text: `Generating image for: "${imagePrompt}"...`, messageType: 'text' }]);
      await handleGenerateImage(imagePrompt);
    } else if (lowerCaseInput.startsWith('/code ') || lowerCaseInput.includes('code') || lowerCaseInput.includes('write html') || lowerCaseInput.includes('write react') || lowerCaseInput.includes('write python')) {
        const codePrompt = trimmedInput.substring('/code '.length).trim() || trimmedInput;
        setChatHistory((prev) => [...prev, { sender: 'ai', text: `Generating code for: "${codePrompt}"...`, messageType: 'text' }]);
        await handleGenerateCode(codePrompt);
    }
    else if (lowerCaseInput.startsWith('/continue ')) {
      const continuePrompt = trimmedInput.substring('/continue '.length).trim();
      let fullPrompt = continuePrompt;
      if (!continuePrompt) {
        // If no text provided, try to continue the last AI message
        const lastAiMessage = chatHistory.slice().reverse().find(msg => msg.sender === 'ai' && msg.messageType === 'text');
        if (lastAiMessage) {
          fullPrompt = `Continue the following text: "${lastAiMessage.text}"`;
        } else {
          setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Please provide text to continue, or ensure there is a previous AI message to continue from. Example: /continue Once upon a time...', messageType: 'text' }]);
          setLoading(false);
          return;
        }
      } else {
        fullPrompt = `Continue the following text: "${continuePrompt}"`;
      }
      setChatHistory((prev) => [...prev, { sender: 'ai', text: `Continuing text based on: "${continuePrompt || 'last AI message'}"... ✨`, messageType: 'text' }]);
      await handleTextGeneration(fullPrompt, 'text continuation');
    }
    else if (lowerCaseInput.startsWith('/brainstorm ')) {
      const brainstormTopic = trimmedInput.substring('/brainstorm '.length).trim();
      if (!brainstormTopic) {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Please provide a topic to brainstorm. Example: /brainstorm marketing ideas', messageType: 'text' }]);
        setLoading(false);
        return;
      }
      const fullPrompt = `Brainstorm ideas for: "${brainstormTopic}"`;
      setChatHistory((prev) => [...prev, { sender: 'ai', text: `Brainstorming ideas for: "${brainstormTopic}"... ✨`, messageType: 'text' }]);
      await handleTextGeneration(fullPrompt, 'brainstorming');
    }
    else if (lowerCaseInput.startsWith('/summarize ')) {
      const summarizeText = trimmedInput.substring('/summarize '.length).trim();
      let fullPrompt = summarizeText;
      if (!summarizeText) {
        const lastAiMessage = chatHistory.slice().reverse().find(msg => msg.sender === 'ai' && msg.messageType === 'text');
        if (lastAiMessage) {
          fullPrompt = `Summarize the following text: "${lastAiMessage.text}"`;
        } else {
          setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Please provide text to summarize, or ensure there is a previous AI message to summarize from. Example: /summarize This is a long paragraph...', messageType: 'text' }]);
          setLoading(false);
          return;
        }
      } else {
        fullPrompt = `Summarize the following text: "${summarizeText}"`;
      }
      setChatHistory((prev) => [...prev, { sender: 'ai', text: `Summarizing text... ✨`, messageType: 'text' }]);
      await handleTextGeneration(fullPrompt, 'summarization');
    }
    else if (lowerCaseInput.startsWith('/translate ')) {
      const translateCommand = trimmedInput.substring('/translate '.length).trim();
      const parts = translateCommand.split(' ');
      if (parts.length < 2) {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Please provide a language and text to translate. Example: /translate French Hello world!', messageType: 'text' }]);
        setLoading(false);
        return;
      }
      const targetLanguage = parts[0];
      const textToTranslate = parts.slice(1).join(' ');
      const fullPrompt = `Translate the following text into ${targetLanguage}: "${textToTranslate}"`;
      setChatHistory((prev) => [...prev, { sender: 'ai', text: `Translating to ${targetLanguage}... ✨`, messageType: 'text' }]);
      await handleTextGeneration(fullPrompt, 'translation');
    }
    else if (
        lowerCaseInput.includes('who are you') ||
        lowerCaseInput.includes('what are you') ||
        lowerCaseInput.includes('your name') ||
        lowerCaseInput.includes('who made you') ||
        lowerCaseInput.includes('owner')
    ) {
      setTimeout(() => {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: 'I am Boo AI, a creation of Sharvil897. I\'m here to assist you with generating text, images, and code!', messageType: 'text' }]);
        setLoading(false);
      }, 500);
    } else {
      // Default text generation using Gemini API
      const apiChatHistory = chatHistory
        .filter(msg => msg.messageType === 'text')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));
      apiChatHistory.push({ role: 'user', parts: [{ text: trimmedInput }] });

      try {
        const payload = { contents: apiChatHistory };
        const apiKey = "AIzaSyAnrKsK5cwWxRGw8ylwAS34FphuCGG1MGo"; // <--- PASTE YOUR API KEY HERE
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const aiResponseText = result.candidates[0].content.parts[0].text;
          setChatHistory((prev) => [...prev, { sender: 'ai', text: aiResponseText, messageType: 'text' }]);
        } else {
          setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Error: Could not get a response from Boo AI. Please try again.', messageType: 'text' }]);
          console.error('Unexpected API response structure:', result);
        }
      } catch (error) {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Error: Failed to connect to Boo AI. Please check your network connection.', messageType: 'text' }]);
        console.error('API call failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  const copyCodeToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = codeContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setShowCopiedToast(true);
    setTimeout(() => {
      setShowCopiedToast(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-ios-system-background text-ios-label font-inter relative overflow-hidden">
      {/* "Made by Sharvil897" Popup */}
      {showMadeByPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ease-out animate-fade-in">
          <div className="bg-ios-system-fill rounded-3xl shadow-ios-modal-light border border-ios-separator p-8 text-center transition-transform duration-300 ease-out animate-slide-in-up">
            <h2 className="text-2xl font-bold text-ios-system-blue mb-4">Made by Sharvil897</h2>
            <p className="text-ios-label text-lg mb-6">Welcome to Boo AI!</p>
            <button
              onClick={() => setShowMadeByPopup(false)}
              className="px-6 py-3 bg-ios-system-blue hover:bg-ios-system-blue-dark text-white font-semibold rounded-xl shadow-ios-button-light transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ios-system-blue focus:ring-offset-2 focus:ring-offset-ios-system-background transform active:scale-95"
            >
              Start Chatting
            </button>
          </div>
        </div>
      )}

      {/* Header/Dashboard - iOS like navigation bar */}
      <header className="relative z-10 flex items-center justify-between px-5 py-4 bg-ios-system-fill-translucent backdrop-blur-3xl rounded-b-3xl mx-4 mt-4 border border-ios-separator shadow-ios-header-light transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-ios-system-blue">Boo AI</h1>
        <div className="text-md text-ios-secondary-label">Made by Sharvil897</div>
      </header>

      {/* Chat History Area - iOS like message bubbles */}
      <main className="relative z-10 flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar mx-4 my-4 bg-ios-system-fill-translucent-medium backdrop-blur-2xl rounded-3xl shadow-ios-card-light border border-ios-separator">
        {/* Instructions for image and code generation */}
        <div className="flex justify-center text-center mb-6">
          <div className="max-w-xl p-3 rounded-2xl shadow-ios-subtle-light bg-ios-system-fill-light text-ios-secondary-label text-base border border-ios-separator transition-all duration-300 ease-in-out">
            To generate an image, type <code className="bg-ios-system-fill-medium px-2 py-0.5 rounded-md text-ios-label font-mono text-sm">/image your prompt here</code>
            <br />
            To generate code, type <code className="bg-ios-system-fill-medium px-2 py-0.5 rounded-md text-ios-label font-mono text-sm">/code your prompt here</code> (e.g., "write html for a button")
            <br />
            To continue text, type <code className="bg-ios-system-fill-medium px-2 py-0.5 rounded-md text-ios-label font-mono text-sm">/continue [your text]</code>
            <br />
            To brainstorm ideas, type <code className="bg-ios-system-fill-medium px-2 py-0.5 rounded-md text-ios-label font-mono text-sm">/brainstorm [your topic]</code>
            <br />
            To summarize text, type <code className="bg-ios-system-fill-medium px-2 py-0.5 rounded-md text-ios-label font-mono text-sm">/summarize [your text]</code>
            <br />
            To translate text, type <code className="bg-ios-system-fill-medium px-2 py-0.5 rounded-md text-ios-label font-mono text-sm">/translate [language] [your text]</code>
          </div>
        </div>

        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex transition-all duration-500 ease-out transform ${message.sender === 'user' ? 'justify-end animate-slide-in-right-ios' : 'justify-start animate-slide-in-left-ios'}`}
            style={{ animationDelay: `${index * 0.08}s` }} // Staggered animation
          >
            {message.messageType === 'text' ? (
              // Render text messages
              <div
                className={`max-w-xl p-4 rounded-2xl shadow-ios-bubble-light border ${
                  message.sender === 'user'
                    ? 'bg-ios-system-blue text-white border-ios-system-blue-dark'
                    : 'bg-ios-system-fill text-ios-label border-ios-separator'
                } transition-all duration-300 ease-in-out`}
              >
                {message.text}
              </div>
            ) : message.messageType === 'image' ? (
              // Render image messages
              <div
                className="max-w-xl p-4 rounded-2xl shadow-ios-bubble-light bg-ios-system-fill border border-ios-separator transition-all duration-300 ease-in-out"
              >
                <p className="text-ios-label mb-3 text-base font-medium">Image for: "{message.prompt}"</p>
                <img
                  src={message.url}
                  alt={`Generated image for "${message.prompt}"`}
                  className="max-w-full h-auto rounded-xl border border-ios-separator shadow-ios-image-light transition-all duration-300 ease-in-out hover:scale-[1.01]"
                  // Fallback for image loading errors
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x200/FF0000/FFFFFF?text=Image+Load+Error"; }}
                />
              </div>
            ) : (
              // Render code messages (just a trigger for the modal)
              <div
                className={`max-w-xl p-4 rounded-2xl shadow-ios-bubble-light bg-ios-system-fill text-ios-label border border-ios-separator cursor-pointer transition-all duration-300 ease-in-out hover:bg-ios-system-fill-light`}
                onClick={() => {
                  setCodeContent(message.code);
                  setCodeLanguage(message.language);
                  setCodeTitle(message.title);
                  setShowCodeModal(true);
                  setShowLivePreview(message.language === 'html'); // Set preview for HTML
                }}
              >
                <p className="font-semibold text-ios-system-blue text-lg">Code Generated: {message.title}</p>
                <p className="text-base text-ios-secondary-label mt-1">Tap to view code</p>
              </div>
            )}
          </div>
        ))}
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-xl p-4 rounded-2xl shadow-ios-bubble-light bg-ios-system-fill text-ios-label border border-ios-separator">
              <div className="flex items-center">
                <svg className="animate-spin h-6 w-6 mr-3 text-ios-system-blue" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Boo AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} /> {/* Scroll target */}
      </main>

      {/* Input Area - iOS like input field and button */}
      <footer className="relative z-10 p-5 bg-ios-system-fill-translucent backdrop-blur-3xl border-t border-ios-separator rounded-t-3xl mx-4 mb-4 shadow-ios-footer-light transition-all duration-300 ease-in-out">
        <div className="flex space-x-3">
          <input
            type="text"
            className="flex-1 p-3 rounded-full bg-ios-system-fill-light border border-ios-separator text-ios-label placeholder-ios-secondary-label focus:outline-none focus:ring-2 focus:ring-ios-system-blue focus:border-ios-system-blue transition duration-200 shadow-inner-ios-light text-base"
            placeholder="Message Boo AI..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            className="w-12 h-12 flex items-center justify-center bg-ios-system-blue hover:bg-ios-system-blue-dark text-white rounded-full shadow-ios-button-light transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ios-system-blue focus:ring-offset-2 focus:ring-offset-ios-system-background disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            disabled={loading || !userInput.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </footer>

      {/* Code Preview Modal - iOS like modal presentation */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ease-out animate-fade-in">
          <div className="bg-ios-system-fill rounded-3xl shadow-ios-modal-light border border-ios-separator w-11/12 max-w-6xl h-5/6 flex flex-col transition-transform duration-300 ease-out animate-slide-in-up">
            <div className="flex justify-between items-center p-5 border-b border-ios-separator">
              <h2 className="text-xl font-bold text-ios-system-blue">{codeTitle}</h2>
              <div className="flex items-center space-x-3">
                {codeLanguage === 'html' && (
                  <button
                    onClick={() => setShowLivePreview(!showLivePreview)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      showLivePreview ? 'bg-ios-system-blue text-white shadow-ios-button-light' : 'bg-ios-system-fill-light text-ios-label hover:bg-ios-system-fill-medium shadow-ios-subtle-light'
                    } focus:outline-none focus:ring-2 focus:ring-ios-system-blue`}
                  >
                    {showLivePreview ? 'Hide Preview' : 'Show Preview'}
                  </button>
                )}
                <button
                  onClick={copyCodeToClipboard}
                  className="px-4 py-2 bg-ios-system-blue hover:bg-ios-system-blue-dark text-white font-semibold rounded-xl shadow-ios-button-light transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ios-system-blue focus:ring-offset-2 focus:ring-offset-ios-system-background transform active:scale-95 text-sm"
                >
                  Copy Code
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-2 rounded-full bg-ios-system-fill-light hover:bg-ios-system-fill-medium text-ios-secondary-label transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ios-system-blue shadow-ios-subtle-light"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {/* Code View */}
              <div className={`${showLivePreview && codeLanguage === 'html' ? 'w-1/2' : 'w-full'} flex-shrink-0 p-5 overflow-auto custom-scrollbar transition-all duration-300 ease-in-out`}>
                <pre className="bg-ios-system-grouped-background p-4 rounded-xl text-sm leading-relaxed overflow-x-auto border border-ios-separator shadow-inner-ios-light h-full">
                  <code className={`language-${codeLanguage} text-ios-code-green`}>
                    {codeContent}
                  </code>
                </pre>
                {codeLanguage === 'jsx' && (
                  <div className="mt-4 p-3 bg-ios-system-yellow-light text-ios-system-yellow-dark rounded-lg border border-ios-system-yellow-border text-sm shadow-ios-subtle-light">
                    Live preview for React (JSX) code is not supported in this environment.
                  </div>
                )}
                {codeLanguage !== 'html' && codeLanguage !== 'jsx' && (
                  <div className="mt-4 p-3 bg-ios-system-blue-light text-ios-system-blue-dark rounded-lg border border-ios-system-blue-border text-sm shadow-ios-subtle-light">
                    Live preview is currently only available for HTML code.
                  </div>
                )}
              </div>

              {/* Live Preview (for HTML only) */}
              {showLivePreview && codeLanguage === 'html' && (
                <div className="w-1/2 flex-shrink-0 p-5 overflow-auto custom-scrollbar border-l border-ios-separator transition-all duration-300 ease-in-out">
                  <h3 className="text-lg font-semibold text-ios-system-blue mb-3">Live Preview</h3>
                  <iframe
                    srcDoc={codeContent}
                    title="Code Preview"
                    className="w-full h-full bg-ios-system-fill rounded-xl border border-ios-separator shadow-ios-subtle-light"
                    sandbox="allow-scripts allow-same-origin" // Essential for iframe security
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Copied Toast Message - iOS like toast */}
      {showCopiedToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 px-5 py-3 bg-ios-system-fill-translucent-dark backdrop-blur-lg text-white rounded-xl shadow-ios-toast animate-fade-in animate-slide-in-up-toast z-50">
          Copied to clipboard!
        </div>
      )}

      {/* Custom Scrollbar and Animation Styling */}
    </div>
  );
};

export default App;
