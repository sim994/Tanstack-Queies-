import React from "react";
import { Layout } from "./Layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <Layout />
    </QueryClientProvider>
  );
}
