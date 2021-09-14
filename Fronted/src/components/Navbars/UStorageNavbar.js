import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./mystyles.css";
import {
    Collapse,
    NavbarBrand,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";

function reset(){
    console.log("asd");
    document.getElementsByClassName('dropdown-menu')[0].style.right = 'auto !important';
}

export default function UStorageNavbar() {

    function cerrar_sessión(){
        sessionStorage.removeItem("token");
      }
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const [collapseOut, setCollapseOut] = React.useState("");
    const [color, setColor] = React.useState("navbar-transparent");
    React.useEffect(() => {
        window.addEventListener("scroll", changeColor);
        return function cleanup() {
            window.removeEventListener("scroll", changeColor);
        };
    }, []);
    const changeColor = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            setColor("bg-info");
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            setColor("navbar-transparent");
        }
    };
    const toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        setCollapseOpen(!collapseOpen);
    };
    const onCollapseExiting = () => {
        setCollapseOut("collapsing-out");
    };
    const onCollapseExited = () => {
        setCollapseOut("");
    };
    /*const styles = {
        reset: {
            right: "auto important"
        },
    };*/
    return (
        <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
            <Container style={{ maxWidth: "100%"}}>
                <div className="navbar-translate">
                    <NavbarBrand  to="/profile-page" id="navbar-brand" tag={Link}>
                        <span>AyDrive• </span>
                        Storage of cloud files
                    </NavbarBrand>
                    <UncontrolledTooltip placement="bottom" target="navbar-brand">
                        Designed and Coded by Group Number One
                    </UncontrolledTooltip>
                    <button
                        aria-expanded={collapseOpen}
                        className="navbar-toggler navbar-toggler"
                        onClick={toggleCollapse}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                </div>
                <Collapse
                    className={"justify-content-end " + collapseOut}
                    navbar
                    isOpen={collapseOpen}
                    onExiting={onCollapseExiting}
                    onExited={onCollapseExited}
                >
                    <div className="navbar-collapse-header">
                        <Row>
                            <Col className="collapse-brand" xs="6">
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    AyDrive• Storage Of Cloud Files Phase 1
                                </a>
                            </Col>
                            <Col className="collapse-close text-right" xs="6">
                                <button
                                    aria-expanded={collapseOpen}
                                    className="navbar-toggler"
                                    onClick={toggleCollapse}
                                >
                                    <i className="tim-icons icon-simple-remove" />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <Nav navbar>
                        <UncontrolledDropdown group>
                            <DropdownToggle caret color="danger" data-toggle="dropdown">
                            <img
                                alt="..."
                                className="img-fluid rounded-circle shadow"
                                src={require("assets/img/james.jpg").default}
                                style={{ width: "32px", marginRight: "8px" }}
                            />
                                {JSON.parse(sessionStorage.getItem('data'))[0].nombre + " " + JSON.parse(sessionStorage.getItem('data'))[0].apellido}
                            </DropdownToggle>
                            <DropdownMenu className="reset" right >
                                <DropdownItem tag={Link} to="/modificaUsuario" >Mi perfil</DropdownItem>
                                <DropdownItem tag={Link} to="/" onClick={cerrar_sessión} >Cerrar Sessión</DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}
