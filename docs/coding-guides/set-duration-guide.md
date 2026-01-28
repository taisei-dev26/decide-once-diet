# Set Duration 実装ガイド

> Figma: https://www.figma.com/design/XcXG7TrpLCgsAP3l9bsI9B?node-id=10-32
> 生成日: 2026-01-29
> 対象フレームワーク: React Native (Expo)

---

## 1. 全体像

### この画面の役割

ダイエット期間を選択する画面。8週/12週/16週の3つから1つを選び、「Continue」で次へ進む。

### 完成イメージ（構造）

```
[Screen] グラデーション背景
  [Header]
    - アイコン（天秤マーク、紫グラデ円）
    - タイトル "Set Duration"
    - サブタイトル "How long is your journey?"

  [CardList]
    [DurationCard] 8 Weeks（未選択）
    [DurationCard] 12 Weeks（選択中 = グラデ背景 + ラジオ）
    [DurationCard] 16 Weeks（未選択）

  [Button] Continue（紫グラデ）
```

---

## 2. ファイル構成（最初に作るもの）

```
src/
├── screens/
│   └── SetDurationScreen.tsx     ← 画面本体
├── components/
│   ├── PlanCard.tsx              ← 既存
│   └── DurationCard.tsx          ← 新規：期間選択カード
└── constants/
    └── theme.ts                  ← 既存（グラデ色を追加）
```

### 最初に作るファイル順

1. `src/constants/theme.ts` - グラデーション色の追加
2. `src/components/DurationCard.tsx` - 期間選択カード
3. `src/screens/SetDurationScreen.tsx` - 画面本体

---

## 3. コンポーネント設計

### 分割一覧

| コンポーネント名 | 責務 | 再利用性 |
|:---------------|:----|:--------|
| SetDurationScreen | 画面全体のレイアウトと状態管理 | 低 |
| DurationCard | 期間選択カード（選択/未選択の切り替え） | 中 |

### 各コンポーネントのProps

#### DurationCard

```typescript
type DurationCardProps = {
  label: string;        // 例: "12 Weeks"
  selected: boolean;    // 選択状態
  onPress: () => void;  // タップ時のコールバック
};
```

### 依存関係

```
SetDurationScreen
└── DurationCard (x3)
```

---

## 4. コード骨組み（スケルトン）

### theme.ts への追加

```typescript
// 既存の colors, planGradients に加えて

export const gradients = {
  primary: ['#667eea', '#764ba2'] as const,
};
```

### DurationCard

```tsx
// src/components/DurationCard.tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const DurationCard = ({ label, selected, onPress }: Props) => {
  // selected の場合 → LinearGradient で囲む
  // 未選択の場合 → View で囲む
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {selected ? (
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.cardSelected}
        >
          {/* ラベル + ラジオインジケーター */}
        </LinearGradient>
      ) : (
        <View style={styles.card}>
          {/* ラベルのみ */}
        </View>
      )}
    </TouchableOpacity>
  );
};
```

### SetDurationScreen

```tsx
// src/screens/SetDurationScreen.tsx
import { useState } from 'react';

const DURATIONS = [
  { id: '8weeks', label: '8 Weeks' },
  { id: '12weeks', label: '12 Weeks' },
  { id: '16weeks', label: '16 Weeks' },
] as const;

export function SetDurationScreen() {
  const [selectedId, setSelectedId] = useState<string>('12weeks');

  const handleContinue = () => {
    // 次の画面へ遷移する処理
  };

  return (
    <LinearGradient colors={['#0a0a0a', '#141414', '#1a1a1a']} style={styles.container}>
      {/* ===== ヘッダー ===== */}
      <View style={styles.header}>
        {/* アイコン + タイトル + サブタイトル */}
      </View>

      {/* ===== カードリスト ===== */}
      <View style={styles.cardList}>
        {DURATIONS.map((d) => (
          <DurationCard
            key={d.id}
            label={d.label}
            selected={selectedId === d.id}
            onPress={() => setSelectedId(d.id)}
          />
        ))}
      </View>

      {/* ===== Continueボタン ===== */}
      <TouchableOpacity onPress={handleContinue}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}
```

---

## 5. レイアウト詳細

### 全体構造

```
<LinearGradient>         ← flex: 1, justifyContent: center
  <Header>               ← alignItems: center
  <CardList>             ← gap: 13
  <ContinueButton>      ← 固定高さ 56
</LinearGradient>
```

### Flexbox早見表

| 要素 | direction | justify | align | その他 |
|:----|:----------|:--------|:------|:------|
| Screen (LinearGradient) | column | center | stretch | flex: 1, paddingHorizontal: 24 |
| Header | column | - | center | gap: 16 |
| アイコン円 | column | center | center | width: 64, height: 64 |
| CardList | column | - | stretch | gap: 13 |
| Card（未選択） | column | center | flex-start | height: 82, paddingLeft: 26 |
| Card（選択中） | row | space-between | center | height: 81, paddingHorizontal: 26 |
| Continueボタン | column | center | center | height: 56 |

