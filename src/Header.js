import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar id="navBar">
        <Navbar.Brand id="navBrand">
          <img src="https://cdn1.iconfinder.com/data/icons/100-basic-for-user-interface/32/81-book-512.png" alt="book icon" />
          <div id="nameDiv">
            <p className="brand">My</p>
            <p className="brand">Favorite</p>
            <p className="brand">Books</p>
          </div>
        </Navbar.Brand>
        <section id="navLinks">
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/about" className="nav-link">About Us</Link></NavItem>
          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </section>
      </Navbar>
    )
  }
}

export default withAuth0(Header);
