import { Language } from '../types';

export const translations = {
  // Common
  common: {
    welcome: { fr: 'Bienvenue', en: 'Welcome' },
    loading: { fr: 'Chargement...', en: 'Loading...' },
    save: { fr: 'Enregistrer', en: 'Save' },
    cancel: { fr: 'Annuler', en: 'Cancel' },
    next: { fr: 'Suivant', en: 'Next' },
    previous: { fr: 'Précédent', en: 'Previous' },
    done: { fr: 'Terminé', en: 'Done' },
    logout: { fr: 'Déconnexion', en: 'Logout' },
    settings: { fr: 'Paramètres', en: 'Settings' },
    profile: { fr: 'Profil', en: 'Profile' },
    language: { fr: 'Langue', en: 'Language' },
    french: { fr: 'Français', en: 'French' },
    english: { fr: 'Anglais', en: 'English' },
  },

  // Auth
  auth: {
    login: { fr: 'Connexion', en: 'Login' },
    register: { fr: 'Créer un compte', en: 'Create account' },
    email: { fr: 'Courriel', en: 'Email' },
    password: { fr: 'Mot de passe', en: 'Password' },
    confirmPassword: { fr: 'Confirmer le mot de passe', en: 'Confirm password' },
    name: { fr: 'Nom complet', en: 'Full name' },
    forgotPassword: { fr: 'Mot de passe oublié?', en: 'Forgot password?' },
    noAccount: { fr: "Pas encore de compte?", en: "Don't have an account?" },
    hasAccount: { fr: 'Déjà un compte?', en: 'Already have an account?' },
    loginSuccess: { fr: 'Connexion réussie!', en: 'Login successful!' },
    registerSuccess: { fr: 'Compte créé avec succès!', en: 'Account created successfully!' },
    loginError: { fr: 'Erreur de connexion', en: 'Login error' },
    registerError: { fr: 'Erreur lors de la création', en: 'Registration error' },
  },

  // Navigation
  nav: {
    home: { fr: 'Accueil', en: 'Home' },
    immigration: { fr: 'Immigration', en: 'Immigration' },
    employment: { fr: 'Emploi', en: 'Employment' },
    housing: { fr: 'Logement', en: 'Housing' },
    health: { fr: 'Santé', en: 'Health' },
    finance: { fr: 'Finances', en: 'Finance' },
    community: { fr: 'Communauté', en: 'Community' },
    profile: { fr: 'Profil', en: 'Profile' },
  },

  // Onboarding
  onboarding: {
    title: { fr: 'Bienvenue sur NouveauCap', en: 'Welcome to NouveauCap' },
    subtitle: { fr: 'Votre compagnon pour une nouvelle vie au Canada', en: 'Your companion for a new life in Canada' },
    step1Title: { fr: 'Statut d\'immigration', en: 'Immigration status' },
    step2Title: { fr: 'Province', en: 'Province' },
    step3Title: { fr: 'Ville', en: 'City' },
    step4Title: { fr: 'Date d\'arrivée', en: 'Arrival date' },
    step5Title: { fr: 'Secteur professionnel', en: 'Professional sector' },
    step6Title: { fr: 'Situation familiale', en: 'Family status' },
    step7Title: { fr: 'Objectif principal', en: 'Main goal' },
    letsGo: { fr: 'C\'est parti!', en: "Let's go!" },
  },

  // Immigration status
  status: {
    PERMANENT_RESIDENT: { fr: 'Résident permanent', en: 'Permanent Resident' },
    FOREIGN_STUDENT: { fr: 'Étudiant étranger', en: 'Foreign Student' },
    OPEN_WORK_PERMIT: { fr: 'Permis de travail ouvert', en: 'Open Work Permit' },
    CLOSED_WORK_PERMIT: { fr: 'Permis de travail fermé', en: 'Closed Work Permit' },
  },

  // Family status
  family: {
    SINGLE: { fr: 'Célibataire', en: 'Single' },
    COUPLE: { fr: 'En couple', en: 'Couple' },
    FAMILY_WITH_CHILDREN: { fr: 'Famille avec enfants', en: 'Family with children' },
  },

  // Modules
  modules: {
    immigration: {
      title: { fr: 'Immigration', en: 'Immigration' },
      tasks: { fr: 'Mes tâches', en: 'My tasks' },
      crs: { fr: 'Simulateur CRS', en: 'CRS Simulator' },
      alerts: { fr: 'Alertes', en: 'Alerts' },
    },
    employment: {
      title: { fr: 'Emploi', en: 'Employment' },
      cvOptimizer: { fr: 'Optimisation CV IA', en: 'AI CV Optimizer' },
      tracker: { fr: 'Suivi candidatures', en: 'Application Tracker' },
      jobs: { fr: 'Métiers en demande', en: 'In-demand Jobs' },
    },
    housing: {
      title: { fr: 'Logement', en: 'Housing' },
      calculator: { fr: 'Calculateur budget', en: 'Budget Calculator' },
      rights: { fr: 'Droits des locataires', en: 'Tenant Rights' },
      search: { fr: 'Rechercher un logement', en: 'Find Housing' },
    },
    health: {
      title: { fr: 'Santé', en: 'Health' },
      card: { fr: 'Carte santé', en: 'Health Card' },
      clinics: { fr: 'Cliniques proches', en: 'Nearby Clinics' },
      pharmacies: { fr: 'Pharmacies', en: 'Pharmacies' },
    },
    finance: {
      title: { fr: 'Finances', en: 'Finances' },
      taxes: { fr: 'Impôts', en: 'Taxes' },
      banks: { fr: 'Banques', en: 'Banks' },
      credit: { fr: 'Crédit', en: 'Credit' },
    },
  },

  // Tasks
  tasks: {
    pending: { fr: 'En attente', en: 'Pending' },
    inProgress: { fr: 'En cours', en: 'In Progress' },
    completed: { fr: 'Terminé', en: 'Completed' },
    noTasks: { fr: 'Aucune tâche', en: 'No tasks' },
  },

  // CRS
  crs: {
    title: { fr: 'Simulateur CRS Entrée Express', en: 'CRS Express Entry Simulator' },
    age: { fr: 'Âge', en: 'Age' },
    education: { fr: 'Niveau d\'éducation', en: 'Education level' },
    language: { fr: 'Niveau linguistique', en: 'Language level' },
    experience: { fr: 'Expérience', en: 'Experience' },
    calculate: { fr: 'Calculer mon score', en: 'Calculate my score' },
    yourScore: { fr: 'Votre score CRS', en: 'Your CRS score' },
    points: { fr: 'points', en: 'points' },
  },

  // Housing
  housing: {
    monthlyIncome: { fr: 'Revenu mensuel', en: 'Monthly Income' },
    rent: { fr: 'Loyer', en: 'Rent' },
    utilities: { fr: 'Services publics', en: 'Utilities' },
    ratio: { fr: 'Ratio logement/revenu', en: 'Housing/Income Ratio' },
    disposableIncome: { fr: 'Revenu disponible', en: 'Disposable Income' },
  },
};

export const t = (key: string, language: Language): string => {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    if (value[k]) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  if (typeof value === 'object' && value[language]) {
    return value[language];
  }

  return key;
};
