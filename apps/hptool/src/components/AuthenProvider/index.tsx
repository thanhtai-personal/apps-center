import { getAuthData } from "src/actions/auth.actions";
import { useEffect, useState } from "react";
import UnauthorizePage from "./Unauthorize";
import { isEmpty } from "lodash";
import useSelector from "src/hooks/useSelector";
import LoadingFallback from "src/components/LoadingFallback";
import { useRouter } from "next/router";

interface AutheProps {
  roles?: Array<any>; //what roles is access to children page
  children: any;
}

const AuthenProvider = (props: AutheProps) => {
  const { roles = [] } = props;
  const [isAuthen, setAuthen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    getAuthData(router);
  }, []);

  useEffect(() => {
    if (
      isEmpty(roles) ||
      roles.includes(auth.authUser?.roleName?.toLowerCase())
    ) {
      setAuthen(true);
    } else {
      setAuthen(false);
    }
  }, [auth]);

  if (auth.loading) return <LoadingFallback />;

  if (isAuthen) return props.children;

  return <UnauthorizePage />;
};

export default AuthenProvider;
