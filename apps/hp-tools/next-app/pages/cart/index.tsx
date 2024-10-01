import Head from "next/head";
import { lazy, Suspense } from "react";
import AuthenProvider from "src/components/AuthenProvider";
import LoadingPage from "src/components/LoadingPage";
import useLocalize from "src/hooks/useLocalize";

const CartScreen = lazy(() => import("src/screens/Cart"));

const CartPage = () => {
  const { t } = useLocalize();
  return (
    <>
      <Head>
        <title>Công cụ hỗ trợ kỹ thuật, cơ khí chất lượng cao - HPTool</title>
        <meta
          name="description"
          content="HPTool cung cấp các công cụ hỗ trợ kỹ thuật, cơ khí chất lượng cao, bao gồm các loại máy móc, đồ nghề hổ trợ - ô tô, thiết bị điện tử, máy hàn, máy cắt, máy trộn, máy khoan,... chính hãng Michelin, milwaukee  v.v."
        />
        <meta
          name="keywords"
          content="công cụ hỗ trợ kỹ thuật, công cụ cơ khí, máy hàn, máy bơm, máy khoan, oto, ô tô, đồng hồ đo áp suất, máy mài, máy cắt, máy chà nhám, máy đánh bóng, máy cưa, máy phay, máy thổi, máy hút bụi. máy phun xịt, súng bắn keo, máy dầm, máy uốn, đèn chiếu,  máy cưa, máy cắt, máy tỉa hàng rào, khóa lục giác, bút thử điện, xà beng, vít, đĩa cắt, con đội"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AuthenProvider roles={[]}>
        <Suspense fallback={<LoadingPage />}>
          <CartScreen />
        </Suspense>
      </AuthenProvider>
    </>
  );
};

export default CartPage;
