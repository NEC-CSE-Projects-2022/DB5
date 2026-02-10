import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, Target, ArrowRight } from "lucide-react";
import Hero3D from "@/components/Hero3D";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-3d-wrapper">
          <Hero3D />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>AI-Powered Summarization</span>
          </div>
          <h1 className="hero-title">Transform Long Texts into Concise Summaries</h1>
          <p className="hero-description">
            Leverage the power of advanced AI models to instantly summarize lengthy documents,
            articles, and texts with precision and clarity.
          </p>
          <Link to="/summarize">
            <Button className="hero-button" data-testid="try-now-button">
              Try It Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Definition Section */}
      <section className="definition-section">
        <div className="section-container">
          <h2 className="section-title">What is Text Summarization?</h2>
          <Card className="definition-card">
            <CardContent className="definition-content">
              <p>
                Text summarization is the process of distilling the most important information from a source text
                to produce a shorter version that retains the key messages and essential details. Using advanced
                natural language processing (NLP) and machine learning algorithms, our system analyzes content
                semantically to generate accurate, coherent, and contextually relevant summaries.
              </p>
              <p className="mt-4">
                Our platform employs state-of-the-art transformer models including BART (Bidirectional and
                Auto-Regressive Transformers), T5 (Text-to-Text Transfer Transformer), and PEGASUS
                (Pre-training with Extracted Gap-sentences for Abstractive Summarization) to deliver
                high-quality summaries across multiple perspectives.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Significance Section */}
      <section className="significance-section">
        <div className="section-container">
          <h2 className="section-title">Why Text Summarization Matters</h2>
          <div className="features-grid">
            <Card className="feature-card" data-testid="feature-card-1">
              <CardContent className="feature-content">
                <div className="feature-icon">
                  <Zap size={28} />
                </div>
                <h3 className="feature-title">Save Time</h3>
                <p className="feature-description">
                  Quickly extract key information from lengthy documents, research papers, and reports.
                  What takes hours to read can be understood in minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="feature-card-2">
              <CardContent className="feature-content">
                <div className="feature-icon">
                  <Target size={28} />
                </div>
                <h3 className="feature-title">Enhance Productivity</h3>
                <p className="feature-description">
                  Focus on what matters most by getting straight to the core message. Perfect for
                  professionals dealing with information overload.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card" data-testid="feature-card-3">
              <CardContent className="feature-content">
                <div className="feature-icon">
                  <Sparkles size={28} />
                </div>
                <h3 className="feature-title">Multiple Perspectives</h3>
                <p className="feature-description">
                  Get summaries from three different AI models, each offering unique insights and
                  approaches to text understanding.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Summarize?</h2>
          <p className="cta-description">
            Experience the power of AI-driven text summarization today
          </p>
          <Link to="/summarize">
            <Button className="cta-button" data-testid="get-started-button">
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;