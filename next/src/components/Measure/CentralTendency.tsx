"use client";

import { getCentralTendency } from "@/actions/api";
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
import { NumberListSchema, numberListSchema } from "@/schemas/input/root";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const CentralTendency = () => {
  const {
    mutate: calculateMean,
    data: centralTendency,
    isPending,
    isError,
  } = useMutation({
    mutationFn: getCentralTendency,
    mutationKey: ["test"],
  });

  const methods = useForm<NumberListSchema>({
    resolver: zodResolver(numberListSchema),
    defaultValues: {
      numbers: "",
    },
  });

  function onSubmit(values: NumberListSchema) {
    calculateMean(values);
  }

  return (
    <div className="text-black w-full flex flex-col items-center mx-auto">
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
                <FormLabel>Central Tendency</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea placeholder="e.g. 1, 2, 3, 4" {...field} />
                  </FormControl>
                  <FormMessage className="absolute -bottom-[25px]" />
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2 w-full justify-start flex-wrap gap-3">
            <Button type="submit" className="w-full sm:w-auto mt-2">
              Calculate
            </Button>
          </div>
        </form>
      </Form>

      <div className="w-full flex justify-center mt-6">
        {(centralTendency || isError || isPending) && (
          <OutputScreen
            data={centralTendency}
            isLoading={isPending}
            isError={isError}
          />
        )}
      </div>
    </div>
  );
};

export default CentralTendency;
