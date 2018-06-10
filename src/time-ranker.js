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

  return players.map(player => {
    const rank = ranks[player.seconds];
    return {
      rank: rank === 0 ? rank : rank / maxRank,
      player
    };
  });
};

export default timeRanker;
