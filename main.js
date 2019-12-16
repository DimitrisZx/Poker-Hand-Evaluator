const checkRoyalFlush = (isStraightFlush, nums) => nums.reduce((a, b) => a + b, 0) === 60 && isStraightFlush ? true : false;
const checkStraightFlush = (isStraight, isFlush) => isStraight && isFlush ? true : false;
const checkFlush = suits => suits.every((val, i, arr) => val === arr[0]) ? true : false;
const checkStraight = sortedNums => sortedNums[sortedNums.length - 1] - sortedNums[0] === 4 ? true : false;
const checkFullHouse = (isPair, isThreeofkind) => isPair && isThreeofkind ? true : false;

const checkOccurancePatterns = (replyPrefix, nums) => {
	const setFromNums = new Set(nums);
	const occurancesList = [];

	setFromNums.forEach(member => {
		let count = 0;
		nums.forEach(item => member === item ? count += 1 : null);
		occurancesList.push(count);  
	})

	const sortedOccurances = occurancesList.sort((a,b) => a - b);
	const stringifiedSortedOccurances = JSON.stringify(sortedOccurances);
	switch (stringifiedSortedOccurances) {
		case "[1,1,1,2]":  return replyPrefix + "pair"; 
		case "[1,2,2]":  return replyPrefix + "two pairs"; 
		case "[2,3]":  return replyPrefix + "full house"; 
		case "[1,1,3]":  return replyPrefix + "three of a kind"; 
		case "[1,4]":  return replyPrefix + "four of a kind"; 
		default : return `Your highest card is: ${Math.max(...nums)}`
	}
}

const { J, Q, K, A } = { J: 11, Q: 12, K: 13, A: 14 };

const card = (suit, number) => {
  const validSuits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  const validNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  if (!validSuits.includes(suit) || !validNumbers.includes(number)) {
    throw "Invalid suit or number argument(s)";
  } else {
	return { suit: suit, number: number };
  }
};

const sampleHands = [
  [
    card("Hearts", 10),
    card("Hearts", J),
    card("Hearts", Q),
    card("Hearts", K),
    card("Hearts", A)
  ],
  [
    card("Hearts", 5),
    card("Hearts", 2),
    card("Hearts", 3),
    card("Hearts", 4),
    card("Hearts", 6)
  ],
  [
    card("Hearts", 5),
    card("Clubs", 2),
    card("Spades", 3),
    card("Hearts", 4),
    card("Hearts", 6)
  ],
  [
    card("Hearts", 5),
    card("Hearts", 2),
    card("Hearts", 4),
    card("Hearts", 8),
    card("Hearts", 6)
  ],
  [
    card("Hearts", K),
    card("Spades", Q),
    card("Clubs", Q),
    card("Hearts", Q),
    card("Hearts", K)
  ],
  [
    card("Hearts", 5),
    card("Hearts", 5),
    card("Clubs", 5),
    card("Hearts", 5),
    card("Hearts", 6)
  ],
  [
    card("Hearts", Q),
    card("Spades", Q),
    card("Clubs", Q),
    card("Hearts", 5),
    card("Hearts", 6)
  ],
  [
    card("Hearts", K),
    card("Spades", K),
    card("Clubs", Q),
    card("Hearts", Q),
    card("Hearts", 6)
  ],
  [
    card("Hearts", K),
    card("Spades", 2),
    card("Clubs", Q),
    card("Hearts", Q),
    card("Hearts", 6)
  ],
  [
    card("Hearts", 3),
    card("Spades", 8),
    card("Clubs", 5),
    card("Spades", 9),
    card("Hearts", 6)
  ],
];
const handGen = (howManyHands) => {
	const validSuits = ["Spades", "Hearts", "Clubs", "Diamonds"];
	const validNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	const hands = [];
	for (let i = 0; i < howManyHands; i++){
		const hand = []
		for (let j = 0; j < 5; j++) {
			hand.push({
				suit: validSuits[Math.floor(Math.random() * (3 - 0)) + 0],
				number: validNumbers[Math.floor(Math.random() * (12 - 0)) + 0]
			})
		}
		hands.push(hand)
	}
	// console.log(hands);
	return hands;
}

const evaluateHand = hand => {
	if (hand.length !== 5) {
		throw "Each hand should have exactly 5 hards";
	} else {
		const handNums = hand.map(card => card.number).sort((a, b) => a - b);
		const handSuits = hand.map(card => card.suit);
		const replyPrefix = "Your hand is a ";
	
		const isStraight = checkStraight(handNums);
		const isFlush = checkFlush(handSuits);
		const isStraightFlush = checkStraightFlush(isStraight, isFlush);
		const isRoyalFlush = checkRoyalFlush(isStraightFlush, handNums);
	
		if (isRoyalFlush) return replyPrefix + "Royal Flush";
		if (isStraightFlush) return replyPrefix + "Straight Flush";
		if (isFlush) return replyPrefix + "Flush";
		if (isStraight) return replyPrefix + "Straight";
		return checkOccurancePatterns(replyPrefix, handNums);
	}
};

(function main() {
	const hands = handGen(3);
	// use sampleHands instead of hands for controlled tests.
	hands.forEach(hand => console.log(evaluateHand(hand)));
})()

