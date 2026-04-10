import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";
import { SectionCard } from "@/components/SectionCard";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, RefreshCw, Scale } from "lucide-react";
import { getClients } from "@/api";

export default function Dashboard() {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Derived values
  const totalClients = clients.length;
  const activeClients = clients.length; // assume all submitted
  const currentRound = 7; // later connect backend
  const globalDP =
    clients.length > 0
      ? (
          clients.reduce((sum, c) => sum + (c.dp || 0), 0) /
          clients.length
        ).toFixed(3)
      : 0;

  const progress = totalClients > 0
    ? (activeClients / totalClients) * 100
    : 0;

  // 🔥 Risk logic
  const getRisk = () => {
    if (globalDP < 0.05) return "LOW";
    if (globalDP < 0.1) return "MEDIUM";
    return "HIGH";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Overview of your federated learning system
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            label="Total Clients"
            value={totalClients}
            accent="primary"
            icon={<Users className="h-5 w-5" />}
          />

          <StatCard
            label="Active Clients"
            value={activeClients}
            accent="secondary"
            icon={<UserCheck className="h-5 w-5" />}
          />

          <StatCard
            label="Current Round"
            value={currentRound}
            accent="success"
            icon={<RefreshCw className="h-5 w-5" />}
          />

          <StatCard
            label="Global DP"
            value={globalDP}
            accent="warning"
            icon={<Scale className="h-5 w-5" />}
          />
        </div>

        {/* Middle */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Overview */}
          <SectionCard
            title="Federated Learning Overview"
            className="lg:col-span-2"
          >
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span className="font-semibold text-secondary">
                  {activeClients} / {totalClients}
                </span>
              </div>

              <Progress value={progress} className="h-3" />

              <p className="text-xs text-muted-foreground">
                Round {currentRound} — {progress.toFixed(1)}% complete
              </p>
            </div>
          </SectionCard>

          {/* Risk */}
          <SectionCard title="Risk Level">
            <div className="flex flex-col items-center justify-center py-6 gap-4">
              <RiskBadge level={getRisk()} size="lg" />
              <p className="text-xs text-muted-foreground text-center">
                Based on global fairness score
              </p>
            </div>
          </SectionCard>
        </div>

        {/* Recent Activity */}
        <SectionCard title="Recent Activity">

          {loading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : (
            <div className="space-y-3">
              {clients.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b pb-2"
                >
                  <span className="text-sm">
                    {c.client_id} submitted update
                  </span>
                  <span className="text-xs text-muted-foreground">
                    DP: {c.dp}
                  </span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

      </div>
    </DashboardLayout>
  );
}