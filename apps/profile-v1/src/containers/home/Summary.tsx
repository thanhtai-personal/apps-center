import { TitleText } from "@/components/TitleText";
import { useTranslate } from "@/hooks/index"

export const Summary = () => {
  const { t } = useTranslate();

  return <div className="w-full min-h-7 px-2 py-4">
    
    <TitleText content="SUMMARY" />
    <div className="w-full italic text-text mt-3 p-4  rounded-lg pr-6 text-center">
      {t("Experienced Frontend/Full-stack Web Developer with a strong background in ReactJS, NodeJS, TS. Skilled in project management, deployment, and problem-solving.")}
    </div>
  </div>
}