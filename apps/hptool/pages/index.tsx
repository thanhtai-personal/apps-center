import Head from "next/head";
import AuthenProvider from "src/components/AuthenProvider";
import useLocalize from "src/hooks/useLocalize";
import HomeScreen from "src/screens/Home";

const HomeComponent = () => {
  const { t } = useLocalize();
  return (
    <>
      <Head>
        <title>Công cụ hỗ trợ kỹ thuật, cơ khí chất lượng cao - HPTool</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AuthenProvider roles={[]}>
        <HomeScreen />
      </AuthenProvider>
    </>
  );
};

export default HomeComponent;