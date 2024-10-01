import { getAuthData } from "actions/auth.actions";
import { useEffect, useState } from "react";
import UnauthorizePage from "./Unauthorize";
import { isEmpty } from "lodash";
import useSelector from "hooks/useSelector";
import LoadingFallback from "components/LoadingFallback";

interface AutheProps {
  roles?: Array<any>; //what roles is access to children page
  children: any;
}

const AuthenProvider = (props: AutheProps) => {
  const { roles = [] } = props;
  const [isAuthen, setAuthen] = useState(false);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    getAuthData();
  }, []);

  useEffect(() => {
    if (isEmpty(roles) || roles.includes(auth.role)) {
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
