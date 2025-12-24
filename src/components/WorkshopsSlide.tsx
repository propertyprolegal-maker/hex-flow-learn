import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const workshopImages = [
  {
    id: 1,
    title: "Hands-on Craft Workshop",
    description: "Students learning traditional Kashmiri embroidery techniques",
    image: "https://images.unsplash.com/photo-1529390079861-591f8f0e9903?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Field Visit to Artisan Community",
    description: "Exploring local GI products with master craftsmen",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Certificate Ceremony",
    description: "Celebrating successful completion of the immersive program",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Interactive Learning Session",
    description: "Collaborative problem-solving with industry mentors",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Cultural Immersion Experience",
    description: "Students experiencing local traditions and heritage",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Project Presentation Day",
    description: "Showcasing capstone projects to industry experts",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop"
  }
];

const WorkshopsSlide = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % workshopImages.length
      : (selectedImage - 1 + workshopImages.length) % workshopImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Glimpse from Previous{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Workshops
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the transformative moments from our immersive learning programs
          </p>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopImages.map((workshop, index) => (
            <div
              key={workshop.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => openLightbox(index)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {workshop.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {workshop.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Students Trained" },
            { value: "15+", label: "Workshops Conducted" },
            { value: "10+", label: "Partner Communities" },
            { value: "95%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Image Content */}
          <div 
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={workshopImages[selectedImage].image.replace('w=600&h=400', 'w=1200&h=800')}
              alt={workshopImages[selectedImage].title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-foreground">
                {workshopImages[selectedImage].title}
              </h3>
              <p className="text-muted-foreground mt-2">
                {workshopImages[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopsSlide;
