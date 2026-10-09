import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

// Smart Fallback Diagnosis generator when API quota is exhausted or key is missing
function generateSmartDiagnosis(query: string) {
  const q = query.toLowerCase();
  
  if (q.includes('ac') || q.includes('air conditioner') || q.includes('cooling') || q.includes('gas') || q.includes('leak') && q.includes('water') && (q.includes('indoor') || q.includes('unit'))) {
    return {
      category: 'AC & Appliance Repair',
      serviceId: 'ac-repair',
      serviceTitle: 'Split AC Deep Clean & Jet Servicing',
      issueDetected: 'Clogged condensate drain line & evaporator coil dust buildup',
      urgency: 'Medium - Book within 24 hours to prevent wall dampness',
      estimatedPrice: '₹499 - ₹799',
      estimatedDuration: '45 - 60 mins',
      recommendedPackage: 'AC Foam Jet Servicing + Gas Pressure Check',
      proSkillRequired: 'Certified HVAC & Refrigeration Technician',
      guarantee: '30-Day Service Guarantee with Re-work Warranty',
      steps: [
        'High-pressure water jet cleaning of indoor cooling coils',
        'Unclogging and sanitization of water drainage pipe',
        'Refrigerant gas pressure & current draw diagnostic',
        'Disinfection of filter mesh and blower fan'
      ]
    };
  }

  if (q.includes('leak') || q.includes('pipe') || q.includes('tap') || q.includes('flush') || q.includes('plumb') || q.includes('drain') || q.includes('choke')) {
    return {
      category: 'Electrician & Plumber',
      serviceId: 'plumber-repair',
      serviceTitle: 'Plumbing Leakage & Pipe Repair Service',
      issueDetected: 'Loose joint seal, valve cartridge wear, or waste pipe obstruction',
      urgency: 'High - Immediate repair advised to avoid floor damage',
      estimatedPrice: '₹249 - ₹499',
      estimatedDuration: '30 - 45 mins',
      recommendedPackage: 'Pipe Leakage Repair & Seal Replacement',
      proSkillRequired: 'Licensed Doorstep Plumber',
      guarantee: '30-Day Leak-Proof Guarantee',
      steps: [
        'Isolate water line and pressure test the affected fitting',
        'Replace degraded Teflon tape, washers, or connector hoses',
        'Clear minor sediment debris in traps and drain lines',
        'Verify zero seepage under operating water pressure'
      ]
    };
  }

  if (q.includes('spark') || q.includes('trip') || q.includes('mcb') || q.includes('electric') || q.includes('switch') || q.includes('wire') || q.includes('shock')) {
    return {
      category: 'Electrician & Plumber',
      serviceId: 'electrician-repair',
      serviceTitle: 'Electrical Inspection & Short Circuit Diagnostic',
      issueDetected: 'Phase overload, corroded switchboard terminal, or tripping MCB',
      urgency: 'Urgent - Safety hazard, resolve promptly',
      estimatedPrice: '₹199 - ₹449',
      estimatedDuration: '30 - 50 mins',
      recommendedPackage: 'MCB & Switchboard Safety Overhaul',
      proSkillRequired: 'Certified High-Voltage & Residential Electrician',
      guarantee: '30-Day Safety Assurance Guarantee',
      steps: [
        'Multimeter resistance & voltage line testing',
        'Tightening loose terminal lugs and replacing blown switches',
        'Load balancing check across active circuit breakers',
        'Insulation test to confirm zero ground leakage'
      ]
    };
  }

  if (q.includes('clean') || q.includes('dust') || q.includes('sofa') || q.includes('bathroom') || q.includes('kitchen') || q.includes('stain')) {
    return {
      category: 'Home Deep Cleaning',
      serviceId: 'deep-clean',
      serviceTitle: 'Intense Home Deep Cleaning & Sanitization',
      issueDetected: 'Hard water scale, grout discoloration, and deep fabric dust accumulation',
      urgency: 'Standard - Convenient weekend or same-day slot',
      estimatedPrice: '₹1,299 - ₹2,499',
      estimatedDuration: '2 - 3.5 hours',
      recommendedPackage: 'Full Bathroom & Kitchen Degreasing Deep Clean',
      proSkillRequired: 'Trained Cleaning Crew with Hospital-Grade Disinfectants',
      guarantee: '100% Inspection Satisfaction or Instant Re-clean',
      steps: [
        'Industrial machine buffing of bathroom tiles and chrome fixtures',
        'Eco-friendly kitchen chimney and tile degreasing',
        'High-suction HEPA vacuuming and sanitization',
        'Walkthrough inspection with home owner before handover'
      ]
    };
  }

  if (q.includes('cockroach') || q.includes('pest') || q.includes('termite') || q.includes('bedbug') || q.includes('ant') || q.includes('bug')) {
    return {
      category: 'Pest Control',
      serviceId: 'pest-control',
      serviceTitle: 'Advanced Herbal Pest Eradication',
      issueDetected: 'Insect harborage in wall cracks, kitchen cabinets, and drains',
      urgency: 'Medium - Book within 48 hours to stop breeding cycles',
      estimatedPrice: '₹799 - ₹1,499',
      estimatedDuration: '45 - 60 mins',
      recommendedPackage: 'Herbal Gel Baiting & Odorless Spray Treatment',
      proSkillRequired: 'Government Certified Pest Management Professional',
      guarantee: '60-Day Pest-Free Warranty with Free Booster',
      steps: [
        'Inspection of infestation hotspots behind appliances',
        'Application of child-safe, pet-friendly herbal gel dots',
        'Odorless barrier spray along skirting and drainage traps',
        'Preventative tips and moisture reduction guidance'
      ]
    };
  }

  // Default diagnosis
  return {
    category: 'Carpentry & Handyman',
    serviceId: 'general-repair',
    serviceTitle: 'Comprehensive Home Inspection & Handyman Diagnostic',
    issueDetected: `Assessment of: "${query.slice(0, 60)}"`,
    urgency: 'Medium - Flexible slot available within 15 mins',
    estimatedPrice: '₹299 - ₹599',
    estimatedDuration: '45 mins',
    recommendedPackage: 'Multi-Task Handyman Diagnostic Visit',
    proSkillRequired: 'Multi-Skilled Background-Verified Technician',
    guarantee: '30-Day Service Guarantee',
    steps: [
      'Comprehensive on-site physical inspection by verified technician',
      'Exact upfront quote before starting any work',
      'Execution with genuine replacement parts and standard tools',
      'Post-repair cleanup and safety verification'
    ]
  };
}

