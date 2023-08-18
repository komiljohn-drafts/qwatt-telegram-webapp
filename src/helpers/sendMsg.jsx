// should be removed
export const sendMsg = (msg) => {
  fetch(
    `https://api.telegram.org/bot5933951945:AAGVK6UU0GhoLrnGDPzQ22V681pYr4j-N5E/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "1780780393",
        text: msg,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent successfully", data);
    })
    .catch((error) => {
      console.error("Error sending message", error);
    });
};

const msg = {
  active: null,
  birth_date: "2003-03-15 00:00:00.000",
  block: false,
  bonus: 100000,
  client_platform_id: null,
  client_type_id: "457150ce-26ec-4b79-aaa2-7731401cd80c",
  created_time: "2023-07-27T04:45:13.244Z",
  customer_id: "975",
  dynamic_link: "https://qwatt.page.link/vmAia5RM2RCJzQhb9",
  email: "",
  email_after_deletion: "",
  fcm_token: "",
  gender: ["1"],
  getSignal: false,
  guid: "89e15006-173d-42fd-935b-324b361caca8",
  is_deleted: false,
  last_with_link: "",
  name: "Nurdaulet",
  phone: "+998937711791",
  phone_after_deletion: "",
  platform_name: "Android",
  project_id: "4dbfb907-8b4b-460b-906b-cc81c58e656c",
  promocode: "",
  role_id: "d3fd64e5-69af-40cc-b7f6-2fc71eb8f6db",
  subsribers_id: null,
  telegram_id: "1413774013",
  user_id_2: null,
  user_language: "",
  with_link: "no with_link",
};
