import Flex from "src/components/common/Flex";
import useSelector from "src/hooks/useSelector";

interface FooterProps {}

const Footer = (props: FooterProps) => {
  const footerState = useSelector((state) => state.footer);

  return <Flex></Flex>;
};

export default Footer;
