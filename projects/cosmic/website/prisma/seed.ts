import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  
  // Clean up existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Cleaned existing data')

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@cosmicpuppies.nl',
      password: '$2a$10$MlYwOEJfP0H/LHNVv/C7W.XEEbGDFTXBwJRzlnlQKJZqUFhRPrXFa', // 'password123'
      role: 'ADMIN'
    }
  })

  console.log('✅ Created admin user')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'AI Automatisering',
        slug: 'ai-automatisering',
        description: 'Verhoog je productiviteit met AI automatiseringen',
        image: 'https://images.unsplash.com/photo-1677442135746-2d320fbd879c?q=80&w=1932&auto=format&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Web3 Ecosystemen',
        slug: 'web3-ecosystemen',
        description: 'Bouw een eigen digitale community',
        image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1932&auto=format&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Templates',
        slug: 'templates',
        description: 'Kant-en-klare templates voor je business',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1770&auto=format&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Ebooks & Guides',
        slug: 'ebooks-guides',
        description: 'Digitale gidsen en ebooks',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop'
      }
    })
  ])

  console.log('✅ Created categories')

  // Create products
  const products = await Promise.all([
    // AI Automatisering Producten
    prisma.product.create({
      data: {
        name: 'LinkedIn Outbound Machine',
        slug: 'linkedin-outbound-machine',
        description: 'Een volautomatisch systeem dat dagelijks warme leads genereert via LinkedIn. Inclusief AI-personalisatie, slim follow-up systeem en video integratie. Wordt volledig voor je opgezet.',
        price: 1497,
        comparePrice: 2997,
        image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1974&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1607988795691-3d0147b43231?q=80&w=1780&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop'
        ],
        featured: true,
        category: {
          connect: { slug: 'ai-automatisering' }
        },
        tags: ['linkedin', 'sales', 'automation', 'leads']
      }
    }),
    prisma.product.create({
      data: {
        name: 'AI Bookkeeping System',
        slug: 'ai-bookkeeping-system',
        description: 'Een compleet boekhoudsysteem dat automatisch facturen, bonnetjes en bankafschriften verwerkt. Inclusief BTW-aangifte voorbereidingen en real-time dashboards. Setup en training inbegrepen.',
        price: 997,
        comparePrice: 1997,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1972&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1972&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1561414926-7f3f921a4058?q=80&w=1973&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop'
        ],
        featured: false,
        category: {
          connect: { slug: 'ai-automatisering' }
        },
        tags: ['bookkeeping', 'finance', 'automation', 'dashboard']
      }
    }),
    prisma.product.create({
      data: {
        name: 'AI Content Engine',
        slug: 'ai-content-engine',
        description: 'Nooit meer content writer\'s block. Genereer 90 dagen aan hoogwaardige social media content, blogs en emails volledig geautomatiseerd. Inclusief brand voice training en scheduling.',
        price: 1297,
        comparePrice: 2497,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop'
        ],
        featured: false,
        category: {
          connect: { slug: 'ai-automatisering' }
        },
        tags: ['content', 'social media', 'marketing', 'automation']
      }
    }),
    
    // Web3 Ecosystemen
    prisma.product.create({
      data: {
        name: 'Web3 Loyalty System',
        slug: 'web3-loyalty-system',
        description: 'Een compleet Web3 loyaliteitssysteem dat klanten transformeert in een community. Met blockchain-based punten, tokenized rewards en quest systemen. Volledig geïntegreerd met je bestaande systemen.',
        price: 3997,
        comparePrice: 6997,
        image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1932&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1932&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2064&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1644419974661-16985593e7f2?q=80&w=1932&auto=format&fit=crop'
        ],
        featured: true,
        category: {
          connect: { slug: 'web3-ecosystemen' }
        },
        tags: ['web3', 'loyalty', 'tokens', 'blockchain', 'community']
      }
    }),
    prisma.product.create({
      data: {
        name: 'NFT Membership Club',
        slug: 'nft-membership-club',
        description: 'Een exclusieve membership club met NFT-toegangskaarten. Inclusief smart contracts, toegang tot premium content, events en diensten. Volledig geïntegreerd met populaire wallets.',
        price: 2497,
        comparePrice: 3997,
        image: 'https://images.unsplash.com/photo-1643057753226-a1d50fca6a77?q=80&w=1972&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1643057753226-a1d50fca6a77?q=80&w=1972&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1646764087209-1030edf51b4d?q=80&w=1972&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1659113333010-ebe77a30d2de?q=80&w=1798&auto=format&fit=crop'
        ],
        featured: false,
        category: {
          connect: { slug: 'web3-ecosystemen' }
        },
        tags: ['nft', 'membership', 'web3', 'community']
      }
    }),
    
    // Templates
    prisma.product.create({
      data: {
        name: 'LinkedIn Carousel Template Pack',
        slug: 'linkedin-carousel-template-pack',
        description: '25 professionele LinkedIn carousel templates in Canva en Figma formaat. Elke template is volledig aanpasbaar en ontworpen om maximale engagement te genereren.',
        price: 67,
        comparePrice: 97,
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop'
        ],
        featured: true,
        category: {
          connect: { slug: 'templates' }
        },
        tags: ['linkedin', 'templates', 'canva', 'figma', 'social media']
      }
    }),
    prisma.product.create({
      data: {
        name: 'AI Prompt Library',
        slug: 'ai-prompt-library',
        description: '100+ geteste en geoptimaliseerde prompts voor ChatGPT, Claude, Midjourney en DALL-E. Genereer content, ideeën en afbeeldingen in een fractie van de tijd.',
        price: 47,
        comparePrice: 97,
        image: 'https://images.unsplash.com/photo-1679958157542-9c457de73595?q=80&w=2070&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1679958157542-9c457de73595?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1686216941020-3fd4b3cfea72?q=80&w=1964&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1622959981103-6d8c9a9d4573?q=80&w=1932&auto=format&fit=crop'
        ],
        featured: false,
        category: {
          connect: { slug: 'templates' }
        },
        tags: ['ai', 'prompts', 'chatgpt', 'midjourney', 'productivity']
      }
    }),
    
    // Ebooks & Guides
    prisma.product.create({
      data: {
        name: 'De Grote AI Implementatie Gids',
        slug: 'grote-ai-implementatie-gids',
        description: 'Een compleet e-book over hoe je AI succesvol implementeert in je bedrijf. 200+ pagina\'s met stap-voor-stap handleidingen, case studies en best practices.',
        price: 27,
        comparePrice: 47,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1887&auto=format&fit=crop'
        ],
        featured: false,
        category: {
          connect: { slug: 'ebooks-guides' }
        },
        tags: ['ebook', 'ai', 'implementation', 'business']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Web3 voor Ondernemers',
        slug: 'web3-voor-ondernemers',
        description: 'Een praktische gids over hoe je Web3 kunt inzetten voor je business. Leer alles over tokens, NFTs, DAOs en hoe je ze kunt gebruiken om een concurrentievoordeel te behalen.',
        price: 37,
        comparePrice: 67,
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2051&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2051&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1932&auto=format&fit=crop'
        ],
        featured: false,
        category: {
          connect: { slug: 'ebooks-guides' }
        },
        tags: ['ebook', 'web3', 'blockchain', 'nft', 'business']
      }
    })
  ])

  console.log('✅ Created products')

  // Create some reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Deze LinkedIn Outbound Machine heeft mijn sales compleet getransformeerd. Ik krijg nu 5-10 kwalitatieve leads per dag zonder er iets voor te hoeven doen. Beste investering in jaren!',
        user: { connect: { id: adminUser.id } },
        product: { connect: { slug: 'linkedin-outbound-machine' } }
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Het AI Bookkeeping System heeft me vele uren per week bespaard. Enige reden dat ik geen 5 sterren geef is omdat de setup iets langer duurde dan verwacht. Maar de support was uitstekend.',
        user: { connect: { id: adminUser.id } },
        product: { connect: { slug: 'ai-bookkeeping-system' } }
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'De carousel templates zijn prachtig en super makkelijk aan te passen. Mijn posts krijgen nu 3x zoveel engagement!',
        user: { connect: { id: adminUser.id } },
        product: { connect: { slug: 'linkedin-carousel-template-pack' } }
      }
    })
  ])

  console.log('✅ Created reviews')

  // Create a sample order
  const order = await prisma.order.create({
    data: {
      user: { connect: { id: adminUser.id } },
      email: adminUser.email,
      name: adminUser.name || 'Sample User',
      status: 'DELIVERED',
      paymentStatus: 'PAID',
      subtotal: 1497.00,
      tax: 0.00,
      total: 1497.00,
      items: {
        create: {
          product: { connect: { slug: 'linkedin-outbound-machine' } },
          quantity: 1,
          price: 1497.00
        }
      }
    }
  })

  console.log('✅ Created sample order')
  console.log('🎉 Seeding completed')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })