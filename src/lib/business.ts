export type PublicBusinessProfile = {
  phone: string;
  email: string;
  thumbtack: string;
  facebook: string;
  instagram: string;
  gbp: string;
  calendar: string;
};

/**
 * Public, non-secret business settings used by the deployed site.
 *
 * Complete these fields with Jeff's verified contact and profile links before
 * launch. Keep credentials, API keys, and private calendar URLs out of this
 * client-shipped file.
 */
export const PUBLIC_BUSINESS_PROFILE: PublicBusinessProfile = {
  phone: "",
  email: "",
  thumbtack: "",
  facebook: "",
  instagram: "",
  gbp: "",
  calendar: "",
};

/**
 * Safety switches for content that requires verified business proof.
 * Keep testimonials disabled until written customer permission and the final
 * wording have been confirmed.
 */
export const PUBLIC_BUSINESS_FEATURES = {
  showTestimonials: false,
} as const;
