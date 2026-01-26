# Choose Your Plan 画面 実装ガイド

## 完成イメージ

```
[Screen - ダークグラデーション背景]
  [Header]
    [Icon] フォークアイコン（紫グラデーション円形）
    [Title] "Choose Your Plan"
    [Subtitle] "Select the nutrition approach that fits you"

  [CardList]
    [Card] 🥑 Ketogenic / Low carb, high fat
    [Card] 🐟 Low Fat / Low fat, high protein
    [Card] 🥗 Balanced / Well-rounded nutrition
```

---

## 1. ファイル構成

```
src/
├── screens/
│   └── ChoosePlanScreen.tsx      ← メイン画面（最初に作る）
├── components/
│   └── PlanCard.tsx              ← カードコンポーネント
└── constants/
    └── theme.ts                  ← 色・スタイル定義
```

**作成順序**: `theme.ts` → `PlanCard.tsx` → `ChoosePlanScreen.tsx`

---

## 2. コンポーネントのProps

### PlanCard

```tsx
type PlanCardProps = {
  emoji: string;           // "🥑" | "🐟" | "🥗"
  title: string;           // "Ketogenic"
  description: string;     // "Low carb, high fat"
  gradientColors: [string, string];  // アイコン背景のグラデーション
  onPress: () => void;
  isSelected?: boolean;    // 選択状態（将来用）
};
```

---

## 3. スタイル値の一覧

### 色

| 用途 | カラーコード |
|------|-------------|
| 背景グラデーション開始 | `#0a0a0a` |
| 背景グラデーション中間 | `#141414` |
| 背景グラデーション終了 | `#1a1a1a` |
| カード背景 | `#1a1a1a` |
| カードボーダー | `#2a2a2a` |
| タイトル（白） | `#ffffff` |
| サブテキスト | `#a0a0a0` |
| ヘッダーアイコングラデ | `#667eea` → `#764ba2` |
| Ketogenicアイコン | `#f093fb` → `#f5576c` |
| Low Fatアイコン | `#4facfe` → `#00f2fe` |
| Balancedアイコン | `#a8edea` → `#fed6e3` |

### サイズ・余白

| 要素 | 値 |
|------|-----|
| 画面横パディング | `24px` |
| カード角丸 | `16px` |
| カードパディング | `25px` |
| カードボーダー幅 | `1.4px` |
| カード間の余白 | `16px` |
| アイコンサイズ | `48px` |
| アイコン角丸 | `14px` |
| アイコンとテキストの余白 | `16px` |
| ヘッダーアイコンサイズ | `64px` |
| タイトルとサブタイトルの余白 | `16px` |
| ヘッダーとカードの余白 | `40px` |

### フォント

| 要素 | サイズ | ウェイト |
|------|--------|---------|
| メインタイトル | `30px` | Bold |
| サブタイトル | `16px` | Regular |
| カードタイトル | `18px` | SemiBold (600) |
| カード説明 | `14px` | Regular |
| 絵文字 | `24px` | - |

---

## 4. Flexbox早見表

| 要素 | direction | justify | align | gap |
|------|-----------|---------|-------|-----|
| Screen全体 | column | center | center | - |
| Container | column | - | - | `40px` |
| Header | column | - | center | - |
| CardList | column | - | stretch | `16px` |
| Card内部 | row | - | center | `16px` |
| カードテキスト部 | column | - | flex-start | `4px` |

---

## 5. コード骨組み（スケルトン）

### theme.ts

```tsx
export const colors = {
  background: {
    start: '#0a0a0a',
    middle: '#141414',
    end: '#1a1a1a',
  },
  card: {
    background: '#1a1a1a',
    border: '#2a2a2a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0a0a0',
  },
};

export const planGradients = {
  ketogenic: ['#f093fb', '#f5576c'],
  lowFat: ['#4facfe', '#00f2fe'],
  balanced: ['#a8edea', '#fed6e3'],
} as const;
```

### PlanCard.tsx

```tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type PlanCardProps = {
  emoji: string;
  title: string;
  description: string;
  gradientColors: [string, string];
  onPress: () => void;
};

export function PlanCard({ emoji, title, description, gradientColors, onPress }: PlanCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* アイコン部分 */}
      <LinearGradient colors={gradientColors} style={styles.iconContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </LinearGradient>

      {/* テキスト部分 */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#1a1a1a',
    borderWidth: 1.4,
    borderColor: '#2a2a2a',
    borderRadius: 16,
    padding: 25,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  textContainer: {
    gap: 4,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: '#a0a0a0',
    fontSize: 14,
  },
});
```

### ChoosePlanScreen.tsx

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PlanCard } from '../components/PlanCard';
import { planGradients } from '../constants/theme';

const PLANS = [
  { id: 'ketogenic', emoji: '🥑', title: 'Ketogenic', description: 'Low carb, high fat', gradient: planGradients.ketogenic },
  { id: 'lowFat', emoji: '🐟', title: 'Low Fat', description: 'Low fat, high protein', gradient: planGradients.lowFat },
  { id: 'balanced', emoji: '🥗', title: 'Balanced', description: 'Well-rounded nutrition', gradient: planGradients.balanced },
] as const;

export function ChoosePlanScreen() {
  const handleSelectPlan = (planId: string) => {
    // TODO: プラン選択処理
    console.log('Selected:', planId);
  };

  return (
    <LinearGradient
      colors={['#0a0a0a', '#141414', '#1a1a1a']}
      style={styles.container}
    >
      {/* ヘッダー */}
      <View style={styles.header}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.headerIcon}>
          {/* TODO: フォークアイコンを配置 */}
        </LinearGradient>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Select the nutrition approach that fits you</Text>
      </View>

      {/* カードリスト */}
      <View style={styles.cardList}>
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            emoji={plan.emoji}
            title={plan.title}
            description={plan.description}
            gradientColors={plan.gradient as [string, string]}
            onPress={() => handleSelectPlan(plan.id)}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
  },
  cardList: {
    width: '100%',
    gap: 16,
  },
});
```

---

## 6. Step 0: 最初の5分でやること

### 1. Expoプロジェクト作成（まだの場合）

```bash
npx create-expo-app decide-once-diet --template blank-typescript
cd decide-once-diet
```

### 2. 必要なパッケージをインストール

```bash
npx expo install expo-linear-gradient
```

### 3. フォルダ構造を作成

```bash
mkdir -p src/screens src/components src/constants
```

### 4. 最初のファイルを作成

1. `src/constants/theme.ts` を作成
2. `src/components/PlanCard.tsx` を作成
3. `src/screens/ChoosePlanScreen.tsx` を作成
4. `App.tsx` で `ChoosePlanScreen` を表示

```tsx
// App.tsx
import { ChoosePlanScreen } from './src/screens/ChoosePlanScreen';

export default function App() {
  return <ChoosePlanScreen />;
}
```

---

## 7. よくある失敗と対処

### ❌ グラデーション背景が効かない

```tsx
// ダメ: Viewにはグラデーションが効かない
<View style={{ background: 'linear-gradient(...)' }}>
```

```tsx
// 良い: LinearGradientを使う
<LinearGradient colors={['#0a0a0a', '#1a1a1a']} style={styles.container}>
```

### ❌ カードの幅が狭い

```tsx
// ダメ: width指定なし
<View style={styles.cardList}>
```

```tsx
// 良い: width: '100%' を指定
<View style={{ width: '100%', gap: 16 }}>
```

### ❌ gap が効かない（古いReact Nativeバージョン）

```tsx
// 古い書き方: marginBottomで代用
{PLANS.map((plan, index) => (
  <PlanCard
    style={{ marginBottom: index < PLANS.length - 1 ? 16 : 0 }}
    ...
  />
))}
```

---

## 8. 確認チェックリスト

- [ ] 背景がグラデーション（上が暗く、下が少し明るい）
- [ ] カードが3枚縦に並んでいる
- [ ] 各カードにアイコン（グラデーション背景＋絵文字）がある
- [ ] タップ時にonPressが呼ばれる
- [ ] フォントサイズが正しい（タイトル30px、カード18px）
- [ ] 余白が適切（カード間16px）

---

## 参考: Figmaノード構造

- `1:2` - UI Design Guidelines（全体）
- `1:3` - Container（メインコンテナ）
- `1:4` - Header部分
- `1:14` - カードリスト
- `1:15`, `1:25`, `1:35` - 各カード
