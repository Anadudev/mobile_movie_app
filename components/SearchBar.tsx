import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-500 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className="flex- ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
