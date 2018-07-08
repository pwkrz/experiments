import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import './AppHeader.css';

class AppHeader extends Component {
  state = {
    collapsed: true,
    navItemData: [ true, false, false, false, false, false ]
  }
  toggleNavbar = () => {
    this.setState( prevState => {
      prevState.collapsed = !prevState.collapsed
      return prevState
    });
  }
  setActiveNav = (i) => {
    this.setState( prevState => {
      prevState.navItemData = prevState.navItemData.map( (_, idx) => idx === i );
      return prevState
    });
  }
  render() {
    const navItems = this.state.navItemData.map( (active, i) => (
      <NavItem key={'menuItem'+i+1} className={active ? "active" : ""}>
        <NavLink href="#" onClick={() => this.setActiveNav(i)}>Menu Item {i+1}</NavLink>
      </NavItem>
    ))
    return (
        <Navbar color="faded" light expand="lg" className="mt-4 mb-5">
          <NavbarBrand href="#" className="mr-auto h3 mb-0">Brandname</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar={!this.state.collapsed}>
              {navItems}
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}

export default AppHeader;