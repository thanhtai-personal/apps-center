import Flex from "components/common/Flex";
import useSelector from "hooks/useSelector";

interface FooterProps {}

const Footer = (props: FooterProps) => {
  const footerState = useSelector((state) => state.footer);

  return <Flex></Flex>;
};

export default Footer;
