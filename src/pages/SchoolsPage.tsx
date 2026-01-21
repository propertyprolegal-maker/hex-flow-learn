import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Clock, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { schoolCourses } from '@/data/schoolCourses';

const SchoolsPage = () => {
  const navigate = useNavigate();
  const [showCourses, setShowCourses] = useState(false);

  const handleTakeToSchool = () => {
    setShowCourses(true);
    setTimeout(() => {
      document.getElementById('school-courses')?.scrollIntoView({ behavior: 'smooth' });
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
            {/* Pathway Header */}
            <div className="text-center mb-8">
              <p className="text-sm text-secondary font-medium mb-2">Pathway</p>
              <h1 className="text-xl md:text-2xl font-heading font-bold gradient-text">
                Curious Explorer → Young Innovator → Junior Changemaker
              </h1>
            </div>

            {/* Letter Content */}
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg font-semibold mb-6">Dear Parent,</p>
              
              <p className="mb-4">
                As parents, we all want our children to succeed—not just in exams, but in life.
              </p>
              
              <p className="mb-4">
                Not very long ago, we moved from floppy disks to CD drives.
              </p>
              
              <p className="mb-4">
                Then came master–slave architectures, followed by cloud computing.
              </p>
              
              <p className="mb-4">
                In medicine, X-rays gave way to CT scans, then MRI—and the journey continues.
              </p>
              
              <p className="mb-4">
                Today, it is Artificial Intelligence. Tomorrow, it will be something we cannot yet name.
              </p>
              
              <p className="mb-4 font-medium text-primary">
                This is the nature of progress: tools, technologies, and methods keep changing—sometimes faster than we expect.
              </p>
              
              <p className="mb-4">
                The real question is not what your child should learn today.
              </p>
              
              <p className="mb-4 font-medium">
                It is how your child learns, adapts, and grows over an entire lifetime.
              </p>
              
              <p className="mb-4">
                You can prepare a child for yearly-changing milestones and technologies.
              </p>
              
              <p className="mb-6 font-medium text-primary">
                Or you can prepare a child for a career—and a life—where learning never stops.
              </p>
              
              <p className="mb-6 text-xl font-heading font-bold text-secondary">
                Possible is built around this second belief.
              </p>
              
              <p className="mb-4">
                Possible is a carefully designed learning program for school students that focuses on building:
              </p>
              
              <ul className="list-none space-y-2 mb-6 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Creative and critical thinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Confidence to express ideas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Ethical understanding of originality and ownership</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Problem-solving and leadership skills</span>
                </li>
              </ul>
              
              <p className="mb-4 font-medium text-muted-foreground">
                This is not extra tuition and not exam coaching.
              </p>
              
              <p className="mb-4">
                Instead, Possible helps students:
              </p>
              
              <ul className="list-none space-y-2 mb-6 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>Ask meaningful questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>Think independently and creatively</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>Embrace change rather than fear it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>Understand how ideas grow into impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✦</span>
                  <span>See learning as something engaging and enjoyable—not stressful</span>
                </li>
              </ul>
              
              <p className="mb-4">
                All programs are:
              </p>
              
              <ul className="list-none space-y-2 mb-6 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✦</span>
                  <span>Age-appropriate and activity-based</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✦</span>
                  <span>Aligned with school learning (not replacing it)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✦</span>
                  <span>Designed to reduce fear of mistakes and build confidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✦</span>
                  <span>Focused on mindset, not marks</span>
                </li>
              </ul>
              
              <p className="mb-4">
                By the time students complete the Possible journey, they don't just have certificates—they have:
              </p>
              
              <ul className="list-none space-y-2 mb-6 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>A portfolio of ideas and projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Strong communication skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Confidence to face unfamiliar challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>A clear sense of responsibility and ethics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Are comfortable with uncertainty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Adapt faster than others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>See opportunities where others see disruption</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✦</span>
                  <span>Lead change instead of reacting to it</span>
                </li>
              </ul>
              
              <p className="mb-4 font-medium">
                In a world where information is easily available, thinking clearly and responsibly is the real advantage.
              </p>
              
              <p className="mb-6 text-lg font-medium text-primary">
                In a future where tools evolve every few years, the greatest advantage your child can have is the ability to learn, unlearn, and reimagine—again and again.
              </p>
              
              <p className="mb-6">
                That is what Possible helps your child develop. They don't just learn for exams. <strong>They learn how to think for life.</strong>
              </p>
              
              <div className="mt-8 pt-6 border-t border-border/30">
                <p className="mb-1">Warm regards,</p>
                <p className="font-heading font-bold text-primary text-lg">Team Possible</p>
                <p className="text-sm text-muted-foreground italic">Building skills that make the future possible</p>
              </div>
            </div>

            {/* Take me to school button */}
            {!showCourses && (
              <div className="mt-10 text-center">
                <button
                  onClick={handleTakeToSchool}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-heading font-semibold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  Take me to school
                  <ChevronDown className="w-5 h-5 animate-bounce" />
                </button>
              </div>
            )}
          </div>

          {/* Courses Section */}
          {showCourses && (
            <div id="school-courses" className="pt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  <span className="gradient-text">School Programs</span>
                </h2>
                <p className="text-muted-foreground">Choose a program that fits your child's journey</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {schoolCourses.map((course) => (
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

export default SchoolsPage;
