"""Model builders with CPU-safe defaults."""

from __future__ import annotations

from dataclasses import dataclass

from .device import DeviceConfig


@dataclass
class ModelConfig:
    input_dim: int
    hidden_dim: int = 64
    num_layers: int = 2
    dropout: float = 0.1


def build_torch_mlp(cfg: ModelConfig, device: DeviceConfig):
    try:
        import torch.nn as nn

        layers = []
        in_dim = cfg.input_dim
        for _ in range(cfg.num_layers):
            layers.append(nn.Linear(in_dim, cfg.hidden_dim))
            layers.append(nn.ReLU())
            layers.append(nn.Dropout(cfg.dropout))
            in_dim = cfg.hidden_dim
        layers.append(nn.Linear(in_dim, 1))
        model = nn.Sequential(*layers)
        return model.to(device.torch_device)
    except Exception as exc:
        raise RuntimeError(
            "PyTorch model initialization failed. Ensure torch is installed."
        ) from exc
