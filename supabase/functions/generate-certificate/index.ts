import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, rgb, StandardFonts } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CertificateRequest {
  course_id: string;
}

function generateCertificateNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CERT-${timestamp}-${random}`;
}

async function generateCertificatePDF(
  studentName: string,
  courseName: string,
  certificateNumber: string,
  issueDate: string
): Promise<Uint8Array> {
  // Create a new PDF document (landscape A4)
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]); // A4 landscape

  // Embed fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const { width, height } = page.getSize();

  // Colors
  const primaryColor = rgb(0.15, 0.25, 0.45); // Dark blue
  const accentColor = rgb(0.8, 0.6, 0.2); // Gold
  const textColor = rgb(0.2, 0.2, 0.2);

  // Draw decorative border
  const borderWidth = 3;
  const margin = 40;
  page.drawRectangle({
    x: margin,
    y: margin,
    width: width - 2 * margin,
    height: height - 2 * margin,
    borderColor: accentColor,
    borderWidth: borderWidth,
  });

  // Inner border
  page.drawRectangle({
    x: margin + 10,
    y: margin + 10,
    width: width - 2 * (margin + 10),
    height: height - 2 * (margin + 10),
    borderColor: primaryColor,
    borderWidth: 1,
  });

  // Title: "Certificate of Completion"
  const title = "Certificate of Completion";
  const titleSize = 36;
  const titleWidth = helveticaBold.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (width - titleWidth) / 2,
    y: height - 120,
    size: titleSize,
    font: helveticaBold,
    color: primaryColor,
  });

  // Decorative line under title
  page.drawLine({
    start: { x: width / 2 - 150, y: height - 135 },
    end: { x: width / 2 + 150, y: height - 135 },
    thickness: 2,
    color: accentColor,
  });

  // "This is to certify that"
  const certifyText = "This is to certify that";
  const certifySize = 14;
  const certifyWidth = timesRomanItalic.widthOfTextAtSize(certifyText, certifySize);
  page.drawText(certifyText, {
    x: (width - certifyWidth) / 2,
    y: height - 190,
    size: certifySize,
    font: timesRomanItalic,
    color: textColor,
  });

  // Student name
  const nameSize = 32;
  const nameWidth = helveticaBold.widthOfTextAtSize(studentName, nameSize);
  page.drawText(studentName, {
    x: (width - nameWidth) / 2,
    y: height - 240,
    size: nameSize,
    font: helveticaBold,
    color: primaryColor,
  });

  // Decorative line under name
  page.drawLine({
    start: { x: width / 2 - 180, y: height - 255 },
    end: { x: width / 2 + 180, y: height - 255 },
    thickness: 1,
    color: accentColor,
  });

  // "has successfully completed the course"
  const completedText = "has successfully completed the course";
  const completedSize = 14;
  const completedWidth = timesRomanItalic.widthOfTextAtSize(completedText, completedSize);
  page.drawText(completedText, {
    x: (width - completedWidth) / 2,
    y: height - 300,
    size: completedSize,
    font: timesRomanItalic,
    color: textColor,
  });

  // Course name
  const courseSize = 24;
  const courseWidth = helveticaBold.widthOfTextAtSize(courseName, courseSize);
  page.drawText(courseName, {
    x: (width - courseWidth) / 2,
    y: height - 340,
    size: courseSize,
    font: helveticaBold,
    color: primaryColor,
  });

  // Issue date
  const dateText = `Issued on ${issueDate}`;
  const dateSize = 12;
  const dateWidth = helvetica.widthOfTextAtSize(dateText, dateSize);
  page.drawText(dateText, {
    x: (width - dateWidth) / 2,
    y: height - 400,
    size: dateSize,
    font: helvetica,
    color: textColor,
  });

  // Certificate number
  const certNumText = `Certificate No: ${certificateNumber}`;
  const certNumSize = 10;
  const certNumWidth = helvetica.widthOfTextAtSize(certNumText, certNumSize);
  page.drawText(certNumText, {
    x: (width - certNumWidth) / 2,
    y: margin + 30,
    size: certNumSize,
    font: helvetica,
    color: textColor,
  });

  // Signature line (left)
  page.drawLine({
    start: { x: 150, y: height - 470 },
    end: { x: 300, y: height - 470 },
    thickness: 1,
    color: textColor,
  });
  const instructorText = "Instructor";
  const instructorWidth = helvetica.widthOfTextAtSize(instructorText, 10);
  page.drawText(instructorText, {
    x: 150 + (150 - instructorWidth) / 2,
    y: height - 485,
    size: 10,
    font: helvetica,
    color: textColor,
  });

  // Signature line (right)
  page.drawLine({
    start: { x: width - 300, y: height - 470 },
    end: { x: width - 150, y: height - 470 },
    thickness: 1,
    color: textColor,
  });
  const dateLabel = "Date";
  const dateLabelWidth = helvetica.widthOfTextAtSize(dateLabel, 10);
  page.drawText(dateLabel, {
    x: width - 300 + (150 - dateLabelWidth) / 2,
    y: height - 485,
    size: 10,
    font: helvetica,
    color: textColor,
  });

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Generate certificate request received");

    // Validate authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with user's auth
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      console.error("Token verification failed:", claimsError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub as string;
    console.log("Authenticated user:", userId);

    // Parse request body
    const body: CertificateRequest = await req.json();
    const { course_id } = body;

    if (!course_id) {
      return new Response(
        JSON.stringify({ error: "course_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Generating certificate for course:", course_id);

    // Check if user has completed the course
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("id, status, completed_at")
      .eq("user_id", userId)
      .eq("course_id", course_id)
      .single();

    if (enrollmentError || !enrollment) {
      console.error("Enrollment not found:", enrollmentError);
      return new Response(
        JSON.stringify({ error: "You are not enrolled in this course" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (enrollment.status !== "completed" && !enrollment.completed_at) {
      console.error("Course not completed. Status:", enrollment.status);
      return new Response(
        JSON.stringify({ error: "You must complete the course before receiving a certificate" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if certificate already exists
    const { data: existingCert } = await supabase
      .from("certificates")
      .select("id, certificate_number, pdf_url")
      .eq("user_id", userId)
      .eq("course_id", course_id)
      .single();

    if (existingCert) {
      console.log("Certificate already exists:", existingCert.certificate_number);
      return new Response(
        JSON.stringify({
          message: "Certificate already exists",
          certificate: existingCert,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Profile not found:", profileError);
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("title")
      .eq("id", course_id)
      .single();

    if (courseError || !course) {
      console.error("Course not found:", courseError);
      return new Response(
        JSON.stringify({ error: "Course not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate certificate
    const certificateNumber = generateCertificateNumber();
    const issueDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const studentName = profile.full_name || profile.email.split("@")[0];

    console.log("Generating PDF for:", studentName, "Course:", course.title);

    // Generate PDF
    const pdfBytes = await generateCertificatePDF(
      studentName,
      course.title,
      certificateNumber,
      issueDate
    );

    // Use service role client for storage upload (bypasses RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Upload to storage
    const fileName = `${userId}/${certificateNumber}.pdf`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("certificates")
      .upload(fileName, pdfBytes, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload failed:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload certificate PDF" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get signed URL for the certificate (valid for 1 year)
    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
      .from("certificates")
      .createSignedUrl(fileName, 60 * 60 * 24 * 365);

    if (signedUrlError) {
      console.error("Failed to create signed URL:", signedUrlError);
    }

    const pdfUrl = signedUrlData?.signedUrl || null;

    // Create certificate record using service role (to bypass RLS for insert)
    const { data: certificate, error: certError } = await supabaseAdmin
      .from("certificates")
      .insert({
        user_id: userId,
        course_id: course_id,
        certificate_number: certificateNumber,
        pdf_url: pdfUrl,
      })
      .select()
      .single();

    if (certError) {
      console.error("Failed to create certificate record:", certError);
      // Try to clean up the uploaded file
      await supabaseAdmin.storage.from("certificates").remove([fileName]);
      return new Response(
        JSON.stringify({ error: "Failed to create certificate record" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Certificate generated successfully:", certificateNumber);

    return new Response(
      JSON.stringify({
        message: "Certificate generated successfully",
        certificate: {
          id: certificate.id,
          certificate_number: certificateNumber,
          pdf_url: pdfUrl,
          issued_at: certificate.issued_at,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
