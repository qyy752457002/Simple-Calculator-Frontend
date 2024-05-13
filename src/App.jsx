import React from "react";

import { CalculatorProvider } from "./store/CalculatorContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

import ProblemDisplay from "./components/ProblemDisplay";
import UserInput from "./components/UserInput";

function App() {

  return (
    // 使用React Query提供的QueryClientProvider包装整个应用，使其可用于数据查询
    <QueryClientProvider client={queryClient}>
      <CalculatorProvider>
        <ProblemDisplay />
        <UserInput />
      </CalculatorProvider>
    </QueryClientProvider>
  );
}

export default App;
