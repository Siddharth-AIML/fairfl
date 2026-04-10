import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload, CheckCircle } from "lucide-react";
import { submitClientUpdate, getMyData, downloadGlobalModel } from "@/api";

export default function ClientPanel() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    client_id: user?.email || "",
    organization: user?.organization || "",
    num_samples: "",
    demographic_parity: "",
    group0_accuracy: "",
    group1_accuracy: "",
    pos_rate_g0: "",
    pos_rate_g1: ""
  });

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // ==============================
  // 🔥 Fetch previous submission
  // ==============================
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const data = await getMyData(user.email);
        if (data && !data.message) {
          setStatus(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==============================
  // 🚀 Submit Model
  // ==============================
  const handleSubmit = async () => {

    if (!file) {
      alert("Please upload model file");
      return;
    }

    // 🔥 validate file type
    if (!file.name.endsWith(".pt")) {
      alert("Only .pt files are allowed");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("file", file);

    try {
      const res = await submitClientUpdate(formData);
      alert(res.message);

      // refresh status
      const updated = await getMyData(user.email);
      setStatus(updated);

      // 🔥 reset form (except client info)
      setForm({
        ...form,
        num_samples: "",
        demographic_parity: "",
        group0_accuracy: "",
        group1_accuracy: "",
        pos_rate_g0: "",
        pos_rate_g1: ""
      });

      setFile(null);

    } catch (err) {
      console.error(err);
      alert("Error submitting update");
    }

    setLoading(false);
  };

  // ==============================
  // 📥 Download Global Model
  // ==============================
  const handleDownload = async () => {
    setDownloading(true);

    try {
      await downloadGlobalModel();
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }

    setDownloading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-bold">Client Panel</h1>
          <p className="text-muted-foreground text-sm">
            Submit your local model and fairness metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ==============================
              DOWNLOAD MODEL
          ============================== */}
          <SectionCard title="Download Model">
            <div className="flex flex-col items-center gap-4 py-4">

              <p className="text-sm text-muted-foreground">
                Download latest global model
              </p>

              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {downloading ? "Downloading..." : "Download Model"}
              </Button>

            </div>
          </SectionCard>

          {/* ==============================
              UPLOAD SECTION
          ============================== */}
          <SectionCard title="Upload Model Update" className="lg:col-span-2">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <Label>Model File (.pt)</Label>
                <Input
                  type="file"
                  accept=".pt"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div>
                <Label>Samples</Label>
                <Input name="num_samples" onChange={handleChange} />
              </div>

              <div>
                <Label>Demographic Parity</Label>
                <Input name="demographic_parity" onChange={handleChange} />
              </div>

              <div>
                <Label>Group 0 Accuracy</Label>
                <Input name="group0_accuracy" onChange={handleChange} />
              </div>

              <div>
                <Label>Group 1 Accuracy</Label>
                <Input name="group1_accuracy" onChange={handleChange} />
              </div>

              <div>
                <Label>Positive Rate G0</Label>
                <Input name="pos_rate_g0" onChange={handleChange} />
              </div>

              <div>
                <Label>Positive Rate G1</Label>
                <Input name="pos_rate_g1" onChange={handleChange} />
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {loading ? "Submitting..." : "Submit Update"}
                </Button>
              </div>

            </div>

          </SectionCard>
        </div>

        {/* ==============================
            STATUS SECTION
        ============================== */}
        {status && !status.message && (
          <SectionCard title="Your Latest Submission">

            <div className="flex items-center gap-4 py-2">
              <CheckCircle className="h-8 w-8 text-green-500" />

              <div>
                <p className="font-semibold">Uploaded Successfully</p>

                <p className="text-sm text-muted-foreground">
                  DP: {status.dp} | Samples: {status.num_samples}
                </p>

                <p className="text-xs text-muted-foreground">
                  Updated: {new Date(status.updated_at).toLocaleString()}
                </p>
              </div>
            </div>

          </SectionCard>
        )}

      </div>
    </DashboardLayout>
  );
}