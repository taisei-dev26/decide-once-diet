# ダークモード固定のデザインを採用する

| | |
|---|---|
| **Status** | accepted |
| **Date** | 2025-02-03 |
| **Decision-makers** | taisei |
| **Consulted** | - |
| **Informed** | - |

## Context and Problem Statement

アプリのカラーテーマ戦略を決定する必要がある。ダイエットアプリとして「プレッシャーを与えない」コンセプトを持つため、視覚的にも落ち着いた印象を与えるデザインが求められる。

## Decision Drivers

* 「管理しない・記録しない・考えさせない」というアプリコンセプト
* 視覚的にストレスの少ないUI
* 実装の簡潔さ（テーマ切替機構が不要）
* グラデーションカード等のアクセントカラーが映えるベース色

## Considered Options

1. ダークモード固定
2. ライトモード固定
3. ライト/ダーク切替対応

## Decision Outcome

**Chosen option**: "ダークモード固定", because ストレス最小化コンセプトに合致し、グラデーションカードが視覚的に映え、テーマ切替の実装コストを排除できるため。

### Consequences

**Positive:**
* `theme.ts`でカラーを一元管理でき、条件分岐が不要
* ダーク背景（`#0a0a0a`〜`#1a1a1a`）でグラデーションカードが鮮やかに映える
* 夜間使用時の目への負担が少ない

**Negative:**
* 明るい環境での視認性が低い場合がある
* OS設定に連動したテーマ切替を求めるユーザーには対応できない

**Neutral:**
* `app.json`の`userInterfaceStyle`は`"light"`だが、アプリ内はダーク背景で統一されている（ステータスバーの扱いに注意）

### Confirmation

* `src/constants/theme.ts`の`colors.background`がダーク系（`#0a0a0a`〜`#1a1a1a`）であること
* 全画面でLinearGradientのダーク背景が適用されていること
* グラデーションカード（ketogenic: `#f093fb` → `#f5576c`）が背景上で十分なコントラストを持つこと

## Pros and Cons of the Options

### ダークモード固定

全画面をダーク背景で統一し、テーマ切替機能を持たない。

* Good, because 実装がシンプル（条件分岐なし）
* Good, because グラデーションアクセントが映える
* Good, because 「落ち着いた」「プレッシャーのない」印象を与える
* Bad, because 屋外での視認性が低い場合がある

### ライトモード固定

全画面をライト背景で統一する。

* Good, because 明るい環境での視認性が高い
* Bad, because グラデーションカードのコントラストが弱くなる
* Bad, because ダイエットアプリとして「管理されている」印象を与えやすい

### ライト/ダーク切替対応

OSのダークモード設定に連動、またはアプリ内で切替可能にする。

* Good, because ユーザーの好みに対応できる
* Bad, because theme.tsの全カラーを2系統管理する必要がある
* Bad, because 個人開発で4〜5画面のアプリには過剰な実装コスト
* Bad, because デザインの一貫性を保つのが難しい

## More Information

* `src/constants/theme.ts` でカラー定義を一元管理
* `planGradients`でダイエットプランごとのグラデーション色を定義
