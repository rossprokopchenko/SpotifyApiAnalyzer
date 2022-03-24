import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './NavBar.css';

function NavBar(props) {
    const { token, AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE, logout } = props;

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
                {!token ?
                    <Button
                        variant="contained"
                        color="success"
                        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                    >Login</Button>
                    : <Button sx={{ ml: 1 }} color="error" variant="outlined" onClick={logout}>Logout</Button>
                }
            </div>
        </Navbar>
    );
}

export default NavBar;