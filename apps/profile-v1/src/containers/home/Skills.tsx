import { GridView, SelectList, Card, TitleText } from '@/components/index';
import { useTranslate } from '@/hooks/useTranslate';
import { Button, ButtonGroup, Tooltip } from 'flowbite-react';
import { ReactNode, useState } from 'react';
import { AiOutlineAudit } from 'react-icons/ai';
import { BiBitcoin } from 'react-icons/bi';
import {
  DiDotnet,
  DiJava,
  DiJavascript,
  DiMongodb,
  DiPostgresql,
} from 'react-icons/di';
import {
  FaDatabase,
  FaFlushed,
  FaGamepad,
  FaGit,
  FaHandHoldingMedical,
  FaHtml5,
  FaJira,
  FaNodeJs,
  FaNpm,
  FaPython,
  FaReact,
  FaTrello,
} from 'react-icons/fa';
import { FcServices } from 'react-icons/fc';
import { GiCommercialAirplane } from 'react-icons/gi';
import {
  SiCplusplus,
  SiFirebase,
  SiScala,
  SiVercel,
  SiWebpack,
} from 'react-icons/si';
import {
  TbArrowsTransferUp,
  TbBrandNextjs,
  TbBrandReactNative,
  TbSql,
} from 'react-icons/tb';

enum SkillType {
  FrontEnd = 'FrontEnd',
  BackEnd = 'BackEnd',
  Deployment = 'Deployment',
  Database = 'Database',
  Tools = 'Tools',
  Business = 'Business',
  Game = 'Game',
}

export interface SkillItem {
  key?: string;
  image: (className?: string) => ReactNode;
  types: SkillType[];
  rating: number;
  ratingDetail: string;
  shortDescription: string;
}

