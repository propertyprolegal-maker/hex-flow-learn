import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Clock, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { universityCourses } from '@/data/universityCourses';

const UniversitiesPage = () => {
  const navigate = useNavigate();
  const [showCourses, setShowCourses] = useState(false);

  const handleTakeToCourses = () => {
    setShowCourses(true);
    setTimeout(() => {
      document.getElementById('university-courses')?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="glass-card rounded-2xl p-8 md:p-12 border border-border/30 mb-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
                POSSIBLE | UNIVERSITIES
              </h1>
              <p className="text-sm text-secondary font-medium mb-2">Pathway</p>
              <p className="text-lg md:text-xl font-heading font-bold gradient-text">
                Knowledge Builder → Applied Innovator → Graduate Fellow
              </p>
              <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm font-medium text-foreground">
                  <span className="text-primary">Possible Core:</span> Creativity → Innovation → Intellectual Property → Entrepreneurship → Responsible Impact
                </p>
              </div>
            </div>

            {/* Letter Content */}
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg font-semibold mb-6">Dear Student and Parent,</p>
              
              <p className="mb-4">A generation ago, we memorised phone numbers.</p>
              <p className="mb-4">Then we saved them on SIM cards.</p>
              <p className="mb-4">Then on smartphones.</p>
              <p className="mb-4">Now AI reminds us who to call and when.</p>
              
              <p className="mb-4">Learning once meant memorising facts.</p>
              <p className="mb-4">Then accessing information.</p>
              <p className="mb-6 font-medium text-primary">Now it means interpreting, questioning, and creating.</p>
              
              <p className="mb-4">What once felt essential, was eventually replaced.</p>
              <p className="mb-6 font-medium">What never became obsolete was the ability to think, adapt, and grow.</p>
              
              <p className="mb-6 text-lg font-heading font-bold text-secondary">
                University education today faces a quiet but serious question:
              </p>
              
              <p className="mb-4 pl-4 border-l-4 border-primary/30 italic">
                Do we prepare students for specific tools and roles that will change,<br />
                or do we prepare them for a lifetime of learning, reinvention, and leadership?
              </p>
              
              <p className="mb-6 text-xl font-heading font-bold text-primary mt-8">
                Possible | Universities is built on a clear belief:
              </p>
              
              <p className="mb-6 text-lg font-medium bg-secondary/10 p-4 rounded-xl">
                The most valuable graduates are not those who know the most today,<br />
                but those who can learn faster, think deeper, and adapt better tomorrow.
              </p>
              
              <p className="mb-4 font-medium text-muted-foreground">
                Possible does not replace your degree.<br />
                It adds value, strengthens it.
              </p>
              
              <p className="mb-4">
                While your university gives you disciplinary knowledge, Possible develops:
              </p>
              
              <ul className="list-none space-y-2 mb-6 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>The ability to understand change without fear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>The habit of asking problem–solution questions in every field</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>The confidence to work across disciplines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>The judgment to innovate responsibly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>The awareness of how ideas become value—through creativity, intellectual property, and entrepreneurship</span>
                </li>
              </ul>
              
              <p className="mb-6 font-medium text-muted-foreground">
                This is not about pushing every student to become a startup founder.<br />
                It is about ensuring that every graduate can create value—wherever they go.
              </p>
              
              <p className="mb-4">
                Students who go through the Possible pathway stop asking:
              </p>
              
              <p className="mb-4 pl-4 text-muted-foreground italic">
                "What job will I get after graduation?"
              </p>
              
              <p className="mb-4">
                They start asking:
              </p>
              
              <p className="mb-6 pl-4 text-primary font-medium italic">
                "What problems can I work on, and how can I grow with them?"
              </p>
              
              <p className="mb-6 font-medium text-secondary">
                That shift matters.
              </p>
              
              <p className="mb-4">
                Because careers today are no longer ladders—they are journeys.
              </p>
              
              <p className="mb-4">
                And journeys reward people who:
              </p>
              
              <ul className="list-none space-y-2 mb-6 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>See change early instead of fearing it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>Learn continuously instead of depending on degrees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>Think ethically instead of acting impulsively</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>Carry portfolios of thinking and action—not just marksheets</span>
                </li>
              </ul>
              
              <p className="mb-6 font-medium">
                Possible prepares students not for their first job,<br />
                but for their second, third, and fourth reinvention.
              </p>
              
              <p className="mb-4 text-lg font-medium text-primary">
                In a world where technologies will keep changing,<br />
                thinking well, learning joyfully, and adapting responsibly is the only lasting advantage.
              </p>
              
              <p className="mb-6 text-xl font-heading font-bold text-secondary">
                That is the advantage Possible offers.
              </p>
              
              <div className="mt-8 pt-6 border-t border-border/30">
                <p className="mb-1">Warm regards,</p>
                <p className="font-heading font-bold text-primary text-lg">Team Possible | Universities</p>
                <p className="text-sm text-muted-foreground italic">Preparing graduates not just for employment—but for the future itself</p>
              </div>
            </div>

            {/* Take me to courses button */}
            {!showCourses && (
              <div className="mt-10 text-center">
                <button
                  onClick={handleTakeToCourses}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-heading font-semibold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  Explore University Programs
                  <ChevronDown className="w-5 h-5 animate-bounce" />
                </button>
              </div>
            )}
          </div>

          {/* Courses Section */}
          {showCourses && (
            <div id="university-courses" className="pt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  <span className="gradient-text">University Programs</span>
                </h2>
                <p className="text-muted-foreground">Choose a program that fits your academic journey</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {universityCourses.map((course) => (
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

export default UniversitiesPage;
