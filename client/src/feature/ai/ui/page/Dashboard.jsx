import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("googleLogin") !== "success") {
      return;
    }

    toast.success("Login successful");
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  return <div>Dashboard</div>;
};

export default Dashboard;