import 'regenerator-runtime';
import { Button, Modal } from 'flowbite-react';
import { useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import 'regenerator-runtime';
import { AppContext } from "@/context/app";
import { useTranslate } from "@/hooks/useTranslate";

export interface IDictaphoneButton {
  setTranscript: (transcript: string) => void;
}

export const DictaphoneButton = ({ setTranscript }: IDictaphoneButton) => {

  const appData = AppContext.useDataContext();
  const { t } = useTranslate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    // commands,
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>{t("You need provide micro-phone permission to use this feature.")}</span>;
  }

  useEffect(() => {
    transcript && transcript.length > 3 && setTranscript(transcript);
  }, [transcript]);

  return (
    <div>
      <Button
        onClick={() => {
          SpeechRecognition.startListening({
            language: appData?.languageCode || 'en-EN'
          });
        }}
      >
        <svg
          className='w-6 h-6 text-gray-800 dark:text-white'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            fill-rule='evenodd'
            d='M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z'
            clip-rule='evenodd'
          />
          <path d='M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z' />
        </svg>
      </Button>
      <Modal show={listening}>
        <Modal.Body>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='text-sm text-yellow-300'>{transcript}</div>
            <Button
              onClick={() => {
                SpeechRecognition.stopListening();
                resetTranscript();
              }}
            >
              <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6'
                />
              </svg>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
