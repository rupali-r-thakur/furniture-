
import Videoclip from "../Videos/VideoClip.mp4"
function Home() {
  return (
    <div className='container'>
        <video autoPlay loop muted playsInline className='backgraound_Clip'>
            <source src={Videoclip} type='video/mp4'/>
        </video>
      <div className="content">
        <h1 data-text="furniture...">furniture...</h1>
        <a href="/">Contect Me</a>
      </div>
    </div>
  )
}

export default Home

