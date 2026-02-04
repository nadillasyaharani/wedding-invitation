
export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export interface RSVPData {
  name: string;
  guests: number;
  attendance: 'yes' | 'no';
}

export interface GalleryImage {
  id: string | number;
  label: string;
  category: 'bride' | 'groom' | 'story';
  url: string;
}
