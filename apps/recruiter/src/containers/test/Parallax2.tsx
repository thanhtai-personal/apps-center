import { useEffect, useState } from "react";
import "./parrallax2.style.css"

const Parallax2 = () => {

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const scrolled = window.scrollY;
    if (scrolled < 750) {
      setScrollY(scrolled);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const backgroundPositionY = `${scrollY * -0.5}px`;



  return <div className="parallax-container">
    <section id="parallax">
      <div className="container" id="section-container">
        <h1>SECTION 1</h1>
      </div>
    </section>
    <section id="two">
      <div className="container" id="section-container">
        <h1>SECTION 2</h1>
      </div>
    </section>
    <section id="three">
      <div className="container" id="section-container">
        <h1>SECTION 3</h1>
      </div>
    </section>
  </div>
}


export default Parallax2