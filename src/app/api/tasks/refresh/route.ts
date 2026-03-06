import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Task descriptions by title
const taskDescriptions: Record<string, { description: string; descriptionEn: string; source?: string }> = {
  // PERMANENT_RESIDENT tasks
  'Obtenir votre Numéro d\'Assurance Sociale (NAS)': {
    description: '🆔 Numéro d\'Assurance Sociale (NAS)\n\n✅ OÙ OBTENIR:\n• Service Canada (en personne)\n• En ligne: canada.ca/sin\n\n📋 DOCUMENTS REQUIS:\n• Passeport ou carte de PR\n• Preuve de résidence\n• Formulaire completé\n\n💰 COÛT: Gratuit\n⏱️ DÉLAI: Immédiat (en personne) ou 10-20 jours (en ligne)\n\n⚠️ IMPORTANT: Le NAS est OBLIGATOIRE pour travailler au Canada.',
    descriptionEn: '🆔 Social Insurance Number (SIN)\n\n✅ WHERE TO GET:\n• Service Canada (in person)\n• Online: canada.ca/sin\n\n📋 REQUIRED DOCUMENTS:\n• Passport or PR card\n• Proof of residence\n• Completed form\n\n💰 COST: Free\n⏱️ PROCESSING: Immediate (in person) or 10-20 days (online)\n\n⚠️ IMPORTANT: SIN is MANDATORY to work in Canada.',
    source: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html'
  },
  'Ouvrir un compte bancaire canadien': {
    description: '🏦 Compte bancaire canadien\n\n✅ BANQUES AVEC PROGRAMMES NOUVEAUX ARRIVANTS:\n• RBC: Compte gratuit 1 an + bonus $300\n• TD: Compte gratuit 1 an + bonus $350\n• Scotiabank: StartRight® + bonus $350\n• BMO: NewStart® + bonus $350\n• CIBC: Compte Smart™ + bonus $400\n\n📋 DOCUMENTS REQUIS:\n• Passeport\n• Carte de PR ou Confirmation de PR\n• Preuve de résidence (bail accepté)\n\n💰 DÉPÔT MINIMUM: $0-100 selon la banque',
    descriptionEn: '🏦 Canadian Bank Account\n\n✅ BANKS WITH NEWCOMER PROGRAMS:\n• RBC: Free account 1 year + $300 bonus\n• TD: Free account 1 year + $350 bonus\n• Scotiabank: StartRight® + $350 bonus\n• BMO: NewStart® + $350 bonus\n• CIBC: Smart™ Account + $400 bonus\n\n📋 REQUIRED DOCUMENTS:\n• Passport\n• PR card or Confirmation of PR\n• Proof of residence (lease accepted)\n\n💰 MINIMUM DEPOSIT: $0-100 depending on bank'
  },
  'Demander votre carte d\'assurance-maladie provinciale': {
    description: '🏥 Assurance-maladie provinciale\n\n✅ DÉLAI D\'ATTENTE:\n• Ontario: Aucun pour les RP\n• Québec: 0-3 mois\n• Autres provinces: 3 mois\n\n📋 DOCUMENTS GÉNÉRALEMENT REQUIS:\n• Carte de résident permanent\n• Preuve de résidence (bail, factures)\n• Passeport\n• Pièce d\'identité avec photo\n\n⚠️ PRÉVOYEZ une assurance privée pendant la période d\'attente!',
    descriptionEn: '🏥 Provincial Health Insurance\n\n✅ WAITING PERIOD:\n• Ontario: None for PRs\n• Quebec: 0-3 months\n• Other provinces: 3 months\n\n📋 GENERALLY REQUIRED DOCUMENTS:\n• Permanent Resident card\n• Proof of residence (lease, bills)\n• Passport\n• Photo ID\n\n⚠️ PLAN for private insurance during waiting period!'
  },
  'Obtenir votre carte de résident permanent': {
    description: '🛡️ Carte de résident permanent (PR Card)\n\n✅ POUR LES NOUVEAUX RP:\n• IRCC envoie automatiquement la carte après l\'atterrissage\n• Délai: 2-4 semaines\n\n📋 SI VOUS DEVEZ DEMANDER:\n• Formulaire IMM 5444\n• Photos conformes aux spécifications\n• Frais: $50 CAD\n\n⚠️ La carte est OBLIGATOIRE pour:\n• Voyages hors Canada\n• Preuve de statut\n• Demandes gouvernementales',
    descriptionEn: '🛡️ Permanent Resident Card (PR Card)\n\n✅ FOR NEW PRs:\n• IRCC automatically sends card after landing\n• Processing: 2-4 weeks\n\n📋 IF YOU NEED TO APPLY:\n• Form IMM 5444\n• Photos meeting specifications\n• Fee: $50 CAD\n\n⚠️ Card is MANDATORY for:\n• Travel outside Canada\n• Proof of status\n• Government applications',
    source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/demande/carte-resident-permanent.html'
  },
  'Créer un compte CRA (Agence du revenu du Canada)': {
    description: '💰 Compte CRA (Agence du revenu du Canada)\n\n✅ POURQUOI CRÉER UN COMPTE:\n• Déclaration d\'impôts en ligne\n• Suivi des prestations (CCB, GST/HST)\n• Accès à Mon Dossier\n• Gestion des remboursements\n\n📋 INSCRIPTION:\n• canada.ca/mon-dossier\n• Numéro d\'assurance sociale requis\n• Code de sécurité envoyé par courrier\n\n💰 GRATUIT',
    descriptionEn: '💰 CRA Account (Canada Revenue Agency)\n\n✅ WHY CREATE AN ACCOUNT:\n• File taxes online\n• Track benefits (CCB, GST/HST)\n• Access My Account\n• Manage refunds\n\n📋 REGISTRATION:\n• canada.ca/my-account\n• Social Insurance Number required\n• Security code sent by mail\n\n💰 FREE',
    source: 'https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-connexion-ouverture-session.html'
  },
  'Trouver un logement': {
    description: '🏠 Trouver un logement au Canada\n\n✅ TYPES DE LOGEMENT:\n• Appartement\n• Condo\n• Maison\n• Sous-sol aménagé\n\n📋 DOCUMENTS REQUIS PAR LES PROPRIÉTAIRES:\n• Lettre d\'emploi/salaire\n• Références\n• Preuve de revenu (3x le loyer)\n• Vérification de crédit (peut être difficile sans historique)\n\n💰 COÛTS PRÉVISUALISÉS:\n• Premier mois de loyer\n• Dépôt de garantie (varie par province)\n\n🔍 SITES RECOMMANDÉS:\n• Rentals.ca\n• Kijiji\n• Facebook Marketplace\n• Centris.ca (Québec)',
    descriptionEn: '🏠 Finding Housing in Canada\n\n✅ HOUSING TYPES:\n• Apartment\n• Condo\n• House\n• Basement suite\n\n📋 DOCUMENTS LANDLORDS REQUIRE:\n• Employment/salary letter\n• References\n• Proof of income (3x rent)\n• Credit check (can be difficult without history)\n\n💰 UPFRONT COSTS:\n• First month rent\n• Security deposit (varies by province)\n\n🔍 RECOMMENDED SITES:\n• Rentals.ca\n• Kijiji\n• Facebook Marketplace\n• Centris.ca (Quebec)'
  },
  'Construire votre crédit canadien': {
    description: '💳 Construire votre historique de crédit\n\n✅ POURQUOI C\'EST IMPORTANT:\n• Location de logement\n• Prêts automobiles\n• Hypothèque\n• Taux d\'intérêt favorables\n\n📋 COMMENT COMMENCER:\n1. Obtenir une carte de crédit sécurisée ($500-1000 dépôt)\n2. Cartes pour nouveaux arrivants (RBC, Capital One)\n3. Toujours payer à temps\n4. Maintenir l\'utilisation sous 30%\n\n⚠️ Évitez:\n• Trop de demandes de crédit\n• Paiements en retard\n• Soldes élevés',
    descriptionEn: '💳 Building Your Credit History\n\n✅ WHY IT\'S IMPORTANT:\n• Rental applications\n• Car loans\n• Mortgage\n• Favorable interest rates\n\n📋 HOW TO START:\n1. Get a secured credit card ($500-1000 deposit)\n2. Newcomer cards (RBC, Capital One)\n3. Always pay on time\n4. Keep utilization under 30%\n\n⚠️ Avoid:\n• Too many credit applications\n• Late payments\n• High balances'
  },
  'Faire reconnaître vos diplômes': {
    description: '🎓 Reconnaissance des diplômes\n\n✅ POURQUOI:\n• Travailler dans votre domaine\n• Exercer une profession réglementée\n• Études avancées\n\n📋 SERVICES D\'ÉVALUATION:\n• WES (World Education Services) - $200-400\n• ICAS (International Credential Assessment)\n• IQAS (Alberta)\n• BCIT (Colombie-Britannique)\n\n⏱️ DÉLAI: 4-8 semaines\n\n⚠️ Certains métiers réglementés nécessitent des étapes supplémentaires (médecins, ingénieurs, comptables).',
    descriptionEn: '🎓 Credential Recognition\n\n✅ WHY:\n• Work in your field\n• Practice a regulated profession\n• Advanced studies\n\n📋 ASSESSMENT SERVICES:\n• WES (World Education Services) - $200-400\n• ICAS (International Credential Assessment)\n• IQAS (Alberta)\n• BCIT (British Columbia)\n\n⏱️ PROCESSING: 4-8 weeks\n\n⚠️ Some regulated professions require additional steps (doctors, engineers, accountants).',
    source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/immigrer-canada/trouver-emploi/reconnaissances-diplomes.html'
  },
  'Mettre à jour votre CV au format canadien': {
    description: '📄 CV au format canadien\n\n✅ CARACTÉRISTIQUES:\n• 1-2 pages maximum\n• Pas de photo\n• Pas d\'informations personnelles (âge, statut marital)\n• Format chronologique inversé\n\n📋 STRUCTURE RECOMMANDÉE:\n1. Coordonnées\n2. Résumé professionnel (3-4 lignes)\n3. Expérience professionnelle\n4. Formation\n5. Compétences\n\n💡 NOTRE MODULE EMPLOI peut optimiser votre CV avec l\'IA!',
    descriptionEn: '📄 Canadian Format CV\n\n✅ CHARACTERISTICS:\n• 1-2 pages maximum\n• No photo\n• No personal info (age, marital status)\n• Reverse chronological format\n\n📋 RECOMMENDED STRUCTURE:\n1. Contact information\n2. Professional summary (3-4 lines)\n3. Work experience\n4. Education\n5. Skills\n\n💡 OUR EMPLOYMENT MODULE can optimize your CV with AI!'
  },
  'Rejoindre des groupes communautaires': {
    description: '👥 Intégration communautaire\n\n✅ AVANTAGES:\n• Réseautage professionnel\n• Soutien social\n• Pratique linguistique\n• Découverte culturelle\n\n📋 OÙ TROUVER:\n• Meetup.com\n• Groupes Facebook locaux\n• Centres communautaires\n• Bibliothèques publiques\n• Associations culturelles\n\n💡 Visitez notre module Communauté pour découvrir les événements locaux!',
    descriptionEn: '👥 Community Integration\n\n✅ BENEFITS:\n• Professional networking\n• Social support\n• Language practice\n• Cultural discovery\n\n📋 WHERE TO FIND:\n• Meetup.com\n• Local Facebook groups\n• Community centers\n• Public libraries\n• Cultural associations\n\n💡 Visit our Community module to discover local events!'
  },
  // FOREIGN_STUDENT tasks
  'Confirmer votre inscription à l\'établissement d\'enseignement': {
    description: '🎓 Inscription universitaire\n\n✅ ÉTAPES:\n1. Accepter l\'offre d\'admission\n2. Payer les frais d\'inscription\n3. Choisir vos cours\n4. Obtenir votre horaire\n\n📋 DOCUMENTS À PRÉPARER:\n• Lettre d\'admission\n• Permis d\'études\n• Passeport\n• Preuve de paiement\n\n⏱️ Respectez les délais de votre établissement!',
    descriptionEn: '🎓 University Enrollment\n\n✅ STEPS:\n1. Accept admission offer\n2. Pay registration fees\n3. Select your courses\n4. Get your schedule\n\n📋 DOCUMENTS TO PREPARE:\n• Admission letter\n• Study permit\n• Passport\n• Proof of payment\n\n⏱️ Meet your institution\'s deadlines!'
  },
  'Ouvrir un compte bancaire pour étudiants': {
    description: '🏦 Compte bancaire étudiant\n\n✅ BANQUES AVEC OFFRES ÉTUDIANTS:\n• RBC: Compte étudiant gratuit\n• TD: Compte étudiant illimité\n• Scotiabank: SCENE+ rewards\n• CIBC: Compte étudiant intelligent\n\n📋 DOCUMENTS REQUIS:\n• Passeport\n• Permis d\'études\n• Preuve d\'inscription\n\n💰 GRATUIT pendant vos études!',
    descriptionEn: '🏦 Student Bank Account\n\n✅ BANKS WITH STUDENT OFFERS:\n• RBC: Free student account\n• TD: Unlimited student account\n• Scotiabank: SCENE+ rewards\n• CIBC: Smart student account\n\n📋 REQUIRED DOCUMENTS:\n• Passport\n• Study permit\n• Proof of enrollment\n\n💰 FREE during your studies!'
  },
  'Comprendre vos droits de travail (max 24h/semaine hors campus)': {
    description: '💼 Droits de travail - Étudiants internationaux\n\n✅ AUTORISATION DE TRAVAIL:\n• Hors campus: Maximum 24h/semaine pendant les sessions\n• Sur campus: Illimité\n• Vacances: Plein temps autorisé\n\n📋 CONDITIONS:\n• Permis d\'études valide\n• Études à temps plein\n• DLI (établissement désigné)\n\n⚠️ RÈGLES 2024:\nLe gouvernement a temporairement augmenté la limite à 24h/semaine.\n\n🚨 NE DÉPASSEZ PAS ces limites - risque de refus de futurs permis!',
    descriptionEn: '💼 Work Rights - International Students\n\n✅ WORK AUTHORIZATION:\n• Off-campus: Maximum 24h/week during sessions\n• On-campus: Unlimited\n• Breaks: Full-time allowed\n\n📋 CONDITIONS:\n• Valid study permit\n• Full-time studies\n• DLI (designated institution)\n\n⚠️ 2024 RULES:\nGovernment temporarily increased limit to 24h/week.\n\n🚨 DO NOT EXCEED these limits - risk of future permit refusal!',
    source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/etudiants.html'
  },
  'Trouver un logement étudiant': {
    description: '🏠 Logement étudiant\n\n✅ OPTIONS:\n• Résidences universitaires\n• Appartements partagés\n• Chambre chez l\'habitant\n\n📋 DOCUMENTS REQUIS:\n• Preuve d\'inscription\n• Lettre de garantie (parfois)\n\n💰 BUDGET À PRÉVOIR:\n• Résidence: $600-1200/mois\n• Appartement partagé: $400-800/mois\n\n🔍 SITES UTILES:\n• Kijiji\n• Facebook Marketplace\n• Site de votre université',
    descriptionEn: '🏠 Student Housing\n\n✅ OPTIONS:\n• University residences\n• Shared apartments\n• Room in a house\n\n📋 REQUIRED DOCUMENTS:\n• Proof of enrollment\n• Guarantee letter (sometimes)\n\n💰 BUDGET TO PLAN:\n• Residence: $600-1200/month\n• Shared apartment: $400-800/month\n\n🔍 USEFUL SITES:\n• Kijiji\n• Facebook Marketplace\n• Your university\'s website'
  },
  'Planifier votre éligibilité au PGWP': {
    description: '🎓 Permis de travail post-diplôme (PGWP)\n\n✅ CONDITIONS D\'ÉLIGIBILITÉ:\n• Programme de minimum 8 mois dans un DLI\n• Mène à un diplôme, certificat ou grade\n• Temps plein pendant les études\n• Permis d\'études valide\n\n📋 DURÉE DU PGWP:\n• 8-12 mois → PGWP de même durée\n• 12+ mois → PGWP de 3 ans\n\n⚠️ ATTENTION:\n• Programmes FSL < 12 mois: NON éligibles\n• Programmes à distance: NON éligibles\n• 180 jours après la fin pour appliquer\n\n💰 FRAIS: $255 CAD\n⏱️ DÉLAI: ~80-100 jours',
    descriptionEn: '🎓 Post-Graduation Work Permit (PGWP)\n\n✅ ELIGIBILITY REQUIREMENTS:\n• Minimum 8-month program at a DLI\n• Leads to a degree, certificate or diploma\n• Full-time during studies\n• Valid study permit\n\n📋 PGWP DURATION:\n• 8-12 months → Same length PGWP\n• 12+ months → 3-year PGWP\n\n⚠️ IMPORTANT:\n• FSL programs < 12 months: NOT eligible\n• Distance learning: NOT eligible\n• 180 days after graduation to apply\n\n💰 FEE: $255 CAD\n⏱️ PROCESSING: ~80-100 days',
    source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/permis/post-diplome.html'
  },
  'Créer votre profil LinkedIn': {
    description: '🔗 Profil LinkedIn pour étudiants\n\n✅ POURQUOI:\n• Réseautage professionnel\n• Opportunités d\'emploi\n• Stages et coop\n\n📋 CONSEILS:\n• Photo professionnelle\n• Résumé clair\n• Compétences pertinentes\n• Projets académiques\n\n💡 Utilisez notre module Emploi pour optimiser votre profil!',
    descriptionEn: '🔗 LinkedIn Profile for Students\n\n✅ WHY:\n• Professional networking\n• Job opportunities\n• Internships and co-ops\n\n📋 TIPS:\n• Professional photo\n• Clear summary\n• Relevant skills\n• Academic projects\n\n💡 Use our Employment module to optimize your profile!'
  },
  'Explorer les offres d\'emploi étudiant': {
    description: '💼 Emplois pour étudiants\n\n✅ TYPES D\'EMPLOIS:\n• Sur campus (bibliothèque, cafétéria)\n• Hors campus (vente au détail, service)\n• Stages rémunérés\n\n🔍 OÙ CHERCHER:\n• Centre de carrière de votre université\n• Indeed.ca\n• Job Bank (guichet-emplois.gc.ca)\n\n📋 PRÉPAREZ:\n• CV canadien\n• Lettre de motivation\n• Références',
    descriptionEn: '💼 Student Jobs\n\n✅ JOB TYPES:\n• On-campus (library, cafeteria)\n• Off-campus (retail, service)\n• Paid internships\n\n🔍 WHERE TO LOOK:\n• Your university\'s career center\n• Indeed.ca\n• Job Bank (jobbank.gc.ca)\n\n📋 PREPARE:\n• Canadian CV\n• Cover letter\n• References'
  },
  // OPEN_WORK_PERMIT tasks
  'Vérifier la date d\'expiration de votre permis': {
    description: '📅 Suivi des dates d\'expiration\n\n⚠️ IMPORTANT:\n• Renouvelez au moins 90 jours avant\n• Minimum légal: 30 jours\n\n📋 SI EXPIRATION PROCHE:\n• Appliquez immédiatement\n• Statut implicite si demande envoyée à temps\n\n💡 NouveauCap vous envoie des rappels automatiques!',
    descriptionEn: '📅 Expiry Date Tracking\n\n⚠️ IMPORTANT:\n• Renew at least 90 days before\n• Legal minimum: 30 days\n\n📋 IF EXPIRING SOON:\n• Apply immediately\n• Implied status if application sent on time\n\n💡 NouveauCap sends you automatic reminders!'
  },
  'Obtenir votre NAS si pas déjà fait': {
    description: '🆔 Numéro d\'Assurance Sociale\n\n✅ OÙ OBTENIR:\n• Service Canada (en personne)\n• En ligne: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passeport\n• Permis de travail\n\n⏱️ Immédiat en personne',
    descriptionEn: '🆔 Social Insurance Number\n\n✅ WHERE TO GET:\n• Service Canada (in person)\n• Online: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passport\n• Work permit\n\n⏱️ Immediate in person',
    source: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html'
  },
  'Calculer vos points CRS pour Entrée Express': {
    description: '📊 Système de classement complet (CRS)\n\n✅ FACTEURS:\n• Âge (max 110 points)\n• Éducation (max 150 points)\n• Langue (max 160 points)\n• Expérience Canada (max 80 points)\n\n🎯 SCORE COMPÉTITIF: 450+\n\n💡 Utilisez notre simulateur CRS dans le module Immigration!',
    descriptionEn: '📊 Comprehensive Ranking System (CRS)\n\n✅ FACTORS:\n• Age (max 110 points)\n• Education (max 150 points)\n• Language (max 160 points)\n• Canadian experience (max 80 points)\n\n🎯 COMPETITIVE SCORE: 450+\n\n💡 Use our CRS simulator in the Immigration module!'
  },
  'Demander l\'assurance-maladie provinciale': {
    description: '🏥 Assurance-maladie pour travailleurs\n\n✅ CONDITIONS GÉNÉRALES:\n• Permis de travail valide min. 6 mois\n• Emploi à temps plein\n• Résident de la province\n\n⏱️ PÉRIODE D\'ATTENTE:\n• Ontario: 3 mois\n• Québec: Max 3 mois\n• Autres: 3 mois\n\n⚠️ Prévoyez une assurance privée!',
    descriptionEn: '🏥 Health Insurance for Workers\n\n✅ GENERAL REQUIREMENTS:\n• Valid work permit min. 6 months\n• Full-time employment\n• Province resident\n\n⏱️ WAITING PERIOD:\n• Ontario: 3 months\n• Quebec: Max 3 months\n• Others: 3 months\n\n⚠️ Plan for private insurance!'
  },
  'Préparer votre dossier de résidence permanente': {
    description: '🛡️ Préparation RP\n\n✅ PROGRAMMES:\n• Entrée Express (FSW, CEC, FST)\n• PNP (Programme des candidats des provinces)\n• ESDC (parrainage)\n\n📋 DOCUMENTS À PRÉPARER:\n• Résultats EERA (examen médical)\n• Certificats de police\n• Preuves de fonds\n• Résultats IELTS/TEF\n\n💡 NouveauCap peut vous aider à planifier!',
    descriptionEn: '🛡️ PR Preparation\n\n✅ PROGRAMS:\n• Express Entry (FSW, CEC, FST)\n• PNP (Provincial Nominee Program)\n• ESDC (sponsorship)\n\n📋 DOCUMENTS TO PREPARE:\n• EERA results (medical exam)\n• Police certificates\n• Proof of funds\n• IELTS/TEF results\n\n💡 NouveauCap can help you plan!'
  },
  'Mettre à jour votre CV canadien': {
    description: '📄 CV canadien professionnel\n\n✅ FORMAT STANDARD:\n• 1-2 pages\n• Pas de photo\n• Chronologie inversée\n\n📋 INCLURE:\n• Résumé professionnel\n• Expérience pertinente\n• Compétences transférables\n\n💡 Utilisez notre optimiseur IA!',
    descriptionEn: '📄 Professional Canadian CV\n\n✅ STANDARD FORMAT:\n• 1-2 pages\n• No photo\n• Reverse chronology\n\n📋 INCLUDE:\n• Professional summary\n• Relevant experience\n• Transferable skills\n\n💡 Use our AI optimizer!'
  },
  'Créer un profil Entrée Express': {
    description: '🚀 Profil Entrée Express\n\n✅ ÉTAPES:\n1. Vérifier l\'admissibilité\n2. Rassembler les documents\n3. Créer le profil en ligne\n4. Soumettre\n\n📋 DOCUMENTS REQUIS:\n• Passeport\n• Résultats langue (IELTS/TEF)\n• Évaluation des diplômes (EÉC)\n• Lettres d\'emploi\n\n💰 Frais: $1,365 CAD (inclut les droits de RP)',
    descriptionEn: '🚀 Express Entry Profile\n\n✅ STEPS:\n1. Check eligibility\n2. Gather documents\n3. Create online profile\n4. Submit\n\n📋 REQUIRED DOCUMENTS:\n• Passport\n• Language results (IELTS/TEF)\n• Credential assessment (ECA)\n• Employment letters\n\n💰 Fee: $1,365 CAD (includes PR fees)',
    source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/immigrer-canada/entree-express.html'
  },
  // CLOSED_WORK_PERMIT tasks
  'Comprendre vos droits en tant que travailleur': {
    description: '⚖️ Droits des travailleurs au Canada\n\n✅ DROITS FONDAMENTAUX:\n• Salaire minimum provincial\n• Heures supplémentaires payées\n• Congés annuels payés\n• Environnement sécuritaire\n• Protection contre le harcèlement\n\n📋 LOIS APPLICABLES:\n• Code canadien du travail\n• Normes d\'emploi provinciales\n\n🚨 SI PROBLÈME:\n• Contactez le ministère du Travail\n• Services d\'aide juridique disponibles',
    descriptionEn: '⚖️ Worker Rights in Canada\n\n✅ FUNDAMENTAL RIGHTS:\n• Provincial minimum wage\n• Paid overtime\n• Paid annual leave\n• Safe environment\n• Protection from harassment\n\n📋 APPLICABLE LAWS:\n• Canada Labour Code\n• Provincial employment standards\n\n🚨 IF ISSUES:\n• Contact Ministry of Labour\n• Legal aid services available',
    source: 'https://www.canada.ca/fr/emploi-developpement-social/services/normes-travail.html'
  },
  'Obtenir votre NAS': {
    description: '🆔 Numéro d\'Assurance Sociale\n\n✅ OÙ OBTENIR:\n• Service Canada (en personne)\n• En ligne: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passeport\n• Permis de travail fermé\n\n⏱️ Immédiat en personne',
    descriptionEn: '🆔 Social Insurance Number\n\n✅ WHERE TO GET:\n• Service Canada (in person)\n• Online: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passport\n• Closed work permit\n\n⏱️ Immediate in person',
    source: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html'
  },
  'Ouvrir un compte bancaire': {
    description: '🏦 Compte bancaire canadien\n\n✅ OPTIONS:\n• Grandes banques (RBC, TD, etc.)\n• Banques en ligne (Tangerine, Simpli)\n\n📋 DOCUMENTS:\n• Passeport\n• Permis de travail\n• Preuve d\'adresse',
    descriptionEn: '🏦 Canadian Bank Account\n\n✅ OPTIONS:\n• Major banks (RBC, TD, etc.)\n• Online banks (Tangerine, Simpli)\n\n📋 DOCUMENTS:\n• Passport\n• Work permit\n• Proof of address'
  },
  'Connaître vos recours en cas d\'abus': {
    description: '🚨 Recours contre les abus\n\n✅ TYPES D\'ABUS:\n• Non-paiement du salaire\n• Conditions de travail dangereuses\n• Harcèlement\n• Confiscation de documents\n\n📋 OÙ DEMANDER DE L\'AIDE:\n• Ministère du Travail provincial\n• Immigration, Réfugiés et Citoyenneté Canada\n• Centres d\'aide juridique\n\n📞 URGENCES: 911',
    descriptionEn: '🚨 Recourse Against Abuse\n\n✅ TYPES OF ABUSE:\n• Non-payment of wages\n• Dangerous working conditions\n• Harassment\n• Document confiscation\n\n📋 WHERE TO GET HELP:\n• Provincial Ministry of Labour\n• Immigration, Refugees and Citizenship Canada\n• Legal aid centers\n\n📞 EMERGENCIES: 911',
    source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/employeurs-travailleurs-etrangers/assistance.html'
  },
  'Accéder aux services de santé': {
    description: '🏥 Services de santé\n\n✅ OPTIONS:\n• Assurance-maladie provinciale\n• Cliniques sans rendez-vous\n• Services d\'urgence\n\n📋 VÉRIFIER:\n• Admissibilité à l\'assurance provinciale\n• Assurance privée de votre employeur',
    descriptionEn: '🏥 Health Services\n\n✅ OPTIONS:\n• Provincial health insurance\n• Walk-in clinics\n• Emergency services\n\n📋 CHECK:\n• Eligibility for provincial insurance\n• Employer\'s private insurance'
  },
  'Options pour transferts d\'argent': {
    description: '💰 Transferts d\'argent international\n\n✅ OPTIONS:\n• Services en ligne (Wise, Remitly)\n• Banques canadiennes\n• Western Union\n\n💰 FRAIS À COMPARER:\n• Taux de change\n• Frais de transfert\n• Délais\n\n💡 Wise offre souvent les meilleurs taux!',
    descriptionEn: '💰 International Money Transfers\n\n✅ OPTIONS:\n• Online services (Wise, Remitly)\n• Canadian banks\n• Western Union\n\n💰 FEES TO COMPARE:\n• Exchange rate\n• Transfer fees\n• Processing time\n\n💡 Wise often offers the best rates!'
  }
}

// Refresh task descriptions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    // Get all tasks for user
    const tasks = await db.task.findMany({
      where: { userId }
    })

    let updated = 0

    for (const task of tasks) {
      const desc = taskDescriptions[task.title]
      if (desc && (!task.description || task.description === '')) {
        await db.task.update({
          where: { id: task.id },
          data: {
            description: desc.description,
            descriptionEn: desc.descriptionEn,
            source: desc.source || task.source
          }
        })
        updated++
      }
    }

    return NextResponse.json({ 
      success: true, 
      updated,
      total: tasks.length 
    })
  } catch (error) {
    console.error('Refresh tasks error:', error)
    return NextResponse.json({ error: 'Failed to refresh tasks' }, { status: 500 })
  }
}
