import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchProblem from "../util/http";
import { useCalculator } from "../store/CalculatorContext";

function UserInput() {
  const [userAnswer, setUserAnswer] = useState(""); // 初始化 用户答案
  const [startTime, setStartTime] = useState(null); // 初始化 用户开始时间
  const { times, setTimes, N, setN, problemData, setProblemData } =
    useCalculator();

  const queryClient = useQueryClient(); // 获取 QueryClient 实例

  // 使用 useQuery hook 获取事件数据
  const { data, refetch } = useQuery({
    queryKey: ["math_question"], // 查询键
    queryFn: ({ signal }) => fetchProblem({ signal }), // 查询函数
    staleTime: Infinity, // 数据永远不会被标记查询陈旧，客户端不会向服务器请求最新的数据
    onSuccess: () => {
      // 成功回调
      setProblemData({ problem: data.problem, answer: data.answer }); // 设置问题数据
      setStartTime(new Date()); // 设置开始时间
    },
  });

  // 处理用户提交数据
  const handleSubmit = async () => {
    const endTime = new Date(); // 获取结束时间
    const timeTaken = endTime - startTime; // 计算时间差
    setTimes([...times, { problem: problemData.problem, time: timeTaken }]); // 更新时间数组
    if (+userAnswer === +problemData.answer && N > 0) {
      // 判断用户答案是否正确
      setN(N - 1); // 减少问题数量
      await refetch(); // 获取新的问题
      // queryClient.invalidateQueries(['math_question']); // 数据标记查询为陈旧，获取新的问题
    } else {
      alert("Wrong answer! Try Again!");
    }

    setUserAnswer(""); // 重置用户答案
  };

  return (
    N > 0 &&
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 600
      }}
    >
      <h2>Your Answer:</h2>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
  
}

export default UserInput;
