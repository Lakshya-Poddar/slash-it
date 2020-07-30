import React from 'react'
import { Navbar, Nav } from "react-bootstrap";

function Footer() {
    return (
        <Navbar
        className="footer-css text-center m-auto"
        variant="dark"
      >
        <small className="text-light m-auto">Made with <span className="text-danger"> &hearts; </span>by <a href="https://github.com/Lakshya-Poddar" style={{textDecoration:"none",color:"#66fcf1",letterSpacing:"2px"}}>Lakshya</a></small>
      </Navbar>
    )
}

export default Footer;