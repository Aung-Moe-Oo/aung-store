import { Carousel } from "@mantine/carousel";
import { createStyles, Paper, Text, Title, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(540),
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      sx={{
        backgroundImage: `url(${image})`,
      }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      {/* <Button variant="white" color="dark">
        See More
      </Button> */}
    </Paper>
  );
}

const data = [
  {
    image: "https://i.ibb.co/R066QP6/bg2.jpg",
    title: "Men t-shirts review: better than you think",
    category: "men t-shirts",
  },
  {
    image: "https://i.ibb.co/N90DHXr/bg1.jpg",
    title: "Best clothes to wear for women",
    category: "women clothes",
  },
  {
    image: "https://i.ibb.co/CJK97cv/bg3.jpg",
    title: "Stylish hoodies to wear for all",
    category: "hoodies",
  },
];

export default function Hero() {
  // const theme = useMantineTheme();
  // const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      w="100vw"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%" }]}
      align="center"
      loop
      slidesToScroll={1}
    >
      {slides}
    </Carousel>
  );
}
