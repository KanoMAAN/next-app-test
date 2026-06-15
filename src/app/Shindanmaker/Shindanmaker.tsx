"use client";

import { useState, useEffect } from "react";
import { questions, results } from "./Question&Result"; 
import { useDiagnosisFlow } from "./hooks";

export default function DiagnosticContainer() {
  const { currentQuestionN, resultIndex, answer, restart } = useDiagnosisFlow();

  if (resultIndex !== null) {
    const r = results[resultIndex];
    return (
      <div>
        <h2>{r.name}</h2>
        <p>{r.text}</p>
        <button onClick={restart}>もう一度</button>
      </div>
    );
  }

  const qText = questions.find(q => q.n === currentQuestionN)?.text ?? "";
  return (
    <div>
          <h1>貴方の竜属性診断</h1>
    <p>質問に答えて貴方らしい竜を診断しよう。</p>
      <p>{qText}</p>
      <button onClick={() => answer(true)}>はい</button>
      <button onClick={() => answer(false)}>いいえ</button>
    </div>
  );
}