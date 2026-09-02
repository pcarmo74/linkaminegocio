"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is LinkFig really free?",
    answer:
      "Yes, completely. LinkFig is free — unlimited links, custom themes, analytics, email capture, QR codes and more. No credit card required, no hidden fees, no paywalls. Every feature that Linktree charges $8-35/month for is free here.",
  },
  {
    question: "What makes LinkFig better than Linktree?",
    answer:
      "The biggest difference is price: LinkFig gives you every premium feature for free. Custom themes, custom fonts, email capture, analytics, QR codes — all of it. No tiered pricing, no feature gates, no monthly bills. Plus, LinkFig is open-source, so you can see exactly how it works.",
  },
  {
    question: "Can I collect emails from my profile visitors?",
    answer:
      "Absolutely! Enable email capture from your Appearance settings and add a custom message. Visitors can subscribe right from your profile page. You can view all subscribers in your dashboard and export them as a CSV anytime — a feature Linktree charges $8/month for.",
  },
  {
    question: "How many links can I add?",
    answer:
      "Unlimited. There's no cap on the number of links you can add to your LinkFig profile. You can reorder them with drag-and-drop and toggle individual links on or off.",
  },
  {
    question: "Can I customize how my profile looks?",
    answer:
      "Yes! Choose from 9 built-in themes (from minimal to neobrutalist), pick from 8 custom fonts, upload a profile photo, and write a custom bio. Your profile is fully yours to customize.",
  },
  {
    question: "Do I need a website to use LinkFig?",
    answer:
      "Not at all. LinkFig acts as your mini-website — a beautiful, mobile-first profile page where you share everything you do online. If you already have a website, just add it as one of your links.",
  },
  {
    question: "Is LinkFig safe to use on my social media?",
    answer:
      "Yes. LinkFig generates clean, fast-loading profile pages with proper SEO meta tags and social sharing previews. Your LinkFig URL works perfectly in Instagram, TikTok, Twitter, YouTube and any other platform's bio field.",
  },
  {
    question: "How do I share my LinkFig?",
    answer:
      "Add your unique LinkFig URL (yourdomain.com/u/yourname) to all of your social media bios. You can also generate a QR code from your dashboard to drive offline traffic to your profile.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-5 py-24">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Questions? Answered.
        </h2>

        <div className="mt-12 divide-y">
          {faqs.map(({ question, answer }, index) => (
            <div key={question}>
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between py-5 text-left font-medium transition-colors hover:text-primary"
              >
                {question}
                <ChevronDown
                  className={cn(
                    "ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  openIndex === index
                    ? "grid-rows-[1fr] pb-5"
                    : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
