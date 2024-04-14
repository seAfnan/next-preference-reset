"use client";
import { Box, Container, Grid, Section } from "@radix-ui/themes";
import { useEffect, useState } from "react";

type Item = {
  text: string;
  selected: boolean;
};
const EGO = "Ego";

export default function Home() {
  const [items, setItems] = useState<Item[]>([
    { text: "Happiness", selected: false },
    { text: "Optimism", selected: false },
    { text: "Kindness", selected: false },
    { text: "Giving", selected: false },
    { text: "Respect", selected: false },
    { text: EGO, selected: false },
  ]);
  const [egoSelected, setEgoSelected] = useState(false);
  const [vibrateItem, setVibrateItem] = useState(false);

  const handleClick = (item: Item) => {
    // If "Ego" is selected and the clicked item is not "Ego", return early
    if (egoSelected && item.text !== EGO) {
      setVibrateItem(true);
      setTimeout(() => {
        setVibrateItem(false);
      }, 500);
      return;
    }

    // Initialize newEgoSelected with the current state of egoSelected
    let newEgoSelected = egoSelected;

    // Calculate the new state of items
    const newItems = items.map((i) => {
      // If the clicked item is "Ego", calculate the new state of egoSelected
      if (item.text === EGO) {
        newEgoSelected = !item.selected;
      }

      // If the current item is not the clicked item, return it unchanged
      if (item.text !== i.text) {
        return i;
      }

      // If the current item is the clicked item, toggle its selected state
      return {
        ...i,
        selected: !i.selected,
      };
    });

    // Update the state of egoSelected and items with the new state
    setEgoSelected(newEgoSelected);
    setItems(newItems);
  };

  useEffect(() => {
    // If "Ego" is selected, update the state of items
    if (egoSelected) {
      setItems((prev) =>
        prev.map((i) => {
          // If the current item is not "Ego", set its selected state to false
          if (i.text !== EGO) {
            return { ...i, selected: false };
          }

          // If the current item is "Ego", return it unchanged
          return i;
        })
      );
    }
  }, [egoSelected]); // Run this effect when egoSelected changes

  return (
    <Box mt="22vh">
      <Container size="2">
        <ul className="grid">
          {items.map((item) => {
            return (
              <li
                onClick={() => handleClick(item)}
                key={item.text}
                className={`grid-item ${vibrateItem ? "shake-lr" : ""}`}
              >
                {item.selected ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 check-${
                      item.text == EGO ? "red" : "green"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="circle"></div>
                )}
                <div className="text">{item.text}</div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Box>
  );
}
