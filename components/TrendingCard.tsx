import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie?.movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-4">
        <Image
          source={{
            uri: movie?.poster_url,
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-6xl text-white font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="text-sm font-bold text-light-200 mt-2"
          numberOfLines={2}
        >
          {movie?.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
