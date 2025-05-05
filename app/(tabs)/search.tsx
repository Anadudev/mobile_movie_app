import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchQuery) {
        refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      {/* Move SearchBar outside of FlatList */}
      <View className="w-full flex-row items-center justify-center mt-20">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>
      <View className="my-5">
        <SearchBar
          value={searchQuery}
          onChangeText={(query: string) => setSearchQuery(query)}
          placeholder="Search Movies"
        />
      </View>
      {moviesLoading && (
        <ActivityIndicator
          size={"large"}
          color={"#0000ff"}
          className="mt-10 self-center"
        />
      )}
      {moviesError && (
        <Text className="text-red-500 px-50 my-3">
          Error: {moviesError?.message}
        </Text>
      )}
      {!moviesLoading &&
        !moviesError &&
        searchQuery.trim() &&
        movies &&
        movies[0] && (
          <Text className="text-xl text-white font-bold">
            Search term for <Text className="text-accent">{searchQuery}</Text>
          </Text>
        )}
      <FlatList
        data={movies}
        renderItem={({ item }: { item: Movie }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="flex-1 items-center justify-center mt-10 px-5">
              <Text className="text-gray-500 font-bold">
                {searchQuery.trim() ? "No results found" : "Search movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
