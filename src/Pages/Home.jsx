import { Link } from "react-router-dom";
import Videoclip from "../Videos/VideoClip.mp4";
function Home() {
  return (
    <div className="container">
      <video autoPlay loop muted playsInline className="backgraound_Clip">
        <source src={Videoclip} type="video/mp4" />
      </video>
      <div className="content">
        <h1 data-text="furniturework...">furniturework...</h1>
        <Link to="/contact">Contect Me</Link>
      </div>
    </div>
  );
}

export default Home;
