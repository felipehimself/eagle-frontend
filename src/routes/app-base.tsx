import { SuspenseFallback } from "@/components/elements/suspense-fallback";
import { MainLayout } from "@/layouts/main-layout";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
export const AppBase = () => {
  return (
    <MainLayout>
      <Suspense fallback={<SuspenseFallback />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};
