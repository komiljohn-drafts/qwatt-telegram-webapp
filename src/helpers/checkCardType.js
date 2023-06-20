import cardicon from "@/assets/images/card.jpg";
import humoicon from "@/assets/images/humo.svg";
import uzcardicon from "@/assets/images/Frame.svg";

export const checkCardType = (cardNumber) => {
  let name = "";
  let icon = cardicon;

  if (cardNumber?.slice(0, 4) === "9860") {
    name = "humo";
    icon = humoicon;
  } else if (
    cardNumber?.slice(0, 4) === "8600" ||
    cardNumber?.slice(0, 4) === "6262" ||
    cardNumber?.slice(0, 4) === "5440" ||
    cardNumber?.slice(0, 4) === "5614"
  ) {
    name = "uzcard";
    icon = uzcardicon;
  }

  return { name, icon };
};
