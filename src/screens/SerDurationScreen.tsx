import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DurationCard } from '../components/DurationCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';

const DURATIONS = [
  { id: '8weeks', label: '8 Weeks' },
  { id: '12weeks', label: '12 Weeks' },
  { id: '16weeks', label: '16 Weeks' },
] as const;

export function SetDurationScreen() {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState<string>('12weeks');

  const handleContinue = () => {

  }

  return (
    <LinearGradient colors={['#0a0a0a', '#141414', '#1a1a1a']} style={styles.container} >
      {/* 戻るボタン */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </Pressable>

      {/* ヘッダー */}
      <ScreenHeader title="Set Duration" subtitle="How long is your journey?" />
      
      {/* カードリスト */}
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

      {/* Continueボタン */}
      <Pressable onPress={handleContinue}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
        </LinearGradient>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#ffffff',
    fontSize: 18,
  },
  cardList: {
    gap: 13,
  },
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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 40,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.44,
    lineHeight: 28,
    },
});