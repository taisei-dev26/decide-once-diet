import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const DurationCard = ({ label, selected, onPress }: Props) => {
  if (selected) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.7 }}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.cardSelected}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.radioOuter}>
            <View style={styles.radioInner} />
          </View>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.7 }}>
      <View style={styles.card}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
    borderWidth: 2,
    borderRadius: 16,
    height: 82,
    paddingLeft: 26,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  cardSelected: {
    borderColor: '#667eea',
    borderWidth: 2,
    borderRadius: 16,
    height: 81,
    paddingHorizontal: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  label: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.45,
    lineHeight: 28,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#667eea',
  },
});
