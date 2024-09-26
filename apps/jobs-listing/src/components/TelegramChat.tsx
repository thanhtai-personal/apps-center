import { Flex } from "@core-ui/react-mui-core";
import teleIcon from "@/assets/icons/telegram.png"
import { useGlobalStyles } from "@/styles/globalStyle";

const TelegramChat = () => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex centerY className={globalStyles.hoverTransition}>
      <a target="_blank" href="https://t.me/jobs_everyday_bot">
        <img src={teleIcon} alt="Telegram me!" style={{
          width: 40,
          borderRadius: 8
        }} />
      </a>
    </Flex>
  );
  
};
export default TelegramChat;
