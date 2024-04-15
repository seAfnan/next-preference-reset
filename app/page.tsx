"use client";
import { Box, Container, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";

type Item = {
  text: string;
  selected: boolean;
};
const SHIRK = "Shirk";

export default function Home() {
  const [items, setItems] = useState<Item[]>([
    { text: "Shahada", selected: false },
    { text: "Salah", selected: false },
    { text: "Fasting", selected: false },
    { text: "Zakah", selected: false },
    { text: "Hajj", selected: false },
    { text: SHIRK, selected: false },
  ]);
  const [shirkSelected, setShirkSelected] = useState(false);
  const [vibrateItem, setVibrateItem] = useState(false);

  const handleClick = (item: Item) => {
    // If "Shirk" is selected and the clicked item is not "Shirk", return early
    if (shirkSelected && item.text !== SHIRK) {
      setVibrateItem(true);
      setTimeout(() => {
        setVibrateItem(false);
      }, 500);
      return;
    }

    // Initialize newShirkSelected with the current state of shirkSelected
    let newShirkSelected = shirkSelected;

    // Calculate the new state of items
    const newItems = items.map((i) => {
      // If the clicked item is "Shirk", calculate the new state of shirkSelected
      if (item.text === SHIRK) {
        newShirkSelected = !item.selected;
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

    // Update the state of shirkSelected and items with the new state
    setShirkSelected(newShirkSelected);
    setItems(newItems);
  };

  useEffect(() => {
    // If "Shirk" is selected, update the state of items
    if (shirkSelected) {
      setItems((prev) =>
        prev.map((i) => {
          // If the current item is not "Shirk", set its selected state to false
          if (i.text !== SHIRK) {
            return { ...i, selected: false };
          }

          // If the current item is "Shirk", return it unchanged
          return i;
        })
      );
    }
  }, [shirkSelected]); // Run this effect when shirkSelected changes

  return (
    <Box mt="12vh">
      <Heading size="8">
        {shirkSelected ? "Don't destroy your deeds" : "Be a good Muslim"}
      </Heading>
      <Container mt="9vh" size="2">
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
                      item.text == SHIRK ? "red" : "green"
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
