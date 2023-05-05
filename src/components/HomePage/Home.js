import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";

const api = "https://api.tvmaze.com/search/shows?q=all";

const Home = () => {
  const fetchData = async () => {
    const res = await fetch(api);
    const data = await res.json();
    return data;
  };
  const [shows, setShows] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    fetchData().then((data) => {
      setShows(data);
    });
  }, []);

  const handleMovieDetails = (details) => {
    setModalOpen(true);
    setMovieDetails(details);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const Header = () => (
    <>
      <div
        style={{
          width: "100%",
          height: "4rem",
          padding: "1rem",
          backgroundColor: "#812EA4",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
          display: "flex",
          alignItems: "end",
          justifyContent: "flex-start",
        }}
      >
        <h1>Movie Mania</h1>
      </div>
    </>
  );

  const Body = () => (
    <div
      style={{
        padding: "2rem  0rem",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
        marginTop: "3rem",
      }}
    >
      <Slider {...settings}>
        {shows.map((show) => (
          <div key={show.show.id} onClick={() => handleMovieDetails(show.show)}>
            <div
              className="image-container"
              style={{ backgroundImage: `url(${show.show.image?.medium})` }}
            >
              <div className="hover-text-container">
                <div className="hover-text">{show.show.name}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
  const Footer = () => (
    <div
      style={{
        width: "100%",
        height: "4rem",
        padding: "1rem",
        backgroundColor: "#812EA4",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
        display: "flex",
        alignItems: "end",
        bottom: "0",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
      }}
    >
      <h1 style={{ fontWeight: 700 }}>For more Details Click On the Movie</h1>
    </div>
  );

  const MovieInfo = () => (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "2rem",
        }}
      >
        <div class="card" style={{ maxWidth: "800px" }}>
          <img
            src={movieDetails?.image?.original}
            alt="Avatar"
            style={{ width: "100%" }}
          />
          <div className="container">
            <h2>{movieDetails?.name}</h2>
            <h4>
              <b>Genres:</b> {movieDetails?.genres?.join(", ")}
            </h4>
            <p>
              <b>Rating:</b> {movieDetails?.rating?.average}
            </p>
            <p>
              <b>Summary: </b>
              {movieDetails?.summary?.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </div>
        </div>

        <button
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inlineBlock",
            fontSize: "16px",
            marginTop: "2rem",
            cursor: "pointer",
          }}
          onClick={() => setModalOpen(false)}
        >
          Click to go back
        </button>
      </div>
    </>
  );

  return (
    <>
      {modalOpen ? (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <MovieInfo />
        </div>
      ) : (
        <>
          <Header />

          <Body />

          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
