import DocPage from "@/components/Pages/DocPage";
import MobileHeader from "@/components/UI/MobileHeader";

const Documentation = () => {
  return (
    <div>
      <MobileHeader title="Документация" path="/" />
      <DocPage />
    </div>
  );
};

export default Documentation;
