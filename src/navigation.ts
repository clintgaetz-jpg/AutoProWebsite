import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Services',
      links: [
        // Column 1
        { text: 'Oil Change', href: getPermalink('/services/oil-change') },
        { text: 'Brakes', href: getPermalink('/services/brake-repair') },
        { text: 'Tires & Alignment', href: getPermalink('/services/tires') },
        { text: 'Shop Tires', href: getPermalink('/services/tire-pricing') },
        { text: 'Alignment', href: getPermalink('/services/alignment') },
        { text: 'A/C Service', href: getPermalink('/services/ac-service-repair') },
        { text: 'Fluid Services', href: getPermalink('/services/fluid-maintenance') },
        { text: 'Check Engine Light', href: getPermalink('/services/diagnostics') },
        { text: 'Electrical', href: getPermalink('/services/electrical') },
        // Column 2
        { text: 'Steering & Suspension', href: getPermalink('/services/steering-suspension') },
        { text: 'Transmission', href: getPermalink('/services/transmission-repair') },
        { text: 'Engine', href: getPermalink('/services/engine-repair') },
        { text: 'Exhaust', href: getPermalink('/services/exhaust-system') },
        { text: 'Diesel', href: getPermalink('/services/diesel') },
        { text: 'Hybrid & EV', href: getPermalink('/services/hybrid-ev-service') },
        { text: 'Automotive Keys', href: getPermalink('/services/automotive-keys') },
      ],
    },
    {
      text: 'Inspections',
      links: [
        { text: 'Complete Vehicle Inspection', href: getPermalink('/services/vehicle-inspection') },
        { text: 'Out of Province', href: getPermalink('/services/out-of-province-inspection') },
        { text: 'Commercial (CVIP)', href: getPermalink('/services/cvip-inspection') },
        { text: 'Insurance', href: getPermalink('/services/insurance-inspection') },
        { text: 'Pre-Purchase', href: getPermalink('/services/pre-purchase-inspection') },
        { text: 'Brake Inspection', href: getPermalink('/services/brake-inspection') },
      ],
    },
    {
      text: 'About',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Team', href: getPermalink('/team') },
        { text: 'Making It Easy', href: getPermalink('/making-it-easy') },
        { text: 'Reviews', href: getPermalink('/reviews') },
        { text: 'Warranty', href: getPermalink('/warranty') },
        { text: 'Credentials & Licensing', href: getPermalink('/credentials-and-licensing') },
        { text: 'Areas We Serve', href: getPermalink('/locations') },
      ],
    },
    {
      text: 'Shop Tires',
      href: getPermalink('/services/tire-pricing'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  // Mobile-only link
  mobileOnlyLinks: [
    { text: "I'm Broken Down", href: getPermalink('/breakdown'), icon: 'tabler:alert-triangle' },
  ],
  actions: [{ text: 'Book Now', href: 'https://sylvanlakeautopro.autotext.me/Admin/kioskv2/index.php?id=WTNHaFJhb1g1dk9YV3g1YmpkUEx3QT09&kiosk=1', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Oil Change', href: getPermalink('/services/oil-change') },
        { text: 'Brakes', href: getPermalink('/services/brake-repair') },
        { text: 'Tires & Alignment', href: getPermalink('/services/tires') },
        { text: 'Shop Tires', href: getPermalink('/services/tire-pricing') },
        { text: 'A/C Service', href: getPermalink('/services/ac-service-repair') },
        { text: 'Steering & Suspension', href: getPermalink('/services/steering-suspension') },
        { text: 'Transmission', href: getPermalink('/services/transmission-repair') },
        { text: 'Engine Repair', href: getPermalink('/services/engine-repair') },
        { text: 'Diesel', href: getPermalink('/services/diesel') },
      ],
    },
    {
      title: 'Inspections',
      links: [
        { text: 'Complete Vehicle Inspection', href: getPermalink('/services/vehicle-inspection') },
        { text: 'Out of Province', href: getPermalink('/services/out-of-province-inspection') },
        { text: 'Commercial (CVIP)', href: getPermalink('/services/cvip-inspection') },
        { text: 'Pre-Purchase', href: getPermalink('/services/pre-purchase-inspection') },
        { text: 'Insurance', href: getPermalink('/services/insurance-inspection') },
        { text: 'Brake Inspection', href: getPermalink('/services/brake-inspection') },
      ],
    },
    {
      title: 'More Services',
      links: [
        { text: 'Fluid Services', href: getPermalink('/services/fluid-maintenance') },
        { text: 'Check Engine Light', href: getPermalink('/services/diagnostics') },
        { text: 'Electrical', href: getPermalink('/services/electrical') },
        { text: 'Hybrid & EV', href: getPermalink('/services/hybrid-ev-service') },
        { text: 'Driveline', href: getPermalink('/services/driveline') },
        { text: 'Heater Repair', href: getPermalink('/services/heater-repair') },
        { text: 'Exhaust System', href: getPermalink('/services/exhaust-system') },
        { text: 'Automotive Keys', href: getPermalink('/services/automotive-keys') },
        { text: 'Fleet Services', href: getPermalink('/services/fleet-services') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Team', href: getPermalink('/team') },
        { text: 'Making It Easy', href: getPermalink('/making-it-easy') },
        { text: 'Reviews', href: getPermalink('/reviews') },
        { text: 'Warranty', href: getPermalink('/warranty') },
        { text: 'Credentials & Licensing', href: getPermalink('/credentials-and-licensing') },
        { text: 'Areas We Serve', href: getPermalink('/locations') },
        { text: 'Broken Down?', href: getPermalink('/breakdown') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/SylvanLakeAutopro/' },
    { ariaLabel: 'Google', icon: 'tabler:brand-google', href: 'https://g.page/sylvan-lake-autopro' },
  ],
  footNote: `
    <span class="text-sm">© ${new Date().getFullYear()} Sylvan Lake AUTOPRO. All rights reserved.</span><br/>
    <span class="text-xs text-gray-500">1A Industrial Dr, Sylvan Lake, AB T4S 1P4 · (403) 887-0440</span>
  `,
};
