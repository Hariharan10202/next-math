"use server";

import {
  BernoulliSchema,
  BinomialSchema,
  NormalSchema,
  NumberListSchema,
  PoissonSchema,
} from "@/schemas/root";
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
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const getDispersion = async (data: NumberListSchema) => {
  console.log(data);
  const response = await axios({
    url: `${API_URL}/stats/find-dispersion`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const getDistribution = async (
  data: BernoulliSchema | BinomialSchema | NormalSchema | PoissonSchema
) => {
  console.log(data);
  const response = await axios({
    url: `${API_URL}/stats/find-distribution`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};
