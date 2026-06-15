import { useState } from "react";

type NodeId = number | `R${number}`;

const FLOW: Record<number, { t: NodeId; f: NodeId }> = {
  1: { t: 2, f: 3 },         // Q1 → Yes:Q2 / No:Q3
  //2問目
  2: { t: 4, f: 5 },         // Q2 → Yes:Q4 / No:Q5
  3: { t: 6, f: 7 },         // Q3 → Yes:Q6 / No:Q7
  // 3問目
  4: { t: "R2", f: "R1" },   // Q4 → Yes:ロー(0) /荊(1)
  5: { t: "R1", f: "R2" },   // Q5 → Yes:ヌワ(2) / No:レ様(3)
  6: { t: "R3", f: "R0" },   // Q6 → Yes:ロー(0) / No:ヌワ(2)
  7: { t: "R3", f: "R0" },   // Q7 → Yes:荊(1) / No:レ様(3)
};

export function useDiagnosisFlow() {
  const [node, setNode] = useState<NodeId>(1);
  const [resultIndex, setResultIndex] = useState<number | null>(null);

  const answer = (yes: boolean) => {
    const branch = FLOW[node as number];
    const next = branch[yes ? "t" : "f"];
    if (typeof next === "string") {
      setResultIndex(Number(next.slice(1)));           // "R2" → 2
    } else {
      setNode(next);
    }
  };

  const restart = () => {
    setNode(1);
    setResultIndex(null);
  };

  return {
    currentQuestionN: typeof node === "number" ? node : null,
    resultIndex,           
    answer,                
    restart,              
  };
}