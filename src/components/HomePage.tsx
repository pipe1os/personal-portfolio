"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GitHubActivityDashboard from './github-stats.tsx';
import {
  DATA,
  DEFAULT_LANGUAGE,
  getResumeData,
  LANGUAGES,
  SITE_COPY,
  type Language,
} from "@/data/resume";
import { ArrowUpRight, MapPin, Award } from "lucide-react";
import { useEffect, useState, Suspense, lazy } from "react";
import { GoogleLogo } from "@/components/ui/svgs/google";
import { FreeCodeCampLogo } from "@/components/ui/svgs/freecodecamp";
import Markdown from "react-markdown";
import { TextAnimate } from "@/components/ui/text-animate";
const ProjectsSection = lazy(() => import("./section/projects-section"));
const ContactSection = lazy(() => import("./section/contact-section"));
const Footer = lazy(() => import("./section/footer"));

const BLUR_FADE_DELAY = 0.04;

export default function HomePage({ githubStats }: { githubStats: any }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const data = getResumeData(language);
  const copy = SITE_COPY[language];

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-language") as Language;
    const initial = LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;

    setLanguage(initial);
    document.documentElement.lang = initial;
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-2 justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <TextAnimate
                key={`hero-title-${language}`}
                animation="blurInUp"
                by="character"
                startOnView={false}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
              >
                {`${copy.hero.greeting} ${data.name.split(" ")[0]}`}
              </TextAnimate>
              <BlurFadeText
                className="text-muted-foreground max-w-150 md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={data.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" strokeWidth={1.6} aria-hidden />
                    {data.location}
                  </span>
                </div>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                  <div className="flex items-center gap-4.5">
                    {Object.entries(DATA.contact.social)
                      .filter(([, social]) => social.navbar)
                      .map(([key, social]) => {
                        const Icon = social.icon;
                        const isExternal = social.url.startsWith("http");

                        return (
                          <a
                            key={key}
                            href={social.url}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            aria-label={
                              copy.socialLabels[
                                key as keyof typeof copy.socialLabels
                              ] ?? social.name
                            }
                            className="inline-flex items-center justify-center rounded-full text-muted-foreground shadow-sm transition-colors hover:text-foreground"
                          >
                            <Icon className="size-5" aria-hidden />
                          </a>
                        );
                      })}
                  </div>
                  <div
                    role="group"
                    aria-label={copy.language.label}
                    className="inline-flex h-8 items-center rounded-full border border-border bg-background/70 p-0.5 text-xs font-medium text-muted-foreground shadow-sm"
                  >
                    {LANGUAGES.map((option) => (
                      <button
                        key={option}
                        aria-pressed={language === option}
                        onClick={() => setLanguage(option)}
                        className={`h-7 min-w-8 cursor-pointer rounded-full px-2 transition-colors hover:text-foreground ${language === option ? "bg-primary text-primary-foreground hover:text-primary-foreground" : ""}`}
                      >
                        {copy.language.options[option]}
                      </button>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={data.name} src={data.avatarUrl} />
                <AvatarFallback>{data.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-xl font-bold">{copy.sections.about}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="prose prose-p:mt-0 prose-p:mb-0 max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert whitespace-pre-line">
              <Markdown>{data.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-xl font-bold">{copy.sections.education}</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {data.education.map((education, index) => (
              <BlurFade
                key={`${education.school}-${education.degree}`}
                delay={BLUR_FADE_DELAY * 7 + index * 0.05}
              >
                <a
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground text-right flex-none">
                    <span>
                      {education.start}
                      {education.end && ` - ${education.end}`}
                    </span>
                  </div>
                </a>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="certifications">
        <div className="flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold">{copy.sections.certifications}</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {data.certifications.map((cert, index) => {
              let LogoComponent: any = Award;
              let logoClasses = "size-4.5 fill-current opacity-80 text-emerald-500";
              
              if (cert.issuer.toLowerCase() === "google") {
                LogoComponent = GoogleLogo;
                logoClasses = "size-4.5";
              } else if (cert.issuer.toLowerCase() === "freecodecamp") {
                LogoComponent = FreeCodeCampLogo;
                logoClasses = "size-5 fill-current text-foreground opacity-90";
              }

              return (
                <BlurFade
                  key={cert.title}
                  delay={BLUR_FADE_DELAY * 9 + index * 0.05}
                >
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-3 justify-between group w-full"
                  >
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      {cert.logoUrl ? (
                        <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden bg-background flex items-center justify-center flex-none">
                          <img
                            src={cert.logoUrl}
                            alt={cert.issuer}
                            className="size-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="size-8 md:size-10 p-1.5 border rounded-full shadow ring-2 ring-border bg-background flex items-center justify-center flex-none overflow-hidden">
                          <LogoComponent className={logoClasses} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {cert.title}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        </div>
                        <div className="font-sans text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 leading-none">
                          <span>{cert.issuer}</span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="text-xs font-mono select-all text-muted-foreground/70">ID: {cert.credentialId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground text-right flex-none">
                      <span>{cert.date}</span>
                    </div>
                  </a>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 className="text-xl font-bold">{copy.sections.skills}</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, id) => (
              <BlurFade
                key={skill.name}
                delay={BLUR_FADE_DELAY * 11 + id * 0.05}
              >
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {skill.icon && (
                    <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                  )}
                  <span className="text-foreground text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <Suspense fallback={null}>
        <section id="projects">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <ProjectsSection copy={copy.projects} projects={data.projects} />
          </BlurFade>
        </section>
        <section id="github">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-4 items-center justify-center">
                <div className="flex items-center w-full">
                  <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                  <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                    <span className="text-background text-sm font-medium">
                      {copy.github.label}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                </div>
                <div className="flex flex-col gap-y-3 items-center justify-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    {copy.github.heading}
                  </h2>
                  <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                    {copy.github.description}
                  </p>
                </div>
              </div>
              <GitHubActivityDashboard stats={githubStats} language={language} />
            </div>
          </BlurFade>
        </section>
        <section id="contact">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ContactSection copy={copy.contact} />
          </BlurFade>
        </section>
        <section id="footer">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <Footer
              socialLinks={
                <div className="flex items-center gap-4.5">
                  {Object.entries(DATA.contact.social)
                    .filter(([, social]) => social.navbar)
                    .map(([key, social]) => {
                      const Icon = social.icon;
                      const isExternal = social.url.startsWith("http");

                      return (
                        <a
                          key={key}
                          href={social.url}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          aria-label={
                            copy.socialLabels[
                              key as keyof typeof copy.socialLabels
                            ] ?? social.name
                          }
                          className="inline-flex items-center justify-center rounded-full text-muted-foreground shadow-sm transition-colors hover:text-foreground"
                        >
                          <Icon className="size-5" aria-hidden />
                        </a>
                      );
                    })}
                </div>
              }
            />
          </BlurFade>
        </section>
      </Suspense>
    </main>
  );
}
