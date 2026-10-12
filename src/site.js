// Everything a new client changes lives here: name, contact, menu, sample schedule.
// Colors live at the top of styles.css.

export const SITE = {
  name: 'Flip Side',
  fullName: 'Flip Side Burgers',
  city: '[Your City]',
  email: '[hello@yourtruck.com]',
  phone: '[(555) 555-0123]',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'TikTok', href: '#' },
  ],
  replyTime: '[2 business days]',
  cateringMin: '[Minimum guest count]',
  cateringRadius: 'Within [25] miles of [Your City]',
};

export const MENU = {
  burgers: [
    { name: 'The Classic', desc: 'Single smash patty, American cheese, pickles, onion, house sauce.', price: '[PRICE]' },
    { name: 'The Double', desc: 'Two patties, double cheese, grilled onions, house sauce.', price: '[PRICE]' },
    { name: 'Veggie Smash', desc: 'Crispy black-bean patty, cheddar, lettuce, tomato.', price: '[PRICE]' },
  ],
  fries: [
    { name: 'Fresh-cut fries', desc: 'Skin-on, seasoned with our house salt.', price: '[PRICE]' },
    { name: 'Cheese fries', desc: 'Fries under melted cheese and grilled onions.', price: '[PRICE]' },
    { name: 'Sauces', desc: 'House sauce, garlic mayo, spicy ketchup.', price: '[PRICE]' },
  ],
  combo: 'Make it a combo: any burger + fries + a drink, [PRICE]',
  note: 'Gluten-free bun and lettuce wrap on request.',
};

export const CREW = [
  { name: '[Owner name]', role: 'Owner · on the flat-top', bio: '[A line or two about them.]', color: 'var(--amber)' },
  { name: '[Partner name]', role: 'Owner · at the window', bio: '[A line or two about them.]', color: 'var(--teal)' },
];

/**
 * Sample stops, used until VITE_GCAL_ID / VITE_GCAL_KEY are set (see calendar.js).
 * `in` is days from today, so the demo never looks empty.
 */
export const SAMPLE_STOPS = [
  { in: 0, title: 'Lunch downtown', start: '11:00', end: '14:00', place: '[Main St & 1st Ave]' },
  { in: 2, title: 'Taproom night', start: '17:00', end: '21:00', place: '[Local Brewing Co.]' },
  { in: 4, title: 'Saturday farmers market', start: '08:00', end: '13:00', place: '[City Park]' },
  { in: 8, title: 'Office park lunch', start: '11:00', end: '14:00', place: '[Business Center]' },
  { in: 11, title: 'Friday art walk', start: '18:00', end: '22:00', place: '[Arts District]' },
  { in: 16, title: 'Football Friday', start: '18:00', end: '22:00', place: '[High School Stadium]' },
  { in: 25, title: 'Night market', start: '17:00', end: '22:00', place: '[Town Square]' },
];
