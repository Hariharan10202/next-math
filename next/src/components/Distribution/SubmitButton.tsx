"use client";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

const SubmitButton = () => {
  const { handleSubmit } = useFormContext();

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
  };

  return (
    <Button type="submit" className="w-full" onClick={handleSubmit(onSubmit)}>
      Visualize
    </Button>
  );
};

export default SubmitButton;
