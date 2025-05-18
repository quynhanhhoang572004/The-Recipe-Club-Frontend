import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { createRating, uploadMultipleImages } from "@/api/review-rating.service";
import { getRecipeById, RecipeDetail } from "@/api/recipe.service";

type ReviewFormProps = {
  recipeId: string;
};

export default function ReviewForm({ recipeId }: ReviewFormProps) {
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipeDetail(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
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

      // Clear form
      setRating(0);
      setComment("");
      setFiles([]);
      setImagePreviews([]);

      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Write your comment for "{recipeDetail?.title}"
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
        <Grid container spacing={1}>
          {imagePreviews.map((src, index) => (
            <Grid item xs={4} key={index}>
              <img src={src} alt="preview" style={{ width: "100%", borderRadius: 8 }} />
            </Grid>
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
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </Box>
  );
}
