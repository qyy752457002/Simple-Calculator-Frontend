import { QueryClient } from '@tanstack/react-query';

// 创建一个全局的 QueryClient 实例
export const queryClient = new QueryClient();

export default async function fetchProblem ({signal}) {

    const response = await fetch('https://simple-calculator-backend.onrender.com/get-problem', {signal});

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const data = await response.json();

    return data;
}