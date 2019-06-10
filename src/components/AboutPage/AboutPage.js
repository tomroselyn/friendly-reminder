import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div className="about-container">
      <p>We all have busy lives, and too often we let ourselves forget to contact the people we care about. Moreover, some contacts are only available through specific channels.</p>
      <p>To address these issues, I built <strong>Friendly Reminder</strong>, a web application designed to make it easier to keep up with friends and family on a regular basis.</p>
      <p>Try it yourself by creating an account. Once signed in, you will be able to enter contact information and frequency preference for your friends, see them pop up on the dashboard, and take action right away.</p>
      <p>Friendly Reminder was built with React, Redux, Node, Express, and Postgres. It uses Material-UI for styling, Sweet Alerts for the confirmation pop-ups, Nodemailer for sending emails, and Twilio for sending text messages from the app (disabled on Heroku).</p>
    </div>
  </div>
);

export default AboutPage;
