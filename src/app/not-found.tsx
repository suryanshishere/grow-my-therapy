import Link from "next/link";

export default function NotFound() {
  return <main className="min-h-screen bg-sand text-ocean flex flex-col items-center justify-center px-6 text-center">
    <p className="text-xs tracking-[.2em] uppercase mb-8">Dr. Maya Reynolds</p>
    <h1 className="font-serif text-5xl md:text-7xl mb-6">Let’s find your way back.</h1>
    <p className="text-sm leading-7 mb-8 max-w-sm">This page isn’t here. You can return to the homepage to explore therapy, meet Maya, and see the office.</p>
    <Link className="border border-ocean rounded-[100%] px-8 py-4 text-xs uppercase tracking-widest" href="/">Back to the homepage</Link>
  </main>;
}
