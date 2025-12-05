# 目的
ユーザーが職業レポートを購入し、決済完了後に PDF をダウンロードできるようにする。

# 手順
1. 診断結果画面（PremiumSection.vue）で「レポートを購入」ボタン押下
2. 選択職業の purchaseData（profession-report.json内のprofessionName, priceId, priceとcurrency, timestamp）を sessionStorage に保存
3. 決済画面（PaymentView.vue）へ遷移


4. 決済画面で「決済する」ボタン押下
5. フロントからサーバへPOST。
    API: POST http://localhost:3000/api/create-payment-intent
    送信内容（body）例:
6. Stripe へ metadata（professionName, reportId, など）を渡して Checkout を作成
7. 完了後 Stripe が success_url（例: /success?session_id={CHECKOUT_SESSION_ID}）にリダイレクト
8. 成功画面（SuccessView.vue）で session_id を受け取りサーバに確認を求める
    API: GET /api/check-session?session_id=...
返却想定: { professionName, customerName, payment_status }（支払い済みか確認）
参照ファイル（サーバ）: check-session.ts
参照ファイル（フロント）: SuccessView.vue
「PDF ダウンロード」

9. Success ページのダウンロードアクション（fetch('/api/download-pdf?session_id=...')）
    API: GET /api/download-pdf?session_id=...（開発用に ?profession= でも可）
10. Stripe セッションの metadata（professionName または professionId）を参照
11. タウンロードする pdf を探す
    存在すれば Content-Disposition をセットして返却。

フロントエンド
PremiumSection.vue — 購入ボタン・購入データ準備（sessionStorage に PurchaseData を入れる）
PaymentView.vue — 決済ページ（create-payment-intent を呼ぶ）
SuccessView.vue — 決済完了ページ（session_id を受け取り check-session / download-pdf を実行）
profession-reports.json — 職業ごとの priceId, price, reportId（フロントで価格表示や priceId 取得に使用）
professions.json — 職業データ（id ⇄ 表示名の照合に利用）
サーバー（serverside）

create-payment-intent.ts — Stripe Checkout セッション作成（受け取り: professionName, priceId, price 等）
check-session.ts — session_id から支払い状況・metadata 取得（支払い済みか確認）
download-pdf.ts — session_id を元に PDF を返却するロジック（metadata 参照、ファイル探索、Content-Disposition 設定）
pdfs — PDF 実体ファイル群（例: プログラマー-report.pdf）
重要なデータ／メタデータ