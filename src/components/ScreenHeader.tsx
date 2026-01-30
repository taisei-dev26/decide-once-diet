import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
};

export function ScreenHeader ({ title, subtitle }: ScreenHeaderProps)  {
    return (
        <View style={styles.header}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.headerIcon}>
            {/* TODO: アイコン */}
            </LinearGradient>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
        marginBottom: 16,
    },
    subtitle: {
        color: '#a0a0a0',
        fontSize: 16,
        textAlign: 'center',
    },
})