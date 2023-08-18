// should be removed
export const sendMsg = (msg) => {
  fetch(`https://api.telegram.org/bot5933951945:AAGVK6UU0GhoLrnGDPzQ22V681pYr4j-N5E/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "1780780393",
        text: msg,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Message sent successfully", data);
      })
      .catch(error => {
        console.error("Error sending message", error);
      });
}