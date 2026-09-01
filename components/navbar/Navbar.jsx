import "./Navbar.scss";
import { Link } from "react-scroll";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  };

  return (
    <div className="fixed-nav">
      <nav className={`navbar ${isMenuOpen ? "menu-opened" : ""}`}>
        <div className="navbar-header">
          <div className="burger-container" onClick={toggleMenu}>
            <div id="burger">
              <div className="bar topBar"></div>
              <div className="bar btmBar"></div>
            </div>
          </div>
          <a id="logo" className="icon" onClick={scrollToTop}>
            &lt; AP &gt;
          </a>
        </div>

        <ul className="menu">
          <li className="menu-item">
            <a onClick={scrollToTop}>Home</a>
          </li>
          <li className="menu-item">
            <Link
              to="section2"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="skills"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={closeMenu}
            >
              Skills
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="section3"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={closeMenu}
            >
              Work Experienced
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="section4"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={closeMenu}
            >
              Projects
            </Link>
          </li>
        </ul>

        <div className="nav-links">
          <ul>
            <Link
              to="section2"
              smooth={true}
              duration={500}
              onClick={closeMenu}
            >
              About
            </Link>
          </ul>
          <ul>
            <Link to="skills" smooth={true} duration={500} onClick={closeMenu}>
              Skills
            </Link>
          </ul>
          <ul>
            <Link
              to="section3"
              smooth={true}
              duration={500}
              onClick={closeMenu}
            >
              Work Experienced
            </Link>
          </ul>
          <ul>
            <Link
              to="section4"
              smooth={true}
              duration={500}
              onClick={closeMenu}
            >
              Projects
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
