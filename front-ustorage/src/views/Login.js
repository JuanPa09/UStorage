import React, { useState } from "react";
import IndexNavbar from "./../components/Navbars/IndexNavbar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from "classnames";
import axios from 'axios'
import { Apiurl } from './../../src/service/apirest';
import { FiEye } from "react-icons/fi";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardImg,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    FormGroup,
    Label
} from "reactstrap";

export default function Login() {
    React.useEffect(() => {
        document.body.classList.toggle("index-page");
        return function cleanup() {
            document.body.classList.toggle("index-page");
        };
    }, []);

    const [fullNameFocus, setFullNameFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [nicknameinput, setnicknameinput] = useState('');
    const [passwordinput, setpasswordinput] = useState('');

    function verificacion() {
        if (nicknameinput == '') {
            tastWarning("Campo nickname o email vacio.");
        } else if (passwordinput == '') {
            tastWarning("Campo password vacio.");
        } else {
            login();
        }
    }

    function login() {
        let url_ = Apiurl + "/usuario/ingresar" + "?" + "user=" + nicknameinput + "&" + "password=" + passwordinput;
        console.log(url_);
        axios.get(url_)
            .then(data => {
                if (data.data.status == 200) {
                    sessionStorage.setItem("token", data.data.token)
                    sessionStorage.setItem("username", data.data.username)
                    localStorage.setItem("image_url", data.data.image_url)
                    window.location.href = "/mydrive-page";
                } else if (data.data.status == 403) {
                    tastError("Usuario ó Contraseña Incorrectos.");
                } else {
                    tastError("Error 404");
                }
            }).catch(error => {
                tastError(String(error));
            });
    }

    function tastWarning(message) {
        toast.warn(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            containerId: 'warn'
        });
    }

    function tastError(message) {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            containerId: 'err'
        });
    }

    function mostrarContrasena() {
        var tipo = document.getElementById("pass");
        if (tipo.type == "password") {
            tipo.type = "text";
        } else {
            tipo.type = "password";
        }
    }

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <div className="main">
                    <div className="section section-signup" style={{ minHeight: "100vh" }}>
                        <Container >
                            <div className="squares square1 blue" />
                            <div className="squares square2 blue" />
                            <div className="squares square3 blue" />
                            <div className="squares square4 blue" />
                            <div className="squares square5 blue" />
                            <div className="squares square6 blue" />
                            <div className="squares square7 blue" />
                            <div className="squares square7 blue" />
                            <Row className="row-grid justify-content-between align-items-center ">
                                <Col lg="6">
                                    <h3 className="display-3 text-white">
                                        Una hermosa plataforma de almacenamiento{" "}
                                        <span className="text-white">para archivos en la nube</span>
                                    </h3>
                                    <p className="text-white mb-3">
                                        U-Storage es una plataforma de almacenamiento de archivos en la nube, aquí tendrás un espacio donde podrás guardar y administrar tus archivos como desees. El sistema está diseñado con las tecnologías más potentes y seguras.
                                    </p>
                                    <div className="btn-wrapper">
                                        <Button color="primary" to="register-page" tag={Link}>
                                            Crear cuenta nueva
                                        </Button>
                                    </div>
                                </Col>
                                <Col className="mb-lg-auto" lg="6">
                                    <Card className="card-register">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("./../assets/img/square-purple-1.png").default}
                                            />
                                            <CardTitle tag="h4">Iniciar</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Form className="form">
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": fullNameFocus,
                                                    })}
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-single-02" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder="Nombre de Usuario o Correo electrónico"
                                                        type="text"
                                                        onFocus={(e) => setFullNameFocus(true)}
                                                        onBlur={(e) => setFullNameFocus(false)}
                                                        value={nicknameinput}
                                                        onChange={event => setnicknameinput(event.target.value)}
                                                    />
                                                </InputGroup>
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": passwordFocus,
                                                    })}
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-lock-circle" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder="Contraseña"
                                                        type="password"
                                                        id="pass"
                                                        onFocus={(e) => setPasswordFocus(true)}
                                                        onBlur={(e) => setPasswordFocus(false)}
                                                        value={passwordinput}
                                                        onChange={event => setpasswordinput(event.target.value)}
                                                        style={{ borderRight: "0", borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                                                    />
                                                    <InputGroupAddon addonType="append" onClick={mostrarContrasena} style={{ cursor: "pointer" }}>
                                                        <InputGroupText>
                                                            <FiEye className="tim-icons" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <FormGroup check className="text-left">
                                                    <Label check>
                                                        <Input type="checkbox" checked />
                                                        <span className="form-check-sign" />Recuérdame{" "}
                                                        <a href="" onClick={(e) => e.preventDefault()}></a>
                                                    </Label>
                                                </FormGroup>
                                            </Form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button className="btn-round" color="primary" size="lg" onClick={verificacion}>
                                                Entrar
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                            <ToastContainer
                                enableMultiContainer
                                containerId={'warn'}
                                position="top-right"
                                autoClose={2000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                            <ToastContainer
                                enableMultiContainer
                                containerId={'err'}
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}