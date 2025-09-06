import { Link, Outlet } from "react-router-dom";

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <nav>
      <Link to="contact">Contact</Link>
    </nav>
    <hr />
    <Outlet />
  </div>
);

export default Dashboard;
