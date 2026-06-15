// src/utils/math.test.ts
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board, } from "../Board/index"

describe("BoardにNext player：OXを表示", () => {
    it("trueの時にNext player:Xが出ること", () => {
    expect(xlsNext(true)).toBe("X");
  });
   it("falseの時にNext player:Oが出ること", () => {
    expect(xlsNext(false)).toBe("O");
  });
});

describe("SquareButtonを押すとonPlayが呼ばれること", () => {
    it("なんだこれ全くわからん", () => {
        expect(calculateWtoBeinner(onclick)).toBe(onplay)
    })
})