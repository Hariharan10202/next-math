"use server";

import {
  BernoulliSchema,
  BinomialSchema,
  NormalSchema,
  NumberListSchema,
  PoissonSchema,
} from "@/schemas/input/root";
import {
  centralTendencyOutputSchema,
  dispersionOutputSchema,
  distributionOutputSchema,
  fileUploadResponseSchema,
} from "@/schemas/output/root";
import axios from "axios";

const API_URL = process.env.API_URL ?? "";

// export const getData = async (data: NumberListSchema) => {
//   const response = await axios({
//     url: `${API_URL}/stats/find-mean`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: {
//       numbers: data,
//     },
//   });
//   return response.data;
// };

// export const getMean = async (data: NumberListSchema) => {
//   console.log(data);
//   const response = await axios({
//     url: `${API_URL}/stats/find-mean`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   });
//   return response.data;
// };

// export const getMode = async (data: NumberListSchema) => {
//   console.log(data);
//   const response = await axios({
//     url: `${API_URL}/stats/find-mode`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   });
//   return response.data;
// };

// export const getMedian = async (data: NumberListSchema) => {
//   console.log(data);
//   const response = await axios({
//     url: `${API_URL}/stats/find-median`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   });
//   return response.data;
// };

export const getCentralTendency = async (data: NumberListSchema) => {
  const response = await axios({
    url: `${API_URL}/stats/find-central-tendency`,
    method: "POST",
    data: data,
  });

  const parsed = centralTendencyOutputSchema.safeParse(response.data);
  return parsed.data;
};

export const getDispersion = async (data: NumberListSchema) => {
  const response = await axios({
    url: `${API_URL}/stats/find-dispersion`,
    method: "POST",
    data: data,
  });
  const parsed = dispersionOutputSchema.safeParse(response.data);
  return parsed.data;
};

export const getDistribution = async (
  data: BernoulliSchema | BinomialSchema | NormalSchema | PoissonSchema
) => {
  const response = await axios({
    url: `${API_URL}/stats/find-distribution`,
    method: "POST",
    data: data,
  });
  const parsed = distributionOutputSchema.safeParse(response.data);
  return parsed.data;
};

export async function uploadFileToBackend(
  file: File,
  page: number,
  limit: number
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("page", String(page));
  formData.append("limit", String(limit));

  const response = await axios({
    url: `${API_URL}/upload`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const parsed = fileUploadResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    throw new Error("Invalid response from backend");
  }

  return parsed.data;
}
