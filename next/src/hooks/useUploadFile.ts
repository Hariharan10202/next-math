import { useMutation } from "@tanstack/react-query";
import { uploadFileToBackend } from "@/actions/api";

export function useUploadFile() {
  return useMutation({
    mutationFn: async ({
      file,
      page,
      limit,
    }: {
      file: File;
      page: number;
      limit: number;
    }) => {
      return await uploadFileToBackend(file, page, limit);
    },
  });
}
