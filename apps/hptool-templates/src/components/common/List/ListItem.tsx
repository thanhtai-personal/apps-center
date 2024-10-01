import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Flex from "components/common/Flex";

interface ListItemProps {
  items?: Array<any>;
  render?: any;
  renderedItem?: any;
  hasNextPage?: boolean;
  total?: number;
  renderLoading?: any;
  renderedLoading?: any;
}

const ListItem = (props: ListItemProps) => {
  const {
    items,
    render,
    renderedItem,
    hasNextPage,
    total,
    renderLoading,
    renderedLoading,
  } = props;

  return ({ index, style }) => {
    const { t } = useTranslation();
    const cachedT = useCallback((key: string) => t(key), [t]);

    const item = useMemo(() => items[index], [items, index]);

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = useMemo(
      () => !hasNextPage || index < total,
      [hasNextPage, total, index]
    );

    if (isItemLoaded) {
      if (renderedLoading) {
        return renderedLoading;
      }
      if (renderLoading) {
        return renderLoading(item);
      }
      return <Flex>{cachedT("Loading")}</Flex>;
    }

    if (renderedItem) {
      return renderedItem;
    }

    if (render) {
      return render(item);
    }

    return <Flex style={style}>{item}</Flex>;
  };
};

export default ListItem;
