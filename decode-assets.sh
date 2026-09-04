#!/bin/sh
set -e
B64="assets/products/mct-capsules-purple-single.jpg.b64"
OUT="assets/products/mct-capsules-purple-single.jpg"
if [ -f "$B64" ]; then
  if base64 -d "$B64" > "$OUT" 2>/dev/null; then
    :
  elif base64 -D -o "$OUT" "$B64" 2>/dev/null; then
    :
  else
    base64 --decode "$B64" > "$OUT"
  fi
  echo "decoded $OUT ($(wc -c < "$OUT") bytes)"
fi
