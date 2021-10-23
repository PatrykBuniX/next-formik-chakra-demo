import type { NextPage } from "next";
import { Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { DashbordView } from "../views/DashboardView";
import { LoggedInDashboard } from "../components/dashboard/LoggedInDashboard";
import { LoggedOutDashboard } from "../components/dashboard/LoggedOutDashboard";
import { LoadingDashboard } from "../components/dashboard/LoadingDashboard";

const Home: NextPage = () => {
  const { accessToken, isLoading } = useAuth();

  return (
    <DashbordView>
      <Heading size="2xl">Next.js + Formik + Chakra UI</Heading>
      {isLoading ? (
        <LoadingDashboard />
      ) : accessToken ? (
        <LoggedInDashboard />
      ) : (
        <LoggedOutDashboard />
      )}
    </DashbordView>
  );
};

export default Home;
