import {
  AnimationView,
  ContentSection,
  IntersectionObserverView,
  VideoBackground,
} from '@/components/index';
import { Banner } from './Banner';
import { Summary } from './Summary';
import { Footer } from 'flowbite-react';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Education } from './Education';
import { SideProjects } from './SideProjects';
import page from '@/assets/video/page.mp4';
import { ThemeContext } from '@/context/theme';
import { setOfThemes } from '@/utils/constants';
import { RightActionPanel } from './RightActionPanel';

export interface IHomePage {}

const HomePageContent = () => {
  const themeData = ThemeContext.useDataContext();

  return (
    <AnimationView.FadeIn
      id='scroll-container'
      className='bg-transparent w-screen h-screen m-0 p-0 overflow-x-hidden'
    >
      <RightActionPanel />
      <Banner />
      <IntersectionObserverView id='section-summary'>
        <AnimationView.FadeIn>
          <AnimationView.SlideIn>
            <ContentSection>
              <Summary />
            </ContentSection>
          </AnimationView.SlideIn>
        </AnimationView.FadeIn>
      </IntersectionObserverView>
      <IntersectionObserverView id='section-skills'>
        <AnimationView.FadeIn>
          <AnimationView.SlideIn>
            <ContentSection>
              <Skills />
            </ContentSection>
          </AnimationView.SlideIn>
        </AnimationView.FadeIn>
      </IntersectionObserverView>
      <IntersectionObserverView id='section-experience'>
        <AnimationView.FadeIn>
          <AnimationView.SlideIn>
            <ContentSection>
              <Experience />
            </ContentSection>
          </AnimationView.SlideIn>
        </AnimationView.FadeIn>
      </IntersectionObserverView>
      <IntersectionObserverView id='section-education'>
        <AnimationView.FadeIn>
          <AnimationView.SlideIn>
            <ContentSection>
              <Education />
            </ContentSection>
          </AnimationView.SlideIn>
        </AnimationView.FadeIn>
      </IntersectionObserverView>
      <IntersectionObserverView id='section-side-projects'>
        <AnimationView.FadeIn>
          <AnimationView.SlideIn>
            <ContentSection>
              <SideProjects />
            </ContentSection>
          </AnimationView.SlideIn>
        </AnimationView.FadeIn>
      </IntersectionObserverView>
      <Footer className='w-full h-4 relative'>
        {themeData?.theme?.key !== setOfThemes.dark.key && (
          <VideoBackground
            id='smoke-background'
            classes={{
              container: 'h-auto opacity-40',
            }}
            src='https://video.wixstatic.com/video/d47472_58cce06729c54ccb935886c4b3647274/1080p/mp4/file.mp4'
            className='flex justify-center w-full h-full'
          >
            <div></div>
          </VideoBackground>
        )}
        <div className='absolute w-full h-full left-0 top-0 rounded-t-lg'>
          <div className='w-full h-full flex flex-row items-end justify-center'>
            <div className='text-xs text-gray-600 font-mono font-bold w-full text-center justify-center items-center h-4 bg-[rgba(255,100,125,0.25)] dark:bg-[rgba(0,15,5,0.7)]'>
              @2024 taitran
            </div>
          </div>
        </div>
      </Footer>
    </AnimationView.FadeIn>
  );
};

const HomePage = ({}: IHomePage) => {
  return (
    <div className='w-screen h-screen'>
      <VideoBackground
        id='page-background'
        classes={{
          container: 'opacity-20',
        }}
        src={page}
        className='flex justify-center w-full h-full'
      >
        <div></div>
      </VideoBackground>
      <div className='absolute w-full h-full left-0 top-0 bg-transparent rounded-t-lg'>
        <div className='w-full flex flex-row bg-background'>
          <HomePageContent />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
