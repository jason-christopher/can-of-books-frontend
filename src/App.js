import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component { 

  render() {
    return (
      <>
        
        

        {this.props.auth0.isAuthenticated ? 
        
        <Router>
          <Header id="header"/>
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks/>}
            >
            </Route>
            <Route 
              exact path="/about"
              element={<About/>}
            >
            </Route>
          </Routes>
          <Footer id="footer"/>
        </Router> : 

        <Router>
          <Header id="header"/>
          <Routes>
            <Route 
              exact path="/"
              element={<Welcome />}
            >
            </Route>
            <Route 
              exact path="/about"
              element={<About/>}
            >
            </Route>
          </Routes>
          <Footer id="footer"/>
        </Router>
        }
      </>
    )
  }
}

export default withAuth0(App);
