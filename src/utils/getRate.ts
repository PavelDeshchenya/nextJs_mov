export default function getRate(vote_count) {
  let vote_countStr = vote_count.toString();
  if (vote_countStr.length < 4) {
    return `(${vote_countStr}K)`;
  } else if (vote_countStr.length == 4) {
    return `(${vote_countStr[0]}.${vote_countStr[1]}M)`;
  } else if (vote_countStr.length == 5) {
    return `(${vote_countStr[0]}${vote_countStr[1]}M)`;
  } else if (vote_countStr.length == 6) {
    return `(${vote_countStr[0]}${vote_countStr[1]}${vote_countStr[2]}M)`;
  }
}
