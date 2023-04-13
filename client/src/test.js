// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Card, CardMedia, CardContent } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "80vh",
//     width:"100%",
//     position: "relative",
//   },
//   card: {
//     position: "absolute",
//     maxWidth: 300,
//     height: "70%",
//     top: "15%",
//     boxShadow: "0px 0px 20px 5px rgba(0,0,0,0.3)",
//     transition: "all 0.3s ease-in-out",
//     "&:hover": {
//       transform: "scale(1.05)",
//     },
//   },
//   centerCard: {
//     zIndex: 1,
//   },
//   leftCard: {
//     transform: "translateX(-25%)",
//     filter: "blur(2px)",
//     zIndex: 0,
//   },
//   rightCard: {
//     transform: "translateX(25%)",
//     filter: "blur(2px)",
//     zIndex: 0,
//   },
// }));

// const Carousel = () => {
//   const classes = useStyles();
//   const [currentCard, setCurrentCard] = useState(0);

//   const handleCardClick = (index) => {
//     setCurrentCard(index);
//   };

//   return (
//     <div className={classes.root}>
//       {data.map((item, index) => (
//         <Card
//           key={item.id}
//           className={[
//             classes.card,
//             index === currentCard && classes.centerCard,
//             index === currentCard - 1 && classes.leftCard,
//             index === currentCard + 1 && classes.rightCard,
//           ].join(" ")}
//           onClick={() => handleCardClick(index)}
//         >
//           <CardMedia
//             component="img"
//             height="140"
//             image={item.image}
//             alt={item.title}
//           />
//           <CardContent>
//             <h3>{item.title}</h3>
//             <p>{item.description}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Carousel;
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent } from "@material-ui/core";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    height: "100%",
    width: 300,
    overflow: "hidden",
    boxShadow: "0px 0px 20px 5px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  centerCard: {
    zIndex: 1,
  },
  leftCard: {
    transform: "translateX(-25%)",
    filter: "blur(2px)",
    zIndex: 0,
  },
  rightCard: {
    transform: "translateX(25%)",
    filter: "blur(2px)",
    zIndex: 0,
  },
}));

const Carousel = () => {
  const classes = useStyles();
  const [currentCard, setCurrentCard] = useState(0);

  const handleCardClick = (index) => {
    setCurrentCard(index);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <MultiCarousel
      responsive={responsive}
      infinite
      centerMode
      swipeable
      draggable
      showDots={false}
      ssr={true}
      autoPlaySpeed={1000}
      keyBoardControl
      customTransition="all .5s ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-40-px"
      centerSlidePercentage={33.33}
      beforeChange={(nextSlide) => setCurrentCard(nextSlide)}
      renderButtonGroupOutside={true}
    >
      {data.map((item, index) => (
        <Card
          key={item.id}
          className={[
            classes.card,
            index === currentCard && classes.centerCard,
            index === currentCard - 1 && classes.leftCard,
            index === currentCard + 1 && classes.rightCard,
          ].join(" ")}
          onClick={() => handleCardClick(index)}
        >
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt={item.title}
          />
          <CardContent>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </MultiCarousel>
  );
};
const data = [
  {
    id: 1,
    title: "Card 1",
    description: "This is the first card",
    image: "https://picsum.photos/300/140?random=1",
  },
  {
    id: 2,
    title: "Card 2",
    description: "This is the second card",
    image: "https://picsum.photos/300/140?random=2",
  },
  {
    id: 3,
    title: "Card 3",
    description: "This is the third card",
    image: "https://picsum.photos/300/140?random=3",
  },
  {
    id: 4,
    title: "Card 4",
    description: "This is the fourth card",
    image: "https://picsum.photos/300/140?random=4",
  },
  {
    id: 5,
    title: "Card 5",
    description: "This is the fifth card",
    image: "https://picsum.photos/300/140?random=5",
  },
  {
    id: 6,
    title: "Card 6",
    description: "This is the fifth card",
    image: "https://picsum.photos/300/140?random=5",
  },
];

export default Carousel;
