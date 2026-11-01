import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getVideoKey,
} from "../services/movieService";
import {
  setNowPlayingMovies,
  setPopularMovies,
  setVideoKey,
} from "../utils/movieSlice";

export const useMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getNowPlayingMovies().then((movies) => {
      dispatch(setNowPlayingMovies(movies));
    });
  }, [dispatch]);
};

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const popularMovies = await getPopularMovies();
      dispatch(setPopularMovies(popularMovies));
    };
    fetchPopularMovies();
  }, [dispatch]);
};

export const useVideoKey = (movieId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchVideoKey = async () => {
      const videoKey = await getVideoKey(movieId);
      dispatch(setVideoKey({ movieId, videoKey }));
    };
    fetchVideoKey();
  }, [dispatch, movieId]);
};
