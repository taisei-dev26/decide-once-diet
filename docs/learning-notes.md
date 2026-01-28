# 学習メモ

## スタイリング

- React Native 標準の `StyleSheet.create` を使用
- CSS-in-JS ライブラリ（styled-components 等）は不使用
- 色は `src/constants/theme.ts` で一元管理

## expo-linear-gradient

- Expo が提供するグラデーション描画用ライブラリ
- React Native には CSS の `linear-gradient` 相当の機能がないため、これで代替する
- `View` の代わりに `LinearGradient` をコンテナとして使い、`colors` に色の配列を渡す

```tsx
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#FF6B6B', '#FF8E53']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.card}
>
  <Text>グラデーション背景のカード</Text>
</LinearGradient>
```

## TouchableOpacity

- React Native が提供するタッチ可能なコンポーネント
- 押すと不透明度（opacity）が下がって半透明になるフィードバックを返す
- `View` と同じようにコンテナとして使えるが、`onPress` でタップイベントを受け取れる

```tsx
<TouchableOpacity onPress={() => console.log('タップされた')}>
  <Text>タップしてね</Text>
</TouchableOpacity>
```
