import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Clock, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    subtitle: string;
    fee: string;
    duration: string;
    startDate: string;
    hasImmersion?: boolean;
    immersionFee?: string;
  };
  onEnroll: (packageType: 'online' | 'immersion', fee: string) => Promise<{ success: boolean; error?: string }>;
  isEnrolling: boolean;
}

export const EnrollmentModal = ({
  isOpen,
  onClose,
  course,
  onEnroll,
  isEnrolling,
}: EnrollmentModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<'online' | 'immersion'>('online');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleEnroll = async () => {
    if (!acceptedTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms and conditions to continue.',
        variant: 'destructive',
      });
      return;
    }

    const fee = selectedPackage === 'immersion' && course.immersionFee 
      ? course.immersionFee 
      : course.fee;

    const result = await onEnroll(selectedPackage, fee);

    if (result.success) {
      onClose();
      navigate('/dashboard');
    } else {
      toast({
        title: 'Enrollment Failed',
        description: result.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const isFree = course.fee === 'Free' || course.fee === '₹0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Enroll in Course
          </DialogTitle>
          <DialogDescription>
            Complete your enrollment for {course.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Course Summary */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{course.subtitle}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {course.startDate}
              </div>
            </div>
          </div>

          {/* Package Selection (if immersion available) */}
          {course.hasImmersion && course.immersionFee && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Select Package</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedPackage('online')}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    selectedPackage === 'online'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-medium text-foreground text-sm">Online</p>
                  <p className="text-lg font-bold text-primary">{course.fee}</p>
                </button>
                <button
                  onClick={() => setSelectedPackage('immersion')}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    selectedPackage === 'immersion'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-medium text-foreground text-sm">Immersion</p>
                  <p className="text-lg font-bold text-primary">{course.immersionFee}</p>
                </button>
              </div>
            </div>
          )}

          {/* Price Display (if no package selection) */}
          {!course.hasImmersion && (
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm text-muted-foreground">Course Fee</span>
              <span className="text-2xl font-bold text-foreground">{course.fee}</span>
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              I agree to the terms and conditions and understand the enrollment process.
              {!isFree && ' Payment details will be shared separately.'}
            </label>
          </div>

          {/* Enroll Button */}
          <Button
            className="w-full"
            size="lg"
            variant="glow"
            onClick={handleEnroll}
            disabled={!acceptedTerms || isEnrolling}
          >
            {isEnrolling ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enrolling...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                {isFree ? 'Enroll for Free' : 'Confirm Enrollment'}
              </>
            )}
          </Button>

          {!isFree && (
            <p className="text-xs text-center text-muted-foreground">
              Payment instructions will be sent to your email after enrollment.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
