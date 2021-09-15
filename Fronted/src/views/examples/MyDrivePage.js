import React, { useState } from "react";
import classnames from "classnames";
import ReactDatetime from "react-datetime";
import { FaRegCopy, FaList, FaEllipsisV, FaShareAlt } from 'react-icons/fa'
import { FcFolder } from "react-icons/fc";

// reactstrap components
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    UncontrolledPopover,
    PopoverBody,
    PopoverHeader,
    Modal,
    FormText
} from "reactstrap";

// menu contextual
import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu
} from "react-contexify";

import "react-contexify/dist/ReactContexify.css";
// core components
import UStorageNavbar from "components/Navbars/UStorageNavbar";
import Footer from "components/Footer/Footer.js";
import { version } from "nouislider";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcPlus } from "react-icons/fc";
import { FiEye } from "react-icons/fi";
import { MdFileUpload } from "react-icons/md";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
//import { FaRegCopy, FaList, FaEllipsisV, FaShareAlt } from 'react-icons/fa'
//import { RiSendPlaneFill, RiDeleteBin6Line } from 'react-icons/ri'


function activateLasers() {
    //console.log("hola mundo");
    //document.getElementById("react-contextmenu").style.display = "none";
    //document.getElementsByClassName('react-contextmenu')[1].style.opacity = '0';
    //document.getElementsByClassName('react-contextmenu')[1].style.pointerEvents = 'none';
    //var elemento = document.getElementsByClassName("react-contextmenu");
    //elemento[1].className = "react-contextmenu";
    /*for(var i = 0; i < elemento.length; i++){
        elemento[i].className = "react-contextmenu";
    }*/
}

function ocultar() {
    /*var elemento = document.getElementsByClassName("react-contextmenu");
    var a = elemento[1].className;
    console.log("hola mundo 2: " + a);
    if(a == "react-contextmenu"){
        document.getElementsByClassName('react-contextmenu')[1].style.opacity = '0';
    document.getElementsByClassName('react-contextmenu')[1].style.pointerEvents = 'none';
    for(var i = 0; i < elemento.length; i++){
        elemento[i].className = "react-contextmenu";
    }
    }*/
}



const MENU_ID = "menu-id";
const ARCHIVO_ID = "archivo-id";

