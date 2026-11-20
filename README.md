# Payout holds: the investigations analyst's view

A design exercise for a Paystack Senior Product Designer take-home: "A business's payout is on hold. Design what happens next."

This is not a Paystack product. Every business, person and number is fictional.

**Live prototype:** https://uxvic.github.io/paystack-payout-holds/

## What it shows

- **Dashboard.** Open cases, the most severe first. Severity is based on time. Critical means a legal duty or harm to others. High means the payout is already late. Medium means it is due today. Low means it is not due yet.
- **Case pane.** Four tabs: Overview, Transactions, Accounts and Activity. They cover both sides of the payment, the money movement, restrictions and screening.
- **Resolution.** The analyst picks a true or false positive, selects the reasons and adds a note. Any release over NGN 2,000,000.00 goes to a second approver.
- **Request info and Escalate.** Every message to the business is built from approved sentences. None of them reveals what triggered the hold.
- **Auto-review and Rules.** The system clears what it can first. Spot-checks and the held-in-error counts feed back into the rules.

## Try it

Open the prototype and click **Ebun Furniture Studio**. Read the tabs, then resolve the case as a false positive, send it for approval, and approve it as Tunde A. The "?" icon at the top right explains each path.

## Files

- `index.html`, `styles.css` and `app.js` hold the prototype. It is plain HTML, CSS and JavaScript, with no build step.
- `data.js` holds every number shown on screen, so the screens cannot disagree with each other.
- The visual language follows Paystack's public dashboard: the Inter typeface and colour values from its public stylesheet.
