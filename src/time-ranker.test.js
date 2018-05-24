import timeRanker from "./time-ranker";

describe("test-sorter", () => {
  function addRanks(players, ranks) {
    const cloned = JSON.parse(JSON.stringify(players));
    return cloned.map((p, index) => Object.assign(p, { rank: ranks[index] }));
  }

  it("should sort 3 values correctly", () => {
    const values = [{ seconds: 100 }, { seconds: 50 }, { seconds: 25 }];
    expect(timeRanker(values)).toEqual(addRanks(values, [1, 0.5, 0]));
  });

  it("should put two players on the same rank if their values are equal", () => {
    const values = [
      { seconds: 100 },
      { seconds: 100 },
      { seconds: 25 },
      { seconds: 25 },
      { seconds: 13 }
    ];
    expect(timeRanker(values)).toEqual(addRanks(values, [1, 1, 0.5, 0.5, 0]));
  });

  it("should handle zero times correctly", () => {
    const values = [{ seconds: 0 }, { seconds: 0 }, { seconds: 0 }];
    expect(timeRanker(values)).toEqual(addRanks(values, [0, 0, 0]));
  });

  it("should handle no times correctly", () => {
    const values = [];
    expect(timeRanker(values)).toEqual([]);
  });
});
