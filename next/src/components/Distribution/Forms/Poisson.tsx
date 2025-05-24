"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PoissonSchema } from "@/schemas/input/root";
import { useFormContext } from "react-hook-form";

const PoissonForm = () => {
  const form = useFormContext<PoissonSchema>();

  return (
    <Form {...form}>
      <div className="flex flex-col sm:gap-y-5 gap-y-3">
        <FormField
          control={form.control}
          name="average"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="Enter score average"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sample Size</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter sample size"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default PoissonForm;
