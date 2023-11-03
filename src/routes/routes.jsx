import AddCard from "@/pages/add-card";
import AddData from "@/pages/add-data";
import App from "@/App";
import CardOtp from "@/pages/otp";
import Documentation from "@/pages/doc/Documentation";
import Faq from "@/pages/faq";
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
import Requisites from "@/pages/doc/faq";
import ContactUs from "@/pages/contact_us";
import Bonuses from "@/pages/bonuses";

const routes = [
  {
    path: "/:lang",
    element: <App />,
    id: "root",
    children: [
      {
        path: "/:lang/add-card",
        id: "add-card",
        element: <AddCard />,
      },
      {
        path: "/:lang/rent",
        id: "rent",
        element: <Rent />,
      },
      {
        path: "/:lang/doc",
        id: "doc",
        element: <Documentation />,
      },
      {
        path: "/:lang/faq",
        id: "faq",
        element: <Faq />,
      },
      {
        path: "/:lang/privacypolicy",
        id: "privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/:lang/term&conditions",
        id: "term&conditions",
        element: <Termconditions />,
      },
      {
        path: "/:lang/filter",
        id: "filter",
        element: <Filter />,
      },
      {
        path: "/:lang/history",
        id: "history",
        element: <History />,
      },
      {
        path: "/:lang/my-cards",
        id: "my-cards",
        element: <MyCards />,
      },
      {
        path: "/:lang/order",
        id: "order",
        element: <Order />,
      },
      {
        path: "/:lang/otp",
        id: "otp",
        element: <CardOtp />,
      },
      {
        path: "/:lang/payment",
        id: "payment",
        element: <Payment />,
      },
      {
        path: "/:lang/pricing_description",
        id: "pricing_description",
        element: <Tarif />,
      },
      {
        path: "/:lang/contact_us",
        id: "contact_us",
        element: <ContactUs />
      },
      {
        path: "/:lang/requisites",
        id: "requisites",
        element: <Requisites />,
      },
      {
        path: "/:lang/bonuses",
        id: "bonuses",
        element: <Bonuses />
      },
      {
        path: "/:lang/profile",
        id: "profile",
        element: <Profile />,
        children: [
          {
            path: "/:lang/profile/add-data",
            id: "add-data",
            element: <AddData />,
          },
        ],
      }
    ],
  },
  {
    path: '/',
    element: <App/>
  }
];

export default routes;
