"use client";

import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BernoulliSchema } from "@/schemas/root";

const BernoulliForm = () => {
  const form = useFormContext<BernoulliSchema>();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="numbers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numbers (comma separated)</FormLabel>
            <FormControl>
              <Textarea placeholder="e.g. 1, 2, 3" {...field} />
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
            <FormLabel>Size</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="randomState"
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
                Enable this if you want deterministic output for the same
                inputs.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </Form>
  );
};

export default BernoulliForm;
