-- Add unique constraint on slug if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'courses_slug_unique'
  ) THEN
    ALTER TABLE public.courses ADD CONSTRAINT courses_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Seed all courses from static data files
INSERT INTO public.courses (slug, title, description, price, category, is_published, duration_weeks)
VALUES 
  -- School Courses (7)
  ('thinking-beyond-answers', 'Thinking Beyond Answers', 'Building creative confidence by teaching students how to think, not what to think.', 4999, 'schools', true, 6),
  ('seeing-problems-others-ignore', 'Seeing Problems Others Ignore', 'Training young minds to notice challenges hidden in everyday life.', 4999, 'schools', true, 6),
  ('from-ideas-to-innovations', 'From Ideas to Innovations', 'Turning imagination into structured, workable ideas using innovation tools.', 6999, 'schools', true, 8),
  ('who-owns-an-idea', 'Who Owns an Idea?', 'Introducing intellectual property, ethics, and respect for creativity.', 4999, 'schools', true, 6),
  ('thinking-like-young-entrepreneur', 'Thinking Like a Young Entrepreneur', 'Helping students understand value creation, leadership, and responsibility.', 5999, 'schools', true, 7),
  ('junior-changemaker-lab', 'Junior Changemaker Lab', 'Applying creativity, innovation, IP, and entrepreneurship to real problems.', 9999, 'schools', true, 10),
  ('future-mindset-schools', 'The Future Mindset', 'An experience that changes how students see change, ideas, and themselves.', 0, 'schools', true, 1),

  -- Workshop Courses (6)
  ('kashmir-saffron-immersion', 'Saffron: The Red Gold of Kashmir', 'Deep dive into the world of Kashmir saffron, from cultivation to GI protection.', 75000, 'workshops', true, 14),
  ('kashmir-heritage-business', 'Heritage Business Management', 'Learn to manage and grow heritage-based businesses in Kashmir.', 75000, 'workshops', true, 14),
  ('coorg-honey', 'Coorg Honey: Forest Gold', 'Explore traditional beekeeping and forest ecosystem management.', 55000, 'workshops', true, 9),
  ('coorg-coffee', 'Coorg Coffee: Bean to Cup', 'From plantation to export, understand the coffee value chain.', 55000, 'workshops', true, 9),
  ('mysore-silk', 'Mysore Silk Saree', 'Master the art and business of Mysore silk sarees.', 65000, 'workshops', true, 10),
  ('mysore-rosewood', 'Mysore Rosewood Inlay', 'Learn the heritage craft of rosewood inlay with master artisans.', 65000, 'workshops', true, 10),

  -- University Courses (12)
  ('future-mindset-universities', 'The Future Mindset', 'An experience that changes how students see change, ideas, and themselves.', 0, 'universities', true, 1),
  ('creativity-innovation-fundamentals', 'Creativity & Innovation Fundamentals', 'Building a strong foundation in creative thinking and innovation processes.', 7999, 'universities', true, 8),
  ('ip-basics-for-innovators', 'IP Basics for Innovators', 'Understanding the essentials of intellectual property for creators.', 5999, 'universities', true, 6),
  ('entrepreneurial-thinking', 'Entrepreneurial Thinking', 'Developing the mindset and skills for entrepreneurial success.', 8999, 'universities', true, 8),
  ('design-thinking-practice', 'Design Thinking in Practice', 'Hands-on application of design thinking methodology.', 9999, 'universities', true, 10),
  ('ip-strategy-startups', 'IP Strategy for Startups', 'Strategic IP management for emerging businesses.', 11999, 'universities', true, 10),
  ('innovation-management', 'Innovation Management', 'Leading and managing innovation in organizations.', 12999, 'universities', true, 12),
  ('technology-commercialization', 'Technology Commercialization', 'From lab to market: commercializing innovations.', 14999, 'universities', true, 12),
  ('social-innovation', 'Social Innovation & Impact', 'Creating innovations that address social challenges.', 8999, 'universities', true, 8),
  ('gi-heritage-innovation', 'GI & Heritage Innovation', 'Leveraging geographical indications for innovation.', 9999, 'universities', true, 10),
  ('ai-innovation-ethics', 'AI, Innovation & Ethics', 'Navigating AI innovation with ethical considerations.', 11999, 'universities', true, 10),
  ('capstone-innovation-project', 'Capstone Innovation Project', 'Comprehensive project applying all learned concepts.', 15999, 'universities', true, 14),

  -- Anchor Courses - Track A (6)
  ('ciip-basics', 'CIIP Basics', 'Foundation course covering Creativity, Innovation, IP, and Entrepreneurship.', 39999, 'anchor', true, 12),
  ('ciip-economics-policy', 'CIIP Economics & Policy', 'Understanding the economic and policy dimensions of IP.', 44999, 'anchor', true, 14),
  ('certificate-ip-fundamentals', 'Certificate in IP Fundamentals', 'Comprehensive certification in intellectual property basics.', 34999, 'anchor', true, 10),
  ('certificate-innovation-management', 'Certificate in Innovation Management', 'Professional certification in managing innovation.', 39999, 'anchor', true, 12),
  ('certificate-entrepreneurship', 'Certificate in Entrepreneurship', 'Certification program for aspiring entrepreneurs.', 44999, 'anchor', true, 14),
  ('diploma-ip-management', 'Diploma in IP Management', 'Advanced diploma in intellectual property management.', 79999, 'anchor', true, 24),

  -- Anchor Courses - Track B (4)
  ('ip-paralegal-certification', 'IP Paralegal Certification', 'Professional certification for IP paralegals.', 49999, 'anchor', true, 16),
  ('patent-docketing', 'Patent Docketing Specialist', 'Specialized training in patent docketing procedures.', 34999, 'anchor', true, 10),
  ('trademark-prosecution', 'Trademark Prosecution', 'Comprehensive trademark prosecution training.', 39999, 'anchor', true, 12),
  ('ip-analytics', 'IP Analytics & Research', 'Data-driven IP analysis and research methods.', 44999, 'anchor', true, 14),

  -- Anchor Courses - Track C (4)
  ('patent-drafting', 'Patent Drafting Essentials', 'Master the art of patent drafting.', 54999, 'anchor', true, 16),
  ('patent-prosecution-advanced', 'Advanced Patent Prosecution', 'Advanced techniques in patent prosecution.', 59999, 'anchor', true, 18),
  ('ip-litigation-basics', 'IP Litigation Basics', 'Introduction to intellectual property litigation.', 49999, 'anchor', true, 14),
  ('ip-valuation', 'IP Valuation & Monetization', 'Techniques for valuing and monetizing IP assets.', 54999, 'anchor', true, 16),

  -- Anchor Courses - Track D (4)
  ('gi-protection-strategy', 'GI Protection & Strategy', 'Geographical indication protection strategies.', 44999, 'anchor', true, 12),
  ('ppvfr-plant-varieties', 'PPV&FR: Plant Varieties Protection', 'Plant variety protection and farmers rights.', 39999, 'anchor', true, 10),
  ('ai-data-ip', 'AI & Data IP', 'Intellectual property in AI and data ecosystems.', 49999, 'anchor', true, 14),
  ('traditional-knowledge-ip', 'Traditional Knowledge & IP', 'Protecting traditional knowledge through IP.', 44999, 'anchor', true, 12)

ON CONFLICT (slug) DO NOTHING;