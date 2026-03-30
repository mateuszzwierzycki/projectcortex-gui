import { useState } from 'react'
import { MessageSquare, Layout, Settings, Send, User, Bot, Code2, FolderTree } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am Antigravity initialized in Project Cortex. I\'ve prepared the GUI environment. What shall we hack on today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'human', text: inputText }]);
    const currentInput = inputText;
    setInputText('');
    
    // Add a loading message
    const loadingId = Date.now() + 1;
    setMessages(prev => [...prev, { 
      id: loadingId, 
      sender: 'ai', 
      text: '...' 
    }]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY environment variable is missing.');
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      const result = await model.generateContent(currentInput);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => prev.map(msg => 
        msg.id === loadingId ? { ...msg, text: text } : msg
      ));
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === loadingId ? { ...msg, text: `Error: ${error.message}` } : msg
      ));
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-icon">
          <Bot size={28} color="var(--accent)" />
        </div>
        <div style={{ flex: 1 }}></div>
        <button className="sidebar-icon active" title="Chat">
          <MessageSquare size={22} />
        </button>
        <button className="sidebar-icon" title="Workspace">
          <Layout size={22} />
        </button>
        <button className="sidebar-icon" title="Settings">
          <Settings size={22} />
        </button>
        <div style={{ flex: 1 }}></div>
        <div className="sidebar-icon" style={{ marginBottom: '12px' }}>
          <User size={22} />
        </div>
      </nav>

      <main className="main-content">
        {/* Chat Pane */}
        <section className="chat-pane">
          <header className="chat-header">
            <h1>
              <span className="status-dot"></span>
              Antigravity Assistant
            </h1>
          </header>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={msg.id} className={`message ${msg.sender}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="avatar">
                  {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <div className="input-wrapper">
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Message Antigravity or ask a context query..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="send-btn" disabled={!inputText.trim()}>
                <Send size={16} />
              </button>
            </div>
          </form>
        </section>

        {/* Code / Context Pane */}
        <section className="code-pane">
          <header className="pane-header">
            <div className="tab active">
              <Code2 size={16} />
              Working Context
            </div>
            <div className="tab">
              <FolderTree size={16} />
              Workspace Explorer
            </div>
          </header>
          
          <div className="editor-area">
            <div className="placeholder-glass">
              <h2>Project Cortex Shell</h2>
              <p>Select a file to view or begin Agent execution to populate this pane.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
