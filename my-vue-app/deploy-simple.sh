#!/bin/bash

# お名前.com共用サーバー 簡単デプロイスクリプト
# rsync + lftp を使用

set -e  # エラー時に停止

# 設定ファイル読み込み
if [ -f .env.deploy ]; then
  export $(grep -v '^#' .env.deploy | xargs)
else
  echo "❌ .env.deploy ファイルが見つかりません"
  echo "npm run deploy:setup を実行してください"
  exit 1
fi

# 必須変数チェック
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASSWORD" ]; then
  echo "❌ FTP設定が不完全です。.env.deploy を確認してください"
  exit 1
fi

echo "🚀 お名前.com 簡単デプロイを開始します..."

# 1. ビルド実行
echo "📦 プロジェクトをビルド中..."
npm run build
echo "✅ ビルド完了"

# 2. 一時的な結合ディレクトリを作成
TEMP_DIR="temp_deploy"
rm -rf $TEMP_DIR
mkdir -p $TEMP_DIR

# 3. ファイルを結合
echo "📁 デプロイファイルを準備中..."

# dist の内容をコピー
cp -r dist/* $TEMP_DIR/

# 設定ファイルを配置
cp public/.htaccess $TEMP_DIR/ 2>/dev/null || echo "⚠️ .htaccess not found"
mkdir -p $TEMP_DIR/api
cp public/api/chat-proxy.php $TEMP_DIR/api/ 2>/dev/null || echo "⚠️ chat-proxy.php not found"
cp .env $TEMP_DIR/ 2>/dev/null || echo "⚠️ .env not found"

echo "✅ ファイル準備完了"

# 4. lftp でアップロード
echo "📤 FTPアップロード中..."

lftp -c "
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASSWORD $FTP_HOST
lcd $TEMP_DIR
cd /public_html
mirror --reverse --delete --verbose --parallel=3
quit
"

echo "✅ アップロード完了"

# 5. クリーンアップ
rm -rf $TEMP_DIR
echo "🧹 一時ファイル削除完了"

echo "🎉 デプロイが完了しました！"
echo "🌐 サイトを確認してください: https://your-domain.com"