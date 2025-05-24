import { z } from "zod";

const FlexibleValue = z.union([z.string(), z.number(), z.boolean(), z.date()]);

export const centralTendencyOutputSchema = z.object({
  mean: z.number(),
  median: z.number(),
  mode: z.number(),
});

export const dispersionOutputSchema = z.object({
  range: z.number(),
  variance: z.number(),
  standard_deviation: z.number(),
  "Interquartile Range (IQR)": z.number(),
});

export const bernoulliAndBinomialOutputSchema = z.object({
  type: z.union([z.literal("bernoulli"), z.literal("binomial")]),
  plotPoints: z.array(z.number()),
  dataPoints: z.array(z.number()),
});

export const normalDistOutpuSchema = z.object({
  type: z.literal("normal"),
  statistics: z.object({
    mean: z.number(),
    median: z.number(),
    mode: z.number(),
    variance: z.number(),
    std_dev: z.number(),
  }),
  histogram: z.array(z.object({ x: z.number(), y: z.number() })),
  pdf_curve: z.array(z.object({ x: z.number(), y: z.number() })),
});

export const poissonOutputSchema = z.object({
  type: z.literal("poisson"),
  pmfScaled: z.array(z.number()),
  histogram: z.array(z.number()),
  range: z.array(z.number()),
});

export const distributionOutputSchema = z.union([
  bernoulliAndBinomialOutputSchema,
  normalDistOutpuSchema,
  poissonOutputSchema,
]);

export const fileUploadResponseSchema = z.object({
  columns: z.array(z.string()),
  data: z.array(z.record(FlexibleValue)),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total_rows: z.number(),
    total_pages: z.number(),
  }),
});

export type CentralTendencyOutputSchema = z.infer<
  typeof centralTendencyOutputSchema
>;
export type DispersionOutputSchema = z.infer<typeof dispersionOutputSchema>;
export type BernoulliAndBinomialOutputSchema = z.infer<
  typeof bernoulliAndBinomialOutputSchema
>;
export type NormalDistOutpuSchema = z.infer<typeof normalDistOutpuSchema>;
export type PoissonOutputSchema = z.infer<typeof poissonOutputSchema>;
export type DistributionOutputSchema = z.infer<typeof distributionOutputSchema>;
export type FileUploadResponse = z.infer<typeof fileUploadResponseSchema>;
