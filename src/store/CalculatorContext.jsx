import React, { createContext, useContext, useState, useEffect } from 'react';

const CalculatorContext = createContext();

export const useCalculator = () => useContext(CalculatorContext);

export const CalculatorProvider = ({ children }) => {
    const [N, setN] = useState(10); // 初始化 问题数量
    const [totalTime, setTotalTime] = useState(0); // 初始化总时长
    const [longestProblems, setLongestProblems] = useState([]); // 初始化用时最长问题列表
    const [times, setTimes] = useState([]); // 初始化 时间数组，其中每一个元素为 { problem: 问题, time: 所用时间 }
    const [problemData, setProblemData] = useState({ problem: "", answer: 0 }); // 初始化 问题数据，数据包含问题字符串和答案

    useEffect(() => {
        if (N === 0) {
            const totalTime = times.reduce((acc, curr) => acc + curr.time, 0);
            const longestProblems = times.sort((a, b) => b.time - a.time).slice(0, 5);
            setTotalTime(totalTime);
            setLongestProblems(longestProblems);
        }
    }, [N]);

    return (
        <CalculatorContext.Provider value={{
            N, setN, totalTime, setTotalTime, longestProblems, setLongestProblems,
            times, setTimes, problemData, setProblemData
        }}>
            {children}
        </CalculatorContext.Provider>
    );
};
