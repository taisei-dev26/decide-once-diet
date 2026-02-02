# React Navigation Native Stackをナビゲーションに採用する

| | |
|---|---|
| **Status** | accepted |
| **Date** | 2025-02-03 |
| **Decision-makers** | taisei |
| **Consulted** | - |
| **Informed** | - |

## Context and Problem Statement

アプリ内の画面遷移（ChoosePlan → SetDuration → FoodContract → Home）を管理するナビゲーションライブラリを選定する必要がある。Expo環境でのファイルベースルーティング（expo-router）も選択肢として検討した。

## Decision Drivers

* シンプルなスタック遷移（4〜5画面程度）で十分
* 安定性と実績のあるライブラリを使いたい
* カスタムヘッダー（`headerShown: false`）で独自UIを実現したい
* Expo Routerはまだ成熟途上（v1観察中）

## Considered Options

1. React Navigation（@react-navigation/native-stack）
2. Expo Router（ファイルベースルーティング）

## Decision Outcome

**Chosen option**: "React Navigation Native Stack", because 画面数が少なくシンプルなスタック遷移で十分であり、安定した実績があるため。Expo Routerは将来のバージョンで成熟した段階で再評価する。

### Consequences

**Positive:**
* v7は安定しており、豊富なドキュメントとコミュニティサポートがある
* `headerShown: false`で完全にカスタムなUI（ScreenHeaderコンポーネント）を実現
* TypeScript型定義が充実しており、型安全なナビゲーションが可能

**Negative:**
* 画面が増えた場合、手動でルート定義を追加する必要がある
* ディープリンキングの設定がExpo Routerより手動的

**Neutral:**
* Expo Routerが安定したら移行を検討する可能性がある

### Confirmation

* `ChoosePlan` → `SetDuration`の画面遷移が正常に動作すること
* 戻るボタン（`navigation.goBack()`）が期待通りに機能すること

## Pros and Cons of the Options

### React Navigation（@react-navigation/native-stack）

React Native界で最も広く使われているナビゲーションライブラリ。命令的なAPI。

* Good, because 安定性が高く、v7で成熟している
* Good, because ネイティブスタックアニメーションを使用（パフォーマンスが良い）
* Good, because カスタムヘッダーの実装が容易
* Neutral, because 画面定義をApp.tsxに手動で記述する必要がある
* Bad, because ファイル構造とルートが自動連動しない

### Expo Router（ファイルベースルーティング）

Next.jsライクなファイルベースルーティングをReact Nativeに持ち込むExpoの公式ソリューション。

* Good, because ファイル構造がそのままルート定義になる
* Good, because ディープリンキングが自動設定される
* Bad, because v1でまだ安定性に懸念がある（learning-notes.mdに記載）
* Bad, because シンプルなアプリには過剰な抽象化

## More Information

* App.tsx でNavigationContainerとStack.Navigatorを設定済み
* 現在のルート: `ChoosePlan` → `SetDuration`（今後 `FoodContract` → `Home` を追加予定）
