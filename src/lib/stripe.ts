import Stripe from "stripe";

let _stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true });
  }
  return _stripe;
}

// Keep a named export for backward-compat in the webhook (already has the key check at request time)
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return Reflect.get(getStripe(), prop);
  },
});

export const PLANS = {
  starter: {
    name: "Starter",
    description: "For small firms getting started with Consumer Duty",
    price: 299,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    features: [
      "Up to 5 products",
      "2 user seats",
      "Core outcome assessments",
      "PDF evidence exports",
      "Email support",
    ],
    limits: { products: 5, seats: 2 },
  },
  professional: {
    name: "Professional",
    description: "For growing compliance teams",
    price: 799,
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL!,
    features: [
      "Unlimited products",
      "10 user seats",
      "AI-powered analysis",
      "Board MI report generation",
      "Action tracking & reminders",
      "Priority support",
    ],
    limits: { products: -1, seats: 10 },
  },
  enterprise: {
    name: "Enterprise",
    description: "For large regulated firms and groups",
    price: 0,
    priceId: process.env.STRIPE_PRICE_ENTERPRISE!,
    features: [
      "Unlimited products & entities",
      "Unlimited seats",
      "Multi-entity management",
      "SSO / SAML",
      "Custom integrations",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    limits: { products: -1, seats: -1 },
  },
} as const;

export type Plan = keyof typeof PLANS;
