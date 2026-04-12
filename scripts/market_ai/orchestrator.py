"""End-to-end orchestration script for market ML experiments.

This script is intentionally modular so teams can connect it to:
- broker APIs
- feature stores
- model registries
- scheduling/orchestration tools
"""

from __future__ import annotations

import argparse

from .data_pipeline import add_features, load_ohlcv_csv, time_split
from .train import train_mlp


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run CPU-safe market ML pipeline")
    parser.add_argument("--csv", required=True, help="Path to OHLCV csv")
    parser.add_argument("--epochs", type=int, default=10)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    raw = load_ohlcv_csv(args.csv)
    feat = add_features(raw)
    split = time_split(feat)

    result = train_mlp(split.train, split.valid, epochs=args.epochs)
    print("Training complete")
    print(f"Device used: {result.device}")
    print(f"Best valid loss: {result.best_valid_loss:.8f}")


if __name__ == "__main__":
    main()