### ヘッダーとカードリスト間の余白

Figma上ではヘッダーとカードリスト間に `gap: 40` が設定されている。Screen全体の gap として `40` を使うか、`marginTop: 40` をカードリストに設定する。

---

## 6. スタイル値

### 色

| 変数名（推奨） | 値 | 使う場所 |
|:-------------|:---|:--------|
| background.start | #0a0a0a | 画面背景グラデ開始 |
| background.middle | #141414 | 画面背景グラデ中間 |
| background.end | #1a1a1a | 画面背景グラデ終了 |
| card.background | #1a1a1a | 未選択カード背景 |
| card.border | #2a2a2a | 未選択カードボーダー |
| gradient.primary[0] | #667eea | 選択カード/ボタン/アイコン グラデ開始 |
| gradient.primary[1] | #764ba2 | 選択カード/ボタン/アイコン グラデ終了 |
| text.primary | #ffffff | タイトル、カードラベル、ボタンテキスト |
| text.secondary | #a0a0a0 | サブタイトル |
| radioOuter | #ffffff | ラジオ外円 |
| radioInner | #667eea | ラジオ内円 |

### 数値

| 項目 | 値 |
|:----|:---|
| 画面の左右余白 | 24 |
| ヘッダーとカード間の余白 | 40 |
| カード間の余白 | 13 |
| カードとボタン間の余白 | 40 |
| カードの高さ（未選択） | 82 |
| カードの高さ（選択中） | 81 |
| カード左パディング | 26 |
| カードボーダー幅 | 2 |
| カード角丸 | 16 |
| ボタンの高さ | 56 |
| ボタン角丸 | 16 |
| アイコン円サイズ | 64 |
| アイコン円角丸 | 32 (完全な円) |
| ラジオ外円サイズ | 24 |
| ラジオ内円サイズ | 12 |

### フォント

| 要素 | fontSize | fontWeight | color | letterSpacing |
|:----|:---------|:-----------|:------|:-------------|
| タイトル "Set Duration" | 30 | bold (700) | #ffffff | 0.4 |
| サブタイトル | 16 | normal (400) | #a0a0a0 | -0.3 |
| カードラベル | 20 | semibold (600) | #ffffff | -0.45 |
| ボタンテキスト | 18 | semibold (600) | #ffffff | -0.44 |

### シャドウ（カード・ボタン共通）

```tsx
shadowColor: '#000000',
shadowOffset: { width: 0, height: 10 },
shadowOpacity: 0.1,
shadowRadius: 15,
elevation: 5,
```

---

## 7. 実装手順

### フロー全体像

```
[準備] ファイル作成 + theme.ts にグラデ色追加
   ↓
[Step 1] 画面の器を作る（グラデ背景 + 3セクション色分け）
   ↓  確認: 3色が見える
[Step 2] ヘッダーを実装（アイコン + テキスト）
   ↓  確認: タイトルが中央に表示
[Step 3] DurationCardを作成（まず未選択状態のみ）
   ↓  確認: 3枚のカードが並ぶ
[Step 4] 選択状態を実装（グラデ背景 + ラジオ）
   ↓  確認: タップで選択が切り替わる
[Step 5] Continueボタンを実装
   ↓  確認: Figmaと見比べて違和感なし
[完了]
```

---

### Step 0: ファイル作成

```bash
touch src/components/DurationCard.tsx
touch src/screens/SetDurationScreen.tsx
```

**theme.ts に追加するコード:**
```typescript
export const gradients = {
  primary: ['#667eea', '#764ba2'] as const,
};
```

**確認:** ファイルが作成され、theme.ts に gradients が追加されている

---

### Step 1: 画面の器

```tsx
// src/screens/SetDurationScreen.tsx
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function SetDurationScreen() {
  return (
    <LinearGradient colors={['#0a0a0a', '#141414', '#1a1a1a']} style={styles.container}>
      <View style={{ backgroundColor: 'red', height: 156 }} />
      <View style={{ backgroundColor: 'blue', height: 271 }} />
      <View style={{ backgroundColor: 'green', height: 56 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 40,
  },
});
```

**確認:** 赤・青・緑の3ブロックが中央揃えで表示される

---

### Step 2: ヘッダー実装

```tsx
<View style={styles.header}>
  <LinearGradient colors={['#667eea', '#764ba2']} style={styles.headerIcon}>
    {/* TODO: 天秤アイコン（Ionicons等）*/}
  </LinearGradient>
  <Text style={styles.title}>Set Duration</Text>
  <Text style={styles.subtitle}>How long is your journey?</Text>
</View>
```

ヘッダーのスタイル:
```tsx
header: {
  alignItems: 'center',
},
headerIcon: {
  width: 64,
  height: 64,
  borderRadius: 32,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 16,
},
title: {
  color: '#ffffff',
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
  letterSpacing: 0.4,
  lineHeight: 36,
  marginBottom: 16,
},
subtitle: {
  color: '#a0a0a0',
  fontSize: 16,
  textAlign: 'center',
  letterSpacing: -0.3,
  lineHeight: 24,
},
```

