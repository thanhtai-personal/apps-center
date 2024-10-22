import { AuthStore } from "./AuthStore";

export class AuthStore {
  public authStore: AuthStore;

  public constructor() {
    this.authStore = new AuthStore();
  }
}

export const authStore = createStore<AuthStore>(new AuthStore());

export const useAuthStore = authStore.useStore as () => AuthStore;

const Provider = authStore.Provider;

export const JobsListingProvider = ({ children, config }: {
  children: ReactNode;
  config: {
    apiConfig: CreateApiConfig;
  }
}) => {
  
  useEffect(() => {
    appCenterSDK.getInstance(config.apiConfig)
  }, [])

  return <Provider>
    {children}
  </Provider>
}
export * from "./NotifyStore"
export * from "./AuthStore"