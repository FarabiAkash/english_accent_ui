import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Code,
  Globe,
  Mic,
  FileText,
  BarChart3,
  Github,
  Linkedin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import "./ApiDocumentation.css";

export default function ApiDocumentation() {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    {
      icon: <Globe className="feature-icon" />,
      text: "Accepts public video links (.mp4)",
    },
    {
      icon: <Mic className="feature-icon" />,
      text: "Extracts audio automatically",
    },
    {
      icon: <FileText className="feature-icon" />,
      text: "Transcribes speech using OpenAI Whisper",
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      text: "Classifies the speaker's accent using GPT",
    },
    {
      icon: <Code className="feature-icon" />,
      text: "Provides a confidence score and detailed explanation",
    },
    {
      icon: <FileText className="feature-icon" />,
      text: "Logs all activities with timestamps",
    },
  ];

  const requestExample = `{
  "video_link": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
}`;

  const responseExample = `{
  "accent_analysis": {
    "accent": "American",
    "confidence": 0.9,
    "explanation": "The transcription reflects a casual, conversational style typical of American English. Phrases like 'oh, yeah' and the reference to specific American car models (Ford SVT Raptor, Shelby GT500) suggest a cultural context rooted in the United States. Additionally, the use of 'we're going to' and the overall sentence structure align with American speech patterns. The speaker's enthusiasm and informal tone further support this classification."
  },
  "status": "success"
}`;

  const workflowSteps = [
    "Client sends a video link via POST /accent-analysis",
    "download_video fetches and saves the video locally",
    "extract_audio converts the video to a .wav audio file",
    "transcribe_audio uses OpenAI Whisper to convert speech to text",
    "analyze_accent sends the transcription to GPT to classify the accent",
    "API responds with accent type, confidence score, and explanation",
  ];

  const curlCommand = `curl -X POST https://api-carbon.nakhlah.xyz/accent-analysis/ \\
     -H "Content-Type: application/json" \\
     -d '{"video_link": "https://example.com/video.mp4"}'`;

  return (
    <div className="api-documentation">
      <div className="doc-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="doc-title-section">
          <h2 className="doc-title">🗣️ Accent Analysis API Documentation</h2>
          <p className="doc-subtitle">
            Flask-based API using OpenAI & Whisper for accent analysis
          </p>
        </div>
        <button className="expand-btn">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
          {isExpanded ? "Hide" : "Show"} Details
        </button>
      </div>

      {isExpanded && (
        <div className="doc-content">
          {/* Features Section */}
          <div className="doc-section">
            <h3 className="section-title">🚀 Features</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Request Format */}
          <div className="doc-section">
            <h3 className="section-title">📦 Request Format</h3>
            <p className="section-description">
              Send a <code>POST</code> request to <code>/accent-analysis</code>:
            </p>
            <div className="code-block">
              <pre>
                <code>{requestExample}</code>
              </pre>
            </div>
          </div>

          {/* Response Format */}
          <div className="doc-section">
            <h3 className="section-title">📤 Example Response</h3>
            <div className="code-block">
              <pre>
                <code>{responseExample}</code>
              </pre>
            </div>
          </div>

          {/* How it Works */}
          <div className="doc-section">
            <h3 className="section-title">⚙️ How it Works</h3>
            <div className="workflow-steps">
              {workflowSteps.map((step, index) => (
                <div key={index} className="workflow-step">
                  <div className="step-number">{index + 1}</div>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* cURL Example */}
          <div className="doc-section">
            <h3 className="section-title">💻 cURL Example</h3>
            <div className="code-block">
              <pre>
                <code>{curlCommand}</code>
              </pre>
            </div>
          </div>

          {/* Notes */}
          <div className="doc-section">
            <h3 className="section-title">📌 Notes</h3>
            <ul className="notes-list">
              <li>
                Ensure ffmpeg is installed and accessible in your system path
              </li>
              <li>Input video must be publicly accessible</li>
              <li>
                Use environment variables or .env files to manage API keys
                securely
              </li>
            </ul>
          </div>

          {/* Project Structure */}
          <div className="doc-section">
            <h3 className="section-title">📁 Project Structure</h3>
            <div className="code-block">
              <pre>
                <code>{`EnglishAccentAI
├── app.py
├── accent_agent/
│   ├── __init__.py
│   ├── download_video.py
│   ├── extract_audio.py
│   ├── transcribe_audio.py
│   └── analyze_accent.py
├── logs/
│   └── app_YYYYMMDD.log
├── audio/
│   └── {extracted audio files}
├── video/
│   └── {downloaded videos}
├── requirements.txt
└── README.md`}</code>
              </pre>
            </div>
          </div>

          {/* Deployment Section */}

          <div className="doc-section">
            <h3 className="section-title">🚀 Deployment</h3>
            <p className="deployment-description">
              The application follows a modern microservices architecture with
              separate deployments for frontend and backend:
            </p>
            <ul className="deployment-list">
              <li>
                <strong>Backend Deployed at:</strong>{" "}
                <a
                  href="https://englishaccentai.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://englishaccentai.onrender.com/
                </a>
                <div className="deployment-details">
                  • Hosted on Render.com for reliable cloud hosting
                  <br />
                  • Automated deployment from GitHub repository
                  <br />• Environment variables configured for API keys
                </div>
              </li>
              <li>
                <strong>Frontend Deployed at:</strong>{" "}
                <a
                  href="https://english-accent-ui.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://english-accent-ui.vercel.app/
                </a>
                <div className="deployment-details">
                  • Deployed on Vercel for optimal React.js performance
                  <br />
                  • Continuous deployment with automatic builds on push
                  <br />• Environment variables set for API endpoints
                </div>
              </li>
            </ul>
            <div className="deployment-process">
              <h4>Deployment Process:</h4>
              <p>
                1. <strong>Code Push:</strong> Changes pushed to main branch
                trigger automatic deployments
                <br />
                2. <strong>Build Process:</strong> Both platforms run build
                scripts and install dependencies
                <br />
                3. <strong>Environment Setup:</strong> Production environment
                variables are applied
                <br />
              </p>
            </div>
          </div>

          {/* Author Section */}
          <div className="doc-section">
            <h3 className="section-title">👨‍💻 Author</h3>
            <div className="author-info">
              <div className="author-header">
                <User className="author-icon" />
                <div>
                  <h4 className="author-name">Al-Farabi Akash</h4>
                  <p className="author-role">LLM and Full Stack Developer</p>
                </div>
              </div>
              <div className="contact-links">
                <a href="mailto:alfa.farabi@gmail.com" className="contact-link">
                  <Mail className="contact-icon" />
                  alfa.farabi@gmail.com
                </a>
                <a href="tel:+8801703212426" className="contact-link">
                  <Phone className="contact-icon" />
                  +880 1703 212426
                </a>
                <a
                  href="https://www.linkedin.com/in/al-farabi-akash/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Linkedin className="contact-icon" />
                  LinkedIn Profile
                </a>
                <a
                  href="https://farabiakash.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Github className="contact-icon" />
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
