"use strict"

import { Chart, BarChart } from "../build/uvcharts"
import chai from "chai"
import path from "path"

const should = chai.should()

describe("Basic test", () => {
  it("adds correctly", () => {
    (5 + 1).should.be.equal(6)
  })
})

