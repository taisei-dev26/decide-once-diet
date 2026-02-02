# ケトジェニック固定のダイエットプランとする

| | |
|---|---|
| **Status** | accepted |
| **Date** | 2025-02-03 |
| **Decision-makers** | taisei |
| **Consulted** | - |
| **Informed** | - |

## Context and Problem Statement

ダイエットプランの選択肢をユーザーに提供する方法を決定する必要がある。アプリのコンセプト「管理しない・記録しない・考えさせない」に基づき、ユーザーの意思決定負荷を最小化したい。

## Decision Drivers

* 「考えさせない」コンセプト：ユーザーの判断回数を最小化したい
* 初回の食事契約のみで日常の意思決定を排除する設計
* プラン選択画面は存在するが、MVPではケトジェニック固定で十分
* 操作時間10秒以内の目標

## Considered Options

1. ケトジェニック固定（他プランはUI上表示するが選択不可）
2. 複数プラン選択可能（ケトジェニック、ローファット、バランス型）
3. プラン選択画面を廃止し、完全にケトジェニック固定

## Decision Outcome

**Chosen option**: "ケトジェニック固定", because MVPとして最もシンプルであり、「考えさせない」コンセプトに合致する。UI上は3プランを表示して将来の拡張余地を残しつつ、現時点ではケトジェニックのみ機能させる。

### Consequences

**Positive:**
* 食事契約（FoodContract）画面のバリエーションが1種類で済む
* ユーザーが「どのプランにしよう」と悩む必要がない
* 栄養指導ロジックの実装が1パターンで完結する

**Negative:**
* ケトジェニックが合わないユーザーには対応できない
* UI上に表示される他プラン（ローファット、バランス型）が選択不可だとユーザーの期待を裏切る可能性がある

**Neutral:**
* `planGradients`にlowFat・balancedのグラデーション定義が既に存在しており、将来の拡張に備えている

### Confirmation

* ChoosePlanScreenでケトジェニックカードのみが次画面に遷移すること
* requirements.mdに「ケトジェニック固定」と明記されていること
* 他プランのカードタップ時に適切なフィードバック（coming soon等）があること

## Pros and Cons of the Options

### ケトジェニック固定（UI上は3プラン表示）

ケトジェニックのみ機能させるが、UI上は3プランを表示して将来拡張の余地を残す。

* Good, because 実装がシンプルでMVPに最適
* Good, because 将来のプラン追加時にUIの大幅変更が不要
* Neutral, because 非活性プランの表示方法を工夫する必要がある
* Bad, because 選択できないカードがあるとUXが混乱する可能性

### 複数プラン選択可能

3つのダイエットプランを全て機能させる。

* Good, because 幅広いユーザーに対応できる
* Bad, because 食事契約画面を3パターン実装する必要がある
* Bad, because 「考えさせない」コンセプトに反する（選択の負荷が増える）
* Bad, because MVPとしては実装コストが高すぎる

### プラン選択画面を完全廃止

プラン選択画面を削除し、最初からケトジェニック前提でフローを開始する。

* Good, because 画面遷移が1つ減り、操作がさらにシンプルになる
* Bad, because 将来のプラン追加時に画面を新規追加する必要がある
* Bad, because アプリの特徴（ダイエットプランの提案）が伝わりにくい

## More Information

* `docs/requirements.md` - ケトジェニック固定の要件記載
* `src/screens/ChoosePlanScreen.tsx` - 3プラン表示のUI実装
* `src/constants/theme.ts` - `planGradients`に3プラン分のカラー定義
