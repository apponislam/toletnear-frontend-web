export type Property = {
  id: string
  title: string
  location: string
  city: string
  area: string
  rent: number
  beds: number
  baths: number
  sqft: number
  type: string
  verified: boolean
  image: string
  images: string[]
  amenities: string[]
  available: string
  furnished: string
  floor: number
  description: string
  owner: { name: string; phone: string; image: string; verified: boolean; role: string }
}

const LR1 = 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&h=500&fit=crop&auto=format'
const LR2 = 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=800&h=500&fit=crop&auto=format'
const LR3 = 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=500&fit=crop&auto=format'
const LR4 = 'https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?w=800&h=500&fit=crop&auto=format'
const LR5 = 'https://images.unsplash.com/photo-1630699144035-c0f6311ec482?w=800&h=500&fit=crop&auto=format'
const LR6 = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=500&fit=crop&auto=format'
const BD1 = 'https://images.unsplash.com/photo-1776348065068-476a708a2d3a?w=800&h=500&fit=crop&auto=format'
const BD2 = 'https://images.unsplash.com/photo-1662454419716-c4c504728811?w=800&h=500&fit=crop&auto=format'

export const properties: Property[] = [
  {
    id: '1', title: 'Modern 3 Bedroom Apartment in Mirpur DOHS',
    location: 'Mirpur DOHS, Dhaka', city: 'Dhaka', area: 'Mirpur',
    rent: 25000, beds: 3, baths: 2, sqft: 1350, type: 'Apartment', verified: true,
    image: LR1, images: [LR1, LR2, BD1],
    amenities: ['Generator', 'Lift', 'Parking', 'Security Guard', 'CCTV', 'Rooftop'],
    available: '2024-02-01', furnished: 'Semi-furnished', floor: 5,
    description: 'A spacious modern apartment in the heart of Mirpur DOHS with all modern amenities. The apartment features a bright living room, modular kitchen, attached bathrooms, and a balcony with panoramic city views. Close to schools, hospitals, and shopping centers.',
    owner: { name: 'Md. Rafiqul Islam', phone: '01711-234567', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format', verified: true, role: 'Property Owner' },
  },
  {
    id: '2', title: 'Luxury 2 Bedroom Flat in Gulshan 2',
    location: 'Gulshan 2, Dhaka', city: 'Dhaka', area: 'Gulshan',
    rent: 45000, beds: 2, baths: 2, sqft: 1100, type: 'Apartment', verified: true,
    image: LR2, images: [LR2, BD1, LR5],
    amenities: ['Generator', 'Lift', 'Parking', 'Security Guard', 'CCTV', 'Swimming Pool', 'Gym'],
    available: '2024-01-15', furnished: 'Furnished', floor: 8,
    description: 'Premium furnished apartment in Gulshan 2 with stunning city views. Walking distance from embassies, restaurants, and shopping centers. Building includes rooftop garden, gym, and 24/7 concierge.',
    owner: { name: 'Nasrin Begum', phone: '01821-345678', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&auto=format', verified: true, role: 'Agent' },
  },
  {
    id: '3', title: 'Affordable Bachelor Room in Dhanmondi',
    location: 'Dhanmondi 27, Dhaka', city: 'Dhaka', area: 'Dhanmondi',
    rent: 8000, beds: 1, baths: 1, sqft: 450, type: 'Bachelor Room', verified: false,
    image: LR3, images: [LR3, LR6],
    amenities: ['Generator', 'WiFi', 'Water Supply', 'Gas'],
    available: '2024-01-20', furnished: 'Unfurnished', floor: 3,
    description: 'Clean and affordable bachelor room near BRAC University. Quiet neighborhood with easy access to public transport. Gas and water supply included in rent.',
    owner: { name: 'Jahangir Hossain', phone: '01631-456789', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format', verified: false, role: 'Property Owner' },
  },
  {
    id: '4', title: 'Spacious Family House in Uttara Sector 7',
    location: 'Uttara Sector 7, Dhaka', city: 'Dhaka', area: 'Uttara',
    rent: 35000, beds: 4, baths: 3, sqft: 2200, type: 'Family House', verified: true,
    image: LR4, images: [LR4, BD2, LR1],
    amenities: ['Parking', 'Generator', 'Garden', 'CCTV', 'Security Guard', 'Rooftop'],
    available: '2024-02-15', furnished: 'Semi-furnished', floor: 1,
    description: 'A beautiful independent family house perfect for large families. Features a private garden, covered parking for 2 cars, and spacious rooms. Located in a quiet residential area close to Uttara Model Town.',
    owner: { name: 'Aminul Islam', phone: '01711-567890', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format', verified: true, role: 'Property Owner' },
  },
  {
    id: '5', title: 'Premium Sublet in Bashundhara R/A',
    location: 'Bashundhara R/A, Dhaka', city: 'Dhaka', area: 'Bashundhara',
    rent: 12000, beds: 2, baths: 1, sqft: 800, type: 'Sublet', verified: true,
    image: LR5, images: [LR5, BD1],
    amenities: ['Generator', 'Lift', 'Parking', 'WiFi', 'CCTV'],
    available: '2024-01-25', furnished: 'Furnished', floor: 4,
    description: 'Comfortable sublet with shared facilities in a premium residential area. Ideal for students and young professionals. Just 10 minutes walk from North South University.',
    owner: { name: 'Sadia Rahman', phone: '01921-678901', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format', verified: true, role: 'Agent' },
  },
  {
    id: '6', title: 'Modern Office Space in Mohammadpur',
    location: 'Mohammadpur, Dhaka', city: 'Dhaka', area: 'Mohammadpur',
    rent: 20000, beds: 0, baths: 2, sqft: 900, type: 'Office', verified: true,
    image: LR6, images: [LR6, LR3],
    amenities: ['Generator', 'Lift', 'Parking', 'CCTV', 'Security Guard', 'High-speed Internet'],
    available: '2024-02-01', furnished: 'Furnished', floor: 6,
    description: 'Premium office space in a commercial building with 24/7 power backup, high-speed internet, and dedicated parking. Ideal for startups and small businesses. Meeting room available for booking.',
    owner: { name: 'Karim Properties Ltd.', phone: '01811-789012', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format', verified: true, role: 'Agent' },
  },
  {
    id: '7', title: '2 BHK Flat in Chattogram GEC Circle',
    location: 'GEC Circle, Chattogram', city: 'Chattogram', area: 'GEC',
    rent: 18000, beds: 2, baths: 2, sqft: 950, type: 'Apartment', verified: true,
    image: BD1, images: [BD1, LR2, LR5],
    amenities: ['Generator', 'Lift', 'Parking', 'Security Guard', 'CCTV'],
    available: '2024-03-01', furnished: 'Semi-furnished', floor: 3,
    description: 'Well-maintained apartment near GEC Circle, close to all major amenities including shops, hospitals, and schools. Easy access to Chattogram city center and port area.',
    owner: { name: 'Iqbal Chowdhury', phone: '01611-890123', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format', verified: true, role: 'Property Owner' },
  },
  {
    id: '8', title: 'Studio Apartment in Sylhet City Center',
    location: 'Zindabazar, Sylhet', city: 'Sylhet', area: 'Zindabazar',
    rent: 9000, beds: 1, baths: 1, sqft: 550, type: 'Apartment', verified: false,
    image: BD2, images: [BD2, LR4],
    amenities: ['Generator', 'Water Supply', 'Gas', 'WiFi'],
    available: '2024-02-10', furnished: 'Furnished', floor: 2,
    description: 'Cozy studio apartment in the heart of Sylhet city. Perfect for singles and couples who want to be close to the city center. Walking distance from Sylhet Eid Gah Maidan.',
    owner: { name: 'Farhan Ahmed', phone: '01511-901234', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&auto=format', verified: false, role: 'Property Owner' },
  },
]
