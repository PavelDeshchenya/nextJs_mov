import { useState } from "react";
import { Rating } from "@mantine/core";

export default function RateCustom() {
  const [value, setValue] = useState(0);
  return (
    <Rating value={value} onChange={setValue} count={10} color="#9854F6" />
  );
}
