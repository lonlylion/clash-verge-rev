import Layout from "@/app/layout";
import { AppDataProvider } from "@/app/providers/app-data-provider";

function App() {
  return (
    <AppDataProvider>
      <Layout />
    </AppDataProvider>
  );
}

export default App;
