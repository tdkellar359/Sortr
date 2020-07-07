import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './PublicPage.css';

const pageStyle = {
  width: '90vw',
  margin: '5vh auto 0 auto'
}

const carouselItemStyle = {
  textAlign: 'center'
}

const PublicPage = () => {
  return (
    <div style={pageStyle}>
      <h1>Welcome to Sortr!</h1>
      <p>
        Sortr is an open source cloud storage service developed using Flask and ReactJS.
      </p>
      <p>
        The goal of this project was to see how much I was able to create in one day of
        work. Check out the git homepage <a href="_blank">here</a> if you'd like to fork
        the repository or contribute in any way!
      </p>
      <h2>About Me</h2>
      <p>
        I am a rising senior at the Univsity of Michigan, pursuing a degree in computer
        science. In my free time, I like rock climbing, long boarding, reading, and -- of course --
        coding.
      </p>
      <h2>Using Sortr</h2>
      <p>
        To get started, all you need to do is <a href="/signup">create an account</a>!
      </p>
    </div>
  );
}

export default PublicPage;