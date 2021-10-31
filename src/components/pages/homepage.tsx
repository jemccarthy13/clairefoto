import { AuthContext } from "../authcontext";
import Dashboard from "./protectedpages/dashboard";
import PublicHomePage from "./publicpages/homepage/homepage";

export default function HomePage() {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div>
          {context.auth && <Dashboard />}
          {!context.auth && <PublicHomePage />}
        </div>
      )}
    </AuthContext.Consumer>
  );
}
