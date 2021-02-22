import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import Container from 'react-bootstrap/Container'

const authenticatedOptions = (

  <Fragment>
    <Nav.Link href="#browser">Home</Nav.Link>
    <Nav.Link href="#index-all">All Workouts</Nav.Link>
    {/* <Nav.Link href="#my-index">See Mine</Nav.Link> */}
    {/* // <Nav.Link href="#favorites">Favorites</Nav.Link> */}
    <Nav.Link href="#create-a-workout">Submit A Workout</Nav.Link>
    {/* <Nav.Link href="#change-password">Change Password</Nav.Link>  */}
    {/* <Nav.Link href="#sign-out">Sign Out</Nav.Link> */}
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
    <div className="nav-name-custom">
    💪 Fit-Friends 💪
    </div>
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
        {/* // { user && <span className="navbar-text mr-2">{user.user_name}</span>} */}
        { user && <NavDropdown title={user.user_name} id="basic-nav-dropdown" className="dropdownitem">
          <NavDropdown.Item className="dropdownitem" href="#favorites">Favorites</NavDropdown.Item>
          <NavDropdown.Item className="dropdownitem" href="#my-index">My Workouts</NavDropdown.Item>
          <NavDropdown.Divider className="dropdownitem" />
          <NavDropdown.Item className="dropdownitem" href="#change-password">Change Password</NavDropdown.Item>
          <NavDropdown.Item className="dropdownitem" href="#sign-out">Sign Out</NavDropdown.Item>
        </NavDropdown>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
