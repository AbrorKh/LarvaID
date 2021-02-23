{
  /* Images here */
}
{
  !toggle && (
    <div
      className="d-flex justify-content-between"
      style={{ marginLeft: "-200px", padding: "20px" }}
    >
      {/* <Row> */}
      {gallery.map((url) => (
        // <Col xs="4" md={4}>
        <a href={url} target="#">
          <Image src={url} thumbnail />
          <br />
          <br />
        </a>
        // </Col>
      ))}
      {/* </Row> */}
    </div>
  );
}
