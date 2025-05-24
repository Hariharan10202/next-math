"use client";

import {
  CentralTendencyOutputSchema,
  DispersionOutputSchema,
} from "@/schemas/output/root";

interface Props {
  data?: CentralTendencyOutputSchema | DispersionOutputSchema;
  isLoading: boolean;
  isError: boolean;
}

const OutputScreen = ({ data, isLoading, isError }: Props) => {
  return (
    <div className="mt-2 bg-black text-green-400 text-xs sm:text-sm p-4 rounded-lg shadow-md w-full max-w-xl h-40 overflow-y-auto whitespace-pre-wrap font-terminal">
      <div>
        {isLoading && (
          <>
            <p>&gt; Running script...</p>
            <p>&gt; Fetching data from API...</p>
            <p className="animate-pulse text-green-600">_</p>{" "}
            {/* blinking cursor */}
          </>
        )}

        {isError && (
          <p className="text-red-400">
            ✖ Error: Failed to connect to the server.
          </p>
        )}

        {data && !isError && (
          <>
            <p className="text-green-500">✔ Process completed successfully.</p>
            <p className="text-green-500">Output:</p>
            <ul className="list-disc list-inside">
              {Object.entries(data).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium capitalize">{key}:</span> {value}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default OutputScreen;
