import { Flex, Text } from "@core-ui/react-mui-core"
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react"
import * as Interfaces from "../interfaces"
import * as SocialLogin from 'reactjs-social-login'
import * as SocialLoginButtons from 'react-social-login-buttons'

export interface ISocialProviderProps {
  children: ReactNode;
  config: Interfaces.ISocialConfig;
  socialProps?: Interfaces.ITwitterProps
  & Interfaces.ITiktokProps
  & Interfaces.IPinterestProps
  & Interfaces.IMSProps
  & Interfaces.IAmazonProps
  & Interfaces.IAppleProps
  & Interfaces.IFacebookProps
  & Interfaces.IGithubProps
  & Interfaces.IInstagramProps
  & Interfaces.ILinkedInProps
  & Interfaces.IGoogleProps;
  startLogin: () => Promise<void>;
  logout: () => Promise<void>;
  loginSuccess: (provider: string, profile: any) => Promise<void>;
  loginFailed: (err: any) => Promise<void>;
  styles?: {
    container?: CSSProperties;
    loginCompoponent?: CSSProperties;
    buttonComponent?: CSSProperties;
  }
}

export const SocialsLogin = ({
  children,
  config,
  socialProps,
  startLogin,
  logout,
  loginSuccess,
  loginFailed,
  styles,
}: ISocialProviderProps) => {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState<any>()

  const onLoginStart = useCallback(() => {
    startLogin?.();
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('');
    logout?.();
  }, [])

  const onResolve = useCallback(({ provider, data }: SocialLogin.IResolveParams) => {
    setProvider(provider);
    setProfile(data);
    loginSuccess?.(provider, profile);
  }, [loginSuccess, profile])

  const onReject = useCallback((err: any) => {
    console.log(err);
    loginFailed?.(err);
  }, [])

  const renderSocialLogin = (
    LoginComponent: typeof SocialLogin.LoginSocialGoogle,
    ButtonComponent: typeof SocialLoginButtons.GoogleLoginButton,
    props: any
  ) => (
    <LoginComponent
      {...props}
      onLoginStart={onLoginStart}
      onLogoutSuccess={onLogoutSuccess}
      onResolve={onResolve}
      onReject={onReject}
      style={styles?.loginCompoponent || {}}
      {...socialProps}
    >
      <ButtonComponent
        style={styles?.buttonComponent || {}}
      />
    </LoginComponent>
  )

  return (
    <Flex fullWidth column style={styles?.container || {}}>
      {config.useFacebook && renderSocialLogin(SocialLogin.LoginSocialFacebook, SocialLoginButtons.FacebookLoginButton, {
        appId: config.fbAppId,
        fieldsProfile: 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender',
        redirect_uri: config.redirectUrl
      })}
      {config.useGoogle && renderSocialLogin(SocialLogin.LoginSocialGoogle, SocialLoginButtons.GoogleLoginButton, {
        client_id: config.ggAppId,
        redirect_uri: config.redirectUrl,
        scope: "openid profile email",
        discoveryDocs: "claims_supported",
        access_type: "offline"
      })}
      {config.useApple && renderSocialLogin(SocialLogin.LoginSocialApple, SocialLoginButtons.AppleLoginButton, {
        client_id: config.appleId,
        scope: 'name email',
        redirect_uri: config.redirectUrl
      })}
      {config.useAmazon && renderSocialLogin(SocialLogin.LoginSocialAmazon, SocialLoginButtons.AmazonLoginButton, {
        client_id: config.amazonAppId,
        redirect_uri: config.redirectUrl
      })}
      {config.useInstagram && renderSocialLogin(SocialLogin.LoginSocialInstagram, SocialLoginButtons.InstagramLoginButton, {
        client_id: config.instagramAppId,
        client_secret: config.instagramAppSecret,
        redirect_uri: config.redirectUrl
      })}
      {config.useMs && renderSocialLogin(SocialLogin.LoginSocialMicrosoft, SocialLoginButtons.MicrosoftLoginButton, {
        client_id: config.microsoftAppId,
        redirect_uri: config.redirectUrl
      })}
      {config.useLinkedin && renderSocialLogin(SocialLogin.LoginSocialLinkedin, SocialLoginButtons.LinkedInLoginButton, {
        client_id: config.linkedinAppId,
        client_secret: config.linkedinAppSecret,
        redirect_uri: config.redirectUrl
      })}
      {config.useGithub && renderSocialLogin(SocialLogin.LoginSocialGithub, SocialLoginButtons.GithubLoginButton, {
        client_id: config.githubAppId,
        client_secret: config.githubAppSecret,
        redirect_uri: config.redirectUrl
      })}
      {config.usePinterest && renderSocialLogin(SocialLogin.LoginSocialPinterest,
        () => (
          <Flex className="content">
            <Text className="txt">Login With Pinterest</Text>
          </Flex>
        ),
        {
          client_id: config.pinterestAppId,
          client_secret: config.pinterestAppSecret,
          redirect_uri: config.redirectUrl,
          className: "pinterest-btn"
        }
      )}
      {config.useTwitter && renderSocialLogin(SocialLogin.LoginSocialTwitter, SocialLoginButtons.TwitterLoginButton, {
        client_id: config.twitterAppId,
        redirect_uri: config.redirectUrl
      })}
      {children}
    </Flex>
  )
}