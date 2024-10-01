import { Accordion as FlowBiteAccordion } from 'flowbite-react';
import { ReactNode } from 'react';

export interface IAccordion {
  children: ReactNode;
  title: string | ReactNode;
  collapseAll?: boolean;
}

export const Accordion = ({ children, title, collapseAll }: IAccordion) => {
  return (
    <FlowBiteAccordion collapseAll={collapseAll}>
      <FlowBiteAccordion.Panel>
        <FlowBiteAccordion.Title
          className={
            typeof title === 'string'
              ? ' text-white'
              : ''
          }
        >
          {title}
        </FlowBiteAccordion.Title>
        <FlowBiteAccordion.Content>{children}</FlowBiteAccordion.Content>
      </FlowBiteAccordion.Panel>
    </FlowBiteAccordion>
  );
};
