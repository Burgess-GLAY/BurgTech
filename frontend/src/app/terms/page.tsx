import { Scale, AlertTriangle, FileText, Gavel, Users, MapPin, Mail, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service and Use for BurgTech Solutions website and services.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#050e12] py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <span className="text-bt-cyan text-sm font-semibold uppercase tracking-widest">Legal</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Terms of <span className="gradient-text-brand">Service</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Agreement to Terms</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              By accessing or using BurgTech Solutions' website and services, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Description of Services</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              BurgTech Solutions provides web development, mobile application development, data analytics, cloud infrastructure, AI/ML solutions, and digital consulting services.
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Website and application development</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Data analytics and business intelligence</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Cloud migration and infrastructure services</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>AI and machine learning solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Digital transformation consulting</span>
              </li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">User Responsibilities</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">As a user of our services, you agree to:</p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Provide accurate and complete information</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Maintain the security of your account credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Notify us immediately of unauthorized access</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Use our services for lawful purposes only</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Not attempt to circumvent security measures</span>
              </li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Limitation of Liability</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              To the fullest extent permitted by law, BurgTech Solutions shall not be liable for:
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Indirect, incidental, special, or consequential damages</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Loss of data, profits, or business opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Downtime or service interruptions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Third-party services or integrations</span>
              </li>
            </ul>
            <p className="text-white/60 text-sm leading-relaxed mt-3">
              Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
            </p>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Gavel className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Intellectual Property</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              All content, features, and functionality of our website and services are owned by BurgTech Solutions and protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <div className="space-y-2 text-white/60 text-sm">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-bt-cyan flex-shrink-0" />
                <div><span className="font-semibold text-white">Client Deliverables:</span> Upon full payment, clients receive ownership of custom-developed code and deliverables. BurgTech retains rights to reusable components, frameworks, and methodologies.</div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-bt-cyan flex-shrink-0" />
                <div><span className="font-semibold text-white">Third-Party Content:</span> Some services may incorporate third-party libraries, APIs, or content subject to separate licensing terms.</div>
              </div>
            </div>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Governing Law</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              These Terms shall be governed by and construed in accordance with the laws of Liberia, West Africa. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Liberia.
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Termination</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              We reserve the right to suspend or terminate your access to our services at any time, with or without cause, with or without notice.
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Violation of these Terms</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Non-payment of services</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Security concerns or fraudulent activity</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Changes to our business model or services</span>
              </li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Changes to Terms</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              We may update these Terms from time to time. We will notify users of material changes by posting the new Terms on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>
        </div>

        <section className="glass-card p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-bt-cyan" />
            </div>
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:burgtechsolutions@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bt-cyan/10 border border-bt-cyan/20 text-bt-cyan hover:bg-bt-cyan/20 transition-colors text-sm font-medium">
              <Mail className="w-4 h-4" />
              <span>burgtechsolutions@gmail.com</span>
            </a>
            <Link href="/contact" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium">
              <span>Visit Contact Page</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
