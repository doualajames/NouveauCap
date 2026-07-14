// Données partagées de l'application — extraites du monolithe app/page.tsx
import { Card } from '@/components/ui/card'
import { type Language, type Province } from '@/lib/stores/app-store'
import { Briefcase, Building, Building2, GraduationCap, Heart, Home, MapPin, Phone, Plus, Settings, Shield, Users, Wallet } from 'lucide-react'

export const provinces: { code: Province; name: string; nameEn: string }[] = [
  { code: 'ON', name: 'Ontario', nameEn: 'Ontario' },
  { code: 'QC', name: 'Québec', nameEn: 'Quebec' },
  { code: 'BC', name: 'Colombie-Britannique', nameEn: 'British Columbia' },
  { code: 'AB', name: 'Alberta', nameEn: 'Alberta' },
  { code: 'MB', name: 'Manitoba', nameEn: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan', nameEn: 'Saskatchewan' },
  { code: 'NS', name: 'Nouvelle-Écosse', nameEn: 'Nova Scotia' },
  { code: 'NB', name: 'Nouveau-Brunswick', nameEn: 'New Brunswick' },
  { code: 'PE', name: 'Île-du-Prince-Édouard', nameEn: 'Prince Edward Island' },
  { code: 'NL', name: 'Terre-Neuve-et-Labrador', nameEn: 'Newfoundland and Labrador' },
]

export const immigrationStatuses = [
  { code: 'PERMANENT_RESIDENT', icon: Shield, color: 'bg-green-500' },
  { code: 'FOREIGN_STUDENT', icon: GraduationCap, color: 'bg-blue-500' },
  { code: 'OPEN_WORK_PERMIT', icon: Briefcase, color: 'bg-purple-500' },
  { code: 'CLOSED_WORK_PERMIT', icon: Building2, color: 'bg-orange-500' },
]

export const sectors = [
  { code: 'technology', label: 'Technologie / TI', labelEn: 'Technology / IT' },
  { code: 'finance', label: 'Finance / Comptabilité', labelEn: 'Finance / Accounting' },
  { code: 'health', label: 'Santé / Médical', labelEn: 'Health / Medical' },
  { code: 'education', label: 'Éducation', labelEn: 'Education' },
  { code: 'engineering', label: 'Ingénierie', labelEn: 'Engineering' },
  { code: 'trades', label: 'Métiers spécialisés', labelEn: 'Skilled Trades' },
  { code: 'retail', label: 'Commerce de détail', labelEn: 'Retail' },
  { code: 'hospitality', label: 'Hôtellerie / Restauration', labelEn: 'Hospitality' },
  { code: 'other', label: 'Autre', labelEn: 'Other' },
]

// Countries with social security agreements with Quebec (RAMQ eligible for students)
export const countriesWithQuebecAgreement = ['FR', 'BE', 'DK', 'FI', 'GR', 'LU', 'NO', 'PT', 'RO', 'SE']

// Countries list for origin selection
export const countries = [
  // Countries with Quebec RAMQ agreement (marked with 🏥)
  { code: 'FR', name: 'France', flag: '🇫🇷', quebecAgreement: true },
  { code: 'BE', name: 'Belgique', nameEn: 'Belgium', flag: '🇧🇪', quebecAgreement: true },
  { code: 'DK', name: 'Danemark', nameEn: 'Denmark', flag: '🇩🇰', quebecAgreement: true },
  { code: 'FI', name: 'Finlande', nameEn: 'Finland', flag: '🇫🇮', quebecAgreement: true },
  { code: 'GR', name: 'Grèce', nameEn: 'Greece', flag: '🇬🇷', quebecAgreement: true },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', quebecAgreement: true },
  { code: 'NO', name: 'Norvège', nameEn: 'Norway', flag: '🇳🇴', quebecAgreement: true },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', quebecAgreement: true },
  { code: 'RO', name: 'Roumanie', nameEn: 'Romania', flag: '🇷🇴', quebecAgreement: true },
  { code: 'SE', name: 'Suède', nameEn: 'Sweden', flag: '🇸🇪', quebecAgreement: true },
  // Other common countries
  { code: 'US', name: 'États-Unis', nameEn: 'United States', flag: '🇺🇸', quebecAgreement: false },
  { code: 'CN', name: 'Chine', nameEn: 'China', flag: '🇨🇳', quebecAgreement: false },
  { code: 'IN', name: 'Inde', nameEn: 'India', flag: '🇮🇳', quebecAgreement: false },
  { code: 'BR', name: 'Brésil', nameEn: 'Brazil', flag: '🇧🇷', quebecAgreement: false },
  { code: 'MX', name: 'Mexique', nameEn: 'Mexico', flag: '🇲🇽', quebecAgreement: false },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', quebecAgreement: false },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', quebecAgreement: false },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', quebecAgreement: false },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', quebecAgreement: false },
  { code: 'NG', name: 'Nigéria', nameEn: 'Nigeria', flag: '🇳🇬', quebecAgreement: false },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', quebecAgreement: false },
  { code: 'KR', name: 'Corée du Sud', nameEn: 'South Korea', flag: '🇰🇷', quebecAgreement: false },
  { code: 'JP', name: 'Japon', nameEn: 'Japan', flag: '🇯🇵', quebecAgreement: false },
  { code: 'EG', name: 'Égypte', nameEn: 'Egypt', flag: '🇪🇬', quebecAgreement: false },
  { code: 'MA', name: 'Maroc', nameEn: 'Morocco', flag: '🇲🇦', quebecAgreement: false },
  { code: 'DZ', name: 'Algérie', nameEn: 'Algeria', flag: '🇩🇿', quebecAgreement: false },
  { code: 'TN', name: 'Tunisie', nameEn: 'Tunisia', flag: '🇹🇳', quebecAgreement: false },
  { code: 'SN', name: 'Sénégal', nameEn: 'Senegal', flag: '🇸🇳', quebecAgreement: false },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', quebecAgreement: false },
  { code: 'CM', name: 'Cameroun', nameEn: 'Cameroon', flag: '🇨🇲', quebecAgreement: false },
  { code: 'CO', name: 'Colombie', nameEn: 'Colombia', flag: '🇨🇴', quebecAgreement: false },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', quebecAgreement: false },
  { code: 'PE', name: 'Pérou', nameEn: 'Peru', flag: '🇵🇪', quebecAgreement: false },
  { code: 'AR', name: 'Argentine', nameEn: 'Argentina', flag: '🇦🇷', quebecAgreement: false },
  { code: 'CL', name: 'Chili', nameEn: 'Chile', flag: '🇨🇱', quebecAgreement: false },
  { code: 'RU', name: 'Russie', nameEn: 'Russia', flag: '🇷🇺', quebecAgreement: false },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', quebecAgreement: false },
  { code: 'DE', name: 'Allemagne', nameEn: 'Germany', flag: '🇩🇪', quebecAgreement: false },
  { code: 'IT', name: 'Italie', nameEn: 'Italy', flag: '🇮🇹', quebecAgreement: false },
  { code: 'ES', name: 'Espagne', nameEn: 'Spain', flag: '🇪🇸', quebecAgreement: false },
  { code: 'GB', name: 'Royaume-Uni', nameEn: 'United Kingdom', flag: '🇬🇧', quebecAgreement: false },
  { code: 'CH', name: 'Suisse', nameEn: 'Switzerland', flag: '🇨🇭', quebecAgreement: false },
  { code: 'AU', name: 'Australie', nameEn: 'Australia', flag: '🇦🇺', quebecAgreement: false },
  { code: 'NZ', name: 'Nouvelle-Zélande', nameEn: 'New Zealand', flag: '🇳🇿', quebecAgreement: false },
  { code: 'OTHER', name: 'Autre pays', nameEn: 'Other country', flag: '🌍', quebecAgreement: false },
]

// Clinic Database - Organized by province and postal code prefix
// Canadian postal codes: First 3 characters identify the region (FSAs - Forward Sortation Areas)
export interface Clinic {
  name: string
  nameEn?: string
  type: 'WALK_IN' | 'CLSC' | 'PRIVATE' | 'HOSPITAL' | 'COMMUNITY'
  address: string
  addressEn?: string
  phone: string
  hours?: string
  hoursEn?: string
  postalCode: string
  city: string
  cityEn?: string
  lat?: number
  lng?: number
  services?: string[]
  servicesEn?: string[]
  website?: string
}

