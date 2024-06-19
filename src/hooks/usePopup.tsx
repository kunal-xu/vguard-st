import { useState } from "react";

export default function usePopup() {
  const [popUp, setPopUp] = useState(false);
  const [popUpButtonCount, setPopUpButtonCount] = useState(1);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popupText, setPopupText] = useState("");
  const [popUpIconType, setPopUpIconType] = useState("");
  const [popUpButton2Text, setPopupButton2Text] = useState("");
  function cleanupPopUp() {
    setPopUp(false);
    setPopUpButtonCount(1);
    setPopUpTitle("");
    setPopupText("");
    setPopUpIconType("");
    setPopupButton2Text("");
  }

  return {
    popUp,
    setPopUp,
    popUpButtonCount,
    setPopUpButtonCount,
    popUpTitle,
    setPopUpTitle,
    popupText,
    setPopupText,
    popUpIconType,
    setPopUpIconType,
    popUpButton2Text,
    setPopupButton2Text,
    cleanupPopUp,
  };
}
