import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useGetAccessTokenMutation } from "../store/api/upstockApi";
import { useEffect } from "react";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [getAccessToken, { isLoading }] = useGetAccessTokenMutation();
  const code = searchParams.get("code");

  const accessTokenHandler = async (upstockCode: string) => {
    try {

        const payload = {
            code: upstockCode,
            client_id: '18da9559-9808-4895-8594-97cf1d9fe8b9',
            client_secret: "0lhkkx4yu3",
            redirect_uri: "http://localhost:5173/login",
            grant_type: "authorization_code",
          };
          const response = await getAccessToken(payload).unwrap();
          localStorage.setItem('accessToken',response.access_token)
          return navigate("/")

    } catch(e){
        return navigate("/");
    }


  };

  useEffect(() => {
    if (code) {
      accessTokenHandler(code);
    }
  }, [code]);

  if (!code) return <Navigate to="/" />;
  return isLoading ? <div>Loding</div> : <></>;
};

export default Login;
