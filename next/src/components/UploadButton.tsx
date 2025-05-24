"use client";

import { itemsPerPage } from "@/lib/contants";
import { FileUploadResponse } from "@/schemas/output/root";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { DataTable } from "./DataTable/DataTable";
import TableSkeleton from "./Skeletons/TableSkeleton";
import { Input } from "./ui/input";

const UploadButton = () => {
  const [data, setData] = useState<FileUploadResponse>();
  const [file, setFile] = useState<File>();
  const [isPopulatingTable, setPopulatingTable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const lastProgress = useRef(0); // prevent excessive rerenders on upload progress

  const fetchPageData = useCallback(
    async (file: File, page: number, limit: number) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("page", String(page));
      formData.append("limit", String(limit));

      try {
        setLoading(true);
        const response = await axios<FileUploadResponse>({
          url: `http://localhost:8000/api/upload`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );

            // prevent too many updates
            if (Math.abs(percent - lastProgress.current) >= 5) {
              lastProgress.current = percent;
              setUploadProgress(percent);
            }
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Data fetch failed:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    },
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPopulatingTable(true);

    fetchPageData(selectedFile, 1, itemsPerPage).finally(() => {
      setPopulatingTable(false);
    });
  };

  useEffect(() => {
    if (!file) return;

    fetchPageData(file, currentPage, itemsPerPage);
  }, [currentPage]);

  return (
    <div>
      <div className="w-fit border border-dashed border-gray-400 p-6 rounded-xl">
        <label htmlFor="import-data" className="cursor-pointer">
          <Input
            id="import-data"
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="mt-10">
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-1 mt-4 relative">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
        <>
          {isPopulatingTable ? (
            <TableSkeleton />
          ) : (
            <DataTable
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              data={data}
              isLoading={isLoading}
              fileName={file?.name}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default UploadButton;
