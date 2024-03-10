import DashboardShell from "~/components/containers/DashboardShell";

interface DashboardLayout {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayout) {
  return(
    <DashboardShell>
        {children}
    </DashboardShell>
  )
}
