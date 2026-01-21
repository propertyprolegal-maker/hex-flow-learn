import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Award } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { anchorCourses } from '@/data/anchorCourses';

const AnchorCoursesPage = () => {
  const navigate = useNavigate();
  const [showCourses, setShowCourses] = useState(false);

  const handleExploreCourses = () => {
    setShowCourses(true);
    setTimeout(() => {
      document.getElementById('anchor-courses')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen">
      <HeroBackground />
      <Header onNavigate={() => navigate('/')} />

      <main className="relative z-10 pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Letter Section */}
          <div className="glass-card rounded-2xl p-6 sm:p-10 border border-border/30 mb-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold gradient-text mb-2">
                POSSIBLE | ANCHOR PROGRAMS
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">
                  CIIED — The Seed of Our Future
                </span>
              </div>
              <p className="text-secondary font-medium mt-3">
                Creativity • Innovation • Intellectual Property • Entrepreneurship Development
              </p>
            </div>

            {/* Letter Content */}
            <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 space-y-6">
              <p className="text-base leading-relaxed">
                The future of societies, economies, and institutions is not built by chance—it is cultivated. At the heart of this cultivation lies a powerful and interlinked framework: <strong>CIIED</strong>—Creativity, Innovation, Intellectual Property, and Entrepreneurship Development. Together, they form the seed from which sustainable progress, inclusive growth, and knowledge-driven economies emerge.
              </p>

              <div className="my-8 p-6 rounded-xl bg-secondary/10 border border-secondary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">CIIED as an Integrated System</h2>
                <p className="mb-4">CIIED is not a sequence—it is a cycle:</p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Creativity</strong> generates ideas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Innovation</strong> refines and applies them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Intellectual Property</strong> protects and structures them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Entrepreneurship Development</strong> scales them</span>
                  </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  This cycle continuously feeds itself, creating resilient ecosystems of learning, invention, enterprise, and growth.
                </p>
              </div>

              <div className="my-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">The Seed of Our Collective Future</h2>
                <p>
                  CIIED is the seed of our future because it prepares individuals and institutions not just to adapt to change—but to <strong>lead it</strong>. By nurturing creativity, enabling innovation, protecting knowledge, and fostering entrepreneurship, we invest in a future that is inclusive, sustainable, and opportunity-driven.
                </p>
                <p className="mt-4 font-medium text-primary">
                  In a rapidly evolving world, CIIED is how ideas become impact—and how the future is grown, not guessed.
                </p>
              </div>

              <hr className="border-border/50 my-8" />

              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-2">
                  INTELLECTUAL PROPERTY, INNOVATION & IP CAREERS
                </h2>
                <p className="text-secondary font-medium">
                  Industry-Aligned Learning Pathways for the Knowledge Economy
                </p>
              </div>

              <p>
                In a world increasingly driven by innovation, technology, data, and creativity, Intellectual Property (IP) has emerged as a critical bridge between ideas and impact, research and revenue, creativity and commerce. The <strong>Possible IP Learning Programs</strong> are designed to build this bridge—systematically, inclusively, and with a sharp focus on employability and real-world practice.
              </p>

              <p>
                This comprehensive portfolio of online certificate programs offers structured learning pathways across the entire IP lifecycle—from foundational awareness to advanced drafting, prosecution, portfolio management, commercialization, and policy leadership. The courses are carefully curated to serve students, researchers, professionals, startups, academic institutions, and industry practitioners, enabling them to participate meaningfully in the global innovation ecosystem.
              </p>

              <div className="my-8 p-6 rounded-xl bg-accent/30 border border-accent/50">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">What Makes These Programs Distinct</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">• Employment-First Design</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Every course is aligned with real roles in IP law firms, corporates, KPOs, startups, universities, and policy institutions—such as IP paralegal, patent analyst, drafting associate, prosecution specialist, portfolio manager, technology transfer professional, and IP consultant.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary">• End-to-End IP Coverage</h4>
                    <p className="text-sm text-muted-foreground mt-1">Learners can progress seamlessly across four integrated career tracks:</p>
                    <ol className="text-sm text-muted-foreground mt-2 ml-4 space-y-1">
                      <li>1. IP Awareness & Strategy (CIIP ladder)</li>
                      <li>2. IP Paralegal & Operations</li>
                      <li>3. IP Drafting, Prosecution & Portfolio Management</li>
                      <li>4. Specialised & Niche IP Domains (GI, Plant Varieties, AI, Data, Policy)</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary">• Practice-Oriented & Modular</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Courses emphasise hands-on learning, real case studies, live exercises, drafting assignments, docketing simulations, portfolio reviews, and capstone projects—rather than purely theoretical instruction.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary">• Stackable & Customisable</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Programs are modular and stackable, allowing learners to build short-term job readiness or long-term professional specialisation.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary">• Global Perspective, Indian Context</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      The curriculum integrates Indian, US, and European IP practices, preparing learners for both domestic and international roles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-8 p-6 rounded-xl bg-secondary/10 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">Who These Programs Are For</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Undergraduate and postgraduate students from law, science, engineering, management, arts, and agriculture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Researchers, PhD scholars, and faculty members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Working professionals seeking career transition or specialisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Startup founders and incubator teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>University IPR cells, technology transfer offices, and innovation hubs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Policy, development, and community-based organisations</span>
                  </li>
                </ul>
              </div>

              <div className="my-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">Outcomes That Matter</h3>
                <p className="mb-4">Graduates of these programs do not merely learn IP—they <strong>apply it</strong>. They gain the confidence and competence to:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Support real patent and trademark filings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Assist in prosecution, docketing, and portfolio management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Draft and review IP documents under professional supervision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Evaluate, protect, and commercialise innovations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Contribute to policy, governance, and emerging IP debates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Translate creativity and research into sustainable economic value</span>
                  </li>
                </ul>
              </div>

              <div className="text-center my-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">
                  A Platform for India's Innovation-Ready Workforce
                </h3>
                <p className="text-muted-foreground mb-4">
                  The Possible IP Learning ecosystem is built with a long-term vision:
                </p>
                <ul className="space-y-1 text-sm font-medium">
                  <li>to democratise access to IP education,</li>
                  <li>to create employment-ready professionals, and</li>
                  <li>to strengthen India's position in the global knowledge economy.</li>
                </ul>
                <p className="mt-4 text-foreground">
                  Whether you are taking your first step into intellectual property or advancing toward specialist leadership roles, these programs offer a <strong>clear, credible, and future-ready pathway</strong>.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            {!showCourses && (
              <div className="text-center mt-10">
                <button
                  onClick={handleExploreCourses}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                >
                  <span>Explore Anchor Programs</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Courses Section */}
          {showCourses && (
            <div id="anchor-courses" className="pt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold gradient-text mb-2">
                  Anchor Programs
                </h2>
                <p className="text-muted-foreground">
                  Professional certifications with hands-on immersion experiences
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {anchorCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="group relative glass-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 text-left"
                  >
                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-xs text-secondary font-medium mb-1">{course.subtitle}</p>
                        <h3 className="text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>{course.hours}h</span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">{course.fee}</span>
                        <span className="inline-flex items-center gap-1 text-primary font-medium text-xs group-hover:gap-2 transition-all">
                          View Details
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnchorCoursesPage;
