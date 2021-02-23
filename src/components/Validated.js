import React, { useState, useEffect } from "react";
import {
  Container,
  Spinner,
  Table,
  Modal,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { firestore } from "../firebase";

function Validated() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [thisMosquito, setThisMosquito] = useState(null);
  const [show, setShow] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [wgallery, setWGallery] = useState([]);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [comment, setComment] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleClick = (e) => {
  //   setThisMosquito(e);
  //   console.log(thisMosquito);
  // };
  const fetchList = () => {
    try {
      firestore
        .collection("validated")
        .get()
        .then((snapshot) => {
          const promises = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            promises.push(data);
          });
          setData({ data: promises });
          setLoaded(true);
        });
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(data);
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />

      {/* title */}
      <h1 className="text-center">Validated images list</h1>
      {/* Spinner while loading */}
      <h1 className="text-center">
        {!loaded && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </h1>
      {loaded && (
        <Container>
          {show && (
            <Modal
              show={show}
              onHide={() => setShow(false)}
              size="xl"
              // dialogClassName="modal-90w"
              // aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Images
                </Modal.Title>
              </Modal.Header>
              {show && (
                <Modal.Body>
                  <Row>
                    <Col>
                      <h3>Full Body:</h3>
                      {/* <br /> */}
                      {gallery.map((item) => (
                        <Image
                          src={item}
                          thumbnail
                          style={{ borderRadius: "10px" }}
                        />
                      ))}
                    </Col>
                    <Col>
                      <h3>Water sources:</h3>
                      {/* <br /> */}
                      {gallery.map((item) => (
                        <Image
                          src={item}
                          thumbnail
                          style={{ borderRadius: "10px" }}
                        />
                      ))}
                    </Col>
                    <Col>
                      <h3>Location recorded:</h3>
                      <br />
                      Latitude: {lat}
                      <br />
                      Longitude: {long}
                      <br />
                      <h3>Comments: </h3>
                      {comment}
                      <br />
                    </Col>
                  </Row>
                </Modal.Body>
              )}
              <Modal.Footer></Modal.Footer>
            </Modal>
          )}
          <Table variant="dark" bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Genus</th>
                <th>Verified By</th>
                <th>Date verified:</th>
                <th>Confidence:</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => (
                <tr
                  eventKey={item.currentMosquito}
                  onClick={(e) => {
                    e.preventDefault();
                    setThisMosquito(item.currentMosquito);
                    var key = Object.keys(item.currentMosquito);
                    var fullBodyLinks = Object.values(
                      item.currentMosquito[key]["FULL_BODY"]
                    );
                    var wLinks = Object.values(
                      item.currentMosquito[key]["WATER_SOURCES"]
                    );
                    setGallery(fullBodyLinks);
                    setWGallery(wLinks);
                    setLat(item.currentMosquito[key]["LATITUDE"]);
                    setLong(item.currentMosquito[key]["LONGITUDE"]);
                    setComment(item.comment);
                    setShow(true);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item.genus}</td>
                  <td>{item.verifiedBy}</td>
                  <td>{item.date}</td>
                  <td>{item.confidence}</td>
                  {/* <td></td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </Container>
  );
}

export default Validated;
