import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

type PlanCardProps = {
    emoji: string;
    title: string;
    description: string;
    gradientColors: [string, string];
    onPress: () => void;
}

export function PlanCard({ emoji, title, description, gradientColors, onPress}: PlanCardProps) {
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
    )
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