import React from "react";

export default function ContactCard({
  href,
  icon,
  title,
  text,
  delay = 0,
  external = false,
  isPhone = false,
}) {
  const [isPhoneVisible, setIsPhoneVisible] = React.useState(false);
  const maskedPhone = "**********";

  const handleClick = (e) => {
    if (isPhone && !isPhoneVisible) {
      e.preventDefault();
      setIsPhoneVisible(true);
    }
  };

  const displayText = isPhone ? (isPhoneVisible ? text : maskedPhone) : text;
  const resolvedHref = isPhone && !isPhoneVisible ? "#" : href;

  return (
    <div className="reveal-up h-full" style={{ transitionDelay: `${delay}ms` }}>
      <a
        href={resolvedHref}
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group relative block h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
          <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        </div>

        <div className="relative w-fit rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
          {icon}
        </div>

        <h3 className="relative mt-4 text-xl font-semibold text-white">{title}</h3>
        <div className="relative mt-2 text-sm leading-7 text-slate-300">{displayText}</div>
      </a>
    </div>
  );
}