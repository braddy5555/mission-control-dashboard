# Cosmic Puppies Website Implementation

## Project Structure

```
.
├── app/
│   ├── admin/                 # Admin panel pages
│   ├── api/                   # API routes
│   ├── shop/                  # Shop pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── providers.tsx          # React context providers
├── components/
│   ├── admin/                 # Admin panel components
│   ├── shop/                  # Shop components
│   ├── footer.tsx
│   └── navbar.tsx
├── hooks/
│   └── use-cart.ts            # Cart state management
├── lib/
│   ├── prisma.ts              # Database client
│   ├── stripe.ts              # Stripe client
│   └── utils.ts               # Helper functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script
├── public/
│   └── placeholder.jpg        # Placeholder image
└── package.json               # Dependencies
```

## Technologies Used

- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **State Management:** Zustand (with persist middleware)
- **Database:** PostgreSQL with Prisma ORM
- **Payments:** Stripe
- **Authentication:** NextAuth.js
- **Animations:** Framer Motion

## Getting Started

1. Install dependencies:
```bash
cd website
npm install
```

2. Set up environment variables:
```
DATABASE_URL="postgresql://username:password@localhost:5432/cosmic_puppies"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

3. Initialize the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

4. Run the development server:
```bash
npm run dev
```

## Features

- **Responsive Design:** Mobile and desktop optimized
- **Product Catalog:** Categories, filtering, and search
- **Shopping Cart:** Add, remove, update quantities
- **Checkout:** Secure payments via Stripe
- **User Accounts:** Authentication, order history
- **Admin Panel:** Products, orders, and user management

## Deployment

To build for production:

```bash
npm run build
npm start
```

The application can be deployed to platforms like Vercel, Netlify, or any Node.js hosting service.

## Project Notes

- Stripe webhooks need to be configured for order status updates
- Next.js Edge Runtime used for API routes
- Prisma is configured for PostgreSQL but can be adapted for MySQL or SQLite