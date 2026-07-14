// Questions du quiz citoyenneté — extraites du monolithe (source unique partagée)
export interface CitizenshipQuestion {
  id: number
  category: 'rights' | 'responsibilities' | 'history' | 'government' | 'symbols' | 'geography' | 'culture'
  question: string
  questionEn: string
  options: string[]
  optionsEn: string[]
  correctAnswer: number
  explanation: string
  explanationEn: string
}

export const citizenshipTestQuestions: CitizenshipQuestion[] = [
  {
    id: 1, category: 'rights',
    question: 'Quels sont les trois principaux droits garantis par la Charte canadienne des droits et libertés?',
    questionEn: 'What are the three main rights guaranteed by the Canadian Charter of Rights and Freedoms?',
    options: ['Liberté de conscience, liberté de religion, liberté de pensée', 'Liberté d\'expression, liberté de religion, liberté de pensée', 'Liberté de mouvement, liberté de parole, liberté de vote', 'Liberté de presse, liberté de réunion, liberté d\'association'],
    optionsEn: ['Freedom of conscience, freedom of religion, freedom of thought', 'Freedom of expression, freedom of religion, freedom of thought', 'Freedom of movement, freedom of speech, freedom to vote', 'Freedom of the press, freedom of assembly, freedom of association'],
    correctAnswer: 1, explanation: 'La Charte garantit les libertés fondamentales.', explanationEn: 'The Charter guarantees fundamental freedoms.'
  },
  {
    id: 2, category: 'responsibilities',
    question: 'Quelle est une responsabilité importante des citoyens canadiens?',
    questionEn: 'What is an important responsibility of Canadian citizens?',
    options: ['Voyager à l\'étranger chaque année', 'Voter aux élections', 'Acheter une maison', 'Parler français'],
    optionsEn: ['Travel abroad every year', 'Vote in elections', 'Buy a house', 'Speak French'],
    correctAnswer: 1, explanation: 'Voter est une responsabilité civique importante.', explanationEn: 'Voting is an important civic responsibility.'
  },
  {
    id: 3, category: 'history',
    question: 'Qui étaient les premiers habitants du Canada?',
    questionEn: 'Who were the first inhabitants of Canada?',
    options: ['Les Français', 'Les Britanniques', 'Les peuples autochtones', 'Les Vikings'],
    optionsEn: ['The French', 'The British', 'Indigenous peoples', 'The Vikings'],
    correctAnswer: 2, explanation: 'Les peuples autochtones sont les premiers habitants du Canada.', explanationEn: 'Indigenous peoples are the first inhabitants of Canada.'
  },
  {
    id: 4, category: 'government',
    question: 'Quel type de gouvernement le Canada a-t-il?',
    questionEn: 'What type of government does Canada have?',
    options: ['République présidentielle', 'Monarchie constitutionnelle', 'Dictature', 'République parlementaire'],
    optionsEn: ['Presidential republic', 'Constitutional monarchy', 'Dictatorship', 'Parliamentary republic'],
    correctAnswer: 1, explanation: 'Le Canada est une monarchie constitutionnelle.', explanationEn: 'Canada is a constitutional monarchy.'
  },
  {
    id: 5, category: 'symbols',
    question: 'Quel est l\'animal national du Canada?',
    questionEn: 'What is the national animal of Canada?',
    options: ['L\'ours polaire', 'Le castor', 'L\'orignal', 'Le caribou'],
    optionsEn: ['Polar bear', 'Beaver', 'Moose', 'Caribou'],
    correctAnswer: 1, explanation: 'Le castor est le symbole national du Canada.', explanationEn: 'The beaver is Canada\'s national symbol.'
  },
  {
    id: 6, category: 'geography',
    question: 'Combien de provinces et de territoires le Canada compte-t-il?',
    questionEn: 'How many provinces and territories does Canada have?',
    options: ['10 provinces et 2 territoires', '10 provinces et 3 territoires', '9 provinces et 3 territoires', '12 provinces et 1 territoire'],
    optionsEn: ['10 provinces and 2 territories', '10 provinces and 3 territories', '9 provinces and 3 territories', '12 provinces and 1 territory'],
    correctAnswer: 1, explanation: 'Le Canada compte 10 provinces et 3 territoires.', explanationEn: 'Canada has 10 provinces and 3 territories.'
  },
  {
    id: 7, category: 'government',
    question: 'Qui est le chef du gouvernement au Canada?',
    questionEn: 'Who is the head of government in Canada?',
    options: ['Le roi', 'Le premier ministre', 'Le gouverneur général', 'Le président'],
    optionsEn: ['The King', 'The Prime Minister', 'The Governor General', 'The President'],
    correctAnswer: 1, explanation: 'Le premier ministre est le chef du gouvernement.', explanationEn: 'The Prime Minister is the head of government.'
  },
  {
    id: 8, category: 'rights',
    question: 'Qu\'est-ce que la primauté du droit?',
    questionEn: 'What is the rule of law?',
    options: ['Les riches ont plus de droits', 'La loi s\'applique également à tous', 'Le gouvernement est au-dessus des lois', 'Seuls les citoyens ont des droits'],
    optionsEn: ['The rich have more rights', 'The law applies equally to everyone', 'The government is above the law', 'Only citizens have rights'],
    correctAnswer: 1, explanation: 'La loi s\'applique également à tous.', explanationEn: 'The law applies equally to everyone.'
  },
  {
    id: 9, category: 'history',
    question: 'Quand le Canada est-il devenu un pays indépendant?',
    questionEn: 'When did Canada become an independent country?',
    options: ['1867', '1776', '1945', '1900'],
    optionsEn: ['1867', '1776', '1945', '1900'],
    correctAnswer: 0, explanation: 'Le Canada est devenu un pays le 1er juillet 1867.', explanationEn: 'Canada became a country on July 1, 1867.'
  },
  {
    id: 10, category: 'symbols',
    question: 'Quelle est la fête nationale du Canada?',
    questionEn: 'What is Canada\'s national holiday?',
    options: ['Le jour de la Reine', 'La fête du Canada (1er juillet)', 'Le jour du Souvenir', 'La fête du Travail'],
    optionsEn: ['The Queen\'s Day', 'Canada Day (July 1st)', 'Remembrance Day', 'Labour Day'],
    correctAnswer: 1, explanation: 'La fête du Canada est le 1er juillet.', explanationEn: 'Canada Day is July 1st.'
  },
  {
    id: 11, category: 'culture',
    question: 'Quelles sont les deux langues officielles du Canada?',
    questionEn: 'What are the two official languages of Canada?',
    options: ['Anglais et espagnol', 'Français et anglais', 'Anglais et chinois', 'Français et autochtone'],
    optionsEn: ['English and Spanish', 'French and English', 'English and Chinese', 'French and Indigenous'],
    correctAnswer: 1, explanation: 'Le français et l\'anglais sont les langues officielles.', explanationEn: 'French and English are the official languages.'
  },
  {
    id: 12, category: 'government',
    question: 'Où siège le Parlement du Canada?',
    questionEn: 'Where does the Parliament of Canada sit?',
    options: ['À Toronto', 'À Ottawa', 'À Montréal', 'À Vancouver'],
    optionsEn: ['In Toronto', 'In Ottawa', 'In Montreal', 'In Vancouver'],
    correctAnswer: 1, explanation: 'Le Parlement siège à Ottawa.', explanationEn: 'Parliament sits in Ottawa.'
  },
  {
    id: 13, category: 'responsibilities',
    question: 'Quelle est une obligation légale des citoyens canadiens?',
    questionEn: 'What is a legal obligation of Canadian citizens?',
    options: ['Servir dans l\'armée', 'Payer des impôts', 'Apprendre les deux langues', 'Travailler pour le gouvernement'],
    optionsEn: ['Serve in the military', 'Pay taxes', 'Learn both languages', 'Work for the government'],
    correctAnswer: 1, explanation: 'Payer des impôts est une obligation légale.', explanationEn: 'Paying taxes is a legal obligation.'
  },
  {
    id: 14, category: 'geography',
    question: 'Quelle est la plus grande ville du Canada?',
    questionEn: 'What is the largest city in Canada?',
    options: ['Vancouver', 'Montréal', 'Toronto', 'Calgary'],
    optionsEn: ['Vancouver', 'Montreal', 'Toronto', 'Calgary'],
    correctAnswer: 2, explanation: 'Toronto est la plus grande ville du Canada.', explanationEn: 'Toronto is the largest city in Canada.'
  },
  {
    id: 15, category: 'history',
    question: 'Qui était Sir John A. Macdonald?',
    questionEn: 'Who was Sir John A. Macdonald?',
    options: ['Le premier gouverneur général', 'Le premier premier ministre du Canada', 'Un général militaire', 'Un explorateur français'],
    optionsEn: ['The first Governor General', 'The first Prime Minister of Canada', 'A military general', 'A French explorer'],
    correctAnswer: 1, explanation: 'Sir John A. Macdonald a été le premier premier ministre.', explanationEn: 'Sir John A. Macdonald was the first Prime Minister.'
  },
  {
    id: 16, category: 'symbols',
    question: 'Que représente la feuille d\'érable sur le drapeau canadien?',
    questionEn: 'What does the maple leaf on the Canadian flag represent?',
    options: ['Les 10 provinces', 'Le Canada et ses ressources naturelles', 'La paix et la liberté', 'Les deux langues officielles'],
    optionsEn: ['The 10 provinces', 'Canada and its natural resources', 'Peace and freedom', 'The two official languages'],
    correctAnswer: 1, explanation: 'La feuille d\'érable représente le Canada.', explanationEn: 'The maple leaf represents Canada.'
  },
  {
    id: 17, category: 'rights',
    question: 'Qu\'est-ce que la mobilité canadienne?',
    questionEn: 'What is Canadian mobility rights?',
    options: ['Le droit de voyager à l\'étranger', 'Le droit de vivre et travailler partout au Canada', 'Le droit de changer de nom', 'Le droit de posséder un véhicule'],
    optionsEn: ['The right to travel abroad', 'The right to live and work anywhere in Canada', 'The right to change your name', 'The right to own a vehicle'],
    correctAnswer: 1, explanation: 'La liberté de mouvement permet de vivre partout au Canada.', explanationEn: 'Mobility rights allow living anywhere in Canada.'
  },
  {
    id: 18, category: 'government',
    question: 'Combien de temps dure un mandat électoral fédéral au maximum?',
    questionEn: 'How long is a federal election term maximum?',
    options: ['3 ans', '4 ans', '5 ans', '6 ans'],
    optionsEn: ['3 years', '4 years', '5 years', '6 years'],
    correctAnswer: 2, explanation: 'Un mandat fédéral peut durer jusqu\'à 5 ans.', explanationEn: 'A federal term can last up to 5 years.'
  },
  {
    id: 19, category: 'culture',
    question: 'Quel sport est considéré comme le sport national d\'hiver du Canada?',
    questionEn: 'Which sport is considered Canada\'s national winter sport?',
    options: ['Le ski', 'Le hockey sur glace', 'Le patinage', 'Le curling'],
    optionsEn: ['Skiing', 'Ice hockey', 'Skating', 'Curling'],
    correctAnswer: 1, explanation: 'Le hockey sur glace est le sport national d\'hiver.', explanationEn: 'Ice hockey is the national winter sport.'
  },
  {
    id: 20, category: 'history',
    question: 'Qui sont les Métis?',
    questionEn: 'Who are the Métis?',
    options: ['Des immigrants français', 'Des personnes d\'ascendance mixte autochtone et européenne', 'Des colons britanniques', 'Des réfugiés américains'],
    optionsEn: ['French immigrants', 'People of mixed Indigenous and European ancestry', 'British settlers', 'American refugees'],
    correctAnswer: 1, explanation: 'Les Métis sont un peuple autochtone distinct.', explanationEn: 'The Métis are a distinct Indigenous people.'
  }
]

