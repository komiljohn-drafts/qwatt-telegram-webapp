import ContactUsPage from "@/components/Pages/ContactUsPage";
import MobileHeader from "@/components/UI/MobileHeader";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div>
      <MobileHeader title={t("contact_us")} />
      <ContactUsPage />
    </div>
  );
};

export default ContactUs;
