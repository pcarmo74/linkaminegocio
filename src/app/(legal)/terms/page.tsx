import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        &larr; Back to home
      </Link>

      <article className="prose dark:prose-invert mt-8 max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: March 16, 2026
        </p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to our platform. By accessing or using our service, you agree
          to be bound by these Terms of Service. Please read them carefully
          before using the platform.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          You may use our service only in compliance with these terms and all
          applicable laws and regulations. You agree not to misuse the service or
          help anyone else do so.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account. You
          must notify us immediately of any unauthorized use.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, trademarks, and data on this platform are the property of
          the company or its licensors. You retain ownership of any content you
          submit, but grant us a license to use it in connection with operating
          the service.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, the company shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of or related to your use of the service.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will
          provide notice of material changes by posting the updated terms on our
          website. Your continued use of the service constitutes acceptance of
          the revised terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have any questions about these Terms of Service, please reach
          out via the in-app chat. Our support team is available there to help.
        </p>
      </article>
    </div>
  );
}
