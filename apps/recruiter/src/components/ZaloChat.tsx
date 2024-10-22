import { Flex } from "@core-ui/react-mui-core";
import zaloIcon from "@/assets/icons/zalo.png"
import { useGlobalStyles } from "@/styles/globalStyle";

const ZaloChat = () => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex centerY className={globalStyles.hoverTransition}>
      <a target="_blank" href="https://zalo.me/0972828264">
        <img src={zaloIcon} alt="Zalo me!" style={{
          width: 40,
          borderRadius: 8
        }} />
      </a>
    </Flex>
  );
};

export default ZaloChat;
