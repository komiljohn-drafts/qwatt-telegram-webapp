import AddCard from "@/pages/add-card";
import AddData from "@/pages/add-data";
import App from "@/App";
import CardOtp from "@/pages/otp";
import Documentation from "@/pages/doc/Documentation";
import Faq from "@/pages/doc/faq";
import Filter from "@/pages/filter";
import History from "@/pages/history";
import MyCards from "@/pages/my-cards";
import Order from "@/pages/order";
import Payment from "@/pages/payment";
import PrivacyPolicy from "@/pages/doc/privacypolicy";
import Profile from "@/pages/profile";
import Rent from "@/pages/rent";
import Tarif from "@/pages/pricing_description";
import Termconditions from "@/pages/doc/term&conditions";

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
        path: "/rent",
        id: "rent",
        element: <Rent />,
      },
      {
        path: "/doc",
        id: "doc",
        element: <Documentation />,
      },
      {
        path: "/faq",
        id: "faq",
        element: <Faq />,
      },
      {
        path: "/privacypolicy",
        id: "privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/term&conditions",
        id: "term&conditions",
        element: <Termconditions />,
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
        children: [
          {
            path: "add-data",
            id: "add-data",
            element: <AddData />,
          },
        ],
      },
    ],
  },
];

export default routes;
