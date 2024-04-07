// ----------------------------------------------------------------------

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IProductItem = {
  id: string;
  _id: string;
  sku: string;
  title: { [key: string]: string };
  description: { [key: string]: string };
  sort: number;
  tags: string[];
  gender: string;
  images: string[];
  sellPrice: number;
  purchasePrice: number;
  quantity: number;
  lowQuantity: number;
  tenantId: string;
  mainImage: string;
  video: string;
  youtubeLink: string;
  categoryId: string;
  subcategoryId: string;
  brandId: string;
  preparationTime: number;
  preparationTimeUnit: 'minuits' | 'hours' | 'days'; // TODO: check other
  ingredients: [string];
  materials: [string];
  calories: string; // TODO: should be number?
  season: [string];
  style: [string];
  fit: string;
  careInstructions: string;
  format: string;
  fileSize: string;
  duration: string;
  author: string;
  releaseDate: string;
  unit: 'KG' | 'G'; //TODO: change
  weight: number;
  length: number;
  width: number;
  height: number;
  isStockLimited: boolean;
  maxQuantityPerUser: number;
  isFeatured: boolean;
  isPopular: boolean;
  isNew: boolean;
  isRecommended: boolean;
  sellQuantity: number;
  purchaseLimit: number;
  barcode: string;
  discountType: 'percentage' | 'value'; // TODO: change
  discountValue: number;
  occasion: [string];
  isAvailableOnAllBranhces: boolean;
  branches: [string];
  updatedAt: string;

  // OLD VALUES??? might be deleted
  code: string;
  taxes: number;
  sizes: string[];
  publish_app: boolean;
  publish_website: boolean;
  coverUrl: string;
  colors: string[];
  genre: string;
  available: number;
  totalSold: number;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  createdAt: Date;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  price: number;
  quantity: number;
  publish_app: boolean;
  publish_website: boolean;
  stock: string[];
};
