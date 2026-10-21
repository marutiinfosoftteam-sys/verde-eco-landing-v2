const EMAIL = 'hello@your-domain.com'; // EDIT: apna real email

const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 2026',
    sections: [
      ['Information we collect', 'We collect the details you submit through our contact form and checkout (name, email, message and order details). We do not store card details on this website.'],
      ['How we use it', 'To reply to your inquiries, process orders, provide support and improve our products.'],
      ['Sharing', 'We do not sell your personal data. We share it only with service providers needed to fulfil orders (payment, shipping, email) or when required by law.'],
      ['Cookies', 'This site may use cookies or similar technologies for basic functionality and analytics.'],
      ['Your rights', 'You can ask us to access, correct or delete your data by emailing us.'],
      ['Contact', `Questions about privacy? Email ${EMAIL}.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'October 2026',
    sections: [
      ['Using this website', 'By using this website you agree to these terms. Content is provided for information and may change without notice.'],
      ['Orders and pricing', 'Prices are shown on the Pricing page and may change. An order is confirmed only after we send you a confirmation email.'],
      ['Shipping', 'We offer free eco-friendly shipping. Delivery times depend on your location and will be shared at confirmation.'],
      ['Warranty', 'Verde Standard has a 1-year hardware warranty. Verde Pro has a 2-year hardware warranty. Damage from misuse is not covered.'],
      ['Limitation of liability', 'To the extent allowed by law, we are not liable for indirect losses arising from use of the website or products.'],
      ['Contact', `For any questions, email ${EMAIL}.`],
    ],
  },
  refund: {
    title: 'Refund & Shipping Policy',
    updated: 'October 2026',
    sections: [
      ['Returns', 'You can request a return within 7 days of delivery if the product is unused and in original packaging.'], // EDIT: apni real policy
      ['Refunds', 'Approved refunds are sent to the original payment method within 7 to 10 working days.'], // EDIT
      ['Damaged or faulty items', `If your item arrives damaged or faulty, email ${EMAIL} with photos and your order details and we will replace it.`],
      ['Shipping', 'Orders are dispatched after confirmation. You will receive tracking details by email.'],
    ],
  },
};

export default function PolicyPage({ page }) {
  const p = POLICIES[page];
  if (!p) return null;
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{p.title}</h1>
          <p className="text-xs text-slate-400">Last updated: {p.updated}</p>
        </div>
        {p.sections.map(([h, t]) => (
          <div key={h} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-2">
            <h2 className="text-lg font-bold text-emerald-400">{h}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}