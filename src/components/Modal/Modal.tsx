import { useDisclosure } from "@mantine/hooks";
import { MantineProvider, Modal, createTheme, px, rem } from "@mantine/core";
import styles from "./Modal.module.css";
import "./Modal.css";
import { useState } from "react";
import { Rating } from "@mantine/core";
import ModalButton from "../Button/ButtonToModal/ModalButton";
import StarSvg from "./StarSvg";
import { useDispatch } from "react-redux";
import { addFavoriteCard } from "@/store/favoritesSlice";

export default function Demo({ title, card }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(0 || null);
  const [displayedValue, displayedValueSet] = useState(null);
  const dispatch = useDispatch();

  const theme = createTheme({
    components: {
      Modal: Modal.extend({
        classNames: {
          root: styles.root,
          content: styles.content,
        },
      }),
    },
  });

  function displayRateValue() {
    close();
    displayedValueSet(value);
    dispatch(addFavoriteCard(card));
  }

  function deleteRate() {
    displayedValueSet(null);
    setValue(null);
    close();
  }

  return (
    <>
      <MantineProvider theme={theme}>
        <Modal opened={opened} onClose={close} title="Modal" centered>
          <h1>Your rating</h1>
          <p>{title}</p>
          <Rating
            value={value}
            onChange={setValue}
            count={10}
            color="#9854F6"
          />
          <ModalButton handleclick={displayRateValue}>Save</ModalButton>
          <ModalButton handleclick={deleteRate}>Remove Rating</ModalButton>
        </Modal>
      </MantineProvider>

      <div onClick={open} className={styles.RateContent}>
        <StarSvg starValue={displayedValue} />
        <div>{displayedValue}</div>
      </div>
    </>
  );
}
