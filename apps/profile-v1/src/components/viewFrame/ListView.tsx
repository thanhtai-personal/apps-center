import { List } from 'flowbite-react';
import { ReactNode } from 'react';

export interface IListItem {
  key: string;
  className?: string;
  content?: ReactNode;
  isActive?: boolean;
  onClick?: (item?: IListItem) => void;
  onHover?: (item?: IListItem) => void;
}

export interface IListView {
  items?: IListItem[];
  classes?: {
    container?: string;
  };
  nested?: boolean;
  ordered?: boolean;
  unstyled?: boolean;
  horizontal?: boolean;
}

export const ListView = ({
  items = [],
  classes,
  nested,
  ordered,
  unstyled,
  horizontal,
}: IListView) => {
  const handleClickItem = (item: IListItem) => () => {
    item.onClick && item.onClick(item);
  };

  const handleHoverItem = (item: IListItem) => () => {
    item.onHover && item.onHover(item);
  };

  return (
    <List
      ordered={ordered}
      horizontal={horizontal}
      unstyled={unstyled}
      nested={nested}
      className={`${classes?.container}`}
    >
      {items.map((item, index) => (
        <List.Item key={item.key || `key-missing-${index}`}>
          {unstyled ? (
            <div
              className={`w-full h-full hover:cursor-pointer p-2 ${
                item.className
              } ${item.isActive && 'bg-[wheat]'}`}
              onClick={handleClickItem(item)}
              onMouseEnter={handleHoverItem(item)}
            >
              {item.content}
            </div>
          ) : (
            <span
              className={`p-2 ${item.className}`}
              onClick={handleClickItem(item)}
              onMouseEnter={handleHoverItem(item)}
            >
              {item.content}
            </span>
          )}
        </List.Item>
      ))}
    </List>
  );
};
