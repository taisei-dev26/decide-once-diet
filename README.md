## ディレクトリ構成

```
root/
├── src/
│   ├── assets/        # アイコンなど画像系
│   ├── atoms/         # ZustandやJotaiなど状態管理系
│   ├── components/    # 画面内部品
│   ├── constants/     # 定数
│   ├── dao/           # データアクセス関連
│   ├── hooks/         # Hooks関連
│   ├── localize/      # 多言語対応関連
│   ├── mocks/         # テストやデバッグに使うモックデータ
│   ├── navigation/    # 画面遷移関連（expo-routerはv1の頃から様子見）
│   ├── purchases/     # 課金関連
│   ├── screens/       # 画面
│   ├── types/         # 型など
│   └── utils/         # その他横断的に利用する処理など
├── package.json
└── app.json
```
