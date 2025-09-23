import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from 'lucide-react';
import { Metadata } from 'next';

import { ExecutiveSummary } from '@/components/sections/ExecutiveSummary';
import { HighlightsSection } from '@/components/sections/HighlightsSection';
import { SkillsMatrix } from '@/components/sections/SkillsMatrix';
import { highlights } from '@/content/highlights';
import { skills } from '@/content/skills';

export const metadata: Metadata = {
  title: 'Recruiter Snapshot | Owen L Richards - Senior Full-Stack Engineer',
  description:
    'Concise executive overview for talent partners and hiring managers. Key strengths, target roles, availability, and quantified impact metrics.',
  openGraph: {
    title: 'Recruiter Snapshot | Owen L Richards',
    description:
      'Senior Full-Stack Engineer with 8+ years experience. Proven track record of 67% performance improvements and 4x faster delivery.',
  },
};

export default function RecruiterPage() {
  const quickFacts = [
    {
      icon: ClockIcon,
      label: 'Experience',
      value: '8+ years',
      detail: 'Senior roles at high-growth companies',
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: 'Remote/Hybrid',
      detail: 'US/EU timezone flexibility',
    },
    {
      icon: CalendarIcon,
      label: 'Availability',
      value: '30 days notice',
      detail: 'Open to immediate discussions',
    },
    {
      icon: DollarSignIcon,
      label: 'Comp Range',
      value: '$140k-200k+',
      detail: 'Open to equity-heavy packages',
    },
  ];

  const downloadItems = [
    {
      title: 'Executive Resume (PDF)',
      description: 'Comprehensive 2-page technical resume',
      action: 'Download PDF',
    },
    {
      title: 'One-Page Summary',
      description: 'Key highlights for quick screening',
      action: 'Download PDF',
    },
    {
      title: 'Case Study Pack',
      description: 'Detailed project breakdowns with metrics',
      action: 'Download Pack',
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Hero Banner */}
      <section className="relative border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-slate-500/20 bg-slate-500/10 px-3
                              py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <div className="h-2 w-2 rounded-full bg-slate-500" />
                  Available for Hire
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
                Owen L Richards
              </h1>
              <p className="mb-2 text-xl font-semibold text-primary">
                Senior Full-Stack Engineer & Technical Leader
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Proven track record scaling engineering teams and systems.
                Expert in React/Next.js, Node.js, AWS with demonstrated ability
                to improve performance by 67% and accelerate delivery 4x through
                technical leadership.
              </p>
            </div>

            <div className="space-y-4">
              {quickFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border 
                                             border-border/50 bg-card/50 p-3"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">
                        {fact.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {fact.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Quick Actions */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Methods */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Get In Touch
              </h2>
              <div className="space-y-4">
                <a
                  href="mailto:owen@example.com"
                  className="group flex items-center gap-3 rounded-lg border border-border 
                            p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <MailIcon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary">
                      owen@example.com
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Response within 24 hours
                    </div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/owen-richards"
                  className="group flex items-center gap-3 rounded-lg border border-border 
                            p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <LinkedinIcon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary">
                      LinkedIn Profile
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Professional background & endorsements
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/owen-richards"
                  className="group flex items-center gap-3 rounded-lg border border-border 
                            p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <GithubIcon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary">
                      GitHub Portfolio
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Open source contributions & projects
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Download Center */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Download Materials
              </h2>
              <div className="space-y-4">
                {downloadItems.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between rounded-lg border border-border 
                                p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary">
                        {item.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-2 rounded-lg border border-primary px-4
                                     py-2 text-sm font-medium 
                                     text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <DownloadIcon className="h-4 w-4" />
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <ExecutiveSummary />

      {/* Impact Highlights */}
      <HighlightsSection highlights={highlights} />

      {/* Skills Overview */}
      <SkillsMatrix skills={skills} />

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to discuss your next hire?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            I&apos;m actively seeking senior engineering roles where I can drive
            technical excellence and mentor growing teams. Let&apos;s explore
            how I can contribute to your company&apos;s success.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3
                             text-base font-medium text-primary-foreground 
                             transition-colors hover:bg-primary/90"
            >
              <MailIcon className="h-5 w-5" />
              Schedule Initial Call
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6
                             py-3 text-base font-medium text-primary transition-colors
                             hover:bg-primary hover:text-primary-foreground"
            >
              <DownloadIcon className="h-5 w-5" />
              Download Resume Pack
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
