import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import "swiper/css";

const AboutSection = () => {
  return (
    <Box
      sx={{
        padding: "80px 0",
        position: "relative",
        backgroundColor: "#fff",
        color: "#222",
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src="about.png"
              alt="Giới thiệu"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "5px 5px 15px rgba(0,0,0,0.5)",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#d4af37",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Về Chúng Tôi
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  marginBottom: "16px",
                  textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                }}
              >
                52 Năm Kinh Nghiệm Trong Ngành Tóc!
              </Typography>

              <Typography paragraph>
                Chúng tôi mang đến cho bạn những dịch vụ linh hoạt, tiện lợi và thiết kế theo yêu cầu. Bạn có thể tùy chỉnh giao diện yêu thích với vô số khả năng sáng tạo.
              </Typography>

              <Typography paragraph>
                Chúng tôi luôn đổi mới với những phong cách đa dạng, giúp bạn lựa chọn dịch vụ phù hợp nhất.
              </Typography>

              <img
                src="signature.png"
                alt="Chữ ký"
                style={{
                  marginTop: "20px",
                  width: "150px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box position="absolute" bottom={-20} left={0}>
        <img
          src="assets/img/gallery/about-shape.png"
          alt="Hình trang trí"
          style={{
            width: "120px",
            opacity: 0.8,
          }}
        />
      </Box>
    </Box>
  );
};

export default AboutSection;
