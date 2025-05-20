import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Typography, Avatar, IconButton, Button } from "@mui/material";
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
        <Avatar
          src={avatar}
          alt={name}
          sx={{ width: "3.375rem", height: "3.375rem", mr: 2 }}
        />
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

const testimonials = [
  {
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/37a85cb003977915df7c38f628b930cb2f1fa2a8?placeholderIfAbsent=true&apiKey=54645ae1b26d40969fecd1dde095fca5",
    name: "Sophia T.",
    date: "10 Jan",
    content:
      "I've been using The Recipe Club for a few months now, and it's genuinely changed the way I cook at home. I used to rely heavily on Pinterest boards and random blogs, but this platform makes everything feel so organized and intuitive. What I especially love is how you can save your own tweaks to recipes and share them with the community — it's like having a personal cookbook and social feed all in one. Plus, the built-in grocery list generator is a total game changer for busy weeks. I’ve already recommended it to several friends, and we’ve even started exchanging weekly challenges!",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/03/bb/52/03bb523471edbeef47037cb630575211.jpg",
    name: "Liam K.",
    date: "22 Feb",
    content:
      "The Recipe Club feels like a cozy digital kitchen where passionate foodies gather. I’m particularly impressed with the visual layout — it’s clean, beautiful, and easy on the eyes. The advanced filters for dietary preferences like gluten-free, keto, or vegetarian are incredibly helpful. What really won me over, though, was the user-generated tips under each recipe. You get insights that even professional cookbooks don’t provide. I once followed a vegan curry recipe and a commenter suggested adding roasted chickpeas for crunch — brilliant!",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/5c/cb/ea/5ccbea70396f0267b15943adfb5ba406.jpg",
    name: "Amelia R.",
    date: "05 Mar",
    content:
      "To say The Recipe Club exceeded my expectations is an understatement. I joined because I wanted meal planning inspiration, but now it’s a part of my weekly routine. Each recipe feels thoughtfully curated — not just in taste, but in the way it's written. Instructions are clear, timers are embedded, and you even get suggestions for what to pair the dish with! It’s more than just a recipe hub — it’s a complete home cooking companion. Also, shout out to the mobile experience — super smooth and responsive!",
  },
  {
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsX29mZmljZV8zNV9oYXBweV9ibGFja193b21hbl9zbWlsZXNfYXRfY2FtZXJhX2lzb2xhdGVkX182Nzc5ZmU0OC1lMmJiLTQxMmYtOGE3OC1jNzQ2ZmFmNjQxM2VfMS5qcGc.jpg",
    name: "Ethan B.",
    date: "15 Apr",
    content:
      "I rarely leave reviews, but The Recipe Club deserves the praise. As a dad trying to cook more for my family, I’ve found the platform incredibly helpful. The variety of kid-friendly and quick meals is just what I needed. The ability to leave and read reviews by other home cooks adds a layer of authenticity — you get to see what worked for others and how they modified the recipe. I even found a slow-cooker lasagna recipe that’s now a staple in our house. It’s empowering and actually fun to cook again.",
  },
  {
    avatar:
      "https://down-vn.img.susercontent.com/file/sg-11134201-22110-nrvbx2kc3jjv48@resize_w900_nl.webp",
    name: "Jennie ",
    date: "23 Apr",
    content:
      "What I appreciate the most about The Recipe Club is the community aspect. Sure, the recipes are fantastic, and the design is stunning, but it’s the engagement that keeps me coming back. I’ve had real conversations in the comment sections, received replies from authors, and even got cooking tips from users in different countries. The ‘Recipe of the Week’ feature also keeps things fresh. Whether you’re a beginner or a seasoned chef, you’ll feel at home here. It’s like Instagram, but for people who love food and want to eat well.",
  },
];

const TestimonialSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480; // ~1 card width
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      scroll("right");
    }, 3000);
  }, []);

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
  }, [startAutoScroll]);

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
