import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import Container from 'react-bootstrap/Container'

const authenticatedOptions = (

  <Fragment>
    <Nav.Link href="#browser">Home</Nav.Link>
    <Nav.Link href="#index-all">IndexAll</Nav.Link>
    <Nav.Link href="#my-index">See Mine</Nav.Link>
    {/* // <Nav.Link href="#browser">Browse</Nav.Link> */}
    <Nav.Link href="#create-a-workout">Put One Up</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const unauthenticatedBrand = (
  <Fragment>

  </Fragment>
)

const authenticatedBrand = (
  <Fragment>
    💪 Fit-Friends 💪
  </Fragment>
)

// const alwaysOptions = (
// )

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" sticky="top" expand="md">
    <Navbar.Brand href="#/">
      { user ? authenticatedBrand : unauthenticatedBrand}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">{user.user_name}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
