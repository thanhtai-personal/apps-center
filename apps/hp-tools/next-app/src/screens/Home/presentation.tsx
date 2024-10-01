import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import Slider from "./components/Slider";
import Branchs from "./components/Branchs";
import Categories from "./components/Categories";
import MultilpleCategory from "./components/MultipleCategories";
import useSelector from "src/hooks/useSelector";
import HomeConfig from "./components/HomeConfig";
import ObserverLoadingContainer from "src/components/common/ObservableLoadingContainer";
import LoadingPage from "src/components/LoadingPage";

const HomePresentation = (props) => {
  const { t } = useLocalize();
  const { authUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.home);

  return (
    <>
      {loading ? (
        <Flex className="page-container">
          <LoadingPage />
        </Flex>
      ) : (
        <div className="page-container">
          <Flex width={"100%"}>
            <ObserverLoadingContainer faceOnly once>
              <Slider />
            </ObserverLoadingContainer>
          </Flex>
          <Flex width={"100%"}>
            <ObserverLoadingContainer once>
              <Branchs />
            </ObserverLoadingContainer>
          </Flex>
          <Flex width={"100%"}>
            <ObserverLoadingContainer once>
              <Categories />
            </ObserverLoadingContainer>
          </Flex>
          <Flex width={"100%"}>
            <MultilpleCategory />
          </Flex>
        </div>
      )}
      {authUser?.roleName?.toLowerCase() === "superadmin" && (
        <Flex position={"fixed"} right={0} zIndex={99999}>
          <HomeConfig />
        </Flex>
      )}
    </>
  );
};

export default HomePresentation;
