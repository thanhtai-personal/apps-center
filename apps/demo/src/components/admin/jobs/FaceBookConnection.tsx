import { useGlobalStyles } from "@/styles/globalStyle";
import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";
import FacebookLogin from 'react-facebook-login';

const fbApiVersion = "v20.0"
const fbAppId = "1058569359238393"

export const FacebookConnection = observer(() => {
  const state = useLocalObservable(() => ({
    isLoggedIn: false,
    fbUserData: {} as any,
    selectedGroups: [] as any[],
    selectedPages: [] as any[],
    postContent: '',
  }))
  const globalStyles = useGlobalStyles();

  const responseFacebook = (response) => {
    if (response.status === 'connected') {
      state.isLoggedIn = true;
      state.fbUserData = { token: response.authResponse.accessToken }
      localStorage.setItem('fb-token', response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
    } else {
    }
  };

  const postGroup = async (selectedGroup) => {
    try {
      const response = await fetch(`https://graph.facebook.com/${fbApiVersion}/${selectedGroup}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.fbUserData.token}`,
        },
        body: JSON.stringify({
          message: state.postContent,
        }),
      });
      const data = await response.json();
      console.log('Post to group:', data);
    } catch (error) { }
  }

  const postPage = async (selectedPage) => {
    try {
      const response = await fetch(`https://graph.facebook.com/${fbApiVersion}/${selectedPage}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.fbUserData.token}`,
        },
        body: JSON.stringify({
          message: state.postContent,
        }),
      });
      const data = await response.json();
      console.log('Post to page:', data);
    } catch (error) { }
  }

  const postFeed = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/${fbApiVersion}/me/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.fbUserData.token}`,
        },
        body: JSON.stringify({
          message: state.postContent,
        }),
      });
      const data = await response.json();
    } catch (error) {

    }
  }

  const autoPost = async () => {
    try {
      if (state.isLoggedIn && state.fbUserData?.token && state.postContent) {
        for (const group of state.selectedGroups) {
          await postGroup(group);
        }
        for (const page of state.selectedPages) {
          await postPage(page);
        }
        postFeed()
      } else {
      }
    } catch (error) {
      console.error('Error posting to Facebook:', error);
    }
  };

  return (
    <Flex centerY mt={1}>
      {!state.isLoggedIn ? <FacebookLogin
        appId={fbAppId}
        autoLoad
        callback={responseFacebook}
        fields="name,email,picture"
        icon="fa-facebook"
        cssClass="custom-button"
        render={renderProps => (
          <OutlinedButton style={{ padding: "16px" }} onClick={renderProps.onClick}>
            <Text className={globalStyles.textOrbiBold18}>Login facebook</Text>
          </OutlinedButton>
        )}
      /> : <OutlinedButton style={{ padding: "16px" }} onClick={autoPost}>
        <Text className={globalStyles.textOrbiBold18}>Post facebook</Text>
      </OutlinedButton>}
    </Flex>)
})