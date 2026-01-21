import { MapPin, Coffee, Leaf, Palette, ShirtIcon } from 'lucide-react';

export interface WorkshopCourse {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  startDate: string;
  fee: string;
  description: string;
  highlights: string[];
  icon: keyof typeof iconMap;
  category: string;
  registrationUrl: string;
}

export const iconMap = {
  MapPin,
  Coffee,
  Leaf,
  Palette,
  ShirtIcon,
};

export const workshopCourses: WorkshopCourse[] = [
  {
    id: 'kashmir-saffron-immersion',
    title: 'Saffron: The Red Gold of Kashmir',
    subtitle: 'Kashmir Immersion Program',
    location: 'Pampore, Kashmir',
    duration: '3 Months + 2 Weeks Field',
    startDate: 'April 15, 2026',
    fee: '₹75,000',
    description: 'Deep dive into the world of Kashmir saffron, from cultivation to GI protection.',
    highlights: ['Meet Saffron Growers in Pampore', 'GI Protection Strategies', 'Quality Standards', 'Market Access'],
    icon: 'Leaf',
    category: 'workshops',
    registrationUrl: '',
  },
  {
    id: 'kashmir-heritage-business',
    title: 'Heritage Business Management',
    subtitle: 'Kashmir Immersion Program',
    location: 'Srinagar, Kashmir',
    duration: '3 Months + 2 Weeks Field',
    startDate: 'May 1, 2026',
    fee: '₹75,000',
    description: 'Learn to manage and grow heritage-based businesses in Kashmir.',
    highlights: ['Heritage Conservation', 'Business Strategy', 'Cultural Tourism', 'Kani Shawl Weavers'],
    icon: 'MapPin',
    category: 'workshops',
    registrationUrl: '',
  },
  {
    id: 'coorg-honey',
    title: 'Coorg Honey: Forest Gold',
    subtitle: 'Coorg Immersion Program',
    location: 'Kodagu, Karnataka',
    duration: '2 Months + 1 Week Field',
    startDate: 'June 1, 2026',
    fee: '₹55,000',
    description: 'Explore traditional beekeeping and forest ecosystem management.',
    highlights: ['Beekeeping Traditions', 'Forest Ecosystem', 'GI Certification', 'Sustainable Harvesting'],
    icon: 'Leaf',
    category: 'workshops',
    registrationUrl: '',
  },
  {
    id: 'coorg-coffee',
    title: 'Coorg Coffee: Bean to Cup',
    subtitle: 'Coorg Immersion Program',
    location: 'Kodagu, Karnataka',
    duration: '2 Months + 1 Week Field',
    startDate: 'July 1, 2026',
    fee: '₹55,000',
    description: 'From plantation to export, understand the coffee value chain.',
    highlights: ['Coffee Plantations', 'Processing Methods', 'Export Markets', 'Quality Assessment'],
    icon: 'Coffee',
    category: 'workshops',
    registrationUrl: '',
  },
  {
    id: 'mysore-silk',
    title: 'Mysore Silk Saree',
    subtitle: 'Mysore Immersion Program',
    location: 'Mysore, Karnataka',
    duration: '2 Months + 2 Weeks Field',
    startDate: 'August 1, 2026',
    fee: '₹65,000',
    description: 'Master the art and business of Mysore silk sarees.',
    highlights: ['Silk Weaving', 'Zari Craft', 'Fashion Industry', 'GI Protection'],
    icon: 'ShirtIcon',
    category: 'workshops',
    registrationUrl: '',
  },
  {
    id: 'mysore-rosewood',
    title: 'Mysore Rosewood Inlay',
    subtitle: 'Mysore Immersion Program',
    location: 'Mysore, Karnataka',
    duration: '2 Months + 2 Weeks Field',
    startDate: 'September 1, 2026',
    fee: '₹65,000',
    description: 'Learn the heritage craft of rosewood inlay with master artisans.',
    highlights: ['Inlay Artisans', 'Woodcraft Heritage', 'Design Innovation', 'Market Access'],
    icon: 'Palette',
    category: 'workshops',
    registrationUrl: '',
  },
];
