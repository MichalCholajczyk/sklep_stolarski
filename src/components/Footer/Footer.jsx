import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup,  ListGroupItem} from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {

  const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col lg="4" className="mb-4" md="6">
						<div className="logo">
							<div>
								<h1 className="text-white">ZajebistaStrona</h1>
							</div>
						</div>
						<p className="footer__text mt-4">
							Macaroon croissant halvah topping cotton candy. Tart toffee candy canes cheesecake icing lollipop. Dessert
							jelly cake marzipan sugar plum gummies tootsie roll candy ice cream. Lemon drops icing fruitcake
							cheesecake soufflé.
						</p>
					</Col>



					<Col lg="3 " md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links__title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">MobilePhones</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Kanapy dla opornych</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Tak-krzesła</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Zegarki</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>



					<Col lg="2" md="3" className="mb-4">
          <div className="footer__quick-links">
              <h4 className="quick__links__title">Przydatne Linki</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Sklep</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Koszyk</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Login</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Zasady prywatności</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

					<Col lg="3" md="3" className="mb-4">
          <div className="footer__quick-links">
              <h4 className="quick__links__title">Kontakt</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span><i class="ri-map-pin-line"></i></span>
                  <p>Kwiatkowskiej 19, Łódź, Polska</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i class="ri-phone-line"></i></span>
                <p>+48213742069</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">

                  <span><i class="ri-mail-line"></i></span>
                  <p>zajebisciekreatywnymail@gmail,.com</p>
                </ListGroupItem>

              </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className="footer__copyright">Copyright {year} ™</p>
            <p className="footer__copyright1">Zrobione przez biednego studenta polaka robaka</p>
          </Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
