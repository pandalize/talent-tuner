# 今までのセットアップ記録

目的  
- フロントはお名前.comで運用し、サーバー(API) は Vercel にデプロイする構成に分離する。

ディレクトリ構成（現在）
```
/Users/hinano/workspace/talent-tuner
├─ my-vue-app/       # フロント（お名前.comへデプロイ）
├─ serverside/       # Vercel にデプロイする API を収めるフォルダ
│  └─ api/           # Vercel の serverless 関数
└─ vercel.json       # Vercel の設定（必要に応じ編集）
```

実行した主要コマンド（履歴）
```bash
# serverside に移動して package 管理を用意（不要ならスキップ）
cd serverside
# package.json が無ければ
npm init -y

# 必要なパッケージをインストール
npm install

# ローカルのファイルを Vercel にアップしてプレビューを作成
npx vercel
Vercelとの対話
? Set up and deploy “~/workspace/talent-tuner/serverside”? yes
? Which scope should contain your project? pandalize's projects
? Link to existing project? yes
? What’s the name of your existing project? talent-tuner
以下は自動で生成された文章
🔗  Linked to pandalizes-projects/talent-tuner (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/pandalizes-projects/talent-tuner/2ku5HCziUsH1nY9tMqtX4WsuhpfW [3s]
✅  Preview: https://talent-tuner-3vsvdju25-pandalizes-projects.vercel.app [3s]
📝  To deploy to production (talent-tuner-khaki.vercel.app), run `vercel --prod`
╭──────────────────────────────────────────────────────────╮
│                                                          │
│           Update available! v48.2.0 ≫ v48.4.1            │
│   Changelog: https://github.com/vercel/vercel/releases   │
│           Run `npm i vercel@latest` to update.           │
│                                                          │
╰──────────────────────────────────────────────────────────╯


https://localhost:5173からのみアクセス可能