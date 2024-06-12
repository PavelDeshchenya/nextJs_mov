import { Breadcrumbs, Anchor } from "@mantine/core";
export default function BreadCrumbs({ movieTitle, movieId }) {
  const items = [
    { title: "Movies", href: "/Movies" },
    { title: movieTitle, href: "#" },
  ].map((item) => (
    <Anchor href={item.href} key={movieId}>
      {item.title}
    </Anchor>
  ));
  return <Breadcrumbs>{items}</Breadcrumbs>;
}
