import {
  Container,
  Image,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    minWidth: "100vw",
    display: "flex",
    gap: rem(32),
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: rem(32),
  },
  card: {
    flex: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textDecoration: "none",
    padding: rem(16),
    minWidth: rem(200),
    minHeight: rem(300),
    backgroundColor: "#fff",
    borderRadius: rem(10),
    border: `1px solid ${theme.colors.gray[5]}`,
    boxShadow: `1px 1px 5px ${theme.colors.gray[5]}`,
    cursor: "pointer",
  },
  title: {
    textAlign: "center",
    color: theme.colors.gray[9],
    textTransform: "uppercase",
    fontSize: rem(14),
  },
  image: {
    maxWidth: rem(70),
    maxHeight: rem(100),
    objectFit: "cover",
    zIndex: 2,
    alignSelf: "center",
  },
  price: {
    color: theme.colors.gray[9],
    textTransform: "uppercase",
    fontSize: rem(18),
    fontWeight: "bold",
  },
  info: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%,-50%)`,
    objectFit: "cover",
    backgroundSize: "center",
    zIndex: 999,
    display: "flex",
    gap: rem(32),
  },
  icon: {
    display: "flex",
    padding: rem(16),
    backgroundColor: theme.colors.orange[2],
    borderRadius: "50%",
  },
}));

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = () =>
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setProducts(json));
    fetchData();
  }, []);
  const { classes } = useStyles();

  return (
    <Container size="xl" className={classes.container}>
      {products &&
        products.map((product) => (
          <Link
            to={`/menu/${product.id}`}
            key={product.id}
            className={classes.card}
          >
            <Title className={classes.title}>{product.category}</Title>
            <Image src={product.image} className={classes.image} />
            <Text className={classes.price}>$ {product.price}</Text>
            <Title className={classes.title}>{product.title}</Title>

            {/* <Group className={classes.info}>
              <div className={classes.icon}>
                <IconStar />
              </div>
              <div className={classes.icon}>
                <IconShoppingBag />
              </div>
            </Group> */}
          </Link>
        ))}
    </Container>
  );
};

export default Products;