export const clinicDatabase: Record<Province, Clinic[]> = {
  'QC': [
    // Montreal Area (H prefixes)
    { name: 'Clinique Médicale du Square', nameEn: 'Square Medical Clinic', type: 'WALK_IN', address: '1001 Rue Square, Montréal', addressEn: '1001 Square St, Montreal', phone: '514-286-2888', hours: '8h-20h 7j/7', hoursEn: '8am-8pm 7/7', postalCode: 'H3B', city: 'Montréal', cityEn: 'Montreal', services: ['Sans rendez-vous', 'Radiologie', 'Laboratoire'], servicesEn: ['Walk-in', 'Radiology', 'Laboratory'] },
    { name: 'CLSC des Faubourgs', type: 'CLSC', address: '1705 Rue Berri, Montréal', addressEn: '1705 Berri St, Montreal', phone: '514-527-2361', hours: '8h-20h L-V, 9h-17h S-D', hoursEn: '8am-8pm M-F, 9am-5pm Sat-Sun', postalCode: 'H2L', city: 'Montréal', cityEn: 'Montreal', services: ['Soins gratuits', 'Vaccination', 'Santé mentale'], servicesEn: ['Free care', 'Vaccination', 'Mental health'] },
    { name: 'Clinique Médicale Jeanne-Mance', type: 'WALK_IN', address: '1851 Rue Jeanne-Mance, Montréal', addressEn: '1851 Jeanne-Mance St, Montreal', phone: '514-842-1313', hours: '8h-21h 7j/7', hoursEn: '8am-9pm 7/7', postalCode: 'H2X', city: 'Montréal', cityEn: 'Montreal', services: ['Sans rendez-vous', 'Urgences mineures'], servicesEn: ['Walk-in', 'Minor emergencies'] },
    { name: 'CLSC Metro', type: 'CLSC', address: '1815 Rue de Mateimoine, Montréal', addressEn: '1815 de Mateimoine St, Montreal', phone: '514-934-0354', hours: '8h-20h L-V', hoursEn: '8am-8pm M-F', postalCode: 'H2L', city: 'Montréal', cityEn: 'Montreal' },
    { name: 'Clinique Rockland', type: 'PRIVATE', address: '1600 Bd de l\'Acadie, Montréal', addressEn: '1600 Acadie Blvd, Montreal', phone: '514-278-3888', hours: '9h-17h L-V', hoursEn: '9am-5pm M-F', postalCode: 'H3N', city: 'Montréal', cityEn: 'Montreal', services: ['Privé', 'Rendez-vous requis'], servicesEn: ['Private', 'Appointment required'] },
    { name: 'Centre de santé Saint-Louis', type: 'COMMUNITY', address: '2430 Rue Dundas, Montréal', addressEn: '2430 Dundas St, Montreal', phone: '514-933-8971', hours: '9h-17h L-V', hoursEn: '9am-5pm M-F', postalCode: 'H3K', city: 'Montréal', cityEn: 'Montreal' },
    // Laval Area (H7)
    { name: 'CLSC du Marigot', type: 'CLSC', address: '850 Blvd Marcel-Laurin, Laval', addressEn: '850 Marcel-Laurin Blvd, Laval', phone: '450-668-3545', hours: '8h-20h L-V', hoursEn: '8am-8pm M-F', postalCode: 'H7H', city: 'Laval' },
    { name: 'Clinique Médicale Laval', type: 'WALK_IN', address: '1700 Blvd Le Corbusier, Laval', addressEn: '1700 Le Corbusier Blvd, Laval', phone: '450-682-3388', hours: '8h-20h 7j/7', hoursEn: '8am-8pm 7/7', postalCode: 'H7S', city: 'Laval' },
    // Quebec City Area (G prefixes)
    { name: 'CLSC de la Basse-Ville', type: 'CLSC', address: '450 Rue de la Couronne, Québec', addressEn: '450 Couronne St, Quebec City', phone: '418-641-6500', hours: '8h-20h L-V', hoursEn: '8am-8pm M-F', postalCode: 'G1K', city: 'Québec', cityEn: 'Quebec City' },
    { name: 'Clinique Médicale Sainte-Foy', type: 'WALK_IN', address: '1200 Bd Laurier, Québec', addressEn: '1200 Laurier Blvd, Quebec City', phone: '418-658-3388', hours: '8h-18h L-V', hoursEn: '8am-6pm M-F', postalCode: 'G1V', city: 'Québec', cityEn: 'Quebec City' },
    { name: 'CHUL - Centre Hospitalier', type: 'HOSPITAL', address: '2705 Bd Laurier, Québec', addressEn: '2705 Laurier Blvd, Quebec City', phone: '418-654-2705', hours: '24h/24 7j/7', hoursEn: '24/7', postalCode: 'G1V', city: 'Québec', cityEn: 'Quebec City', services: ['Urgences', 'Spécialités'], servicesEn: ['Emergency', 'Specialties'] },
    // Gatineau Area (J8, J9)
    { name: 'CLSC de Gatineau', type: 'CLSC', address: '135 Bd Saint-Raymond, Gatineau', addressEn: '135 Saint-Raymond Blvd, Gatineau', phone: '819-561-5959', hours: '8h-20h L-V', hoursEn: '8am-8pm M-F', postalCode: 'J8X', city: 'Gatineau' },
    { name: 'Clinique Médicale Hull', type: 'WALK_IN', address: '705 Bd Saint-Joseph, Gatineau', addressEn: '705 Saint-Joseph Blvd, Gatineau', phone: '819-770-3030', hours: '8h-20h 7j/7', hoursEn: '8am-8pm 7/7', postalCode: 'J8Y', city: 'Gatineau' },
    // Sherbrooke Area (J1)
    { name: 'CLSC de Sherbrooke', type: 'CLSC', address: '275 Rue King Ouest, Sherbrooke', addressEn: '275 King St West, Sherbrooke', phone: '819-564-3311', hours: '8h-20h L-V', hoursEn: '8am-8pm M-F', postalCode: 'J1H', city: 'Sherbrooke' },
  ],
  'ON': [
    // Toronto Area (M prefixes)
    { name: 'Walk-in Clinic Toronto Downtown', type: 'WALK_IN', address: '123 Yonge St, Toronto', phone: '416-366-3300', hours: '8am-9pm 7/7', hoursEn: '8am-9pm 7/7', postalCode: 'M5C', city: 'Toronto', services: ['Walk-in', 'Vaccines', 'Lab on-site'], servicesEn: ['Walk-in', 'Vaccines', 'Lab on-site'] },
    { name: 'St. Michael\'s Hospital ER', type: 'HOSPITAL', address: '30 Bond St, Toronto', phone: '416-360-4000', hours: '24/7', hoursEn: '24/7', postalCode: 'M5B', city: 'Toronto', services: ['Emergency', 'Trauma'], servicesEn: ['Emergency', 'Trauma'] },
    { name: 'Toronto General Hospital', type: 'HOSPITAL', address: '200 Elizabeth St, Toronto', phone: '416-340-3131', hours: '24/7', hoursEn: '24/7', postalCode: 'M5G', city: 'Toronto', services: ['Emergency', 'Specialties'], servicesEn: ['Emergency', 'Specialties'] },
    { name: 'Clinique Médicale Francophone', nameEn: 'Francophone Medical Clinic', type: 'WALK_IN', address: '456 College St, Toronto', phone: '416-920-3300', hours: '9am-6pm M-F', hoursEn: '9am-6pm M-F', postalCode: 'M5T', city: 'Toronto', services: ['French-speaking', 'Family medicine'], servicesEn: ['French-speaking', 'Family medicine'] },
    { name: 'North York General Hospital', type: 'HOSPITAL', address: '4001 Leslie St, North York', phone: '416-756-6000', hours: '24/7', hoursEn: '24/7', postalCode: 'M2K', city: 'North York' },
    { name: 'Scarborough Health Network', type: 'HOSPITAL', address: '3050 Lawrence Ave E, Scarborough', phone: '416-438-2911', hours: '24/7', hoursEn: '24/7', postalCode: 'M1P', city: 'Scarborough' },
    // Ottawa Area (K1, K2)
    { name: 'Ottawa Hospital - Civic Campus', type: 'HOSPITAL', address: '1053 Carling Ave, Ottawa', phone: '613-722-7000', hours: '24/7', hoursEn: '24/7', postalCode: 'K1Y', city: 'Ottawa' },
    { name: 'Montfort Hospital', type: 'HOSPITAL', address: '713 Montreal Rd, Ottawa', phone: '613-746-4621', hours: '24/7', hoursEn: '24/7', postalCode: 'K1K', city: 'Ottawa', services: ['Francophone', 'Emergency'], servicesEn: ['French-speaking', 'Emergency'] },
    { name: 'CHEO - Children\'s Hospital', type: 'HOSPITAL', address: '401 Smyth Rd, Ottawa', phone: '613-737-7600', hours: '24/7', hoursEn: '24/7', postalCode: 'K1H', city: 'Ottawa', services: ['Pediatric', 'Emergency'], servicesEn: ['Pediatric', 'Emergency'] },
    { name: 'Ottawa Walk-in Clinic', type: 'WALK_IN', address: '235 Bank St, Ottawa', phone: '613-233-3300', hours: '8am-8pm 7/7', hoursEn: '8am-8pm 7/7', postalCode: 'K1P', city: 'Ottawa' },
    // Hamilton Area (L8)
    { name: 'Hamilton Health Sciences', type: 'HOSPITAL', address: '1200 Main St W, Hamilton', phone: '905-521-2100', hours: '24/7', hoursEn: '24/7', postalCode: 'L8N', city: 'Hamilton' },
    // London Area (N6)
    { name: 'London Health Sciences Centre', type: 'HOSPITAL', address: '339 Windermere Rd, London', phone: '519-685-8500', hours: '24/7', hoursEn: '24/7', postalCode: 'N6A', city: 'London' },
    // Kingston Area (K7)
    { name: 'Kingston Health Sciences Centre', type: 'HOSPITAL', address: '76 Stuart St, Kingston', phone: '613-548-3232', hours: '24/7', hoursEn: '24/7', postalCode: 'K7L', city: 'Kingston' },
  ],
  'BC': [
    // Vancouver Area (V prefixes)
    { name: 'Vancouver General Hospital', type: 'HOSPITAL', address: '899 W 12th Ave, Vancouver', phone: '604-875-4111', hours: '24/7', hoursEn: '24/7', postalCode: 'V5Z', city: 'Vancouver' },
    { name: 'St. Paul\'s Hospital', type: 'HOSPITAL', address: '1081 Burrard St, Vancouver', phone: '604-682-2344', hours: '24/7', hoursEn: '24/7', postalCode: 'V6Z', city: 'Vancouver' },
    { name: 'BC Children\'s Hospital', type: 'HOSPITAL', address: '4480 Oak St, Vancouver', phone: '604-875-2345', hours: '24/7', hoursEn: '24/7', postalCode: 'V6H', city: 'Vancouver', services: ['Pediatric', 'Emergency'], servicesEn: ['Pediatric', 'Emergency'] },
    { name: 'Vancouver Walk-in Clinic', type: 'WALK_IN', address: '1015 Davie St, Vancouver', phone: '604-681-5656', hours: '9am-9pm 7/7', hoursEn: '9am-9pm 7/7', postalCode: 'V6E', city: 'Vancouver' },
    { name: 'Clinique Francophone de Vancouver', type: 'WALK_IN', address: '888 Cambie St, Vancouver', phone: '604-683-8282', hours: '9am-5pm M-F', hoursEn: '9am-5pm M-F', postalCode: 'V6B', city: 'Vancouver', services: ['French-speaking'], servicesEn: ['French-speaking'] },
    // Victoria Area (V8, V9)
    { name: 'Royal Jubilee Hospital', type: 'HOSPITAL', address: '1952 Bay St, Victoria', phone: '250-370-8000', hours: '24/7', hoursEn: '24/7', postalCode: 'V8R', city: 'Victoria' },
    { name: 'Victoria General Hospital', type: 'HOSPITAL', address: '1 Hospital Way, Victoria', phone: '250-370-8000', hours: '24/7', hoursEn: '24/7', postalCode: 'V8Z', city: 'Victoria' },
    // Surrey Area (V3)
    { name: 'Surrey Memorial Hospital', type: 'HOSPITAL', address: '13750 96 Ave, Surrey', phone: '604-581-2211', hours: '24/7', hoursEn: '24/7', postalCode: 'V3V', city: 'Surrey' },
    // Burnaby Area (V5)
    { name: 'Burnaby Hospital', type: 'HOSPITAL', address: '3935 Kincaid St, Burnaby', phone: '604-434-4211', hours: '24/7', hoursEn: '24/7', postalCode: 'V5G', city: 'Burnaby' },
  ],
  'AB': [
    // Calgary Area (T prefixes)
    { name: 'Foothills Medical Centre', type: 'HOSPITAL', address: '1403 29 St NW, Calgary', phone: '403-944-1110', hours: '24/7', hoursEn: '24/7', postalCode: 'T2N', city: 'Calgary' },
    { name: 'Rockyview General Hospital', type: 'HOSPITAL', address: '7007 14 St SW, Calgary', phone: '403-943-3000', hours: '24/7', hoursEn: '24/7', postalCode: 'T2V', city: 'Calgary' },
    { name: 'Peter Lougheed Centre', type: 'HOSPITAL', address: '3500 26 Ave NE, Calgary', phone: '403-943-4555', hours: '24/7', hoursEn: '24/7', postalCode: 'T1Y', city: 'Calgary' },
    { name: 'Calgary Walk-in Clinic', type: 'WALK_IN', address: '321 17 Ave SW, Calgary', phone: '403-269-3300', hours: '8am-8pm 7/7', hoursEn: '8am-8pm 7/7', postalCode: 'T2S', city: 'Calgary' },
    // Edmonton Area (T5, T6)
    { name: 'University of Alberta Hospital', type: 'HOSPITAL', address: '8440 112 St NW, Edmonton', phone: '780-407-8822', hours: '24/7', hoursEn: '24/7', postalCode: 'T6G', city: 'Edmonton' },
    { name: 'Royal Alexandra Hospital', type: 'HOSPITAL', address: '10240 Kingsway Ave NW, Edmonton', phone: '780-735-4111', hours: '24/7', hoursEn: '24/7', postalCode: 'T5H', city: 'Edmonton' },
    { name: 'Stollery Children\'s Hospital', type: 'HOSPITAL', address: '8440 112 St NW, Edmonton', phone: '780-407-8822', hours: '24/7', hoursEn: '24/7', postalCode: 'T6G', city: 'Edmonton', services: ['Pediatric', 'Emergency'], servicesEn: ['Pediatric', 'Emergency'] },
    { name: 'Edmonton Walk-in Clinic', type: 'WALK_IN', address: '10020 82 Ave, Edmonton', phone: '780-433-3300', hours: '9am-9pm 7/7', hoursEn: '9am-9pm 7/7', postalCode: 'T6E', city: 'Edmonton' },
  ],
  'MB': [
    // Winnipeg Area (R prefixes)
    { name: 'Health Sciences Centre', type: 'HOSPITAL', address: '820 Sherbrook St, Winnipeg', phone: '204-787-2000', hours: '24/7', hoursEn: '24/7', postalCode: 'R3A', city: 'Winnipeg' },
    { name: 'St. Boniface Hospital', type: 'HOSPITAL', address: '409 Taché Ave, Winnipeg', phone: '204-233-8563', hours: '24/7', hoursEn: '24/7', postalCode: 'R2H', city: 'Winnipeg', services: ['Francophone', 'Emergency'], servicesEn: ['French-speaking', 'Emergency'] },
    { name: 'Children\'s Hospital of Winnipeg', type: 'HOSPITAL', address: '840 Sherbrook St, Winnipeg', phone: '204-787-4000', hours: '24/7', hoursEn: '24/7', postalCode: 'R3A', city: 'Winnipeg', services: ['Pediatric'], servicesEn: ['Pediatric'] },
    { name: 'Winnipeg Walk-in Clinic', type: 'WALK_IN', address: '265 Stafford St, Winnipeg', phone: '204-452-3311', hours: '8am-8pm 7/7', hoursEn: '8am-8pm 7/7', postalCode: 'R3M', city: 'Winnipeg' },
  ],
  'SK': [
    // Saskatoon Area (S7)
    { name: 'Royal University Hospital', type: 'HOSPITAL', address: '103 Hospital Dr, Saskatoon', phone: '306-655-1000', hours: '24/7', hoursEn: '24/7', postalCode: 'S7N', city: 'Saskatoon' },
    { name: 'Saskatoon City Hospital', type: 'HOSPITAL', address: '701 Queen St, Saskatoon', phone: '306-655-8000', hours: '24/7', hoursEn: '24/7', postalCode: 'S7K', city: 'Saskatoon' },
    // Regina Area (S4)
    { name: 'Regina General Hospital', type: 'HOSPITAL', address: '1440 14 Ave, Regina', phone: '306-766-4444', hours: '24/7', hoursEn: '24/7', postalCode: 'S4P', city: 'Regina' },
    { name: 'Pasqua Hospital', type: 'HOSPITAL', address: '4101 Dewdney Ave, Regina', phone: '306-766-2222', hours: '24/7', hoursEn: '24/7', postalCode: 'S4T', city: 'Regina' },
  ],
  'NS': [
    // Halifax Area (B3, B2)
    { name: 'QEII Health Sciences Centre', type: 'HOSPITAL', address: '1276 South Park St, Halifax', phone: '902-473-2222', hours: '24/7', hoursEn: '24/7', postalCode: 'B3H', city: 'Halifax' },
    { name: 'IWK Health Centre', type: 'HOSPITAL', address: '5850 University Ave, Halifax', phone: '902-470-8888', hours: '24/7', hoursEn: '24/7', postalCode: 'B3K', city: 'Halifax', services: ['Pediatric', 'Maternity'], servicesEn: ['Pediatric', 'Maternity'] },
    { name: 'Halifax Walk-in Clinic', type: 'WALK_IN', address: '6080 Young St, Halifax', phone: '902-455-3300', hours: '9am-9pm 7/7', hoursEn: '9am-9pm 7/7', postalCode: 'B3K', city: 'Halifax' },
  ],
  'NB': [
    // Moncton Area (E1)
    { name: 'The Moncton Hospital', type: 'HOSPITAL', address: '135 MacBeath Ave, Moncton', phone: '506-857-5111', hours: '24/7', hoursEn: '24/7', postalCode: 'E1C', city: 'Moncton' },
    { name: 'Georges L. Dumont Hospital', type: 'HOSPITAL', address: '330 University Ave, Moncton', phone: '506-862-4000', hours: '24/7', hoursEn: '24/7', postalCode: 'E1C', city: 'Moncton', services: ['Francophone'], servicesEn: ['French-speaking'] },
    // Fredericton Area (E3)
    { name: 'Dr. Everett Chalmers Hospital', type: 'HOSPITAL', address: '700 Priestman St, Fredericton', phone: '506-452-5400', hours: '24/7', hoursEn: '24/7', postalCode: 'E3B', city: 'Fredericton' },
    // Saint John Area (E2)
    { name: 'Saint John Regional Hospital', type: 'HOSPITAL', address: '400 University Ave, Saint John', phone: '506-648-6000', hours: '24/7', hoursEn: '24/7', postalCode: 'E2L', city: 'Saint John' },
  ],
  'PE': [
    // Charlottetown Area (C1)
    { name: 'Queen Elizabeth Hospital', type: 'HOSPITAL', address: '60 Riverside Dr, Charlottetown', phone: '902-894-2111', hours: '24/7', hoursEn: '24/7', postalCode: 'C1A', city: 'Charlottetown' },
    { name: 'Prince County Hospital', type: 'HOSPITAL', address: '65 Roy Boates Ave, Summerside', phone: '902-432-2500', hours: '24/7', hoursEn: '24/7', postalCode: 'C1N', city: 'Summerside' },
  ],
  'NL': [
    // St. John's Area (A1)
    { name: 'Health Sciences Centre', type: 'HOSPITAL', address: '300 Prince Philip Dr, St. John\'s', phone: '709-777-8000', hours: '24/7', hoursEn: '24/7', postalCode: 'A1B', city: 'St. John\'s' },
    { name: 'Janeway Children\'s Hospital', type: 'HOSPITAL', address: '300 Prince Philip Dr, St. John\'s', phone: '709-777-6600', hours: '24/7', hoursEn: '24/7', postalCode: 'A1B', city: 'St. John\'s', services: ['Pediatric'], servicesEn: ['Pediatric'] },
  ],
  'NT': [],
  'YT': [],
  'NU': []
}

// Function to calculate approximate distance between two postal codes
export function getPostalCodeDistance(code1: string, code2: string): number {
  // Simplified distance estimation based on postal code similarity
  // Canadian postal codes: first 3 chars = FSA (Forward Sortation Area)
  if (!code1 || !code2) return 999
  
  const c1 = code1.toUpperCase().replace(/\s/g, '').substring(0, 3)
  const c2 = code2.toUpperCase().replace(/\s/g, '').substring(0, 3)
  
  if (c1 === c2) return 0 // Same FSA = very close
  
  // Check first 2 characters (same region)
  if (c1.substring(0, 2) === c2.substring(0, 2)) return 5 // Same region, ~5km
  
  // Check first character (same province/area)
  if (c1[0] === c2[0]) return 20 // Same province, ~20km
  
  return 100 // Different province/area
}

