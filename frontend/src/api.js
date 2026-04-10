const BASE_URL = "http://127.0.0.1:8000";

export const submitClientUpdate = async (formData) => {
  const response = await fetch(`${BASE_URL}/client/submit`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const getClients = async () => {
  const response = await fetch(`${BASE_URL}/server/clients`);
  return response.json();
};

export const aggregateModel = async () => {
  const res = await fetch("http://127.0.0.1:8000/server/aggregate", {
    method: "POST"
  });

  return res.json();
};

export const runExplainability = async () => {
  const res = await fetch("http://127.0.0.1:8000/server/aggregate"); // or custom endpoint later
  return res.json();
};

export const getExplainability = async () => {
  const res = await fetch("http://127.0.0.1:8000/server/explainability");
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch("http://127.0.0.1:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getMyData = async (clientId) => {
  const res = await fetch(
    `http://127.0.0.1:8000/client/my-data/${clientId}`
  );
  return res.json();
};

export const downloadGlobalModel = async () => {
  const res = await fetch("http://127.0.0.1:8000/server/download-model");

  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "global_model.pt";
  document.body.appendChild(a);
  a.click();
  a.remove();
};