# 実装ステータス

最終更新: 2026-01-30

## 実装済み

### ナビゲーション

- [App.tsx](../App.tsx) - React Navigation Native Stack によるルーティング設定
  - `ChoosePlan` → `SetDuration` のスタック遷移
  - ヘッダー非表示（`headerShown: false`）

### 画面（Screens）

| 画面 | ファイル | 状態 |
|------|---------|------|
| プラン選択 | [ChoosePlanScreen.tsx](../src/screens/ChoosePlanScreen.tsx) | ✅ 実装済み |
| 期間設定 | [SerDurationScreen.tsx](../src/screens/SerDurationScreen.tsx) | ⚠️ 実装済み（課題あり） |

#### ChoosePlanScreen
- 3つのダイエットプラン（ケトジェニック / ローファット / バランス）をカード表示
- `ScreenHeader` + `PlanCard` コンポーネントで構成
- プラン選択時に `SetDuration` 画面へ遷移
- グラデーション背景（`#0a0a0a` → `#141414` → `#1a1a1a`）

#### SetDurationScreen
- 3つの期間オプション（8週 / 12週 / 16週）を `DurationCard` で表示
- 12週がデフォルト選択状態
- 戻るボタンで `ChoosePlan` に戻る
- **課題:**
  - ファイル名が `SerDurationScreen.tsx`（タイポ: `Ser` → `Set`）
  - `handleContinue()` が未実装（空関数）

### コンポーネント（Components）

| コンポーネント | ファイル | 用途 |
|--------------|---------|------|
| ScreenHeader | [ScreenHeader.tsx](../src/components/ScreenHeader.tsx) | 画面ヘッダー（タイトル + サブタイトル） |
| PlanCard | [PlanCard.tsx](../src/components/PlanCard.tsx) | プラン選択カード |
| DurationCard | [DurationCard.tsx](../src/components/DurationCard.tsx) | 期間選択カード（選択/非選択状態） |

### 定数・テーマ

- [theme.ts](../src/constants/theme.ts) - カラー定義（背景グラデーション、カード、テキスト、プラン別グラデーション）

### ドキュメント

- [requirements.md](requirements.md) - 要件定義
- [learning-notes.md](learning-notes.md) - 技術メモ
- [choose-plan-guide.md](coding-guides/choose-plan-guide.md) - ChoosePlanScreen 実装ガイド
- [set-duration-guide.md](coding-guides/set-duration-guide.md) - SetDurationScreen 実装ガイド

---

## 未実装

要件定義（`docs/requirements.md`）に基づく未実装機能:

### 画面

| 画面 | 要件セクション | 説明 |
|------|--------------|------|
| 食事契約 | 4.1 | 食べるものをチェック式で選択（肉・魚・卵・チーズ等） |
| 体重入力 | 4.3 | 週1回の体重入力（数値のみ） |
| グラフ表示 | 4.4 | 折れ線グラフ（週1プロット、開始比・前回比） |
| ホーム / ダッシュボード | - | 日常利用時のメイン画面 |

### 機能

- データ永続化（AsyncStorage / SQLite 等）
- 期間中の変更ロック機構
- 週1回の体重入力リマインダー（通知）

### 技術課題

- 状態管理ライブラリの導入（現在は `useState` のみ）
- 画面間のパラメータ受け渡し（選択したプラン・期間の引き継ぎ）

---

## 画面遷移フロー

```
[ChoosePlan] → [SetDuration] → [食事契約] → [ホーム]
                                                 ↓
                                            [体重入力]
                                                 ↓
                                            [グラフ表示]
```

**実装済み:** `ChoosePlan` → `SetDuration`
**未実装:** `SetDuration` 以降のすべての遷移
