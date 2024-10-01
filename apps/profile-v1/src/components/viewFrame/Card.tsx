import { useTranslate } from '@/hooks/useTranslate';
import { CardProps, Card as FlowBiteCard, Tooltip } from 'flowbite-react';
import { ReactNode, useState } from 'react';
import { LazyLoadImage } from "..";

export type ICard = CardProps & {
  title?: ReactNode | string;
  description?: string;
  defaultFullDes?: boolean;
  embeddedVideo?: string;
  embeddedAlt?: string;
  rating?: {
    point: number;
    baseOn?: string;
  };
};

export const Card = ({
  title,
  description,
  defaultFullDes,
  rating,
  embeddedVideo,
  embeddedAlt,
  ...nestedProps
}: ICard) => {
  const { t } = useTranslate();
  const [isFullDes, setIsFullDes] = useState(!!defaultFullDes);

  return (
    <FlowBiteCard className="rounded-lg items-stretch bg-transparent" {...nestedProps}>
      <div className='flex flex-col w-full h-full justify-items-start items-stretch'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          <span className=' whitespace-nowrap'>
            {typeof title === 'string' ? t(title) : title}
          </span>
        </h5>
        {rating && (
          <span className='text-sm whitespace-nowrap font-mono underline text-text-active italic'>{`${t(
            'Rate'
          )}: ${rating.point}/100`}</span>
        )}
        {rating?.baseOn && (
          <Tooltip content={t(rating.baseOn)}>
            <p className='text-sm font-mono mb-4 text-text whitespace-nowrap text-nowrap text-ellipsis overflow-hidden mr-2'>
              {t(rating.baseOn)}
            </p>
          </Tooltip>
        )}
        <p
          className={`font-normal text-gray-700 dark:text-gray-400 italic ${
            isFullDes
              ? 'animate-fade_in'
              : 'max-h-40 overflow-hidden whitespace-nowrap text-ellipsis'
          }`}
        >
          {description && t(description)}
        </p>
        {!isFullDes && (
          <div
            className='w-full cursor-pointer flex justify-center items-center p-2 underline'
            onClick={() => setIsFullDes(true)}
          >
            {t('Read more...')}
          </div>
        )}
        {embeddedVideo ? (
          <div className=" overflow-hidden" dangerouslySetInnerHTML={{ __html: embeddedVideo }}></div>
        ) : embeddedAlt ? <LazyLoadImage src={embeddedAlt} /> : ""}
      </div>
    </FlowBiteCard>
  );
};
