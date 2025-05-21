import numpy as np
from scipy.stats import bernoulli, binom, mode, norm, poisson


class CentralTendency:
    def __init__(self, data):
        self.data = data

    def getMean(self):
        arr = np.array(self.data)
        return np.mean(arr)

    def getMedian(self):
        arr = np.array(self.data)
        return np.median(arr)

    def getMode(self):
        arr = np.array(self.data)
        mode_result = mode(arr, keepdims=True)
        return mode_result.mode[0]

    def getCentralTendency(self):
        return {
            "mean": self.getMean(),
            "median": self.getMedian(),
            "mode": self.getMode(),
        }


class Dispersion:
    def __init__(self, data):
        self.data = data
        self.minimum = min(self.data)
        self.maximum = max(self.data)

    def getRange(self):
        return self.maximum - self.minimum

    def getVariance(self):
        arr = np.array(self.data)
        return np.var(arr)

    def getStd(self):
        arr = np.array(self.data)
        return np.std(arr)

    def getIQR(self):
        arr = np.array(self.data)
        Q1 = np.percentile(arr, 25)
        Q3 = np.percentile(arr, 75)
        print(f"Q1 {Q1}")
        print(f"Q3 {Q3}")
        IQR = Q3 - Q1
        return IQR

    def getDispersion(self):
        return {
            "range": self.getRange(),
            "variance": self.getVariance(),
            "standard_deviation": self.getStd(),
            "Interquartile Range (IQR)": self.getIQR(),
        }


class Bernoulli:
    def __init__(self, numbers, size, randomState):
        self.numbers = numbers
        self.size = size
        self.randomState = 42 if randomState else None
        self.p_mean = CentralTendency(data=numbers).getMean()

    def sample(self):
        simulated_points = bernoulli.rvs(
            self.p_mean, size=self.size, random_state=self.randomState
        )
        bernoulli_dist = bernoulli(self.p_mean)
        pmf = bernoulli_dist.pmf(np.unique(simulated_points))
        return {
            "plotPoints": np.unique(simulated_points).tolist(),
            "dataPoints": pmf.tolist(),
        }


class Binomial:
    def __init__(self, numbers, size, nTrails):
        self.numbers = numbers
        self.size = size
        self.nTrails = nTrails
        self.p_mean = CentralTendency(data=numbers).getMean()

    def sample(self):
        binom_dist = binom(n=self.nTrails, p=self.p_mean)
        x = np.arange(1, self.nTrails + 1)
        pmf = binom_dist.pmf(x)
        return {
            "plotPoints": x.tolist(),
            "dataPoints": pmf.tolist(),
        }


class Normal:
    def __init__(self, average, std, size, bins, density):
        self.mu = average
        self.sigma = std
        self.size = size
        self.bins = bins
        self.density = density

    def sample(self):
        print("Mean", self.mu)
        print("Std", self.sigma)
        print("bins", self.bins)
        print("density", self.density)
        scores = np.random.normal(loc=self.mu, scale=self.sigma, size=self.size)
        mean = np.mean(scores)
        median = np.median(scores)
        mode = norm.fit(scores)[0]
        variance = np.var(scores)
        std_dev = np.std(scores)
        hist_density, bin_edges = np.histogram(scores, bins=10, density=True)
        histogram = []
        for i in range(len(hist_density)):
            bin_center = (bin_edges[i] + bin_edges[i + 1]) / 2
            histogram.append(
                {"x": round(bin_center, 2), "y": round(hist_density[i], 4)}
            )
        xmin, xmax = min(scores), max(scores)
        x_vals = np.linspace(xmin, xmax, 100)
        pdf_vals = norm.pdf(x_vals, mean, std_dev)
        pdf_curve = [
            {"x": round(x, 2), "y": round(y, 4)} for x, y in zip(x_vals, pdf_vals)
        ]
        return {
            "statistics": {
                "mean": round(mean, 2),
                "median": round(median, 2),
                "mode": round(mode, 2),
                "variance": round(variance, 2),
                "std_dev": round(std_dev, 2),
            },
            "histogram": histogram,
            "pdf_curve": pdf_curve,
        }


class Poisson:
    def __init__(self, average, size):
        self.mu = average
        self.size = size

    def sample(self):
        simulated_values = poisson.rvs(mu=self.mu, size=self.size)
        max_k = max(simulated_values.max(), int(poisson.ppf(0.999, mu=self.mu)))

        bins = np.arange(-0.5, max_k + 1.5, 1)
        histogram, _ = np.histogram(simulated_values, bins=bins)
        x = np.arange(0, max_k + 1)
        pmf_scaled = poisson.pmf(x, mu=self.mu) * self.size

        return {
            "pmfScaled": pmf_scaled.tolist(),
            "histogram": histogram.tolist(),
            "range": x.tolist(),
        }


class Distribution:
    def __init__(self, data):
        dist_map = {
            "bernoulli": Bernoulli,
            "binomial": Binomial,
            "normal": Normal,
            "poisson": Poisson,
        }

        print("data", data)

        dist_type = data.distribution_type.lower()

        if dist_type not in dist_map:
            raise ValueError(f"Unknown distribution type: {dist_type}")

        params = data.dict()
        params.pop("distribution_type")
        self.distribution = dist_map[dist_type](**params)

    def sample(self):
        return self.distribution.sample()
