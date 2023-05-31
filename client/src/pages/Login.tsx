import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  BackgroundImage,
} from "@mantine/core";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import showNoti from "../util/showNoti";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showNoti("Please wait", "loading");
    try {
      setUser(user);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.meta.success) {
        showNoti("Login Success!", "success");
        localStorage.setItem("token", res.data.body.token);
        localStorage.setItem("user_mail", user.email);
        window.location.reload();
        navigate("/");
      } else {
        showNoti(res.data.meta.message, "error");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUser(user);
        showNoti(error.message, "error");
      } else {
        setUser(user);
        showNoti("An unknown error occurred.", "error");
      }
    }
  };
  return (
    <Container
      size="xl"
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <BackgroundImage
        src="https://i.ibb.co/sqnYc78/bg2.jpg"
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome back!
          </Title>
          <Text size="sm" align="center" mt={5}>
            Do not have an account yet?
            <Link to={"/register"}>
              <Anchor size="sm" component="button">
                Create account
              </Anchor>
            </Link>
          </Text>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            sx={{
              backgroundColor: "#ffffff95",
              backdropFilter: "blur(5px)",
              boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
            }}
          >
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextInput
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="you@mantine.dev"
                required
              />
              <PasswordInput
                label="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Your password"
                required
                mt="md"
              />
              <Group position="apart" mt="lg">
                <Checkbox label="Remember me" />
              </Group>
              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </form>
          </Paper>
        </Container>
      </BackgroundImage>
    </Container>
  );
}
