import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);

  const fetchWeather = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=45.5488306&lon=11.5478825&units=metric&appid=f2afb3e46ab817998a4f7509bc21d8d1"
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore fetch");
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: "https://openweathermap.org/img/wn/10d@2x.png",
        });
      });
  };
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Container className="weather">
      <Row id="searchbar">
        <h1>Meteo</h1>
        <Col>
          <input type="text" placeholder="Search location" className="mx-1" />
          <Search className="text-dark" id="search" />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="mt-5 bg-primary-subtle">
            {/* <Card.Img variant="top" src={weatherData.icon} /> */}
            <Card.Body>
              <Card.Title>Location : {weatherData.location}</Card.Title>
              <Card.Text>
                <p>Humidity {weatherData.humidity}</p>
                <img src={weatherData.icon} alt="icona" />
                <div>Temperature {weatherData.temperature}°C</div>
                <div>Wind Speed {weatherData.windSpeed}</div>
              </Card.Text>
              <NavLink className="nav-link" to="/DetailsWeather">
                <Button variant="primary">Details</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-5 bg-primary-subtle">
            {/* <Card.Img variant="top" src={weatherData.icon} /> */}
            <Card.Body>
              <Card.Title>Location : {weatherData.location}</Card.Title>
              <Card.Text>
                <p>Humidity {weatherData.humidity}</p>
                <img src={weatherData.icon} alt="icona" />
                <div>Temperature {weatherData.temperature}°C</div>
                <div>Wind Speed {weatherData.windSpeed}</div>
              </Card.Text>
              <NavLink className="nav-link" to="/DetailsWeather">
                <Button variant="primary">Details</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-5 bg-primary-subtle">
            {/* <Card.Img variant="top" src={weatherData.icon} /> */}
            <Card.Body>
              <Card.Title>Location : {weatherData.location}</Card.Title>
              <Card.Text>
                <p>Humidity {weatherData.humidity}</p>
                <img src={weatherData.icon} alt="icona" />
                <div>Temperature {weatherData.temperature}°C</div>
                <div>Wind Speed {weatherData.windSpeed}</div>
              </Card.Text>
              <NavLink className="nav-link" to="/DetailsWeather">
                <Button variant="primary">Details</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Weather;
