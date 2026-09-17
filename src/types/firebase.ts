export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "inactive";

export type ThemePreset = "minimal" | "sunset" | "neon" | "mono" | "pastel" | "aurora" | "brutalist" | "midnight" | "earth";
export type ButtonStyle = "filled" | "outline" | "soft";

export interface ProfileTheme {
  preset: ThemePreset;
  backgroundColor: string;
  backgroundGradient: string | null;
  buttonStyle: ButtonStyle;
  buttonColor: string;
  buttonTextColor: string;
  textColor: string;
}

export type FontFamily =
  | "geist"
  | "inter"
  | "playfair"
  | "space-grotesk"
  | "dm-serif"
  | "jetbrains-mono"
  | "nunito"
  | "raleway";

export type BusinessStatusType =
  | "reconstruccion"
  | "demolicion"
  | "temporal"
  | "buscando"
  | "cerrado"
  | "reabierto";

export interface BusinessStatus {
  enabled: boolean;
  type: BusinessStatusType;
  message: string;
  link: string;
  updatedAt: Date;
}

export interface UserDoc {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  showEmail: boolean;
  showHandle: boolean;
  theme: ProfileTheme;
  fontFamily: FontFamily;
  emailCaptureEnabled: boolean;
  emailCaptureMessage: string;
  businessStatus: BusinessStatus;
  photoURL: string | null;
  stripeCustomerId: string | null;
  subscriptionStatus: SubscriptionStatus;
  subscriptionPriceId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type RoutingSource =
  | "youtube"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "tiktok"
  | "email"
  | "direct"
  | "other";

export interface RoutingRule {
  source: RoutingSource;
  priority: number;
  label: string;
}

export interface LinkDoc {
  id: string;
  title: string;
  url: string;
  order: number;
  active: boolean;
  clicks: number;
  clicksBySource: Record<string, number>;
  /** If true, this link is highlighted with a glow on the public profile. Only one link per user should be featured. */
  featured?: boolean;
  /** Manual icon override; null means use auto-detect from URL. */
  iconKey: string | null;
  routing: {
    rules: RoutingRule[];
    defaultPriority: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface RoutingViewDoc {
  profileId: string;
  source: string;
  linkOrderShown: string[];
  timestamp: Date;
}

export interface RoutingClickDoc {
  profileId: string;
  linkId: string;
  source: string;
  positionShown: number;
  timestamp: Date;
}

export interface StatsSummary {
  views: number;
  clicks: number;
  viewsBySource: Record<string, number>;
}

export interface SubscriberDoc {
  email: string;
  subscribedAt: Date;
}
