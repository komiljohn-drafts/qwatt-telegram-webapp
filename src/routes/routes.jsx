import AddCard from "@/pages/add-card";
import AddData from "@/pages/add-data";
import App from "@/App";
import CardOtp from "@/pages/otp";
import Filter from "@/pages/filter";
import History from "@/pages/history";
import MyCards from "@/pages/my-cards";
import Order from "@/pages/order";
import Payment from "@/pages/payment";
import Profile from "@/pages/profile";
import Tarif from "@/pages/pricing_description";

const routes = [
  {
    path: "/",
    element: <App />,
    id: "root",
    children: [
      {
        path: "/add-card",
        id: "add-card",
        element: <AddCard />,
      },
      {
        path: "/add-data",
        id: "add-data",
        element: <AddData />,
      },
      {
        path: "/filter",
        id: "filter",
        element: <Filter />,
      },
      {
        path: "/history",
        id: "history",
        element: <History />,
      },
      {
        path: "my-cards",
        id: "my-cards",
        element: <MyCards />,
      },
      {
        path: "order",
        id: "order",
        element: <Order />,
      },
      {
        path: "otp",
        id: "otp",
        element: <CardOtp />,
      },
      {
        path: "payment",
        id: "payment",
        element: <Payment />,
      },
      {
        path: "pricing_description",
        id: "pricing_description",
        element: <Tarif />,
      },
      {
        path: "profile",
        id: "profile",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
