import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

function notify() {
  toast.error("Please enter your search query.");
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  function handleSearch(formData: FormData) {
    const value = formData.get("query") as string;
    if (value.trim() === "") {
      notify();
      return;
    }
    onSubmit(value);
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <a
            className={styles.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form className={styles.form} action={handleSearch}>
            <input
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
