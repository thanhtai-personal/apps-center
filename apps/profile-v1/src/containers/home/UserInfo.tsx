import { useTranslate } from '@/hooks/useTranslate';

export const UserInfo = () => {
  const { t } = useTranslate();

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row items-center'>
        <div className='w-14 border-r border-solid'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap font-bold'>{t('Name')}</span>&nbsp;
        </div>
        <div className='ml-2'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap'>{t('Trần Thanh Tài')}</span>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        <div className='w-14 border-r border-solid'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap font-bold'>{t('Age')}</span>&nbsp;
        </div>
        <div className='ml-2'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap'>{t('31')}</span>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        <div className=' w-14 border-r border-solid'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap font-bold'>{t('From')}</span>&nbsp;
        </div>
        <div className='ml-2'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap'>{t('Đắk Nông')}</span>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        <div className=' w-14 border-r border-solid'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap font-bold'>{t('Title')}</span>&nbsp;
        </div>
        <div className='ml-2'>
          <span className=' text-xs text-text text-nowrap whitespace-nowrap'>{t('Senior developer')}</span>
        </div>
      </div>
    </div>
  );
};
