import { BookOpen, Eye, Lightbulb, Shield, Rocket, Star } from 'lucide-react';

export interface CourseModule {
  week: number;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  idealAge: string;
  classStandard: string;
  duration: string;
  hours: number;
  fee: string;
  startDate: string;
  description: string;
  coreShift: string;
  modules: CourseModule[];
  outcomes: string[];
  icon: keyof typeof iconMap;
  category: string;
  registrationUrl: string;
}

export const iconMap = {
  BookOpen,
  Eye,
  Lightbulb,
  Shield,
  Rocket,
  Star,
};

export const schoolCourses: Course[] = [
  {
    id: 'thinking-beyond-answers',
    title: 'Thinking Beyond Answers',
    subtitle: 'Curious Explorer Program',
    level: 'Beginner',
    idealAge: '8–10 years',
    classStandard: 'Classes 3–5',
    duration: '6 weeks',
    hours: 12,
    fee: '₹4,999',
    startDate: 'April 7, 2026',
    description: 'Building creative confidence by teaching students how to think, not what to think.',
    coreShift: 'From fear of wrong answers → freedom to explore ideas',
    modules: [
      { week: 1, title: 'Why Thinking Matters More Than Answers', topics: ['What is thinking vs memorizing?', 'Why the future values ideas, not rote answers'] },
      { week: 2, title: 'How the Brain Learns & Creates', topics: ['How curiosity activates learning', 'Difference between linear and creative thinking'] },
      { week: 3, title: 'Breaking the "Right vs Wrong" Trap', topics: ['Why mistakes help learning', 'Safe spaces for ideas'] },
      { week: 4, title: 'Asking Powerful Questions', topics: ['What makes a good question?', 'Turning "what" into "why" and "how"'] },
      { week: 5, title: 'Imagination, Curiosity & Play', topics: ['Role of imagination in innovation', 'Learning through games and stories'] },
      { week: 6, title: 'Reflection – How My Thinking Is Changing', topics: ['Noticing changes in mindset', 'Expressing thoughts through drawing or writing'] },
    ],
    outcomes: ['Develop curiosity-driven learning habits', 'Overcome fear of making mistakes', 'Ask better questions', 'Express ideas confidently'],
    icon: 'BookOpen',
    category: 'schools',
    registrationUrl: '',
  },
  {
    id: 'seeing-problems-others-ignore',
    title: 'Seeing Problems Others Ignore',
    subtitle: 'Curious Explorer Program',
    level: 'Beginner–Intermediate',
    idealAge: '9–11 years',
    classStandard: 'Classes 4–6',
    duration: '6 weeks',
    hours: 12,
    fee: '₹4,999',
    startDate: 'April 14, 2026',
    description: 'Training young minds to notice challenges hidden in everyday life.',
    coreShift: 'From problem avoidance → problem curiosity',
    modules: [
      { week: 1, title: 'What Is a Problem, Really?', topics: ['Problems vs inconveniences', 'Why every problem hides an opportunity'] },
      { week: 2, title: 'Observation Skills', topics: ['Seeing beyond the obvious', 'Observation at home and school'] },
      { week: 3, title: 'Problems Around Us', topics: ['Community and environmental problems', 'School-life challenges'] },
      { week: 4, title: 'Empathy & Perspective', topics: ['Seeing problems from others\' eyes', 'Understanding feelings and needs'] },
      { week: 5, title: 'Mapping Problems in Teams', topics: ['Team discussion and clustering', 'Choosing meaningful problems'] },
      { week: 6, title: 'Storytelling Problems', topics: ['Explaining a problem clearly', 'Using stories to communicate issues'] },
    ],
    outcomes: ['Develop keen observation skills', 'Identify problems in everyday situations', 'Build empathy and perspective-taking', 'Communicate issues effectively'],
    icon: 'Eye',
    category: 'schools',
    registrationUrl: '',
  },
  {
    id: 'from-ideas-to-innovations',
    title: 'From Ideas to Innovations',
    subtitle: 'Young Innovator Program',
    level: 'Intermediate',
    idealAge: '11–14 years',
    classStandard: 'Classes 6–8',
    duration: '8 weeks',
    hours: 16,
    fee: '₹6,999',
    startDate: 'April 21, 2026',
    description: 'Turning imagination into structured, workable ideas using innovation tools.',
    coreShift: 'From random ideas → structured creativity',
    modules: [
      { week: 1, title: 'Creativity Is a Skill', topics: ['Myth of "born creative"', 'Everyone can learn creativity'] },
      { week: 2, title: 'Introduction to Design Thinking', topics: ['What is design thinking?', 'Steps of the innovation process'] },
      { week: 3, title: 'Generating Many Ideas', topics: ['Brainstorming techniques', 'Quantity before quality'] },
      { week: 4, title: 'Choosing Better Ideas', topics: ['Comparing and improving ideas', 'Feasibility vs imagination'] },
      { week: 5, title: 'Simple Prototyping', topics: ['Building rough models', 'Learning by making'] },
      { week: 6, title: 'Testing & Feedback', topics: ['Asking users for feedback', 'Improving ideas'] },
      { week: 7, title: 'Learning from Failure', topics: ['Why failure is useful', 'Iteration mindset'] },
      { week: 8, title: 'Innovation Showcase', topics: ['Presenting ideas', 'Reflecting on learning'] },
    ],
    outcomes: ['Master design thinking basics', 'Generate and evaluate ideas systematically', 'Build simple prototypes', 'Present innovations confidently'],
    icon: 'Lightbulb',
    category: 'schools',
    registrationUrl: '',
  },
  {
    id: 'who-owns-an-idea',
    title: 'Who Owns an Idea?',
    subtitle: 'Young Innovator Program',
    level: 'Intermediate',
    idealAge: '12–15 years',
    classStandard: 'Classes 7–9',
    duration: '6 weeks',
    hours: 12,
    fee: '₹4,999',
    startDate: 'May 4, 2026',
    description: 'Introducing intellectual property, ethics, and respect for creativity.',
    coreShift: 'From copying → respecting and owning ideas',
    modules: [
      { week: 1, title: 'Fairness, Copying & Creation', topics: ['What is copying?', 'Why fairness matters'] },
      { week: 2, title: 'What Is Intellectual Property?', topics: ['Ideas as creations', 'Types of creative work'] },
      { week: 3, title: 'Respecting Others\' Ideas', topics: ['Giving credit', 'Plagiarism in simple terms'] },
      { week: 4, title: 'IP in School Projects', topics: ['Group work and ownership', 'Sharing ideas responsibly'] },
      { week: 5, title: 'Ethics & Responsibility', topics: ['Right vs wrong use of ideas', 'Honesty in creativity'] },
      { week: 6, title: 'Protecting Your Own Ideas', topics: ['Recording ideas', 'Confidence in originality'] },
    ],
    outcomes: ['Understand intellectual property basics', 'Respect others\' creative work', 'Apply ethical principles to projects', 'Protect original ideas'],
    icon: 'Shield',
    category: 'schools',
    registrationUrl: '',
  },
  {
    id: 'thinking-like-young-entrepreneur',
    title: 'Thinking Like a Young Entrepreneur',
    subtitle: 'Junior Changemaker Program',
    level: 'Advanced',
    idealAge: '14–16 years',
    classStandard: 'Classes 9–10',
    duration: '7 weeks',
    hours: 14,
    fee: '₹5,999',
    startDate: 'May 18, 2026',
    description: 'Helping students understand value creation, leadership, and responsibility.',
    coreShift: 'From "I have an idea" → "Who does this help?"',
    modules: [
      { week: 1, title: 'What Is Value?', topics: ['Helping others vs making money', 'Value in daily life'] },
      { week: 2, title: 'Solving Problems for People', topics: ['User needs', 'Simple solutions'] },
      { week: 3, title: 'Teamwork & Leadership', topics: ['Working in teams', 'Listening and collaboration'] },
      { week: 4, title: 'Simple Business Thinking', topics: ['How solutions survive', 'Basic cost and effort ideas'] },
      { week: 5, title: 'Communication & Pitching', topics: ['Explaining ideas clearly', 'Confidence in speaking'] },
      { week: 6, title: 'Responsibility & Impact', topics: ['Effects of solutions', 'Social responsibility'] },
      { week: 7, title: 'Mini Pitch Day', topics: ['Presenting ideas', 'Peer feedback'] },
    ],
    outcomes: ['Understand value creation principles', 'Develop leadership skills', 'Create compelling pitches', 'Think responsibly about impact'],
    icon: 'Rocket',
    category: 'schools',
    registrationUrl: '',
  },
  {
    id: 'junior-changemaker-lab',
    title: 'Junior Changemaker Lab',
    subtitle: 'Junior Changemaker Program',
    level: 'Advanced',
    idealAge: '15–18 years',
    classStandard: 'Classes 10–12',
    duration: '8–10 weeks',
    hours: 30,
    fee: '₹9,999',
    startDate: 'June 1, 2026',
    description: 'Applying creativity, innovation, IP, and entrepreneurship to real problems.',
    coreShift: 'From learning concepts → becoming a changemaker',
    modules: [
      { week: 1, title: 'Choosing a Real Problem', topics: ['Personal connection to issues', 'Feasibility and relevance'] },
      { week: 2, title: 'Understanding the Problem Deeply', topics: ['Root causes', 'Stakeholders involved'] },
      { week: 3, title: 'Designing Solutions', topics: ['Idea generation', 'Selecting best solutions'] },
      { week: 4, title: 'Ethics & Impact', topics: ['Who benefits?', 'Any unintended harm?'] },
      { week: 5, title: 'Building a Prototype', topics: ['Models or demonstrations', 'Testing assumptions'] },
      { week: 6, title: 'IP & Ownership Reflection', topics: ['Who owns this idea?', 'Sharing responsibly'] },
      { week: 7, title: 'Preparing the Presentation', topics: ['Storytelling structure', 'Visual communication'] },
      { week: 8, title: 'Changemaker Showcase', topics: ['Final presentation', 'Reflection on growth'] },
    ],
    outcomes: ['Solve real-world problems', 'Build working prototypes', 'Understand IP ownership', 'Present like a changemaker'],
    icon: 'Star',
    category: 'schools',
    registrationUrl: '',
  },
  {
    id: 'future-mindset-schools',
    title: 'The Future Mindset',
    subtitle: 'Free Course',
    level: 'Foundation',
    idealAge: '11–18 years',
    classStandard: 'Classes 6–12',
    duration: '3 Hours',
    hours: 3,
    fee: 'Free',
    startDate: 'Open Enrollment',
    description: 'An experience that changes how students see change, ideas, and themselves.',
    coreShift: 'From fearing change → embracing possibilities',
    modules: [
      { week: 1, title: 'Understanding Change Without Fear', topics: ['How the World Has Changed', 'Why Chasing Tools Never Works'] },
      { week: 2, title: 'How Thinkers Think', topics: ['Difference Between Answer-Seekers and Thinkers', 'Problem–Solution Thinking in Daily Life'] },
      { week: 3, title: 'The Power of Creation', topics: ['Identifying Intellectual Property in Everyday Life', 'Copying vs Creating in the Internet Age'] },
    ],
    outcomes: ['See change as normal and advantageous', 'Start seeing themselves as creators', 'Develop problem-solution thinking'],
    icon: 'Star',
    category: 'schools',
    registrationUrl: '',
  },
];
