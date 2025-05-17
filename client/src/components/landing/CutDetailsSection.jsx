import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const feedbacks = [
    {
        id: 1,
        description: "Dịch vụ tuyệt vời! Tôi rất hài lòng với kiểu tóc mới của mình. Nhân viên rất tận tâm và chuyên nghiệp.",
        name: "Bùi Trung Hiếu",
        avatar: "https://i.pravatar.cc/100?img=1"
    },
    {
        id: 2,
        description: "Không gian tiệm đẹp, thoải mái. Tay nghề của thợ cắt rất tốt, chắc chắn tôi sẽ quay lại!",
        name: "Nguyễn Trung Nghĩa",
        avatar: "https://i.pravatar.cc/100?img=2"
    },
    {
        id: 3,
        description: "Giá cả hợp lý, chất lượng dịch vụ xứng đáng. Tôi đã giới thiệu cho bạn bè và gia đình.",
        name: "Nguyễn Quốc Trung",
        avatar: "https://i.pravatar.cc/100?img=3"
    },
];

const FeedbackSection = () => {
    return (
        <Box
            sx={{
                padding: "80px 0",
                background: "linear-gradient(to right, #222, #444)",
                color: "#fff",
                textAlign: "center",
            }}
        >
            <Container>
                <Typography
                    variant="h3"
                    fontWeight={700}
                    marginBottom={4}
                    sx={{
                        textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                        color: "#d4af37",
                    }}
                >
                    Phản hồi từ khách hàng
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {feedbacks.map((feedback) => (
                        <Grid item xs={12} sm={6} md={4} key={feedback.id}>
                            <Card
                                sx={{
                                    textAlign: "center",
                                    padding: "30px",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "#fff",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 10px rgba(255,255,255,0.2)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 5px 20px rgba(255,255,255,0.3)",
                                    },
                                }}
                            >
                                <CardContent>
                                    <Avatar
                                        src={feedback.avatar}
                                        alt={feedback.name}
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            margin: "auto",
                                            marginBottom: "10px",
                                            border: "2px solid #d4af37",
                                        }}
                                    />
                                    <FormatQuoteIcon sx={{ fontSize: 40, color: "#d4af37", opacity: 0.8 }} />
                                    <Typography
                                        variant="body1"
                                        mb={2}
                                        sx={{ fontStyle: "italic", opacity: 0.9 }}
                                    >
                                        "{feedback.description}"
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                        sx={{ color: "#d4af37" }}
                                    >
                                        {feedback.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeedbackSection;
