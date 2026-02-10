import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Contact3D from "@/components/Contact3D";
import "./Contact.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      toast.success(response.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to send message. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="page-heading">Contact Us</h1>
          <p className="page-subheading">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="contact-split-layout">
          {/* Left Side: 3D Model */}
          <div className="contact-visual-column">
            <div className="model-container">
              <Contact3D />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-form-column">
            <Card className="contact-form-card" data-testid="contact-form-card">
              <CardHeader>
                <CardTitle className="form-title">
                  <Mail className="inline mr-2" size={24} />
                  Send us a Message
                </CardTitle>
                <CardDescription className="form-description">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      data-testid="contact-name-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      data-testid="contact-email-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      rows={6}
                      data-testid="contact-message-input"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                    data-testid="contact-submit-button"
                  >
                    {loading ? "Sending..." : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info Row */}

      </div>
    </div>
  );
}

export default Contact;