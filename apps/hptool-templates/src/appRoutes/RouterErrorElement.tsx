import ErrorComponent from "components/ErrorComponent";
import LoadingFallback from "components/LoadingFallback";
import { Suspense } from "react";

const ErrorContainer = (props) => {
  const { message = "Something happened while loading the page" } = props;
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorComponent message={message} />
    </Suspense>
  );
};

export default ErrorContainer;
