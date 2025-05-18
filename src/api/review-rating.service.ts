import axiosClient from "@/lib/axiosClient";

export const createRating = async (data: {
  rating: number;
  image_urls: string[];
  comment: string;
  recipe_id: string;
}): Promise<any> => {
  console.log("Creating rating with data:", JSON.stringify(data));

  // Ensure recipe_id is included and formatted properly
  if (!data.recipe_id) {
    throw new Error("recipe_id is required");
  }

  // Make the API call
  const response = await axiosClient.post("/users/ratings", data);

  // Log the response for debugging
  console.log("API response status:", response.status);
  console.log("API response data:", response.data);

  return response.data;
};

export const modifyRating = async (
  id: string,
  data: {
    rating: number;
    image_urls: string[];
    comment: string
  }) => {
  const response = await axiosClient.put(`/users/ratings/${id}`, data);
  return response.data;
};

export type UploadSingleImageResponse = { image_url: string } | { image_urls: string[] };

export const uploadSingleImage = async (image: File): Promise<UploadSingleImageResponse> => {
  const form = new FormData();
  form.append("file", image);

  const response = await axiosClient.post("/images/upload/single", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};

export const uploadMultipleImages = async (images: File[]): Promise<{ image_urls: string[] }> => {
  const form = new FormData();
  images.forEach(image => form.append("files", image));

  const response = await axiosClient.post("/images/upload/multiple", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};


