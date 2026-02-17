#!/usr/bin/env bash
# Start Simulator and Expo without auto-opening (avoids simctl openurl timeout code 60).
# You open the app manually in the Simulator.
set -e
echo "Booting iOS Simulator..."
open -a Simulator
echo "Waiting for Simulator to be ready (15s)..."
sleep 15
echo ""
echo "  → Starting Expo (no auto-open to avoid timeout)."
echo "  → When Metro is ready, in Simulator: open Safari and go to the URL shown below"
echo "    (e.g. exp://127.0.0.1:8081)"
echo ""
exec npx expo start --localhost
