# Real testimonial outreach — copy/paste templates

The current 3 testimonials on the page are realistic placeholders. Goal: replace **at least 1** with a real, attributable quote (named hospital + role) before going live on paid ads.

CXOs read placeholder testimonials as fake within 3 seconds. One real one with a logo lifts perceived credibility more than 5 generic ones.

---

## Who to ask

Best targets — in priority order:

1. **A marketing head you've already produced 5+ videos for** (highest hit rate — they've felt the value)
2. **A repeat client** (3+ engagements over 12+ months)
3. **A client whose ads or OPD numbers visibly improved after your work**
4. **A friendly contact at a hospital you have an active conversation with** (lower hit rate but worth the ask)

Avoid asking former clients you've lost touch with — the cold ask reads as a salvage attempt.

---

## Template A — WhatsApp (most Indian B2B prefers this)

> Hi [Name], hope you're well. Quick favour — we're refreshing our website and would love to feature a short quote from you on the work we've done with [Hospital]. No fuss, just a sentence or two on what changed for your team. I've drafted something below — feel free to use as-is, edit, or write your own. Whatever's easiest.
>
> *"[We had X. After working with Qlarify, Y changed. The thing that made the difference was Z.]"*
>
> — [Your Name], [Role], [Hospital]
>
> If you're OK with it, we'll use your name + designation + hospital alongside the quote. Happy to share the page mock-up before it goes live. Thanks 🙏

---

## Template B — Email (more formal first contact)

**Subject:** Quick favour — short quote for our refreshed site?

> Hi [Name],
>
> Hope all's well. We're refreshing the Qlarify Health website and one of the sections needs to feature real voices from hospital marketing leaders we've worked with. I'd love to include a quote from you about the work we've done together at [Hospital].
>
> No drafting required — I've put together a starter below that you can use as-is, edit, or replace entirely:
>
> > *"We had [problem]. After working with Qlarify, [specific outcome] changed. The audit / mapping / structure made it easier to [decision or behaviour change]."*
> >
> > — [Your Name], [Designation], [Hospital]
>
> If you're comfortable, we'll publish the quote with your name, designation, and the hospital name — and I'll send you the page mock-up to approve before it goes live.
>
> Should take 3 minutes from your end. Let me know if it's OK.
>
> Thanks,
> [Your Name]
> Qlarify Health · +91 81474 10751

---

## What makes a strong testimonial — give them this brief

If the contact says "what should I write?", send them this:

> Three things that work best:
>
> 1. **A specific number or before/after** (cost-per-lead dropped X%, OPD walk-ins up Y, ₹ saved on cancelled shoots)
> 2. **A single moment of realisation** ("I didn't realise we had 47 videos in cardiology and zero in nephrology" — concrete, surprising)
> 3. **A quiet voice, not a sales pitch** — write it like you're telling a peer, not endorsing a vendor

Don't ask for "a glowing review." Ask for "the one thing that surprised you" — the honest answer is always better.

---

## Fallback options if no one says yes in 5 days

- **Anonymise but keep the hospital tier:** *"Marketing Head, leading South India hospital chain"* — still more credible than fully placeholder copy
- **Use a video-only testimonial:** ask for a 30-sec WhatsApp video clip — easier yes than written quote, and embeds beautifully on the page
- **Use an internal stat with attribution to your team:** *"Across 12 hospital systems we've audited, we've identified an average of 6 silent specialties per hospital."* — third-party-style credibility without needing client signoff

---

## Once you have a real quote — where to swap

Replace any of the 3 placeholder testimonials in `index.html` (search for `<!-- TESTIMONIALS`):

```html
<div class="card p-6">
  <div class="font-serif italic text-rust text-[40px] leading-none">"</div>
  <p class="text-[14.5px] text-ink/85 leading-relaxed mt-1">[REAL QUOTE HERE]</p>
  <div class="h-px bg-border my-4"></div>
  <div class="text-[13px] font-semibold text-ink">[NAME], [DESIGNATION]</div>
  <div class="text-[12px] text-ink/60">[HOSPITAL] · [CITY]</div>
</div>
```

Then rebuild the CSS: `npm run build` (only needed if you change layout classes; pure copy edits don't need a rebuild).
