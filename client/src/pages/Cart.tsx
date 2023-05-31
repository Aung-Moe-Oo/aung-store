import {
  removeItem,
  decrementQuantity,
  incrementQuantity,
  CartItem,
} from "../redux/redux";
import { IconTrashFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Notfound from "../assets/NotFound.png";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Button, Container, Image, createStyles, rem } from "@mantine/core";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: `0 ${rem(32)}`,
    margin: 0,
    overflowY: "scroll",
  },
  group1: {
    flex: 3,
    height: "80vh",
    width: "75%",
    paddingRight: rem(16),
    borderRight: `1px solid ${theme.colors.gray[1]}`,
    overflowY: "scroll",
  },
  group2: {
    flex: 1,
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: rem(16),
    gap: rem(16),
    overflowY: "scroll",
  },
  title: {
    textAlign: "center",
    color: theme.colors.gray[9],
    textTransform: "uppercase",
    textDecoration: "none",
    fontSize: rem(18),
  },
  itemGroup: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: rem(35),
    paddingBottom: rem(16),
  },
  image: {
    maxWidth: rem(100),
    objectFit: "cover",
    zIndex: 2,
    alignSelf: "center",
  },
  btn: {
    width: rem(30),
    height: rem(30),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: theme.colors.green[2],
  },
  price: {
    color: theme.colors.gray[9],
    textTransform: "uppercase",
    textAlign: "right",
    fontSize: rem(18),
    fontWeight: "bold",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: rem(100),
    gap: rem(10),
  },
}));

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item: CartItem) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <Container
      size="xl"
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
      <Link to={`/`} className={classes.title}>
        <h3>Continue Shopping</h3>
      </Link>
      <div className={classes.container}>
        <div className={classes.group1}>
          <h3>Shopping Cart</h3>

          {cart.length === 0 && (
            <div>
              <img src={Notfound} alt="empty" />
              <span>Your cart is empty.</span>
            </div>
          )}
          {cart?.map((i) => (
            <div key={i.id} className={classes.itemGroup}>
              <Image className={classes.image} src={i.image} alt="item" />
              <p>{i.title.split(" ").slice(0, 3).join(" ")}</p>
              <p>
                <big>$</big>
                <strong>{i.price}</strong>
              </p>

              <div className={classes.btnGroup}>
                <div
                  className={classes.btn}
                  onClick={() => dispatch(decrementQuantity(i.id))}
                >
                  -
                </div>
                <p>{i.quantity}</p>
                <div
                  className={classes.btn}
                  onClick={() => dispatch(incrementQuantity(i.id))}
                >
                  +
                </div>
              </div>
              <IconTrashFilled
                size={30}
                style={{ color: "#ec3b20", cursor: "pointer" }}
                onClick={() => dispatch(removeItem(i.id))}
              />
            </div>
          ))}
        </div>
        <div className={classes.group2}>
          <h3>ORDER SUMMARY</h3>
          <div className={classes.itemGroup}>
            <span>Total</span>
            <span>({getTotal().totalQuantity} items)</span>

            <span>${getTotal().totalPrice.toLocaleString()}</span>
          </div>
          <Button>Order Now</Button>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Cart;