export const skillData: { [key: string]: SkillItem } = {
  ReactJS: {
    key: 'ReactJS',
    types: [SkillType.FrontEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'ReactJS'}>
        <FaReact className={`${className}`} />
      </Tooltip>
    ),
    rating: 100,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'ReactJS is a JavaScript library for building user interfaces, particularly for single-page applications. It allows developers to create reusable UI components and efficiently manage the application state.',
  },
  'HTML/CSS/JS': {
    key: 'HTML/CSS/JS',
    types: [SkillType.FrontEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'HTML/CSS/JS'}>
        <FaHtml5 className={className} />
      </Tooltip>
    ),
    rating: 90,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'The combination of HTML, CSS, and JavaScript refers to the fundamental technologies used for building and styling web pages. HTML provides the structure, CSS controls the presentation and layout, and JavaScript adds interactivity and behavior to web pages.',
  },
  ReactNative: {
    key: 'ReactNative',
    types: [SkillType.FrontEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'ReactNative'}>
        <TbBrandReactNative className={`${className}`} />
      </Tooltip>
    ),
    rating: 50,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'React Native is a framework for building mobile applications using JavaScript and React. It allows developers to write code once and deploy it across multiple platforms, such as iOS and Android, while maintaining a native-like user experience.',
  },
  Javascript: {
    key: 'Javascript',
    types: [SkillType.FrontEnd, SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Javascript'}>
        <DiJavascript className={className} />
      </Tooltip>
    ),
    rating: 90,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'JS is a scripting language capable of interacting with web browsers to create dynamic web pages and various other interactive features',
  },
  TypeScript: {
    key: 'TypeScript',
    types: [SkillType.FrontEnd, SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'TypeScript'}>
        <DiJavascript className={className} />
      </Tooltip>
    ),
    rating: 70,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'TS is a type modules for JS programmingTS is a superset of JavaScript that adds static typing and other features to the language, enhancing code quality and developer productivity.',
  },
  ExpressJS: {
    key: 'ExpressJS',
    types: [SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'ExpressJS'}>
        <FaNodeJs className={className} />
      </Tooltip>
    ),
    rating: 50,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'ExpressJS is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It is designed to create APIs and web servers quickly and easily with JavaScript',
  },
  ScalaJS: {
    key: 'ScalaJS',
    types: [SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'ScalaJS'}>
        <SiScala className={className} />
      </Tooltip>
    ),
    rating: 50,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      "ScalaJS is a modern programming language that compiles Scala code to JavaScript, allowing developers to write front-end applications using Scala's expressive and type-safe syntax. It enables seamless integration with existing JavaScript libraries and frameworks, making it a powerful choice for building web applications with Scala.",
  },
  NextJS: {
    key: 'NextJS',
    types: [SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'NextJS'}>
        <TbBrandNextjs className={className} />
      </Tooltip>
    ),
    rating: 50,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Next.js is a React framework for building server-side rendered and statically generated web applications. It provides features such as automatic code splitting, server-side rendering, and route pre-fetching, making it easy to build fast and scalable React applications.',
  },
  Java: {
    key: 'Java',
    types: [SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Java'}>
        <DiJava className={className} />
      </Tooltip>
    ),
    rating: 90,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle). It is known for its platform independence, strong typing, and extensive libraries, making it widely used for building desktop, web, and mobile applications.',
  },
  'C/C++': {
    key: 'C/C++',
    types: [SkillType.Game],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'C/C++'}>
        <SiCplusplus className={className} />
      </Tooltip>
    ),
    rating: 30,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'C/C++ are powerful programming languages widely used for system and application development. They offer high performance and low-level control, making them suitable for tasks such as operating systems, game development, and embedded systems programming',
  },
  '.Net': {
    key: '.Net',
    types: [SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'.Net'}>
        <DiDotnet className={className} />
      </Tooltip>
    ),
    rating: 40,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      '.NET is a software development framework developed by Microsoft that supports building and running applications for Windows, macOS, Linux, iOS, and Android. It provides a comprehensive set of tools, libraries, and runtime environments for developing various types of applications, including web, desktop, mobile, cloud, and IoT applications.',
  },
  Python: {
    key: 'Python',
    types: [SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Python'}>
        <FaPython className={className} />
      </Tooltip>
    ),
    rating: 10,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      "Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms and is widely used for web development, data analysis, artificial intelligence, scientific computing, and more. Python's extensive standard library and thriving ecosystem of third-party packages make it a versatile and popular choice among developers.",
  },
  TypeORM: {
    key: 'TypeORM',
    types: [SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'TypeORM'}>
        <FaDatabase className={className} />
      </Tooltip>
    ),
    rating: 30,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'TypeORM is an Object-Relational Mapping (ORM) library for TypeScript and JavaScript. It enables developers to work with relational databases using object-oriented programming techniques, allowing for easier database integration and manipulation. TypeORM supports various database systems, including PostgreSQL, MySQL, SQLite, and others.',
  },
  Phaser: {
    key: 'Phaser',
    types: [SkillType.Game],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Phaser'}>
        <FaGamepad className={className} />
      </Tooltip>
    ),
    rating: 40,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Phaser is a fast and flexible HTML5 game framework built with JavaScript. It provides a comprehensive set of tools and features for game development, including physics engines, sprite management, input handling, sound effects, and more. Phaser is widely used for creating both 2D and 2.5D games for web and mobile platforms.',
  },
  fireBase: {
    key: 'fireBase',
    types: [SkillType.Database, SkillType.Deployment],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'fireBase'}>
        <SiFirebase className={className} />
      </Tooltip>
    ),
    rating: 30,
    ratingDetail: 'Rating based on familiarity',
    shortDescription: 'Fire base storage - stored image',
  },
  cheerioCrawler: {
    key: 'cheerioCrawler',
    types: [SkillType.Database],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'cheerioCrawler'}>
        <FaFlushed className={className} />
      </Tooltip>
    ),
    rating: 40,
    ratingDetail: 'Rating based on familiarity',
    shortDescription: 'Crawl data',
  },
  SQL: {
    key: 'SQL',
    types: [SkillType.Database],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'SQL'}>
        <TbSql className={className} />
      </Tooltip>
    ),
    rating: 70,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'SQL stands for Structured Query Language. It is a programming language used to manage and manipulate relational databases. SQL allows users to perform various operations such as querying, updating, inserting, and deleting data in a database.',
  },
  MongoDB: {
    key: 'MongoDB',
    types: [SkillType.Database, SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'MongoDB'}>
        <DiMongodb className={className} />
      </Tooltip>
    ),
    rating: 40,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'MongoDB is a popular NoSQL database system known for its flexibility and scalability. It stores data in a flexible, JSON-like format called BSON and is designed for handling large volumes of data across distributed systems. MongoDB is widely used for various types of applications, including web, mobile, and IoT, where flexible data structures and scalability are required.',
  },
  PostgreSQL: {
    key: 'PostgreSQL',
    types: [SkillType.Database, SkillType.BackEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'PostgreSQL'}>
        <DiPostgresql className={className} />
      </Tooltip>
    ),
    rating: 60,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'PostgreSQL is a powerful open-source relational database management system (RDBMS) known for its reliability, robustness, and advanced features. It supports SQL (Structured Query Language) and is highly extensible, offering features such as ACID compliance, transactions, triggers, and stored procedures. PostgreSQL is commonly used for mission-critical applications, data warehousing, and analytics',
  },
  MicroServices: {
    key: 'MicroServices',
    types: [SkillType.Deployment, SkillType.BackEnd, SkillType.FrontEnd],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'MicroServices'}>
        <FcServices className={className} />
      </Tooltip>
    ),
    rating: 70,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Microservices is a software architecture where applications are developed as small, independent, and self-contained services. Each service performs a specific function and can be deployed, scaled, and managed independently. The microservices architecture increases flexibility, allows for easy scalability, and minimizes dependencies between components of the system.',
  },
  webpack: {
    key: 'webpack',
    types: [SkillType.Deployment],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'webpack'}>
        <SiWebpack className={className} />
      </Tooltip>
    ),
    rating: 20,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Webpack is a popular module bundler for JavaScript applications. It takes modules with dependencies and generates static assets that represent those modules. Webpack is often used in modern web development workflows to bundle, optimize, and manage front-end assets such as JavaScript, CSS, and images. It also supports features like code splitting, hot module replacement, and tree shaking for efficient application development.',
  },
  'NPM Publish': {
    key: 'NPM Publish',
    types: [SkillType.Deployment],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'NPM Publish'}>
        <FaNpm className={className} />
      </Tooltip>
    ),
    rating: 50,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      "NPM (Node Package Manager) is the default package manager for Node.js. It allows developers to publish and distribute packages of reusable code to the broader JavaScript community. By using the 'npm publish' command, developers can share their packages on the NPM registry, making them available for others to install and use in their projects.",
  },
  Vercel: {
    key: 'Vercel',
    types: [SkillType.Deployment],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Vercel'}>
        <SiVercel className={className} />
      </Tooltip>
    ),
    rating: 50,
    ratingDetail: 'Rating based on familiarity',
    shortDescription: '',
  },
  'GIT Flow': {
    key: 'GIT Flow',
    types: [SkillType.Deployment, SkillType.Tools],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'GIT Flow'}>
        <FaGit className={className} />
      </Tooltip>
    ),
    rating: 90,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Git Flow is a branching model for Git, introduced by Vincent Driessen, that defines a set of rules for managing branches in a Git repository.',
  },
  Jira: {
    key: 'Jira',
    types: [SkillType.Tools],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Jira'}>
        <FaJira className={className} />
      </Tooltip>
    ),
    rating: 60,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Jira is a popular project management tool developed by Atlassian. It is used by teams to plan, track, and manage software development projects and tasks',
  },
  Trello: {
    key: 'Trello',
    types: [SkillType.Tools],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Trello'}>
        <FaTrello className={className} />
      </Tooltip>
    ),
    rating: 60,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Trello is a web-based project management tool that utilizes a system of boards, lists, and cards to help teams organize and prioritize their work',
  },
  Logistic: {
    key: 'Logistic',
    types: [SkillType.Business],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Logistic'}>
        <TbArrowsTransferUp className={className} />
      </Tooltip>
    ),
    rating: 80,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Logistics refers to the process of planning, implementing, and controlling the efficient and effective flow of goods, services, and information from the point of origin to the point of consumption. It involves activities such as transportation, warehousing, inventory management, packaging, and distribution, with the goal of meeting customer requirements while minimizing costs and maximizing profitability. Logistics plays a critical role in supply chain management, ensuring that products are delivered to the right place, at the right time, and in the right condition.',
  },
  Medical: {
    key: 'Medical',
    types: [SkillType.Business],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Medical'}>
        <FaHandHoldingMedical className={className} />
      </Tooltip>
    ),
    rating: 80,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Medical refers to the field of healthcare that involves the diagnosis, treatment, and prevention of diseases and disorders in humans. It encompasses various disciplines such as medicine, nursing, pharmacy, dentistry, and allied health professions. Medical professionals work to promote health, alleviate suffering, and improve the quality of life for individuals and communities. They use a combination of medical knowledge, diagnostic tools, therapeutic interventions, and patient care to address a wide range of health issues, from minor ailments to life-threatening conditions. Medical practice is guided by ethical principles, evidence-based guidelines, and regulatory standards to ensure the safety and well-being of patients',
  },
  Blockchain: {
    key: 'Blockchain',
    types: [SkillType.Business],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Blockchain'}>
        <BiBitcoin className={className} />
      </Tooltip>
    ),
    rating: 30,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'Blockchain is a decentralized and distributed digital ledger technology that records transactions across multiple computers in a secure and immutable manner. It provides transparency, security, and efficiency in various applications such as cryptocurrency, supply chain management, and voting systems.',
  },
  Auditing: {
    key: 'Auditing',
    types: [SkillType.Business],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'Auditing'}>
        <AiOutlineAudit className={className} />
      </Tooltip>
    ),
    rating: 40,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      "Auditing is the examination of financial records and statements to ensure accuracy and compliance with regulations. Deloitte is one of the 'Big Four' accounting firms that provides auditing, consulting, tax, and advisory services to clients worldwide.",
  },
  'E-commerce': {
    key: 'E-commerce',
    types: [SkillType.Business],
    image: (className = 'w-16 h-16') => (
      <Tooltip content={'E-commerce'}>
        <GiCommercialAirplane className={className} />
      </Tooltip>
    ),
    rating: 70,
    ratingDetail: 'Rating based on familiarity',
    shortDescription:
      'E-commerce, short for electronic commerce, refers to the buying and selling of goods and services over the internet. E-commerce platforms often provide features such as online catalogs, shopping carts, secure payment gateways, and order processing systems to facilitate transactions between buyers and sellers. E-commerce has transformed the way businesses operate and how consumers shop, offering convenience, accessibility, and a global marketplace for products and services.',
  },
};

