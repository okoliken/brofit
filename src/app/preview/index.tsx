import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";

const colorSwatches = [
  // Primary
  { name: "Primary 500", color: "bg-primary-500" },
  { name: "Primary 400", color: "bg-primary-400" },
  { name: "Primary 300", color: "bg-primary-300" },
  { name: "Primary 200", color: "bg-primary-200" },
  // Card colors
  { name: "Card Pink", color: "bg-card-pink" },
  { name: "Card Mint", color: "bg-card-mint" },
  { name: "Card Lime", color: "bg-card-lime" },
  { name: "Card Cream", color: "bg-card-cream" },
  // Blacks (1)
  { name: "Black-1 900", color: "bg-black-1-900" },
  { name: "Black-1 800", color: "bg-black-1-800" },
  { name: "Black-1 700", color: "bg-black-1-700" },
  { name: "Black-1 600", color: "bg-black-1-600" },
  // Blacks (2)
  { name: "Black-2 900", color: "bg-black-2-900" },
  { name: "Black-2 800", color: "bg-black-2-800" },
  { name: "Black-2 700", color: "bg-black-2-700" },
  { name: "Black-2 500", color: "bg-black-2-500" },
  // Optional Pink
  { name: "Pink 500", color: "bg-optional-pink-500" },
  { name: "Pink 300", color: "bg-optional-pink-300" },
  { name: "Pink 200", color: "bg-optional-pink-200" },
  { name: "Pink 100", color: "bg-optional-pink-100" },
  // Optional Lime
  { name: "Lime 500", color: "bg-optional-lime-500" },
  { name: "Lime 400", color: "bg-optional-lime-400" },
  { name: "Lime 300", color: "bg-optional-lime-300" },
  { name: "Lime 200", color: "bg-optional-lime-200" },
  // Optional Teal
  { name: "Teal 500", color: "bg-optional-teal-500" },
  { name: "Teal 400", color: "bg-optional-teal-400" },
  { name: "Teal 300", color: "bg-optional-teal-300" },
  { name: "Teal 200", color: "bg-optional-teal-200" },
  // Support
  { name: "Danger 600", color: "bg-support-danger-600" },
  { name: "Danger 500", color: "bg-support-danger-500" },
  { name: "Warning", color: "bg-support-warning-500" },
  { name: "Success", color: "bg-support-success-500" },
];

export default function PreviewScreen() {
  return (
    <View className="flex-1 bg-black-1-900">
      <StatusBar style="light" />
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <Text className="text-4xl font-bebas text-white mb-2 mt-8">
          Component Preview
        </Text>
        <Text className="text-lg text-white/70 mb-6 font-sans">
          Theme colors showcase
        </Text>

        {/* Grid */}
        <View className="flex-row flex-wrap justify-between">
          {colorSwatches.map((swatch, index) => (
            <View
              key={index}
              className="w-[48%] mb-4 rounded-lg overflow-hidden"
              style={{ aspectRatio: 1.5 }}
            >
              <View className={`flex-1 ${swatch.color} items-center justify-center`}>
                <Text
                  className={`text-sm font-sans font-semibold ${
                    index < 4 || (index >= 8 && index < 12)
                      ? "text-white"
                      : "text-black-1-900"
                  }`}
                >
                  {swatch.name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
