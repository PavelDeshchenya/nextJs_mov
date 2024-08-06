import { IMovieCard } from "@/types/types";

export default async function VideoComponent({ movie }: { movie: IMovieCard }) {
  async function getVideoSrc() {
    const trailerIndex = movie.videos.results.findIndex(
      (item) => item["type"] == "Trailer"
    );
    if (trailerIndex === -1) {
      throw new Error("Trailer not found");
    }
    const videoKey = movie.videos.results[trailerIndex]["key"];
    const url = `https://www.youtube.com/embed/${videoKey}`;
    return url;
  }

  let src;
  try {
    src = await getVideoSrc();
  } catch (error) {
    console.error(error);
    src = "";
  }

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
