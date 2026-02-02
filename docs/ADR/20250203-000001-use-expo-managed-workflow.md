# Expo Managed Workflowを採用する

| | |
|---|---|
| **Status** | accepted |
| **Date** | 2025-02-03 |
| **Decision-makers** | taisei |
| **Consulted** | - |
| **Informed** | - |

## Context and Problem Statement

React Nativeアプリの開発環境・ビルドパイプラインを選定する必要がある。個人開発プロジェクトであり、ネイティブモジュールの直接操作よりも開発速度と簡便さを重視したい。

## Decision Drivers

* 個人開発であり、ネイティブビルド環境の管理コストを最小化したい
* OTA（Over-the-Air）アップデートでストア審査なしに修正を配信したい
* Expo SDKが提供するライブラリ（expo-linear-gradient等）を活用したい
* New Architecture（Fabric/TurboModules）への対応が必要

## Considered Options

1. Expo Managed Workflow
2. Expo Bare Workflow（expo prebuild）
3. React Native CLI（Bare）

## Decision Outcome

**Chosen option**: "Expo Managed Workflow", because 個人開発においてビルド環境の管理コストを最小化でき、Expo SDK 54はNew Architectureにも対応しているため。

### Consequences

**Positive:**
* Xcode/Android Studioの直接操作が不要で、`npx expo start`で即座に開発可能
* EAS Build/Updateによるクラウドビルド・OTAアップデートが利用可能
* `expo-linear-gradient`などExpo SDKライブラリがそのまま使える

**Negative:**
* カスタムネイティブモジュールが必要になった場合、prebuildへの移行が必要
* Expo SDKのアップデートサイクルに依存する

**Neutral:**
* `newArchEnabled: true`でNew Architectureを有効化済み。パフォーマンス向上が期待できるが、一部ライブラリの互換性に注意が必要

### Confirmation

* `npx expo start`でエラーなく起動できること
* iOS/Androidシミュレータで画面遷移が正常に動作すること

## Pros and Cons of the Options

### Expo Managed Workflow

Expoが提供するマネージド環境で、ネイティブコードを直接触らずに開発する。

* Good, because ビルド設定が自動管理され、開発に集中できる
* Good, because EAS Build/Updateでクラウドビルド・OTA配信が可能
* Good, because Expo SDK 54がNew Architectureをサポート
* Bad, because カスタムネイティブモジュールの追加に制限がある

### Expo Bare Workflow（expo prebuild）

`expo prebuild`でネイティブプロジェクトを生成し、Expoのエコシステムを活用しつつネイティブコードも編集可能にする。

* Good, because カスタムネイティブモジュールを自由に追加できる
* Good, because Expoライブラリとの互換性を維持できる
* Bad, because ios/androidディレクトリの管理が必要になる
* Bad, because 個人開発では過剰な柔軟性

### React Native CLI（Bare）

Expoを使わず、React Native CLIで直接プロジェクトを管理する。

* Good, because ネイティブレイヤーの完全な制御が可能
* Bad, because ビルド環境の構築・維持に大きなコストがかかる
* Bad, because Expo SDKライブラリが直接利用できない
* Bad, because 個人開発では管理負荷が高すぎる

## More Information

* [Expo SDK 54 リリースノート](https://blog.expo.dev/)
* app.json で `newArchEnabled: true` を設定済み
