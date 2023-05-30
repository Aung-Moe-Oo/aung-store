import {
  Button,
  Container,
  Group,
  Image,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Product } from "./Products";
import { Link } from "react-router-dom";
import { IconShoppingCart, IconShoppingCartPlus } from "@tabler/icons-react";
import { useAppDispatch } from "../redux/store";
import { addToCart } from "../redux/redux";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: rem(32),
    margin: 0,
    flexWrap: "wrap",
    minWidth: "100vw",
    overflowY: "scroll",
  },
  group: {
    flex: 3,
    height: rem(500),
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    padding: rem(16),
    minWidth: rem(200),
    minHeight: rem(300),
    backgroundColor: "#fff",
    borderRadius: rem(10),
    cursor: "pointer",
  },
  group2: {
    flex: 2,
    height: "100%",
    // maxHeight: rem(500),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    padding: rem(16),
    minWidth: rem(200),
    minHeight: rem(300),
    backgroundColor: "#fff",
    borderRadius: rem(10),
    cursor: "pointer",
    overflowX: "hidden",
    overflow: "scroll",
  },
  title: {
    textAlign: "center",
    color: theme.colors.gray[9],
    textTransform: "uppercase",
    fontSize: rem(18),
  },
  title2: {
    textAlign: "right",
    color: theme.colors.gray[9],
    textTransform: "uppercase",
    fontSize: rem(14),
  },
  leftGroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  image: {
    maxWidth: rem(150),
    // maxHeight: rem(100),
    objectFit: "cover",
    zIndex: 2,
    alignSelf: "center",
  },
  image2: {
    maxWidth: rem(50),
    maxHeight: rem(50),
    objectFit: "cover",
    zIndex: 2,
    alignSelf: "center",
  },
  price: {
    color: theme.colors.gray[9],
    textTransform: "uppercase",
    textAlign: "right",
    fontSize: rem(18),
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    height: rem(100),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "scroll",
  },
  itemGroup: {
    display: "flex",
    flexDirection: "column",
  },
}));

const defaultProduct: Product = {
  category: "",
  description: "",
  id: 0,
  image: "",
  price: 0,
  rating: { rate: 0, count: 0 },
  title: "",
};

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const param = useParams();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = () =>
      fetch(`https://fakestoreapi.com/products/${param.id}`)
        .then((res) => res.json())
        .then((json) => setProduct(json));
    fetchData();
  }, [param]);
  useEffect(() => {
    const fetchData = () =>
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((json) => setRelatedProducts(json));
    fetchData();
  }, [product]);
  const handleClick = () =>
    dispatch(
      addToCart({
        id: parseInt(productId),
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  return (
    <Container className={classes.container}>
      <Group position="apart" className={classes.group}>
        <Title className={classes.title}>{product.category}</Title>
        <Group className={classes.leftGroup}>
          <Image src={product.image} className={classes.image} />
          <Group className={classes.itemGroup}>
            <Text className={classes.price}>Count {product.rating.count}</Text>
            <Text className={classes.price}>Rate {product.rating.rate}</Text>
            <Text className={classes.price}>$ {product.price}</Text>
          </Group>
        </Group>
        <Group position="apart" align="center">
          <Link to="/cart" style={{ textDecoration: "none", color: "#000" }}>
            <Button>
              <IconShoppingCart size={20} />
              <Text ml={10}> Go to Cart </Text>
            </Button>
          </Link>
          <Button onClick={handleClick}>
            <IconShoppingCartPlus size={20} /> <Text ml={10}>Add to Cart</Text>
          </Button>
        </Group>
        <Title className={classes.title}>{product.title}</Title>
      </Group>
      <Group className={classes.group2}>
        <Title className={classes.title}>Related Products</Title>
        {relatedProducts &&
          relatedProducts.map((product) => (
            <Link
              to={`/menu/${product.id}`}
              key={product.id}
              className={classes.card}
            >
              <Image src={product.image} className={classes.image2} />
              <Title className={classes.title2}>{product.title}</Title>
            </Link>
          ))}
      </Group>
    </Container>
  );
};

export default SingleProduct;
