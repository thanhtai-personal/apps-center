import { useTranslate } from "@/hooks/useTranslate"

export const EczarText = ({ content, className }: { content: string, className?: string }) => {
  const { t } = useTranslate();

  return <div className="flex flex-col justify-start items-center text-center px-1 md:px-8 lg:px-16">
    <div className={`text-2xl lg:text-4xl font-eczar font-bold text-black-700 block text-nowrap whitespace-normal ${className}`}>
      {t(content)}
    </div>
  </div>
}