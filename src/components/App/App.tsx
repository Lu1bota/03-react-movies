import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { Movie } from "../../types/movie";
import movieServices from "../services/movieServices";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  function openModal(movie: Movie) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  async function fetchData(value: string) {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const data = await movieServices(value);
      if (!data.results.length) {
        toast.error("No movies found for your request.");
      }

      setMovies(data.results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <SearchBar onSubmit={fetchData} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid onSelect={openModal} movies={movies} />
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
      <Toaster />
    </>
  );
}
