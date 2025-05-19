"use client";

import React from "react";

const Heading = ({ label }: { label: string }) => {
  return (
    <div className="py-6 sm:py-10 text-center sm:text-left text-xl sm:text-xl md:text-2xl lg:text-4xl font-space">
      {label}
    </div>
  );
};

export default Heading;
