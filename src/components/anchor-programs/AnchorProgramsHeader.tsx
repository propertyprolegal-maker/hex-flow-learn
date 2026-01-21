const AnchorProgramsHeader = () => {
  return (
    <div className="text-center max-w-4xl mx-auto mb-16">
      {/* Main Title */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
        <span className="text-sm font-medium text-primary">Anchor Programs</span>
      </div>
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
        POSSIBLE | <span className="gradient-text">Anchor Programs</span>
      </h2>
      
      <p className="text-lg font-medium text-muted-foreground mb-6">
        Industry-Aligned Learning Pathways for the Knowledge Economy
      </p>
      
      {/* Introductory Paragraph */}
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        In the knowledge economy, Intellectual Property serves as the critical bridge connecting creativity, 
        innovation, research, and employment. It transforms ideas into assets, protects inventions and expressions, 
        and enables the structured commercialisation of knowledge. Our Anchor Programs are designed to equip 
        learners with the practical skills and strategic understanding needed to thrive in IP-driven careers 
        across industries, institutions, and policy frameworks.
      </p>
    </div>
  );
};

export default AnchorProgramsHeader;
