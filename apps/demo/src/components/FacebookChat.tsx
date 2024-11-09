import { Flex } from "@core-ui/react-mui-core";
import facebookIcon from "@/assets/icons/facebook.png"
import { useGlobalStyles } from "@/styles/globalStyle";

const FacebookChat = () => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex centerY className={globalStyles.hoverTransition}>
      <a target="_blank" href="https://m.me/476522792200296">
        <img src={facebookIcon} alt="Messenger me!" style={{
          width: 40,
          borderRadius: 8
        }} />
      </a>
    </Flex>
  );
};

export default FacebookChat;
