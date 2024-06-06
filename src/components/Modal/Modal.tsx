import { useDisclosure } from "@mantine/hooks";
import { MantineProvider, Modal, createTheme, px, rem } from "@mantine/core";
import styles from "./Modal.module.css";
import "./Modal.css";
import { useEffect, useState } from "react";
import { Rating } from "@mantine/core";
import ModalButton from "../Button/ButtonToModal/ModalButton";
import StarSvg from "./StarSvg";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCard, deleteFavoriteCard } from "@/store/favoritesSlice";

import { setDisplayRate } from "@/store/displayRateSlice";

export default function Demo({ title, card }) {
  const [opened, { open, close }] = useDisclosure(false);
  const rates = useSelector((state) => state.displayRate.rates);
  const dispatch = useDispatch();
  const displayedValue = rates[card.id] || null;
  const [value, setValue] = useState(displayedValue);

  useEffect(() => {
    setValue(displayedValue);
    console.log("Сработал useEffect");
  }, [displayedValue]);

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

  function handleClickSaveButton() {
    close();
    dispatch(addFavoriteCard(card));
    dispatch(setDisplayRate({ cardId: card.id, rate: value }));
  }

  function handleClickRemoveButton() {
    dispatch(setDisplayRate({ cardId: card.id, rate: null }));
    setValue(null);
    dispatch(deleteFavoriteCard(card));
    close();
  }

  return (
    <>
      <MantineProvider theme={theme}>
        <Modal opened={opened} onClose={close} title="Your rating" centered>
          <h1 className="header_title">{title}</h1>

          <Rating value={value} onChange={setValue} count={10} size="lg" />
          <ModalButton handleclick={handleClickSaveButton}>Save</ModalButton>
          <ModalButton handleclick={handleClickRemoveButton}>
            Remove Rating
          </ModalButton>
        </Modal>
      </MantineProvider>

      <div onClick={open} className={styles.RateContent}>
        <StarSvg starValue={displayedValue} />
        <div>{displayedValue}</div>
      </div>
    </>
  );
}
