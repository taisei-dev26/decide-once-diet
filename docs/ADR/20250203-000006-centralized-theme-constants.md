# カラー定数をtheme.tsで一元管理する

| | |
|---|---|
| **Status** | accepted |
| **Date** | 2025-02-03 |
| **Decision-makers** | taisei |
| **Consulted** | - |
| **Informed** | - |

## Context and Problem Statement

複数の画面・コンポーネントで使用するカラー値やグラデーション定義を、どのように管理するか決定する必要がある。色の一貫性を保ちつつ、変更時の影響範囲を最小化したい。

## Decision Drivers

* ダークモード固定でカラー値が全画面で共通
* グラデーション色がプランごとに異なり、複数箇所で参照される
* デザイン変更時に一箇所の修正で全体に反映したい
* Figmaのデザイントークンとの対応を明確にしたい

## Considered Options

1. `src/constants/theme.ts`で一元管理
2. 各コンポーネントにカラー値を直接記述
3. デザイントークンライブラリ（Style Dictionary等）を導入

## Decision Outcome

**Chosen option**: "`src/constants/theme.ts`で一元管理", because 小規模プロジェクトに適したシンプルな構成であり、TypeScriptの型安全性で参照ミスを防止できるため。

### Consequences

**Positive:**
* カラー値の変更が1ファイルの修正で全画面に反映される
* `as const`アサーションにより、グラデーション色がタプル型として型安全に扱える
* Figmaのデザイン仕様とtheme.tsの対応が明確

**Negative:**
* theme.tsが肥大化する可能性がある（フォント、スペーシング等を追加する場合）
* コンポーネント固有のカラーもtheme.tsに含めるべきか判断が必要

**Neutral:**
* 現在はカラーのみ管理。フォントサイズ・スペーシングは各コンポーネントで直接指定

### Confirmation

* 全コンポーネントで`import { colors, planGradients } from '../constants/theme'`を使用していること
* コンポーネント内にハードコードされたカラー値（`#ffffff`等）がないこと
* `npm run lint`が通ること

## Pros and Cons of the Options

### `src/constants/theme.ts`で一元管理

単一のTypeScriptファイルでカラー定数をexportする。

* Good, because 変更が1箇所で済む
* Good, because TypeScript型チェックで参照ミスを防止
* Good, because `as const`でリテラル型が使える（`planGradients`のタプル型）
* Neutral, because 規模が大きくなったら分割が必要
* Bad, because デザイントークンの自動同期機能はない

### 各コンポーネントにカラー値を直接記述

色をコンポーネントファイル内のStyleSheet.createで直接指定する。

* Good, because コンポーネントが自己完結する
* Bad, because 同じ色が複数箇所に散在し、変更時の漏れが発生しやすい
* Bad, because デザインの一貫性を保証できない

### デザイントークンライブラリ（Style Dictionary等）

Figma等のデザインツールからトークンを自動生成する。

* Good, because デザインツールとの自動同期が可能
* Bad, because ビルドパイプラインの追加設定が必要
* Bad, because 4〜5画面の小規模アプリには過剰な仕組み
* Bad, because 個人開発でデザインツール連携の恩恵が少ない

## More Information

* `src/constants/theme.ts` - 現在の実装
* `docs/coding-guides/` - 各画面のFigma連携ガイド（カラー値の参照先として機能）
