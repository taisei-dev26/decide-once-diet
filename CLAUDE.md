# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

「管理しない・記録しない・考えさせない」をコンセプトにした、ストレス最小化型ダイエット支援アプリ。  
ケトジェニック固定で、食事契約は初回のみ、体重計測は週1回のみ。

## コマンド

```bash
npm start          # Expoサーバー起動
npm run ios        # iOS シミュレータで起動
npm run android    # Android エミュレータで起動
npm run lint       # ESLint実行
npm run format     # Prettier整形
```

## アーキテクチャ

```
src/
├── screens/         # 画面コンポーネント
├── components/      # 再利用可能なUIコンポーネント
└── constants/       # テーマ・カラー定義
docs/
├── requirements.md           # 要件定義
└── coding-guides/           # 画面実装ガイド（Figma連携）
```

## コーディング規約

- シングルクォート、セミコロンあり（Prettier設定済み）
- printWidth: 100
- グラデーション背景には `expo-linear-gradient` の `LinearGradient` を使用
- 色は `src/constants/theme.ts` で一元管理
- スタイルは `StyleSheet.create` で定義

## 参照すべきドキュメント

- `docs/coding-guides/` - 各画面の実装ガイド（Figmaリンク、コンポーネント設計、スタイル値）
