import { useTranslate } from '@/hooks/useTranslate';
import { goToSection } from '@/utils/index';
import { ButtonGroup, Button } from 'flowbite-react';

export const SectionButtons = () => {
  const { t } = useTranslate();
  return (
    <div className='flex flex-col'>
      <ButtonGroup className='hidden md:flex'>
        <Button onClick={() => goToSection('section-summary')}>
          {t('Summary')}
        </Button>
        <Button onClick={() => goToSection('section-skills')}>
          {t('Skills')}
        </Button>
        <Button onClick={() => goToSection('section-experience')}>
          {t('Experience')}
        </Button>
        <Button onClick={() => goToSection('section-education')}>
          {t('Education')}
        </Button>
        <Button onClick={() => goToSection('section-side-projects')}>
          {t('Side Projects')}
        </Button>
      </ButtonGroup>
    </div>
  );
};
