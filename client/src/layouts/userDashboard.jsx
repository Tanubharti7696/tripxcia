import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes, { userroutes } from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import UserSidenav from "@/widgets/layout/userSidenav";

export function UserDashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <UserSidenav
        routes={userroutes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>

          {
            userroutes.map(({ layout, pages }) => (
              layout === "userDashboard" && pages.map(({ hasDropdown, dropdown }) => (
                hasDropdown ? dropdown.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
                  : pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />

                  ))))

            )
            )

          }
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

UserDashboard.displayName = "/src/layout/UserDashboard.jsx";

export default UserDashboard;
