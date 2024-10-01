const InfiniteLoaderList = require("/InfiniteLoaderList");

export const ListTypes = {
  InfiniteLoaderList: "InfiniteLoaderList",
};

export const createListItems = (wrapperProps: any) => {
  const { type, ...nestedProps } = wrapperProps;

  return (props: any) => {
    switch (type) {
      case ListTypes.InfiniteLoaderList: {
        return <InfiniteLoaderList {...nestedProps} {...props} />;
      }
    }
    return <InfiniteLoaderList {...nestedProps} {...props} />;
  };
};

const List = {
  InfiniteLoaderList,
};

export default List;
