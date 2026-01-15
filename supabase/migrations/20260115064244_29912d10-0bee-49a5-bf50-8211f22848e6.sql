-- Create storage bucket for certificate PDFs (private bucket)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certificates',
  'certificates',
  false,
  5242880, -- 5MB limit
  ARRAY['application/pdf']
);

-- Users can view/download their own certificates
CREATE POLICY "Users can view their own certificates"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'certificates' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Only service role can upload certificates (via edge functions)
-- No INSERT policy for authenticated users - certificates are generated server-side

-- Users can delete their own certificates (optional, for cleanup)
CREATE POLICY "Users can delete their own certificates"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'certificates' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);