import { forwardRef } from "react";

// Invisible field for spam bots that fill in every input they find; real
// users never see or focus it. Paired with lib/spam.ts on the server. Pass
// a ref when the field isn't inside a native <form> (so FormData can't read
// it) — the value can then be read directly via ref.current?.value.
const Honeypot = forwardRef<HTMLInputElement>(function Honeypot(_props, ref) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor="company_website">Leave this field blank</label>
      <input
        ref={ref}
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
});

export default Honeypot;
