import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import "./GenreSearch.css";
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

const numbers: string[] = [];

for (let i = 2024; i > 1800; i--) {
  numbers.push(i.toString());
}

export function YearSerch({
  onYearSelect,
  selectedYears,
}: {
  onYearSelect: (years: string[]) => void;
  selectedYears: string[];
}) {
  const [arrow, setArrow] = useState(false);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption(), setArrow(false);
    },
    onDropdownOpen: () => {
      combobox.updateSelectedOptionIndex("active"), setArrow(true);
    },
  });

  const [value, setValue] = useState(selectedYears);

  useEffect(() => {
    if (value !== selectedYears) {
      onYearSelect(value);
    }
  }, [value, onYearSelect, selectedYears]);

  const handleValueSelect = useCallback((val: string) => {
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  }, []);

  const handleValueRemove = useCallback(
    (val: string) => setValue((current) => current.filter((v) => v !== val)),
    []
  );

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

  const options = numbers.map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        {value.includes(item) ? <CheckIcon size={12} /> : null}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

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
          label="Release year"
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
              <Input.Placeholder>Select release year</Input.Placeholder>
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
