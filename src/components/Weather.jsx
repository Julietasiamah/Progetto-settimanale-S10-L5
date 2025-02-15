/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const Weather = () => {
  const [locationData, setLocationData] = useState(" ");
  const [weatherData, setWeatherData] = useState(false);
  const token = "f2afb3e46ab817998a4f7509bc21d8d1";
  const fetchWeather = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${token}`)
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
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      });
  };
  useEffect(() => {
    fetchWeather("Palermo");
  }, []);

  return (
    <Container className="weather">
      <Row id="searchbar">
        <h1>Meteo</h1>
        <Col>
          <input
            value={locationData}
            onChange={(e) => setLocationData(e.target.value)}
            type="text"
            placeholder="Search location"
            className="mx-1"
          />
          <Button onClick={() => fetchWeather(locationData)} variant="primary">
            Search
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mt-5 bg-primary-subtle">
            {/* <Card.Img variant="top" src={weatherData.icon} /> */}
            <Card.Body>
              <Card.Title> {weatherData.location}</Card.Title>
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
