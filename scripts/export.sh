#!/bin/bash
# 导出原型：每屏 2x PNG（纯净版 + 设计说明版）和可导入 Figma 的 SVG。
# 依赖：Google Chrome（headless）、poppler 的 pdftocairo。
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
NAMES=("01-提交合同" "02-立场反问" "03-逐条意见" "04-依据原文" "05-追问与转人工")
URL="file://$PWD/prototype/index.html?export=1"
mkdir -p assets/img/screens figma
for i in 0 1 2 3 4; do
  n=$((i + 1)); name="${NAMES[$i]}"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=2 --window-size=1440,900 --virtual-time-budget=4000 \
    --screenshot="assets/img/screens/$name.png" "$URL&notes=0&s=$n" 2>/dev/null
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=2 --window-size=1868,900 --virtual-time-budget=4000 \
    --screenshot="assets/img/screens/$name-设计说明.png" "$URL&notes=1&s=$n" 2>/dev/null
  "$CHROME" --headless=new --disable-gpu --allow-file-access-from-files --no-pdf-header-footer \
    --virtual-time-budget=4000 --print-to-pdf="$TMP/$n.pdf" "$URL&notes=0&s=$n" 2>/dev/null
  pdftocairo -svg -f 1 -l 1 "$TMP/$n.pdf" "figma/$name.svg"
  sed -i "" -E '2s/width="1080pt" height="675.12pt"/width="1440" height="900"/' "figma/$name.svg"
done
echo "done"
