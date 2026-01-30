import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PlanCard } from '../components/PlanCard';
import { planGradients } from '../constants/theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  const handleSelectPlan = (planId: string) => {
    // プラン選択時の処理をここに実装
    navigation.navigate('SetDuration')
  }

  return (
    <LinearGradient colors={['#0a0a0a', '#141414', '#1a1a1a']} style={styles.container}>
      {/* ヘッダー */}
      <ScreenHeader title="Choose Your Plan" subtitle="Select the nutrition approach that fits your you" />

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
    gap: 40,
  },
  cardList: {
    width: '100%',
    gap: 16,
  },
});
