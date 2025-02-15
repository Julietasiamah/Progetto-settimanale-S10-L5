import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DropletFill, ThermometerHalf, Wind } from "react-bootstrap-icons";

const Weather = () => {
  const [locationData, setLocationData] = useState(" ");
  const [weatherData, setWeatherData] = useState(false);
  const navigate = useNavigate();
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
    fetchWeather("Vicenza");
  }, []);

  return (
    <Container fluid id="Container">
      <Row id="searchbar">
        <h1 className="fw-bold text-dark">Meteo Previsioni</h1>
        <Alert variant="secondary" className="mt-3">
          <Alert.Heading className="text-dark">Benvenuti nella mia APP!</Alert.Heading>
          <p className="text-dark">
            Scrivi il nome della tua città per vedere le previsioni nella tua città. Cliccando sui dettagli vedrai le
            previsioni per i prossimi 5 giorni.
          </p>
        </Alert>
        <Col>
          <input
            value={locationData}
            onChange={(e) => setLocationData(e.target.value)}
            type="text"
            placeholder="Search location"
            className="mx-1"
          />
          <Button onClick={() => fetchWeather(locationData)} variant="primary" id="searchButton">
            Search
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mt-5 " id="locationContainer">
            {/* <Card.Img variant="top" src={weatherData.icon} /> */}
            <Card.Body>
              <Card.Title> {weatherData.location}</Card.Title>
              <Card.Text>
                <p>
                  Humidity: <DropletFill />
                  {weatherData.humidity}%
                </p>
                <img src={weatherData.icon} alt="icona" />
                <div>
                  Temperature: <ThermometerHalf />
                  {weatherData.temperature}°C
                </div>
                <div>
                  Wind Speed: <Wind /> {weatherData.windSpeed} m/s
                </div>
              </Card.Text>

              <Button
                variant="primary"
                className="px-3"
                onClick={() => navigate("/DetailsWeather", { state: { city: weatherData.location } })}
                id="detailsButton"
              >
                Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Weather;
