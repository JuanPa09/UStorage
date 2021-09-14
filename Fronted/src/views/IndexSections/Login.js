import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Apiurl } from './../../service/apirest';

// reactstrap components
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
} from "reactstrap";

export default function Signup() {
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
            //tastRegistrando("Procesando...");
            login();
        }
    }

    function login() {
        let url_ = Apiurl + "/usuario/ingresar" + "?" + "user=" + nicknameinput + "&" + "password=" + passwordinput;
        axios.get(url_)
            .then(data => {
                if (data.data.status == 200) {
                    alert("todo ok");
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

    return (
        <div className="section section-signup">
            <Container>
                <div className="squares square1 blue" />
                <div className="squares square2 blue" />
                <div className="squares square3 blue" />
                <div className="squares square4 blue" />
                <div className="squares square5 blue" />
                <div className="squares square6 blue" />
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
                                    src={require("assets/img/square-purple-1.png").default}
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
                                            onFocus={(e) => setPasswordFocus(true)}
                                            onBlur={(e) => setPasswordFocus(false)}
                                            value={passwordinput}
                                            onChange={event => setpasswordinput(event.target.value)}
                                        />
                                    </InputGroup>
                                    <FormGroup check className="text-left">
                                        <Label check>
                                            <Input type="checkbox" checked/>
                                            <span className="form-check-sign" />Recuérdame{" "}
                                            <a href="" onClick={(e) => e.preventDefault()}>

                                            </a>

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
    );
}
