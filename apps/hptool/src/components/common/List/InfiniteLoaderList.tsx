import { useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Flex from "../Flex";
import ListItem from "./ListItem";

interface InfiniteLoaderListProps {
  // (This information comes from the most recent API request.)
  hasNextPage?: boolean;
  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading?: boolean;
  // Array of items loaded so far.
  items: Array<any>;
  // Callback function responsible for loading the next page of items.
  loadNextPage?: any;
  sortOrder?: "asc" | "desc" | string;
  renderItem?: any;
  renderedItem?: any;
  renderLoading?: any;
  renderedLoading?: any;
  id: string;
}

const InfiniteLoaderList = (props: InfiniteLoaderListProps) => {
  const {
    hasNextPage,
    isNextPageLoading,
    items,
    loadNextPage,
    sortOrder,
    renderItem,
    renderedItem,
    renderLoading,
    renderedLoading,
    id,
  } = props;

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  // We create a reference for the InfiniteLoader
  const infiniteLoaderRef = useRef(null);
  const hasMountedRef = useRef(false);

  // Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
  useEffect(() => {
    // We only need to reset cached items when "sortOrder" changes.
    // This effect will run on mount too; there's no need to reset in that case.
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        infiniteLoaderRef.current.resetloadMoreItemsCache();
      }
    }
    hasMountedRef.current = true;
  }, [sortOrder]);

  return (
    <Flex id={id} width={"100%"} height={"100%"}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            ref={ref}
            {...props}
          >
            {ListItem({
              items,
              render: renderItem,
              renderedItem,
              hasNextPage,
              total: (items || []).length,
              renderLoading,
              renderedLoading,
            })}
          </List>
        )}
      </InfiniteLoader>
    </Flex>
  );
};

export default InfiniteLoaderList;
