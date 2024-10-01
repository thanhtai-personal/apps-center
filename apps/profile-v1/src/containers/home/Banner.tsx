import {
  ScreenSection,
  VideoBackground,
  ContentSection,
  GridView,
} from '@/components/viewFrame';
import backgroundVideoLight from '@/assets/video/background.mp4';
import backgroundVideoDark from '@/assets/video/background_dark.mp4';
import { SocialIcons } from './SocialIcons';
import { DevelopmentIcons } from './DevelopmentIcons';
import { BannerAvartar } from './BannerAvartar';
import { LanguageSetting } from './LanguageSetting';
import { EczarText } from '@/components/index';
import { UserInfo } from './UserInfo';
import { SectionButtons } from './SectionButtons';
import { ThemeContext } from '@/context/theme';
import { useMemo } from 'react';
import { Button } from 'flowbite-react';
import { useTranslate } from '@/hooks/useTranslate';
import { FaDownload } from 'react-icons/fa6';

export const Banner = () => {
  const themeData = ThemeContext.useDataContext();

  const { t } = useTranslate();

  const videoSrc = useMemo(() => {
    return themeData?.theme?.key === 'dark'
      ? backgroundVideoDark
      : backgroundVideoLight;
  }, [themeData?.theme?.key]);

  return (
    <ScreenSection
      className='flex flex-row justify-center items-center bg-cover shadow-lg rounded-b-lg'
      overflowHidden
    >
      <VideoBackground
        id='banner-background'
        src={videoSrc}
        className='bg-cover relative'
      >
        <div className='relative w-full h-full'>
          <div className='flex absolute left-0 top-0 w-full h-full flex-row justify-center'>
            <ContentSection className='w-full bg-transparent'>
              <GridView
                cols={4}
                gap={'1'}
                classes={{
                  container: 'h-screen',
                }}
              >
                <div className='bg-transparent p-2 flex flex-col'>
                  <DevelopmentIcons />
                </div>
                <div className='bg-transparent col-span-2'></div>
                <div className='bg-transparent p-2 flex flex-row flex-wrap h-fit'>
                  <Button
                    className='flex h-fit mx-2 my-2 lg:my-0'
                    onClick={() => {
                      window.open(
                        'https://drive.google.com/file/d/19N3MxtJ0xl52mv5NsEz4_aEJyeZqSEHK/view?usp=sharing',
                        '_blank'
                      );
                    }}
                  >
                    <FaDownload className='mr-2' />
                    {t('CV')}
                  </Button>
                  <LanguageSetting />
                </div>

                <div className='bg-transparent'></div>
                <div className='bg-transparent flex justify-center lg:justify-start col-span-2'>
                  <div className='bg-transparent p-2 flex flex-col items-center lg:items-start'>
                    <BannerAvartar classes={{ container: ' flex lg:hidden' }} />
                    <EczarText
                      content='Web developer'
                      className='hidden sm:flex'
                    />
                    <EczarText content='W-Dev' className='flex sm:hidden' />
                    <div className='text-text text-1xl lg:text-2xl whitespace-normal text-wrap text-start mt-4 lg:mr-6'>
                      {t(
                        'I am passionate about crafting robust and scalable products, employing top-tier software architecture principles'
                      )}
                    </div>
                  </div>
                </div>
                <div className='bg-transparent'>
                  <BannerAvartar classes={{ container: ' hidden lg:flex' }} />
                </div>

                <div className='bg-transparent flex justify-start items-end p-2'>
                  <UserInfo />
                </div>
                <div className='bg-transparent col-span-2 flex flex-row justify-center items-end'>
                  <SectionButtons />
                </div>
                <div className='bg-transparent p-2'>
                  <SocialIcons />
                </div>
              </GridView>
            </ContentSection>
          </div>
        </div>
      </VideoBackground>
    </ScreenSection>
  );
};
