"""Data loading and feature generation for market modeling."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import pandas as pd


@dataclass
class DatasetBundle:
    train: pd.DataFrame
    valid: pd.DataFrame
    test: pd.DataFrame


def load_ohlcv_csv(path: str | Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    expected = {"timestamp", "open", "high", "low", "close", "volume"}
    missing = expected - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {sorted(missing)}")
    df = df.sort_values("timestamp").reset_index(drop=True)
    return df


def add_features(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    out["ret_1"] = out["close"].pct_change()
    out["ret_5"] = out["close"].pct_change(5)
    out["vol_10"] = out["ret_1"].rolling(10).std()
    out["sma_10"] = out["close"].rolling(10).mean()
    out["sma_30"] = out["close"].rolling(30).mean()
    out["sma_ratio"] = out["sma_10"] / out["sma_30"]
    out["target_next_ret"] = out["ret_1"].shift(-1)
    return out.dropna().reset_index(drop=True)


def time_split(df: pd.DataFrame, train=0.7, valid=0.15) -> DatasetBundle:
    n = len(df)
    a = int(n * train)
    b = int(n * (train + valid))
    return DatasetBundle(
        train=df.iloc[:a].copy(), valid=df.iloc[a:b].copy(), test=df.iloc[b:].copy()
    )
