import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

const DURATIONS = [
    {id: '8weeks', label: '8 Weeks'},
    {id: '12weeks', label: '12 Weeks'},
    {id: '16weeks', label: '16 Weeks'},
]

export function setDurationScreen() {
    return (
        <LinearGradient colors={['#0a0a0a', '#141414', '#1a1a1a']}>
            {/* ヘッダー */}
            <View>
                {/* アイコン + タイトル + サブタイトル */}
            </View>

            {/* カードリスト */}
            <View>

            </View>

            {/* Continueボタン */}
        </LinearGradient>
    )
}