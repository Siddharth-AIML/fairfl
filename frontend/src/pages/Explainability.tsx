import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sparkles } from "lucide-react";
import { getExplainability } from "@/api";

export default function Explainability() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  const handleRun = async () => {
    setLoading(true);

    try {
      const res = await getExplainability();

      if (res.error) {
        alert("Run explainability from backend first");
      } else {
        setData(res);
        setRan(true);
      }
    } catch (err) {
      console.error(err);
      alert("Error running explainability");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Explainability</h1>
          <p className="text-muted-foreground text-sm">
            Understand model decisions
          </p>
        </div>

        {/* Button */}
        <Button
          onClick={handleRun}
          className="gap-2"
          disabled={loading}
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Running..." : "Run Explainability"}
        </Button>

        {/* Feature Importance */}
        <SectionCard title="Feature Importance">

          {!ran ? (
            <p className="text-muted-foreground text-sm">
              Click "Run Explainability" to generate results
            </p>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

        </SectionCard>

        {/* SHAP */}
        <SectionCard title="SHAP Summary">

          {!ran ? (
            <div className="h-40 flex items-center justify-center text-muted-foreground">
              Run explainability to view SHAP plot
            </div>
          ) : (
            <img
              src="http://127.0.0.1:8000/static/shap_summary.png"
              alt="SHAP"
              className="rounded-lg border"
            />
          )}

        </SectionCard>

      </div>
    </DashboardLayout>
  );
}