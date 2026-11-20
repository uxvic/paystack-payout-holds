// One data file for the whole prototype. Every number on every screen is read or derived from here,
// so the numbers cannot disagree between screens. All names and figures are fictional.
window.DATA = {
  analyst: { name: "Ife Okafor", short: "Ife O." },
  checker: { name: "Tunde Adeyemi", short: "Tunde A." },
  colleague: { name: "Kemi Olaniyan", short: "Kemi O." },

  thresholds: {
    approvalOver: 2000000,      // releases above this need a second approver (assumed)
    singlePaymentLimit: 5000000 // registered business limit (assumed)
  },

  // The scenario clock (Wed 18 Nov unless stated). Two paths through the same payment.
  clock: {
    start: "Wed 18 Nov, 09:30",
    tookCase: "Wed 18 Nov, 09:31",
    decisionDue: "Wed 18 Nov, 18:00",
    arrives: "Thu 19 Nov",
    nextRuleRun: "12:00",
    // Main path: the history was already there, so the hold was a mistake
    fast: { submitted: "Wed 18 Nov, 09:44", approved: "Wed 18 Nov, 09:58" },
    // Second path: no earlier history, so Ife asks for proof and the hold ends as a lift
    slow: {
      asked: "Wed 18 Nov, 09:50", reminderSent: "Wed 18 Nov, 12:30", proofArrived: "Wed 18 Nov, 14:20",
      submitted: "Wed 18 Nov, 14:35", approved: "Wed 18 Nov, 14:52"
    },
    windows: {
      1: { by: "Thu 19 Nov, 09:50", reminder: null },
      2: { by: "Fri 20 Nov, 09:50", reminder: "Thu 19 Nov, 09:50" },
      3: { by: "Mon 23 Nov, 09:50", reminder: "Fri 20 Nov, 09:50" }
    },
    reviewDates: ["Thu 19 Nov", "Fri 20 Nov", "Mon 23 Nov"]
  },

  ebun: {
    id: "H-48213",
    name: "Ebun Furniture Studio",
    place: "Ikorodu, Lagos",
    monthsOnPaystack: 14,
    paymentsPerMonth: 38,
    medianPayment: 72000,
    largestCardPayment: 210000,
    supportContacts: 2,
    needBy: "Fri 20 Nov, for staff wages", // what Ebun says when asked (fictional)
    workingDaysLate: 1,
    heldFor: "1d 3h", heldOn: "Tue 17 Nov",
    payoutDue: "Tue 17 Nov",
    otherPayments: { count: 5, total: 412500 },
    flagged: {
      amount: 3600000,
      channel: "Card",
      when: "Mon 16 Nov, 14:12",
      date: "Mon 16 Nov",
      payer: "Ajoke Lakeside Hotel Ltd",
      chairs: 40,
      unitPrice: 90000
    },
    priorPayment: { amount: 1800000, date: "Tue 11 Aug", channel: "transfer", chairs: 20 },
    proof: [
      { kind: "Purchase order", title: "PO 2611 · Ajoke Lakeside Hotel Ltd", detail: "40 dining chairs at ₦90,000" },
      { kind: "Delivery note", title: "Signed delivery note", detail: "40 chairs delivered Tue 17 Nov, signed by the hotel's stores officer" }
    ]
  },


  // Severity is time-based (Victor, Fri 20 Nov): Critical = legal duty or harm to others; otherwise
  // High = payout already late, Medium = payout due today, Low = payout not due yet.
  // Within a level the longest-held case comes first; cases waiting on the merchant drop to the bottom.
  severityRule: [
    ["Critical", "Legal duty or harm to others: sanctions, terrorism financing, fraud in progress, a request from an authority"],
    ["High", "The payout is already late"],
    ["Medium", "The payout is due today"],
    ["Low", "The payout is not due yet"]
  ],
  pane: {
    severity: "High", dueIn: "8h 30m", created: "Tue 17 Nov, 06:02", account: "0094 7453 43",
    payout: [
      { who: "Ajoke Lakeside Hotel Ltd", via: "Card •••• 4417", amount: 3600000, when: "Mon 16 Nov, 14:12", flagged: true },
      { who: "Tolu Bakare", via: "Card •••• 2290", amount: 72000, when: "Mon 16 Nov, 09:05" },
      { who: "Chidi Okeke", via: "Transfer", amount: 95000, when: "Mon 16 Nov, 11:20" },
      { who: "Amaka Eze", via: "Card •••• 8812", amount: 58500, when: "Mon 16 Nov, 13:02" },
      { who: "Femi Adeyemi", via: "Card •••• 1034", amount: 120000, when: "Mon 16 Nov, 16:45" },
      { who: "Ngozi Obi", via: "Transfer", amount: 67000, when: "Mon 16 Nov, 18:30" }
    ],
    earlier: [{ who: "Ajoke Lakeside Hotel Ltd", via: "Transfer · 20 chairs", amount: 1800000, when: "Tue 11 Aug, 10:40" }],
    business: [
      ["Name", "Ebun Furniture Studio", "Ikorodu, Lagos · 14 months on Paystack"],
      ["Verification", "Registered business", "Verified Sep 2025"],
      ["Limit", "NGN 5,000,000.00 per payment"],
      ["Restrictions before", "None in 14 months"],
      ["Past holds", "None"],
      ["Disputes, 90 days", "1 of 114 payments", "Won by the business"],
      ["Refunds, 90 days", "2"],
      ["Sanctions and PEP", "Clear", "Screened daily"],
      ["Linked accounts", "None", "Same owner, device or bank account"],
      ["Payout account", "•••• 4821", "Unchanged since Sep 2025"],
      ["Contact", "Called support 2 times", "About this payout"]
    ],
    counterparty: [
      ["Name", "Ajoke Lakeside Hotel Ltd", "Business, paying by corporate card"],
      ["Card", "Issued in Nigeria", "3-D Secure passed"],
      ["On Paystack", "Card first seen Mar 2025", "11 payments to 3 businesses"],
      ["Disputes and chargebacks", "None"],
      ["Restrictions and blocklists", "None"],
      ["Sanctions and PEP", "No match"],
      ["With this business", "1 earlier payment", "NGN 1,800,000.00 by transfer, Tue 11 Aug"]
    ],
    activity: [
      ["System", "Mon 16 Nov, 14:12", "Payment of NGN 3,600,000.00 received by card"],
      ["Rule R-07", "Tue 17 Nov, 06:02", "Held the payout of NGN 4,012,500.00"],
      ["Auto-review", "Tue 17 Nov, 06:02", "Couldn't clear it: no card history with this payer. Passed to analysts"],
      ["Support", "Tue 17 Nov, 11:20", "Ebun called about the payout"],
      ["Support", "Wed 18 Nov, 08:45", "Ebun called again"],
      ["System", "Wed 18 Nov, 09:30", "Waiting for an analyst. High: the payout is a day late"]
    ]
  },
  reasons: {
    fp: ["We already had history that should have cleared it", "The data the rule used was wrong", "The rule's limit is too tight for this kind of business", "The business sent proof that explains the payment", "Something else (explain in the note)"],
    tp: ["The payer disputed the payment or reported fraud", "The card looks stolen or compromised", "The business can't show the order or delivery", "Signs of money laundering", "Something else (explain in the note)"]
  },

  // The rules that can hold a payout (fictional IDs). "auto" = auto-review may clear it on its own;
  // "to" = who gets it when auto-review can't (or must not) decide.
  rules: {
    amount:   { id: "R-07", name: "Unusual amount for this merchant", looksFor: "A payment far above what this merchant normally receives", auto: true, to: "Analysts" },
    cards:    { id: "R-03", name: "Many cards issued abroad in a short time", looksFor: "Bursts of payments from foreign cards, a sign of stolen cards being tested", auto: false, to: "Analysts, urgent", urgent: "Fraud may still be happening" },
    newBiz:   { id: "R-11", name: "New business, first payouts", looksFor: "A first large payout before the business has a track record", auto: true, to: "Analysts" },
    disputes: { id: "R-05", name: "Refunds or disputes above normal", looksFor: "More refunds or chargebacks than this merchant usually has", auto: true, to: "Analysts" },
    limit:    { id: "R-09", name: "Above the merchant's KYC limit", looksFor: "A payment bigger than the merchant's verification level allows", auto: true, to: "Analysts" },
    account:  { id: "R-14", name: "Payout account changed just before payout", looksFor: "Bank details changed shortly before money goes out, a sign of account takeover", auto: false, to: "Analysts, urgent", urgent: "Money may be going to the wrong person" },
    sanctions:{ id: "R-01", name: "Name close to a sanctions list entry", looksFor: "The merchant or payer matches or nearly matches a sanctions list", auto: false, to: "Compliance team", urgent: "Legal duty to act now" },
    tf:       { id: "R-02", name: "Signs of terrorism financing", looksFor: "Patterns linked to funding terrorism, from official typologies", auto: false, to: "Financial crime team", urgent: "Legal duty to act now" },
    laundering:{ id: "R-04", name: "Signs of money laundering", looksFor: "Money in and straight out, or payments split to stay under limits", auto: false, to: "Financial crime team" },
    request:  { id: "R-00", name: "Request from law enforcement or the regulator", looksFor: "A formal request to hold or report on an account", auto: false, to: "Compliance team", urgent: "Deadline set by the authority" }
  },

  others: [
    { id: "gadget", name: "Gadget Corner", held: 612000, late: "Due today", rule: "cards", lane: "urgent",
      reason: "41 payments from cards issued abroad in 2 hours, still arriving", owner: "Kemi O.", goesTo: "Kemi O. (analyst)",
      severity: "Critical", dueIn: "2h 30m", created: "Wed 18 Nov, 09:12", assignee: "Kemi O.", status: "In review", heldOn: "Wed 18 Nov" },
    { id: "northgate", name: "Northgate Freight", held: 2250000, late: "Due today", rule: "sanctions", lane: "urgent",
      reason: "Payer's name is close to an entry on a sanctions list", owner: "Compliance team", goesTo: "Compliance team",
      severity: "Critical", dueIn: null, created: "Wed 18 Nov, 07:15", assignee: "Compliance", status: "Escalated", heldOn: "Wed 18 Nov" },
    { id: "harbour", name: "Harbour Goods Ltd", held: 940000, late: "Due today", rule: "tf", lane: "urgent",
      reason: "Several payments match a known terrorism financing pattern", owner: "Financial crime team", goesTo: "Financial crime team",
      severity: "Critical", dueIn: null, created: "Wed 18 Nov, 08:40", assignee: "Financial crime", status: "Escalated", heldOn: "Wed 18 Nov" },
    { id: "bolu", name: "Bolu Prints", held: 380000, lateDays: 0, late: "Due today", weeksOfTakings: 3, support: 0,
      rule: "amount", severity: "Medium", dueIn: "8h 30m", created: "Wed 18 Nov, 06:00", assignee: null, status: "New", heldOn: "Wed 18 Nov" },
    { id: "bakery", name: "Sweet Crumb Bakery", held: 96500, late: "2 working days", weeksOfTakings: 1, support: 1,
      rule: "newBiz", severity: "High", dueIn: "1d 6h", created: "Mon 16 Nov, 06:30", assignee: "Ife O.", status: "Waiting on merchant", heldOn: "Mon 16 Nov" }
  ],

  // Auto-review: every hold is checked by the system first (fictional numbers for the last 24 hours).
  autoReview: {
    summary: { held: 46, cleared: 31, toAnalysts: 12, toSpecialists: 3 },
    rows: [
      { id: "ebun", name: "Ebun Furniture Studio", rule: "amount", held: null, verdict: "Passed to analysts", when: "Tue 17 Nov, 06:02", why: null },
      { id: "lens", name: "Lagos Lens Studio", rule: "amount", held: 640000, verdict: "Cleared automatically", when: "Wed 18 Nov, 04:10", why: "Returning payer, earlier orders delivered, within their KYC limit", heldFor: "2 hours" },
      { id: "tiwa", name: "Tiwa Skincare", rule: "disputes", held: 215000, verdict: "Cleared automatically", when: "Wed 18 Nov, 05:40", why: "Disputes back to their normal level after a refund batch", heldFor: "5 hours" },
      { id: "nnamdi", name: "Nnamdi Auto Parts", rule: "limit", held: 1150000, verdict: "Evaluating", when: "Wed 18 Nov, 09:05", why: "Waiting for the merchant's upgraded verification to finish" },
      { id: "bolu", name: "Bolu Prints", rule: "amount", held: 380000, verdict: "Passed to analysts", when: "Wed 18 Nov, 06:00", why: "First payment from this payer; amount far above their card payments" },
      { id: "northgate", name: "Northgate Freight", rule: "sanctions", held: 2250000, verdict: "Sent to compliance", when: "Wed 18 Nov, 07:15", why: "Sanctions matches are never cleared automatically" }
    ]
  },

  // How each rule's holds have ended this week (fictional). Ebun's case adds one if closed as held in error.
  ruleHealth: [
    { rule: "amount", holds: 13, autoCleared: 7, heldInError: 4 },
    { rule: "cards", holds: 7, autoCleared: 0, heldInError: 0 },
    { rule: "newBiz", holds: 21, autoCleared: 15, heldInError: 1 },
    { rule: "disputes", holds: 9, autoCleared: 6, heldInError: 0 },
    { rule: "limit", holds: 5, autoCleared: 3, heldInError: 1 },
    { rule: "account", holds: 2, autoCleared: 0, heldInError: 0 },
    { rule: "sanctions", holds: 1, autoCleared: 0, heldInError: 0 },
    { rule: "tf", holds: 1, autoCleared: 0, heldInError: 0 },
    { rule: "laundering", holds: 2, autoCleared: 0, heldInError: 0 },
    { rule: "request", holds: 0, autoCleared: 0, heldInError: 0 }
  ]
};
