# Choose Your Plan 画面 実装ガイド

> Figma: https://www.figma.com/design/XcXG7TrpLCgsAP3l9bsI9B/無題?node-id=1-2
> 生成日: 2026-01-26
> 対象フレームワーク: React Native

---

## 1. 全体像

### この画面の役割
ユーザーがダイエット方法（Ketogenic, Low Fat, Balanced）を選択するオンボーディング画面。

### 完成イメージ（構造）

```
[Screen] ダークグラデーション背景
  [Header]
    - アイコン（紫グラデーション円 + フォークアイコン）
    - タイトル "Choose Your Plan"
    - サブテキスト "Select the nutrition approach..."

  [Cards]
    [DietCard] 🥑 Ketogenic / Low carb, high fat
    [DietCard] 🐟 Low Fat / Low fat, high protein
    [DietCard] 🥗 Balanced / Well-rounded nutrition
```

---

## 2. ファイル構成（最初に作るもの）

```
src/
├── screens/
│   └── ChoosePlanScreen/
│       └── index.tsx           ← 画面本体
├── components/
│   └── DietCard.tsx            ← 選択カード（3つ共通）
└── theme/
    └── colors.ts               ← 色定義
```

### 最初に作るファイル順

1. `src/theme/colors.ts` - 色を先に定義
2. `src/components/DietCard.tsx` - カード共通コンポーネント
3. `src/screens/ChoosePlanScreen/index.tsx` - 画面本体

---

## 3. コンポーネント設計

### 分割一覧

| コンポーネント名 | 責務 | 再利用性 |
|:---------------|:----|:--------|
| ChoosePlanScreen | 画面全体のレイアウト | 低 |
| DietCard | ダイエット選択肢カード | 高（3回使用） |

### 各コンポーネントのProps

#### DietCard

```typescript
type DietType = 'ketogenic' | 'lowFat' | 'balanced'

type Props = {
  emoji: string           // 例: "🥑"
  title: string           // 例: "Ketogenic"
  description: string     // 例: "Low carb, high fat"
  gradientColors: [string, string]  // アイコン背景のグラデーション
  isSelected?: boolean    // 選択状態
  onPress: () => void     // タップ時のコールバック
}
```

### 依存関係

```
ChoosePlanScreen
└── DietCard (x3)
```

---

## 4. コード骨組み（スケルトン）

### 画面全体

```tsx
// src/screens/ChoosePlanScreen/index.tsx
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { DietCard } from '@/components/DietCard'

export const ChoosePlanScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <LinearGradient
      colors={['#0a0a0a', '#141414', '#1a1a1a']}
      style={styles.container}
    >
      {/* ===== セクション1: ヘッダー ===== */}
      <View style={styles.header}>
        {/* アイコン */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.iconCircle}>
          {/* フォークアイコン（SVGまたはアイコンライブラリ） */}
        </LinearGradient>

        {/* タイトル */}
        <Text style={styles.title}>Choose Your Plan</Text>

        {/* サブテキスト */}
        <Text style={styles.subtitle}>
          Select the nutrition approach that fits you
        </Text>
      </View>

      {/* ===== セクション2: カード群 ===== */}
      <View style={styles.cards}>
        <DietCard
          emoji="🥑"
          title="Ketogenic"
          description="Low carb, high fat"
          gradientColors={['#f093fb', '#f5576c']}
          isSelected={selectedPlan === 'ketogenic'}
          onPress={() => setSelectedPlan('ketogenic')}
        />
        <DietCard
          emoji="🐟"
          title="Low Fat"
          description="Low fat, high protein"
          gradientColors={['#4facfe', '#00f2fe']}
          isSelected={selectedPlan === 'lowFat'}
          onPress={() => setSelectedPlan('lowFat')}
        />
        <DietCard
          emoji="🥗"
          title="Balanced"
          description="Well-rounded nutrition"
          gradientColors={['#a8edea', '#fed6e3']}
          isSelected={selectedPlan === 'balanced'}
          onPress={() => setSelectedPlan('balanced')}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // 後で埋める
  },
  subtitle: {
    // 後で埋める
  },
  cards: {
    // 後で埋める
  },
})
```

### DietCard コンポーネント

```tsx
// src/components/DietCard.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
  emoji: string
  title: string
  description: string
  gradientColors: [string, string]
  isSelected?: boolean
  onPress: () => void
}

export const DietCard = ({
  emoji,
  title,
  description,
  gradientColors,
  isSelected,
  onPress,
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card, isSelected && styles.cardSelected]}>
        {/* アイコン部分 */}
        <LinearGradient colors={gradientColors} style={styles.iconBox}>
          <Text style={styles.emoji}>{emoji}</Text>
        </LinearGradient>

        {/* テキスト部分 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#2a2a2a',
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  cardSelected: {
    borderColor: '#667eea',  // 選択時のボーダー色
  },
  iconBox: {
    // 後で埋める
  },
  emoji: {
    // 後で埋める
  },
  textContainer: {
    // 後で埋める
  },
  title: {
    // 後で埋める
  },
  description: {
    // 後で埋める
  },
})
```

---

## 5. レイアウト詳細

### 全体構造

```
<Container>           ← flex: 1, alignItems: center, justifyContent: center
  <Header>            ← alignItems: center, gap: 16
  <Cards>             ← gap: 16, width: 345
</Container>
```

### Flexbox設定の早見表

| 要素 | direction | justify | align | gap |
|:----|:----------|:--------|:------|:----|
| 画面全体 | column | center | center | - |
| ヘッダー | column | - | center | 16 |
| カード群 | column | - | - | 16 |
| カード内部 | row | - | center | 16 |
| テキスト部分 | column | - | - | 4 |

