import { DashboardLayout } from "@/components/DashboardLayout";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Square } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm">Configure your federated learning parameters</p>
        </div>

        <SectionCard title="Training Configuration">
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Fairness Threshold (DP)</Label>
              <Input type="number" step="0.01" defaultValue="0.10" className="mt-1 bg-muted border-border max-w-xs" />
            </div>
            <div>
              <Label className="text-muted-foreground">Number of Rounds</Label>
              <Input type="number" defaultValue="20" className="mt-1 bg-muted border-border max-w-xs" />
            </div>
          </div>
        </SectionCard>

        <div className="flex gap-3">
          <Button className="gap-2 bg-success text-success-foreground hover:bg-success/90">
            <Play className="h-4 w-4" /> Start Training
          </Button>
          <Button variant="outline" className="gap-2 border-danger/30 text-danger hover:bg-danger/10">
            <Square className="h-4 w-4" /> Stop Training
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
