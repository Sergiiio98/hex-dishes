import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
        <img className="hamburgerButton" alt="Navbarimage" src={require("../imgs/menu.png")}></img>
    </div>
  );
}

export default Navbar;
