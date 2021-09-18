import React, { useState } from "react";
import classnames from "classnames";
import RegisterNavbar from "./../components/Navbars/RegisterNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Apiurl } from './../../src/service/apirest';
import { FiEye } from "react-icons/fi";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Button,
    Input,
    InputGroupText,
    InputGroupAddon,
    InputGroup,
    Form
} from "reactstrap";


export default function RegisterPage() {
    const [squares1to6, setSquares1to6] = React.useState("");
    const [squares7and8, setSquares7and8] = React.useState("");
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [emailinput, setemailinput] = useState('');
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [nicknameinput, setnicknameinput] = useState('');
    const [nickNameFocus, setnickNameFocus] = React.useState(false);
    const [passwordinput, setpasswordinput] = useState('');
    const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);
    const [confirmPasswordinput, setconfirmPasswordinput] = useState('');

    React.useEffect(() => {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", followCursor);
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
            maxHeight: "100vh"
        }
    };

    function verificacion() {
        let preview = document.getElementById('preview');
        if (nicknameinput === '') {
            tastWarning("Campo nombre de usuario vacio.");
        } else if (emailinput === '') {
            tastWarning("Campo correo electronico vacio.");
        } else if (passwordinput === '') {
            tastWarning("Campo contraseña vacio.");
        } else if (confirmPasswordinput === '') {
            tastWarning("Campo confirmar contraseña vacio.");
        } else if (!preview.src) {
            tastWarning("Selecciona foto de perfil.");
        } else if (passwordinput !== confirmPasswordinput) {
            tastWarning("Campo contraseña no es igual a confirmar contraseña.");
        } else {
            var file = document.getElementById('file').files[0];
            var bodyFormData = new FormData();
            bodyFormData.append('username', nicknameinput);
            bodyFormData.append('mail', emailinput);
            bodyFormData.append('password', passwordinput);
            bodyFormData.append('image', file);
            let url_ = Apiurl + "/usuario/registrar";
            axios({
                method: "post",
                url: url_,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: p => {
                    //const progress = p.loaded / p.total;
                    tastRegistrando("Procesando...");
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === 200) {
                        toast.dismiss();
                        tastSuccess("Registro correcto!");
                        window.setTimeout(function () { window.location.href = "/components"; }, 2050);
                    } else {
                        toast.dismiss();
                        tastError("Nombre de usuario o email ya existen en el sistema.");
                    }
                })
                .catch(function (response) {
                    //handle error
                    toast.dismiss();
                    tastError(String(response));
                });
        }

    }

    function image() {
        document.getElementById("file").click();
    }

    function previsualizacion(e) {
        let reader = new FileReader();
        reader.onload = function () {
            let preview = document.getElementById('preview');
            preview.src = reader.result;
            preview.style.display = "block";
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function tastWarning(message) {
        toast.warn(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            containerId: 'warn'
        });
    }

    function tastSuccess(message) {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            containerId: 'sus'
        });
    }

    function tastRegistrando(message) {
        toast.info(message, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            containerId: 'pro'
        });
    }

    function tastError(message) {
        toast.error(message, {
            position: "bottom-right",
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

    function mostrarContrasenac() {
        var tipo = document.getElementById("cpass");
        if (tipo.type == "password") {
            tipo.type = "text";
        } else {
            tipo.type = "password";
        }
    }

    return (
        <>
            <RegisterNavbar />
            <div className="wrapper">
                <div className="page-header" style={styles.pageHeader} >
                    <div className="page-header-image" />
                    <div className="content" >
                        <Container >
                            <div className="square square-7" id="square7" style={{ transform: squares7and8 }} />
                            <div className="square square-8" id="square8" style={{ transform: squares7and8 }} />
                            <Row className="row-grid justify-content-between align-items-center ">
                                <Col className="offset-lg-0 offset-md-5" lg="7" md="8">
                                    <Card className="card-register">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("./../assets/img/square-purple-1.png").default}
                                            />
                                            <CardTitle tag="h4">Registro</CardTitle>
                                            <img
                                                alt="..."
                                                className="img-fluid rounded shadow-lg"
                                                style={{ width: "150px", marginTop: "-16%", marginLeft: "64%", display: "none" }}
                                                id="preview"
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Form className="form">
                                                <div className="form-row">
                                                    <Col>
                                                        <InputGroup
                                                            className={classnames({
                                                                "input-group-focus": nickNameFocus,
                                                            })}
                                                        >
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="tim-icons icon-satisfied" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                placeholder="Nombre de usuario"
                                                                type="text"
                                                                onFocus={(e) => setnickNameFocus(true)}
                                                                onBlur={(e) => setnickNameFocus(false)}
                                                                value={nicknameinput}
                                                                onChange={event => setnicknameinput(event.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col>
                                                        <InputGroup
                                                            className={classnames({
                                                                "input-group-focus": emailFocus,
                                                            })}
                                                        >
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="tim-icons icon-email-85" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                placeholder="Correo electronico"
                                                                type="text"
                                                                onFocus={(e) => setEmailFocus(true)}
                                                                onBlur={(e) => setEmailFocus(false)}
                                                                value={emailinput}
                                                                onChange={event => setemailinput(event.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                </div>
                                                <div className="form-row">
                                                    <Col>
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
                                                    </Col>
                                                    <Col>
                                                        <InputGroup
                                                            className={classnames({
                                                                "input-group-focus": confirmPasswordFocus,
                                                            })}
                                                        >
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="tim-icons icon-key-25" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                placeholder="Confirmar Contraseña"
                                                                type="password"
                                                                id="cpass"
                                                                onFocus={(e) => setConfirmPasswordFocus(true)}
                                                                onBlur={(e) => setConfirmPasswordFocus(false)}
                                                                value={confirmPasswordinput}
                                                                onChange={event => setconfirmPasswordinput(event.target.value)}
                                                                style={{ borderRight: "0", borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                                                            />
                                                            <InputGroupAddon addonType="append" onClick={mostrarContrasenac} style={{ cursor: "pointer" }}>
                                                                <InputGroupText>
                                                                    <FiEye className="tim-icons" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </Col>
                                                </div>

                                                <div className="form-row">
                                                    <Col>
                                                        <InputGroup
                                                        >
                                                            <Button color="warning" onClick={image} style={{ width: "100%" }}>
                                                                Seleccionar foto de perfil
                                                            </Button>

                                                            <input type="file" id="file" accept="image/*" style={{ width: "100%", display: "none" }} onChange={event => previsualizacion(event)} ></input>
                                                        </InputGroup>
                                                    </Col>
                                                    <Col>

                                                    </Col>
                                                </div>
                                            </Form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button className="btn-round" color="primary" size="lg" onClick={verificacion}>
                                                Empezar
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="register-bg" />
                            <div className="square square-1" id="square1" style={{ transform: squares1to6 }} />
                            <div className="square square-2" id="square2" style={{ transform: squares1to6 }} />
                            <div className="square square-3" id="square3" style={{ transform: squares1to6 }} />
                            <div className="square square-4" id="square4" style={{ transform: squares1to6 }} />
                            <div className="square square-5" id="square5" style={{ transform: squares1to6 }} />
                            <div className="square square-6" id="square6" style={{ transform: squares1to6 }} />
                        </Container>
                    </div>
                </div>
                <ToastContainer
                    enableMultiContainer
                    containerId={'warn'}
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    toastStyle={{ backgroundColor: "#3498db", color: "#FFF" }}
                />
                <ToastContainer
                    enableMultiContainer
                    containerId={'sus'}
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    toastStyle={{ backgroundColor: "green", color: "#FFF" }}
                />
                <ToastContainer
                    enableMultiContainer
                    containerId={'pro'}
                    position="bottom-right"
                    autoClose={false}
                    hideProgressBar={true}
                    newestOnTop={false}
                    rtl={false}
                    toastStyle={{ backgroundColor: "navy", color: "#FFF" }}
                />
                <ToastContainer
                    enableMultiContainer
                    containerId={'err'}
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    toastStyle={{ backgroundColor: "crimson", color: "#FFF" }}
                />
            </div>
        </>
    );
}