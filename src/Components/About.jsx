import my_picture from "../Images/Mypicture.jpeg";

function About() {
  return (
    <div className="about_container">
      <div className="img">
        <img src={my_picture} alt="" />
      </div>
      <div className="about_content">
        <h1>About Me</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, commodi
          est. Natus numquam assumenda ipsum quas, explicabo ullam facere
          deleniti harum sint quae, consectetur, molestias dolore alias soluta
          accusamus sunt?
        </p>
      </div>
    </div>
  );
}

export default About;
