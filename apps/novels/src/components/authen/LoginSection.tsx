import { useStore } from "@/store/index"
import { Layers } from "@/styles/layers"
import { Animates } from "@core-ui/react-animates"
import { observer } from "@core-ui/react-mobx-state"
import { Flex } from "@core-ui/react-mui-core"
import { useNovelsStore } from "@core-ui/react-novels"
import { SocialsLogin } from "@core-utils/react-social-login"

export interface ILoginProps {

}

export const LoginSection = observer(({ }: ILoginProps) => {

  const { uiStore } = useStore();
  const { accountStore } = useNovelsStore();

  return <Flex width={"100vw"} height={"100vh"} zIndex={Layers.modalLayer} center bgcolor={"rgba(0,0,0, 0.9)"}
    position={"fixed"}
    style={{
      backdropFilter: "4px",
    }}
  >
    <Flex fullSize center onClick={() => { uiStore.openLoginSection = false }}>
      <Flex>
        <Animates.FadeAppear>
          <Flex fullWidth maxWidth={1200} minWidth={600} p={2} center bgcolor={uiStore.colors.white} borderRadius={"16px"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <SocialsLogin children={undefined}
              config={{
                useGoogle: true,
                ggAppId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                useTwitter: true,
                useFacebook: true,
                redirectUrl: import.meta.env.VITE_BASE_URL,
              }}
              startLogin={async () => {
                accountStore.requestLoginSent = true;
              }}
              logout={async () => {
                accountStore.account = undefined;
              }}
              loginSuccess={async (provider: string, profile: any) => {
                accountStore.socialData = profile;
                accountStore.requestLoginSent = false;
              }}
              loginFailed={async (err: any) => {
                accountStore.account = undefined;
                accountStore.requestLoginSent = false;
              }} />
          </Flex>
        </Animates.FadeAppear>
      </Flex>
    </Flex>
  </Flex>
})