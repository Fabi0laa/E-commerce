const { calculateSkinType, getHighestScoreSkinType } = require('./skinTypeController');

const oilySkinResponse = {
  'How often does your skin feel shiny?': 'Sometimes',
  'How often do you have enlarged pores?': 'Frequently',
  'How often do you have blackheads or breakouts?': 'Frequently',
  'How often does your skin feel tight or dry?': 'Sometimes',
  'How often do you use a moisturizer?': 'Twice a day',
  'How often does your skin look flaky or ashy?': 'Sometimes',
  'Do you experience oily skin in certain areas and dryness in others?': 'Sometimes',
  'How often do you experience redness or irritation?': 'Rarely',
  'How often does your skin react to new products or environmental changes?': 'Rarely',
  'How often do you have breakouts?': 'Rarely',
  'How often do you have inflamed or cystic acne?': 'Rarely',
  'Do you have dark spots or patches on your skin?': 'No',
  'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?': 'Rarely',
  'How often does your skin appear uneven in tone or texture?': 'Rarely',
};

const drySkinResponse = {
  'How often does your skin feel shiny?': 'Rarely',
  'How often do you have enlarged pores?': 'Rarely',
  'How often do you have blackheads or breakouts?': 'Rarely',
  'How often does your skin feel tight or dry?': 'Sometimes',
  'How often do you use a moisturizer?': 'Twice a day',
  'How often does your skin look flaky or ashy?': 'Sometimes',
  'Do you experience oily skin in certain areas and dryness in others?': 'Sometimes',
  'How often do you experience redness or irritation?': 'Rarely',
  'How often does your skin react to new products or environmental changes?': 'Rarely',
  'How often do you have breakouts?': 'Rarely',
  'How often do you have inflamed or cystic acne?': 'Rarely',
  'Do you have dark spots or patches on your skin?': 'No',
  'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?': 'Rarely',
  'How often does your skin appear uneven in tone or texture?': 'Rarely',
};

const combinationSkinResponse = {
  'How often does your skin feel shiny?': 'Sometimes',
  'How often do you have enlarged pores?': 'Sometimes',
  'How often do you have blackheads or breakouts?': 'Sometimes',
  'How often does your skin feel tight or dry?': 'Sometimes',
  'How often do you use a moisturizer?': 'Twice a day',
  'How often does your skin look flaky or ashy?': 'Rarely',
  'Do you experience oily skin in certain areas and dryness in others?': 'Frequently',
  'How often do you experience redness or irritation?': 'Sometimes',
  'How often does your skin react to new products or environmental changes?': 'Sometimes',
  'How often do you have breakouts?': 'Sometimes',
  'How often do you have inflamed or cystic acne?': 'Rarely',
  'Do you have dark spots or patches on your skin?': 'No',
  'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?': 'Rarely',
  'How often does your skin appear uneven in tone or texture?': 'Rarely',
};

const sensitiveSkinResponse = {
  'How often does your skin feel shiny?': 'Rarely',
  'How often do you have enlarged pores?': 'Rarely',
  'How often do you have blackheads or breakouts?': 'Rarely',
  'How often does your skin feel tight or dry?': 'Sometimes',
  'How often do you use a moisturizer?': 'Twice a day',
  'How often does your skin look flaky or ashy?': 'Sometimes',
  'Do you experience oily skin in certain areas and dryness in others?': 'Rarely',
  'How often do you experience redness or irritation?': 'Frequently',
  'How often does your skin react to new products or environmental changes?': 'Frequently',
  'How often do you have breakouts?': 'Rarely',
  'How often do you have inflamed or cystic acne?': 'Rarely',
  'Do you have dark spots or patches on your skin?': 'No',
  'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?': 'Rarely',
  'How often does your skin appear uneven in tone or texture?': 'Rarely',
};

const acneProneSkinResponse = {
  'How often does your skin feel shiny?': 'Sometimes',
  'How often do you have enlarged pores?': 'Sometimes',
  'How often do you have blackheads or breakouts?': 'Rarely',
  'How often does your skin feel tight or dry?': 'Sometimes',
  'How often do you use a moisturizer?': 'Once a day',
  'How often does your skin look flaky or ashy?': 'Sometimes',
  'Do you experience oily skin in certain areas and dryness in others?': 'Sometimes',
  'How often do you experience redness or irritation?': 'Sometimes',
  'How often does your skin react to new products or environmental changes?': 'Rarely',
  'How often do you have breakouts?': 'Frequently',
  'How often do you have inflamed or cystic acne?': 'Frequently',
  'Do you have dark spots or patches on your skin?': 'No',
  'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?': 'Rarely',
  'How often does your skin appear uneven in tone or texture?': 'Sometimes',
};

const hyperpigmentationSkinResponse = {
  'How often does your skin feel shiny?': 'Rarely',
  'How often do you have enlarged pores?': 'Rarely',
  'How often do you have blackheads or breakouts?': 'Sometimes',
  'How often does your skin feel tight or dry?': 'Sometimes',
  'How often do you use a moisturizer?': 'Twice a day',
  'How often does your skin look flaky or ashy?': 'Sometimes',
  'Do you experience oily skin in certain areas and dryness in others?': 'Rarely',
  'How often do you experience redness or irritation?': 'Sometimes',
  'How often does your skin react to new products or environmental changes?': 'Sometimes',
  'How often do you have breakouts?': 'Sometimes',
  'How often do you have inflamed or cystic acne?': 'Sometimes',
  'Do you have dark spots or patches on your skin?': 'Yes',
  'How often do you have post-inflammatory hyperpigmentation (dark marks after acne or injury)?': 'Sometimes',
  'How often does your skin appear uneven in tone or texture?': 'Sometimes',
};

describe('calculate skin type module', () => {
  test('oily skin type response', () => {
    const skinType = calculateSkinType(oilySkinResponse);
    expect(skinType).toEqual({
      skinType: 'oily',
    });
  });

  test('dry skin type response', () => {
    const skinType = calculateSkinType(drySkinResponse);
    expect(skinType).toEqual({
      skinType: 'dry',
    });
  });

  test('combination skin type response', () => {
    const skinType = calculateSkinType(combinationSkinResponse);
    expect(skinType).toEqual({
      skinType: 'combination',
    });
  });

  test('sensitive skin type response', () => {
    const skinType = calculateSkinType(sensitiveSkinResponse);
    expect(skinType).toEqual({
      skinType: 'sensitive',
    });
  });

  test('acne prone skin type response', () => {
    const skinType = calculateSkinType(acneProneSkinResponse);
    expect(skinType).toEqual({
      skinType: 'acne_prone_skin',
    });
  });

  test('dry acne prone skin type response', () => {
    const skinType = calculateSkinType(hyperpigmentationSkinResponse);
    expect(skinType).toEqual({
      skinType: 'hyperpigmentation',
    });
  });

  test('get highest score skin type', () => {
    let scores = {
      oily: 1,
      dry: 3,
      combination: 0,
      sensitive: 6,
      acne_prone_skin: 7,
      dry_acne_prone_skin: 4,
      hyperpigmentation: 9,
    };
    const highestScoreSkinType = getHighestScoreSkinType(scores);
    expect(highestScoreSkinType).toEqual('hyperpigmentation');
    expect(highestScoreSkinType).not.toEqual('acne_prone_skin');
    expect(highestScoreSkinType).not.toEqual('sensitive');
  });
});
