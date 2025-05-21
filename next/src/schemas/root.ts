import { z } from "zod";

export const numberListSchema = z.object({
  numbers: z
    .string()
    .trim()
    .min(1, "This field is required")
    .refine(
      (val) => val.split(",").every((item) => !isNaN(Number(item.trim()))),
      {
        message: "Enter a comma-separated list of numbers (e.g. 1, 2, 3)",
      }
    ),
});

export const bernoulliSchema = z.object({
  numbers: z
    .string()
    .trim()
    .min(1, "This field is required")
    .refine(
      (val) =>
        val.split(",").every((item) => {
          const num = Number(item.trim());
          return num === 0 || num === 1;
        }),
      {
        message: "Enter a comma-separated list of 0s and 1s (e.g. 0, 1, 0)",
      }
    ),
  size: z.coerce
    .number({
      invalid_type_error: "Size must be a number",
      required_error: "Size is required",
    })
    .gt(5, "Size must be greater than 5"),
  distribution_type: z.literal("bernoulli"),
  randomState: z.boolean(),
});

export const binomialSchema = numberListSchema.extend({
  size: z.coerce
    .number({
      invalid_type_error: "Size must be a number",
      required_error: "Size is required",
    })
    .gt(5, "Size must be greater than 5"),
  distribution_type: z.literal("binomial"),
  nTrails: z.coerce
    .number({
      invalid_type_error: "Number of trials must be a number",
      required_error: "Number of trials is required",
    })
    .gt(0, "Number of trials must be greater than 0"),
});

export const normalSchema = z.object({
  average: z.coerce.number({
    invalid_type_error: "average must be a number",
    required_error: "average is required",
  }),
  size: z.coerce
    .number({
      invalid_type_error: "Size must be a number",
      required_error: "Size is required",
    })
    .gt(5, "Size must be greater than 5"),
  std: z.coerce
    .number({
      invalid_type_error: "std must be a number",
      required_error: "std is required",
    })
    .gt(0, "std must be greater than 0"),
  bins: z.coerce
    .number({
      invalid_type_error: "bins must be a number",
      required_error: "bins is required",
    })
    .gte(5, "bins must be greater than or euqal to 5"),
  density: z.boolean(),
  distribution_type: z.literal("normal"),
});

export const poissonSchema = z.object({
  average: z.coerce.number({
    invalid_type_error: "average must be a number",
    required_error: "average is required",
  }),
  size: z.coerce
    .number({
      invalid_type_error: "Size must be a number",
      required_error: "Size is required",
    })
    .gt(5, "Size must be greater than 5"),
  distribution_type: z.literal("poisson"),
});

export const distributionSchema = z.discriminatedUnion("distribution_type", [
  bernoulliSchema,
  binomialSchema,
  normalSchema,
  poissonSchema,
]);

export type NumberListSchema = z.infer<typeof numberListSchema>;
export type BernoulliSchema = z.infer<typeof bernoulliSchema>;
export type BinomialSchema = z.infer<typeof binomialSchema>;
export type NormalSchema = z.infer<typeof normalSchema>;
export type PoissonSchema = z.infer<typeof poissonSchema>;
export type DistributionSchema = z.infer<typeof distributionSchema>;