// AI Diagnostic API endpoint
app.post('/api/diagnose', async (req, res) => {
  try {
    const { problemDescription } = req.body;
    if (!problemDescription || typeof problemDescription !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid problem description.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Return smart heuristic diagnosis immediately
      const fallback = generateSmartDiagnosis(problemDescription);
      return res.json({ diagnosis: fallback, source: 'smart-heuristic' });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the master technical diagnostic AI for "Service Assist", an on-demand home services platform.
Analyze this user home problem report: "${problemDescription}".
Diagnose what is broken, provide practical insights, cost estimation in INR (₹), and return STRICTLY a JSON object with this exact shape:
{
  "category": "one of: AC & Appliance Repair | Home Deep Cleaning | Electrician & Plumber | Carpentry & Handyman | Pest Control | Painting & Waterproofing | Water Purifier (RO) | Salon & Spa at Home",
  "serviceId": "short-slug",
  "serviceTitle": "Accurate service name",
  "issueDetected": "Concise 1-sentence technical diagnosis of the root cause",
  "urgency": "Urgent | High | Medium | Standard with brief reasoning",
  "estimatedPrice": "₹XXX - ₹YYY",
  "estimatedDuration": "XX mins or X hours",
  "recommendedPackage": "Exact package title recommended",
  "proSkillRequired": "Skill of professional to dispatch",
  "guarantee": "30-Day Service Guarantee",
  "steps": [
    "Step 1 pro will perform",
    "Step 2 pro will perform",
    "Step 3 pro will perform",
    "Step 4 pro will perform"
  ]
}
Return only JSON without markdown fences.`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const responseText = aiResponse.text?.trim() || '';
      try {
        const parsed = JSON.parse(responseText);
        return res.json({ diagnosis: parsed, source: 'gemini' });
      } catch (parseError) {
        // Fallback if JSON parse failed
        const fallback = generateSmartDiagnosis(problemDescription);
        return res.json({ diagnosis: fallback, source: 'smart-heuristic' });
      }
    } catch (geminiError: any) {
      console.warn('Gemini API call failed, using smart diagnosis:', geminiError?.message || geminiError);
      const fallback = generateSmartDiagnosis(problemDescription);
      return res.json({ diagnosis: fallback, source: 'smart-heuristic' });
    }
  } catch (error: any) {
    console.error('Diagnostic error:', error);
    res.status(500).json({ error: 'Failed to process diagnosis' });
  }
});

// User Auth endpoints
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  res.json({ success: true, message: `OTP sent to +91 ${phone}`, demoOtp: '1234' });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp, name } = req.body;
  res.json({
    success: true,
    user: {
      phone,
      name: name || 'Homeowner',
      isLoggedIn: true,
    },
  });
});

// Mock Booking/Order submission endpoint
app.post('/api/bookings', (req, res) => {
  const { service, customer, address, slot, paymentMethod, total } = req.body;
  const bookingId = 'SA-' + Math.floor(100000 + Math.random() * 900000);
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  res.json({
    success: true,
    bookingId,
    otp,
    etaMinutes: 14,
    pro: {
      name: 'Ramesh Kumar',
      rating: 4.92,
      jobsCompleted: 1420,
      phone: '+91 98765 43210',
      badge: 'Platinum Verified Pro',
      vaccinationStatus: 'Verified Vaccinated & Police Cleared'
    },
    message: 'Technician dispatched! Share the 4-digit OTP only when work begins.'
  });
});

// Partner recruitment lead submission
app.post('/api/partners/apply', (req, res) => {
  const { name, phone, city, skill, experience } = req.body;
  res.json({
    success: true,
    message: `Thank you ${name || 'Partner'}! Our Pro Onboarding Team in ${city || 'your city'} will call you within 2 hours for document verification.`
  });
});

// Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  function listen(p: number) {
    const server = app.listen(p, '0.0.0.0', () => {
      console.log(`Service Assist running on http://localhost:${p}`);
    });
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${p} is already in use, trying port ${p + 1}...`);
        listen(p + 1);
      } else {
        console.error(err);
      }
    });
  }

  listen(port);
}

startServer();
