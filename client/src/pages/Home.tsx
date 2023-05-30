import { Container } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <Navbar
        user={{
          image: "https://xsgames.co/randomusers/avatar.php?g=male/1",
        }}
        tabs={["HELLO", "World", "JavaScript"]}
      />
      <Hero />
      <Products />
      <Footer />
    </Container>
  );
};

export default Home;
