import React from 'react';
import { Link } from 'react-router-dom';
import './PublicPage.css';

const pageStyle = {
  width: '90vw',
  margin: '5vh auto 0 auto',
};

const PublicPage = () => (
  <div style={pageStyle}>
    <h1>Welcome to Sortr!</h1>
    <p>
      Sortr is an open source cloud storage service developed using Flask and ReactJS.
    </p>
    <p>
      The goal of this project was to see how much I was able to create in one day of
      work. Check out the git homepage&nbsp;
      <a href="https://github.com">here</a>
      &nbsp;if you&apos;d like to fork the repository or contribute in any way!
    </p>
    <h2>About Me</h2>
    <p>
      I am a rising senior at the Univsity of Michigan, pursuing a degree in computer
      science. In my free time, I like rock climbing, long boarding, reading, and -- of course --
      coding.
    </p>
    <h2>Using Sortr</h2>
    <p>
      To get started, all you need to do is&nbsp;
      <Link to="/signup">create an account</Link>
      !
    </p>
  </div>
);

export default PublicPage;
