const comparison = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

const timeRanker = players => {
  const sortedTimes = players.map(p => p.seconds).sort(comparison);
  const ranks = {};
  let currentRank = 0;
  for (let i = 0; i < sortedTimes.length; i++) {
    const val = sortedTimes[i];
    if (ranks[val] === undefined) {
      ranks[val] = currentRank;
      currentRank++;
    }
  }

  const maxRank = ranks[sortedTimes[sortedTimes.length - 1]];
  const cloned = JSON.parse(JSON.stringify(players));

  return cloned.map(p => {
    const rank = ranks[p.seconds];
    return Object.assign(p, { rank: rank === 0 ? rank : rank / maxRank });
  });
};

export default timeRanker;
