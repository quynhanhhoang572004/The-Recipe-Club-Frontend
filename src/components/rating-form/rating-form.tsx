/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Star as StarIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import {
  createRating,
  uploadMultipleImages,
  getRecipeRatings,
} from "@/api/review-rating.service";
import { getRecipeById, RecipeDetail } from "@/api/recipe.service";

export type RatingFormProps = {
  recipeId: string;
};

const RatingForm: React.FC<RatingFormProps> = ({ recipeId }) => {
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRatings, setExistingRatings] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipeDetail(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await getRecipeRatings(recipeId);
        console.log(response);
        setExistingRatings(response.data.ratings);
      } catch (error) {
        console.error("Failed to fetch ratings:", error);
      }
    };

    fetchRatings();
  }, [recipeId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      const previews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleSubmit = async () => {
    if (!rating || !recipeDetail?.id) return;

    try {
      setIsSubmitting(true);

      const uploadResponse = await uploadMultipleImages(files);
      const image_urls = uploadResponse.image_urls;

      await createRating({
        rating,
        image_urls,
        comment,
        recipe_id: recipeDetail.id,
      });

      setRating(0);
      setComment("");
      setFiles([]);
      setImagePreviews([]);

      const refreshedRatings = await getRecipeRatings(recipeId);
      setExistingRatings(refreshedRatings.data.ratings);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <img
        src={recipeDetail?.image_url}
        alt={recipeDetail?.title || "Recipe image"}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      />
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {recipeDetail?.title}
      </Typography>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Write your comment
      </Typography>

      <Rating
        name="rating"
        value={rating}
        precision={0.5}
        onChange={(_, newValue) => setRating(newValue)}
      />

      <Box
        sx={{
          my: 2,
          border: "2px dashed #ccc",
          borderRadius: 2,
          textAlign: "center",
          py: 4,
          position: "relative",
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <IconButton component="span">
            <CloudUploadIcon fontSize="large" />
          </IconButton>
          <Typography>Click to upload or drag and drop</Typography>
          <Typography variant="caption">JPG, PNG, or GIF (max. 5MB)</Typography>
        </label>
      </Box>
      {imagePreviews.length > 0 && (
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {imagePreviews.map((src, index) => (
            <img
              src={src}
              alt={`preview ${index}`}
              style={{
                width: "100%",
                borderRadius: 8,
              }}
            />
          ))}
        </Grid>
      )}

      <TextField
        label="Comment"
        fullWidth
        multiline
        minRows={3}
        margin="normal"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#FF885A",
          "&:hover": {
            backgroundColor: "#FF885B",
          },
        }}
        fullWidth
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Submit
      </Button>

      {existingRatings.length > 0 && (
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            What people think about {recipeDetail?.title} recipe
          </Typography>

          {existingRatings.map((rating) => (
            <Box key={rating.id} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccountCircleIcon />
                <Typography sx={{ ml: 1 }}>{rating.rating}</Typography>
                <StarIcon sx={{ color: "#FFB400" }} />
              </Box>

              {rating.user?.username && (
                <Typography variant="body2" gutterBottom>
                  {rating.user.username}
                </Typography>
              )}

              <Typography color="textSecondary">{rating.comment}</Typography>

              {rating.image_urls && rating.image_urls.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, mt: 1, ml: 1 }}>
                  {rating.image_urls.map((src: string, index: number) => (
                    <img
                      key={index}
                      src={src}
                      alt={`submitted preview ${index}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RatingForm;
