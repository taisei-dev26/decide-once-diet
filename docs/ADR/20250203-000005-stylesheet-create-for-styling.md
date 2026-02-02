# StyleSheet.createによるスタイリングを採用する

| | |
|---|---|
| **Status** | accepted |
| **Date** | 2025-02-03 |
| **Decision-makers** | taisei |
| **Consulted** | - |
| **Informed** | - |

## Context and Problem Statement

React Nativeアプリのスタイリング手法を選定する必要がある。Web開発で普及しているCSS-in-JSライブラリや、React Native向けのユーティリティファーストなスタイリングも選択肢として存在する。

## Decision Drivers

* React Native標準APIで完結させたい（外部依存を最小化）
* 4〜5画面の小規模アプリであり、大規模なスタイリングシステムは不要
* TypeScriptとの統合が良好であること
* パフォーマンスへの悪影響がないこと

## Considered Options

1. StyleSheet.create（React Native標準）
2. NativeWind（Tailwind CSS for React Native）
3. styled-components / emotion

## Decision Outcome

**Chosen option**: "StyleSheet.create", because React Native標準APIであり、外部依存なしで型安全なスタイリングが可能。小規模アプリには十分な機能を提供する。

### Consequences

**Positive:**
* 追加のライブラリインストールが不要
* `StyleSheet.create`はスタイルオブジェクトを最適化し、ブリッジ通信を削減
* TypeScriptの型補完が標準で効く
* React Nativeの公式ドキュメントと一致しており、学習コストが低い

**Negative:**
* スタイルの再利用はコンポーネント分割またはtheme.tsからのインポートで対応する必要がある
* 条件付きスタイルの記述がユーティリティクラス方式より冗長

**Neutral:**
* グラデーションは`expo-linear-gradient`の`LinearGradient`コンポーネントで実現（StyleSheet.createの範囲外）

### Confirmation

* 全コンポーネントで`StyleSheet.create`を使用していること
* インラインスタイルを避け、スタイル定義がコンポーネントファイル末尾にまとまっていること
* `npm run lint`でスタイル関連の警告がないこと

## Pros and Cons of the Options

### StyleSheet.create（React Native標準）

React Nativeが提供する標準のスタイリングAPI。

* Good, because 外部依存ゼロ
* Good, because スタイルオブジェクトの最適化（ID参照化）でパフォーマンスが良い
* Good, because TypeScript型定義が標準で提供される
* Neutral, because コンポーネントごとにスタイル定義が分散する
* Bad, because ユーティリティクラスのような簡潔な記述はできない

### NativeWind（Tailwind CSS for React Native）

Tailwind CSSのユーティリティファーストアプローチをReact Nativeに適用するライブラリ。

* Good, because クラス名ベースで簡潔にスタイルを記述できる
* Good, because Webの経験がそのまま活かせる
* Bad, because 追加の設定（tailwind.config.js）とBabel pluginが必要
* Bad, because React Nativeの標準的な書き方から外れる
* Bad, because 小規模アプリには設定コストが見合わない

### styled-components / emotion

CSS-in-JSライブラリをReact Nativeで使用する。

* Good, because コンポーネントとスタイルが一体化し、可読性が高い
* Good, because テーマプロバイダーでグローバルテーマを注入できる
* Bad, because ランタイムオーバーヘッドが発生する
* Bad, because React Native固有のスタイルプロパティとの互換性に注意が必要
* Bad, because 追加の依存関係が増える

## More Information

* `src/constants/theme.ts` - 共有カラー定義
* CLAUDE.md - 「スタイルは`StyleSheet.create`で定義」と規約に明記
