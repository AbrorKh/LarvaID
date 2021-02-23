import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup,  } from "react-leaflet";
import styled from "styled-components";
import {
  Container,
  Button,
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Col,
  Image,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { database, firestore } from "../firebase";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [currentMosquito, setCurrentMosquito] = useState(null);
  const [gotFirst, setGotfirst] = useState(false);
  const [genus, setGenus] = useState(null);
  const [comment, setComment] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [key, setKey] = useState(0);
  // const [userData, setUserData] = useState(null);
  const formRef = useRef(null);
  const handleShow = () => {
    var key = Object.keys(currentMosquito);
    var fullBodyLinks = Object.values(currentMosquito[key]["FULL_BODY"]);
    setGallery(fullBodyLinks);
    console.log("Gallery", gallery);
  };
  // get user data from firestore

  const fetch = () => {
    const fsRef = firestore.collection("users").doc(currentUser.email);
    fsRef.get().then((doc) => {
      const ref = database
        .ref()
        .child("NASA_FILE_1")
        .orderByKey()
        .limitToFirst(1)
        .startAt(doc.data().currentKey.toString());
      ref.on("value", (data) => {
        // see what data was fetched
        // console.log(data.val());
        //sets the state to current mosquito object
        setCurrentMosquito(data.val());
        setGotfirst(true);
      });
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const seeImages = () => {
    var key = Object.keys(currentMosquito);
    var fullBodyLinks = Object.values(currentMosquito[key]["FULL_BODY"]);
    fullBodyLinks.push(Object.values(currentMosquito[key]["WATER_SOURCES"]));
    setGallery(fullBodyLinks);
    setToggle(!toggle);
  };

  const handleReset = () => {
    formRef.current.reset();
  };

  const fetchNext = () => {
    // check if user made a selection
    if (currentMosquito === null || genus === null || confidence === null) {
      alert("Please make a selection for all of the fields!");
    } else {
      // alert(
      //   "Your responses will be submitted and next mosquito record will be fetched!"
      // );
      //push the validated image to database here
      const fsref = firestore.collection("validated");
      var today = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
      try {
        fsref.add({
          currentMosquito,
          verifiedBy: currentUser.email,
          date: today,
          genus: genus,
          comment: comment,
          confidence: confidence,
        });
        var keyVal = parseInt(Object.keys(currentMosquito)) + 1;
        const fstRef = firestore.collection("users").doc(currentUser.email);
        const res = fstRef.update({ currentKey: keyVal });
      } catch (e) {
        console.log(e);
      }

      // fetch the next mosquito
      const refNext = database
        .ref()
        .child("NASA_FILE_1")
        .orderByKey()
        .startAt((parseInt(Object.keys(currentMosquito)) + 1).toString())
        .limitToFirst(1);
      refNext.on("value", (data) => {
        // show next got value
        console.log(data.val());
        // set got value to state
        setCurrentMosquito(data.val());
        seeImages();
        setGenus(null);
        setConfidence(null);
        setComment(null);
        handleReset();
      });
    }
  };

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-center">Dashboard</h1>
      <h1 className="text-center">
        {!gotFirst && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </h1>
      <Row>
        <Col>
          {toggle && <Button onClick={seeImages}>See mosquito images⬇️</Button>}
          {!toggle && (
            <Button variant="info" onClick={fetchNext}>
              Submit and see next
            </Button>
          )}
        </Col>
        <Col xs="4" md={6}>
          {gotFirst && (
            <DropdownButton
              variant="secondary"
              title={!!genus ? genus : "Choose mosquito genera"}
              onSelect={(e) => {
                setGenus(e);
              }}
            >
              <Dropdown.Item as="button" eventKey="Ayedomyia">
                Ayedomyia
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Abraedes">
                Abraedes
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Anopheles">
                Anopheles
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Aedes">
                Aedes
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Culex">
                Culex
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Culiseta">
                Culiseta
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Coquillettidia">
                Coquillettidia
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Eretmapodites">
                Eretmapodites
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Fredwardsius">
                Fredwardsius
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Haemagogus">
                Haemagogus
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Mansonia">
                Mansonia
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Ochlerotatus">
                Ochlerotatus
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Opifex">
                Opifex
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Psorophora">
                Psorophora
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Sabethes">
                Sabethes
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Wyeomyia">
                Wyeomyia
              </Dropdown.Item>
              <Dropdown.Item as="button" eventKey="Uranotaenia">
                Uranotaenia
              </Dropdown.Item>
            </DropdownButton>
          )}
          <br />
        </Col>

        <Col xs="4" md={6}>
          {gotFirst && (
            <Form ref={formRef}>
              <Form.Group>
                {/* <Form.Label>Please comment on your selection.</Form.Label> */}
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Please comment on your selection."
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          )}
        </Col>
        <Col xs="4" md={6}>
          {gotFirst && (
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="success"
                onClick={(e) => {
                  setConfidence("Very sure");
                }}
              >
                Very sure
              </Button>
              <Button
                variant="warning"
                onClick={(e) => {
                  setConfidence("Somewhat sure");
                }}
              >
                Somewhat sure
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  setConfidence("Not so sure");
                }}
              >
                Do not know
              </Button>
            </ButtonGroup>
          )}
        </Col>
      </Row>

      {/* {!toggle && (
        <div>
          <h3>Recorded location:</h3>
          <h4>
            Latitude:
            {currentMosquito[Object.keys(currentMosquito)]["LATITUDE"]}
          </h4>
          <h4>
            Longitude:
            {currentMosquito[Object.keys(currentMosquito)]["LONGITUDE"]}
          </h4>
        </div>
      )} */}
      {/* <br /> */}

      {!toggle && (
        <div>
          <GridSection>
            {gallery.map((url) => (
              <Card>
                <a target="#" href={url}>
                  <img src={url} alt="" style={{ borderRadius: "10px" }} />
                </a>
              </Card>
            ))}
          </GridSection>
        </div>
      )}
      <br />
      <br />
      {/* Dropdown here */}

      <br />
      {/* Input form here */}

      <br />

      <br />
      <br />

      <div className="w-100 text-center mt-2"></div>
    </Container>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-size: 3rem;
  color: #fff;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  height: auto;
  width: 80%;
  border-radius: 4px;
  transition: all 500ms;
  // overflow: hidden;
  margin-top: 35px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  :hover {
    box-shadow: rgba(255, 255, 255, 0.1) 0px 0.35em 1.175em,
      rgba(255, 255, 255, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.5);
  }
  img {
    width: 100%;
    height: auto;
    margin-top: 10px;
    overflow: hidden;
  }
  p {
    padding: 1rem;
    text-align: center;
  }
  a {
    text-decoration: underline;
    color: white;
  }
`;

const GridSection = styled.section`
  display: grid;
  gap: 0.3rem;
  padding-left: 20px;
  /* grid-template-columns: repeat(20, 1fr);  */

  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;