**確認:** アイコン円・タイトル・サブタイトルが中央に表示される

---

### Step 3: DurationCard（未選択状態）

```tsx
// src/components/DurationCard.tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const DurationCard = ({ label, selected, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
    borderWidth: 2,
    borderRadius: 16,
    height: 82,
    paddingLeft: 26,
    justifyContent: 'center',
    // shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  label: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.45,
    lineHeight: 28,
  },
});
```

画面側:
```tsx
<View style={styles.cardList}>
  {DURATIONS.map((d) => (
    <DurationCard
      key={d.id}
      label={d.label}
      selected={selectedId === d.id}
      onPress={() => setSelectedId(d.id)}
    />
  ))}
</View>

// styles
cardList: {
  gap: 13,
},
```

**確認:** 3枚のダークカードが縦に並ぶ

---

### Step 4: 選択状態の実装

DurationCardにグラデーション背景とラジオインジケーターを追加:

```tsx
export const DurationCard = ({ label, selected, onPress }: Props) => {
  if (selected) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.cardSelected}
        >
          <Text style={styles.label}>{label}</Text>
          <View style={styles.radioOuter}>
            <View style={styles.radioInner} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
```

追加スタイル:
```tsx
cardSelected: {
  borderColor: '#667eea',
  borderWidth: 2,
  borderRadius: 16,
  height: 81,
  paddingHorizontal: 26,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  // shadow（card と同じ）
},
radioOuter: {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: '#ffffff',
  justifyContent: 'center',
  alignItems: 'center',
},
radioInner: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: '#667eea',
},
```

**確認:** タップでカードの選択状態が切り替わり、選択中はグラデ背景+ラジオマークが表示される

---

### Step 5: Continueボタン

```tsx
<TouchableOpacity onPress={handleContinue} activeOpacity={0.7}>
  <LinearGradient colors={['#667eea', '#764ba2']} style={styles.continueButton}>
    <Text style={styles.continueText}>Continue</Text>
  </LinearGradient>
</TouchableOpacity>
```

スタイル:
```tsx
continueButton: {
  height: 56,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 15,
  elevation: 5,
},
continueText: {
  color: '#ffffff',
  fontSize: 18,
  fontWeight: '600',
  letterSpacing: -0.44,
  lineHeight: 28,
},
```

**確認:** Figmaと見比べて違和感なし

---

## 8. よくある失敗と対処

### LinearGradient に borderColor を設定しても見えない

**こうなる**: 選択中カードのグラデーションボーダーが表示されない

**原因**: LinearGradient 自体が背景を塗りつぶすため、borderColor がグラデの下に隠れる

**直し方**:
```tsx
// ❌ borderColor は見えない
<LinearGradient colors={['#667eea', '#764ba2']} style={{ borderColor: '#667eea', borderWidth: 2 }}>

// ✅ LinearGradient自体がborderの代わりになる。borderColorは同色でも見た目OK
<LinearGradient colors={['#667eea', '#764ba2']} style={{ borderColor: '#667eea', borderWidth: 2, borderRadius: 16 }}>
```

### 選択カードだけ幅が広がる

**こうなる**: 選択中のカードが他のカードより幅が広い

**原因**: Figma上ではselectedカードが少し大きいが、実装ではカードリスト幅に揃える方が自然

**直し方**: 全カード同じ `width: '100%'` で統一する

### タップ領域が小さい

**こうなる**: カードをタップしても反応しにくい

**原因**: TouchableOpacity の中身が小さい

**直し方**:
```tsx
// ❌ ダメな例：TouchableOpacityの中にマージン
<TouchableOpacity>
  <View style={{ margin: 10, height: 60 }}>

// ✅ 良い例：カード全体がタップ領域
<TouchableOpacity>
  <View style={{ height: 82 }}>
```

---

## 9. 実装後チェック

- [ ] Figmaと見比べて違和感なし
- [ ] 3つの期間カードが表示される
- [ ] タップで選択状態が切り替わる（1つだけ選択）
- [ ] 選択中カードにグラデーション背景 + ラジオマークが表示される
- [ ] Continueボタンがグラデーション背景で表示される
- [ ] タップ領域は44pt以上
- [ ] ChoosePlanScreen と同じグラデーション背景パターンに統一されている
- [ ] iOS / Android 両方で確認

---

## Figma Node ID 参照

| 要素 | Node ID |
|:----|:--------|
| 画面全体 | 10:32 |
| コンテナ | 10:33 |
| ヘッダー | 10:34 |
| アイコン円 | 10:35 |
| タイトル | 10:42 |
| サブタイトル | 10:44 |
| カードリスト | 10:46 |
| Card: 8 Weeks | 10:47 |
| Card: 12 Weeks (selected) | 10:50 |
| Card: 16 Weeks | 10:56 |
| Continueボタン | 10:59 |
