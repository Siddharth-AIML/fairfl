import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import { getClients } from "@/api";

export default function FairnessAnalysis() {
  const [clients, setClients] = useState<any[]>([]);
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

  // 🔥 Prepare chart data
  const dpData = clients.map((c) => ({
    client: c.client_id,
    dp: c.dp || 0,
  }));

  // 🔥 Prepare accuracy table
  const groupAccuracy = clients.map((c) => ({
    client: c.client_id,
    g0: c.group_accuracy?.g0 || 0,
    g1: c.group_accuracy?.g1 || 0,
  }));

  // 🔥 Global DP
  const globalDP =
    clients.length > 0
      ? (
          clients.reduce((sum, c) => sum + (c.dp || 0), 0) /
          clients.length
        ).toFixed(3)
      : "0";

  // 🔥 Worst client
  const worstClient =
    clients.length > 0
      ? clients.reduce((max, c) => (c.dp > max.dp ? c : max), clients[0])
      : null;

  // 🔥 Average accuracy
  const avgAccuracy =
    clients.length > 0
      ? (
          clients.reduce(
            (sum, c) =>
              sum +
              ((c.group_accuracy?.g0 || 0) +
                (c.group_accuracy?.g1 || 0)) /
                2,
            0
          ) / clients.length
        ).toFixed(3)
      : "0";

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Fairness Analysis
          </h1>
          <p className="text-muted-foreground text-sm">
            Evaluate bias across clients
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <StatCard
            label="Global DP"
            value={globalDP}
            accent="warning"
          />

          <StatCard
            label="Worst Client"
            value={
              worstClient
                ? `${worstClient.client_id} (${worstClient.dp})`
                : "-"
            }
            accent="danger"
          />

          <StatCard
            label="Avg Accuracy"
            value={avgAccuracy}
            accent="success"
          />

        </div>

        {/* Chart */}
        <SectionCard title="Demographic Parity per Client">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dpData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="client" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dp" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Table */}
        <SectionCard title="Group Accuracy per Client">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Group 0</TableHead>
                <TableHead className="text-right">Group 1</TableHead>
                <TableHead className="text-right">Gap</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {groupAccuracy.map((r) => {
                const gap = r.g0 - r.g1;

                return (
                  <TableRow key={r.client}>
                    <TableCell>{r.client}</TableCell>

                    <TableCell className="text-right">
                      {r.g0}
                    </TableCell>

                    <TableCell className="text-right">
                      {r.g1}
                    </TableCell>

                    <TableCell className="text-right">
                      <span
                        className={
                          gap > 0.08
                            ? "text-red-500 font-semibold"
                            : ""
                        }
                      >
                        {gap.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SectionCard>

        {/* Bias Alert */}
        {worstClient && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />

            <div>
              <p className="font-semibold text-red-500">
                Bias Alert
              </p>

              <p className="text-sm">
                {worstClient.client_id} has highest bias (DP:{" "}
                {worstClient.dp})
              </p>

              <Button
  variant="outline"
  size="sm"
  className="mt-2"
  onClick={() =>
    window.open("https://fair-view-eosin.vercel.app", "_blank","noopener,noreferrer")
  }
>
  Open Debug Module
</Button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}