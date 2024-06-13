import { Input } from "@mantine/core";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

function InputSearch({ passValue }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const queryInput = searchParams.get("query")?.toString() || "";

  useEffect(() => {
    passValue(queryInput);
  }, [queryInput, passValue]);

  return (
    <Input
      styles={{
        wrapper: { width: "280px" },
      }}
      placeholder="Input title"
      onChange={(e) => {
        handleSearch(e.target.value);
        passValue(queryInput);
      }}
      defaultValue={queryInput}
    />
  );
}

export default InputSearch;
