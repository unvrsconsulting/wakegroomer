"use client";

export default function TrackedPhoneLink({
  groomerId,
  phone,
  className,
}: {
  groomerId: number;
  phone: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${phone}`}
      className={className}
      onClick={() => {
        fetch("/api/analytics/tel-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ groomerId }),
          keepalive: true,
        }).catch(() => {});
      }}
    >
      {phone}
    </a>
  );
}
