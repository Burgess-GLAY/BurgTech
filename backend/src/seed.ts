import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Burtech database...')

  // Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'burgtechsolutions@gmail.com' },
    update: {
      name: 'Burgess Awalayah Glay',
    },
    create: {
      name: 'Burgess Awalayah Glay',
      email: 'burgtechsolutions@gmail.com',
      passwordHash: await bcrypt.hash('CodeWithCarp!', 12),
      role: 'SUPER_ADMIN',
    },
  })

  await prisma.teamMember.upsert({
    where: { userId: superAdmin.id },
    update: {
      bio: 'Founder of Burtech Solution. BSc Software Engineering, Rauf Denktas University, Cyprus. MSc candidate in Computer Science at Nanjing University of Post and Telecommunications, China. Research focus: Data Science, Data Analytics, and Artificial Intelligence. Based in Liberia.',
    },
    create: {
      userId: superAdmin.id,
      title: 'Chief Systems Architect & Founder',
      photoUrl: '/images/burgess.jpg',
      bio: 'Founder of Burtech Solution. BSc Software Engineering, Rauf Denktas University, Cyprus. MSc candidate in Computer Science at Nanjing University of Post and Telecommunications, China. Research focus: Data Science, Data Analytics, and Artificial Intelligence. Based in Liberia.',
      skills: ['System Architecture', 'AI/ML', 'Data Science', 'Full-Stack Development', 'Cloud Infrastructure'],
      linkedinUrl: 'https://www.linkedin.com/in/burgess-awalayah-glay-4696112b4/',
      order: 1,
    },
  })

  // Team members
  const teamMembers = [
    { email: 'burgtechsolutions+growth@gmail.com', name: 'Growth Lead', title: 'Growth Strategist',       bio: 'Drives go-to-market strategy, partnership development, and data-informed client acquisition.',        skills: ['Growth Strategy', 'Digital Marketing', 'Analytics', 'CRM', 'SEO'],              order: 2 },
    { email: 'burgtechsolutions+design@gmail.com', name: 'Design Lead', title: 'Experience Design Lead',  bio: 'Crafts pixel-perfect, user-centered interfaces balancing aesthetics with function.',                    skills: ['UI/UX Design', 'Figma', 'Design Systems', 'Prototyping', 'User Research'],       order: 3 },
    { email: 'burgtechsolutions+ops@gmail.com',    name: 'Ops Lead',    title: 'Head of Operations',       bio: 'Ensures seamless project delivery and client satisfaction through agile methodology.',                  skills: ['Project Management', 'Agile', 'Operations', 'Client Success', 'QA'],             order: 4 },
  ]

  for (const m of teamMembers) {
    const user = await prisma.user.upsert({
      where: { email: m.email },
      update: { name: m.name },
      create: { name: m.name, email: m.email, passwordHash: await bcrypt.hash('Team@Burtech2024!', 12), role: 'TEAM_MEMBER' },
    })
    await prisma.teamMember.upsert({
      where: { userId: user.id },
      update: { title: m.title, bio: m.bio, skills: m.skills, order: m.order },
      create: { userId: user.id, title: m.title, bio: m.bio, skills: m.skills, order: m.order },
    })
  }

  // Services
  const services = [
    { slug: 'web-development',      title: 'Web Development',          order: 1, summary: 'Scalable, performant web applications.', description: 'Full-stack web apps built with Next.js, React, Node.js, and PostgreSQL. We prioritise performance, security, and maintainability from day one.', technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis'], useCases: ['SaaS platforms', 'E-commerce', 'Corporate websites', 'Web portals'], benefits: ['Fast time to market', 'SEO optimised', 'Mobile responsive', 'Scalable architecture'] },
    { slug: 'web-design',           title: 'Web Design',               order: 2, summary: 'User-centred UI/UX that converts.', description: 'Pixel-perfect, conversion-optimised design grounded in user research and modern principles. Every interface we design tells a story.', technologies: ['Figma', 'Framer', 'Tailwind CSS', 'Adobe XD'], useCases: ['Brand identity', 'Landing pages', 'Design systems', 'Prototyping'], benefits: ['Higher conversion rates', 'Consistent brand', 'Accessible interfaces', 'Rapid prototyping'] },
    { slug: 'mobile-apps',          title: 'Mobile App Development',   order: 3, summary: 'Cross-platform iOS and Android apps.', description: 'Native and cross-platform mobile applications using React Native and Flutter. We build apps users love with smooth performance.', technologies: ['React Native', 'Flutter', 'Expo', 'Firebase', 'Swift', 'Kotlin'], useCases: ['Consumer apps', 'Enterprise tools', 'Marketplace apps', 'IoT dashboards'], benefits: ['Single codebase', 'Native performance', 'Offline support', 'Push notifications'] },
    { slug: 'data-analytics',       title: 'Advanced Data Analytics',  order: 4, summary: 'Turn data into actionable intelligence.', description: 'End-to-end analytics pipelines — from ingestion and warehousing to interactive dashboards and automated reporting.', technologies: ['Python', 'Power BI', 'Tableau', 'dbt', 'Snowflake', 'Apache Spark'], useCases: ['Executive dashboards', 'Sales analytics', 'Customer segmentation', 'Churn analysis'], benefits: ['Real-time insights', 'Automated reports', 'Data-driven decisions', 'Cost reduction'] },
    { slug: 'cloud-migration',      title: 'Cloud Migration',          order: 5, summary: 'Seamless migration to AWS, GCP, or Azure.', description: 'Comprehensive cloud migration strategy and execution — lift-and-shift or re-architecture — with zero downtime and robust security.', technologies: ['AWS', 'Google Cloud', 'Azure', 'Terraform', 'Kubernetes', 'Docker'], useCases: ['Data center exit', 'Cost optimisation', 'Disaster recovery', 'Global scale'], benefits: ['Reduced costs', 'Auto-scaling', 'High availability', 'Enhanced security'] },
    { slug: 'api-integration',      title: 'API Integration',          order: 6, summary: 'Connect your tools, automate workflows.', description: 'Custom API development and third-party integrations to unify your digital ecosystem — from CRMs and ERPs to payment gateways.', technologies: ['REST', 'GraphQL', 'WebSockets', 'Zapier', 'n8n', 'Stripe', 'Twilio'], useCases: ['CRM sync', 'Payment systems', 'IoT ingestion', 'Workflow automation'], benefits: ['Less manual work', 'Unified data', 'Faster workflows', 'Error reduction'] },
    { slug: 'seo-content',          title: 'SEO and Content Strategy', order: 7, summary: 'Data-driven SEO that ranks and converts.', description: 'Technical SEO audits, keyword strategy, content roadmaps, and performance tracking — aligned to your business goals.', technologies: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog', 'Clearscope'], useCases: ['Organic growth', 'Content hubs', 'Local SEO', 'Technical audits'], benefits: ['Higher traffic', 'Improved rankings', 'Lower CAC', 'Long-term ROI'] },
    { slug: 'project-management',   title: 'Project Management',       order: 8, summary: 'Modern PM frameworks that deliver on time.', description: 'Agile and hybrid project management consulting — Scrum, Kanban, OKRs — tailored to your team with tooling setup and training.', technologies: ['Jira', 'Notion', 'Linear', 'Asana', 'GitHub Projects', 'Confluence'], useCases: ['Digital transformation', 'Team scaling', 'Process optimisation', 'Sprint setup'], benefits: ['On-time delivery', 'Transparent tracking', 'Team alignment', 'Risk reduction'] },
    { slug: 'predictive-analytics', title: 'Predictive Analytics',     order: 9, summary: 'Custom AI models that forecast and guide.', description: 'Custom machine learning models for forecasting, classification, and anomaly detection — from data prep to production deployment.', technologies: ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'MLflow', 'FastAPI'], useCases: ['Demand forecasting', 'Churn prediction', 'Fraud detection', 'Recommendation engines'], benefits: ['Proactive decisions', 'Revenue uplift', 'Risk mitigation', 'Competitive edge'] },
  ]

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: { ...s }, create: s })
  }

  // Testimonials
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      { authorName: 'Sarah K.',   authorRole: 'CTO',             company: 'TechVentures', content: 'Burtech delivered our data analytics platform ahead of schedule. The quality of work and communication throughout was exceptional.', rating: 5, isFeatured: true,  isPublished: true },
      { authorName: 'Marcus R.',  authorRole: 'Founder',         company: 'StartupXYZ',   content: 'The mobile app exceeded our expectations. Clean code, great UX, and they genuinely understood our business goals from day one.', rating: 5, isFeatured: true,  isPublished: true },
      { authorName: 'Lena M.',    authorRole: 'Head of Digital', company: 'RetailCo',     content: 'Our cloud migration was seamless — zero downtime and 40% infrastructure cost reduction. Highly recommended.', rating: 5, isFeatured: true,  isPublished: true },
    ],
  })

  // Blog Posts
  const blogPosts = [
    {
      slug: 'cloud-computing-workshop-liberia-2024',
      title: 'I Completed a Cloud Computing Workshop: What I Learned and Why It Matters for African Tech',
      summary: 'A first-hand account of completing an intensive cloud computing workshop — covering AWS fundamentals, serverless architecture, containerisation, and real-world deployment strategies for modern applications.',
      category: 'COMPANY_NEWS' as const,
      isPublished: true,
      publishedAt: new Date('2026-02-10'),
      readTimeMin: 8,
      tags: ['Cloud Computing', 'AWS', 'Workshop', 'Learning', 'Liberia', 'DevOps', 'Personal'],
      coverImage: '/images/blog/cloud-workshop.jpg',
      content: `<p>Earlier this year I had the privilege of completing an intensive cloud
  computing workshop that challenged everything I thought I knew about
  modern infrastructure. As someone who builds digital products for
  businesses across Africa and beyond, understanding cloud architecture
  is not optional — it is foundational.</p>

  <h2>What the Workshop Covered</h2>
  <p>The programme ran over five full days and covered a comprehensive
  curriculum across four core domains:</p>

  <h3>1. AWS Core Services and Architecture</h3>
  <p>We started with Amazon Web Services fundamentals — EC2 instances,
  S3 object storage, RDS managed databases, and VPC networking. The
  hands-on labs had us deploying real infrastructure within the first
  hour, which set the tone for the entire workshop: no theory without
  practice.</p>
  <p>Key topics included IAM roles and policies, security groups, load
  balancing with Application Load Balancers, and auto-scaling groups
  that respond to real traffic patterns. We built a multi-tier web
  application from scratch and watched it handle simulated traffic spikes
  without a single manual intervention.</p>

  <h3>2. Serverless Architecture with AWS Lambda</h3>
  <p>The second day shifted to serverless computing — a paradigm that has
  genuinely changed how I think about backend architecture. Using AWS
  Lambda, API Gateway, and DynamoDB, we built a fully serverless REST API
  that scaled to zero when idle and to thousands of requests per second
  under load, all without managing a single server.</p>
  <p>For a company like Burtech Solution that builds cost-efficient
  systems for clients, serverless is a game-changer. The operational cost
  reduction alone can be 60–80% compared to traditional server-based
  deployments for the right workloads.</p>

  <h3>3. Containerisation with Docker and Kubernetes</h3>
  <p>Days three and four were the most technically intensive. We went deep
  into Docker — building optimised multi-stage images, understanding layer
  caching, and writing production-grade Dockerfiles. We then moved to
  Kubernetes for container orchestration: pods, services, deployments,
  config maps, and secrets management.</p>
  <p>The practical exercise that stuck with me most was a rolling deployment
  with zero downtime. Watching Kubernetes drain pods gracefully, deploy new
  versions, and route traffic without a single dropped request was
  genuinely impressive. This is now part of how we deploy at Burtech.</p>

  <h3>4. CI/CD Pipelines and DevOps Practices</h3>
  <p>The final day connected everything: GitHub Actions for CI/CD, automated
  testing pipelines, infrastructure as code with Terraform, and cloud cost
  monitoring with AWS Cost Explorer. We built a complete pipeline that took
  code from a developer's laptop to production in under 8 minutes, with
  automated tests, security scans, and staged rollouts.</p>

  <h2>Why This Matters for Burtech Solution</h2>
  <p>Cloud computing is not a future technology for African businesses —
  it is present tense. From fintech startups in Liberia to logistics
  companies across West Africa, the organisations that adopt cloud
  infrastructure now are the ones that will scale without friction later.</p>
  <p>At Burtech Solution, we have always offered Cloud Migration as a core
  service. This workshop deepened my technical foundation and gave me new
  frameworks for how we design, price, and execute cloud projects for
  our clients. The serverless and Kubernetes knowledge in particular will
  directly improve the infrastructure decisions we make on every project
  going forward.</p>

  <h2>What is Next</h2>
  <p>I am currently preparing for the AWS Solutions Architect Associate
  certification — the next formal step in validating this knowledge.
  Beyond the certification, I am exploring how to bring structured cloud
  computing education to Liberia, where access to this kind of training
  is still limited but the demand from local developers is growing fast.</p>
  <p>If you are a business exploring cloud migration, or a developer in
  West Africa interested in cloud skills, reach out. This is a conversation
  I am genuinely excited to be part of.</p>`
    },
    {
      slug: 'generative-ai-transforming-business',
      title: 'How Generative AI Is Transforming Business Operations in 2026',
      summary: 'Generative AI has moved beyond the hype. Businesses that ignored it two years ago are now integrating it into customer service, data analysis, and product development. Here is what is actually happening on the ground.',
      category: 'AI_DATA_SCIENCE' as const,
      isPublished: true,
      publishedAt: new Date('2026-03-01'),
      readTimeMin: 6,
      tags: ['AI', 'Generative AI', 'GPT', 'Business', 'Automation', 'Large Language Models', '2026'],
      coverImage: null,
      content: `<p>Two years ago, most business conversations about generative AI
  centred on ChatGPT demos and LinkedIn posts about prompting. Today, the
  companies pulling ahead are the ones who moved from experimentation to
  integration — quietly embedding AI into workflows that used to require
  hours of human time.</p>

  <h2>What Has Actually Changed</h2>
  <p>The shift is not in the models themselves — GPT-4, Claude, and Gemini
  have all improved incrementally. The real change is in the tooling around
  them: better APIs, lower costs, longer context windows, and enterprise
  security features that make deployment in real businesses viable.</p>
  <p>In practical terms, we are seeing three categories of AI adoption
  dominate right now:</p>

  <h3>1. Intelligent Document Processing</h3>
  <p>Contracts, invoices, reports, compliance documents — these used to
  require human reading and manual data extraction. AI now handles this
  at near-human accuracy and at a fraction of the cost. A logistics company
  we work with reduced their invoice processing time from 3 days to 4
  hours using a simple document AI pipeline we built on top of GPT-4o.</p>

  <h3>2. AI-Augmented Customer Support</h3>
  <p>The era of chatbots that say "I'm sorry, I didn't understand that" is
  over. Modern LLM-powered support agents understand context, maintain
  conversation history, escalate intelligently to humans, and learn from
  feedback. Businesses using these systems are reporting 40–60% reductions
  in first-line support ticket volume.</p>

  <h3>3. Data Analysis and Business Intelligence</h3>
  <p>This is the area closest to Burtech Solution's core work. Natural
  language querying of databases — asking a business question in plain
  English and getting a chart back — is now production-ready. Tools like
  SQL-generating AI assistants are enabling non-technical executives to
  query their own data without waiting for an analyst.</p>

  <h2>What This Means for Small and Growing Businesses</h2>
  <p>The most exciting development is the democratisation of these
  capabilities. What required a dedicated ML team 4 years ago can now be
  built by a competent full-stack developer in a week. This is exactly
  what Burtech Solution does for clients — bringing enterprise-grade AI
  capabilities to businesses that do not have enterprise-sized budgets.</p>

  <h2>The Road Ahead</h2>
    <p>2026 is being defined by multimodal AI — models that reason across
  text, images, audio, and structured data simultaneously. For businesses,
  this means AI that can analyse a photo of a damaged product and
  automatically process a warranty claim, or listen to a sales call and
  update the CRM. The technical barriers are nearly gone. The remaining
  barrier is execution.</p>`
    },
    {
      slug: 'data-science-for-business-decisions',
      title: 'Stop Guessing: How Data Science Is Replacing Intuition in Business Decision-Making in 2026',
      summary: 'From demand forecasting to customer churn prediction, data science is giving businesses the ability to see around corners. Here is a practical breakdown of where it delivers the most value and where the hype still outpaces reality.',
      category: 'AI_DATA_SCIENCE' as const,
      isPublished: true,
      publishedAt: new Date('2026-01-22'),
      readTimeMin: 7,
      tags: ['Data Science', 'Machine Learning', 'Business Intelligence', 'Forecasting', 'Analytics', 'Decision Making'],
      coverImage: null,
      content: `<p>Ask most business owners what data science means to them and you will
  get one of two answers: either a vague reference to "big data" from a
  conference slide, or a very specific fear that their competitors already
  have it and they do not. Both reactions point to the same gap: a lack of
  clarity about what data science actually does in practice.</p>

  <h2>Where Data Science Genuinely Delivers</h2>

  <h3>Demand and Inventory Forecasting</h3>
  <p>Retailers, manufacturers, and logistics companies lose significant
  revenue every year to two problems: stockouts (items customers want but
  you do not have) and overstock (items you bought too many of). Machine
  learning forecasting models, trained on historical sales data, seasonal
  patterns, and external signals like weather or local events, can reduce
  forecasting error by 20–50% compared to manual methods.</p>

  <h3>Customer Churn Prediction</h3>
  <p>Losing a customer is always more expensive than retaining one.
  Churn prediction models analyse behaviour patterns — login frequency,
  support ticket history, usage trends, payment delays — and flag customers
  who are at high risk of leaving before they actually leave. Companies
  using these models can intervene with targeted offers or personal
  outreach before the relationship breaks down.</p>

  <h3>Pricing Optimisation</h3>
  <p>Static pricing is leaving money on the table. Dynamic pricing models
  that account for demand, competition, time of day, and customer segment
  can increase revenue by 5–15% without changing the product at all. This
  is not just for airlines and hotels — e-commerce and even service
  businesses can apply these principles.</p>

  <h2>Where the Hype Still Outpaces Reality</h2>
  <p>Not every business problem needs a machine learning model. Too many
  companies invest in data science infrastructure before they have clean,
  reliable data to feed it. The most common mistake we see at Burtech
  Solution is organisations building predictive models on top of data they
  do not fully trust. Garbage in, garbage out — no algorithm changes that.</p>
  <p>The first step for most businesses is not a model — it is a data audit
  and a reporting layer. Know what you have, clean it, and build visibility
  before you build prediction.</p>

  <h2>Getting Started</h2>
  <p>The practical entry point for most growing businesses is a well-designed
  business intelligence dashboard — something that answers the 5–10 questions
  your leadership team asks every week without requiring a data analyst to
  pull a report manually. From there, predictive capabilities can be layered
  in as your data matures and your confidence in the numbers grows.</p>`
    },
    {
      slug: 'large-language-models-explained',
      title: 'Large Language Models Explained: What They Are, How They Work, and What They Actually Cannot Do in 2026',
      summary: 'LLMs are the most discussed technology of the decade. But between the hype and the fear, most people have a surprisingly fuzzy understanding of what they actually are. This is a plain-language technical breakdown.',
      category: 'AI_DATA_SCIENCE' as const,
      isPublished: true,
      publishedAt: new Date('2025-11-14'),
      readTimeMin: 9,
      tags: ['LLM', 'GPT', 'Artificial Intelligence', 'Deep Learning', 'Neural Networks', 'Technical', 'Explainer'],
      coverImage: null,
      content: `<p>If you have used ChatGPT, Claude, or Gemini, you have interacted with
  a large language model. But if someone asked you to explain what it
  actually is — not the marketing version, the real version — could you?
  Most people cannot, and that gap matters when you are making technology
  decisions for a business.</p>

  <h2>What a Language Model Actually Is</h2>
  <p>At its core, a language model is a system trained to predict the next
  token (roughly: word or word-fragment) given everything that came before
  it. That is the entire foundational task. The "large" in large language
  model refers to the scale: billions of parameters, trained on trillions
  of tokens of text drawn from books, websites, code repositories, and
  scientific papers.</p>
  <p>What emerges from training at this scale is surprising: the model
  develops internal representations of concepts, relationships, and
  reasoning patterns that were never explicitly taught. It learns grammar
  not because someone labelled grammatical structures, but because
  predicting the next word accurately requires understanding them.</p>

  <h2>The Architecture Behind It: Transformers</h2>
  <p>LLMs are built on a neural network architecture called the Transformer,
  introduced by Google in 2017. The key innovation is the attention
  mechanism, which allows the model to weigh the relevance of every
  previous word to the current prediction — not just the words immediately
  before it. This is what allows LLMs to maintain coherent reasoning across
  long passages of text.</p>

  <h2>What LLMs Are Good At</h2>
  <p>They excel at tasks that involve pattern recognition in language:
  summarisation, translation, code generation, question answering from
  provided context, writing assistance, classification, and structured data
  extraction from unstructured text. When the task has a clear language
  pattern, LLMs are remarkably capable.</p>

  <h2>What LLMs Cannot Do (That People Assume They Can)</h2>
  <p>They do not have memory between conversations unless memory tools are
  explicitly added. They do not know what happened after their training
  cutoff date. They do not reason like a human — they predict like a
  very sophisticated pattern-matching engine, and sometimes that looks
  like reasoning without being it. They hallucinate: generating confident
  but incorrect facts when the training data does not provide a clear
  signal. And they are not autonomous — they do not take actions in the
  world unless connected to tools that allow them to do so.</p>

  <h2>Why This Matters for Business Applications</h2>
  <p>Understanding these limitations is what separates businesses that
  deploy AI successfully from those that invest heavily and get burned.
  At Burtech Solution, every AI integration we build starts with a
  limitations mapping: what can this context, and where do we need human
  oversight or rule-based guardrails? That discipline is what makes AI
  products trustworthy in production.</p>`
    }
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { ...post, authorId: superAdmin.id },
      create: { ...post, authorId: superAdmin.id },
    })
  }

  // Sample project
  await prisma.project.upsert({
    where: { slug: 'retail-analytics-dashboard' },
    update: {},
    create: {
      slug: 'retail-analytics-dashboard',
      title: 'Retail Analytics Dashboard',
      summary: 'Real-time BI dashboard for a multi-location retailer.',
      description: 'Built a comprehensive analytics platform integrating sales, inventory, and customer data from 12 store locations. The dashboard enables executives to monitor KPIs in real time and drill down into product performance, regional trends, and staff metrics.',
      client: 'RetailCo',
      technologies: ['Next.js', 'Python', 'PostgreSQL', 'Power BI', 'AWS'],
      imageUrls: [],
      status: 'COMPLETED',
      isFeatured: true,
      completedAt: new Date('2024-06-01'),
    },
  })

  console.log('Seeding complete!')
  console.log('Admin login: burgtechsolutions@gmail.com / CodeWithCarp!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
