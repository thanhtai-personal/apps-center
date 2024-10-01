import Flex from "src/components/common/Flex";
import SettingsIcon from "@material-ui/icons/Settings";
import { useCallback, useEffect, useState } from "react";
import { Collapse } from "@material-ui/core";
import Text from "src/components/common/Text";
import { useGlobalStyle } from "src/styles";
import MuiForm from "src/components/common/Form";
import homeModel from "./model.home";
import { updateUIconfigData } from "src/actions/home.actions";
import { NotiStackInstance } from "pages/_app";

const HomeConfig = (props) => {
  const [openConfig, setOpenConfig] = useState(false);
  const globalClasses = useGlobalStyle(props);

  const handleCreateUIconfig = useCallback(() => {}, []);

  useEffect(() => {
    NotiStackInstance.dangerousSetState({
      vertical: "top",
      horizontal: "left",
    });
    return () => {
      NotiStackInstance.dangerousSetState({
        vertical: "top",
        horizontal: "right",
      });
    };
  }, []);

  return (
    <Flex
      p={2}
      width={"100%"}
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 10,
      }}
    >
      <Flex
        mt={4}
        cursor={"pointer"}
        width={40}
        height={40}
        bgcolor={"gray"}
        center
        style={{
          borderTopLeftRadius: "12.5%",
          borderBottomLeftRadius: "12.5%",
        }}
        onClick={() => {
          setOpenConfig((prev) => {
            updateUIconfigData({
              name: "loading",
              value: !prev,
            });
            return !prev;
          });
        }}
      >
        <SettingsIcon style={{ width: 32, height: 32 }} />
      </Flex>
      <Collapse in={openConfig}>
        {openConfig && (
          <Flex
            column
            mt={2}
            width={"100%"}
            bgcolor={"#fff"}
            boxShadow={
              "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)"
            }
          >
            <Flex width={"100%"} column center maxWidth={700} mt={4}>
              <Text className={globalClasses.textTitle}>Home page config</Text>
              <Flex
                width={"100%"}
                style={{
                  height: "calc(100vh - 70px)",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <MuiForm model={homeModel} onSubmit={handleCreateUIconfig} />
              </Flex>
            </Flex>
          </Flex>
        )}
      </Collapse>
    </Flex>
  );
};

export default HomeConfig;
