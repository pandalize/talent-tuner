#!/bin/bash

# デプロイスクリプト for お名前.comサーバー
# 使用方法: ./deploy.sh

echo "🚀 Starting deployment..."

# ビルド
echo "📦 Building Vue app..."
cd my-vue-app
npm run build

# ビルドが成功したか確認
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# FTP設定（環境変数または.envファイルから読み込み）
FTP_HOST="${FTP_HOST:-ftp.onamae.com}"
FTP_USER="${FTP_USER}"
FTP_PASS="${FTP_PASS}"
REMOTE_DIR="${REMOTE_DIR:-/public_html}"

# distフォルダの内容をアップロード
echo "📤 Uploading files to server..."

# lftp を使用（brew install lftp でインストール）
lftp -c "
set ftp:ssl-allow no
open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST
mirror -R --verbose --delete dist/ $REMOTE_DIR
bye
"

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
else
    echo "❌ Deployment failed!"
    exit 1
fi

echo "🎉 Deployment complete!"