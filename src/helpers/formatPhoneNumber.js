export const formatPhoneNumber = (num) => {
  if (num?.length == 13){
    return (
      num.slice(0, 4) +
      " " +
      num.slice(4, 6) +
      " " +
      num.slice(6, 9) +
      " " +
      num.slice(9, 11) +
      " " +
      num.slice(11, 13)
    )
  } else if(num?.length && num?.length < 13){
    return num;
  } else return "";
};
