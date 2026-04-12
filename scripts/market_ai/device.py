"""Device selection helpers with guaranteed CPU fallback."""

from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class DeviceConfig:
    torch_device: str
    reason: str


def select_device(prefer_gpu: bool = True) -> DeviceConfig:
    """Return a safe torch device.

    Behavior:
    - FORCE_CPU=1 forces CPU regardless of GPU availability.
    - If torch is not installed, default to CPU.
    - If torch is installed but CUDA is unavailable, default to CPU.
    """
    force_cpu = os.getenv("FORCE_CPU", "0") == "1"
    if force_cpu:
        return DeviceConfig("cpu", "FORCE_CPU=1")

    if not prefer_gpu:
        return DeviceConfig("cpu", "prefer_gpu=False")

    try:
        import torch

        if torch.cuda.is_available():
            return DeviceConfig("cuda", "torch.cuda.is_available=True")
        return DeviceConfig("cpu", "CUDA unavailable")
    except Exception:
        return DeviceConfig("cpu", "torch unavailable")
