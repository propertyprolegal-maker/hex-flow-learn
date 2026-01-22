import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { workshopCourses, iconMap } from "@/data/workshopCourses";

const WorkshopsPage = () => {
  const navigate = useNavigate();
  const [showCourses, setShowCourses] = useState(false);

  const handleTakeToWorkshops = () => {
    setShowCourses(true);
    setTimeout(() => {
      document.getElementById('workshop-courses')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <HeroBackground />
      <Header onNavigate={() => navigate('/')} />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Letter Content */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-8 md:p-12 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                POSSIBLE | WORKSHOPS
              </h1>
              <p className="text-lg text-muted-foreground italic">
                Immersion Programs — Where Learning Meets Living
              </p>
            </div>

            {/* Pathway */}
            <div className="bg-primary/10 rounded-xl p-4 mb-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Pathway</p>
              <p className="text-lg font-semibold text-foreground">
                Observe → Experience → Understand → Transform
              </p>
            </div>

            {/* Letter Body */}
            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
              <p className="text-lg leading-relaxed">
                Dear Learner,
              </p>

              <p className="leading-relaxed">
                Some lessons cannot be taught in classrooms.
              </p>

              <p className="leading-relaxed">
                The delicate art of harvesting saffron at dawn in Pampore.
                The patient rhythm of a Kani shawl weaver in Kashmir.
                The science behind Coorg's forest honey.
                The centuries-old tradition of Mysore silk.
              </p>

              <p className="leading-relaxed">
                These are not subjects to be read about—they are experiences to be lived.
              </p>

              <p className="leading-relaxed font-semibold">
                Welcome to Possible Workshops — our Immersion Learning Programs.
              </p>

              <div className="bg-secondary/10 rounded-xl p-6 my-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">What Makes Immersion Different?</h3>
                <p className="leading-relaxed mb-4">
                  Traditional learning tells you about the world.
                  Immersion learning takes you into it.
                </p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>You don't read about saffron cultivation—you walk through the fields at harvest time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>You don't study coffee processing—you work alongside farmers in Coorg's plantations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>You don't learn about heritage crafts—you sit with master artisans and understand their world.</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">The Structure of Immersion</h3>
              <p className="leading-relaxed">
                Each Possible Workshop combines:
              </p>
              <ul className="space-y-3 list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div>
                    <span className="font-semibold">Online Foundation</span> — Structured learning modules covering history, science, economics, and intellectual property aspects
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div>
                    <span className="font-semibold">Field Immersion</span> — Travel to the source. Meet the people. Experience the practice. Understand the context.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div>
                    <span className="font-semibold">Reflection & Application</span> — Connect your experience to larger questions of sustainability, innovation, and responsible development.
                  </div>
                </li>
              </ul>

              <div className="bg-accent/10 rounded-xl p-6 my-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Why This Matters</h3>
                <p className="leading-relaxed mb-4">
                  India's heritage products—from Kashmir saffron to Mysore silk, from Coorg honey to 
                  traditional crafts—represent centuries of accumulated wisdom, cultural identity, and 
                  economic potential.
                </p>
                <p className="leading-relaxed mb-4">
                  Yet this heritage faces challenges:
                </p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Knowledge is being lost as traditional practitioners age</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Market access remains limited for authentic producers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Imitations and counterfeits dilute brand value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Young people are disconnected from their own cultural wealth</span>
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Our immersion programs create a new generation of informed advocates, researchers, 
                  entrepreneurs, and policymakers who understand heritage from the inside out.
                </p>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">Who Are These Programs For?</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Students seeking meaningful, experience-based learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Professionals exploring heritage-based careers or social enterprise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Researchers and academics studying GI products, traditional knowledge, or sustainable development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Anyone who believes that some things must be experienced to be truly understood</span>
                </li>
              </ul>

              <div className="bg-muted/50 rounded-xl p-6 my-8 border-l-4 border-primary">
                <p className="leading-relaxed italic">
                  "The best education is not about filling minds with information.
                  It is about opening eyes to what has always been there—waiting to be seen."
                </p>
              </div>

              <p className="leading-relaxed">
                Our workshops take you to the heart of India's living heritage.
                You return not just with knowledge, but with understanding.
                Not just with certificates, but with connections.
                Not just with memories, but with purpose.
              </p>

              <p className="leading-relaxed mt-8">
                Warm regards,
              </p>
              <p className="font-semibold text-foreground">
                Team Possible | Workshops
              </p>
              <p className="text-sm text-muted-foreground italic">
                Learning that stays with you—because you lived it
              </p>
            </div>

            {/* CTA Button */}
            {!showCourses && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleTakeToWorkshops}
                  className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  Explore Immersion Programs
                </button>
              </div>
            )}
          </div>

          {/* Workshop Courses Section */}
          {showCourses && (
            <div id="workshop-courses" className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Immersion Programs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workshopCourses.map((course) => {
                  const IconComponent = iconMap[course.icon];
                  return (
                    <button
                      key={course.id}
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 text-left hover:border-primary/50 transition-all hover:shadow-lg group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">{course.subtitle}</p>
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {course.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {course.startDate}
                            </span>
                          </div>
                          <div className="pt-2 flex justify-end">
                            <span className="inline-flex items-center gap-1 text-primary font-medium text-xs group-hover:gap-2 transition-all">
                              View Details
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkshopsPage;
