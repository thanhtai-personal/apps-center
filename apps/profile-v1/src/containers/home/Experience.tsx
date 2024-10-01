import {
  IListItem,
  LazyLoadImage,
  ListView,
  TitleText,
} from '@/components/index';
import { useTranslate } from '@/hooks/index';
import { SkillItem, skillData } from './Skills';
import { ReactNode, useMemo } from 'react';
import defaultImage from '@/assets/images/default_image.jpg';
import fujinet from '@/assets/images/fujinet.png';
import gameLoft from '@/assets/images/gameloft.png';
import titan from '@/assets/images/titan.png';
import { Tooltip } from 'flowbite-react';

export interface Project {
  id: number;
  name: string;
  techStack: string;
  teamSize: number;
  description: ReactNode | string;
}
export interface ExperienceItem {
  id: number;
  start: Date;
  end?: Date;
  description: ReactNode | string;
  companyName?: string;
  conpanyLogo?: string;
  site?: string;
  projects?: Project[];
  skills?: SkillItem[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    start: new Date('01/07/2015'),
    end: new Date('01/09/2015'),
    site: 'https://www.fujinet.net',
    description: 'Offshore - AI research and development',
    companyName: 'Fujinet',
    conpanyLogo: fujinet,
    projects: [],
    skills: [skillData['Java'], skillData['HTML/CSS/JS']],
  },
  {
    id: 2,
    start: new Date('01/09/2015'),
    end: new Date('01/10/2016'),
    site: 'https://www.gameloft.com/gameloft-studios/saigon',
    description: 'Passionate & creative talents of the gaming industry',
    companyName: 'GameLoft',
    conpanyLogo: gameLoft,
    projects: [
      {
        id: 1,
        name: 'Contra',
        teamSize: 1,
        techStack: 'J2me',
        description: '',
      },
      {
        id: 2,
        name: 'Asphalt Nitro',
        teamSize: 10,
        techStack: 'C/C++, Java',
        description: `Asphalt Nitro is an adrenaline-pumping racing game developed by Gameloft, known for its high-speed
      action and stunning graphics. As part of the development team, I had the opportunity to contribute to
      this exciting project by addressing bugs across multiple platforms.`,
      },
    ],
    skills: [skillData['Java'], skillData['C/C++']],
  },
  {
    id: 3,
    start: new Date('01/10/2016'),
    end: new Date('01/04/2017'),
    site: 'https://citynow.vn/',
    description: 'Transforming the world through technology',
    companyName: 'Citynow',
    conpanyLogo:
      'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/301950845_436355955152459_1195302355091238014_n.png?stp=dst-png_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_8I6RLYiQqoAX_6YSDN&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfCUvQK96NurgLKfzs5v_IIv_7zvTnGePYujRCJpkgToKA&oe=66087E4C',
    projects: [
      {
        id: 3,
        name: 'Delorean',
        teamSize: 7,
        techStack: 'ReactJS, ScalaJS, PostgreSQL',
        description:
          'Delorean marks the inaugural project of CityNow, outsourced for a Japanese company, aiming to develop an ERP system tailored to their needs. This undertaking was carried out by a small team of 7 developers. The database was built on PostgreSQL, while ScalaJS was utilized for the backend and ReactJS for the frontend. In this project, my role as a full-stack JS developer entails implementing various features. Specifically, I am responsible for handling authentication and user management functionalities.',
      },
      {
        id: 4,
        name: 'Swallow',
        teamSize: 7,
        techStack: 'ReactJS, ScalaJS, PostgreSQL',
        description:
          'Swallow, a product of CityNow, focuses on Japan Study & Job Recruitment, offering insights into job and study opportunities in Japan. Following Delorean, this project is built by a small team of 7 developers, utilizing a JavaScript stack. My role in this project involves implementing full features from backend to frontend. A notable contribution of mine is the development of a rich text editor, facilitating the posting of content on public sites.',
      },
    ],
    skills: [
      skillData['ReactJS'],
      skillData['ScalaJS'],
      skillData['GIT Flow'],
      skillData['PostgreSQL'],
    ],
  },
  {
    id: 4,
    start: new Date('01/05/2017'),
    end: new Date('01/12/2018'),
    site: '#',
    description: 'Company is a family',
    companyName: 'Kolab LLC / Curio',
    conpanyLogo:
      'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/signboard_closed.png',
    projects: [
      {
        id: 5,
        name: 'Meastro',
        teamSize: 15,
        techStack: 'ReactJS, .Net, SQL server, Jira',
        description:
          'The Maestro Celebrity Event Planning Platform, developed by approximately 20 developers, utilizes .NET for the backend and ReactJS for the frontend. In this project, my role as a frontend developer entails implementing various features on ReactJS. Specifically, I focus on functionalities like calendar event management and report printing services',
      },
      {
        id: 6,
        name: 'WorkID',
        teamSize: 3,
        techStack: 'ReactJS, ExpressJS, PostgreSQL, Jira',
        description:
          'WorkID is another project of KoLab LLC, developed by a small team consisting of 3 members. Its objective is to create a job seeker platform by crawling data from various social networks such as LinkedIn. This project is built on ExpressJS for the backend and ReactJS for the frontend.',
      },
    ],
    skills: [skillData['ReactJS'], skillData['Jira'], skillData['GIT Flow']],
  },
  {
    id: 5,
    start: new Date('01/01/2019'),
    end: new Date('01/06/2021'),
    site: 'https://www.titancorpvn.com/',
    description: 'INSPIRE YOUR WORK',
    companyName: 'Titan Technology Corporation',
    conpanyLogo: titan,
    projects: [
      {
        id: 6,
        name: 'Auvenir',
        teamSize: 7,
        techStack: 'ReactJS, .Net, SQL server, Micro-service, Jira',
        description:
          'Developed by more than 200 developers, this is a significant outsourced project and the flagship endeavor of TiTan. The backend is built on .Net Core microservices, the database is a SQL project, and the frontend is developed in ReactJS. My responsibility in this project is to implement new features and fix bugs. Some of the features I have worked on include creating an engagement screen, handling logout in multi-tab, multi-browser scenarios, and managing content updates,...',
      },
    ],
    skills: [
      skillData['ReactJS'],
      skillData['.Net'],
      skillData['SQL'],
      skillData['Jira'],
      skillData['MicroServices'],
    ],
  },
  {
    id: 6,
    start: new Date('01/07/2021'),
    end: new Date('01/06/2022'),
    site: 'https://isofh.com/',
    description: 'Leading MedTech',
    companyName: 'ISofh',
    conpanyLogo: 'https://isofh.com/images/logo.png',
    projects: [
      {
        id: 8,
        name: 'Command center', // Trung tâm điều hành
        teamSize: 2,
        techStack: 'ReactJS, Java',
        description:
          'The Command Center project in the medical field serves as an operational hub within a hospital. It connects to another Electronic Medical Record project of ISOFH to display patient records, manage inpatient and outpatient information, and oversee medical record management. This project utilizes Java for the backend and ReactJS with Redux for the frontend. My primary responsibility in this project is to implement all UI features.',
      },
    ],
    skills: [
      skillData['ReactJS'],
      skillData['HTML/CSS/JS'],
      skillData['webpack'],
      skillData['Medical'],
    ],
  },
  {
    id: 7,
    start: new Date('01/07/2022'),
    end: new Date('01/04/2023'),
    site: 'https://0xtool.io',
    description: 'Sharks tracker',
    companyName: 'Oxtool team',
    conpanyLogo:
      'https://vn.cloud-ace.com/wp-content/uploads/2023/10/0xtool.jpg',
    projects: [
      {
        id: 9,
        name: '0xtool',
        teamSize: 2,
        techStack: 'ReactJS, NodeJS, mongodb, blockchain, web3',
        description:
          '0xtool is a project that offers tools for tracking token shark accounts, reviewing tokens, and NFTs. This project is being developed by myself and one other developer. My responsibility lies in the UI aspect of the project, which is being handled using React with TypeScript.',
      },
    ],
    skills: [
      skillData['ReactJS'],
      skillData['TypeScript'],
      skillData['HTML/CSS/JS'],
      skillData['Blockchain'],
    ],
  },
  {
    id: 8,
    start: new Date('01/04/2023'),
    site: 'https://www.titancorpvn.com/',
    description: 'INSPIRE YOUR WORK',
    companyName: 'Titan Technology Corporation',
    conpanyLogo: titan,
    projects: [
      {
        id: 10,
        name: 'CMS',
        teamSize: 7,
        techStack: 'ReactJS, .Net-core',
        description: 'CMS for the Auvenir Commerce',
      },
      {
        id: 11,
        name: 'Auvenir Comerce',
        teamSize: 7,
        techStack: 'ReactJS, .Net-core, micro-services',
        description: 'Auditing platform for Auvenir',
      },
      {
        id: 12,
        name: 'Flymore',
        teamSize: 10,
        techStack: 'ReactJS, Ts.ed, typescript',
        description:
          'Aside from the Auvenir/Deloitte Auditing platform, Flymore is another project of TiTan. It is developed by approximately 20 developers and is a TypeScript full-stack e-commerce application available on both web and mobile platforms, utilizing PostgreSQL. This project employs a microservices architecture communicated by event-driven in its structure. My responsibility in this project is to implement new features and fix bugs. Some of the features I have worked on include creating agreements and handling the bidding system, and creating a migrated database script.',
      },
      {
        id: 13,
        name: 'TiTan core',
        teamSize: 10,
        techStack:
          'ReactJS, .Net-core, typescript, mono-repository, vitest, npm publish',
        description:
          'TiTan Core is a pivotal project within TiTan, designed to create modular bases for utilization across various other projects within the JavaScript stack. This monorepo source encompasses several tiers, including client modules, SDKs, applications, and domains. Clients aggregate all UI packages, applications encapsulate business logic packages, domains provide API packages, and SDKs consolidate all SDK packages that facilitate the connection and usage of API packages by UI packages. In this project, my primary responsibility lies in implementing all UI packages and SDK packages for the initial phase. This includes React-core, unittest-vitest, SDKs for user management and authentication, as well as UI packages for authentication and user management. Additionally, I am tasked with documenting each component thoroughly.',
      },
    ],
    skills: [
      skillData['ReactJS'],
      skillData['TypeScript'],
      skillData['.Net'],
      skillData['HTML/CSS/JS'],
      skillData['Python'],
      skillData['TypeORM'],
      skillData['SQL'],
      skillData['PostgreSQL'],
      skillData['webpack'],
      skillData['NPM Publish'],
      skillData['GIT Flow'],
      skillData['Jira'],
      skillData['MicroServices'],
    ],
  },
];

