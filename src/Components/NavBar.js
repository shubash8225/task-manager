import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../APIs/authAPIs';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

function NavBar() {

    const logoutUser = () => {

        logout();
        window.location.href='/login'

    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="/task-view">Task-Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/task-view">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                <Button onClick={() => {logoutUser()}}>Logout&nbsp;&nbsp;<FontAwesomeIcon icon={faSignOut} /></Button>
            </Navbar.Text>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;