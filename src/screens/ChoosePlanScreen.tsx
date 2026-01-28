import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PlanCard } from '../components/PlanCard';
import { planGradients } from '../constants/theme';

const PLANS = [
  {
    id: 'ketogenic',
    emoji: '🥑',
    title: 'Ketogenic',
    description: 'Low carb, high fat',
    gradient: planGradients.ketogenic,
  },
  {
    id: 'lowFat',
    emoji: '🐟',
    title: 'Low Fat',
    description: 'Low fat, high protein',
    gradient: planGradients.lowFat,
  },
  {
    id: 'balanced',
    emoji: '🥗',
    title: 'Balanced',
    description: 'Well-rounded nutrition',
    gradient: planGradients.balanced,
  },
] as const;

export function ChoosePlanScreen() {
  const handleSelectPlan = (planId: string) => {
    // プラン選択時の処理をここに実装
  }

  return (
    <LinearGradient colors={['#0a0a0a', '#141414', '#1a1a1a']} style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.headerIcon}>
          {/* TODO: アイコン */}
        </LinearGradient>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Select the nutrition approach that fits your you</Text>
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
  },
  cardList: {
    width: '100%',
    gap: 16,
  },
});
