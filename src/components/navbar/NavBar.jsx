import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Button, Avatar } from '@mui/material';
import ExpiresTimer from './ExpiresTimer';
import './NavBar.css';

function NavBar(props) {
    const { token, logout, timer, profile } = props;

    return (
        <Navbar bg="dark" variant="dark" >
            <div className="navbar-left">
                <Navbar.Brand href="/" to="/">Rosklex</Navbar.Brand>
                <Nav className="">
                    { window.localStorage.token ? <Nav.Link href="home" to="/home">Home</Nav.Link> : null }
                    { window.localStorage.token ? <Nav.Link href="profile" to="/profile">Profile</Nav.Link> : null }
                    {/*<Nav.Link href="help" to="/help">Help</Nav.Link>
                    <Nav.Link href="about" to="/about">About</Nav.Link>*/}
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