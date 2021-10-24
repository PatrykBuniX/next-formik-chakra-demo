import type { NextPage } from "next";
import { Heading } from "@chakra-ui/react";
import { DashbordView } from "../views/DashboardView";
import { LoggedInDashboard } from "../components/dashboard/LoggedInDashboard";
import { LoggedOutDashboard } from "../components/dashboard/LoggedOutDashboard";
import { LoadingDashboard } from "../components/dashboard/LoadingDashboard";
import { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../accessToken";
import { getAccessToken as fetchAccessToken } from "../apiHelpers/getAccessToken";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { accessToken } = await fetchAccessToken();
        setAccessToken(accessToken);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
      setIsLoading(false);
    };
    getToken();
  }, []);

  return (
    <DashbordView>
      <Heading size="2xl">Next.js + Formik + Chakra UI</Heading>
      {isLoading ? (
        <LoadingDashboard />
      ) : getAccessToken() ? (
        <LoggedInDashboard />
      ) : (
        <LoggedOutDashboard />
      )}
    </DashbordView>
  );
};

export default Home;
