import { Breadcrumbs, Anchor } from "@mantine/core";
import Link from "next/link";

export default function BreadCrumbs({
  movieTitle,
  movieId,
}: {
  movieTitle: string;
  movieId: number;
}) {
  const items = [
    { title: "Movies", href: "/Movies" },
    { title: movieTitle, href: "#" },
  ].map((item) => (
    <Link href={item.href} key={movieId}>
      {item.title}
    </Link>
  ));
  return <Breadcrumbs>{items}</Breadcrumbs>;
}
