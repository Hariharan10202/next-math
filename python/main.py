import os

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from src.models.models import DistributionType, NumberList
from src.utils.data.index import ParseData
from src.utils.stats.index import CentralTendency, Dispersion, Distribution

load_dotenv()
app = FastAPI()

NEXT_URL = os.getenv("NEXT_URL")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/")
def read_root():
    return {"message": "Hello from Python API!"}


@app.post("/api/stats/find-mean")
def read_root(data: NumberList):
    print(data)
    result = CentralTendency(data.numbers)
    mean = result.getMean()
    print(mean)
    return mean


@app.post("/api/stats/find-median")
def read_root(data: NumberList):
    result = CentralTendency(data.numbers)
    median = result.getMedian()
    return median


@app.post("/api/stats/find-mode")
def read_root(data: NumberList):
    result = CentralTendency(data.numbers)
    mode = result.getMode()
    return mode


@app.post("/api/stats/find-central-tendency")
def read_root(data: NumberList):
    result = CentralTendency(data.numbers)
    data = result.getCentralTendency()
    return data


# Dispersion


@app.post("/api/stats/find-range")
def read_root(data: NumberList):
    print(data)
    result = Dispersion(data.numbers)
    rang = result.getRange()
    return rang


@app.post("/api/stats/find-variance")
def read_root(data: NumberList):
    result = Dispersion(data.numbers)
    variance = result.getVariance()
    return variance


@app.post("/api/stats/find-standard-deviation")
def read_root(data: NumberList):
    result = Dispersion(data.numbers)
    std = result.getStd()
    return std


@app.post("/api/stats/find-dispersion")
def read_root(data: NumberList):
    result = Dispersion(data.numbers)
    data = result.getDispersion()
    return data


# Distribution
@app.post("/api/stats/find-distribution")
def read_root(data: DistributionType):
    print("root", data)
    dist = Distribution(data)
    result = dist.sample()
    return result


@app.post("/api/upload")
async def upload_file(
    file: UploadFile,
    page: int = Form(...),
    limit: int = Form(...),
):
    file_bytes = await file.read()
    parser = ParseData(file=file_bytes, filename=file.filename, page=page, limit=limit)

    try:
        parsed_result = parser.parse()
        return parsed_result
    except ValueError as e:
        return {"error": str(e)}


# @app.post("/api/utils/generate/random")
# def read_root(length: Length):
#     print(length)
#     return {"result": "Hello"}
