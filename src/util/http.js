import { QueryClient } from '@tanstack/react-query';

// 创建一个全局的 QueryClient 实例
export const queryClient = new QueryClient();

export default async function fetchProblem ({signal}) {

    // 获取环境变量中的主机
    const host = import.meta.env.HOST;

    const response = await fetch(`${host}/get-problem`, {signal});

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const data = await response.json();

    return data;
}