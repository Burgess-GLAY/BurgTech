import { Scale, AlertTriangle, FileText, Gavel, Users, MapPin } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service and Use for BurgTech Solutions website and services.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#050e12] py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <span className="text-bt-cyan text-sm font-semibold uppercase tracking-widest">Legal</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Terms of <span className="gradient-text-brand">Service</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-12">
          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Agreement to Terms</h2>
                <p className="text-white/60 leading-relaxed">
                  By accessing or using BurgTech Solutions' website and services, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our services.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Description of Services</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  BurgTech Solutions provides web development, mobile application development, data analytics, cloud infrastructure, AI/ML solutions, and digital consulting services. Specific service terms may be outlined in separate agreements or proposals.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Website and application development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Data analytics and business intelligence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Cloud migration and infrastructure services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>AI and machine learning solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Digital transformation consulting</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">User Responsibilities</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  As a user of our services, you agree to:
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Provide accurate and complete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Notify us immediately of unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Use our services for lawful purposes only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Not attempt to circumvent security measures</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Limitation of Liability</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  To the fullest extent permitted by law, BurgTech Solutions shall not be liable for:
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Indirect, incidental, special, or consequential damages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Loss of data, profits, or business opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Downtime or service interruptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Third-party services or integrations</span>
                  </li>
                </ul>
                <p className="text-white/60 leading-relaxed mt-4">
                  Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Gavel className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Intellectual Property</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  All content, features, and functionality of our website and services, including text, graphics, logos, and software, are owned by BurgTech Solutions and protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <div className="space-y-3 text-white/60">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Client Deliverables</h3>
                    <p className="leading-relaxed">Upon full payment, clients receive ownership of custom-developed code and deliverables as outlined in their service agreement. BurgTech retains rights to reusable components, frameworks, and methodologies.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Third-Party Content</h3>
                    <p className="leading-relaxed">Some services may incorporate third-party libraries, APIs, or content subject to separate licensing terms.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Governing Law</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of Liberia, West Africa. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Liberia.
                </p>
                <p className="text-white/60 leading-relaxed">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your access to our services at any time, with or without cause, with or without notice, effective immediately.
            </p>
            <ul className="space-y-3 text-white/60">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                <span>Violation of these Terms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                <span>Non-payment of services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                <span>Security concerns or fraudulent activity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                <span>Changes to our business model or services</span>
              </li>
            </ul>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
            <p className="text-white/60 leading-relaxed">
              We may update these Terms from time to time. We will notify users of material changes by posting the new Terms on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-3">
              <a href="mailto:burgtechsolutions@gmail.com" className="flex items-center gap-3 text-bt-cyan hover:text-bt-cyan-light transition-colors">
                <span>burgtechsolutions@gmail.com</span>
              </a>
              <Link href="/contact" className="flex items-center gap-3 text-bt-cyan hover:text-bt-cyan-light transition-colors">
                <span>Visit our Contact page</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
