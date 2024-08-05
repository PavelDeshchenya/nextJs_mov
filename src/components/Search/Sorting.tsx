import "./GenreSearch.css";
import { useState } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Input,
  InputBase,
  useCombobox,
} from "@mantine/core";
import Image from "next/image";

const sortingList = [
  "popularity.asc",
  "popularity.desc",
  "original_title.asc",
  "original_title.desc",
  "revenue.asc",
  "revenue.desc",
  "primary_release_date.asc",
  "primary_release_date.desc",
  "vote_average.asc",
  "vote_average.desc",
  "vote_count.asc",
  "vote_count.desc",
];

export function SortingSelect({
  handlePuttingSelecteValue,
  displayedValue,
}: {
  handlePuttingSelecteValue: (selectSortValue: string) => void;
  displayedValue: string | null;
}) {
  const [arrow, setArrow] = useState(false);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption(), setArrow(false);
    },
    onDropdownOpen: (eventSource) => {
      setArrow(true);
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });

  const [value, setValue] = useState<string | null>(displayedValue);

  const options = sortingList.map((item) => (
    <Combobox.Option value={item} key={item} active={item === value}>
      <Group gap="xs">
        {item === value && <CheckIcon size={12} />}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      resetSelectionOnOptionHover
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        handlePuttingSelecteValue(val);

        combobox.updateSelectedOptionIndex("active");
      }}
    >
      <Combobox.Target targetType="button">
        <InputBase
          label="Sort by"
          component="button"
          type="button"
          pointer
          rightSection={
            <Image
              src={arrow === false ? "Down.svg" : "UpArrow.svg"}
              alt="arrDown"
              width={14}
              height={6}
            />
          }
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
