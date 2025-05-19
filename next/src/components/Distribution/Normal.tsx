"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const NormalForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
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
        control={control}
        name="std"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Standard Deviation</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="any"
                placeholder="Enter standard deviation"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sample Size</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter sample size" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="bins"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bins</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter number of bins"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="density"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Use random state</FormLabel>
              <FormDescription>
                Enable this if you want histogram to form a probability density
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default NormalForm;
