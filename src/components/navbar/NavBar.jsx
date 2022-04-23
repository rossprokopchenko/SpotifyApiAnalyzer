import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ExpiresTimer from './ExpiresTimer';
import './NavBar.css';

function NavBar(props) {
    const { token, AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE, login, logout, loggedIn, timer, profile } = props;

    return (
        <Navbar bg="dark" variant="dark" >
            <div className="navbar-left">
                <Navbar.Brand href="/" to="/">Rosklex</Navbar.Brand>
                <Nav className="">
                    <Nav.Link href="home" to="/home">Home</Nav.Link>
                    <Nav.Link href="profile" to="/profile">Profile</Nav.Link>
                </Nav>
            </div>
            <div className="navbar-right">
                {token ? 
                    <div className="d-flex align-items-center">
                        <ExpiresTimer timer={timer} logout={logout} />
                        {profile ? <Avatar sx={{ml: 1}} src={profile.images[0].url} /> : ""}
                        <Button sx={{ml: 1}} color="error" variant="outlined" onClick={logout}>Logout</Button>
                    </div> : ""}
            </div>
        </Navbar>
    );
}

export default NavBar;