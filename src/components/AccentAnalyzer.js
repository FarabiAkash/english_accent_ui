import React, { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import "./AccentAnalyzer.css";

export default function AccentAnalyzer() {
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault && e.preventDefault();

    if (!videoLink.trim()) {
      setError("Please enter a video link");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "https://englishaccentai.onrender.com/accent-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video_link: videoLink.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze accent. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to parse confidence string like "95.0%" to 95
  function parseConfidence(confidenceStr) {
    if (!confidenceStr) return 0;
    const num = parseFloat(confidenceStr.replace("%", ""));
    return isNaN(num) ? 0 : num;
  }

  return (
    <div className="accent-analyzer">
      <div className="container">
        <div className="card">
          <h1 className="title">Accent Analyzer</h1>
          <p className="subtitle">
            Submit a video link to analyze the speaker's accent
          </p>

          <div className="input-section">
            <div className="input-group">
              <input
                type="url"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="Enter video URL (e.g., https://example.com/video.mp4)"
                className="url-input"
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !videoLink.trim()}
                className="submit-btn"
              >
                {loading ? (
                  <Loader2 className="icon spin" />
                ) : (
                  <Send className="icon" />
                )}
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-section">
              <AlertCircle className="error-icon" />
              <div>
                <h3 className="error-title">Error</h3>
                <p className="error-message">{error}</p>
              </div>
            </div>
          )}

          {result && result.status === "success" && (
            <div className="result-section">
              <div className="result-header">
                <CheckCircle className="success-icon" />
                <h2 className="result-title">Analysis Complete</h2>
              </div>

              <div className="result-content">
                <div className="result-card">
                  <div className="result-grid">
                    <div>
                      <h3 className="result-label">Detected Accent</h3>
                      <p className="accent-value">
                        {result.accent_analysis.accent}
                      </p>
                    </div>
                    <div>
                      <h3 className="result-label">Confidence</h3>
                      <div className="confidence-section">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${parseConfidence(
                                result.accent_analysis.confidence
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="confidence-value">
                          {parseConfidence(result.accent_analysis.confidence)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="explanation-card">
                  <h3 className="explanation-title">Analysis Explanation</h3>
                  <p className="explanation-text">
                    {result.accent_analysis.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
