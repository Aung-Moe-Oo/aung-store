import { Container } from "@mantine/core";
import Navbar from "../components/Navbar";
``;
import SingleProduct from "../components/SingleProduct";
import Footer from "../components/Footer";

const ProductDetail = () => {
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
      <SingleProduct />
      <Footer />
    </Container>
  );
};

export default ProductDetail;
