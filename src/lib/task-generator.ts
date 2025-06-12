export type TaskType = "syllogism" | "sequence" | "analogy" | "deduction" | "conditional";

export const difficultyLevels = ["Easy", "Medium", "Challenging", "Hard", "Expert"];

interface TaskResult {
  task: string;
  solution: string;
}

// Syllogism tasks
const syllogismTasks: TaskResult[] = [
  {
    task: "All roses are flowers.\nAll flowers need water.\nWhat can we conclude?",
    solution: "All roses need water."
  },
  {
    task: "All squares are rectangles.\nSome rectangles are red.\nWhat can we conclude?",
    solution: "We cannot conclude that any squares are red. The second premise only states that some rectangles are red, but doesn't specify which ones."
  },
  {
    task: "No mammals can fly.\nBats are mammals.\nWhat can we conclude?",
    solution: "Bats cannot fly. However, this conclusion contradicts reality since bats are flying mammals, revealing a problem with the first premise."
  },
  {
    task: "All A are B.\nSome C are A.\nWhat can we conclude about the relationship between C and B?",
    solution: "Some C are B. Since some C are A, and all A are B, then those C that are A must also be B."
  },
  {
    task: "All writers are creative.\nSome creative people are painters.\nWhat can we conclude about writers and painters?",
    solution: "We cannot make a definitive conclusion about writers and painters from these premises. The fact that some creative people are painters doesn't tell us whether any writers are painters."
  }
];

// Sequence tasks
const sequenceTasks: TaskResult[] = [
  {
    task: "What is the next number in this sequence: 2, 4, 6, 8, ...?",
    solution: "10. This is an arithmetic sequence with a common difference of 2."
  },
  {
    task: "Find the next number: 1, 3, 6, 10, 15, ...?",
    solution: "21. These are triangular numbers. Each number is the sum of the first n natural numbers: 1, 1+2=3, 1+2+3=6, etc."
  },
  {
    task: "What's the next letter in the sequence: O, T, T, F, F, S, S, ...?",
    solution: "E. These are the first letters of the numbers One, Two, Three, Four, Five, Six, Seven, Eight."
  },
  {
    task: "Determine the next number: 1, 1, 2, 3, 5, 8, 13, ...?",
    solution: "21. This is the Fibonacci sequence where each number is the sum of the two preceding ones."
  },
  {
    task: "What comes next in this sequence: 3, 1, 4, 1, 5, 9, ...?",
    solution: "2. These are the digits of π (pi): 3.14159265..."
  }
];

// Analogy tasks
const analogyTasks: TaskResult[] = [
  {
    task: "Bird is to air as fish is to ____?",
    solution: "Water. Birds fly through air, while fish swim through water."
  },
  {
    task: "Hand is to glove as foot is to ____?",
    solution: "Sock or shoe. A glove covers a hand, just as a sock or shoe covers a foot."
  },
  {
    task: "Author is to book as composer is to ____?",
    solution: "Music or song. An author creates a book, while a composer creates music."
  },
  {
    task: "Light is to dark as ____ is to silence?",
    solution: "Sound or noise. Light and dark are opposites, as are sound and silence."
  },
  {
    task: "Democracy is to voting as monarchy is to ____?",
    solution: "Inheritance or succession. In a democracy, leaders are selected through voting, while in a monarchy, leadership is typically determined by inheritance."
  }
];

// Deductive reasoning tasks
const deductionTasks: TaskResult[] = [
  {
    task: "John is taller than Mary. Mary is taller than Sue. Who is the tallest?",
    solution: "John is the tallest. If John > Mary and Mary > Sue, then John > Sue."
  },
  {
    task: "Five people sit in a row. Alice sits next to Bob. Carol sits next to David. Eve sits between Carol and Alice. Who sits in the middle?",
    solution: "Eve sits in the middle. The arrangement from left to right must be: Alice, Eve, Carol, David, Bob or Bob, David, Carol, Eve, Alice."
  },
  {
    task: "I have a certain number of coins in my pocket. All of them are dimes except for two. All of them are quarters except for two. All of them are nickels except for two. How many coins do I have?",
    solution: "3 coins. If all except 2 are dimes, then I have 2 non-dimes. If all except 2 are quarters, then I have 2 non-quarters. If all except 2 are nickels, then I have 2 non-nickels. This means I have 1 dime, 1 quarter, and 1 nickel."
  },
  {
    task: "Tom, Dick, and Harry each have a different occupation: doctor, lawyer, and teacher. Tom is not the doctor. Dick is not the teacher. The lawyer beat the doctor at tennis. Harry never plays tennis. What is each person's occupation?",
    solution: "Harry is the doctor, Dick is the lawyer, and Tom is the teacher. Since Harry never plays tennis, he can't be the lawyer (who beat the doctor at tennis). So Harry must be the doctor. Dick is not the teacher, so Dick must be the lawyer. That leaves Tom as the teacher."
  },
  {
    task: "Four friends (Alex, Bella, Carlos, and Dana) live on different floors of a four-story building (1st, 2nd, 3rd, and 4th). Alex lives on a higher floor than Bella. Carlos lives on a higher floor than Dana. Dana lives on a higher floor than Bella. Who lives on which floor?",
    solution: "Carlos lives on the 4th floor, Alex on the 3rd, Dana on the 2nd, and Bella on the 1st. From the clues, we know Bella is below Alex, Dana, and Carlos. Dana is below Carlos but above Bella. Alex is above Bella, but his relationship to Dana and Carlos isn't directly stated. The only arrangement that satisfies all conditions is: 4-Carlos, 3-Alex, 2-Dana, 1-Bella."
  }
];

// Conditional logic tasks
const conditionalTasks: TaskResult[] = [
  {
    task: "If it rains, the game will be canceled. The game was not canceled. Did it rain?",
    solution: "No, it did not rain. This is an application of modus tollens: If P then Q, not Q, therefore not P."
  },
  {
    task: "If I study, I will pass the exam. I passed the exam. Did I study?",
    solution: "We cannot determine whether I studied. This is the fallacy of affirming the consequent. There could be other reasons why I passed the exam."
  },
  {
    task: "If today is Saturday, then tomorrow is Sunday. Tomorrow is Sunday. Is today Saturday?",
    solution: "We cannot determine if today is Saturday. This is the fallacy of affirming the consequent. Tomorrow being Sunday is consistent with today being Saturday, but it could also be consistent with today being a different day."
  },
  {
    task: "If a triangle is equilateral, then all its angles are equal. The triangle ABC does not have all angles equal. Is triangle ABC equilateral?",
    solution: "No, triangle ABC is not equilateral. This is an application of modus tollens: If P then Q, not Q, therefore not P."
  },
  {
    task: "If a number is divisible by 6, then it is divisible by 2 and 3. The number 15 is divisible by 3 but not by 2. Is 15 divisible by 6?",
    solution: "No, 15 is not divisible by 6. Since 15 is not divisible by 2, it cannot be divisible by 6, as all numbers divisible by 6 must be divisible by both 2 and 3."
  }
];

const allTasks: Record<TaskType, TaskResult[]> = {
  syllogism: syllogismTasks,
  sequence: sequenceTasks,
  analogy: analogyTasks,
  deduction: deductionTasks,
  conditional: conditionalTasks
};

// Function to get task based on type and difficulty
export function generateTask(type: TaskType, difficulty: number): TaskResult {
  const tasks = allTasks[type];
  // Adjust index based on difficulty
  const index = Math.min(Math.floor((difficulty - 1) * tasks.length / 5), tasks.length - 1);
  return tasks[index];
}