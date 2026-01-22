import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import workshop1 from "@/assets/workshop-1.jpg";
import workshop2 from "@/assets/workshop-2.jpg";
import workshop3 from "@/assets/workshop-3.jpg";
import workshop4 from "@/assets/workshop-4.jpg";

const workshopImages = [
  {
    id: 1,
    title: "Blue Pottery Workshop",
    image: workshop1
  },
  {
    id: 2,
    title: "Traditional Puppetry Session",
    image: workshop2
  },
  {
    id: 3,
    title: "Panel Discussion",
    image: workshop3
  },
  {
    id: 4,
    title: "Interactive Learning Session",
    image: workshop4
  }
];

const WorkshopsSlide = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Glimpse from Previous{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Workshops
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Experience the transformative moments from our immersive learning programs
          </p>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-muted transition-colors shadow-lg -translate-x-4"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-muted transition-colors shadow-lg translate-x-4"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {workshopImages.map((workshop) => (
              <div
                key={workshop.id}
                className="flex-shrink-0 w-64 md:w-72"
              >
                {/* Image Card */}
                <div className="rounded-xl overflow-hidden border border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-40 md:h-44 object-cover"
                  />
                </div>
                {/* Title Below Image */}
                <p className="mt-3 text-sm font-medium text-foreground text-center">
                  {workshop.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "8000+", label: "Students Trained" },
            { value: "15+", label: "Workshops Conducted" },
            { value: "50+", label: "Partner Communities" },
            { value: "95%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
            >
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopsSlide;