// Function to get clinics sorted by distance to postal code
export function getClinicsByPostalCode(province: Province, postalCode: string, limit: number = 10): (Clinic & { distance: number })[] {
  const clinics = clinicDatabase[province] || []
  
  return clinics
    .map(clinic => ({
      ...clinic,
      distance: getPostalCodeDistance(postalCode, clinic.postalCode)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

// In-Demand Jobs Database by Province
// Based on Canadian job market data and provincial nominee programs
export interface InDemandJob {
  title: string
  titleEn: string
  sector: string
  sectorEn: string
  avgSalary: string
  demand: 'VERY_HIGH' | 'HIGH' | 'MODERATE'
  nocCode?: string // National Occupational Classification
  description: string
  descriptionEn: string
  requirements?: string
  requirementsEn?: string
  immigrationBonus?: string // Bonus for immigration programs
}

export const inDemandJobsByProvince: Record<Province, InDemandJob[]> = {
  'QC': [
    { title: 'Infirmier(ère) / Infirmier(ère) auxiliaire', titleEn: 'Nurse / Licensed Practical Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '65 000 $ - 95 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Forte pénurie dans tout le Québec. Le gouvernement offre des incitatifs.', descriptionEn: 'Severe shortage across Quebec. Government offers incentives.', requirements: 'Ordre des infirmières du Québec', requirementsEn: 'Order of Nurses of Quebec', immigrationBonus: 'Programme régulier des travailleurs qualifiés' },
    { title: 'Développeur informatique', titleEn: 'Software Developer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '70 000 $ - 120 000 $', demand: 'VERY_HIGH', nocCode: '21230', description: 'Montréal est un hub technologique majeur. IA, jeux vidéo, fintech.', descriptionEn: 'Montreal is a major tech hub. AI, video games, fintech.', immigrationBonus: 'Volet traitement accéléré (VTA)' },
    { title: 'Ingénieur civil', titleEn: 'Civil Engineer', sector: 'Ingénierie', sectorEn: 'Engineering', avgSalary: '75 000 $ - 110 000 $', demand: 'HIGH', nocCode: '21300', description: 'Grands projets d\'infrastructure au Québec. Construction et rénovation.', descriptionEn: 'Major infrastructure projects in Quebec. Construction and renovation.' },
    { title: 'Électricien industriel', titleEn: 'Industrial Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '55 000 $ - 85 000 $', demand: 'VERY_HIGH', nocCode: '72201', description: 'Pénurie critique. Travaux de construction et maintenance industrielle.', descriptionEn: 'Critical shortage. Construction work and industrial maintenance.', immigrationBonus: 'Priorité PRTQ' },
    { title: 'Enseignant au primaire/secondaire', titleEn: 'Elementary/Secondary Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '41220', description: 'Demande pour enseignants en mathématiques, sciences, français.', descriptionEn: 'Demand for math, science, French teachers.' },
    { title: 'Comptable professionnel agréé (CPA)', titleEn: 'Chartered Professional Accountant', sector: 'Finance', sectorEn: 'Finance', avgSalary: '65 000 $ - 110 000 $', demand: 'HIGH', nocCode: '11100', description: 'Forte demande dans les secteurs manufacturier et des services.', descriptionEn: 'High demand in manufacturing and services sectors.' },
    { title: 'Soudeur', titleEn: 'Welder', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '45 000 $ - 75 000 $', demand: 'HIGH', nocCode: '72106', description: 'Industrie manufacturière, construction navale, aéronautique.', descriptionEn: 'Manufacturing, shipbuilding, aerospace industries.' },
    { title: 'Travailleur social', titleEn: 'Social Worker', sector: 'Services sociaux', sectorEn: 'Social Services', avgSalary: '50 000 $ - 80 000 $', demand: 'HIGH', nocCode: '41300', description: 'Services aux jeunes, aux aînés, et aux familles immigrantes.', descriptionEn: 'Youth, seniors, and immigrant family services.' },
    { title: 'Mécanicien de machines lourdes', titleEn: 'Heavy Equipment Mechanic', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '50 000 $ - 80 000 $', demand: 'HIGH', nocCode: '72401', description: 'Secteur minier, construction, transport.', descriptionEn: 'Mining, construction, transport sectors.' },
    { title: 'Cuisinier / Chef', titleEn: 'Cook / Chef', sector: 'Hôtellerie', sectorEn: 'Hospitality', avgSalary: '35 000 $ - 65 000 $', demand: 'HIGH', nocCode: '63200', description: 'Industrie touristique et restauration en croissance.', descriptionEn: 'Growing tourism and restaurant industry.' },
  ],
  'ON': [
    { title: 'Développeur de logiciels', titleEn: 'Software Developer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '80 000 $ - 140 000 $', demand: 'VERY_HIGH', nocCode: '21230', description: 'Toronto-Waterloo est la Silicon Valley du Nord. IA, fintech, SaaS.', descriptionEn: 'Toronto-Waterloo is the Silicon Valley of the North. AI, fintech, SaaS.', immigrationBonus: 'OINP Tech Draw' },
    { title: 'Infirmier autorisé', titleEn: 'Registered Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '70 000 $ - 100 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Pénurie dans tout l\'Ontario, particulièrement en régions rurales.', descriptionEn: 'Shortage across Ontario, especially in rural areas.', immigrationBonus: 'OINP Human Capital' },
    { title: 'Ingénieur électrique', titleEn: 'Electrical Engineer', sector: 'Ingénierie', sectorEn: 'Engineering', avgSalary: '80 000 $ - 120 000 $', demand: 'HIGH', nocCode: '21310', description: 'Automobile, technologie propre, télécommunications.', descriptionEn: 'Automotive, clean tech, telecommunications.' },
    { title: 'Camionneur', titleEn: 'Truck Driver', sector: 'Transport', sectorEn: 'Transportation', avgSalary: '50 000 $ - 80 000 $', demand: 'VERY_HIGH', nocCode: '73300', description: 'Chauffeurs de camion longue distance et locaux recherchés.', descriptionEn: 'Long-haul and local truck drivers in demand.', immigrationBonus: 'OINP In-Demand Skills' },
    { title: 'Charpentier-menuisier', titleEn: 'Carpenter', sector: 'Construction', sectorEn: 'Construction', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '72014', description: 'Boom de la construction résidentielle et commerciale.', descriptionEn: 'Residential and commercial construction boom.' },
    { title: 'Analyste de données', titleEn: 'Data Analyst', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '70 000 $ - 110 000 $', demand: 'VERY_HIGH', nocCode: '21211', description: 'Finance, santé, commerce de détail recherchent des analystes.', descriptionEn: 'Finance, healthcare, retail seeking analysts.' },
    { title: 'Aide-soignant', titleEn: 'Personal Support Worker', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '35 000 $ - 50 000 $', demand: 'VERY_HIGH', nocCode: '33102', description: 'Soins à domicile, établissements de soins de longue durée.', descriptionEn: 'Home care, long-term care facilities.', immigrationBonus: 'OINP In-Demand Skills' },
    { title: 'Mécanicien d\'automobile', titleEn: 'Automotive Mechanic', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '45 000 $ - 75 000 $', demand: 'HIGH', nocCode: '72410', description: 'Industrie automobile importante en Ontario (Oakville, Windsor).', descriptionEn: 'Significant automotive industry in Ontario.' },
    { title: 'Pharmacien', titleEn: 'Pharmacist', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '90 000 $ - 130 000 $', demand: 'HIGH', nocCode: '31120', description: 'Expansion des chaînes de pharmacies communautaires.', descriptionEn: 'Expansion of community pharmacy chains.' },
    { title: 'Technicien en informatique', titleEn: 'IT Technician', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '50 000 $ - 80 000 $', demand: 'HIGH', nocCode: '22221', description: 'Support technique, administration réseau.', descriptionEn: 'Technical support, network administration.' },
  ],
  'BC': [
    { title: 'Développeur de logiciels', titleEn: 'Software Developer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '85 000 $ - 145 000 $', demand: 'VERY_HIGH', nocCode: '21230', description: 'Vancouver est un hub tech majeur. Studios de jeux, startups IA.', descriptionEn: 'Vancouver is a major tech hub. Game studios, AI startups.', immigrationBonus: 'BC PNP Tech' },
    { title: 'Infirmier autorisé', titleEn: 'Registered Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '70 000 $ - 100 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Système de santé sous pression. Bonus de recrutement offerts.', descriptionEn: 'Healthcare system under pressure. Recruitment bonuses offered.' },
    { title: 'Charpentier', titleEn: 'Carpenter', sector: 'Construction', sectorEn: 'Construction', avgSalary: '55 000 $ - 90 000 $', demand: 'VERY_HIGH', nocCode: '72014', description: 'Construction résidentielle en plein essor. Projets majeurs.', descriptionEn: 'Booming residential construction. Major projects.' },
    { title: 'Électricien', titleEn: 'Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '60 000 $ - 95 000 $', demand: 'VERY_HIGH', nocCode: '72200', description: 'Construction, énergie propre, infrastructure.', descriptionEn: 'Construction, clean energy, infrastructure.' },
    { title: 'Ingénieur minier', titleEn: 'Mining Engineer', sector: 'Extraction', sectorEn: 'Extraction', avgSalary: '90 000 $ - 140 000 $', demand: 'HIGH', nocCode: '21330', description: 'Industrie minière importante dans le nord de la BC.', descriptionEn: 'Significant mining industry in northern BC.' },
    { title: 'Comptable', titleEn: 'Accountant', sector: 'Finance', sectorEn: 'Finance', avgSalary: '60 000 $ - 100 000 $', demand: 'HIGH', nocCode: '11100', description: 'Centre financier de l\'Ouest canadien.', descriptionEn: 'Financial center of Western Canada.' },
    { title: 'Enseignant', titleEn: 'Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '55 000 $ - 90 000 $', demand: 'HIGH', nocCode: '41220', description: 'Pénurie dans les communautés rurales et nordiques.', descriptionEn: 'Shortage in rural and northern communities.' },
    { title: 'Cuisinier', titleEn: 'Cook', sector: 'Hôtellerie', sectorEn: 'Hospitality', avgSalary: '35 000 $ - 55 000 $', demand: 'HIGH', nocCode: '63200', description: 'Industrie touristique très forte. Ski, croisières.', descriptionEn: 'Very strong tourism industry. Ski, cruises.' },
    { title: 'Plombier', titleEn: 'Plumber', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '55 000 $ - 90 000 $', demand: 'HIGH', nocCode: '72300', description: 'Construction résidentielle et commerciale.', descriptionEn: 'Residential and commercial construction.' },
    { title: 'Technicien en HVAC', titleEn: 'HVAC Technician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '72402', description: 'Installation et maintenance de systèmes de chauffage/climatisation.', descriptionEn: 'Heating/cooling system installation and maintenance.' },
  ],
  'AB': [
    { title: 'Ingénieur pétrolier', titleEn: 'Petroleum Engineer', sector: 'Énergie', sectorEn: 'Energy', avgSalary: '100 000 $ - 180 000 $', demand: 'HIGH', nocCode: '21330', description: 'Industrie pétrolière et gazière. Tournant vers énergies renouvelables.', descriptionEn: 'Oil and gas industry. Transition to renewables.' },
    { title: 'Soudeur', titleEn: 'Welder', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '50 000 $ - 90 000 $', demand: 'VERY_HIGH', nocCode: '72106', description: 'Construction, pipelines, fabrication industrielle.', descriptionEn: 'Construction, pipelines, industrial fabrication.', immigrationBonus: 'Alberta Opportunity Stream' },
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '70 000 $ - 100 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Pénurie critique. Alberta Health Services recrute activement.', descriptionEn: 'Critical shortage. Alberta Health Services actively recruiting.' },
    { title: 'Camionneur', titleEn: 'Truck Driver', sector: 'Transport', sectorEn: 'Transportation', avgSalary: '55 000 $ - 90 000 $', demand: 'VERY_HIGH', nocCode: '73300', description: 'Transport de marchandises, secteur pétrolier.', descriptionEn: 'Freight transport, oil sector.' },
    { title: 'Électricien industriel', titleEn: 'Industrial Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '60 000 $ - 100 000 $', demand: 'VERY_HIGH', nocCode: '72201', description: 'Usines, sites pétroliers, mines.', descriptionEn: 'Factories, oil sites, mines.' },
    { title: 'Mécanicien lourd', titleEn: 'Heavy Duty Mechanic', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '60 000 $ - 100 000 $', demand: 'VERY_HIGH', nocCode: '72401', description: 'Équipements miniers, construction, pétrole.', descriptionEn: 'Mining equipment, construction, oil.' },
    { title: 'Charpentier', titleEn: 'Carpenter', sector: 'Construction', sectorEn: 'Construction', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '72014', description: 'Construction résidentielle et commerciale en croissance.', descriptionEn: 'Growing residential and commercial construction.' },
    { title: 'Comptable', titleEn: 'Accountant', sector: 'Finance', sectorEn: 'Finance', avgSalary: '60 000 $ - 100 000 $', demand: 'HIGH', nocCode: '11100', description: 'Secteurs pétrolier, construction, services.', descriptionEn: 'Oil, construction, services sectors.' },
    { title: 'Technicien en instrumentation', titleEn: 'Instrumentation Technician', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '65 000 $ - 100 000 $', demand: 'HIGH', nocCode: '22401', description: 'Automatisation industrielle, contrôle de processus.', descriptionEn: 'Industrial automation, process control.' },
    { title: 'Aide-soignant', titleEn: 'Health Care Aide', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '35 000 $ - 50 000 $', demand: 'VERY_HIGH', nocCode: '33102', description: 'Établissements de soins de longue durée.', descriptionEn: 'Long-term care facilities.' },
  ],
  'MB': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '65 000 $ - 95 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Winnipeg et régions rurales en pénurie.', descriptionEn: 'Winnipeg and rural areas in shortage.', immigrationBonus: 'MPNP Strategic Recruitment' },
    { title: 'Développeur informatique', titleEn: 'Software Developer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '60 000 $ - 100 000 $', demand: 'HIGH', nocCode: '21230', description: 'Winnipeg développe son secteur tech. Coût de vie bas.', descriptionEn: 'Winnipeg developing its tech sector. Low cost of living.' },
    { title: 'Camionneur', titleEn: 'Truck Driver', sector: 'Transport', sectorEn: 'Transportation', avgSalary: '45 000 $ - 75 000 $', demand: 'VERY_HIGH', nocCode: '73300', description: 'Hub de transport au centre du Canada.', descriptionEn: 'Transport hub in central Canada.', immigrationBonus: 'MPNP In-Demand Occupations' },
    { title: 'Enseignant', titleEn: 'Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '41220', description: 'Écoles francophones et anglophones recherchent des enseignants.', descriptionEn: 'French and English schools seeking teachers.' },
    { title: 'Soudeur', titleEn: 'Welder', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '45 000 $ - 75 000 $', demand: 'HIGH', nocCode: '72106', description: 'Fabrication métallique, construction.', descriptionEn: 'Metal fabrication, construction.' },
    { title: 'Comptable', titleEn: 'Accountant', sector: 'Finance', sectorEn: 'Finance', avgSalary: '55 000 $ - 90 000 $', demand: 'HIGH', nocCode: '11100', description: 'Services financiers en croissance à Winnipeg.', descriptionEn: 'Growing financial services in Winnipeg.' },
    { title: 'Agriculteur / Technicien agricole', titleEn: 'Farmer / Agricultural Technician', sector: 'Agriculture', sectorEn: 'Agriculture', avgSalary: '40 000 $ - 70 000 $', demand: 'HIGH', nocCode: '82030', description: 'Grande province agricole. Fermes laitières, céréales.', descriptionEn: 'Major agricultural province. Dairy, grain farms.' },
    { title: 'Électricien', titleEn: 'Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '72200', description: 'Construction et maintenance industrielle.', descriptionEn: 'Construction and industrial maintenance.' },
  ],
  'SK': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '65 000 $ - 95 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Pénurie dans tout le système de santé.', descriptionEn: 'Shortage throughout healthcare system.', immigrationBonus: 'SINP Health Sector' },
    { title: 'Ingénieur minier', titleEn: 'Mining Engineer', sector: 'Extraction', sectorEn: 'Extraction', avgSalary: '85 000 $ - 130 000 $', demand: 'VERY_HIGH', nocCode: '21330', description: 'Potasse, uranium. Majeur producteur mondial.', descriptionEn: 'Potash, uranium. Major global producer.' },
    { title: 'Soudeur', titleEn: 'Welder', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '45 000 $ - 80 000 $', demand: 'VERY_HIGH', nocCode: '72106', description: 'Industrie manufacturière et mines.', descriptionEn: 'Manufacturing and mining industries.', immigrationBonus: 'SINP In-Demand' },
    { title: 'Camionneur', titleEn: 'Truck Driver', sector: 'Transport', sectorEn: 'Transportation', avgSalary: '45 000 $ - 75 000 $', demand: 'VERY_HIGH', nocCode: '73300', description: 'Transport de marchandises agricoles et minières.', descriptionEn: 'Agricultural and mining freight transport.' },
    { title: 'Électricien industriel', titleEn: 'Industrial Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '55 000 $ - 90 000 $', demand: 'HIGH', nocCode: '72201', description: 'Mines, usines de transformation.', descriptionEn: 'Mines, processing plants.' },
    { title: 'Mécanicien lourd', titleEn: 'Heavy Equipment Mechanic', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '55 000 $ - 90 000 $', demand: 'VERY_HIGH', nocCode: '72401', description: 'Équipements miniers et agricoles.', descriptionEn: 'Mining and agricultural equipment.' },
    { title: 'Travailleur agricole', titleEn: 'Farm Worker', sector: 'Agriculture', sectorEn: 'Agriculture', avgSalary: '30 000 $ - 50 000 $', demand: 'HIGH', nocCode: '85100', description: 'Céréales, oléagineux, élevage.', descriptionEn: 'Grains, oilseeds, livestock.' },
    { title: 'Enseignant', titleEn: 'Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '41220', description: 'Communautés rurales et nordiques.', descriptionEn: 'Rural and northern communities.' },
  ],
  'NS': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '65 000 $ - 95 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Système de santé sous forte pression.', descriptionEn: 'Healthcare system under severe pressure.', immigrationBonus: 'NSNP Labour Market Priorities' },
    { title: 'Développeur informatique', titleEn: 'Software Developer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '60 000 $ - 100 000 $', demand: 'HIGH', nocCode: '21230', description: 'Halifax développe son écosystème tech. Startups, centres d\'appels tech.', descriptionEn: 'Halifax developing tech ecosystem. Startups, tech call centers.' },
    { title: 'Charpentier', titleEn: 'Carpenter', sector: 'Construction', sectorEn: 'Construction', avgSalary: '45 000 $ - 75 000 $', demand: 'HIGH', nocCode: '72014', description: 'Projet de construction navale Irving. Boom immobilier.', descriptionEn: 'Irving shipbuilding project. Real estate boom.' },
    { title: 'Électricien', titleEn: 'Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '72200', description: 'Construction navale, résidentiel, commercial.', descriptionEn: 'Shipbuilding, residential, commercial.' },
    { title: 'Soudeur', titleEn: 'Welder', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '45 000 $ - 80 000 $', demand: 'VERY_HIGH', nocCode: '72106', description: 'Construction navale Irving - demande massive.', descriptionEn: 'Irving shipbuilding - massive demand.', immigrationBonus: 'NSNP In-Demand' },
    { title: 'Enseignant', titleEn: 'Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '41220', description: 'Écoles françaises et anglaises.', descriptionEn: 'French and English schools.' },
    { title: 'Mécanicien', titleEn: 'Mechanic', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '45 000 $ - 75 000 $', demand: 'HIGH', nocCode: '72410', description: 'Automobile, marine, industriel.', descriptionEn: 'Automotive, marine, industrial.' },
    { title: 'Aide-soignant', titleEn: 'Continuing Care Assistant', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '32 000 $ - 45 000 $', demand: 'VERY_HIGH', nocCode: '33102', description: 'Soins à domicile, établissements de soins.', descriptionEn: 'Home care, care facilities.' },
  ],
  'NB': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '60 000 $ - 90 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Pénurie critique. Seule province officiellement bilingue.', descriptionEn: 'Critical shortage. Only officially bilingual province.', immigrationBonus: 'NBPNP Express Entry' },
    { title: 'Enseignant francophone', titleEn: 'French Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '50 000 $ - 80 000 $', demand: 'VERY_HIGH', nocCode: '41220', description: 'Seule province bilingue. Forte demande pour enseignants francophones.', descriptionEn: 'Only bilingual province. High demand for francophone teachers.' },
    { title: 'Développeur informatique', titleEn: 'Software Developer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '55 000 $ - 95 000 $', demand: 'HIGH', nocCode: '21230', description: 'Moncton et Fredericton développent leur secteur tech.', descriptionEn: 'Moncton and Fredericton developing tech sector.' },
    { title: 'Camionneur', titleEn: 'Truck Driver', sector: 'Transport', sectorEn: 'Transportation', avgSalary: '40 000 $ - 70 000 $', demand: 'HIGH', nocCode: '73300', description: 'Transport de marchandises. Port de Saint John.', descriptionEn: 'Freight transport. Port of Saint John.' },
    { title: 'Charpentier', titleEn: 'Carpenter', sector: 'Construction', sectorEn: 'Construction', avgSalary: '40 000 $ - 70 000 $', demand: 'HIGH', nocCode: '72014', description: 'Construction résidentielle et commerciale.', descriptionEn: 'Residential and commercial construction.' },
    { title: 'Comptable bilingue', titleEn: 'Bilingual Accountant', sector: 'Finance', sectorEn: 'Finance', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '11100', description: 'Services financiers bilingues recherchés.', descriptionEn: 'Bilingual financial services in demand.' },
    { title: 'Travailleur social', titleEn: 'Social Worker', sector: 'Services sociaux', sectorEn: 'Social Services', avgSalary: '45 000 $ - 75 000 $', demand: 'HIGH', nocCode: '41300', description: 'Services aux familles, jeunes, aînés.', descriptionEn: 'Family, youth, senior services.' },
    { title: 'Électricien', titleEn: 'Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '45 000 $ - 80 000 $', demand: 'HIGH', nocCode: '72200', description: 'Construction et maintenance.', descriptionEn: 'Construction and maintenance.' },
  ],
  'PE': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '60 000 $ - 90 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Petit système de santé en pénurie.', descriptionEn: 'Small healthcare system in shortage.', immigrationBonus: 'PEI PNP Labour Impact' },
    { title: 'Travailleur agricole', titleEn: 'Farm Worker', sector: 'Agriculture', sectorEn: 'Agriculture', avgSalary: '28 000 $ - 45 000 $', demand: 'VERY_HIGH', nocCode: '85100', description: 'Pomme de terre, agriculture. Plus grosse industrie.', descriptionEn: 'Potatoes, agriculture. Biggest industry.' },
    { title: 'Cuisinier / Chef', titleEn: 'Cook / Chef', sector: 'Hôtellerie', sectorEn: 'Hospitality', avgSalary: '30 000 $ - 55 000 $', demand: 'HIGH', nocCode: '63200', description: 'Tourisme important en été. Restaurants réputés.', descriptionEn: 'Important summer tourism. Renowned restaurants.' },
    { title: 'Serveur', titleEn: 'Server', sector: 'Hôtellerie', sectorEn: 'Hospitality', avgSalary: '25 000 $ - 45 000 $', demand: 'HIGH', nocCode: '65200', description: 'Industrie touristique saisonnière.', descriptionEn: 'Seasonal tourism industry.' },
    { title: 'Charpentier', titleEn: 'Carpenter', sector: 'Construction', sectorEn: 'Construction', avgSalary: '40 000 $ - 70 000 $', demand: 'HIGH', nocCode: '72014', description: 'Construction résidentielle en croissance.', descriptionEn: 'Growing residential construction.' },
    { title: 'Développeur web', titleEn: 'Web Developer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '50 000 $ - 85 000 $', demand: 'MODERATE', nocCode: '21230', description: 'Startups tech émergentes à Charlottetown.', descriptionEn: 'Emerging tech startups in Charlottetown.' },
  ],
  'NL': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '65 000 $ - 95 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Pénurie critique. Terre-Neuve offre des incitatifs.', descriptionEn: 'Critical shortage. Newfoundland offers incentives.', immigrationBonus: 'NLPNP Priority Skills' },
    { title: 'Ingénieur pétrolier', titleEn: 'Petroleum Engineer', sector: 'Énergie', sectorEn: 'Energy', avgSalary: '90 000 $ - 150 000 $', demand: 'HIGH', nocCode: '21330', description: 'Projets offshore. Hibernia, Terra Nova.', descriptionEn: 'Offshore projects. Hibernia, Terra Nova.' },
    { title: 'Soudeur', titleEn: 'Welder', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '50 000 $ - 85 000 $', demand: 'VERY_HIGH', nocCode: '72106', description: 'Construction navale (Memorial University), pétrole offshore.', descriptionEn: 'Shipbuilding (Memorial University), offshore oil.' },
    { title: 'Ingénieur minier', titleEn: 'Mining Engineer', sector: 'Extraction', sectorEn: 'Extraction', avgSalary: '80 000 $ - 130 000 $', demand: 'HIGH', nocCode: '21330', description: 'Mines de fer, nickel. Voisey\'s Bay.', descriptionEn: 'Iron, nickel mines. Voisey\'s Bay.' },
    { title: 'Électricien', titleEn: 'Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '72200', description: 'Industrie pétrolière, construction.', descriptionEn: 'Oil industry, construction.' },
    { title: 'Mécanicien lourd', titleEn: 'Heavy Equipment Mechanic', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '55 000 $ - 90 000 $', demand: 'HIGH', nocCode: '72401', description: 'Mines, pétrole, construction.', descriptionEn: 'Mining, oil, construction.' },
    { title: 'Enseignant', titleEn: 'Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '50 000 $ - 85 000 $', demand: 'HIGH', nocCode: '41220', description: 'Communautés rurales et côtières.', descriptionEn: 'Rural and coastal communities.' },
    { title: 'Programmeur informatique', titleEn: 'Computer Programmer', sector: 'Technologie', sectorEn: 'Technology', avgSalary: '55 000 $ - 95 000 $', demand: 'MODERATE', nocCode: '21230', description: 'St. John\'s développe un secteur tech.', descriptionEn: 'St. John\'s developing a tech sector.' },
  ],
  'NT': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '80 000 $ - 120 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Salaires élevés. Isolation pay. Communautés nordiques.', descriptionEn: 'High salaries. Isolation pay. Northern communities.' },
    { title: 'Mineur', titleEn: 'Miner', sector: 'Extraction', sectorEn: 'Extraction', avgSalary: '80 000 $ - 140 000 $', demand: 'HIGH', nocCode: '83100', description: 'Diamants (Diavik, Ekati), or.', descriptionEn: 'Diamonds (Diavik, Ekati), gold.' },
    { title: 'Électricien', titleEn: 'Electrician', sector: 'Métiers spécialisés', sectorEn: 'Skilled Trades', avgSalary: '70 000 $ - 110 000 $', demand: 'VERY_HIGH', nocCode: '72200', description: 'Mines, construction, maintenance.', descriptionEn: 'Mines, construction, maintenance.' },
  ],
  'YT': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '75 000 $ - 110 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Salaires nordiques. Whitehorse et communautés rurales.', descriptionEn: 'Northern salaries. Whitehorse and rural communities.' },
    { title: 'Enseignant', titleEn: 'Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '60 000 $ - 95 000 $', demand: 'HIGH', nocCode: '41220', description: 'Écoles en régions éloignées.', descriptionEn: 'Schools in remote areas.' },
    { title: 'Mineur', titleEn: 'Miner', sector: 'Extraction', sectorEn: 'Extraction', avgSalary: '75 000 $ - 130 000 $', demand: 'HIGH', nocCode: '83100', description: 'Or, métaux précieux.', descriptionEn: 'Gold, precious metals.' },
  ],
  'NU': [
    { title: 'Infirmier', titleEn: 'Nurse', sector: 'Santé', sectorEn: 'Healthcare', avgSalary: '85 000 $ - 130 000 $', demand: 'VERY_HIGH', nocCode: '31301', description: 'Salaires les plus élevés au Canada. Isolation.', descriptionEn: 'Highest salaries in Canada. Isolation.' },
    { title: 'Mineur', titleEn: 'Miner', sector: 'Extraction', sectorEn: 'Extraction', avgSalary: '90 000 $ - 150 000 $', demand: 'HIGH', nocCode: '83100', description: 'Mines d\'or, diamants, fer.', descriptionEn: 'Gold, diamond, iron mines.' },
    { title: 'Enseignant', titleEn: 'Teacher', sector: 'Éducation', sectorEn: 'Education', avgSalary: '70 000 $ - 105 000 $', demand: 'HIGH', nocCode: '41220', description: 'Communautés inuites. Programme d\'enseignement du Nord.', descriptionEn: 'Inuit communities. Northern teaching program.' },
  ],
}


export const modules = [
  { id: 'province', icon: MapPin, color: 'text-cyan-500', bgColor: 'bg-cyan-50 dark:bg-cyan-950' },
  { id: 'immigration', icon: Shield, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-950' },
  { id: 'employment', icon: Briefcase, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950' },
  { id: 'housing', icon: Building, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-950' },
  { id: 'finance', icon: Wallet, color: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-950' },
  { id: 'health', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-950' },
  { id: 'community', icon: Users, color: 'text-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-950' },
  { id: 'admin', icon: Settings, color: 'text-gray-500', bgColor: 'bg-gray-50 dark:bg-gray-950' },
]

// ==================== MAIN APP ====================

export const provincialPolicies: Record<string, Record<string, {
  welcomeProgram: { name: string; nameEn: string; description: string; descriptionEn: string; url: string; services: string[]; servicesEn: string[] }
  employment: { name: string; nameEn: string; description: string; descriptionEn: string; url: string; services: string[]; servicesEn: string[] }
  language: { name: string; nameEn: string; description: string; descriptionEn: string; url: string; services: string[]; servicesEn: string[] }
  settlement: { name: string; nameEn: string; description: string; descriptionEn: string; url: string; services: string[]; servicesEn: string[] }
  financialAid?: { name: string; nameEn: string; description: string; descriptionEn: string; url: string; amount?: string }
}>> = {
  'QC': {
    'PERMANENT_RESIDENT': {
      welcomeProgram: {
        name: 'Programme d\'accueil et d\'intégration du Québec',
        nameEn: 'Quebec Welcome and Integration Program',
        description: 'Services gratuits d\'accueil, d\'accompagnement et d\'intégration offerts par le Ministère de l\'Immigration, de la Francisation et de l\'Intégration (MIFI).',
        descriptionEn: 'Free welcome, support and integration services offered by the Ministry of Immigration, Francisation and Integration (MIFI).',
        url: 'https://www.quebec.ca/immigration/integration-quebec',
        services: ['Accueil à l\'aéroport', 'Accompagnement personnalisé', 'Information sur la vie au Québec', 'Références vers les services'],
        servicesEn: ['Airport welcome', 'Personalized support', 'Information on life in Quebec', 'Service referrals']
      },
      employment: {
        name: 'Services d\'intégration en emploi',
        nameEn: 'Employment Integration Services',
        description: 'Services d\'aide à l\'emploi offerts par Québec en tête et les Carrefours d\'intégration pour les nouveaux arrivants.',
        descriptionEn: 'Employment assistance services offered by Québec en tête and Integration Carrefours for newcomers.',
        url: 'https://www.quebec.ca/emploi/emploi-aide-integration',
        services: ['Évaluation des compétences', 'Aide à la recherche d\'emploi', 'Information sur les professions réglementées', 'Stages et formations'],
        servicesEn: ['Skills assessment', 'Job search assistance', 'Information on regulated professions', 'Internships and training']
      },
      language: {
        name: 'Francisation Québec',
        nameEn: 'Quebec Francisation',
        description: 'Cours de français gratuits pour les nouveaux arrivants, offerts par le MIFI et les centres de services scolaires.',
        descriptionEn: 'Free French courses for newcomers, offered by MIFI and school service centers.',
        url: 'https://www.quebec.ca/education/apprendre-francais',
        services: ['Cours de français gratuits', 'Formation à temps plein ou partiel', 'Bourse de francisation possible', 'Cours en ligne disponibles'],
        servicesEn: ['Free French courses', 'Full-time or part-time training', 'Possible francisation bursary', 'Online courses available']
      },
      settlement: {
        name: 'Carrefours d\'intégration',
        nameEn: 'Integration Carrefours',
        description: 'Centres locaux offrant des services d\'accueil et d\'intégration dans toutes les régions du Québec.',
        descriptionEn: 'Local centers offering welcome and integration services in all regions of Quebec.',
        url: 'https://www.mifi.gouv.qc.ca/fr/carrefours-dintegration',
        services: ['Accueil et information', 'Accompagnement social', 'Aide au logement', 'Références communautaires'],
        servicesEn: ['Welcome and information', 'Social support', 'Housing assistance', 'Community referrals']
      },
      financialAid: {
        name: 'Aide financière aux immigrants',
        nameEn: 'Financial Aid for Immigrants',
        description: 'Programmes d\'aide financière pour les nouveaux arrivants, incluant les prêts et bourses.',
        descriptionEn: 'Financial assistance programs for newcomers, including loans and bursaries.',
        url: 'https://www.quebec.ca/immigration/integration-quebec/aide-financiere',
        amount: 'Variable selon le programme'
      }
    },
    'FOREIGN_STUDENT': {
      welcomeProgram: {
        name: 'Services d\'accueil étudiant',
        nameEn: 'Student Welcome Services',
        description: 'Services d\'accueil offerts par les établissements d\'enseignement et les associations étudiantes.',
        descriptionEn: 'Welcome services offered by educational institutions and student associations.',
        url: 'https://www.quebec.ca/etudes',
        services: ['Accueil à l\'aéroport', 'Journées d\'intégration', 'Buddy programs', 'Information sur le Québec'],
        servicesEn: ['Airport welcome', 'Integration days', 'Buddy programs', 'Information on Quebec']
      },
      employment: {
        name: 'Permis de travail hors campus',
        nameEn: 'Off-campus Work Permit',
        description: 'Droit de travailler jusqu\'à 24h/semaine pendant les sessions et à temps plein pendant les vacances.',
        descriptionEn: 'Right to work up to 24h/week during sessions and full-time during breaks.',
        url: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/etudiants.html',
        services: ['Autorisation de travail', 'Accès au marché du travail', 'Expérience canadienne'],
        servicesEn: ['Work authorization', 'Access to labor market', 'Canadian experience']
      },
      language: {
        name: 'Cours de français universitaires',
        nameEn: 'University French Courses',
        description: 'Cours de français offerts par les universités et cégeps, souvent gratuits ou à tarif réduit pour les étudiants.',
        descriptionEn: 'French courses offered by universities and CEGEPs, often free or at reduced rates for students.',
        url: 'https://www.quebec.ca/education/apprendre-francais',
        services: ['Cours de français FLE', 'Ateliers de conversation', 'Tutorat peer-to-peer'],
        servicesEn: ['FSL French courses', 'Conversation workshops', 'Peer tutoring']
      },
      settlement: {
        name: 'Services aux étudiants internationaux',
        nameEn: 'International Student Services',
        description: 'Bureaux d\'aide aux étudiants internationaux dans chaque établissement d\'enseignement.',
        descriptionEn: 'International student assistance offices in each educational institution.',
        url: 'https://www.quebec.ca/etudes',
        services: ['Support académique', 'Aide au logement', 'Activités sociales', 'Conseils immigration'],
        servicesEn: ['Academic support', 'Housing assistance', 'Social activities', 'Immigration advice']
      }
    },
    'OPEN_WORK_PERMIT': {
      welcomeProgram: {
        name: 'Services d\'accueil pour travailleurs',
        nameEn: 'Worker Welcome Services',
        description: 'Services d\'accueil et d\'intégration pour les travailleurs temporaires.',
        descriptionEn: 'Welcome and integration services for temporary workers.',
        url: 'https://www.quebec.ca/immigration/travailleurs-etrangers',
        services: ['Information sur les droits', 'Orientation au Québec', 'Références aux services'],
        servicesEn: ['Rights information', 'Quebec orientation', 'Service referrals']
      },
      employment: {
        name: 'Québec en tête',
        nameEn: 'Québec en tête',
        description: 'Service d\'aide à l\'emploi du gouvernement du Québec pour tous les résidents.',
        descriptionEn: 'Government of Quebec employment assistance service for all residents.',
        url: 'https://www.quebecenete.gouv.qc.ca/',
        services: ['Placement en emploi', 'Cours de français', 'Bilan de compétences', 'Aide au CV'],
        servicesEn: ['Job placement', 'French courses', 'Skills assessment', 'CV assistance']
      },
      language: {
        name: 'Francisation en milieu de travail',
        nameEn: 'Workplace Francisation',
        description: 'Programme de francisation offert en entreprise ou dans les carrefours d\'intégration.',
        descriptionEn: 'Francisation program offered in companies or integration carrefours.',
        url: 'https://www.quebec.ca/education/apprendre-francais',
        services: ['Cours de français gratuits', 'Horaires flexibles', 'Formation adaptée au métier'],
        servicesEn: ['Free French courses', 'Flexible schedules', 'Job-specific training']
      },
      settlement: {
        name: 'Carrefours d\'intégration',
        nameEn: 'Integration Carrefours',
        description: 'Services d\'accueil et d\'accompagnement pour les travailleurs et leurs familles.',
        descriptionEn: 'Welcome and support services for workers and their families.',
        url: 'https://www.mifi.gouv.qc.ca/fr/carrefours-dintegration',
        services: ['Accueil et information', 'Aide au logement', 'Scolarisation des enfants', 'Services aux familles'],
        servicesEn: ['Welcome and information', 'Housing assistance', 'Children schooling', 'Family services']
      }
    },
    'CLOSED_WORK_PERMIT': {
      welcomeProgram: {
        name: 'Programme des travailleurs étrangers temporaires',
        nameEn: 'Temporary Foreign Worker Program',
        description: 'Services d\'accueil et protection des droits des travailleurs étrangers temporaires.',
        descriptionEn: 'Welcome services and rights protection for temporary foreign workers.',
        url: 'https://www.canada.ca/fr/emploi-developpement-social/services/travailleurs-etrangers.html',
        services: ['Information sur vos droits', 'Protection contre l\'exploitation', 'Ligne d\'aide téléphonique'],
        servicesEn: ['Information on your rights', 'Protection from exploitation', 'Phone helpline']
      },
      employment: {
        name: 'Droits des travailleurs au Québec',
        nameEn: 'Workers Rights in Quebec',
        description: 'Information sur les normes du travail, les conditions de travail et les recours disponibles.',
        descriptionEn: 'Information on labour standards, working conditions and available remedies.',
        url: 'https://www.cnt.gouv.qc.ca/',
        services: ['Normes du travail', 'Salaire minimum', 'Congés et repos', 'Protection contre le harcèlement'],
        servicesEn: ['Labour standards', 'Minimum wage', 'Leaves and rest', 'Protection from harassment']
      },
      language: {
        name: 'Francisation Québec',
        nameEn: 'Quebec Francisation',
        description: 'Cours de français gratuits disponibles pour tous les résidents du Québec.',
        descriptionEn: 'Free French courses available to all Quebec residents.',
        url: 'https://www.quebec.ca/education/apprendre-francais',
        services: ['Cours de français gratuits', 'Niveaux débutant à avancé', 'Cours de soir disponibles'],
        servicesEn: ['Free French courses', 'Beginner to advanced levels', 'Evening courses available']
      },
      settlement: {
        name: 'Centres d\'aide aux immigrants',
        nameEn: 'Immigrant Aid Centers',
        description: 'Organismes communautaires offrant soutien et accompagnement.',
        descriptionEn: 'Community organizations offering support and accompaniment.',
        url: 'https://www.quebec.ca/immigration/integration-quebec',
        services: ['Soutien social', 'Aide juridique', 'Accompagnement', 'Références'],
        servicesEn: ['Social support', 'Legal aid', 'Accompaniment', 'Referrals']
      }
    }
  },
  'ON': {
    'PERMANENT_RESIDENT': {
      welcomeProgram: {
        name: 'Ontario Immigration Program',
        nameEn: 'Ontario Immigration Program',
        description: 'Services d\'établissement gratuits financés par le gouvernement de l\'Ontario.',
        descriptionEn: 'Free settlement services funded by the Government of Ontario.',
        url: 'https://www.ontario.ca/page/newcomers-ontario',
        services: ['Orientation à l\'arrivée', 'Services d\'interprétation', 'Information sur la vie en Ontario', 'Références communautaires'],
        servicesEn: ['Arrival orientation', 'Interpretation services', 'Information on life in Ontario', 'Community referrals']
      },
      employment: {
        name: 'Employment Ontario',
        nameEn: 'Employment Ontario',
        description: 'Services gratuits d\'emploi et de formation pour tous les résidents de l\'Ontario.',
        descriptionEn: 'Free employment and training services for all Ontario residents.',
        url: 'https://www.ontario.ca/page/employment-ontario',
        services: ['Aide à la recherche d\'emploi', 'Ateliers de carrière', 'Formation professionnelle', 'Programmes d\'apprentissage'],
        servicesEn: ['Job search help', 'Career workshops', 'Vocational training', 'Apprenticeship programs']
      },
      language: {
        name: 'Cours de langue gratuits',
        nameEn: 'Free Language Classes',
        description: 'Cours d\'anglais (ESL) et de français (FSL) gratuits pour les nouveaux arrivants.',
        descriptionEn: 'Free English (ESL) and French (FSL) classes for newcomers.',
        url: 'https://www.ontario.ca/page/adult-language-training',
        services: ['Cours d\'anglais gratuits', 'Cours de français gratuits', 'Classes en ligne disponibles', 'Horaires flexibles'],
        servicesEn: ['Free English classes', 'Free French classes', 'Online classes available', 'Flexible schedules']
      },
      settlement: {
        name: 'Ontario Settlement Services',
        nameEn: 'Ontario Settlement Services',
        description: 'Réseau d\'organismes d\'établissement dans toutes les villes ontariennes.',
        descriptionEn: 'Network of settlement agencies in all Ontario cities.',
        url: 'https://www.ontario.ca/page/settlement-services',
        services: ['Accueil et orientation', 'Aide au logement', 'Soutien aux familles', 'Services aux aînés'],
        servicesEn: ['Welcome and orientation', 'Housing assistance', 'Family support', 'Senior services']
      },
      financialAid: {
        name: 'Ontario Works (aide temporaire)',
        nameEn: 'Ontario Works (temporary assistance)',
        description: 'Aide financière et emploi du dernier recours pour les résidents dans le besoin.',
        descriptionEn: 'Financial assistance and employment of last resort for residents in need.',
        url: 'https://www.ontario.ca/page/ontario-works'
      }
    },
    'FOREIGN_STUDENT': {
      welcomeProgram: {
        name: 'Services aux étudiants internationaux',
        nameEn: 'International Student Services',
        description: 'Services d\'accueil offerts par les colleges et universités ontariennes.',
        descriptionEn: 'Welcome services offered by Ontario colleges and universities.',
        url: 'https://www.ontario.ca/page/study-ontario',
        services: ['Orientation internationale', 'Buddy programs', 'Services de santé mentale', 'Activités sociales'],
        servicesEn: ['International orientation', 'Buddy programs', 'Mental health services', 'Social activities']
      },
      employment: {
        name: 'Career Centres universitaires',
        nameEn: 'University Career Centres',
        description: 'Centres de carrière dans chaque établissement pour aider à la recherche d\'emploi.',
        descriptionEn: 'Career centers at each institution to help with job search.',
        url: 'https://www.ontario.ca/page/work-study',
        services: ['Ateliers CV', 'Simulations d\'entretien', 'Offres d\'emploi étudiants', 'Programmes co-op'],
        servicesEn: ['CV workshops', 'Interview practice', 'Student job offers', 'Co-op programs']
      },
      language: {
        name: 'ESL Programs',
        nameEn: 'ESL Programs',
        description: 'Cours d\'anglais langue seconde souvent inclus dans les programmes universitaires.',
        descriptionEn: 'English as a Second Language courses often included in university programs.',
        url: 'https://www.ontario.ca/page/adult-language-training',
        services: ['Cours ESL académiques', 'Tutorat en écriture', 'Centres de langues'],
        servicesEn: ['Academic ESL courses', 'Writing tutoring', 'Language centers']
      },
      settlement: {
        name: 'Student Housing Services',
        nameEn: 'Student Housing Services',
        description: 'Services de logement et d\'hébergement pour les étudiants internationaux.',
        descriptionEn: 'Housing and accommodation services for international students.',
        url: 'https://www.ontario.ca/page/study-ontario',
        services: ['Résidences étudiantes', 'Aide au logement hors campus', 'Services de garde d\'enfants'],
        servicesEn: ['Student residences', 'Off-campus housing help', 'Childcare services']
      }
    },
    'OPEN_WORK_PERMIT': {
      welcomeProgram: {
        name: 'Settlement Services Ontario',
        nameEn: 'Settlement Services Ontario',
        description: 'Services d\'établissement pour tous les nouveaux arrivants en Ontario.',
        descriptionEn: 'Settlement services for all newcomers in Ontario.',
        url: 'https://www.ontario.ca/page/newcomers-ontario',
        services: ['Information sur les droits', 'Références communautaires', 'Services d\'orientation'],
        servicesEn: ['Rights information', 'Community referrals', 'Orientation services']
      },
      employment: {
        name: 'Employment Ontario',
        nameEn: 'Employment Ontario',
        description: 'Services gratuits d\'emploi pour tous les résidents ontariens.',
        descriptionEn: 'Free employment services for all Ontario residents.',
        url: 'https://www.ontario.ca/page/employment-ontario',
        services: ['Recherche d\'emploi', 'Évaluation des compétences', 'Formation', 'Certifications'],
        servicesEn: ['Job search', 'Skills assessment', 'Training', 'Certifications']
      },
      language: {
        name: 'Adult Language Training',
        nameEn: 'Adult Language Training',
        description: 'Cours de langue gratuits pour les adultes en Ontario.',
        descriptionEn: 'Free language courses for adults in Ontario.',
        url: 'https://www.ontario.ca/page/adult-language-training',
        services: ['Cours ESL gratuits', 'Cours FSL gratuits', 'Classes en ligne et en personne'],
        servicesEn: ['Free ESL courses', 'Free FSL courses', 'Online and in-person classes']
      },
      settlement: {
        name: 'Community Settlement Agencies',
        nameEn: 'Community Settlement Agencies',
        description: 'Organismes d\'établissement communautaires dans toutes les villes.',
        descriptionEn: 'Community settlement agencies in all cities.',
        url: 'https://www.ontario.ca/page/settlement-services',
        services: ['Soutien à l\'installation', 'Aide au logement', 'Services aux familles'],
        servicesEn: ['Settlement support', 'Housing assistance', 'Family services']
      }
    },
    'CLOSED_WORK_PERMIT': {
      welcomeProgram: {
        name: 'Temporary Foreign Worker Support',
        nameEn: 'Temporary Foreign Worker Support',
        description: 'Services de soutien pour les travailleurs étrangers temporaires.',
        descriptionEn: 'Support services for temporary foreign workers.',
        url: 'https://www.canada.ca/fr/emploi-developpement-social/services/travailleurs-etrangers.html',
        services: ['Information sur les droits', 'Ligne d\'aide', 'Ressources'],
        servicesEn: ['Rights information', 'Helpline', 'Resources']
      },
      employment: {
        name: 'Ontario Labour Relations Board',
        nameEn: 'Ontario Labour Relations Board',
        description: 'Protection des droits des travailleurs et recours en cas de conflit.',
        descriptionEn: 'Workers rights protection and remedies in case of conflict.',
        url: 'https://www.olrb.gov.on.ca/',
        services: ['Normes du travail', 'Dépôts de plaintes', 'Protection contre les abus'],
        servicesEn: ['Labour standards', 'Complaint filing', 'Protection from abuse']
      },
      language: {
        name: 'ESL Classes',
        nameEn: 'ESL Classes',
        description: 'Cours d\'anglais disponibles pour les résidents ontariens.',
        descriptionEn: 'English classes available for Ontario residents.',
        url: 'https://www.ontario.ca/page/adult-language-training',
        services: ['Cours ESL du soir', 'Cours de fin de semaine', 'En ligne'],
        servicesEn: ['Evening ESL classes', 'Weekend classes', 'Online']
      },
      settlement: {
        name: 'Migrant Worker Support',
        nameEn: 'Migrant Worker Support',
        description: 'Organismes de soutien aux travailleurs migrants.',
        descriptionEn: 'Migrant worker support organizations.',
        url: 'https://www.ontario.ca/page/settlement-services',
        services: ['Soutien juridique', 'Services de santé', 'Aide sociale'],
        servicesEn: ['Legal support', 'Health services', 'Social help']
      }
    }
  },
  'BC': {
    'PERMANENT_RESIDENT': {
      welcomeProgram: {
        name: 'BC Settlement and Integration Services',
        nameEn: 'BC Settlement and Integration Services',
        description: 'Services gratuits d\'établissement pour les nouveaux arrivants en Colombie-Britannique.',
        descriptionEn: 'Free settlement services for newcomers in British Columbia.',
        url: 'https://www.welcomebc.ca/',
        services: ['Accueil à l\'arrivée', 'Orientation communautaire', 'Services d\'interprétation', 'Références'],
        servicesEn: ['Arrival welcome', 'Community orientation', 'Interpretation services', 'Referrals']
      },
      employment: {
        name: 'WorkBC',
        nameEn: 'WorkBC',
        description: 'Services gratuits d\'emploi du gouvernement de la Colombie-Britannique.',
        descriptionEn: 'Free employment services from the Government of British Columbia.',
        url: 'https://www.workbc.ca/',
        services: ['Centres d\'emploi', 'Ateliers de carrière', 'Programmes de formation', 'Subventions salariales'],
        servicesEn: ['Employment centres', 'Career workshops', 'Training programs', 'Wage subsidies']
      },
      language: {
        name: 'English Language Services for Adults',
        nameEn: 'English Language Services for Adults',
        description: 'Cours d\'anglais gratuits pour les nouveaux arrivants en C.-B.',
        descriptionEn: 'Free English classes for newcomers in BC.',
        url: 'https://www.welcomebc.ca/learn-english',
        services: ['Cours ELSA gratuits', 'Tests de niveau', 'Classes en ligne et en personne', 'Garde d\'enfants disponible'],
        servicesEn: ['Free ELSA classes', 'Level assessments', 'Online and in-person classes', 'Childcare available']
      },
      settlement: {
        name: 'BC Newcomer Services',
        nameEn: 'BC Newcomer Services',
        description: 'Réseau d\'organismes d\'établissement dans toute la province.',
        descriptionEn: 'Network of settlement agencies throughout the province.',
        url: 'https://www.welcomebc.ca/',
        services: ['Soutien à l\'installation', 'Services aux familles', 'Programmes jeunesse', 'Services aux aînés'],
        servicesEn: ['Settlement support', 'Family services', 'Youth programs', 'Senior services']
      }
    },
    'FOREIGN_STUDENT': {
      welcomeProgram: {
        name: 'International Student Services',
        nameEn: 'International Student Services',
        description: 'Services d\'accueil dans les établissements postsecondaires de C.-B.',
        descriptionEn: 'Welcome services at BC post-secondary institutions.',
        url: 'https://www.welcomebc.ca/study-in-bc',
        services: ['Orientation internationale', 'Activités sociales', 'Buddy programs'],
        servicesEn: ['International orientation', 'Social activities', 'Buddy programs']
      },
      employment: {
        name: 'WorkBC Student Services',
        nameEn: 'WorkBC Student Services',
        description: 'Services d\'emploi pour les étudiants.',
        descriptionEn: 'Employment services for students.',
        url: 'https://www.workbc.ca/',
        services: ['Emplois étudiants', 'Stages co-op', 'Programmes d\'apprentissage'],
        servicesEn: ['Student jobs', 'Co-op internships', 'Apprenticeship programs']
      },
      language: {
        name: 'ESL Programs',
        nameEn: 'ESL Programs',
        description: 'Cours d\'anglais disponibles dans les collèges et universités.',
        descriptionEn: 'English courses available at colleges and universities.',
        url: 'https://www.welcomebc.ca/learn-english',
        services: ['ESL académique', 'Centres d\'écriture', 'Tutorat'],
        servicesEn: ['Academic ESL', 'Writing centers', 'Tutoring']
      },
      settlement: {
        name: 'Student Housing BC',
        nameEn: 'Student Housing BC',
        description: 'Services de logement pour les étudiants internationaux.',
        descriptionEn: 'Housing services for international students.',
        url: 'https://www.welcomebc.ca/study-in-bc',
        services: ['Résidences', 'Logements homestay', 'Aide au logement'],
        servicesEn: ['Residences', 'Homestay housing', 'Housing help']
      }
    },
    'OPEN_WORK_PERMIT': {
      welcomeProgram: {
        name: 'WelcomeBC Services',
        nameEn: 'WelcomeBC Services',
        description: 'Services d\'accueil pour les travailleurs et leurs familles.',
        descriptionEn: 'Welcome services for workers and their families.',
        url: 'https://www.welcomebc.ca/',
        services: ['Orientation', 'Information', 'Références'],
        servicesEn: ['Orientation', 'Information', 'Referrals']
      },
      employment: {
        name: 'WorkBC',
        nameEn: 'WorkBC',
        description: 'Services d\'emploi gratuits pour tous les résidents de C.-B.',
        descriptionEn: 'Free employment services for all BC residents.',
        url: 'https://www.workbc.ca/',
        services: ['Recherche d\'emploi', 'Formation', 'Certifications'],
        servicesEn: ['Job search', 'Training', 'Certifications']
      },
      language: {
        name: 'ELSA Program',
        nameEn: 'ELSA Program',
        description: 'Cours d\'anglais gratuits pour les nouveaux arrivants.',
        descriptionEn: 'Free English classes for newcomers.',
        url: 'https://www.welcomebc.ca/learn-english',
        services: ['Cours gratuits', 'Tests de niveau', 'Classes flexibles'],
        servicesEn: ['Free classes', 'Level tests', 'Flexible classes']
      },
      settlement: {
        name: 'Settlement Services BC',
        nameEn: 'Settlement Services BC',
        description: 'Services d\'établissement dans toutes les communautés.',
        descriptionEn: 'Settlement services in all communities.',
        url: 'https://www.welcomebc.ca/',
        services: ['Installation', 'Familles', 'Références'],
        servicesEn: ['Settlement', 'Families', 'Referrals']
      }
    },
    'CLOSED_WORK_PERMIT': {
      welcomeProgram: {
        name: 'Temporary Foreign Worker Support',
        nameEn: 'Temporary Foreign Worker Support',
        description: 'Services de soutien pour les travailleurs temporaires.',
        descriptionEn: 'Support services for temporary workers.',
        url: 'https://www.welcomebc.ca/',
        services: ['Droits des travailleurs', 'Soutien', 'Ressources'],
        servicesEn: ['Workers rights', 'Support', 'Resources']
      },
      employment: {
        name: 'Employment Standards BC',
        nameEn: 'Employment Standards BC',
        description: 'Protection des droits des travailleurs en C.-B.',
        descriptionEn: 'Workers rights protection in BC.',
        url: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice',
        services: ['Normes du travail', 'Plaintes', 'Protection'],
        servicesEn: ['Labour standards', 'Complaints', 'Protection']
      },
      language: {
        name: 'ESL Classes',
        nameEn: 'ESL Classes',
        description: 'Cours d\'anglais disponibles.',
        descriptionEn: 'Available English classes.',
        url: 'https://www.welcomebc.ca/learn-english',
        services: ['Cours du soir', 'En ligne'],
        servicesEn: ['Evening classes', 'Online']
      },
      settlement: {
        name: 'Migrant Support Services',
        nameEn: 'Migrant Support Services',
        description: 'Soutien aux travailleurs migrants.',
        descriptionEn: 'Support for migrant workers.',
        url: 'https://www.welcomebc.ca/',
        services: ['Aide', 'Ressources', 'Références'],
        servicesEn: ['Help', 'Resources', 'Referrals']
      }
    }
  },
  'AB': {
    'PERMANENT_RESIDENT': {
      welcomeProgram: {
        name: 'Alberta Newcomer Services',
        nameEn: 'Alberta Newcomer Services',
        description: 'Services d\'accueil et d\'établissement pour les nouveaux arrivants en Alberta.',
        descriptionEn: 'Welcome and settlement services for newcomers in Alberta.',
        url: 'https://www.alberta.ca/newcomer-services.aspx',
        services: ['Accueil', 'Orientation', 'Références', 'Interprétation'],
        servicesEn: ['Welcome', 'Orientation', 'Referrals', 'Interpretation']
      },
      employment: {
        name: 'Alberta Works',
        nameEn: 'Alberta Works',
        description: 'Services d\'emploi et de formation du gouvernement albertain.',
        descriptionEn: 'Employment and training services from the Alberta government.',
        url: 'https://www.alberta.ca/alberta-works.aspx',
        services: ['Emplois', 'Formation', 'Services aux travailleurs', 'Programmes d\'apprentissage'],
        servicesEn: ['Jobs', 'Training', 'Worker services', 'Apprenticeship programs']
      },
      language: {
        name: 'English Language Learning',
        nameEn: 'English Language Learning',
        description: 'Cours d\'anglais gratuits pour les nouveaux arrivants.',
        descriptionEn: 'Free English classes for newcomers.',
        url: 'https://www.alberta.ca/english-language-learning.aspx',
        services: ['Cours LINC gratuits', 'Classes en ligne', 'Évaluation de niveau'],
        servicesEn: ['Free LINC classes', 'Online classes', 'Level assessment']
      },
      settlement: {
        name: 'Settlement Services Alberta',
        nameEn: 'Settlement Services Alberta',
        description: 'Organismes d\'établissement dans toutes les villes albertaines.',
        descriptionEn: 'Settlement agencies in all Alberta cities.',
        url: 'https://www.alberta.ca/newcomer-services.aspx',
        services: ['Installation', 'Familles', 'Logement', 'Santé'],
        servicesEn: ['Settlement', 'Families', 'Housing', 'Health']
      }
    },
    'FOREIGN_STUDENT': {
      welcomeProgram: {
        name: 'International Student Services',
        nameEn: 'International Student Services',
        description: 'Services d\'accueil dans les établissements albertain.',
        descriptionEn: 'Welcome services at Alberta institutions.',
        url: 'https://www.alberta.ca/study-alberta.aspx',
        services: ['Orientation', 'Activités', 'Support'],
        servicesEn: ['Orientation', 'Activities', 'Support']
      },
      employment: {
        name: 'Alberta Works for Students',
        nameEn: 'Alberta Works for Students',
        description: 'Services d\'emploi pour les étudiants.',
        descriptionEn: 'Employment services for students.',
        url: 'https://www.alberta.ca/alberta-works.aspx',
        services: ['Emplois étudiants', 'Stages', 'Co-op'],
        servicesEn: ['Student jobs', 'Internships', 'Co-op']
      },
      language: {
        name: 'ESL Programs',
        nameEn: 'ESL Programs',
        description: 'Cours d\'anglais dans les établissements.',
        descriptionEn: 'English courses at institutions.',
        url: 'https://www.alberta.ca/english-language-learning.aspx',
        services: ['ESL académique', 'Tutorat'],
        servicesEn: ['Academic ESL', 'Tutoring']
      },
      settlement: {
        name: 'Student Housing Alberta',
        nameEn: 'Student Housing Alberta',
        description: 'Logement étudiant.',
        descriptionEn: 'Student housing.',
        url: 'https://www.alberta.ca/study-alberta.aspx',
        services: ['Résidences', 'Homestay'],
        servicesEn: ['Residences', 'Homestay']
      }
    },
    'OPEN_WORK_PERMIT': {
      welcomeProgram: {
        name: 'Alberta Newcomer Services',
        nameEn: 'Alberta Newcomer Services',
        description: 'Services pour les travailleurs et familles.',
        descriptionEn: 'Services for workers and families.',
        url: 'https://www.alberta.ca/newcomer-services.aspx',
        services: ['Accueil', 'Information', 'Références'],
        servicesEn: ['Welcome', 'Information', 'Referrals']
      },
      employment: {
        name: 'Alberta Works',
        nameEn: 'Alberta Works',
        description: 'Services d\'emploi gratuits.',
        descriptionEn: 'Free employment services.',
        url: 'https://www.alberta.ca/alberta-works.aspx',
        services: ['Recherche d\'emploi', 'Formation'],
        servicesEn: ['Job search', 'Training']
      },
      language: {
        name: 'LINC Classes',
        nameEn: 'LINC Classes',
        description: 'Cours d\'anglais gratuits.',
        descriptionEn: 'Free English classes.',
        url: 'https://www.alberta.ca/english-language-learning.aspx',
        services: ['Cours gratuits', 'En ligne'],
        servicesEn: ['Free classes', 'Online']
      },
      settlement: {
        name: 'Settlement Agencies',
        nameEn: 'Settlement Agencies',
        description: 'Services d\'établissement.',
        descriptionEn: 'Settlement services.',
        url: 'https://www.alberta.ca/newcomer-services.aspx',
        services: ['Installation', 'Familles'],
        servicesEn: ['Settlement', 'Families']
      }
    },
    'CLOSED_WORK_PERMIT': {
      welcomeProgram: {
        name: 'TFW Support Alberta',
        nameEn: 'TFW Support Alberta',
        description: 'Soutien aux travailleurs temporaires.',
        descriptionEn: 'Support for temporary workers.',
        url: 'https://www.alberta.ca/newcomer-services.aspx',
        services: ['Droits', 'Soutien'],
        servicesEn: ['Rights', 'Support']
      },
      employment: {
        name: 'Employment Standards Alberta',
        nameEn: 'Employment Standards Alberta',
        description: 'Droits des travailleurs.',
        descriptionEn: 'Workers rights.',
        url: 'https://www.alberta.ca/employment-standards.aspx',
        services: ['Normes', 'Plaintes'],
        servicesEn: ['Standards', 'Complaints']
      },
      language: {
        name: 'ESL Classes',
        nameEn: 'ESL Classes',
        description: 'Cours d\'anglais.',
        descriptionEn: 'English classes.',
        url: 'https://www.alberta.ca/english-language-learning.aspx',
        services: ['Soir', 'En ligne'],
        servicesEn: ['Evening', 'Online']
      },
      settlement: {
        name: 'Migrant Worker Support',
        nameEn: 'Migrant Worker Support',
        description: 'Aide aux migrants.',
        descriptionEn: 'Migrant help.',
        url: 'https://www.alberta.ca/newcomer-services.aspx',
        services: ['Aide', 'Ressources'],
        servicesEn: ['Help', 'Resources']
      }
    }
  }
}

// Default policies for other provinces (MB, SK, NS, NB, PE, NL)
export const defaultProvincialPolicies = {
  'PERMANENT_RESIDENT': {
    welcomeProgram: {
      name: 'Programme d\'accueil provincial',
      nameEn: 'Provincial Welcome Program',
      description: 'Services d\'accueil et d\'établissement pour les nouveaux arrivants.',
      descriptionEn: 'Welcome and settlement services for newcomers.',
      url: '#',
      services: ['Accueil', 'Orientation', 'Références', 'Information'],
      servicesEn: ['Welcome', 'Orientation', 'Referrals', 'Information']
    },
    employment: {
      name: 'Services d\'emploi provinciaux',
      nameEn: 'Provincial Employment Services',
      description: 'Services d\'aide à l\'emploi et de formation.',
      descriptionEn: 'Employment assistance and training services.',
      url: '#',
      services: ['Recherche d\'emploi', 'Formation', 'Certifications'],
      servicesEn: ['Job search', 'Training', 'Certifications']
    },
    language: {
      name: 'Cours de langue gratuits',
      nameEn: 'Free Language Classes',
      description: 'Cours d\'anglais et/ou de français gratuits pour les nouveaux arrivants.',
      descriptionEn: 'Free English and/or French classes for newcomers.',
      url: '#',
      services: ['Cours gratuits', 'Évaluation de niveau', 'Classes en ligne'],
      servicesEn: ['Free classes', 'Level assessment', 'Online classes']
    },
    settlement: {
      name: 'Services d\'établissement',
      nameEn: 'Settlement Services',
      description: 'Organismes d\'aide à l\'installation dans votre province.',
      descriptionEn: 'Organizations helping with settlement in your province.',
      url: '#',
      services: ['Installation', 'Logement', 'Familles', 'Santé'],
      servicesEn: ['Settlement', 'Housing', 'Families', 'Health']
    }
  },
  'FOREIGN_STUDENT': {
    welcomeProgram: {
      name: 'Services aux étudiants internationaux',
      nameEn: 'International Student Services',
      description: 'Services d\'accueil dans les établissements d\'enseignement.',
      descriptionEn: 'Welcome services at educational institutions.',
      url: '#',
      services: ['Orientation', 'Activités', 'Support'],
      servicesEn: ['Orientation', 'Activities', 'Support']
    },
    employment: {
      name: 'Services d\'emploi étudiants',
      nameEn: 'Student Employment Services',
      description: 'Aide à la recherche d\'emploi pour étudiants.',
      descriptionEn: 'Job search help for students.',
      url: '#',
      services: ['Emplois étudiants', 'Stages', 'Co-op'],
      servicesEn: ['Student jobs', 'Internships', 'Co-op']
    },
    language: {
      name: 'ESL/FSL Programs',
      nameEn: 'ESL/FSL Programs',
      description: 'Cours de langue pour étudiants.',
      descriptionEn: 'Language courses for students.',
      url: '#',
      services: ['ESL/FSL académique', 'Tutorat'],
      servicesEn: ['Academic ESL/FSL', 'Tutoring']
    },
    settlement: {
      name: 'Logement étudiant',
      nameEn: 'Student Housing',
      description: 'Services de logement pour étudiants.',
      descriptionEn: 'Housing services for students.',
      url: '#',
      services: ['Résidences', 'Homestay', 'Aide au logement'],
      servicesEn: ['Residences', 'Homestay', 'Housing help']
    }
  },
  'OPEN_WORK_PERMIT': {
    welcomeProgram: {
      name: 'Services d\'accueil',
      nameEn: 'Welcome Services',
      description: 'Services pour les travailleurs et leurs familles.',
      descriptionEn: 'Services for workers and their families.',
      url: '#',
      services: ['Accueil', 'Information', 'Références'],
      servicesEn: ['Welcome', 'Information', 'Referrals']
    },
    employment: {
      name: 'Services d\'emploi',
      nameEn: 'Employment Services',
      description: 'Aide à l\'emploi pour les résidents.',
      descriptionEn: 'Employment help for residents.',
      url: '#',
      services: ['Recherche d\'emploi', 'Formation'],
      servicesEn: ['Job search', 'Training']
    },
    language: {
      name: 'Cours de langue',
      nameEn: 'Language Classes',
      description: 'Cours d\'anglais/français disponibles.',
      descriptionEn: 'English/French classes available.',
      url: '#',
      services: ['Cours gratuits', 'En ligne'],
      servicesEn: ['Free classes', 'Online']
    },
    settlement: {
      name: 'Services d\'établissement',
      nameEn: 'Settlement Services',
      description: 'Aide à l\'installation.',
      descriptionEn: 'Settlement help.',
      url: '#',
      services: ['Installation', 'Familles'],
      servicesEn: ['Settlement', 'Families']
    }
  },
  'CLOSED_WORK_PERMIT': {
    welcomeProgram: {
      name: 'Soutien aux travailleurs temporaires',
      nameEn: 'Temporary Worker Support',
      description: 'Services de soutien pour les travailleurs temporaires.',
      descriptionEn: 'Support services for temporary workers.',
      url: '#',
      services: ['Droits', 'Soutien', 'Ressources'],
      servicesEn: ['Rights', 'Support', 'Resources']
    },
    employment: {
      name: 'Normes du travail',
      nameEn: 'Employment Standards',
      description: 'Protection des droits des travailleurs.',
      descriptionEn: 'Workers rights protection.',
      url: '#',
      services: ['Normes', 'Plaintes', 'Protection'],
      servicesEn: ['Standards', 'Complaints', 'Protection']
    },
    language: {
      name: 'Cours d\'anglais',
      nameEn: 'English Classes',
      description: 'Cours disponibles.',
      descriptionEn: 'Classes available.',
      url: '#',
      services: ['Soir', 'En ligne'],
      servicesEn: ['Evening', 'Online']
    },
    settlement: {
      name: 'Aide aux migrants',
      nameEn: 'Migrant Support',
      description: 'Services de soutien.',
      descriptionEn: 'Support services.',
      url: '#',
      services: ['Aide', 'Ressources'],
      servicesEn: ['Help', 'Resources']
    }
  }
}

// ==================== PROVINCE MODULE ====================

export const healthEligibilityRules: Record<string, Record<string, {
  eligible: boolean
  conditional: boolean
  waitPeriod: string
  waitPeriodEn: string
  conditions: string[]
  conditionsEn: string[]
  documents: { name: string; nameEn: string; required: boolean; notes?: string; notesEn?: string }[]
  applyUrl: string
  planName: string
  planNameEn: string
  specialNote?: string
  specialNoteEn?: string
}>> = {
  'ON': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '0 jour',
      waitPeriodEn: '0 days',
      conditions: [
        'Résident de l\'Ontario (intention de résider)',
        'Présent physiquement en Ontario minimum 153 jours par année',
        'Statut de résident permanent valide'
      ],
      conditionsEn: [
        'Ontario resident (intention to reside)',
        'Physically present in Ontario minimum 153 days per year',
        'Valid permanent resident status'
      ],
      documents: [
        { name: 'Carte de résident permanent (IMM 5445)', nameEn: 'Permanent Resident Card (IMM 5445)', required: true },
        { name: 'Confirmation de résidence permanente (IMM 5292)', nameEn: 'Confirmation of Permanent Residence (IMM 5292)', required: true, notes: 'Si carte PR pas encore reçue', notesEn: 'If PR card not yet received' },
        { name: 'Preuve de résidence en Ontario', nameEn: 'Proof of Ontario residence', required: true, notes: 'Bail, facture d\'utilities, relevé bancaire', notesEn: 'Lease, utility bill, bank statement' },
        { name: 'Permis de conduire ontarien (si disponible)', nameEn: 'Ontario driver\'s license (if available)', required: false },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true },
        { name: 'Preuve d\'identité avec photo', nameEn: 'Photo identity proof', required: true }
      ],
      applyUrl: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
      planName: 'OHIP (Ontario Health Insurance Plan)',
      planNameEn: 'OHIP (Ontario Health Insurance Plan)',
      specialNote: '✅ Pas de période d\'attente pour les résidents permanents!',
      specialNoteEn: '✅ No waiting period for permanent residents!'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: [
        '❌ Les étudiants internationaux ne sont PAS admissibles à OHIP',
        'Une assurance santé privée est OBLIGATOIRE',
        'Vérifiez si votre établissement offre une assurance groupe'
      ],
      conditionsEn: [
        '❌ International students are NOT eligible for OHIP',
        'Private health insurance is MANDATORY',
        'Check if your institution offers group insurance'
      ],
      documents: [
        { name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true, notes: 'Obligatoire pendant vos études', notesEn: 'Mandatory during your studies' },
        { name: 'Permis d\'études valide', nameEn: 'Valid study permit', required: true },
        { name: 'Lettre d\'admission', nameEn: 'Letter of admission', required: false }
      ],
      applyUrl: 'https://www.ontario.ca/page/ohip-coverage-international-students',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required',
      specialNote: '⚠️ Vous devez souscrire une assurance privée avant votre arrivée!',
      specialNoteEn: '⚠️ You must purchase private insurance before arrival!'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide pour minimum 6 mois',
        'Emploi à temps plein (minimum 30 heures/semaine)',
        'Intention de résider en Ontario',
        'Présent en Ontario pendant la demande'
      ],
      conditionsEn: [
        'Valid work permit for minimum 6 months',
        'Full-time employment (minimum 30 hours/week)',
        'Intention to reside in Ontario',
        'Present in Ontario during application'
      ],
      documents: [
        { name: 'Permis de travail valide', nameEn: 'Valid work permit', required: true, notes: 'Minimum 6 mois de validité', notesEn: 'Minimum 6 months validity' },
        { name: 'Lettre de l\'employeur', nameEn: 'Employer letter', required: true, notes: 'Confirmant l\'emploi à temps plein', notesEn: 'Confirming full-time employment' },
        { name: 'Preuve de résidence en Ontario', nameEn: 'Proof of Ontario residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true },
        { name: 'Contrat de travail (si disponible)', nameEn: 'Employment contract (if available)', required: false }
      ],
      applyUrl: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
      planName: 'OHIP (Ontario Health Insurance Plan)',
      planNameEn: 'OHIP (Ontario Health Insurance Plan)',
      specialNote: '⏱️ Période d\'attente de 3 mois - Prévoyez une assurance privée!',
      specialNoteEn: '⏱️ 3-month waiting period - Plan for private insurance!'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide pour minimum 6 mois',
        'Emploi à temps plein',
        'Intention de résider en Ontario'
      ],
      conditionsEn: [
        'Valid work permit for minimum 6 months',
        'Full-time employment',
        'Intention to reside in Ontario'
      ],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true, notes: 'Avec nom de l\'employeur', notesEn: 'With employer name' },
        { name: 'Lettre d\'offre d\'emploi', nameEn: 'Job offer letter', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
      planName: 'OHIP (Ontario Health Insurance Plan)',
      planNameEn: 'OHIP (Ontario Health Insurance Plan)',
      specialNote: '⏱️ Assurez-vous que votre permis couvre au moins 6 mois',
      specialNoteEn: '⏱️ Ensure your permit covers at least 6 months'
    }
  },
  'QC': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '0 à 3 mois',
      waitPeriodEn: '0 to 3 months',
      conditions: [
        'Résident du Québec (intention de s\'y établir)',
        'Présent au Québec minimum 183 jours par année',
        'Inscription dans les 3 mois suivant l\'arrivée recommandée'
      ],
      conditionsEn: [
        'Quebec resident (intention to settle)',
        'Present in Quebec minimum 183 days per year',
        'Registration within 3 months of arrival recommended'
      ],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence au Québec', nameEn: 'Proof of Quebec residence', required: true, notes: 'Bail, facture Hydro-Québec', notesEn: 'Lease, Hydro-Québec bill' },
        { name: 'Acte de naissance avec traduction certifiée', nameEn: 'Birth certificate with certified translation', required: true, notes: 'Traduit par un traducteur agréé', notesEn: 'Translated by certified translator' },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true },
        { name: 'CSQ (si applicable)', nameEn: 'CSQ (if applicable)', required: false, notes: 'Certificat de sélection du Québec', notesEn: 'Quebec Selection Certificate' }
      ],
      applyUrl: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
      planName: 'RAMQ (Régie de l\'assurance maladie du Québec)',
      planNameEn: 'RAMQ (Quebec Health Insurance Board)',
      specialNote: '📄 L\'acte de naissance doit être traduit par un traducteur agréé au Québec',
      specialNoteEn: '📄 Birth certificate must be translated by a certified translator in Quebec'
    },
    'FOREIGN_STUDENT': {
      eligible: true,
      conditional: true,
      waitPeriod: 'Variable',
      waitPeriodEn: 'Variable',
      conditions: [
        '✅ Pays avec entente de sécurité sociale: France, Belgique, Danemark, Finlande, Grèce, Luxembourg, Norvège, Portugal, Roumanie, Suède',
        '❌ Autres pays: Non admissible à la RAMQ',
        'Inscription obligatoire dès l\'arrivée'
      ],
      conditionsEn: [
        '✅ Countries with social security agreement: France, Belgium, Denmark, Finland, Greece, Luxembourg, Norway, Portugal, Romania, Sweden',
        '❌ Other countries: Not eligible for RAMQ',
        'Mandatory registration upon arrival'
      ],
      documents: [
        { name: 'Permis d\'études valide', nameEn: 'Valid study permit', required: true },
        { name: 'Attestation d\'inscription universitaire', nameEn: 'University enrollment certificate', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true },
        { name: 'Certificat d\'assurance du pays d\'origine (si pays avec entente)', nameEn: 'Insurance certificate from home country (if country with agreement)', required: false },
        { name: 'Preuve de résidence au Québec', nameEn: 'Proof of Quebec residence', required: true }
      ],
      applyUrl: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
      planName: 'RAMQ (si pays avec entente)',
      planNameEn: 'RAMQ (if country with agreement)',
      specialNote: '🇫🇷 Les étudiants français sont couverts automatiquement!',
      specialNoteEn: '🇫🇷 French students are automatically covered!'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois max',
      waitPeriodEn: '3 months max',
      conditions: [
        'Permis de travail valide',
        'Résident du Québec',
        'Inscription recommandée dès l\'arrivée'
      ],
      conditionsEn: [
        'Valid work permit',
        'Quebec resident',
        'Recommended registration upon arrival'
      ],
      documents: [
        { name: 'Permis de travail valide', nameEn: 'Valid work permit', required: true },
        { name: 'Preuve de résidence au Québec', nameEn: 'Proof of Quebec residence', required: true },
        { name: 'Acte de naissance avec traduction certifiée', nameEn: 'Birth certificate with certified translation', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
      planName: 'RAMQ (Régie de l\'assurance maladie du Québec)',
      planNameEn: 'RAMQ (Quebec Health Insurance Board)'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois max',
      waitPeriodEn: '3 months max',
      conditions: [
        'Permis de travail valide',
        'Résident du Québec'
      ],
      conditionsEn: [
        'Valid work permit',
        'Quebec resident'
      ],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence au Québec', nameEn: 'Proof of Quebec residence', required: true },
        { name: 'Acte de naissance traduit', nameEn: 'Translated birth certificate', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
      planName: 'RAMQ',
      planNameEn: 'RAMQ'
    }
  },
  'BC': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Résident de la Colombie-Britannique',
        'Citoyen canadien ou résident permanent',
        'Présent minimum 6 mois par année'
      ],
      conditionsEn: [
        'British Columbia resident',
        'Canadian citizen or permanent resident',
        'Present minimum 6 months per year'
      ],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence en C.-B.', nameEn: 'Proof of B.C. residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents',
      planName: 'MSP (Medical Services Plan)',
      planNameEn: 'MSP (Medical Services Plan)',
      specialNote: '💰 GRATUIT depuis janvier 2020 (anciennement $64/mois)',
      specialNoteEn: '💰 FREE since January 2020 (previously $64/month)'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: [
        '❌ Les étudiants internationaux ne sont PAS admissibles au MSP',
        'Assurance privée OBLIGATOIRE',
        'La plupart des universités offrent une assurance groupe'
      ],
      conditionsEn: [
        '❌ International students are NOT eligible for MSP',
        'Private insurance MANDATORY',
        'Most universities offer group insurance'
      ],
      documents: [
        { name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true },
        { name: 'Permis d\'études', nameEn: 'Study permit', required: true }
      ],
      applyUrl: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide',
        'Résident de la C.-B.',
        'Présent minimum 6 mois par année'
      ],
      conditionsEn: [
        'Valid work permit',
        'B.C. resident',
        'Present minimum 6 months per year'
      ],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence en C.-B.', nameEn: 'Proof of B.C. residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents',
      planName: 'MSP (Medical Services Plan)',
      planNameEn: 'MSP (Medical Services Plan)'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide',
        'Résident de la C.-B.'
      ],
      conditionsEn: [
        'Valid work permit',
        'B.C. resident'
      ],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents',
      planName: 'MSP',
      planNameEn: 'MSP'
    }
  },
  'AB': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Résident de l\'Alberta',
        'Présent minimum 183 jours par année',
        'Intention de résider en Alberta'
      ],
      conditionsEn: [
        'Alberta resident',
        'Present minimum 183 days per year',
        'Intention to reside in Alberta'
      ],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence en Alberta', nameEn: 'Proof of Alberta residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.alberta.ca/ahcip.aspx',
      planName: 'AHCIP (Alberta Health Care Insurance Plan)',
      planNameEn: 'AHCIP (Alberta Health Care Insurance Plan)',
      specialNote: '💰 Couverture gratuite',
      specialNoteEn: '💰 Free coverage'
    },
    'FOREIGN_STUDENT': {
      eligible: true,
      conditional: true,
      waitPeriod: 'Variable',
      waitPeriodEn: 'Variable',
      conditions: [
        'Permis d\'études valide pour 12 mois ou plus',
        'Intention de résider en Alberta 12 mois',
        'Sinon: assurance privée requise'
      ],
      conditionsEn: [
        'Valid study permit for 12 months or more',
        'Intention to reside in Alberta 12 months',
        'Otherwise: private insurance required'
      ],
      documents: [
        { name: 'Permis d\'études (12+ mois)', nameEn: 'Study permit (12+ months)', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Lettre d\'admission', nameEn: 'Admission letter', required: true }
      ],
      applyUrl: 'https://www.alberta.ca/ahcip.aspx',
      planName: 'AHCIP (si éligible)',
      planNameEn: 'AHCIP (if eligible)',
      specialNote: '⚠️ Vérifiez votre admissibilité - permis de 12+ mois requis',
      specialNoteEn: '⚠️ Check eligibility - 12+ month permit required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide',
        'Résident de l\'Alberta'
      ],
      conditionsEn: [
        'Valid work permit',
        'Alberta resident'
      ],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.alberta.ca/ahcip.aspx',
      planName: 'AHCIP',
      planNameEn: 'AHCIP'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide',
        'Résident de l\'Alberta'
      ],
      conditionsEn: [
        'Valid work permit',
        'Alberta resident'
      ],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.alberta.ca/ahcip.aspx',
      planName: 'AHCIP',
      planNameEn: 'AHCIP'
    }
  },
  'MB': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Résident du Manitoba',
        'Présent minimum 183 jours par année'
      ],
      conditionsEn: [
        'Manitoba resident',
        'Present minimum 183 days per year'
      ],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence au Manitoba', nameEn: 'Proof of Manitoba residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.gov.mb.ca/health/mhsip/',
      planName: 'Manitoba Health',
      planNameEn: 'Manitoba Health'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: [
        '❌ Étudiants internationaux non admissibles',
        'Assurance privée obligatoire'
      ],
      conditionsEn: [
        '❌ International students not eligible',
        'Private insurance mandatory'
      ],
      documents: [
        { name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true }
      ],
      applyUrl: 'https://www.gov.mb.ca/health/mhsip/',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide 12+ mois',
        'Résident du Manitoba'
      ],
      conditionsEn: [
        'Valid work permit 12+ months',
        'Manitoba resident'
      ],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.gov.mb.ca/health/mhsip/',
      planName: 'Manitoba Health',
      planNameEn: 'Manitoba Health'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: [
        'Permis de travail valide',
        'Résident du Manitoba'
      ],
      conditionsEn: [
        'Valid work permit',
        'Manitoba resident'
      ],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.gov.mb.ca/health/mhsip/',
      planName: 'Manitoba Health',
      planNameEn: 'Manitoba Health'
    }
  },
  // Saskatchewan
  'SK': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Résident de la Saskatchewan', 'Présent minimum 183 jours par année'],
      conditionsEn: ['Saskatchewan resident', 'Present minimum 183 days per year'],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.saskatchewan.ca/residents/health/free-health-coverage',
      planName: 'Saskatchewan Health Card',
      planNameEn: 'Saskatchewan Health Card'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: ['❌ Étudiants non admissibles', 'Assurance privée obligatoire'],
      conditionsEn: ['❌ Students not eligible', 'Private insurance mandatory'],
      documents: [{ name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true }],
      applyUrl: '#',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de la Saskatchewan'],
      conditionsEn: ['Valid work permit', 'Saskatchewan resident'],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.saskatchewan.ca/residents/health/free-health-coverage',
      planName: 'Saskatchewan Health Card',
      planNameEn: 'Saskatchewan Health Card'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de la Saskatchewan'],
      conditionsEn: ['Valid work permit', 'Saskatchewan resident'],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.saskatchewan.ca/residents/health/free-health-coverage',
      planName: 'Saskatchewan Health Card',
      planNameEn: 'Saskatchewan Health Card'
    }
  },
  // Nova Scotia
  'NS': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Résident de la Nouvelle-Écosse', 'Présent minimum 183 jours par année'],
      conditionsEn: ['Nova Scotia resident', 'Present minimum 183 days per year'],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://novascotia.ca/dhw/msi/',
      planName: 'MSI (Medical Services Insurance)',
      planNameEn: 'MSI (Medical Services Insurance)'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: ['❌ Étudiants non admissibles', 'Assurance privée obligatoire'],
      conditionsEn: ['❌ Students not eligible', 'Private insurance mandatory'],
      documents: [{ name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true }],
      applyUrl: '#',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de la Nouvelle-Écosse'],
      conditionsEn: ['Valid work permit', 'Nova Scotia resident'],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://novascotia.ca/dhw/msi/',
      planName: 'MSI',
      planNameEn: 'MSI'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de la Nouvelle-Écosse'],
      conditionsEn: ['Valid work permit', 'Nova Scotia resident'],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://novascotia.ca/dhw/msi/',
      planName: 'MSI',
      planNameEn: 'MSI'
    }
  },
  // New Brunswick
  'NB': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Résident du Nouveau-Brunswick', 'Présent minimum 183 jours par année'],
      conditionsEn: ['New Brunswick resident', 'Present minimum 183 days per year'],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www2.gnb.ca/content/gnb/en/departments/health/Medicare.html',
      planName: 'Medicare NB',
      planNameEn: 'Medicare NB'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: ['❌ Étudiants non admissibles', 'Assurance privée obligatoire'],
      conditionsEn: ['❌ Students not eligible', 'Private insurance mandatory'],
      documents: [{ name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true }],
      applyUrl: '#',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident du Nouveau-Brunswick'],
      conditionsEn: ['Valid work permit', 'New Brunswick resident'],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www2.gnb.ca/content/gnb/en/departments/health/Medicare.html',
      planName: 'Medicare NB',
      planNameEn: 'Medicare NB'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident du Nouveau-Brunswick'],
      conditionsEn: ['Valid work permit', 'New Brunswick resident'],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www2.gnb.ca/content/gnb/en/departments/health/Medicare.html',
      planName: 'Medicare NB',
      planNameEn: 'Medicare NB'
    }
  },
  // Prince Edward Island
  'PE': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Résident de l\'Île-du-Prince-Édouard', 'Présent minimum 183 jours par année'],
      conditionsEn: ['Prince Edward Island resident', 'Present minimum 183 days per year'],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.princeedwardisland.ca/en/information/health-pei/health-card',
      planName: 'PEI Health Card',
      planNameEn: 'PEI Health Card'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: ['❌ Étudiants non admissibles', 'Assurance privée obligatoire'],
      conditionsEn: ['❌ Students not eligible', 'Private insurance mandatory'],
      documents: [{ name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true }],
      applyUrl: '#',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de l\'Île-du-Prince-Édouard'],
      conditionsEn: ['Valid work permit', 'Prince Edward Island resident'],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.princeedwardisland.ca/en/information/health-pei/health-card',
      planName: 'PEI Health Card',
      planNameEn: 'PEI Health Card'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de l\'Île-du-Prince-Édouard'],
      conditionsEn: ['Valid work permit', 'Prince Edward Island resident'],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.princeedwardisland.ca/en/information/health-pei/health-card',
      planName: 'PEI Health Card',
      planNameEn: 'PEI Health Card'
    }
  },
  // Newfoundland and Labrador
  'NL': {
    'PERMANENT_RESIDENT': {
      eligible: true,
      conditional: false,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Résident de Terre-Neuve-et-Labrador', 'Présent minimum 183 jours par année'],
      conditionsEn: ['Newfoundland and Labrador resident', 'Present minimum 183 days per year'],
      documents: [
        { name: 'Carte de résident permanent', nameEn: 'Permanent Resident Card', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.gov.nl.ca/hcs/mcp/',
      planName: 'MCP (Medical Care Plan)',
      planNameEn: 'MCP (Medical Care Plan)'
    },
    'FOREIGN_STUDENT': {
      eligible: false,
      conditional: false,
      waitPeriod: 'Non admissible',
      waitPeriodEn: 'Not eligible',
      conditions: ['❌ Étudiants non admissibles', 'Assurance privée obligatoire'],
      conditionsEn: ['❌ Students not eligible', 'Private insurance mandatory'],
      documents: [{ name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true }],
      applyUrl: '#',
      planName: 'Assurance privée requise',
      planNameEn: 'Private insurance required'
    },
    'OPEN_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de Terre-Neuve-et-Labrador'],
      conditionsEn: ['Valid work permit', 'Newfoundland and Labrador resident'],
      documents: [
        { name: 'Permis de travail', nameEn: 'Work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.gov.nl.ca/hcs/mcp/',
      planName: 'MCP',
      planNameEn: 'MCP'
    },
    'CLOSED_WORK_PERMIT': {
      eligible: true,
      conditional: true,
      waitPeriod: '3 mois',
      waitPeriodEn: '3 months',
      conditions: ['Permis de travail valide', 'Résident de Terre-Neuve-et-Labrador'],
      conditionsEn: ['Valid work permit', 'Newfoundland and Labrador resident'],
      documents: [
        { name: 'Permis de travail fermé', nameEn: 'Closed work permit', required: true },
        { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
        { name: 'Passeport valide', nameEn: 'Valid passport', required: true }
      ],
      applyUrl: 'https://www.gov.nl.ca/hcs/mcp/',
      planName: 'MCP',
      planNameEn: 'MCP'
    }
  }
}

