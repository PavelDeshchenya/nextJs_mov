import "./GenreSearch.css";
import { IGenreSearch } from "@/types/types";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  CheckIcon,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  useCombobox,
  ScrollArea,
} from "@mantine/core";

const MAX_DISPLAYED_VALUES = 2;

export function GenreSearch({
  genres,
  onGenreSelect,
  selectedGenres,
}: IGenreSearch) {
  const [value, setValue] = useState(selectedGenres);
  const [arrow, setArrow] = useState(false);

  const handleValueSelect = useCallback((val: string) => {
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  }, []);

  const handleValueRemove = useCallback((val: string) => {
    setValue((current) => current.filter((v) => v !== val));
  }, []);

  useEffect(() => {
    if (value !== selectedGenres) {
      onGenreSelect(value);
    }
  }, [value, onGenreSelect, selectedGenres]);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption(), setArrow(false);
    },
    onDropdownOpen: () => {
      combobox.updateSelectedOptionIndex("active"), setArrow(true);
    },
  });

  const values = value
    .slice(
      0,
      MAX_DISPLAYED_VALUES === value.length
        ? MAX_DISPLAYED_VALUES
        : MAX_DISPLAYED_VALUES - 1
    )
    .map((item) => (
      <Pill
        key={item}
        withRemoveButton
        onRemove={() => handleValueRemove(item)}
      >
        {item}
      </Pill>
    ));

  console.log("genres", genres, Array.isArray(genres));

  const options = Array.isArray(genres) ? (
    genres.map((item) => (
      <Combobox.Option
        value={item.name}
        key={item.id}
        active={value.includes(item.name)}
      >
        <Group gap="sm">
          {value.includes(item.name) ? <CheckIcon size={12} /> : null}
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    ))
  ) : (
    <div>No genres available</div>
  );

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          pointer
          onClick={() => combobox.toggleDropdown()}
          label="Genres"
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}

                {value.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder>Select genre</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>

          <Image
            src={arrow === false ? "Down.svg" : "UpArrow.svg"}
            alt="arrDown"
            width={14}
            height={6}
          />
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <ScrollArea h={200} scrollbarSize={6}>
          <Combobox.Options>{options}</Combobox.Options>
        </ScrollArea>
      </Combobox.Dropdown>
    </Combobox>
  );
}
