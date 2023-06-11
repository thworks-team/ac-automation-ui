import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">SensePro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/schedules">Schedules</Nav.Link>
            <NavDropdown title="Master Data" id="basic-nav-dropdown">
              <NavDropdown.Item href="/city">City</NavDropdown.Item>
              <NavDropdown.Item href="/sites">
                Sites
              </NavDropdown.Item>
              <NavDropdown.Item href="/device">
                Device
              </NavDropdown.Item>
              <NavDropdown.Item href="/gateway">
                Gateway
              </NavDropdown.Item>
              <NavDropdown.Item href="/device-category">DeviceCategory</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/device-type">
                DeviceType
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;