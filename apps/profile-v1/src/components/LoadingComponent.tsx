import { Spinner } from "flowbite-react"

export interface ILoadingComponent {
  loadingPage?: boolean;
}

export const LoadingComponent = ({ loadingPage }: ILoadingComponent) => {

  return <div className={`flex justify-center items-center ${loadingPage ? "w-screen h-screen" : "w-full h-full"}`}>
    <Spinner />
  </div>
}