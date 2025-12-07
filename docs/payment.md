# 目的
ユーザーが職業レポートを購入し、決済完了後に PDF をダウンロードできるようにする。

# フロー概要
1. 診断結果画面（PremiumSection.vue）で「レポートを購入」押下し、選択職業の purchaseData（professionName, priceId, price, currency, timestamp）を sessionStorage に保存し `/payment` へ遷移。
2. 決済画面（PaymentView.vue）で「決済する」押下。POST `/api/create-payment-intent` に purchaseData を送信し、返却された [url](http://_vscodecontentref_/1) で Stripe Checkout へリダイレクト。
3. Stripe 決済完了後、[/success?session_id=...](http://_vscodecontentref_/2) へ戻る。
4. [SuccessView.vue](http://_vscodecontentref_/3) で GET [/api/check-session?session_id=...](http://_vscodecontentref_/4) を呼び、支払い済みを確認（未決済なら 403）。
5. ユーザーが「PDFダウンロード」を押下すると、GET [/api/download-pdf?session_id=...](http://_vscodecontentref_/5) を呼び、職業名に対応する `public/pdfs/{professionName}-report.pdf` をダウンロード。

# シーケンス図
```mermaid
sequenceDiagram
    participant U as ユーザー
    participant FE as フロントエンド
    participant API as サーバーAPI
    participant Stripe
    participant LocalPDF as PDFディレクトリ

    U->>FE: 「レポートを購入」クリック（PremiumSection.vue）
    FE->>FE: sessionStorage に purchaseData 保存
    FE->>FE: /payment へ遷移
    U->>FE: 「決済する」クリック（PaymentView.vue）
    FE->>API: POST /api/create-payment-intent<br/>{professionName, priceId, price, currency, timestamp}
    API->>Stripe: Checkout Session 作成 (metadata に professionName など)
    Stripe-->>API: session.url
    API-->>FE: {url}
    FE->>Stripe: Checkout へリダイレクト
    Stripe-->>U: 決済画面表示
    U->>Stripe: 決済完了
    Stripe-->>U: success_url
    U->>FE: SuccessView 表示
    FE->>API: GET /api/check-session?session_id=...
    API->>Stripe: セッション参照
    Stripe-->>API: payment_status, metadata
    API-->>FE: {professionName} (未決済なら 403)
    U->>FE: 「PDFダウンロード」クリック（SuccessView.vue）
    FE->>API: GET /api/download-pdf?session_id=...
    API->>Stripe: セッション参照＆支払い確認
    Stripe-->>API: 決済済みレスポンス
    API->>LocalPDF: {professionName}-report.pdf 読込
    LocalPDF-->>API: PDFデータ
    API-->>FE: Content-Disposition 付き PDF
    FE-->>U: ファイル保存 (professionName-report.pdf)
```