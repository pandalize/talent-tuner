# macOSスクリーンショット撮影テクニック

## ウィンドウ単位撮影（推奨）

### 1. インタラクティブウィンドウ選択
```bash
# ユーザーがウィンドウを選択できるモード
screencapture -w /path/to/screenshot.png

# 影なしでウィンドウを撮影
screencapture -wo /path/to/screenshot.png
```

### 2. アクティブウィンドウ自動撮影
```bash
# 現在アクティブなウィンドウを自動撮影
screencapture -W /path/to/screenshot.png
```

### 3. ウィンドウID指定撮影
```bash
# ウィンドウIDを取得
windowid=$(osascript -e 'tell application "Google Chrome" to get id of front window')

# 指定ウィンドウを撮影
screencapture -l $windowid /path/to/screenshot.png
```

## 便利なオプション組み合わせ

### ベストプラクティス組み合わせ
```bash
# 影なし + ウィンドウ選択 + 即座撮影
screencapture -wo /path/to/screenshot.png

# アクティブウィンドウ + 影なし + 音なし
screencapture -Wox /path/to/screenshot.png
```

### 自動化向け
```bash
# ブラウザを開いて特定ウィンドウを撮影
open_and_screenshot() {
    open "$1"
    sleep 3
    screencapture -wo "$2"
}

# 使用例
open_and_screenshot "http://localhost:5176" "talent-tuner-window.png"
```

## 主要オプション

- `-w`: インタラクティブウィンドウ選択モード
- `-W`: アクティブウィンドウ自動撮影
- `-o`: ウィンドウの影を含めない（クリーンな撮影）
- `-x`: シャッター音を無効化
- `-l <windowid>`: 特定ウィンドウID撮影
- `-t <format>`: 出力フォーマット (png, jpg, tiff等)

## AppleScript連携（高度）

### 特定アプリケーションのウィンドウを自動撮影
```bash
# Chromeの最前面ウィンドウを撮影
screenshot_chrome() {
    osascript -e '
    tell application "Google Chrome"
        activate
        delay 1
    end tell
    ' && screencapture -Wox "$1"
}
```

### ウィンドウ情報取得
```bash
# 現在開いているウィンドウ一覧
osascript -e 'tell application "System Events" to get name of every window of every process'
```

## 開発ワークフロー改善

### 1. 開発サーバー + ウィンドウ撮影
```bash
dev_screenshot() {
    local url="$1"
    local output="$2"
    
    # ブラウザでURLを開く
    open "$url"
    sleep 3
    
    # アクティブウィンドウ（ブラウザ）を撮影
    screencapture -Wox "$output"
    
    echo "Screenshot saved: $output"
}

# 使用例
dev_screenshot "http://localhost:5176" "talent-tuner-latest.png"
```

### 2. 連続撮影（A/Bテスト用）
```bash
continuous_screenshot() {
    local base_name="$1"
    local count=1
    
    while true; do
        screencapture -wo "${base_name}_${count}.png"
        echo "Screenshot ${count} saved. Press any key for next..."
        read -n 1
        ((count++))
    done
}
```

## 利点

### ウィンドウ撮影の利点
1. **正確性**: デスクトップ全体ではなく対象アプリのみ
2. **クリーンさ**: 背景や他アプリが写り込まない
3. **コンテキスト**: ブラウザのURL bar等も含まれる
4. **自動化**: スクリプト化しやすい
5. **ファイルサイズ**: 必要な部分のみで軽量

### 開発効率向上
- **UI/UX比較**: Before/After比較が容易
- **バグレポート**: 正確な状況記録
- **プレゼン資料**: クリーンなスクリーンショット
- **ドキュメント**: 統一された画像品質

## 推奨ワークフロー

```bash
# プロジェクト用スクリーンショット関数
take_app_screenshot() {
    local name="$1"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local filename="${name}_${timestamp}.png"
    
    echo "Click on the window you want to capture..."
    screencapture -wo "/Users/$(whoami)/Desktop/${filename}"
    echo "Screenshot saved: ${filename}"
}

# エイリアス設定（.zshrcまたは.bashrcに追加）
alias screenshot='take_app_screenshot'
alias ss='screencapture -wo'
```

これにより、デスクトップの雑音なしに正確なアプリケーションの状態を記録できます。