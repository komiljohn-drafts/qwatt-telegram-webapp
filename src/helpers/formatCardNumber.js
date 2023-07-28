export const formatCardNumber = (cardNumber) => {
  if (typeof cardNumber == "string" ) {
    return cardNumber.slice(0, 4) +" "+
      cardNumber.slice(4, 8) +" "+
      cardNumber.slice(8, 12) +" "+
      cardNumber.slice(12, 16)
  }
}