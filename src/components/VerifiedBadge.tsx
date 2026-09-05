export default function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand-dark ${className}`}
      title="This business owner has verified this listing"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
        <path
          fillRule="evenodd"
          d="M10 1.5c.4 0 .77.2.99.53l1.1 1.65 1.93-.46a1.2 1.2 0 0 1 1.42.83l.56 1.9 1.9.56a1.2 1.2 0 0 1 .83 1.42l-.46 1.93 1.65 1.1c.33.22.53.6.53.99s-.2.77-.53.99l-1.65 1.1.46 1.93a1.2 1.2 0 0 1-.83 1.42l-1.9.56-.56 1.9a1.2 1.2 0 0 1-1.42.83l-1.93-.46-1.1 1.65a1.2 1.2 0 0 1-1.98 0l-1.1-1.65-1.93.46a1.2 1.2 0 0 1-1.42-.83l-.56-1.9-1.9-.56a1.2 1.2 0 0 1-.83-1.42l.46-1.93-1.65-1.1A1.2 1.2 0 0 1 1.5 10c0-.4.2-.77.53-.99l1.65-1.1-.46-1.93a1.2 1.2 0 0 1 .83-1.42l1.9-.56.56-1.9a1.2 1.2 0 0 1 1.42-.83l1.93.46 1.1-1.65c.22-.33.6-.53.99-.53Zm3.28 6.53a.75.75 0 0 0-1.06-1.06L9 10.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l2.25 2.25c.3.3.77.3 1.06 0l4-4Z"
          clipRule="evenodd"
        />
      </svg>
      Verified
    </span>
  );
}
