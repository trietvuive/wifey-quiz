import { Question, QuestionCategory } from '@/types';

export const questions: Question[] = [
  {
    id: 1,
    question: "If $\\frac{\\sqrt{48+40+56}}{2^t+2^{t+1}} = 4$, what is the value of t?",
    options: ["-2", "-1", "0", "1/2", "2"],
    correctAnswer: 2,
    category: QuestionCategory.ProblemSolving,
    difficulty: 600,
  },
  {
    id: 2,
    question: "In City X, it snowed on 68 percent of the days. However, 80 percent of the days when it was not supposed to snow, \
    it snowed and 40 percent of the days when it was supposed to snow, it did not snow. Of the days when it did not snow, what percent of the days it was supposed to snow?",
    options: ["22%", "32%", "60%", "75%", "80%"],
    correctAnswer: 3,
    category: QuestionCategory.ProblemSolving,
    difficulty: 600,
  },
  {
    id: 3,
    question: "There are only blue, red, and white chips in a bag. There are 4 more blue chips than white chips in the bag. \
    If a number of red chips equal to twice the number of white chips were added, the number of red chips would double, and half the total number of chips would be blue chips. What fraction of the chips in the bag are red?",
    options: ["1/8", "1/6", "1/5", "1/4", "1/3"],
    correctAnswer: 3,
    category: QuestionCategory.ProblemSolving,
    tags: ["Word Problem"],
    difficulty: 600,
  },
  {
    id: 4,
    question: "How many trailing zeroes does $24! + 25!$ has?",
    options: ["4", "5", "6", "9", "10"],
    correctAnswer: 0,
    category: QuestionCategory.ProblemSolving,
    tags: ["Number Theory"],
    difficulty: 600,
  },
  {
    id: 5,
    question: "What is the sum of the list of consecutive odd numbers between 30 and 50?",
    options: ["400", "450", "500", "550", "600", "650"],
    correctAnswer: 0,
    category: QuestionCategory.ProblemSolving,
    tags: ["Algebra"],
    difficulty: 550,
  },
  {
    id: 6,
    question: "In the xy-plane, line p has the equation $y=4x−7$. Which of the following points does not lie on the line p?",
    options: ["(2, 1)", "(3, 5)", "(4, 9)", "(5, 10)", "(6, 17)"],
    correctAnswer: 3,
    category: QuestionCategory.ProblemSolving,
    tags: ["Geometry"],
    difficulty: 550,
  },
  {
    id: 7,
    question: "A and B start running on a circular track of length 1200 meters with speeds in the ratio of 1 : 5 and A running \
    clockwise and B anticlockwise. At what distance from the starting point, measured clockwise, would the point of their 4th meeting be?",
    options: ["200 meters", "400 meters", "600 meters", "800 meters", "1000 meters"],
    correctAnswer: 3,
    category: QuestionCategory.ProblemSolving,
    tags: ["Distance and Speed"],
    difficulty: 700,
  },  {
    id: 8,
    question: "If \\$20,000 were deposited into an account which yields x percent annual interest compounded quarterly the total value after 6 months was \\$20,808, what is the value of x?",
    options: ["0.08", "2", "4", "8", "8.8"],
    correctAnswer: 3,
    category: QuestionCategory.ProblemSolving,
    tags: ["Percent and Interest"],
    difficulty: 700,
  },
  {
    id: 9,
    question: "If $(3^4)(5^6)(7^3) = (35^n)(x)$, where x and n are both positive integers, how many different possible values of n are there?",
    options: ["1", "2", "3", "4", "6"],
    correctAnswer: 2,
    category: QuestionCategory.ProblemSolving,
    tags: ["Algebra"],
    difficulty: 650,
  },
  {
    id: 10,
    question: "People who have spent a lot of time in contact with animals often develop animal-induced allergies, some of them quite serious. \
    In a survey of current employees in major zoos, about 30 percent had animal-induced allergies.\
    Based on this sample, experts conclude that among members of the general population who have spent a similarly large amount of time in close contact with animals, \
    the percentage with animal-induced allergies is not 30 percent but substantially more.\n\
    Which of the following, if true, provides the strongest grounds for the experts’ conclusion?",
    options: [
      "A zoo employee who develops a serious animal-induced allergy is very likely to switch to some other occupation.",
      "A zoo employee is more likely than a person in the general population to keep one or more animal pets at home.",
      "The percentage of the general population whose level of exposure to animals matches that of a zoo employee is quite small.",
      "Exposure to domestic pets is, on the whole, less likely to cause animal induced allergy than exposure to many of the animals kept in zoos.",
      "Zoo employees seldom wear protective gear when they handle animals in their care.",
    ],
    correctAnswer: 0,
    category: QuestionCategory.CriticalReasoning,
    tags: ["Classic"],
    difficulty: 700,
  },
  {
    id: 11,
    question: "Trucking company owner: Theft of trucks containing valuable cargo is a serious problem. \
    A new device produces radio signals that allow police to track stolen vehicles, and the recovery rate for stolen cargo in trucks equipped with the device is impressive. \
    The device is too expensive to install in every truck, so we plan to install it in half of our trucks. Using those trucks for the most valuable cargo should largely eliminate losses from theft.\n\
    Which of the following, if true, most strongly supports the trucking company owner's expectation about the results of implementing the plan?",
    options: [
      "For thieves, a cargo is valuable only if it is easy for them to dispose of profitably.",
      "Some insurance companies charge less to insure cargoes transported in trucks protected by the device.",
      "Most stolen trucks are eventually found, but unless a stolen truck is found very soon after it is taken, the likelihood that the trucking company will recover any of its cargo is very low.",
      "Thieves generally avoid trucks belonging to trucking companies that are known to have installed the device in a large proportion of their trucks.",
      "The manufacturer of the device offers a five-year warranty on each unit sold, a longer warranty than any that is offered on any competing antitheft device.",
    ],
    correctAnswer: 3,
    category: QuestionCategory.CriticalReasoning,
    tags: ["Official Guide"],
    difficulty: 600,
  },
  {
    id: 12,
    question: "Between 1980 and 2000 the sea otter population of the Aleutian Islands declined precipitously. There were no signs of disease or malnutrition, so there was probably an increase in the number of otters being eaten by predators. \
    Orcas will eat otters when seals, their normal prey, are unavailable, and the Aleutian Islands seal population declined dramatically in the 1980s. \
    Therefore, orcas were most likely the immediate cause of the otter population decline. \n\
    Which of the following, if true, most strengthens the argument?",
    options: [
      "The population of sea urchins, the main food of sea otters, has increased since the sea otter population declined.",
      "Seals do not eat sea otters, nor do they compete with sea otters for food.",
      "Most of the surviving sea otters live in a bay that is inaccessible to orcas.",
      "The population of orcas in the Aleutian Islands has declined since the 1980s.",
      "An increase in commercial ﬁshing near the Aleutian Islands in the 1980s caused a slight decline in the population of the ﬁsh that seals use for food.",
    ],
    correctAnswer: 2,
    category: QuestionCategory.CriticalReasoning,
    tags: ["Strengthen"],
    difficulty: 700,
  },
  {
    id: 13,
    question: "Opponents of peat harvesting in this country argue that it would alter the ecological balance of our peat-rich wetlands and that, as a direct consequence of this, \
    much of the country’s water supply would be threatened with contamination. \
    But this cannot be true, for in Ireland, where peat has been harvested for centuries, the water supply is not contaminated. We can safely proceed with the harvesting of peat.\n\
    Which one of the following, if true, most strengthens the argument?",
    options: [
      "Over hundreds of years, the ecological balance of all areas changes slowly but significantly, sometimes to the advantage of certain flora and fauna.",
      "The original ecology of the peat-harvesting areas of Ireland was virtually identical to that of the undisturbed wetlands of this country.",
      "The activities of the other industries in coming years are likely to have adverse effects on the water supply of this country.",
      "The peat resources of this country are far larger than those of some countries that successfully harvest peat.",
      "The peat-harvesting industry of Ireland has been able to supply most of that country’s fuel for generations.",
    ],
    correctAnswer: 1,
    category: QuestionCategory.CriticalReasoning,
    tags: ["Strengthen"],
    difficulty: 550,
  },
  {
    id: 14,
    question: "If Bill made no stops on the trip, what was Bill's average (arithmetic mean) speed for his 3-hour trip?\n\n\
    1) Bill traveled a total of 120 miles. \n\
    2) Bill traveled half the distance at 30 mph and half the distance at 60 miles per hour",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 3,
    category: QuestionCategory.DataSufficiency,
    tags: ["Distance and Speed"],
    difficulty: 600,
  },
  {
    id: 15,
    question: "If the price of a magazine is to be doubled, by what percent will the number of magazines sold decrease?\n\n\
    (1) The current price of the magazine is \\$1.00.\n\
    (2) For every \\$0.25 of increase in price, the number of magazines sold will decrease by 10 percent of the number sold at the current price.",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 2,
    category: QuestionCategory.DataSufficiency,
    tags: ["Word Problems"],
    difficulty: 550,
  },
  {
    id: 16,
    question: "Events E and F are independent. Is the probability that both events E and F will occur less than 0.6?\n\n\
    1) The probability that event E will occur is 0.4.\n\
    2) The probability that event F will occur is 0.5.",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 3,
    category: QuestionCategory.DataSufficiency,
    tags: ["Probability"],
    difficulty: 700,
  },
  {
    id: 17,
    question: "If m is a positive odd integer, what is the average (arithmetic mean) of a certain set of m integers\n\n\
    (1) The integers in the set are consecutive multiples of 3.\n\
    (2) The median of the set of integers is 33",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 3,
    category: QuestionCategory.DataSufficiency,
    tags: ["Statistics and Sets"],
    difficulty: 600,
  },
  {
    id: 18,
    question: "For S, a list of five integers, is the mean of the list an integer in S?\n\n\
    (1) The difference between the smallest integer in S and the median of S is the same as the difference between the median and the highest integer in S.\n\
    (2) The difference between the second smallest integer in S and the median of S is the same as the difference between the median and the second highest integer in S.",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 3,
    category: QuestionCategory.DataSufficiency,
    tags: ["Statistics and Sets"],
    difficulty: 650,
  },
  {
    id: 19,
    question: "If a, b and c are even integers greater than 10, is $a+b$ divisible by 6?\n\n\
    (1) $b=2c$\n\
    (2) $a=2b$",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 1,
    category: QuestionCategory.DataSufficiency,
    tags: ["Multiples"],
    difficulty: 650,
  },
  {
    id: 20,
    question: "Is $x^7 < 6^y$ ?\n\n\
    (1) $x^3 = –125$\n\
    (2) $y^2 = 36$",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 0,
    category: QuestionCategory.DataSufficiency,
    tags: ["Exponents"],
    difficulty: 650,
  },
  {
    id: 21,
    question: "What is the remainder when N is divided by 8?\n\n\
    (1) N is a product of four consecutive positive integers.\
    (2) N is a product of three consecutive positive integers: p, q, and r, among which p is even.",
    options: [
      "Statement 1 alone is sufficient, but statement 2 alone is not",
      "Statement 2 alone is sufficient, but statement 1 alone is not",
      "Both statements together are sufficient, but neither statement alone is sufficient",
      "Each statement alone is sufficient",
      "Neither statement alone nor together is sufficient",
    ],
    correctAnswer: 3,
    category: QuestionCategory.DataSufficiency,
    tags: ["Multiples"],
    difficulty: 650,
  }
]; 