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
import { Textarea } from "@/components/ui/textarea";
import { BinomialSchema } from "@/schemas/input/root";
import { useFormContext } from "react-hook-form";

const BinomialForm = () => {
  const form = useFormContext<BinomialSchema>();

  return (
    <Form {...form}>
      <div className="flex flex-col sm:gap-y-5 gap-y-3">
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
          name="nTrails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Trials</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="n trails" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default BinomialForm;
