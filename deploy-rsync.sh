#!/bin/bash

# rsyncを使った高速デプロイスクリプト
# お名前.comでSSH接続が利用可能な場合のみ使用

echo "🚀 Starting rsync deployment..."

# ビルド
cd my-vue-app
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# rsyncでアップロード（差分のみ転送で高速）
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env' \
    dist/ username@server.onamae.com:/home/username/public_html/

echo "✅ Deployment complete!"