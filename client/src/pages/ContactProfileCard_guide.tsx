import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Share2,
  X,
} from "lucide-react";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Button } from "@/components/ui/button";
import { useBackNavigation } from "@/hooks/use-back-navigation";

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
};

const profile = {
  name: "Elvin E. Mazwimairi",
  title: "Electrical Engineer x Systems Developer",
  tagline: "Innovation • Systems • Energy • Software",
  image: "/prof.jpg",
  phone: "+263783074722",
  email: "elvinmazwimairi@gmail.com",
  linkedin: "https://linkedin.com/in/elvin-mazwimairi",
  whatsapp: "https://wa.me/263783074722",
  vcf: "/contact.vcf",
};

const specialties = [
  "Renewable Energy and Power System Design",
  "Embedded and Control Systems Integration",
  "Software and Custom System Development",
  "Engineering Simulation and Project Delivery",
];

function dataUrlToFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/png";
  const bstr = atob(arr[1] ?? "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

export default function ContactProfilePage() {
  const goBack = useBackNavigation("/");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [showQrOverlay, setShowQrOverlay] = useState(false);

  const qrValue =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.elvinmazwi.me/contact-profile-card";

  const qrSize = typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 320;

  const channels = useMemo<ContactChannel[]>(
    () => [
      {
        id: "phone",
        label: "Call",
        value: profile.phone,
        href: `tel:${profile.phone}`,
        icon: Phone,
        style: {
          backgroundColor: "hsl(var(--accent2) / 0.14)",
          borderColor: "hsl(var(--accent2) / 0.45)",
        },
      },
      {
        id: "email",
        label: "Email",
        value: profile.email,
        href: `mailto:${profile.email}`,
        icon: Mail,
        style: {
          backgroundColor: "hsl(var(--accent3) / 0.14)",
          borderColor: "hsl(var(--accent3) / 0.45)",
        },
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: profile.phone,
        href: profile.whatsapp,
        icon: MessageSquare,
        style: {
          backgroundColor: "hsl(var(--accent1) / 0.14)",
          borderColor: "hsl(var(--accent1) / 0.45)",
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "elvin-mazwimairi",
        href: profile.linkedin,
        icon: Linkedin,
        style: {
          backgroundColor: "hsl(var(--accent4) / 0.14)",
          borderColor: "hsl(var(--accent4) / 0.45)",
        },
      },
    ],
    [],
  );

  const captureCardCanvas = async () => {
    if (!cardRef.current) return null;
    return html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  };

  const handleDownloadImage = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "elvin-contact-card.png";
    link.click();
  };

  const handleNativeShare = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const file = dataUrlToFile(dataUrl, "elvin-contact-card.png");

    const canShareFiles =
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [file],
          title: "Elvin Contact Card",
          text: "Save my contact card.",
        });
        return;
      } catch {
        return;
      }
    }

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "Elvin Contact Card",
          text: "Connect with me directly.",
          url: qrValue,
        });
        return;
      } catch {
        return;
      }
    }

    await handleDownloadImage();
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl"
              >
                <div
                  className="pointer-events-none absolute -right-16 top-[-64px] h-44 w-44 rounded-full blur-3xl"
                  style={{ backgroundColor: "hsl(var(--accent2) / 0.25)" }}
                />
                <div
                  className="pointer-events-none absolute -left-20 bottom-[-92px] h-56 w-56 rounded-full blur-3xl"
                  style={{ backgroundColor: "hsl(var(--accent1) / 0.2)" }}
                />
                <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                  <div className="h-full w-full [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:22px_22px]" />
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center rounded-full border border-border bg-background/45 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-foreground/75">
                    Digital Contact Profile
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="h-24 w-24 rounded-2xl border border-white/25 object-cover shadow-[0_12px_28px_rgba(2,6,23,0.35)]"
                      />
                      <div className="absolute -bottom-2 -right-2 rounded-full border border-border bg-card/90 p-1">
                        <QrCode className="h-4 w-4 text-foreground/85" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-2xl font-bold leading-tight text-foreground">{profile.name}</h1>
                      <p className="mt-1 text-sm text-foreground/80">{profile.title}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-foreground/58">
                        {profile.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    {channels.slice(0, 2).map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <a
                          key={channel.id}
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-between rounded-xl border px-3 py-2 transition hover:bg-background/55"
                          style={channel.style}
                        >
                          <span className="inline-flex items-center gap-2 text-sm text-foreground">
                            <Icon className="h-4 w-4" />
                            {channel.label}
                          </span>
                          <span className="text-xs text-foreground/72">{channel.value}</span>
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl border border-border bg-background/35 p-3">
                    <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Core Focus</p>
                    <ul className="mt-2 grid gap-1.5 text-sm text-foreground/82">
                      {specialties.map((specialty) => (
                        <li key={specialty} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent2" />
                          <span>{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 }}
                className="space-y-4"
              >
                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                    Contact Card Actions
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Save this card, share it directly, or send it to someone instantly with QR.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a href={profile.vcf} download="engelvinContact.vcf">
                      <Button className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Add to Phone (.vcf)
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleDownloadImage}>
                      <Download className="mr-2 h-4 w-4" />
                      Save as Image
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleNativeShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Contact
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => setShowQrOverlay(true)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Fullscreen QR
                    </Button>
                  </div>
                </section>

                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Direct Channels</p>
                  <div className="mt-3 grid gap-2">
                    {channels.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <a
                          key={`direct-${channel.id}`}
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group rounded-2xl border px-3 py-2 transition hover:bg-background/60"
                          style={channel.style}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-2 text-sm text-foreground">
                              <Icon className="h-4 w-4" />
                              {channel.label}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-foreground/60 transition group-hover:text-foreground" />
                          </div>
                          <p className="mt-1 text-xs text-foreground/72">{channel.value}</p>
                        </a>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      {showQrOverlay && (
        <div
          className="fixed inset-0 z-[130] bg-black/58 p-4 backdrop-blur-md md:p-8"
          onClick={() => setShowQrOverlay(false)}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
            className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/25 bg-primary/80 backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="truncate text-xs uppercase tracking-[0.12em] text-white/68">Scan to Connect</p>
                <p className="truncate text-sm font-semibold text-white">Elvin Contact QR</p>
              </div>
              <button
                onClick={() => setShowQrOverlay(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid flex-1 place-items-center p-5 md:p-8">
              <div className="relative rounded-2xl border border-white/22 bg-white p-4 shadow-[0_20px_54px_rgba(2,6,23,0.45)]">
                <QRCodeCanvas value={qrValue} size={qrSize} />
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute left-2 right-2 h-[2px] bg-cyan-400/80"
                    animate={{ y: [8, qrSize + 8, 8] }}
                    transition={{ duration: 2.7, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}








import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Share2,
  X,
} from "lucide-react";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Button } from "@/components/ui/button";
import { useBackNavigation } from "@/hooks/use-back-navigation";

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
};

const profile = {
  name: "Elvin E. Mazwimairi",
  title: "Electrical Engineer x Systems Developer",
  tagline: "Innovation • Systems • Energy • Software",
  image: "/prof.jpg",
  phone: "+263783074722",
  email: "elvinmazwimairi@gmail.com",
  linkedin: "https://linkedin.com/in/elvin-mazwimairi",
  whatsapp: "https://wa.me/263783074722",
  vcf: "/contact.vcf",
};

const specialties = [
  "Renewable Energy and Power System Design",
  "Embedded and Control Systems Integration",
  "Software and Custom System Development",
  "Engineering Simulation and Project Delivery",
];

function dataUrlToFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/png";
  const bstr = atob(arr[1] ?? "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

export default function ContactProfilePage() {
  const goBack = useBackNavigation("/");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [showQrOverlay, setShowQrOverlay] = useState(false);

  const qrValue =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.elvinmazwi.me/contact-profile-card";

  const qrSize = typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 320;

  const channels = useMemo<ContactChannel[]>(
    () => [
      {
        id: "phone",
        label: "Call",
        value: profile.phone,
        href: `tel:${profile.phone}`,
        icon: Phone,
        style: {
          backgroundColor: "hsl(var(--accent2) / 0.14)",
          borderColor: "hsl(var(--accent2) / 0.45)",
        },
      },
      {
        id: "email",
        label: "Email",
        value: profile.email,
        href: `mailto:${profile.email}`,
        icon: Mail,
        style: {
          backgroundColor: "hsl(var(--accent3) / 0.14)",
          borderColor: "hsl(var(--accent3) / 0.45)",
        },
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: profile.phone,
        href: profile.whatsapp,
        icon: MessageSquare,
        style: {
          backgroundColor: "hsl(var(--accent1) / 0.14)",
          borderColor: "hsl(var(--accent1) / 0.45)",
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "elvin-mazwimairi",
        href: profile.linkedin,
        icon: Linkedin,
        style: {
          backgroundColor: "hsl(var(--accent4) / 0.14)",
          borderColor: "hsl(var(--accent4) / 0.45)",
        },
      },
    ],
    [],
  );

  const captureCardCanvas = async () => {
    if (!cardRef.current) return null;
    return html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  };

  const handleDownloadImage = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "elvin-contact-card.png";
    link.click();
  };

  const handleNativeShare = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const file = dataUrlToFile(dataUrl, "elvin-contact-card.png");

    const canShareFiles =
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [file],
          title: "Elvin Contact Card",
          text: "Save my contact card.",
        });
        return;
      } catch {
        return;
      }
    }

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "Elvin Contact Card",
          text: "Connect with me directly.",
          url: qrValue,
        });
        return;
      } catch {
        return;
      }
    }

    await handleDownloadImage();
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-border bg-card/75 p-3 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="h-16 w-16 rounded-xl border border-white/25 object-cover shadow-[0_10px_22px_rgba(2,6,23,0.3)]"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{profile.name}</p>
                      <p className="truncate text-xs text-foreground/72">{profile.title}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-foreground/58">
                        Profile badge outside front/back card
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  ref={cardRef}
                  className="relative overflow-hidden rounded-3xl border border-border bg-card/72 p-3 backdrop-blur-xl md:p-4"
                >
                  <div
                    className="pointer-events-none absolute -right-20 top-[-60px] h-44 w-44 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent2) / 0.18)" }}
                  />
                  <div
                    className="pointer-events-none absolute -left-24 bottom-[-96px] h-56 w-56 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent1) / 0.16)" }}
                  />

                  <div className="relative grid gap-3 md:grid-cols-2">
                    <article className="relative overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4">
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent1))_0%,hsl(var(--accent2))_48%,hsl(var(--accent4))_100%)] opacity-70" />
                      <p className="text-[10px] uppercase tracking-[0.12em] text-foreground/55">Front</p>
                      <h1 className="mt-4 text-3xl font-semibold leading-[0.98] text-foreground sm:text-[2rem]">
                        Elvin E.
                        <br />
                        Mazwimairi
                      </h1>
                      <p className="mt-4 text-sm font-medium text-foreground/88">
                        Electrical Engineer | Systems Developer
                      </p>
                      <p className="mt-1 text-xs text-foreground/64">
                        efficient systems for performance and reliability
                      </p>

                      <ul className="mt-5 grid gap-1.5 text-xs text-foreground/78">
                        {specialties.map((specialty) => (
                          <li key={`front-${specialty}`} className="flex items-start gap-2">
                            <span className="mt-[2px] text-[10px] text-foreground/65">▶</span>
                            <span>{specialty}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-5 border-t border-border pt-2 text-[11px] uppercase tracking-[0.08em] text-foreground/58">
                        Design smart systems for energy, grids and control
                      </p>
                    </article>

                    <article className="relative overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4">
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent4))_0%,hsl(var(--accent2))_52%,hsl(var(--accent1))_100%)] opacity-70" />
                      <div className="flex items-center justify-between gap-2 text-[11px] text-foreground/78">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {profile.phone}
                        </span>
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <Linkedin className="h-3.5 w-3.5" />
                          @elvin-mazwimairi
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-border bg-card/70 p-2">
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            Portfolio
                          </p>
                          <div className="grid place-items-center rounded-lg bg-white p-2">
                            <QRCodeCanvas value={qrValue} size={92} />
                          </div>
                        </div>
                        <div className="rounded-xl border border-border bg-card/70 p-2">
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            WhatsApp
                          </p>
                          <div className="grid place-items-center rounded-lg bg-white p-2">
                            <QRCodeCanvas value={profile.whatsapp} size={92} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-border bg-card/70 px-3 py-2 text-center">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-foreground/55">Email Me</p>
                        <p className="mt-1 text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
                          elvin@elvinmazwi.me
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-foreground/72">
                        <span>Medium</span>
                        <span>YouTube</span>
                        <span>Instagram</span>
                        <span>Facebook</span>
                        <span>X</span>
                      </div>

                      <div className="mt-3 border-t border-border pt-2 text-center text-[11px] text-foreground/64">
                        Alternative: {profile.email}
                      </div>
                    </article>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 }}
                className="space-y-4"
              >
                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                    Contact Card Actions
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Save this card, share it directly, or send it to someone instantly with QR.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a href={profile.vcf} download="engelvinContact.vcf">
                      <Button className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Add to Phone (.vcf)
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleDownloadImage}>
                      <Download className="mr-2 h-4 w-4" />
                      Save as Image
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleNativeShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Contact
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => setShowQrOverlay(true)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Fullscreen QR
                    </Button>
                  </div>
                </section>

                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Direct Channels</p>
                  <div className="mt-3 grid gap-2">
                    {channels.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <a
                          key={`direct-${channel.id}`}
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group rounded-2xl border px-3 py-2 transition hover:bg-background/60"
                          style={channel.style}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-2 text-sm text-foreground">
                              <Icon className="h-4 w-4" />
                              {channel.label}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-foreground/60 transition group-hover:text-foreground" />
                          </div>
                          <p className="mt-1 text-xs text-foreground/72">{channel.value}</p>
                        </a>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      {showQrOverlay && (
        <div
          className="fixed inset-0 z-[130] bg-black/58 p-4 backdrop-blur-md md:p-8"
          onClick={() => setShowQrOverlay(false)}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
            className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/25 bg-primary/80 backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="truncate text-xs uppercase tracking-[0.12em] text-white/68">Scan to Connect</p>
                <p className="truncate text-sm font-semibold text-white">Elvin Contact QR</p>
              </div>
              <button
                onClick={() => setShowQrOverlay(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid flex-1 place-items-center p-5 md:p-8">
              <div className="relative rounded-2xl border border-white/22 bg-white p-4 shadow-[0_20px_54px_rgba(2,6,23,0.45)]">
                <QRCodeCanvas value={qrValue} size={qrSize} />
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute left-2 right-2 h-[2px] bg-cyan-400/80"
                    animate={{ y: [8, qrSize + 8, 8] }}
                    transition={{ duration: 2.7, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}






import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Share2,
  X,
} from "lucide-react";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Button } from "@/components/ui/button";
import { useBackNavigation } from "@/hooks/use-back-navigation";

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
};

const profile = {
  name: "Elvin E. Mazwimairi",
  title: "Electrical Engineer x Systems Developer",
  tagline: "Innovation • Systems • Energy • Software",
  image: "/prof.jpg",
  phone: "+263783074722",
  email: "elvinmazwimairi@gmail.com",
  linkedin: "https://linkedin.com/in/elvin-mazwimairi",
  whatsapp: "https://wa.me/263783074722",
  vcf: "/contact.vcf",
};

const specialties = [
  "Renewable Energy and Power System Design",
  "Embedded and Control Systems Integration",
  "Software and Custom System Development",
  "Engineering Simulation and Project Delivery",
];

function dataUrlToFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/png";
  const bstr = atob(arr[1] ?? "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

export default function ContactProfilePage() {
  const goBack = useBackNavigation("/");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [showQrOverlay, setShowQrOverlay] = useState(false);

  const qrValue =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.elvinmazwi.me/contact-profile-card";

  const qrSize = typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 320;
  const cardQrSize =
    typeof window !== "undefined"
      ? window.innerWidth < 420
        ? 72
        : window.innerWidth < 640
          ? 82
          : 92
      : 92;

  const channels = useMemo<ContactChannel[]>(
    () => [
      {
        id: "phone",
        label: "Call",
        value: profile.phone,
        href: `tel:${profile.phone}`,
        icon: Phone,
        style: {
          backgroundColor: "hsl(var(--accent2) / 0.14)",
          borderColor: "hsl(var(--accent2) / 0.45)",
        },
      },
      {
        id: "email",
        label: "Email",
        value: profile.email,
        href: `mailto:${profile.email}`,
        icon: Mail,
        style: {
          backgroundColor: "hsl(var(--accent3) / 0.14)",
          borderColor: "hsl(var(--accent3) / 0.45)",
        },
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: profile.phone,
        href: profile.whatsapp,
        icon: MessageSquare,
        style: {
          backgroundColor: "hsl(var(--accent1) / 0.14)",
          borderColor: "hsl(var(--accent1) / 0.45)",
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "elvin-mazwimairi",
        href: profile.linkedin,
        icon: Linkedin,
        style: {
          backgroundColor: "hsl(var(--accent4) / 0.14)",
          borderColor: "hsl(var(--accent4) / 0.45)",
        },
      },
    ],
    [],
  );

  const captureCardCanvas = async () => {
    if (!cardRef.current) return null;
    return html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  };

  const handleDownloadImage = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "elvin-contact-card.png";
    link.click();
  };

  const handleNativeShare = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const file = dataUrlToFile(dataUrl, "elvin-contact-card.png");

    const canShareFiles =
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [file],
          title: "Elvin Contact Card",
          text: "Save my contact card.",
        });
        return;
      } catch {
        return;
      }
    }

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "Elvin Contact Card",
          text: "Connect with me directly.",
          url: qrValue,
        });
        return;
      } catch {
        return;
      }
    }

    await handleDownloadImage();
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-border bg-card/75 px-3 py-2 backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/58">
                    Dual-Side Contact Card • Front and Back
                  </p>
                </div>

                <div
                  ref={cardRef}
                  className="relative overflow-hidden rounded-3xl border border-border bg-card/72 p-3 backdrop-blur-xl md:p-4"
                >
                  <div
                    className="pointer-events-none absolute -right-20 top-[-60px] h-44 w-44 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent2) / 0.18)" }}
                  />
                  <div
                    className="pointer-events-none absolute -left-24 bottom-[-96px] h-56 w-56 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent1) / 0.16)" }}
                  />

                  <div className="relative grid gap-3 [perspective:1400px] md:grid-cols-2">
                    <motion.article
                      whileHover={{
                        y: -6,
                        rotateX: 1.5,
                        rotateY: -2,
                        scale: 1.008,
                      }}
                      transition={{ type: "spring", stiffness: 230, damping: 22 }}
                      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4 sm:min-h-[390px] sm:p-5"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent1))_0%,hsl(var(--accent2))_48%,hsl(var(--accent4))_100%)] opacity-80" />
                      <div className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle_at_20%_20%,hsl(var(--accent1))_0%,transparent_40%),radial-gradient(circle_at_80%_80%,hsl(var(--accent2))_0%,transparent_40%)]" />

                      {/* <div className="relative z-10 flex items-start justify-between gap-3">
                        <p className="rounded-full border border-border bg-card/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground/60">
                          Front
                        </p>
                        <motion.img
                          whileHover={{ scale: 1.04, rotate: -1.5 }}
                          src={profile.image}
                          alt={profile.name}
                          className="h-16 w-16 rounded-xl border border-white/35 object-cover shadow-[0_12px_24px_rgba(2,6,23,0.35)] sm:h-20 sm:w-20"
                        />
                      </div> */}

                      <h1 className="relative z-10 mt-4 text-3xl font-semibold leading-[0.98] text-foreground sm:text-[2rem]">
                        Elvin E.
                        <br />
                        Mazwimairi
                      </h1>
                      <p className="relative z-10 mt-4 text-sm font-medium text-foreground/88">
                        Electrical Engineer | Systems Developer
                      </p>
                      <p className="relative z-10 mt-1 text-xs text-foreground/64">
                        efficient systems for performance and reliability
                      </p>

                      <ul className="relative z-10 mt-5 grid gap-1.5 text-[11px] text-foreground/78 sm:text-xs">
                        {specialties.map((specialty) => (
                          <li key={`front-${specialty}`} className="flex items-start gap-2">
                            <span className="mt-[2px] text-[10px] text-foreground/65">▶</span>
                            <span>{specialty}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="relative z-10 mt-5 border-t border-border pt-2 text-[11px] uppercase tracking-[0.08em] text-foreground/58">
                        Design smart systems for energy, grids and control
                      </p>
                    </motion.article>

                    <motion.article
                      whileHover={{
                        y: -6,
                        rotateX: 1.5,
                        rotateY: 2,
                        scale: 1.008,
                      }}
                      transition={{ type: "spring", stiffness: 230, damping: 22 }}
                      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4 sm:min-h-[390px] sm:p-5"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent4))_0%,hsl(var(--accent2))_52%,hsl(var(--accent1))_100%)] opacity-80" />
                      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_80%_16%,hsl(var(--accent4))_0%,transparent_36%),radial-gradient(circle_at_15%_85%,hsl(var(--accent2))_0%,transparent_42%)]" />

                      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] text-foreground/78">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {profile.phone}
                        </span>
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <Linkedin className="h-3.5 w-3.5" />
                          @elvin-mazwimairi
                        </span>
                      </div>

                      <div className="relative z-10 mt-4 grid grid-cols-2 gap-3">
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-border bg-card/70 p-2"
                        >
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            Portfolio
                          </p>
                          <div className="grid place-items-center rounded-lg bg-white p-2">
                            <QRCodeCanvas value={qrValue} size={cardQrSize} />
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-border bg-card/70 p-2"
                        >
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            WhatsApp
                          </p>
                          <div className="grid place-items-center rounded-lg bg-white p-2">
                            <QRCodeCanvas value={profile.whatsapp} size={cardQrSize} />
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative z-10 mt-4 rounded-xl border border-border bg-card/70 px-3 py-2 text-center">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-foreground/55">Email Me</p>
                        <p className="mt-1 text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
                          elvin@elvinmazwi.me
                        </p>
                      </div>

                      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-foreground/72">
                        <span>Medium</span>
                        <span>YouTube</span>
                        <span>Instagram</span>
                        <span>Facebook</span>
                        <span>X</span>
                      </div>

                      <div className="relative z-10 mt-3 border-t border-border pt-2 text-center text-[11px] text-foreground/64">
                        Alternative: {profile.email}
                      </div>
                    </motion.article>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 }}
                className="space-y-4"
              >
                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                    Contact Card Actions
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Save both sides, share them directly, or send your profile instantly with QR.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a href={profile.vcf} download="engelvinContact.vcf">
                      <Button className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Add to Phone (.vcf)
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleDownloadImage}>
                      <Download className="mr-2 h-4 w-4" />
                      Save as Image
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleNativeShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Contact
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => setShowQrOverlay(true)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Fullscreen QR
                    </Button>
                  </div>
                </section>

                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Direct Channels</p>
                  <div className="mt-3 grid gap-2">
                    {channels.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <a
                          key={`direct-${channel.id}`}
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group rounded-2xl border px-3 py-2 transition hover:bg-background/60"
                          style={channel.style}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-2 text-sm text-foreground">
                              <Icon className="h-4 w-4" />
                              {channel.label}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-foreground/60 transition group-hover:text-foreground" />
                          </div>
                          <p className="mt-1 text-xs text-foreground/72">{channel.value}</p>
                        </a>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      {showQrOverlay && (
        <div
          className="fixed inset-0 z-[130] bg-black/58 p-4 backdrop-blur-md md:p-8"
          onClick={() => setShowQrOverlay(false)}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
            className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/25 bg-primary/80 backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="truncate text-xs uppercase tracking-[0.12em] text-white/68">Scan to Connect</p>
                <p className="truncate text-sm font-semibold text-white">Elvin Contact QR</p>
              </div>
              <button
                onClick={() => setShowQrOverlay(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid flex-1 place-items-center p-5 md:p-8">
              <div className="relative rounded-2xl border border-white/22 bg-white p-4 shadow-[0_20px_54px_rgba(2,6,23,0.45)]">
                <QRCodeCanvas value={qrValue} size={qrSize} />
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute left-2 right-2 h-[2px] bg-cyan-400/80"
                    animate={{ y: [8, qrSize + 8, 8] }}
                    transition={{ duration: 2.7, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}



import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Share2,
  X,
} from "lucide-react";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Button } from "@/components/ui/button";
import { useBackNavigation } from "@/hooks/use-back-navigation";

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
};

const profile = {
  name: "Elvin E. Mazwimairi",
  title: "Electrical Engineer x Systems Developer",
  tagline: "Innovation • Systems • Energy • Software",
  image: "/prof.jpg",
  phone: "+263783074722",
  email: "elvinmazwimairi@gmail.com",
  linkedin: "https://linkedin.com/in/elvin-mazwimairi",
  whatsapp: "https://wa.me/263783074722",
  vcf: "/contact.vcf",
};

const specialties = [
  "Renewable Energy and Power System Design",
  "Embedded and Control Systems Integration",
  "Software and Custom System Development",
  "Engineering Simulation and Project Delivery",
];

function dataUrlToFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/png";
  const bstr = atob(arr[1] ?? "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

export default function ContactProfilePage() {
  const goBack = useBackNavigation("/");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [showQrOverlay, setShowQrOverlay] = useState(false);

  const qrValue =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.elvinmazwi.me/contact-profile-card";

  const qrSize = typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 320;
  const cardQrSize =
    typeof window !== "undefined"
      ? window.innerWidth < 420
        ? 72
        : window.innerWidth < 640
          ? 82
          : 92
      : 92;

  const channels = useMemo<ContactChannel[]>(
    () => [
      {
        id: "phone",
        label: "Call",
        value: profile.phone,
        href: `tel:${profile.phone}`,
        icon: Phone,
        style: {
          backgroundColor: "hsl(var(--accent2) / 0.14)",
          borderColor: "hsl(var(--accent2) / 0.45)",
        },
      },
      {
        id: "email",
        label: "Email",
        value: profile.email,
        href: `mailto:${profile.email}`,
        icon: Mail,
        style: {
          backgroundColor: "hsl(var(--accent3) / 0.14)",
          borderColor: "hsl(var(--accent3) / 0.45)",
        },
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: profile.phone,
        href: profile.whatsapp,
        icon: MessageSquare,
        style: {
          backgroundColor: "hsl(var(--accent1) / 0.14)",
          borderColor: "hsl(var(--accent1) / 0.45)",
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "elvin-mazwimairi",
        href: profile.linkedin,
        icon: Linkedin,
        style: {
          backgroundColor: "hsl(var(--accent4) / 0.14)",
          borderColor: "hsl(var(--accent4) / 0.45)",
        },
      },
    ],
    [],
  );

  const captureCardCanvas = async () => {
    if (!cardRef.current) return null;
    return html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  };

  const handleDownloadImage = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "elvin-contact-card.png";
    link.click();
  };

  const handleNativeShare = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const file = dataUrlToFile(dataUrl, "elvin-contact-card.png");

    const canShareFiles =
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [file],
          title: "Elvin Contact Card",
          text: "Save my contact card.",
        });
        return;
      } catch {
        return;
      }
    }

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "Elvin Contact Card",
          text: "Connect with me directly.",
          url: qrValue,
        });
        return;
      } catch {
        return;
      }
    }

    await handleDownloadImage();
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-border bg-card/75 px-3 py-2 backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/58">
                    Dual-Side Contact Card • Front and Back
                  </p>
                </div>

                <div
                  ref={cardRef}
                  className="relative overflow-hidden rounded-3xl border border-border bg-card/72 p-3 backdrop-blur-xl md:p-4"
                >
                  <div
                    className="pointer-events-none absolute -right-20 top-[-60px] h-44 w-44 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent2) / 0.18)" }}
                  />
                  <div
                    className="pointer-events-none absolute -left-24 bottom-[-96px] h-56 w-56 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent1) / 0.16)" }}
                  />

                  <div className="relative grid gap-3 [perspective:1400px] md:grid-cols-2">
                    <motion.article
                      whileHover={{
                        y: -6,
                        rotateX: 1.5,
                        rotateY: -2,
                        scale: 1.008,
                      }}
                      transition={{ type: "spring", stiffness: 230, damping: 22 }}
                      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4 sm:min-h-[390px] sm:p-5"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent1))_0%,hsl(var(--accent2))_48%,hsl(var(--accent4))_100%)] opacity-80" />
                      <div className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle_at_20%_20%,hsl(var(--accent1))_0%,transparent_40%),radial-gradient(circle_at_80%_80%,hsl(var(--accent2))_0%,transparent_40%)]" />

                      {/* <div className="relative z-10 flex items-start justify-between gap-3">
                        <p className="rounded-full border border-border bg-card/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground/60">
                          Front
                        </p>
                        <motion.img
                          whileHover={{ scale: 1.04, rotate: -1.5 }}
                          src={profile.image}
                          alt={profile.name}
                          className="h-16 w-16 rounded-xl border border-white/35 object-cover shadow-[0_12px_24px_rgba(2,6,23,0.35)] sm:h-20 sm:w-20"
                        />
                      </div> */}

                      <h1 className="relative z-10 mt-4 text-3xl font-semibold leading-[0.98] text-foreground sm:text-[2rem]">
                        Elvin E.
                        <br />
                        Mazwimairi
                      </h1>
                      <p className="relative z-10 mt-4 text-sm font-medium text-foreground/88">
                        Electrical Engineer | Systems Developer
                      </p>
                      <p className="relative z-10 mt-1 text-xs text-foreground/64">
                        efficient systems for performance and reliability
                      </p>

                      <ul className="relative z-10 mt-5 grid gap-1.5 text-[11px] text-foreground/78 sm:text-xs">
                        {specialties.map((specialty) => (
                          <li key={`front-${specialty}`} className="flex items-start gap-2">
                            <span className="mt-[2px] text-[10px] text-foreground/65">▶</span>
                            <span>{specialty}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="relative z-10 mt-5 border-t border-border pt-2 text-[11px] uppercase tracking-[0.08em] text-foreground/58">
                        Design smart systems for energy, grids and control
                      </p>
                    </motion.article>

                    <motion.article
                      whileHover={{
                        y: -6,
                        rotateX: 1.5,
                        rotateY: 2,
                        scale: 1.008,
                      }}
                      transition={{ type: "spring", stiffness: 230, damping: 22 }}
                      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4 sm:min-h-[390px] sm:p-5"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent4))_0%,hsl(var(--accent2))_52%,hsl(var(--accent1))_100%)] opacity-80" />
                      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_80%_16%,hsl(var(--accent4))_0%,transparent_36%),radial-gradient(circle_at_15%_85%,hsl(var(--accent2))_0%,transparent_42%)]" />

                      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] text-foreground/78">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {profile.phone}
                        </span>
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <Linkedin className="h-3.5 w-3.5" />
                          @elvin-mazwimairi
                        </span>
                      </div>

                      <div className="relative z-10 mt-4 grid grid-cols-2 gap-3">
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-border bg-card/70 p-2"
                        >
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            Portfolio
                          </p>
                          <div className="grid place-items-center rounded-lg bg-white p-2">
                            <QRCodeCanvas value={qrValue} size={cardQrSize} />
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-border bg-card/70 p-2"
                        >
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            WhatsApp
                          </p>
                          <div className="grid place-items-center rounded-lg bg-white p-2">
                            <QRCodeCanvas value={profile.whatsapp} size={cardQrSize} />
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative z-10 mt-4 rounded-xl border border-border bg-card/70 px-3 py-2 text-center">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-foreground/55">Email Me</p>
                        <p className="mt-1 text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
                          elvin@elvinmazwi.me
                        </p>
                      </div>

                      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-foreground/72">
                        <span>Medium</span>
                        <span>YouTube</span>
                        <span>Instagram</span>
                        <span>Facebook</span>
                        <span>X</span>
                      </div>

                      <div className="relative z-10 mt-3 border-t border-border pt-2 text-center text-[11px] text-foreground/64">
                        Alternative: {profile.email}
                      </div>
                    </motion.article>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 }}
                className="space-y-4"
              >
                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                    Contact Card Actions
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Save both sides, share them directly, or send your profile instantly with QR.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a href={profile.vcf} download="engelvinContact.vcf">
                      <Button className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Add to Phone (.vcf)
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleDownloadImage}>
                      <Download className="mr-2 h-4 w-4" />
                      Save as Image
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleNativeShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Contact
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => setShowQrOverlay(true)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Fullscreen QR
                    </Button>
                  </div>
                </section>

                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Direct Channels</p>
                  <div className="mt-3 grid gap-2">
                    {channels.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <a
                          key={`direct-${channel.id}`}
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group rounded-2xl border px-3 py-2 transition hover:bg-background/60"
                          style={channel.style}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-2 text-sm text-foreground">
                              <Icon className="h-4 w-4" />
                              {channel.label}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-foreground/60 transition group-hover:text-foreground" />
                          </div>
                          <p className="mt-1 text-xs text-foreground/72">{channel.value}</p>
                        </a>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      {showQrOverlay && (
        <div
          className="fixed inset-0 z-[130] bg-black/58 p-4 backdrop-blur-md md:p-8"
          onClick={() => setShowQrOverlay(false)}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
            className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/25 bg-primary/80 backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="truncate text-xs uppercase tracking-[0.12em] text-white/68">Scan to Connect</p>
                <p className="truncate text-sm font-semibold text-white">Elvin Contact QR</p>
              </div>
              <button
                onClick={() => setShowQrOverlay(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid flex-1 place-items-center p-5 md:p-8">
              <div className="relative rounded-2xl border border-white/22 bg-white p-4 shadow-[0_20px_54px_rgba(2,6,23,0.45)]">
                <QRCodeCanvas value={qrValue} size={qrSize} />
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute left-2 right-2 h-[2px] bg-cyan-400/80"
                    animate={{ y: [8, qrSize + 8, 8] }}
                    transition={{ duration: 2.7, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}



import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Share2,
  X,
} from "lucide-react";
import { Link } from "wouter";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Button } from "@/components/ui/button";
import { useBackNavigation } from "@/hooks/use-back-navigation";

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
};

const profile = {
  name: "Elvin E. Mazwimairi",
  title: "Electrical Engineer x Systems Developer",
  tagline: "Innovation • Systems • Energy • Software",
  image: "/prof.jpg",
  phone: "+263783074722",
  email: "elvinmazwimairi@gmail.com",
  linkedin: "https://linkedin.com/in/elvin-mazwimairi",
  whatsapp: "https://wa.me/263783074722",
  vcf: "/contact.vcf",
};

const specialties = [
  "Renewable Energy and Power System Design",
  "Embedded and Control Systems Integration",
  "Software and Custom System Development",
  "Engineering Simulation and Project Delivery",
];

const platformLinks = [
  { label: "Medium", href: "/blog", external: false },
  { label: "Projects", href: "/projects", external: false },
  { label: "Instagram", href: "https://instagram.com/young_mazwi", external: true },
  { label: "GitHub", href: "https://github.com/elvin2words", external: true },
  { label: "X", href: "https://x.com/young_mazwi", external: true },
];

function dataUrlToFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/png";
  const bstr = atob(arr[1] ?? "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

export default function ContactProfilePage() {
  const goBack = useBackNavigation("/");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [showQrOverlay, setShowQrOverlay] = useState(false);

  const qrValue =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.elvinmazwi.me/contact-profile-card";

  const qrSize = typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 320;
  const cardQrSize =
    typeof window !== "undefined"
      ? window.innerWidth < 420
        ? 72
        : window.innerWidth < 640
          ? 82
          : 92
      : 92;

  const channels = useMemo<ContactChannel[]>(
    () => [
      {
        id: "phone",
        label: "Call",
        value: profile.phone,
        href: `tel:${profile.phone}`,
        icon: Phone,
        style: {
          backgroundColor: "hsl(var(--accent2) / 0.14)",
          borderColor: "hsl(var(--accent2) / 0.45)",
        },
      },
      {
        id: "email",
        label: "Email",
        value: profile.email,
        href: `mailto:${profile.email}`,
        icon: Mail,
        style: {
          backgroundColor: "hsl(var(--accent3) / 0.14)",
          borderColor: "hsl(var(--accent3) / 0.45)",
        },
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: profile.phone,
        href: profile.whatsapp,
        icon: MessageSquare,
        style: {
          backgroundColor: "hsl(var(--accent1) / 0.14)",
          borderColor: "hsl(var(--accent1) / 0.45)",
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "elvin-mazwimairi",
        href: profile.linkedin,
        icon: Linkedin,
        style: {
          backgroundColor: "hsl(var(--accent4) / 0.14)",
          borderColor: "hsl(var(--accent4) / 0.45)",
        },
      },
    ],
    [],
  );

  const captureCardCanvas = async () => {
    if (!cardRef.current) return null;
    return html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  };

  const handleDownloadImage = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "elvin-contact-card.png";
    link.click();
  };

  const handleNativeShare = async () => {
    const canvas = await captureCardCanvas();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const file = dataUrlToFile(dataUrl, "elvin-contact-card.png");

    const canShareFiles =
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [file],
          title: "Elvin Contact Card",
          text: "Save my contact card.",
        });
        return;
      } catch {
        return;
      }
    }

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "Elvin Contact Card",
          text: "Connect with me directly.",
          url: qrValue,
        });
        return;
      } catch {
        return;
      }
    }

    await handleDownloadImage();
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-border bg-card/75 px-3 py-2 backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/58">
                    Dual-Side Contact Card • Front and Back
                  </p>
                </div>

                <div
                  ref={cardRef}
                  className="relative overflow-hidden rounded-3xl border border-border bg-card/72 p-3 backdrop-blur-xl md:p-4"
                >
                  <div
                    className="pointer-events-none absolute -right-20 top-[-60px] h-44 w-44 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent2) / 0.18)" }}
                  />
                  <div
                    className="pointer-events-none absolute -left-24 bottom-[-96px] h-56 w-56 rounded-full blur-3xl"
                    style={{ backgroundColor: "hsl(var(--accent1) / 0.16)" }}
                  />

                  <div className="relative grid gap-3 [perspective:1400px] md:grid-cols-2">
                    <motion.article
                      whileHover={{
                        y: -6,
                        rotateX: 1.5,
                        rotateY: -2,
                        scale: 1.008,
                      }}
                      transition={{ type: "spring", stiffness: 230, damping: 22 }}
                      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4 sm:min-h-[390px] sm:p-5"
                      style={{
                        transformStyle: "preserve-3d",
                        backgroundImage:
                          "linear-gradient(165deg, hsl(var(--background)) 0%, hsl(var(--card)) 60%, hsl(var(--accent1) / 0.16) 100%)",
                      }}
                    >
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent1))_0%,hsl(var(--accent2))_48%,hsl(var(--accent4))_100%)] opacity-80" />
                      <div className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle_at_20%_20%,hsl(var(--accent1))_0%,transparent_40%),radial-gradient(circle_at_80%_80%,hsl(var(--accent2))_0%,transparent_40%)]" />

                      {/* <div className="relative z-10 flex items-start justify-between gap-3">
                        <p className="rounded-full border border-border bg-card/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground/60">
                          Front
                        </p>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open LinkedIn profile"
                          className="rounded-xl transition hover:-translate-y-0.5"
                        >
                          <motion.img
                            whileHover={{ scale: 1.04, rotate: -1.5 }}
                            src={profile.image}
                            alt={profile.name}
                            className="h-16 w-16 rounded-xl border border-white/35 object-cover shadow-[0_12px_24px_rgba(2,6,23,0.35)] sm:h-20 sm:w-20"
                          />
                        </a>
                      </div> */}

                      <h1 className="relative z-10 mt-4 text-3xl font-semibold leading-[0.98] text-foreground sm:text-[2rem]">
                        Elvin E.
                        <br />
                        Mazwimairi
                      </h1>
                      <Link
                        href="/hire"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        <span className="relative z-10 mt-4 inline-flex cursor-pointer rounded-lg border border-border bg-card/65 px-2.5 py-1.5 text-sm font-medium text-foreground/88 transition hover:bg-card">
                          Electrical Engineer | Systems Developer
                        </span>
                      </Link>
                      <p className="relative z-10 mt-1 text-xs text-foreground/64">
                        efficient systems for performance and reliability
                      </p>

                      <ul className="relative z-10 mt-5 grid gap-1.5 text-[11px] text-foreground/78 sm:text-xs">
                        {specialties.map((specialty) => (
                          <li key={`front-${specialty}`} className="flex items-start gap-2">
                            <span className="mt-[2px] text-[10px] text-foreground/65">▶</span>
                            <Link
                              href="/hire"
                              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >
                              <span className="cursor-pointer transition hover:text-foreground hover:underline">
                                {specialty}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <p className="relative z-10 mt-5 border-t border-border pt-2 text-[11px] uppercase tracking-[0.08em] text-foreground/58">
                        {profile.tagline}
                      </p>
                    </motion.article>

                    <motion.article
                      whileHover={{
                        y: -6,
                        rotateX: 1.5,
                        rotateY: 2,
                        scale: 1.008,
                      }}
                      transition={{ type: "spring", stiffness: 230, damping: 22 }}
                      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-[hsl(var(--background))] p-4 sm:min-h-[390px] sm:p-5"
                      style={{
                        transformStyle: "preserve-3d",
                        backgroundImage:
                          "linear-gradient(165deg, hsl(var(--background)) 0%, hsl(var(--card)) 58%, hsl(var(--accent4) / 0.15) 100%)",
                      }}
                    >
                      <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-[linear-gradient(to_right,hsl(var(--accent4))_0%,hsl(var(--accent2))_52%,hsl(var(--accent1))_100%)] opacity-80" />
                      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_80%_16%,hsl(var(--accent4))_0%,transparent_36%),radial-gradient(circle_at_15%_85%,hsl(var(--accent2))_0%,transparent_42%)]" />

                      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] text-foreground/78">
                        <a
                          href={`tel:${profile.phone}`}
                          className="inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 transition hover:bg-card/70 hover:text-foreground"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {profile.phone}
                        </a>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 truncate rounded-md px-1 py-0.5 transition hover:bg-card/70 hover:text-foreground"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                          @elvin-mazwimairi
                        </a>
                      </div>

                      <div className="relative z-10 mt-4 grid grid-cols-2 gap-3">
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-border bg-card/70 p-2"
                        >
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            What I Do
                          </p>
                          <div className="space-y-1 rounded-lg bg-background/55 p-2">
                            <Link
                              href="/hire"
                              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >
                              <span className="block cursor-pointer rounded-md border border-border px-2 py-1 text-center text-[11px] text-foreground/85 transition hover:bg-card">
                                Explore Services
                              </span>
                            </Link>
                            <Link
                              href="/projects"
                              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >
                              <span className="block cursor-pointer rounded-md border border-border px-2 py-1 text-center text-[11px] text-foreground/85 transition hover:bg-card">
                                View Projects
                              </span>
                            </Link>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-border bg-card/70 p-2"
                        >
                          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.08em] text-foreground/58">
                            WhatsApp
                          </p>
                          <div className="grid place-items-center rounded-lg bg-white p-2">
                            <QRCodeCanvas value={profile.whatsapp} size={cardQrSize} />
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative z-10 mt-4 rounded-xl border border-border bg-card/70 px-3 py-2 text-center">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-foreground/55">Email Me</p>
                        <a
                          href={`mailto:${profile.email}`}
                          className="mt-1 block text-xl font-semibold tracking-wide text-foreground transition hover:text-accent2 sm:text-2xl"
                        >
                          elvin@elvinmazwi.me
                        </a>
                      </div>

                      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-foreground/72">
                        {platformLinks.map((platform) => (
                          <a
                            key={platform.label}
                            href={platform.href}
                            target={platform.external ? "_blank" : undefined}
                            rel={platform.external ? "noopener noreferrer" : undefined}
                            className="rounded-md px-1.5 py-0.5 transition hover:bg-card/70 hover:text-foreground"
                          >
                            {platform.label}
                          </a>
                        ))}
                      </div>

                      <div className="relative z-10 mt-3 border-t border-border pt-2 text-center text-[11px] text-foreground/64">
                        Alternative:{" "}
                        <a
                          href={`mailto:${profile.email}`}
                          className="transition hover:text-foreground hover:underline"
                        >
                          {profile.email}
                        </a>
                      </div>
                    </motion.article>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 }}
                className="space-y-4"
              >
                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                    Contact Card Actions
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Save both sides, share them directly, or send your profile instantly with QR.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a href={profile.vcf} download="engelvinContact.vcf">
                      <Button className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Add to Phone (.vcf)
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleDownloadImage}>
                      <Download className="mr-2 h-4 w-4" />
                      Save as Image
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleNativeShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Contact
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => setShowQrOverlay(true)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Fullscreen QR
                    </Button>
                  </div>
                </section>

                <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-xl md:p-6">
                  <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Direct Channels</p>
                  <div className="mt-3 grid gap-2">
                    {channels.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <a
                          key={`direct-${channel.id}`}
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group rounded-2xl border px-3 py-2 transition hover:bg-background/60"
                          style={channel.style}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-2 text-sm text-foreground">
                              <Icon className="h-4 w-4" />
                              {channel.label}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-foreground/60 transition group-hover:text-foreground" />
                          </div>
                          <p className="mt-1 text-xs text-foreground/72">{channel.value}</p>
                        </a>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      {showQrOverlay && (
        <div
          className="fixed inset-0 z-[130] bg-black/58 p-4 backdrop-blur-md md:p-8"
          onClick={() => setShowQrOverlay(false)}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
            className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/25 bg-primary/80 backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="truncate text-xs uppercase tracking-[0.12em] text-white/68">Scan to Connect</p>
                <p className="truncate text-sm font-semibold text-white">Elvin Contact QR</p>
              </div>
              <button
                onClick={() => setShowQrOverlay(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid flex-1 place-items-center p-5 md:p-8">
              <div className="relative rounded-2xl border border-white/22 bg-white p-4 shadow-[0_20px_54px_rgba(2,6,23,0.45)]">
                <QRCodeCanvas value={qrValue} size={qrSize} />
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute left-2 right-2 h-[2px] bg-cyan-400/80"
                    animate={{ y: [8, qrSize + 8, 8] }}
                    transition={{ duration: 2.7, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
