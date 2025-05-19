from typing import Any, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.models.models import DistributionType, NumberList
from src.utils.stats.index import Bernoulli, CentralTendency, Dispersion, Distribution

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://next-math-eta.vercel.app"],
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
    return {"result": mean}


@app.post("/api/stats/find-median")
def read_root(data: NumberList):
    result = CentralTendency(data.numbers)
    median = result.getMedian()
    return {"result": median}


@app.post("/api/stats/find-mode")
def read_root(data: NumberList):
    result = CentralTendency(data.numbers)
    mode = result.getMode()
    return {"result": mode}


@app.post("/api/stats/find-central-tendency")
def read_root(data: NumberList):
    result = CentralTendency(data.numbers)
    data = result.getCentralTendency()
    return {"result": data}


# Dispersion


@app.post("/api/stats/find-range")
def read_root(data: NumberList):
    print(data)
    result = Dispersion(data.numbers)
    rang = result.getRange()
    return {"result": rang}


@app.post("/api/stats/find-variance")
def read_root(data: NumberList):
    result = Dispersion(data.numbers)
    variance = result.getVariance()
    return {"result": variance}


@app.post("/api/stats/find-standard-deviation")
def read_root(data: NumberList):
    result = Dispersion(data.numbers)
    std = result.getStd()
    return {"result": std}


@app.post("/api/stats/find-dispersion")
def read_root(data: NumberList):
    result = Dispersion(data.numbers)
    data = result.getDispersion()
    return {"result": data}


# Distribution
@app.post("/api/stats/find-distribution")
def read_root(data: DistributionType):
    print("root", data)
    dist = Distribution(data)
    result = dist.sample()
    return {"result": result}


# @app.post("/api/utils/generate/random")
# def read_root(length: Length):
#     print(length)
#     return {"result": "Hello"}
