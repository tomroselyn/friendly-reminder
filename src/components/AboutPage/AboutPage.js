import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div className="about-container">
      <p>
        <strong>Friendly Reminder</strong> is a web application designed to make it easy to keep up with friends on a regular basis.
      </p>
      <p>For many of us, there are simply too many people in our lives to keep up with, and too often the ones we care about most slip through the cracks. Moreover, many of my contacts are really only available through specific channels. Certain people I contact only through email, or only through text messaging, or only through a social media network like Facebook or LinkedIn.</p>
      <p>I built Friendly Reminder to solve these problems. After creating an account, I am able to set up each contact with multiple contact addresses, including a preferred contact method. I will also set a frequency for each, or how many days should pass before I'm reminded again to get in touch.</p>
      <p>Friendly Reminder was built with React, Redux Sagas, Node, Express, and PostgreSQL. It also uses Material-UI for styling, Sweet Alerts for pop-up alerts, and Nodemailer for sending emails from the app.</p>
    </div>
  </div>
);

export default AboutPage;