export const Skills = () => {
  const { t } = useTranslate();
  const [filter, setFilter] = useState<{
    types?: SkillType[];
  }>({
    types: [SkillType.FrontEnd],
  });

  return (
    <div className='w-full px-2 py-4'>
      <TitleText content='SKILLS' />
      <div className='w-full flex flex-col italic text-text mt-3 p-4  rounded-lg pr-6'>
        <div className='flex flex-row justify-center'>
          <ButtonGroup className='scale-[40%] sm:scale-50 md:scale-100'>
            {Object.keys(SkillType).map((key: string) => {
              return (
                <Button
                  key={key}
                  className={
                    filter.types?.includes(
                      SkillType[key as keyof typeof SkillType]
                    )
                      ? ''
                      : 'text-text-active'
                  }
                  onClick={() => {
                    const findIndex = filter.types?.findIndex(
                      v => v === SkillType[key as keyof typeof SkillType]
                    );
                    if (findIndex !== undefined && findIndex >= 0) {
                      setFilter(prev => ({
                        ...prev,
                        types: prev.types?.filter(
                          v => v !== SkillType[key as keyof typeof SkillType]
                        ),
                      }));
                    } else {
                      setFilter(prev => ({
                        ...prev,
                        types: [
                          ...(prev.types || []),
                          SkillType[key as keyof typeof SkillType],
                        ],
                      }));
                    }
                  }}
                >
                  {t(SkillType[key as keyof typeof SkillType])}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
        <GridView
          gap='2'
          classes={{
            container:
              'mt-8 overflow-x-hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          }}
        >
          {Object.keys(skillData)
            .map((key: string) => skillData[key as keyof typeof skillData])
            .filter((skillItem: SkillItem) => {
              return !!filter.types?.find(t => skillItem.types.includes(t));
            })
            .map((item: SkillItem) => {
              return (
                <Card
                  renderImage={() => {
                    return (
                      <div className='w-full flex flex-row justify-center p-2 py-4'>
                        {item.image()}
                      </div>
                    );
                  }}
                  rating={{
                    point: item.rating,
                    baseOn: item.ratingDetail,
                  }}
                  key={item.key}
                  title={item.key}
                  description={item.shortDescription}
                />
              );
            })}
        </GridView>
      </div>
    </div>
  );
};