export default function MyDrivePage() {


    const [squares1to6, setSquares1to6] = React.useState("");
    const [cambio, setCambio] = React.useState("");
    const [squares7and8, setSquares7and8] = React.useState("");
    const [nickNameFocus, setnickNameFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);
    const [fullNameFocus, setFullNameFocus] = React.useState(false);
    const [dateOfbFocus, setdateOfbFocus] = React.useState(false);
    const { show } = useContextMenu({ id: MENU_ID });
    const [demoModal, setDemoModal] = React.useState(false);
    const [carpetaInput, setCarpetaInput] = useState('');
    const [passwordSubirArchvivoInput, setPasswordSubirArchvivoInput] = useState('');
    const [archivoSeleccionadoInput, setArchivoSeleccionadoInput] = useState('');
    const [nombreArchivoInput, setNombreArchivoInput] = useState('');
    const [subirArchivoModal, setSubirArchivoModal] = React.useState(false);
    React.useEffect(() => {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", followCursor);
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.classList.toggle("register-page");
            document.documentElement.removeEventListener("mousemove", followCursor);
        };
    }, []);
    const followCursor = (event) => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        setSquares1to6(
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)"
        );
        setSquares7and8(
            "perspective(500px) rotateY(" +
            posX * 0.02 +
            "deg) rotateX(" +
            posY * -0.02 +
            "deg)"
        );
    };
    const styles = {
        pageHeader: {
            maxHeight: "800px"
        },
        gridColor: {
            backgroundColor: "#fff"
        },
        leftGrid: {
            borderLeft: "1px solid gray",
            borderTop: "1px solid gray",
            paddingTop: "10px"
        },
        centerGrid: {
            borderTop: "1px solid gray",
            paddingTop: "10px"
        },
        rowOfPage: {
            minHeight: "100vh"
        },
        contentOfPage: {
            marginBottom: "0px",
            marginTop: "6.5%"
        },
        centerBreadcrumb: {
            paddingRight: "0px",
            paddingLeft: "0px"
        },
        lefth1: {
            textAlign: "left",
            padding: "14px"
        },
        iconh1: {
            fontSize: "29px"
        },
        lefth3: {
            textAlign: "center",
            width: "96%",
            borderBottom: "1px solid gray"
        },
        iconDetalles: {
            fontSize: "134px",
            color: "gray",
            opacity: "0.25",
            paddingTop: "4px"
        },
        pDetalles: {
            color: "gray",
            opacity: "0.7",
            paddingTop: "16px",
            width: "85%",
            margin: "0 auto"
        },
    };
    function handleItemClick({ event, props, triggerEvent, data }) {
        console.log(event, props, triggerEvent, data);
    }

    function cerrarModal() {
        setDemoModal(false)
        setCarpetaInput('');
    }

    function crearCarpeta() {
        setDemoModal(true);
    }

    function crearArchivo() {

    }

    function crearFolder() {
        let body = {
            nickname: JSON.parse(sessionStorage.getItem('data'))[0].nickname,
            nombre: carpetaInput,
            user_id: JSON.parse(sessionStorage.getItem('data'))[0].usuario_id
        };
        axios.post('http://localhost:9000/DirectoryCreate', body).then(data => {
            //console.log(data.data);
            if (data.data === 1) { // ya existe la carpeta
                toast.warning("La carpeta que intenta crear ya existe.", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success("Carpeta creada.", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                cerrarModal();
                /*console.log("to correcto")
                sessionStorage.setItem("data", JSON.stringify(data.data))
                window.location.href = "/mydrive-page";*/
            }
        }).catch((error) => {
            //console.log("error al llamar url")
        })
    }

    function disableCrear(d) {
        setCarpetaInput(d)
        if (document.getElementById('crearCarpeta').value == "" || document.getElementById('crearCarpeta').value == '') {
            //document.getElementById("btnCrear").setAttribute("disabled", true);
            //document.getElementById("btnCrear").classList.add('disabled');
            document.getElementById("btnCrear").style.visibility = 'hidden';
        } else {
            //document.getElementById("btnCrear").classList.remove('disabled');
            //document.getElementById("btnCrear").removeAttribute("disabled");
            document.getElementById("btnCrear").style.visibility = 'visible';
        }
    }

    function menuCOntextual(e) {
        if (e.target.localName == "div") {
            show(e, { id: 'menu-id' })
        } else {
            show(e, { id: 'archivo-id' })
        }
    }

    function modalSubirArchivo() {
        console.log("hola");
    }

    function upArchivo(e) {
        //console.log(e);
        //console.log(document.getElementById('upload').files[0].name);
        let archivo = document.getElementById('file').files[0].name;
        setArchivoSeleccionadoInput(archivo);
        //alert(archivo);
        //console.log(FixPath(archivo));
        //let archivo = document.getElementById("file").files[0].path;
        //console.log(archivo);

        // Obtener extensión del archivo
        //let extension = archivo.substring(archivo.lastIndexOf('.'), archivo.length);
        // Obtener nombre del archivo
        //let nombreArchivo = document.getElementById('upload').files[0].name.slice(0, -extension.length);
        //console.log(archivo);
        //console.log(document.getElementById('upload').files[0].name.slice(0, -extension.length))
        //console.log(extension);

        /*var files = document.getElementById('upload').files;
        if (files.length > 0) {
            getBase64(files[0], nombreArchivo, extension);
        }*/
    }

    function seleccionarArchivo() {
        document.getElementById('file').click();
    }

    function mostrarContrasena() {
        var tipo = document.getElementById("passwordSubirArchvivo");
        if (tipo.type == "password") {
            tipo.type = "text";
        } else {
            tipo.type = "password";
        }
    }

    function validarSubirArchivo() {
        var tipoArchivo = "";
        var radios = document.getElementsByName('tipoArchivo');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                tipoArchivo = radios[i].value;
                break;
            }
        }
        //alert(tipoArchivo);
        if (archivoSeleccionadoInput == '') {
            toastWarning("Selecciona un archivo para subir.");
        } else if (passwordSubirArchvivoInput == '') {
            //toast.dismiss();
            toastWarning("Debes colocar tu contraseña para subir el archivo.");
        } else{
            //archivoSeleccionadoInput
            //nombreArchivoInput

            alert("Guardar");
        }

        
    }

    function toastWarning(mensaje) {
        toast.warning(mensaje, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <UStorageNavbar />
            <div className="wrapper">
                <div className="page-header" style={styles.pageHeader}>
                    <div className="page-header-image" />
                    <div className="content" style={styles.contentOfPage}>

                        <Row style={styles.rowOfPage}>
                            <Col xs="2">
                                <img
                                    alt="..."
                                    className="img-fluid rounded shadow-lg"
                                    src={localStorage.getItem("image_url")}
                                    style={{ width: "150px" }}
                                />
                                <small className="d-block text-uppercase font-weight-bold mb-4" style={{ marginTop: "4%" }}>
                                    {sessionStorage.getItem("username")}
                                </small>
                                <UncontrolledDropdown group>
                                    <DropdownToggle caret color="success" data-toggle="dropdown">
                                        <FcPlus className="copy" style={{ fontSize: "26px", marginRight: "8px" }} />
                                        Nuevo
                                    </DropdownToggle>
                                    <DropdownMenu className="reset" >

                                        <DropdownItem onClick={() => setSubirArchivoModal(true)} > <MdFileUpload className="copy" style={{ fontSize: "26px", marginRight: "8px" }} /> Subir archivo</DropdownItem>

                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>

                            <Col xs="7" style={styles.centerGrid} onClick={activateLasers} onMouseMove={ocultar} onContextMenu={e => menuCOntextual(e)}>
                                {/*<ContextMenuTrigger id="contextmenu">*/}
                                <div style={styles.rowOfPage} >
                                    {/*<ContextMenuTrigger id="contextmenu1">*/}
                                    <span onContextMenu={e => menuCOntextual(e)}>1 of 3</span>
                                    {/*</ContextMenuTrigger>*/}
                                </div>
                                {/*</ContextMenuTrigger>*/}
                            </Col>

                            <Col xs="3" style={styles.leftGrid}>
                                <h1 style={styles.lefth1}> <i className="tim-icons icon-laptop" style={styles.iconh1} /> Data</h1>

                                <h3 style={styles.lefth3}> Detalles</h3>
                                <i className="tim-icons icon-paper" style={styles.iconDetalles} />
                                <p style={styles.pDetalles}>Selecciona un archivo o una carpeta para ver sus detalles</p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Menu id={ARCHIVO_ID}>
                    <Item>
                        <FaRegCopy className="copy" style={{ fontSize: "17px", marginRight: "8px" }} />
                        Span
                    </Item>
                </Menu>
                <Menu id={MENU_ID}>
                    <Item onClick={crearCarpeta}>
                        <FcFolder className="copy" style={{ fontSize: "26px", marginRight: "8px" }} />
                        Crear carpeta
                    </Item>
                    <Item onClick={crearArchivo}>
                        <FcFolder className="copy" style={{ fontSize: "26px", marginRight: "8px" }} />
                        Crear archivo
                    </Item>
                    <Separator />
                    <Item disabled>Disabled</Item>
                    <Separator />
                    <Submenu label="Submenu">
                        <Item onClick={handleItemClick}>
                            Sub Item 1
                        </Item>
                        <Item onClick={handleItemClick}>Sub Item 2</Item>
                    </Submenu>
                </Menu>
                {/* Sart Demo Modal */}
                <Modal isOpen={demoModal} toggle={cerrarModal}>
                    <div className="modal-header justify-content-center">
                        <button className="close" onClick={cerrarModal}>
                            <i className="tim-icons icon-simple-remove" />
                        </button>
                        <h4 className="title title-up">Nueva Carpeta</h4>
                    </div>
                    <div className="modal-body">
                        <FormGroup>
                            <Input type="text" id="crearCarpeta" style={{ color: "black" }}
                                value={carpetaInput}
                                onChange={event => disableCrear(event.target.value)}
                                autoComplete="off" />
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button color="default" type="button" id="btnCrear" onClick={crearFolder} style={{ visibility: "hidden" }}>
                            Crear
                        </Button>
                        <Button
                            color="danger"
                            type="button"
                            onClick={cerrarModal}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Modal>
                {/* End Demo Modal */}


                {/* Start Subir Archivo Modal */}
                <Modal
                    modalClassName="modal-black"
                    isOpen={subirArchivoModal}
                    toggle={() => setSubirArchivoModal(false)}
                >
                    <div className="modal-header justify-content-center">
                        <button className="close" onClick={() => setSubirArchivoModal(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                        </button>
                        <div className="text-muted text-center ml-auto mr-auto">
                            <h3 className="mb-0">Subir Archivo</h3>
                        </div>
                        <input type="file" id="file" style={{ width: "100%", display: "none" }}
                            onChange={(event) => {
                                upArchivo(event)
                            }}
                        ></input>
                    </div>
                    <div className="modal-body">
                        <div className="btn-wrapper text-center" style={{ marginBottom: "2%" }}>
                            <Button color="warning" onClick={seleccionarArchivo}>
                                Seleccionar Archivo
                            </Button>
                        </div>
                        <Form className="form">
                            <div className="form-row">
                                <Col>
                                    <fieldset disabled >
                                        <Label for="disabled" style={{ marginBottom: "0px" }}>Archivo Seleccionado</Label>
                                        <Input type="text" id="disabled"
                                            style={{ color: "#fff" }}
                                            value={archivoSeleccionadoInput}
                                            onChange={event => setArchivoSeleccionadoInput(event.target.value)} />
                                    </fieldset>
                                </Col>
                            </div>
                        </Form>

                        <Form className="form">
                            <div className="form-row">
                                <Col>
                                    <fieldset >
                                        <Label for="disabled" style={{ marginBottom: "0px" }}>Nombre Archivo</Label>
                                        <Input type="text"
                                        value={nombreArchivoInput}
                                        onChange={event => setNombreArchivoInput(event.target.value)} />
                                    </fieldset>
                                </Col>
                                <Col>
                                    <Label style={{ marginBottom: "0px" }}>Tipo Archivo</Label>
                                    <FormGroup check className="form-check-radio">
                                        <Label check>
                                            <Input
                                                defaultValue="option1"
                                                name="tipoArchivo"
                                                type="radio"
                                                value="publico"
                                            />
                                            <span className="form-check-sign" />
                                            Publico
                                        </Label>
                                        <Label check style={{ marginLeft: "12%" }}>
                                            <Input
                                                defaultChecked
                                                defaultValue="option2"
                                                name="tipoArchivo"
                                                type="radio"
                                                value="privado"
                                            />
                                            <span className="form-check-sign" />
                                            Privado
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </div>
                        </Form>
                        <FormText color="muted" style={{ marginTop: "4%", marginBottom: "4%" }}>
                            Para poder subir un archivo se pedirá confirmar su contraseña.
                        </FormText>
                        <Form className="form">
                            <div className="form-row">
                                <Col>
                                    <InputGroup>
                                        <Input placeholder="Coloca tu contraseña acá" type="password" id="passwordSubirArchvivo"
                                            value={passwordSubirArchvivoInput}
                                            onChange={event => setPasswordSubirArchvivoInput(event.target.value)} />
                                        <InputGroupAddon addonType="append" onClick={mostrarContrasena} style={{ cursor: "pointer" }}>
                                            <InputGroupText>
                                                <FiEye className="tim-icons" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </div>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button color="info" type="button" onClick={validarSubirArchivo}>
                            Cargar
                        </Button>
                        <Button
                            color="danger"
                            type="button"
                            onClick={() => setSubirArchivoModal(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Modal>
                {/* End Subir Archivo Modal */}


                <ToastContainer
                    toastStyle={{ color: "#000" }}
                />
                <Footer />
            </div>
        </>
    );
}
