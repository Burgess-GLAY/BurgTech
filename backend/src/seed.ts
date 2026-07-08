import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting clean seed...')

  // ── STEP 1: Create super admin user ────────────────────────────
  const adminPassword = await bcrypt.hash('CodeWithCarp!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'burgtechsolutions@gmail.com' },
    update: { name: 'Burgess Awalayah Glay', role: 'SUPER_ADMIN' },
    create: {
      email: 'burgtechsolutions@gmail.com',
      name: 'Burgess Awalayah Glay',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })
  console.log('Admin user ready:', admin.email)

  // ── STEP 2: Create team member users ───────────────────────────
  const teamPassword = await bcrypt.hash('Team@Burtech2024!', 12)

  const teamUsers = [
    { email: 'growth@burtech.io', name: 'Growth Lead' },
    { email: 'design@burtech.io', name: 'Design Lead' },
    { email: 'ops@burtech.io', name: 'Operations Lead' },
  ]

  for (const u of teamUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name },
      create: {
        email: u.email,
        name: u.name,
        passwordHash: teamPassword,
        role: 'TEAM_MEMBER',
        isActive: true,
      },
    })
  }
  console.log('Team users ready')

  // ── STEP 3: Create team member profiles ────────────────────────
  // First ensure no duplicate TeamMember for admin
  const existingAdminMember = await prisma.teamMember.findUnique({
    where: { userId: admin.id },
  })
  if (!existingAdminMember) {
    await prisma.teamMember.create({
      data: {
        userId: admin.id,
        title: 'Chief Systems Architect & Founder',
        bio: 'Founder of Burtech Solution. BSc Software Engineering, Rauf Denktas University, Cyprus. MSc candidate in Computer Science at Nanjing University of Post and Telecommunications, China. Research focus: Data Science, Analytics, and Artificial Intelligence. Based in Liberia.',
        skills: ['System Architecture', 'AI/ML', 'Data Science', 'Full-Stack Development', 'Cloud Infrastructure'],
        order: 1,
        isVisible: true,
      },
    })
  } else {
    await prisma.teamMember.update({
      where: { userId: admin.id },
      data: {
        title: 'Chief Systems Architect & Founder',
        bio: 'Founder of Burtech Solution. BSc Software Engineering, Rauf Denktas University, Cyprus. MSc candidate in Computer Science at Nanjing University of Post and Telecommunications, China. Research focus: Data Science, Analytics, and Artificial Intelligence. Based in Liberia.',
        skills: ['System Architecture', 'AI/ML', 'Data Science', 'Full-Stack Development', 'Cloud Infrastructure'],
        order: 1,
        isVisible: true,
      },
    })
  }

  const teamProfiles = [
    {
      email: 'growth@burtech.io',
      title: 'Growth Strategist',
      bio: 'Drives go-to-market strategy, partnership development, and data-informed client acquisition.',
      skills: ['Growth Strategy', 'Digital Marketing', 'Analytics', 'CRM', 'SEO'],
      order: 2,
    },
    {
      email: 'design@burtech.io',
      title: 'Experience Design Lead',
      bio: 'Crafts pixel-perfect, user-centred interfaces balancing aesthetics with function.',
      skills: ['UI/UX Design', 'Figma', 'Design Systems', 'Prototyping', 'User Research'],
      order: 3,
    },
    {
      email: 'ops@burtech.io',
      title: 'Head of Operations',
      bio: 'Ensures seamless project delivery and client satisfaction through agile methodology.',
      skills: ['Project Management', 'Agile', 'Operations', 'Client Success', 'QA'],
      order: 4,
    },
  ]

  for (const profile of teamProfiles) {
    const user = await prisma.user.findUnique({ where: { email: profile.email } })
    if (!user) continue
    const existing = await prisma.teamMember.findUnique({ where: { userId: user.id } })
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          userId: user.id,
          title: profile.title,
          bio: profile.bio,
          skills: profile.skills,
          order: profile.order,
          isVisible: true,
        },
      })
    } else {
      await prisma.teamMember.update({
        where: { userId: user.id },
        data: {
          title: profile.title,
          bio: profile.bio,
          skills: profile.skills,
          order: profile.order,
        },
      })
    }
  }
  console.log('Team profiles ready')

  // ── STEP 4: Create services ─────────────────────────────────────
  // Delete all existing services first to avoid slug conflicts
  await prisma.service.deleteMany({})
  console.log('Cleared old services')

  const services = [
    {
      slug: 'web-development',
      title: 'Web Development',
      order: 1,
      summary: 'Scalable, performant web applications built with modern frameworks.',
      description: 'Full-stack web applications built with Next.js, React, Node.js, and PostgreSQL. We prioritise performance, security, and maintainability from day one.',
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
      useCases: ['SaaS platforms', 'E-commerce', 'Corporate websites', 'Web portals'],
      benefits: ['Fast time to market', 'SEO optimised', 'Mobile responsive', 'Scalable architecture'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'web-design',
      title: 'Web Design',
      order: 2,
      summary: 'User-centred UI/UX that converts visitors into customers.',
      description: 'Pixel-perfect, conversion-optimised design grounded in user research and modern principles.',
      technologies: ['Figma', 'Framer', 'Tailwind CSS', 'Adobe XD'],
      useCases: ['Brand identity', 'Landing pages', 'Design systems', 'Prototyping'],
      benefits: ['Higher conversion rates', 'Consistent brand', 'Accessible interfaces', 'Rapid prototyping'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'mobile-apps',
      title: 'Mobile App Development',
      order: 3,
      summary: 'Cross-platform iOS and Android applications.',
      description: 'Native and cross-platform mobile applications using React Native and Flutter.',
      technologies: ['React Native', 'Flutter', 'Expo', 'Firebase', 'Swift', 'Kotlin'],
      useCases: ['Consumer apps', 'Enterprise tools', 'Marketplace apps', 'IoT dashboards'],
      benefits: ['Single codebase', 'Native performance', 'Offline support', 'Push notifications'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'data-analytics',
      title: 'Advanced Data Analytics',
      order: 4,
      summary: 'Turn raw data into actionable business intelligence.',
      description: 'End-to-end analytics pipelines from ingestion and warehousing to interactive dashboards.',
      technologies: ['Python', 'Power BI', 'Tableau', 'dbt', 'Snowflake', 'Apache Spark'],
      useCases: ['Executive dashboards', 'Sales analytics', 'Customer segmentation', 'Churn analysis'],
      benefits: ['Real-time insights', 'Automated reports', 'Data-driven decisions', 'Cost reduction'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'cloud-migration',
      title: 'Cloud Migration',
      order: 5,
      summary: 'Seamless migration to AWS, GCP, or Azure.',
      description: 'Comprehensive cloud migration strategy and execution with zero downtime and robust security.',
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Terraform', 'Kubernetes', 'Docker'],
      useCases: ['Data center exit', 'Cost optimisation', 'Disaster recovery', 'Global scale'],
      benefits: ['Reduced costs', 'Auto-scaling', 'High availability', 'Enhanced security'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'api-integration',
      title: 'API Integration',
      order: 6,
      summary: 'Connect your tools and automate workflows end-to-end.',
      description: 'Custom API development and third-party integrations to unify your digital ecosystem.',
      technologies: ['REST', 'GraphQL', 'WebSockets', 'Zapier', 'n8n', 'Stripe', 'Twilio'],
      useCases: ['CRM sync', 'Payment systems', 'IoT ingestion', 'Workflow automation'],
      benefits: ['Less manual work', 'Unified data', 'Faster workflows', 'Error reduction'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'seo-content',
      title: 'SEO and Content Strategy',
      order: 7,
      summary: 'Data-driven SEO and content strategies that rank and convert.',
      description: 'Technical SEO audits, keyword strategy, content roadmaps, and performance tracking.',
      technologies: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog', 'Clearscope'],
      useCases: ['Organic growth', 'Content hubs', 'Local SEO', 'Technical audits'],
      benefits: ['Higher traffic', 'Improved rankings', 'Lower CAC', 'Long-term ROI'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'project-management',
      title: 'Project Management',
      order: 8,
      summary: 'Modern PM frameworks that deliver on time and on budget.',
      description: 'Agile and hybrid project management consulting — Scrum, Kanban, OKRs.',
      technologies: ['Jira', 'Notion', 'Linear', 'Asana', 'GitHub Projects', 'Confluence'],
      useCases: ['Digital transformation', 'Team scaling', 'Process optimisation', 'Sprint setup'],
      benefits: ['On-time delivery', 'Transparent tracking', 'Team alignment', 'Risk reduction'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'predictive-analytics',
      title: 'Predictive Analytics',
      order: 9,
      summary: 'Custom AI models that forecast trends and guide decisions.',
      description: 'Custom machine learning models for forecasting, classification, and anomaly detection.',
      technologies: ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'MLflow', 'FastAPI'],
      useCases: ['Demand forecasting', 'Churn prediction', 'Fraud detection', 'Recommendation engines'],
      benefits: ['Proactive decisions', 'Revenue uplift', 'Risk mitigation', 'Competitive edge'],
      ctaLabel: 'Get Started',
      isPublished: true,
    },
    {
      slug: 'software-development',
      title: 'Software Development',
      order: 10,
      summary: 'Custom software built for your exact business needs.',
      description: 'Custom software designed around your exact workflow, your team, and your growth trajectory. From internal business tools and ERP systems to industry-specific platforms.',
      technologies: ['Python', 'TypeScript', 'Node.js', '.NET', 'PostgreSQL', 'Docker', 'REST APIs'],
      useCases: ['Internal business tools', 'ERP and management systems', 'Industry-specific platforms', 'Process automation'],
      benefits: ['Built for your workflow', 'Full source code ownership', 'Documented and maintainable', 'Scalable from day one'],
      ctaLabel: 'Discuss Your Needs',
      isPublished: true,
    },
    {
      slug: 'data-science',
      title: 'Data Science',
      order: 11,
      summary: 'Research-grade data science that solves real business problems.',
      description: 'We apply statistical modelling, machine learning, and research-driven analysis. Our founder holds an MSc candidacy with research focus in Data Science at Nanjing University of Post and Telecommunications.',
      technologies: ['Python', 'R', 'Pandas', 'NumPy', 'SciPy', 'Jupyter', 'scikit-learn', 'SQL'],
      useCases: ['Statistical research', 'Customer behaviour modelling', 'Market analysis', 'Data pipelines'],
      benefits: ['Rigorous methodology', 'Insights from your data', 'Reproducible analysis', 'Academic depth'],
      ctaLabel: 'Start a Project',
      isPublished: true,
    },
    {
      slug: 'ai-ml',
      title: 'AI and Machine Learning',
      order: 12,
      summary: 'Custom AI models that solve specific business problems.',
      description: 'We build, train, evaluate, and deploy machine learning models that deliver real value. Experience with OpenAI, Anthropic, and open-source models in production.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'HuggingFace', 'OpenAI API', 'LangChain', 'FastAPI'],
      useCases: ['Predictive models', 'Natural language processing', 'AI product features', 'Document processing'],
      benefits: ['Models for your problem', 'Explainable outputs', 'Production-ready', 'Continuous improvement'],
      ctaLabel: 'Build an AI Solution',
      isPublished: true,
    },
    {
      slug: 'cloud-architecture',
      title: 'Cloud Architecture',
      order: 13,
      summary: 'Cloud infrastructure built to scale, resilient, and cost-optimised.',
      description: 'Design cloud systems on AWS, GCP, and Azure applying Well-Architected Framework principles across all five pillars.',
      technologies: ['AWS', 'Google Cloud Platform', 'Azure', 'Terraform', 'Kubernetes', 'Docker', 'CloudFormation'],
      useCases: ['Cloud-native system design', 'Architecture review', 'High-availability systems', 'Cost audits'],
      benefits: ['Scales automatically', 'Fault-tolerant by design', 'Optimised spend', 'Infrastructure as code'],
      ctaLabel: 'Design Your Architecture',
      isPublished: true,
    },
    {
      slug: 'devops',
      title: 'DevOps and CI/CD',
      order: 14,
      summary: 'Automate your path from code to production.',
      description: 'CI/CD pipelines that automatically test, build, and deploy your application — reducing human error and letting your team ship faster with confidence.',
      technologies: ['GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana'],
      useCases: ['CI/CD setup', 'Docker containerisation', 'Zero-downtime deployments', 'Monitoring setup'],
      benefits: ['Deploy safely daily', 'Automated testing', 'Instant rollback', 'Consistent environments'],
      ctaLabel: 'Automate Deployments',
      isPublished: true,
    },
    {
      slug: 'digital-transformation',
      title: 'Digital Transformation',
      order: 15,
      summary: 'Move from manual processes to integrated digital systems.',
      description: 'Replace paper-based, manual, and disconnected processes with systems that are fast, accurate, integrated, and measurable.',
      technologies: ['Process mapping tools', 'ERP systems', 'CRM platforms', 'Custom web apps', 'Cloud platforms'],
      useCases: ['Paper-to-digital migration', 'System integration', 'Business process automation', 'Operations modernisation'],
      benefits: ['Eliminates manual errors', 'Processes run faster', 'Real-time visibility', 'Enables scaling'],
      ctaLabel: 'Start Transformation',
      isPublished: true,
    },
    {
      slug: 'database-systems',
      title: 'Database Design and Management Systems',
      order: 16,
      summary: 'Robust database architecture and custom management systems.',
      description: 'Database systems structured for the queries you run, the scale you need, and the reliability your operations demand. We also build custom database management interfaces.',
      technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'AWS RDS', 'Prisma ORM'],
      useCases: ['Business management systems', 'Custom internal tools', 'Data migration', 'Performance optimisation'],
      benefits: ['Queries run fast', 'Structured trusted data', 'Custom interfaces', 'Scalable schema design'],
      ctaLabel: 'Discuss Database Needs',
      isPublished: true,
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }
  console.log('Services created:', services.length)

  // ── STEP 5: Create testimonials ─────────────────────────────────
  // Delete all first to avoid duplicates
  await prisma.testimonial.deleteMany({})

  await prisma.testimonial.createMany({
    data: [
      {
        authorName: 'Sarah K.',
        authorRole: 'CTO',
        company: 'TechVentures',
        content: 'Burtech delivered our data analytics platform ahead of schedule. The quality of work and communication throughout was exceptional.',
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        authorName: 'Marcus R.',
        authorRole: 'Founder',
        company: 'StartupXYZ',
        content: 'The mobile app exceeded our expectations. Clean code, great UX, and they genuinely understood our business goals from day one.',
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        authorName: 'Lena M.',
        authorRole: 'Head of Digital',
        company: 'RetailCo',
        content: 'Our cloud migration was seamless — zero downtime and 40% infrastructure cost reduction. Highly recommended.',
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
    ],
  })
  console.log('Testimonials created: 3')

  // ── STEP 6: Create featured projects ───────────────────────────
  await prisma.project.deleteMany({})

  const projects = [
    {
      slug: 'basileia-mission',
      title: 'Basileia Mission Platform',
      summary: 'Comprehensive mission management and tracking system for large-scale operations.',
      description: 'The Basileia Mission platform is a state-of-the-art solution designed to streamline mission management and oversight. Built with the latest technology stack, it provides real-time tracking of mission objectives, personnel, and resource allocation.\n\nThe platform\'s architecture is designed for high availability and security, ensuring that sensitive data is protected at all times. With integrated communication tools and automated reporting, stakeholders can maintain clear visibility into mission progress and make data-driven decisions.',
      client: 'Basileia Tech',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
      imageUrls: ['/images/project_images/basiela_mission_login_1.png'],
      highlights: ['Real-time mission tracking', 'Role-based access control', 'Automated reporting'],
      status: 'COMPLETED' as const,
      isFeatured: true,
      completedAt: new Date('2025-12-10'),
    },
    {
      slug: 'lhde-portal',
      title: 'LHDE Digital Portal',
      summary: 'Centralised digital gateway for stakeholders with integrated communication tools.',
      description: 'The LHDE Portal serves as the primary digital interface for all stakeholders within the LHDE ecosystem. It provides a secure, unified gateway to essential resources, communication channels, and project documentation.\n\nKey features include an advanced document management system, peer-to-peer messaging, and personalised dashboards that surface the most relevant information to each user. The portal was designed with a mobile-first approach, ensuring accessibility across all devices.',
      client: 'LHDE Group',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
      imageUrls: ['/images/project_images/lhde_login.png'],
      highlights: ['Stakeholder dashboard', 'Resource management', 'P2P messaging'],
      status: 'COMPLETED' as const,
      isFeatured: true,
      completedAt: new Date('2026-01-20'),
    },
    {
      slug: 'enterprise-analytics',
      title: 'Enterprise BI Analytics',
      summary: 'Advanced data visualisation tool for deep insights into business performance.',
      description: 'Enterprise Analytics is a powerful tool designed to turn raw data into actionable business intelligence. It features a custom-built charting engine that allows users to create complex visualisations with ease.\n\nThe project incorporates predictive modelling capabilities, helping businesses anticipate market trends and optimise their operations. By integrating with various third-party APIs, it centralises data from across the enterprise into a single, cohesive view.',
      client: 'DataLink Corp',
      technologies: ['Python', 'D3.js', 'FastAPI', 'Redis', 'Kubernetes'],
      imageUrls: ['/images/project_images/basiela_mission_image_1.png'],
      highlights: ['Custom chart engine', 'Predictive modelling', 'Multi-source API sync'],
      status: 'IN_PROGRESS' as const,
      isFeatured: true,
    },
    {
      slug: 'digital-transformation',
      title: 'GovTech Digital Hub',
      summary: 'Modernisation of public sector systems for seamless digital governance.',
      description: 'This project focused on the complete overhaul and modernisation of a large-scale legacy infrastructure. The goal was to transition from monolithic on-premise systems to a cloud-native, microservices-based architecture.\n\nThe transformation involved refactoring core business logic, migrating massive databases without downtime, and implementing modern CI/CD pipelines. The result was a significantly more scalable, reliable, and maintainable system.',
      client: 'Government Office',
      technologies: ['Azure', 'Terraform', 'Spring Boot', 'Kafka', 'GraphQL'],
      imageUrls: ['/images/project_images/lhde_image_1.png'],
      highlights: ['Microservices migration', 'Zero-downtime database transition', 'CI/CD pipeline implementation'],
      status: 'COMPLETED' as const,
      isFeatured: true,
      completedAt: new Date('2026-03-05'),
    },
    {
      slug: 'smart-future-platform',
      title: 'Smart Future Platform',
      summary: 'AI-driven initiative focusing on sustainable technology for urban development.',
      description: 'The Smart Future Platform is an ambitious initiative aimed at leveraging artificial intelligence to solve complex urban development challenges. It focuses on sustainability, energy efficiency, and improving the quality of life for urban residents.\n\nThe platform uses AI algorithms to optimise resource distribution, traffic flow, and waste management. It integrates data from a wide array of IoT sensors to provide a real-time view of urban dynamics.',
      client: 'Sustainability Lab',
      technologies: ['TensorFlow', 'IoT', 'MQTT', 'Rust', 'WebAssembly'],
      imageUrls: ['/images/project_images/basiela_mission_image_2.png'],
      highlights: ['AI-driven urban planning', 'IoT sensor integration', 'Sustainability metrics dashboard'],
      status: 'COMPLETED' as const,
      isFeatured: true,
      completedAt: new Date('2026-03-30'),
    },
    {
      slug: 'cloud-infrastructure',
      title: 'Enterprise Cloud Grid',
      summary: 'Managed high-availability services for mission-critical applications.',
      description: 'Our Cloud Infrastructure services provide a robust and secure foundation for modern enterprise applications. We specialise in high-availability designs that ensure your applications stay online and performant under any circumstances.\n\nKey features include automated scaling, comprehensive monitoring, and advanced security protocols. We take care of the underlying infrastructure so your team can focus on building and delivering value.',
      client: 'SkyNet Systems',
      technologies: ['GCP', 'Ansible', 'Prometheus', 'Grafana', 'Go'],
      imageUrls: ['/images/project_images/lhde_image_2.png'],
      highlights: ['Auto-scaling grid', 'High-availability architecture', 'Integrated vulnerability scanning'],
      status: 'COMPLETED' as const,
      isFeatured: true,
      completedAt: new Date('2026-04-02'),
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }
  console.log('Featured projects ready:', projects.length)

  // ── STEP 7: Create blog posts ───────────────────────────────────
  await prisma.blogPost.deleteMany({})

  const posts = [
    {
      slug: 'cloud-computing-workshop-liberia-2026',
      title: 'I Completed a Cloud Computing Workshop: What I Learned',
      summary: 'A first-hand account of completing an intensive cloud computing workshop covering AWS, serverless architecture, containerisation, and real-world deployment.',
      content: '<p>Earlier this year I had the privilege of completing an intensive cloud computing workshop. As someone who builds digital products for businesses across Africa, understanding cloud architecture is foundational.</p><h2>What the Workshop Covered</h2><p>The programme covered AWS core services, serverless with Lambda, Docker and Kubernetes, and CI/CD pipelines with GitHub Actions. It was taught by certified cloud engineer Naison Faray.</p><h2>Why This Matters for Burtech Solution</h2><p>Cloud computing is present tense for African businesses. This workshop deepened my technical foundation and will directly improve the infrastructure decisions we make for every client project going forward.</p>',
      category: 'COMPANY_NEWS' as const,
      tags: ['Cloud Computing', 'AWS', 'Workshop', 'Learning', 'Liberia'],
      isPublished: true,
      publishedAt: new Date('2026-02-25'),
      readTimeMin: 8,
      coverImage: '/images/blog/cloud-workshop.jpg',
      authorId: admin.id,
    },
    {
      slug: 'generative-ai-transforming-business-2026',
      title: 'How Generative AI Is Transforming Business Operations in 2026',
      summary: 'Generative AI has moved beyond the hype. Businesses are integrating it into customer service, data analysis, and product development.',
      content: '<p>The companies pulling ahead are the ones who moved from experimentation to integration — embedding AI into workflows that used to require hours of human time.</p><h2>What Has Actually Changed</h2><p>Better APIs, lower costs, longer context windows, and enterprise security features make deployment in real businesses viable today.</p><h2>Three Categories of AI Adoption</h2><p>Intelligent document processing, AI-augmented customer support, and natural language data analysis are dominating in 2026.</p><h2>What This Means for Growing Businesses</h2><p>What required a dedicated ML team four years ago can now be built by a competent developer in a week. This is exactly what Burtech Solution delivers for clients.</p>',
      category: 'AI_DATA_SCIENCE' as const,
      tags: ['AI', 'Generative AI', 'Business', 'Automation', '2026'],
      isPublished: true,
      publishedAt: new Date('2026-03-01'),
      readTimeMin: 6,
      coverImage: null,
      authorId: admin.id,
    },
    {
      slug: 'data-science-business-decisions-2026',
      title: 'Stop Guessing: How Data Science Is Replacing Intuition in Business',
      summary: 'From demand forecasting to churn prediction, data science gives businesses the ability to see around corners.',
      content: '<p>Data science at Burtech Solution goes beyond dashboards. We apply statistical modelling and research-driven analysis to extract insight that drives genuine decisions.</p><h2>Where Data Science Delivers</h2><p>Demand forecasting, customer churn prediction, and pricing optimisation are the three areas delivering the most measurable ROI in 2026.</p><h2>Where the Hype Outpaces Reality</h2><p>The first step for most businesses is a data audit and reporting layer — not a machine learning model. Know what you have before you try to predict with it.</p>',
      category: 'AI_DATA_SCIENCE' as const,
      tags: ['Data Science', 'Machine Learning', 'Analytics', 'Business Intelligence'],
      isPublished: true,
      publishedAt: new Date('2026-01-22'),
      readTimeMin: 7,
      coverImage: null,
      authorId: admin.id,
    },
    {
      slug: 'prompt-engineering-masterclass-april-2026',
      title: 'Burtech Academy: Prompt Engineering Masterclass — April 11, 2026',
      summary: 'Free one-day online workshop on Prompt Engineering. Learn to write effective prompts and use AI coding agents like Windsurf and Antigravity.',
      content: '<p>Burtech Academy is hosting a free one-day online masterclass on Prompt Engineering on <strong>April 11, 2026</strong> via Google Meet.</p><h2>What You Will Learn</h2><ul><li>How large language models work</li><li>Prompt structure and best practices</li><li>Zero-shot and few-shot prompting</li><li>Chain-of-thought prompting</li><li>Using AI coding agents: Windsurf and Antigravity</li><li>Practical hands-on exercises</li></ul><h2>How to Register</h2><p>Registration is free. Fill in the contact form and we will send you the Google Meet link. <a href="/contact">Register here</a></p>',
      category: 'COMPANY_NEWS' as const,
      tags: ['Academy', 'Prompt Engineering', 'AI', 'Windsurf', 'Antigravity', 'Free Workshop'],
      isPublished: true,
      publishedAt: new Date('2026-03-15'),
      readTimeMin: 4,
      coverImage: null,
      authorId: admin.id,
    },
  ]

  for (const post of posts) {
    await prisma.blogPost.create({ data: post })
  }
  console.log('Blog posts created:', posts.length)

  console.log('')
  console.log('=== SEED COMPLETE ===')
  console.log('Admin: burgtechsolutions@gmail.com / CodeWithCarp!')
  console.log('Services: 16')
  console.log('Blog posts: 4')
  console.log('Testimonials: 3')
  console.log('Team members: 4')
}

main()
  .catch((e) => {
    console.error('SEED FAILED:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
