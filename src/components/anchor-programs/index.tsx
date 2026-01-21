import AnchorProgramsHeader from './AnchorProgramsHeader';
import CareerTracksSection from './CareerTracksSection';
import CIIEDPhilosophy from './CIIEDPhilosophy';
import ProgramPortfolioOverview from './ProgramPortfolioOverview';
import CourseStructureAccordion from './CourseStructureAccordion';
import TargetAudienceSection from './TargetAudienceSection';
import OutcomesSection from './OutcomesSection';
import ClosingVisionSection from './ClosingVisionSection';

interface AnchorProgramsSectionProps {
  onContact?: () => void;
}

const AnchorProgramsSection = ({ onContact }: AnchorProgramsSectionProps) => {
  return (
    <section className="relative px-4 py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl">
        {/* Section 1: Main Header */}
        <AnchorProgramsHeader />
        
        {/* Section 2: Career Tracks */}
        <CareerTracksSection />
        
        {/* Section 3: CIIED Philosophy */}
        <CIIEDPhilosophy />
        
        {/* Section 4: Program Portfolio Overview */}
        <ProgramPortfolioOverview />
        
        {/* Section 5: Course Structure Accordion */}
        <CourseStructureAccordion />
        
        {/* Section 6: Target Audience */}
        <TargetAudienceSection />
        
        {/* Section 7: Outcomes */}
        <OutcomesSection />
        
        {/* Section 8: Closing Vision */}
        <ClosingVisionSection onContact={onContact} />
      </div>
    </section>
  );
};

export default AnchorProgramsSection;
