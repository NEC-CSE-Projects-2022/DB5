import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Mail, Linkedin } from "lucide-react";
import "./About.css";

function About() {
  const teamMembers = [
    {
      name: "R. Nandu",
      role: "Team Leader",
      description: "Leading the project with strategic vision and technical oversight for the text summarization system.",
      email: "nandu@nec.edu.in",
      linkedin: "#",
      image: "/images/team_member_3.png.jpg"
    },
    {
      name: "K. David Shalem",
      role: "Team Member",
      description: "Contributing expertise in backend development and machine learning model integration.",
      email: "david@nec.edu.in",
      linkedin: "#",
      image: "/images/team_member_2.png.jpg"
    },
    {
      name: "Sk. Faheem Ahmed",
      role: "Team Member",
      description: "Specializing in frontend development and user interface design for optimal user experience.",
      email: "faheem@nec.edu.in",
      linkedin: "#",
      image: "/images/team_member_1.jpg.jpg"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-container">


        {/* Team Section */}
        <section className="team-section">
          <div className="team-header">
            <Users size={32} className="team-icon" />
            <h2 className="section-title">Our Team</h2>
          </div>
          <p className="team-description">
            Our team of dedicated students from Narasaraopeta Engineering College bringing together skills in AI, NLP, and software development.
          </p>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <Card key={index} className="team-card" data-testid={`team-card-${index}`}>
                <CardHeader>
                  <div className="member-avatar">
                    <img src={member.image} alt={member.name} className="member-image" />
                  </div>
                  <CardTitle className="member-name">{member.name}</CardTitle>
                  <p className="member-role">{member.role}</p>
                </CardHeader>
                <CardContent className="member-content">
                  <p className="member-description">{member.description}</p>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* College Section */}
        <section className="college-section">
          <Card className="college-card" data-testid="college-card">
            <div className="college-card-inner">
              <div className="college-image-container">
                <img src="/images/nec_college_new.png" alt="Narasaraopeta Engineering College" className="college-image" />
                <div className="college-overlay"></div>
              </div>
              <div className="college-info-container">
                <CardHeader>
                  <div className="college-header">
                    <Building2 size={32} className="college-icon" />
                    <CardTitle className="college-title">Narasaraopeta Engineering College</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="college-content">
                  <p className="institution-details">
                    <strong>Department of Computer Science & Engineering</strong>
                  </p>
                  <p className="institution-location">
                    Narasaraopeta, Andhra Pradesh, India
                  </p>
                  <p className="mt-4">
                    Narasaraopeta Engineering College (NEC) is one of the premier institutions located in Narasaraopeta, Andhra Pradesh.
                    With a legacy of excellence in technical education, NEC is committed to nurturing students into highly skilled professionals.
                  </p>
                  <p className="mt-4">
                    This project is submitted as part of our final year B.Tech program, focusing on practical applications of deep learning
                    in Natural Language Processing.
                  </p>
                  <div className="mt-6">
                    <a href="https://nrtec.in/" target="_blank" rel="noopener noreferrer" className="visit-website-btn">
                      Visit Website
                    </a>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>

        {/* Footer Note */}
        <div className="about-footer">
          <p>&copy; 2025 SummarizePro. All rights reserved.</p>
          <p>A project by NEC Students.</p>
        </div>
      </div>
    </div>
  );
}

export default About;