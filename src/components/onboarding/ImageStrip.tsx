import { View, Image } from "react-native";
import { MARQUEE_IMAGES } from "./constants";

export default function ImageStrip() {
  return (
    <View className="flex-row gap-3">
      {MARQUEE_IMAGES.map((source, i) => (
        <View key={i} className="relative">
          <Image
            source={source}
            className="w-[110px] h-[110px] border-4 border-white"
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "black",
              opacity: 0.4,
            }}
          />
        </View>
      ))}
    </View>
  );
}
