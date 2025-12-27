// platforms
export type TPlatform = "TikTok" | "Instagram" | "YouTube";

// payment status
export type TPaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

// campaign status
export type TCampaignStatus = "active" | "inactive";

// budget type
export interface ICampaignBudget {
  rewardRate: number;
  perViews: number;
  minPayout?: number;
  maxPayout?: number;
  flatPrice?: number;
}

// assets type
export interface ICampaignAssets {
  availableContentLink?: string;
  contentRequirement?: string[];
}

// main campaign type (frontend)
export interface ICampaign {
  _id: string;

  userId: string;

  title: string;
  contentType: "UGC" | "Clipping";

  category: string;
  categoryId: string;

  genre: string;
  genreId: string;

  thumbnail: string;
  currency: string;
  platformFee: number;

  budget: ICampaignBudget;

  platforms: TPlatform[];

  assets: ICampaignAssets;

  status: TCampaignStatus;
  isActive: boolean;
  isDeleted: boolean;

  remainingAmount: number;

  // payment fields
  campaignAmount: number;
  paidAt?: string; // ISO date string from API
  paidAmount: number;
  totalPaidOutAmount: number;
  paymentStatus: TPaymentStatus;
  paymentId?: string;
  isPaid: boolean;

  // timestamps (optional but common)
  createdAt?: string;
  updatedAt?: string;
}
