"use client";

import { getDistribution } from "@/actions/api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { distributionSchema, DistributionSchema } from "@/schemas/root";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TwoBarGraphSkeleton from "../Skeletons/BernoulliSkeleton";
import BernoulliForm from "./Forms/Bernoulli";
import BinomialForm from "./Forms/Binomial";
import NormalForm from "./Forms/Normal";
import PoissonForm from "./Forms/Poisson";

const BernoulliChart = dynamic(() => import("../Charts/BernoulliChart"), {
  ssr: false,
  loading: () => <TwoBarGraphSkeleton />,
});
const BinomialChart = dynamic(() => import("../Charts/BinomialChart"), {
  ssr: false,
  loading: () => <TwoBarGraphSkeleton />,
});
const NormalDistributionChart = dynamic(() => import("../Charts/NormalChart"), {
  ssr: false,
  loading: () => <TwoBarGraphSkeleton />,
});

const PoissonChart = dynamic(() => import("../Charts/PoissonChart"), {
  ssr: false,
  loading: () => <TwoBarGraphSkeleton />,
});

const defaultValuesMap = {
  bernoulli: {
    distribution_type: "bernoulli",
    numbers: "1, 1, 0, 0, 1, 1",
    size: 6,
    randomState: false,
  },
  binomial: {
    distribution_type: "binomial",
    numbers: "1, 1, 0, 0, 1, 1",
    size: 6,
    nTrails: 5,
  },
  normal: {
    distribution_type: "normal",
    average: 70,
    size: 10,
    std: 1,
    bins: 10,
    density: true,
  },
  poisson: {
    distribution_type: "poisson",
    average: 4,
    size: 10,
  },
} satisfies Record<
  "bernoulli" | "binomial" | "normal" | "poisson",
  DistributionSchema
>;

function ChartLayout() {
  const hasMounted = useRef(false);

  const {
    mutate: calculateDistribution,
    data,
    isPending,
  } = useMutation({
    mutationFn: getDistribution,
    mutationKey: ["distribution"],
  });

  const form = useForm<DistributionSchema>({
    resolver: zodResolver(distributionSchema),
    defaultValues: defaultValuesMap["bernoulli"],
  });

  const selected = form.watch("distribution_type");

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      calculateDistribution(form.getValues());
      return;
    }
    const newDefaults = defaultValuesMap[selected];
    form.reset(newDefaults);
    calculateDistribution(form.getValues());
  }, [selected, calculateDistribution]);

  const renderSelectedComponent = () => {
    switch (selected) {
      case "bernoulli":
        return <BernoulliForm />;
      case "binomial":
        return <BinomialForm />;
      case "normal":
        return <NormalForm />;
      case "poisson":
        return <PoissonForm />;
      default:
        return null;
    }
  };

  const renderSelectedChart = () => {
    switch (selected) {
      case "bernoulli":
        return !isPending ? (
          <BernoulliChart result={data} />
        ) : (
          <TwoBarGraphSkeleton />
        );
      case "binomial":
        return !isPending ? (
          <BinomialChart result={data} />
        ) : (
          <TwoBarGraphSkeleton />
        );
      case "normal":
        return !isPending ? (
          <NormalDistributionChart result={data} />
        ) : (
          <TwoBarGraphSkeleton />
        );
      case "poisson":
        return !isPending ? (
          <PoissonChart result={data} />
        ) : (
          <TwoBarGraphSkeleton />
        );
      default:
        return null;
    }
  };

  const onSubmit = (values: DistributionSchema) => {
    calculateDistribution(values);
  };

  return (
    <div className="flex flex-col gap-y-10">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl"
        >
          <Select
            onValueChange={(value) =>
              form.setValue(
                "distribution_type",
                value as DistributionSchema["distribution_type"]
              )
            }
            defaultValue="bernoulli"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Distribution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bernoulli">Bernoulli</SelectItem>
              <SelectItem value="binomial">Binomial</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="poisson">Poisson</SelectItem>
            </SelectContent>
          </Select>

          <div>{renderSelectedComponent()}</div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </FormProvider>

      <div className="flex items-center h-full bg-background min-h-[300px] sm:min-h-[500px] rounded-2xl my-6">
        <div className="flex-1">
          <div className="w-full h-full sm:h-full">{renderSelectedChart()}</div>
        </div>
      </div>
    </div>
  );
}

export default ChartLayout;
