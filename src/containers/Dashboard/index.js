import { Home } from "react-feather";
import { PageTitle } from "../../components/PageTitle";

function Dashboard() {
  return (
    <>
      <Home size={"3rem"} />
      <PageTitle title={`Dashboard Page`} />
    </>
  );
}

export default Dashboard;
