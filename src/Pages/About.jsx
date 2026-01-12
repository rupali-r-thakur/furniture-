import my_picture from "../Images/aboutImg.jpeg";
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  return (
    <div className="about_container">
      <div className="img">
        <img src={my_picture} alt="" />
      </div>
      <div className="about_content">
        <h1>About Me</h1>
        <p>
          We are a professional Furniture Thekedar with strong experience in
          handling residential and commercial furniture projects. We manage
          complete furniture contracts with proper planning, skilled labor
          coordination, and quality execution.
        </p>
        <p>
          From raw material selection to final finishing, we ensure every stage
          of work is completed with precision and responsibility. Our focus is
          on timely project completion, cost-effective solutions, and durable
          workmanship.
        </p>
        <p>
          We work closely with clients, architects, and interior designers to
          deliver furniture projects as per design requirements and timelines.
          Trust, transparency, and commitment are the core values of our work.
        </p>
        <p>
          If you are looking for a reliable furniture contractor who delivers
          quality work on time, we are here to handle your project
          professionally.
        </p>
        <button
  onClick={() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
>
  Contact Me
</button>
        <h2>Why Choose Me?</h2>
        <ul>
          <li>Experienced Furniture Worker & Thekedar</li>
          <li>Custom Design & Quality Materials</li>
          <li>On-Time Work Completion</li>
          <li>Affordable & Transparent Pricing</li>
          <li>Reliable After-Service Support</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
