"use client";

import { getDispersion } from "@/actions/api";
import OutputScreen from "@/components/OutputScreen";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { NumberListSchema, numberListSchema } from "@/schemas/root";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const Dispersion = () => {
  const {
    mutate: calculateDispersion,
    data: dispersion,
    isPending,
    isError,
  } = useMutation({
    mutationFn: getDispersion,
    mutationKey: ["test"],
  });

  const methods = useForm<NumberListSchema>({
    resolver: zodResolver(numberListSchema),
    defaultValues: {
      numbers: "",
    },
  });

  function onSubmit(values: NumberListSchema) {
    const parsedNumbers = values.numbers
      .split(",")
      .map((n) => Number(n.trim()));
    console.log("Parsed numbers:", parsedNumbers);
    calculateDispersion(values);
  }

  return (
    <div className="text-black w-full flex flex-col items-center">
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-xl"
        >
          <FormField
            control={methods.control}
            name="numbers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Measure of Dispersion</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g. 1, 2, 3, 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2 w-full justify-start flex-wrap gap-3">
            <Button type="submit" className="w-full sm:w-auto">
              Calculate
            </Button>
          </div>
        </form>
      </Form>

      <div className="w-full flex justify-center mt-6">
        <OutputScreen
          data={dispersion?.result}
          isLoading={isPending}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default Dispersion;
