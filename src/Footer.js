import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar id="footer">
        <Navbar.Brand id="footerBrand"> &copy; Tracy Oakley & Jason Christopher, Code Fellows 2022</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
