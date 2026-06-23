/**
 * ─────────────────────────────────────────────────────────────
 *  CLINIC CONFIGURATION — edit ONLY this file to brand the site
 *  for a new dentist. Every string, stat, and piece of copy
 *  on the site is driven from this single source of truth.
 * ─────────────────────────────────────────────────────────────
 */

export const clinic = {

  /* ── 1. BRAND / IDENTITY ── */
  name: 'AquaSmile Dental Clinic',
  tagline: 'Painless dental care you can trust',
  area: 'Andheri West',
  city: 'Mumbai',

  /** <title> tag — shown in browser tab & Google search */
  title: 'Painless Dental Care in Andheri West | AquaSmile Clinic',
  /** Meta description — shown in Google search snippet (≤ 155 chars) */
  description:
    `We're a small, friendly dental clinic in Andheri West serving families in Mumbai for 15+ years. No high-pressure sales, just honest care and fast WhatsApp booking.`,

  /* ── 2. CONTACT ── */
  phoneDisplay: '+91 98XXX XXXXX',
  phoneTel: 'tel:+9198XXXXXXXXX',
  whatsappNumber: '9198XXXXXXXXX',   // digits only, no + or spaces
  email: 'hello@aquasmile.example',
  address: '2nd Floor, Aqua Arcade, Link Road, Andheri West, Mumbai, Maharashtra 400053',
  googleMapsQuery: 'AquaSmile Dental Clinic Andheri West Mumbai',
  googleSheetsScriptUrl: 'https://script.google.com/macros/s/AKfycbw06yEAewqv5gJbUoS3-Ao7Yg4WlYGBUGcOdsBHXtNKJBIHLh0qv9jzTpuc54wZy7WMyQ/exec', // Add Google Sheets Apps Script Web App URL here to save appointment data

  /** Instagram, Facebook profile URLs */
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',

  /* ── 3. HOURS ── */
  openHours: ['Mon – Sun', '9:30 AM – 8:30 PM'],
  openDaysNote: 'Open all days — including weekends',

  /* ── 4. STATS (shown in Hero, About) ── */
  yearsInPractice: '15+',            // e.g. '10+', '20'
  patientsServed: '8,000+',         // e.g. '5,000+', '12,000+'
  googleRating: '4.9',              // e.g. '4.8', '5.0'
  googleReviewCount: '340+',        // e.g. '200+ Google reviews'
  priceRange: '₹₹',                 // ₹ = budget, ₹₹ = mid, ₹₹₹ = premium

  /* ── 5. DOCTOR ── */
  doctorName: 'Dr. Ayesha Khan',
  doctorQualifications: 'BDS, MDS (Prosthodontics)',
  doctorGender: 'she' as 'he' | 'she' | 'they',  // used in bio copy
  registrationLine: 'Maharashtra Dental Council · Reg. A-12345',

  /**
   * Short story shown in the About section.
   * Keep it 2 sentences max. Reads in the voice of the clinic.
   */
  doctorOriginStory:
    `After years in corporate hospitals, she wanted a place where dentistry is truly about listening — no upselling, no unnecessary treatments, just honest care. That's {name}.`,

  /**
   * Second paragraph in About — what makes this doctor different.
   */
  doctorApproach:
    `Most people fear the dentist because of bad experiences elsewhere. {doctorName} explains everything before treating anything — so you always know what's happening and why.`,

  /**
   * Short "In Practice" line shown on the credential card.
   * e.g. "General & cosmetic care. Strong referral base from GPs."
   */
  practiceNote: 'General, cosmetic & pediatric care. Many referrals from other doctors.',

  /* ── 6. TRUST BULLETS (About section) ── */
  trustBullets: [
    { bold: 'No upselling.', rest: 'We only recommend what you actually need.' },
    { bold: 'Strict sterilisation.', rest: 'Autoclave-verified, new gloves every patient.' },
    { bold: 'Family-friendly.', rest: 'Great with nervous adults and children alike.' },
    { bold: 'Transparent pricing.', rest: 'Quote upfront. UPI, cards, or cash accepted.' },
  ],

  /* ── 7. SERVICES ── */
  services: [
    {
      name: 'Checkup & Cleaning',
      description: `Quick, painless routine care. We'll spot problems early.`,
      icon: 'magnifying-glass',
    },
    {
      name: 'Tooth Fillings',
      description: 'Fix cavities with natural-looking materials. Same-day in most cases.',
      icon: 'wrench',
    },
    {
      name: 'Root Canal',
      description: 'Yes, we do these. Much less painful than the reputation suggests.',
      icon: 'beaker',
    },
    {
      name: 'Teeth Whitening',
      description: 'Brighten your smile in an hour. Results last months.',
      icon: 'sparkles',
    },
    {
      name: 'Braces & Aligners',
      description: 'Straight teeth are possible. Ceramic braces or invisible aligners.',
      icon: 'adjustments',
    },
    {
      name: 'Dental Implants',
      description: 'Replace missing teeth properly. Feels and works like real teeth.',
      icon: 'bolt',
    },
    {
      name: 'Crowns & Bridges',
      description: 'Restore damaged or broken teeth back to function.',
      icon: 'trophy',
    },
    {
      name: 'Pediatric Care',
      description: `Kids don't fear the dentist here. We make it comfortable.`,
      icon: 'face-smile',
    },
  ],

  /* ── 8. WHY CHOOSE US — highlights ── */
  highlights: [
    {
      title: 'We Actually Listen',
      description: `We explain what's wrong and what your options are. No surprises.`,
      icon: 'chat-bubble',
    },
    {
      title: 'Fair Pricing',
      description: 'Quote upfront. Accept UPI, cards, or cash. No hidden charges.',
      icon: 'tag',
    },
    {
      title: 'Strict Sterilisation',
      description: 'We sterilise everything. Autoclave-verified. New gloves every patient.',
      icon: 'shield-check',
    },
    {
      title: 'Book On Your Time',
      description: `Message us on WhatsApp or call. We'll fit you in fast.`,
      icon: 'device-phone',
    },
  ],

  /* ── 9. TESTIMONIALS ── */
  testimonials: [
    {
      name: 'Priya S. · Andheri',
      rating: 5,
      quote: `Finally a dentist who doesn't make you feel rushed. Got a filling done and it looks perfect. Booked on WhatsApp, too—so easy.`,
    },
    {
      name: 'Rahul M. · Andheri West',
      rating: 5,
      quote: 'Dreaded this root canal, but Dr. Khan made it painless. They explained everything step-by-step. Worth every rupee.',
    },
    {
      name: 'Sneha P. · Lokhandwala',
      rating: 5,
      quote: 'My 7-year-old used to cry at the dentist. Now he says this is his favourite clinic. That says everything.',
    },
  ],
};

/* ─── Navigation (labels only — hrefs are anchor links, don't change) ─── */
export const navigationLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'Contact',  href: '#contact' },
];

/* ─── Social links (driven from clinic config above) ─── */
export const socialLinks = [
  { label: 'Instagram', href: clinic.instagramUrl, icon: 'instagram' },
  { label: 'Facebook',  href: clinic.facebookUrl,  icon: 'facebook' },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to book an appointment.")}`,
    icon: 'whatsapp',
  },
];

/* ─── Helper ─── */
export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
