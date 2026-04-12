"""Training loop with graceful CPU fallback."""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd

from .device import select_device
from .models import ModelConfig, build_torch_mlp


@dataclass
class TrainResult:
    device: str
    best_valid_loss: float


def _to_xy(df: pd.DataFrame):
    feats = [c for c in df.columns if c not in {"timestamp", "target_next_ret"}]
    x = df[feats].to_numpy(dtype=np.float32)
    y = df["target_next_ret"].to_numpy(dtype=np.float32).reshape(-1, 1)
    return x, y, len(feats)


def train_mlp(train_df: pd.DataFrame, valid_df: pd.DataFrame, epochs: int = 10) -> TrainResult:
    import torch

    device = select_device(prefer_gpu=True)
    x_train, y_train, input_dim = _to_xy(train_df)
    x_valid, y_valid, _ = _to_xy(valid_df)

    model = build_torch_mlp(ModelConfig(input_dim=input_dim), device)
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
    loss_fn = torch.nn.MSELoss()

    tx = torch.from_numpy(x_train).to(device.torch_device)
    ty = torch.from_numpy(y_train).to(device.torch_device)
    vx = torch.from_numpy(x_valid).to(device.torch_device)
    vy = torch.from_numpy(y_valid).to(device.torch_device)

    best = float("inf")
    for _ in range(epochs):
        model.train()
        optimizer.zero_grad()
        pred = model(tx)
        loss = loss_fn(pred, ty)
        loss.backward()
        optimizer.step()

        model.eval()
        with torch.no_grad():
            vloss = loss_fn(model(vx), vy).item()
            best = min(best, vloss)

    return TrainResult(device=device.torch_device, best_valid_loss=best)
