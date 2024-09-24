import { createStore } from "@core-ui/react-mobx-state"
import { UserStore } from "./UserStore"
import { RoleStore } from "./RoleStore"
import { CategoryStore } from "./CategoryStore"
import { NotifyStore } from "./NotifyStore"
import JobsListingSDK, { CreateApiConfig } from "@core-sdk/jobs-listing";
import { ReactNode, useEffect } from "react";
import { JobStore } from "./JobStore";

export class JobsListingStore {
  public userStore: UserStore;
  public roleStore: RoleStore;
  public categoryStore: CategoryStore;
  public notiStore: NotifyStore;
  public jobStore: JobStore;

  public constructor() {
    this.userStore = new UserStore();
    this.roleStore = new RoleStore();
    this.categoryStore = new CategoryStore();
    this.notiStore = new NotifyStore();
    this.jobStore = new JobStore();
  }
}

export const jobs-listingStore = createStore<JobsListingStore>(new JobsListingStore());

export const useJobsListingStore = jobs-listingStore.useStore as () => JobsListingStore;

const Provider = jobs-listingStore.Provider;

export const JobsListingProvider = ({ children, config }: {
  children: ReactNode;
  config: {
    apiConfig: CreateApiConfig;
  }
}) => {
  
  useEffect(() => {
    JobsListingSDK.getInstance(config.apiConfig)
  }, [])

  return <Provider>
    {children}
  </Provider>
}

export * from "./UserStore"
export * from "./RoleStore"
export * from "./CategoryStore"
export * from "./NotifyStore"
export * from "./JobStore"