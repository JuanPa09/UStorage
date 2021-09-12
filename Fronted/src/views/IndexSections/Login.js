/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
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
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
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
                                        />
                                    </InputGroup>
                                    <FormGroup check className="text-left">
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />Remember me{" "}
                                            <a href="" onClick={(e) => e.preventDefault()}>

                                            </a>

                                        </Label>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-round" color="primary" size="lg">
                                    Entrar
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
