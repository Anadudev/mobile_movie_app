import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

export const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-tart justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "NA"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovieDetails(id as string));
  // console.log(id, movie, movieLoading, movieError);

  return (
    <View className="bg-primary flex-1">
      {movieLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#0000ff"}
          className="mt-10 self-center"
        />
      ) : movieError ? (
        <Text className="text-white text-center mt-10">
          {movieError.message || "Something went wrong"}
        </Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View className="flex-row items-center justify-between px-5">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>
          <View className="flex-col items-start justify-center">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center justify-between w-1/2">
              <Text className="text-light-200 text-sm">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
            </View>
            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold text-sm">
                {Math.round(movie?.vote_average) ?? 0}
              </Text>
              <Text className="text-light-200 text-sm">
                ({movie?.vote_count} votes)
              </Text>
            </View>
            <MovieInfo label={"Overview"} value={movie?.overview} />
            <MovieInfo
              label={"Genres"}
              value={movie?.genres.map((g: any) => g.name).join(", ") || "NA"}
            />
            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label={"Budget"}
                value={`$${movie?.budget?.toLocaleString()}`}
              />
              {/* <MovieInfo
            label={"Budget"}
            value={`$${movie?.budget/1_000_000} Million`}
          /> */}
              <MovieInfo
                label={"Revenue"}
                value={`$${Math.round(movie?.revenue).toLocaleString()}`}
              />
              {/* <MovieInfo
            label={"Revenue"}
            value={`$${Math.round(movie?.revenue/1_000_000)} Million`}
          /> */}
            </View>
            <MovieInfo
              label={"Production Companies"}
              value={
                movie?.production_companies
                  .map((c: any) => c.name)
                  .join(", ") || "NA"
              }
            />
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => history.back()}
        className="absolute bottom-5 left-0 right-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-5.0 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
