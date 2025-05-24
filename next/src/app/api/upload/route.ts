// app/api/upload/route.ts

import { FileUploadResponse } from "@/schemas/output/root";
import { NextRequest } from "next/server";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "0", 0);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);
  const ext = file.name.split(".").pop()?.toLowerCase();

  const returnObject = {
    type: "",
    records: [] as FileUploadResponse["data"],
    total: 0,
  };

  try {
    let fullData: FileUploadResponse["data"] = [];

    if (ext === "csv") {
      const text = new TextDecoder().decode(uint8);
      const result = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });
      returnObject.type = "csv";
      fullData = result.data as FileUploadResponse["data"];
    } else if (ext === "xlsx" || ext === "xls") {
      const workbook = XLSX.read(uint8.buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      fullData = XLSX.utils.sheet_to_json(sheet) as FileUploadResponse["data"];
      returnObject.type = "excel";
    }

    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    returnObject.records = fullData.slice(start, end);
    returnObject.total = fullData.length;

    return new Response(JSON.stringify(returnObject), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Parse error:", error);
    return new Response(JSON.stringify({ error: "Failed to parse file" }), {
      status: 500,
    });
  }
}
