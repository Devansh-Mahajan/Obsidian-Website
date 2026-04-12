#!/usr/bin/env bash
set -euo pipefail

# CPU-safe default. Override with FORCE_CPU=0 if you explicitly want GPU auto-detect.
: "${FORCE_CPU:=1}"

python3 -m scripts.market_ai.orchestrator "$@"