export const Experience = () => {
  const { t } = useTranslate();

  const experienceItems: IListItem[] = useMemo(() => {
    return experienceData.map(item => {
      return {
        key: `exp-${item.id.toString()}`,
        className: 'w-full',
        content: (
          <div className='w-full flex flex-col sm:flex-row sm:justify-between'>
            <div className='flex flex-row items-center'>
              <div className='hidden sm:flex'>
                <LazyLoadImage
                  src={item.conpanyLogo || defaultImage}
                  imageClass='w-16 h-16 rounded-full mx-2 border-solid  border-[1px] border-text  shadow-lg shadow-inner'
                />
              </div>
              <div className='flex flex-col'>
                <a
                  target='_blank'
                  href={item.site}
                  className='text-text-active underline text-lg font-bold'
                >
                  {item.companyName ? t(item.companyName) : t('Freelancer')}
                </a>
                <div className='text-sm whitespace-normal text-nowrap'>
                  {typeof item.description === 'string'
                    ? t(item.description)
                    : item.description}
                </div>
              </div>
            </div>
            <div className='hidden lg:flex justify-center items-center'>
              {item.projects?.map(project => {
                return (
                  <Tooltip
                    key={`project-${project.id}`}
                    className="max-w-[85%]"
                    content={
                      <div className='flex flex-col w-full p-2'>
                        <div className='text-sm whitespace-normal text-nowrap'>
                          {`${t('Team size')}: ${project.teamSize}`}
                        </div>
                        <div className='text-sm whitespace-normal text-nowrap'>
                          {`${t('Techstack')}: ${project.techStack}`}
                        </div>
                        <div className='text-sm whitespace-normal text-wrap'>
                          {`${t('Summary')}: `}
                          {typeof project.description === 'string'
                            ? t(project.description)
                            : project.description}
                        </div>
                      </div>
                    }
                  >
                    <div
                      key={`project-${project.id}`}
                      className='p-2 m-2 text-xs border-solid border-[1px] shadow-inner rounded-md hover:text-text-active'
                    >
                      {project.name}
                    </div>
                  </Tooltip>
                );
              })}
            </div>
            <div className='flex flex-col items-end'>
              <div className='text-text-active text-sm'>{`${new Date(
                item.start
              ).toLocaleDateString()} - ${
                item.end
                  ? new Date(item.end).toLocaleDateString()
                  : t('Current')
              }`}</div>
              <div className='flex flex-row justify-end items-center flex-wrap w-40 md:w-64'>
                {item.skills?.map(skill => (
                  <div key={skill.key} className='m-2'>
                    {skill.image('w-4 h-4')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
        isActive: false,
        onClick: (_item?: IListItem) => {},
        onHover: (_item?: IListItem) => {},
      } as IListItem;
    });
  }, []);

  return (
    <div className='w-full px-2 py-4'>
      <TitleText content='Experiences' />
      <div className='w-full flex flex-col italic text-text mt-3 p-4 rounded-lg pr-6'>
        <ListView
          unstyled
          classes={{
            container: 'w-full px-2',
          }}
          items={experienceItems.reverse()}
        />
      </div>
    </div>
  );
};
