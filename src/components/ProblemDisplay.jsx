import React from "react";
import { useCalculator } from '../store/CalculatorContext';

function ProblemDisplay() {
    const { problemData, N, totalTime, longestProblems } = useCalculator();

    return (
        N === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 600 }}>
                <h2>Total Time: {totalTime/1000} seconds</h2>
                <h3>Longest Problems: </h3>
                {longestProblems.map((p, index) => (
                    <p key={index}>
                        {p.problem} : {(p.time)/1000} seconds
                    </p>
                ))}
            </div>
        ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 600 }}>
                <h2>Problems Remaining: {N}</h2>
                <h3>Current Problem: {problemData.problem}</h3>
            </div>
        )
    );
}

export default ProblemDisplay;


