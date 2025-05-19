"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn(className, "p-4 sm:p-8 mx-auto max-w-[1280px]")}>
      {children}
    </div>
  );
};

export default Container;
