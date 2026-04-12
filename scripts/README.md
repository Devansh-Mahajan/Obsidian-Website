# Market AI scripts

This folder provides a CPU-safe deep-learning pipeline scaffold for market experiments.

## Quick start

```bash
# Always CPU-safe via FORCE_CPU=1 default in run.sh
scripts/run.sh --csv /path/to/ohlcv.csv --epochs 20
```

## Why this addresses "no GPU found"

`market_ai/device.py` uses the following priority:
1. `FORCE_CPU=1` -> always run on CPU.
2. If torch or CUDA is unavailable -> fallback to CPU automatically.
3. Only use CUDA when available and not forced off.

So the pipeline runs on machines with or without GPU.
