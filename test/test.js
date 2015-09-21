var chai = require("chai"),
  path = require("path"),
  // uvcharts = require(path.join(__dirname, '../build', 'uvcharts')),
  should = chai.should()

describe("Basic test", function () {
  it("adds correctly", function () {
    (5 + 1).should.be.equal(6)
  })
})
