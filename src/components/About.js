import React from 'react';

const About = () => {
  return (
    <div>
      <style>{`
        .about-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          background-color: #f5f5f5;
        }

        .about-title {
          font-size: 36px;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 40px;
        }

        .about-description {
          max-width: 800px;
          text-align: left;
          margin-bottom: 40px;
        }

        .about-features-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .about-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .about-features-list li {
          padding: 5px 10px;
          background-color: #ddd;
          border-radius: 5px;
        }

        .about-mission-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .about-mission-description {
          max-width: 800px;
          text-align: left;
          margin-bottom: 40px;
        }

        .about-contact-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .about-contact-description {
          max-width: 800px;
          text-align: left;
          margin-bottom: 20px;
        }

        .about-contact-info {
          font-size: 18px;
          color: #333;
          margin-bottom: 10px;
        }

        .about-contact-info a {
          color: #007bff;
          text-decoration: none;
        }
      `}</style>
      <div className="about-page">
        <h1 className="about-title">About iNotebook</h1>
        <p className="about-description">iNotebook is a powerful note-taking app that allows you to organize your thoughts, ideas, and notes in one place. With its intuitive interface and robust features, iNotebook is the perfect tool for students, professionals, and anyone who wants to stay organized and productive.</p>
        <h2 className="about-features-title">Features</h2>
        <ul className="about-features-list">
          <li>Unlimited notebooks and notes</li>
          <li>Rich text formatting options</li>
          <li>Search functionality</li>
          <li>Offline access</li>
          <li>Cross-platform compatibility</li>
        </ul>
        <h2 className="about-mission-title">Our Mission</h2>
        <p className="about-mission-description">Our mission is to provide a simple, yet powerful note-taking app that helps people stay organized, focused, and productive. We believe that taking notes is a critical part of learning, thinking, and creating, and we're committed to making iNotebook the best tool for the job.</p>
        <h2 className="about-contact-title">Contact Us</h2>
        <p className="about-contact-description">If you have any questions, comments, or concerns, please don't hesitate to contact us. We're always here to help, and we're committed to providing you with the best possible support.</p>
        <p className="about-contact-info">Email: <Link href="mailto:pawanguptapawan@gmail.com">pawanguptapawan740@gmail.com</a></p>
        <p className="about-contact-info">Phone: 7737224653</p>
      </div>
    </div>
  );
};

export default About;
