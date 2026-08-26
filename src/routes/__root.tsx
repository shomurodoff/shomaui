import { Outlet, createRootRoute } from "@tanstack/react-router";
import Providers from "#/providers";
import { MainLayout } from "#/layouts";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Providers>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Providers>
  );
}
