export const sortOrders = (array) => {
  
  return array.sort((a, b) => {
    const aCreatedTime = new Date(a.created_time);
    const bCreatedTime = new Date(b.created_time);

    if (aCreatedTime < bCreatedTime) {return 1}
    else {return -1}
  })
  
}