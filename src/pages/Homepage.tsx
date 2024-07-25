import React from "react";

const Homepage = () => {
  const loginHandler = () => {
    const apiUrl = import.meta.env.VITE_UPSTOCK_LOGIN_API_URL;
    const upstockClientId = "18da9559-9808-4895-8594-97cf1d9fe8b9";
    const redirectUrl = "http://localhost:5173/login";
    const responseType = "code";
    window.location.href = `${apiUrl}/v2/login/authorization/dialog?client_id=${upstockClientId}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}&response_type=${responseType}`;
  };

  const accessToken = localStorage.getItem("accessToken");

  console.log(accessToken?.length, "accessToken");

  return accessToken?.length ? (
    <div>
      <a  href="/stocks">Get Live Data</a>
    </div>
  ) : (
    <button onClick={() => loginHandler()}>Login</button>
  );
};

export default Homepage;
