import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, FileText } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import "./Summarize.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function Summarize() {
  const [text, setText] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim() || text.trim().length < 10) {
      toast.error("Please enter at least 10 characters of text to summarize");
      return;
    }

    setLoading(true);
    setError("");
    setSummaries([]);

    try {
      const response = await axios.post(`${API}/summarize`, { text });
      setSummaries(response.data.summaries);
      toast.success("Text summarized successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to summarize text. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setSummaries([]);
    setError("");
  };

  // Helper function to count words
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="summarize-page">
      <div className="summarize-container">
        {/* Header */}
        <div className="summarize-header">
          <h1 className="page-heading">Text Summarization</h1>
          <p className="page-subheading">Enter your text and get summaries from multiple AI models</p>
        </div>

        {/* Input Section */}
        <Card className="input-card" data-testid="input-card">
          <CardHeader>
            <CardTitle className="card-title">
              <FileText className="inline mr-2" size={20} />
              Enter Your Text
            </CardTitle>
            <CardDescription className="card-description">
              Paste or type the text you want to summarize. We'll process it using multiple AI models.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              data-testid="text-input"
              placeholder="Enter your text here... (minimum 10 characters)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-area"
              rows={8}
            />
            <div className="button-group">
              <Button
                data-testid="summarize-button"
                onClick={handleSummarize}
                disabled={loading || !text.trim()}
                className="summarize-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Summarize Text
                  </>
                )}
              </Button>
              <Button
                data-testid="clear-button"
                onClick={handleClear}
                variant="outline"
                disabled={loading}
                className="clear-button"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="error-alert" data-testid="error-alert">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading Animation */}
        {loading && (
          <div className="results-section">
            <h2 className="results-heading">Generating Summaries...</h2>
            <div className="summaries-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="summary-card loading-card">
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-700 rounded w-1/3 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
                      <div className="h-4 bg-slate-800 rounded w-4/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {!loading && summaries.length > 0 && (
          <div className="results-section" data-testid="results-section">
            <h2 className="results-heading">Summarization Results</h2>
            <div className="summaries-grid">
              {summaries.map((summary, index) => (
                <div key={index} className="summary-card">
                  <div className="p-6">
                    <h3 className="model-name">{summary.model_name}</h3>
                    {summary.error ? (
                      <div className="text-red-600 text-sm mt-2">Error: {summary.error}</div>
                    ) : (
                      <>
                        <p className="summary-text mt-4">{summary.summary}</p>
                        <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                          <span>Word Count: <strong>{countWords(summary.summary)}</strong> words</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summarize;