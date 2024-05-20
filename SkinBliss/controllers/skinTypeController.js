const catchAsync = require('../utils/catchAsync');
const { updateUser } = require('./userController');

const questions = {
  oily: [
    'How often does your skin feel shiny?',
    'How often do you have enlarged pores?',
    'How often do you have blackheads or breakouts?',
  ],
  dry: [
    'How often does your skin feel tight or dry?',
    'How often do you use a moisturizer?',
    'How often does your skin look flaky or ashy?',
  ],
  combination: [
    'Do you experience oily skin in certain areas and dryness in others?',
    'How often do you have blackheads or breakouts?',
    'How often does your skin feel tight or dry?',
  ],
  sensitive: [
    'How often do you experience redness or irritation?',
    'How often does your skin react to new products or environmental changes?',
  ],
  acne_prone_skin: [
    'How often do you have breakouts?',
    'How often do you have inflamed or cystic acne?',
    'How often do you have blackheads?',
  ],
  dry_acne_prone_skin: [
    'How often does your skin feel tight or dry?',
    'How often do you have breakouts?',
    'How often do you have blackheads?',
  ],
  hyperpigmentation: [
    'Do you have dark spots or patches on your skin?',
    'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?',
    'How often does your skin appear uneven in tone or texture?',
  ],
};

// Define options for each question
const options = {
  'How often does your skin feel shiny?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often do you have enlarged pores?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often do you have blackheads or breakouts?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often does your skin feel tight or dry?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often do you use a moisturizer?': {
    options: ['Once a day or less', 'Twice a day', 'More than twice a day'],
    points: {
      'Once a day or less': 1,
      'Twice a day': 2,
      'More than twice a day': 3,
    },
  },
  'How often does your skin look flaky or ashy?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'Do you experience oily skin in certain areas and dryness in others?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often do you experience redness or irritation?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1.5,
      Sometimes: 2.5,
      Frequently: 3.5,
    },
  },
  'How often does your skin react to new products or environmental changes?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1.5,
      Sometimes: 2.5,
      Frequently: 3.5,
    },
  },
  'How often do you have breakouts?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often do you have inflamed or cystic acne?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often do you have blackheads?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'Do you have dark spots or patches on your skin?': {
    options: ['Yes', 'No'],
    points: {
      Yes: 3,
      No: 1,
    },
  },
  'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
  'How often does your skin appear uneven in tone or texture?': {
    options: ['Rarely', 'Sometimes', 'Frequently'],
    points: {
      Rarely: 1,
      Sometimes: 2,
      Frequently: 3,
    },
  },
};

function getHighestScoreSkinType(scores) {
  let maxScore = 0;
  let skinType = '';

  for (const type in scores) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      skinType = type;
    }
  }

  return skinType;
}

// Function to calculate the skin type based on responses
function calculateSkinType(responses) {
  let scores = {
    oily: 0,
    dry: 0,
    combination: 0,
    sensitive: 0,
    acne_prone_skin: 0,
    dry_acne_prone_skin: 0,
    hiperpigmentation: 0,
  };

  const responsesKeys = Object.keys(responses);

  // Calculate scores for each question based on user responses
  responsesKeys.forEach((response) => {
    for (const skinType in scores) {
      if (questions?.[skinType]?.includes(response)) {
        scores[skinType] += options[response].points[responses[response]];
      }
    }
  });

  // Find the skin type with the highest score
  const skinType = getHighestScoreSkinType(scores);

  return {
    skinType,
  };
}

const getSkinQuizQuestions = catchAsync(async (req, res, next) => {
  const parsedQuestion = Object.entries(options).map(([key, value]) => {
    return {
      question: key,
      options: value.options,
    };
  });
  return res.status(200).json(parsedQuestion);
});

const saveSkinQuizResults = catchAsync(async (req, res, next) => {
  const skinType = calculateSkinType(req.body);
  updateUser(
    {
      ...req,
      body: {
        skinType: skinType.skinType,
      },
    },
    res,
    next,
  );
});

module.exports = { calculateSkinType, getSkinQuizQuestions, saveSkinQuizResults, getHighestScoreSkinType };
