from io import BytesIO
from math import ceil

import pandas as pd


class ParseData:
    def __init__(self, file: bytes, filename: str, page: int, limit: int):
        self.file = file
        self.filename = filename
        self.page = page
        self.limit = limit

    def parse(self):
        if self.filename.endswith(".csv"):
            df = pd.read_csv(BytesIO(self.file))
        elif self.filename.endswith(".xlsx"):
            df = pd.read_excel(BytesIO(self.file))
        else:
            raise ValueError("Unsupported file type")

        print("Page", self.page)
        print("Limit", self.limit)

        total_rows = len(df)
        total_pages = ceil(total_rows / self.limit)

        start_idx = (self.page) * self.limit
        end_idx = start_idx + self.limit

        page_df = df.iloc[start_idx:end_idx].fillna("")
        rows = page_df.to_dict(orient="records")
        columns = df.columns.tolist()

        return {
            "columns": columns,
            "data": rows,
            "pagination": {
                "page": self.page,
                "limit": self.limit,
                "total_rows": total_rows,
                "total_pages": total_pages,
            },
        }