### 各セクションの実装ヒント

#### Header
- アイコン→タイトル→サブテキストの順で縦に並べる
- 中央揃え（alignItems: center）
- アイコンとタイトルの間は約16px

#### Cards
- 3枚のカードを縦に並べる
- カード間の間隔は16px（gap: 16）
- カードの幅は約345px

---

## 6. スタイル値

### 色

| 変数名（推奨） | 値 | 使う場所 |
|:-------------|:---|:--------|
| bgGradientStart | #0a0a0a | 画面背景（上） |
| bgGradientMid | #141414 | 画面背景（中） |
| bgGradientEnd | #1a1a1a | 画面背景（下） |
| cardBackground | #1a1a1a | カード背景 |
| cardBorder | #2a2a2a | カードボーダー |
| textWhite | #ffffff | タイトル、カードタイトル |
| textGray | #a0a0a0 | サブテキスト、説明 |
| iconGradient1 | ['#667eea', '#764ba2'] | ヘッダーアイコン |
| ketogenicGradient | ['#f093fb', '#f5576c'] | Ketogenicアイコン |
| lowFatGradient | ['#4facfe', '#00f2fe'] | Low Fatアイコン |
| balancedGradient | ['#a8edea', '#fed6e3'] | Balancedアイコン |

### 数値

| 項目 | 値 |
|:----|:---|
| コンテナ幅 | 345 |
| ヘッダーアイコンサイズ | 64 |
| カード間の余白 | 16 |
| カードの padding | 25 |
| カード角丸 | 16 |
| カードボーダー幅 | 1.5 |
| カードアイコンサイズ | 48 |
| カードアイコン角丸 | 14 |
| テキスト間の余白 | 4 |

### フォント

| 要素 | fontSize | fontWeight | color | letterSpacing |
|:----|:---------|:-----------|:------|:--------------|
| タイトル | 30 | bold | #ffffff | 0.4 |
| サブテキスト | 16 | normal | #a0a0a0 | -0.3 |
| カードタイトル | 18 | 600 | #ffffff | -0.4 |
| カード説明 | 14 | normal | #a0a0a0 | -0.15 |
| 絵文字 | 24 | - | - | - |

---

## 7. 実装手順

### Step 0: 準備（最初の5分）

```bash
# ファイルを作成
mkdir -p src/screens/ChoosePlanScreen
mkdir -p src/components
mkdir -p src/theme

touch src/theme/colors.ts
touch src/components/DietCard.tsx
touch src/screens/ChoosePlanScreen/index.tsx
```

最初に書くこと:
1. `colors.ts` に色を定義
2. 画面ファイルに `LinearGradient` だけ置く
3. 背景グラデーションが表示されることを確認

### Step 1: 骨組み

1. [ ] 画面を2つのセクション（Header, Cards）に分ける
   - まだ中身は `<Text>Header</Text>` のようなプレースホルダでOK
   - 各Viewに異なる背景色を付けて境界を確認

2. [ ] セクションごとの位置を `justifyContent: 'center'` で中央に配置

### Step 2: ヘッダー実装

3. [ ] アイコン円（LinearGradient + borderRadius）を作成
4. [ ] フォークアイコンを配置（expo-vector-icons または SVG）
5. [ ] タイトルとサブテキストを追加

### Step 3: カードコンポーネント作成

6. [ ] DietCard の枠を作成（背景、ボーダー、角丸）
7. [ ] アイコン部分（LinearGradient + 絵文字）を追加
8. [ ] テキスト部分（タイトル + 説明）を追加
9. [ ] `onPress` を接続、選択状態のスタイル追加

### Step 4: 仕上げ

10. [ ] 3つのカードを配置、データを渡す
11. [ ] Figmaと見比べて余白・フォントサイズを微調整
12. [ ] タップ時のフィードバック（Pressable の opacity など）を追加

---

## 8. よくある失敗と対処

### カードの幅が画面いっぱいにならない

**こうなる**: カードが小さく、中央に寄ってしまう

**原因**: 親にwidth指定がない

**直し方**:
```tsx
// ❌ ダメな例
<View style={styles.cards}>
  <DietCard ... />
</View>

// ✅ 良い例
<View style={[styles.cards, { width: 345 }]}>
  <DietCard ... />
</View>

// または
const styles = StyleSheet.create({
  cards: {
    width: 345,  // 明示的に幅を指定
  },
})
```

### グラデーション背景が表示されない

**こうなる**: 背景が真っ白/真っ黒

**原因**: `expo-linear-gradient` がインストールされていない

**直し方**:
```bash
npx expo install expo-linear-gradient
```

### カード内のテキストが縦に並ばない

**こうなる**: タイトルと説明が横に並んでしまう

**原因**: textContainer に flexDirection 指定がない（デフォルトは row ではなく column だが、親の影響を受けることがある）

**直し方**:
```tsx
// ❌ ダメな例
<View>
  <Text>{title}</Text>
  <Text>{description}</Text>
</View>

// ✅ 良い例
<View style={{ flexDirection: 'column', gap: 4 }}>
  <Text>{title}</Text>
  <Text>{description}</Text>
</View>
```

---

## 9. 実装後チェック

- [ ] Figmaと見比べて違和感なし
- [ ] カードのタップ領域は十分大きい（48pt以上）
- [ ] 長いテキスト（例: "Mediterranean Diet Plan"）で崩れない
- [ ] 選択状態が視覚的にわかる
- [ ] iOS / Android 両方で確認
