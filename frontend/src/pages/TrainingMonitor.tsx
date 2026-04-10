import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SectionCard } from "@/components/SectionCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw, Layers } from "lucide-react";
import { getClients, aggregateModel } from "@/api";

export default function TrainingMonitor() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();

      // 🔥 Convert backend data → UI format
      const formatted = data.map((c: any) => ({
        id: c.client_id,
        status: c.num_samples > 0 ? "Submitted" : "Pending",
        samples: c.num_samples,
      }));

      setClients(formatted);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const submitted = clients.filter((c) => c.status === "Submitted").length;

  const handleAggregate = async () => {
    try {
      const res = await aggregateModel();
      alert(res.message);
    } catch (err) {
      console.error(err);
      alert("Aggregation failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Training Monitor
          </h1>
          <p className="text-muted-foreground text-sm">
            Monitor federated learning rounds
          </p>
        </div>

        {/* Progress */}
        <SectionCard
          title="Round Progress"
          description={`${submitted} of ${clients.length} clients submitted`}
        >
          <Progress
            value={
              clients.length > 0
                ? (submitted / clients.length) * 100
                : 0
            }
            className="h-3 bg-muted [&>div]:bg-secondary"
          />
        </SectionCard>

        {/* Table */}
        <SectionCard title="Client Status">
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Samples</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {clients.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-sm">
                      {c.id}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          c.status === "Submitted"
                            ? "bg-green-500/15 text-green-500"
                            : "bg-yellow-500/15 text-yellow-500"
                        }`}
                      >
                        {c.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      {c.samples || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </SectionCard>

        {/* Buttons */}
        <div className="flex gap-3">

          <Button
            onClick={async () => {
    const res = await aggregateModel();
    alert(res.message || res.error);}}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Layers className="h-4 w-4" />
            Aggregate Model
          </Button>

          <Button
            onClick={fetchClients}
            variant="outline"
            className="gap-2 border-border text-foreground hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

        </div>

      </div>
    </DashboardLayout>
  );
}