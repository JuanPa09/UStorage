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
import ReactDatetime from "react-datetime";

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

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [nickNameFocus, setnickNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [dateOfbFocus, setdateOfbFocus] = React.useState(false);
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
    }
  };

  function previsualizacion(e) {
    console.log(e);
    let reader = new FileReader();
    reader.onload = function () {
      let preview = document.getElementById('preview');
      preview.src = reader.result;
      preview.style.display = "block";
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  function image() {
    document.getElementById("file").click();
  }

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header" style={styles.pageHeader}>
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-5" lg="7" md="8">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png").default}
                      />
                      <CardTitle tag="h4">Registro</CardTitle>
                      <img
                        alt="..."
                        className="img-fluid rounded shadow-lg"
                        src={require("assets/img/lora.jpg").default}
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
                                onFocus={(e) => setPasswordFocus(true)}
                                onBlur={(e) => setPasswordFocus(false)}
                              />
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
                                onFocus={(e) => setConfirmPasswordFocus(true)}
                                onBlur={(e) => setConfirmPasswordFocus(false)}
                              />
                            </InputGroup>
                          </Col>
                        </div>

                        <div className="form-row">
                          <Col>
                            <InputGroup
                            >
                              <Button color="warning" onClick={image} style={{width: "100%"}}>
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
                      <Button className="btn-round" color="primary" size="lg">
                        Empezar
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
