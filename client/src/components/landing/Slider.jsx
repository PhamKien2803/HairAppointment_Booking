import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const slides = [
  {
    id: 1,
    subtitle: "with Patrick Potter",
    title: "Our Hair Style makes your look elegant",
  },
  {
    id: 2,
    subtitle: "with Patrick Potter",
    title: "Experience the Best Haircut in Town",
  },
];

const Slider = () => {
  return (
    <Box
      position="relative"
      sx={{
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "#222", 
        color: "#fff", 
        padding: "80px 0",
      }}
    >
      <Swiper spaceBetween={50} slidesPerView={1} loop>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Container>
              <Box sx={{ maxWidth: "800px", margin: "auto", padding: "40px 0" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#d4af37", 
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  data-animation="fadeInUp"
                >
                  {slide.subtitle}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "28px", md: "48px" }, 
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                  }}
                  data-animation="fadeInUp"
                >
                  {slide.title}
                </Typography>
              </Box>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stroke Text */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "50px", md: "100px" },
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "2px #d4af37",
          }}
        >
          Get More Confident
        </Typography>
      </Box>

      {/* Appointment Button */}
      <Box position="absolute" bottom={20} right={20}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d4af37",
            color: "#222",
            fontWeight: "bold",
            padding: "10px 20px",
            fontSize: "16px",
            "&:hover": { backgroundColor: "#e6c200" },
          }}
          endIcon={<i className="fas fa-long-arrow-alt-right"></i>}
        >
          Make an appointment now
        </Button>
      </Box>
    </Box>
  );
};

export default Slider;
