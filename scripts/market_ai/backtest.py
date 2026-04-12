"""Simple walk-forward backtest utilities."""

from __future__ import annotations

import pandas as pd


def simple_threshold_backtest(df: pd.DataFrame, score_col: str, threshold: float = 0.0) -> dict:
    """Long if score > threshold else flat."""
    work = df.copy()
    work["position"] = (work[score_col] > threshold).astype(float)
    work["strategy_ret"] = work["position"] * work["target_next_ret"]
    equity = (1.0 + work["strategy_ret"].fillna(0.0)).cumprod()

    return {
        "total_return": float(equity.iloc[-1] - 1.0),
        "avg_daily_ret": float(work["strategy_ret"].mean()),
        "vol_daily": float(work["strategy_ret"].std()),
    }
