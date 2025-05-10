import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface TestimonialCardProps {
  avatar: string;
  name: string;
  date: string;
  content: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  avatar,
  name,
  date,
  content,
}) => {
  const [expanded, setExpanded] = useState(false);
  const lineLimit = 5;
  const isLong = content.split(" ").length > 50;

  return (
    <Box
      sx={{
        backgroundColor: "#f6f6f6",
        borderRadius: "1.63225rem",
        padding: "1.6875rem",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "1.5rem",
        minHeight: "21.875rem",
        width: "28.125rem",
        flexShrink: 0,
        mx: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar src={avatar} alt={name} sx={{ width: "3.375rem", height: "3.375rem", mr: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <Typography sx={{ fontWeight: 500 }}>{name}</Typography>
          <Typography sx={{ fontWeight: 400 }}>{date}</Typography>
        </Box>
      </Box>

      <Box sx={{ height: "auto" }}>
        <Typography
          sx={{
            color: "#323232",
            fontWeight: 400,
            lineHeight: "2.25rem",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : lineLimit,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </Typography>

        {isLong && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              onClick={() => setExpanded(!expanded)}
              sx={{
                fontSize: "0.875rem",
                textTransform: "none",
                padding: 0,
                minWidth: "auto",
                color: "#ff885b",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {expanded ? "Show less" : "Read More"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const testimonials = Array.from({ length: 10 }, (_, idx) => ({
  avatar:
    "https://cdn.builder.io/api/v1/image/assets/TEMP/37a85cb003977915df7c38f628b930cb2f1fa2a8?placeholderIfAbsent=true&apiKey=54645ae1b26d40969fecd1dde095fca5",
  name: `User ${idx + 1}`,
  date: `22 Jul`,
  content:
    "KaiB was phenomenal with our dog, Max! We were first-time users of a pet-sitting service and were quite nervous. Kai's professionalism and warmth immediately put us at ease. She visited twice a day for a week and provided us with detailed updates and adorable pictures. Max was happy, healthy, and well-exercised throughout our trip. Kai's genuine love for animals shines through in her work. We will definitely book her again and highly recommend her services!",
}));

const TestimonialSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480; // ~1 card width
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll(); // Clear any existing interval
    intervalRef.current = setInterval(() => {
      scroll("right");
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("mouseenter", stopAutoScroll);
      container.addEventListener("mouseleave", startAutoScroll);
    }

    return () => {
      stopAutoScroll();
      if (container) {
        container.removeEventListener("mouseenter", stopAutoScroll);
        container.removeEventListener("mouseleave", startAutoScroll);
      }
    };
  }, []);

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#ff885b",
        width: "100%",
        py: { xs: "6rem", md: "12rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        overflow: "hidden",
      }}
    >
      <Typography
        component="h2"
        sx={{
          color: "#fff",
          textAlign: "center",
          fontFamily: "Montserrat, sans-serif",
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 700,
          maxWidth: "44.4375rem",
        }}
      >
        <span style={{ fontWeight: 600 }}>From Our Kitchen to Yours </span>
        User Feedback 🍛🍜
      </Typography>

      <Typography
        sx={{
          color: "#f6f6f6",
          textAlign: "center",
          mt: 3,
          fontFamily: "Montserrat, sans-serif",
          fontSize: { xs: "1.125rem", md: "1.5rem" },
          fontWeight: 600,
        }}
      >
        From quick dinners to gourmet meals—see what our cooks are saying.
      </Typography>

      <Box
        sx={{
          position: "relative",
          mt: 6,
          width: "100%",
          maxWidth: "75rem",
        }}
      >
        {/* Nút cuộn trái */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: "0.625rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Danh sách card cuộn ngang */}
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            px: 6,
          }}
          ref={scrollRef}
        >
          {testimonials.map((t, idx) => (
            <Box key={idx}>
              <TestimonialCard {...t} />
            </Box>
          ))}
        </Box>

        {/* Nút cuộn phải */}
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: "0.625rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TestimonialSection;
