import { CelebrationType } from './types';

export interface DefaultQuestion {
  text: string;
  allow_image: boolean;
  is_required: boolean;
}

const birthdayQuestions: DefaultQuestion[] = [
  { text: 'Hva setter du mest pris på med {name}?', allow_image: false, is_required: true },
  { text: 'Del et favorittminne med {name}', allow_image: false, is_required: false },
  { text: 'Hva ønsker du {name} for det kommende året?', allow_image: false, is_required: false },
  { text: 'Del et bilde av dere sammen!', allow_image: true, is_required: false },
];

const anniversaryQuestions: DefaultQuestion[] = [
  { text: 'Hva betyr {name} for teamet vårt?', allow_image: false, is_required: true },
  { text: 'Del et favorittminne fra tiden med {name}', allow_image: false, is_required: false },
  { text: 'Hva har du lært av {name}?', allow_image: false, is_required: false },
  { text: 'Del et bilde fra jobben med {name}!', allow_image: true, is_required: false },
];

const farewellQuestions: DefaultQuestion[] = [
  { text: 'Hva kommer du til å savne mest med {name}?', allow_image: false, is_required: true },
  { text: 'Del ditt beste minne med {name}', allow_image: false, is_required: false },
  { text: 'Hva ønsker du {name} videre i karrieren?', allow_image: false, is_required: false },
  { text: 'Noen siste ord til {name}?', allow_image: false, is_required: false },
  { text: 'Del et bilde av dere sammen!', allow_image: true, is_required: false },
];

const customQuestions: DefaultQuestion[] = [
  { text: 'Skriv en hilsen til {name}', allow_image: false, is_required: true },
  { text: 'Del et favorittminne med {name}', allow_image: false, is_required: false },
  { text: 'Del et bilde!', allow_image: true, is_required: false },
];

const questionsByType: Record<CelebrationType, DefaultQuestion[]> = {
  birthday: birthdayQuestions,
  anniversary: anniversaryQuestions,
  farewell: farewellQuestions,
  custom: customQuestions,
};

export function getDefaultQuestions(type: CelebrationType): DefaultQuestion[] {
  return questionsByType[type];
}
