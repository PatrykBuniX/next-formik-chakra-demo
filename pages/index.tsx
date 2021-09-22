import type { NextPage } from "next";
import { Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { DashbordView } from "../views/DashboardView";
import { LoggedInDashboard } from "../components/dashboard/LoggedInDashboard";
import { LoggedOutDashboard } from "../components/dashboard/LoggedOutDashboard";

const Home: NextPage = () => {
  const { accessToken, setAccessToken } = useAuth();

  return (
    <DashbordView>
      <Heading size="2xl">Next.js + Formik + Chakra UI</Heading>
      {accessToken ? (
        <LoggedInDashboard accessToken={accessToken} logout={() => setAccessToken(null)} />
      ) : (
        <LoggedOutDashboard />
      )}
    </DashbordView>
  );
};

export default Home;
