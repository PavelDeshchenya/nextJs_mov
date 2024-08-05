import { IMovieCard } from "@/types/types";

export default async function VideoComponent({ movie }: { movie: IMovieCard }) {
  async function getVideoSrc() {
    const trailerIndex = movie.videos.results.findIndex(
      (item) => item["type"] == "Trailer"
    );
    const videoKey = movie.videos.results[trailerIndex]["key"];
    const url = `https://www.youtube.com/embed/${videoKey}`;
    return url;
  }

  const src = await getVideoSrc();

  return (
    <iframe
      width="500"
      height="281"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
