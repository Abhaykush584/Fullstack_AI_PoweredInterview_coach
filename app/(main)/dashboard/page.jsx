// app/dashboard/page.jsx
import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // ✅ This redirect now happens BEFORE any Suspense boundary
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto">
      <Suspense fallback={<Spinner />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

// ✅ Separate component for data fetching
async function DashboardContent() {
  const insights = await getIndustryInsights();
  return <DashboardView insights={insights} />;
}
