import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function ChoosePlanScreen() {
    return (
        <LinearGradient
            colors={['#0a0a0a', '#141414', '#1a1a1a']}
            style={styles.container}
        >
            {/* ヘッダー */}
            <View style={styles.header}>
                <LinearGradient colors={['#667eea', '#764ba2']} style={styles.headerIcon}>
                    {/* TODO: アイコン */}
                </LinearGradient>
                <Text style={styles.title}>Choose Your Plan</Text>
                <Text style={styles.subtitle}>Select the nutrition approach that fits your you</Text>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
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
        marginBottom: 16,
    },
    subtitle: {
        color: '#a0a0a0',
        fontSize: 16,
        textAlign: 'center',
    }
})