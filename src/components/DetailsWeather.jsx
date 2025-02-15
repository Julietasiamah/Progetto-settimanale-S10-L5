import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { DropletFill, ThermometerHalf, Wind } from "react-bootstrap-icons";
import { NavLink, useLocation } from "react-router-dom";

const DetailsWeather = () => {
  const location = useLocation();
  const cityName = location.state?.city || "Vicenza";
  const [dailyweather, setDailyweather] = useState(null);

  const token = "f2afb3e46ab817998a4f7509bc21d8d1";
  const fetchdailyweather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${token}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore fetch");
        }
      })
      .then((data) => {
        console.log(data);
        setDailyweather(data.list.filter((_, index) => index % 8 === 0));
      });
  };

  useEffect(() => {
    fetchdailyweather(cityName);
  }, [cityName]);

  return (
    <Container fluid id="Container2">
      <Row>
        <h1 className="fw-bold text-dark">5 Days Forecast</h1>
        {dailyweather &&
          dailyweather.map((forecast) => {
            return (
              <Col md={6} key={forecast.dt}>
                <Card className="mt-5 " id="card-Container">
                  <Card.Body>
                    <Card.Title>{new Date(forecast.dt_txt).toLocaleString()}</Card.Title>
                    <Card.Text>
                      <img
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt="weather icon"
                      />
                      <p>
                        Temperature: <ThermometerHalf /> {forecast.main.temp}°C
                      </p>
                      <p>
                        Wind Speed: <Wind /> {forecast.wind.speed} m/s
                      </p>
                      <p>
                        Humidity:
                        <DropletFill /> {forecast.main.humidity}%
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
      <NavLink className="nav-link" to="/">
        <Button variant="primary" className="mt-4 p-2" id="homepagebutton">
          Go back to homepage
        </Button>
      </NavLink>
    </Container>
  );
};

export default DetailsWeather;
