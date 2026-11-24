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
      ["Contact", "Called support 2 times", "About this payout"]
    ],
    counterparty: [
      ["Name", "Ajoke Lakeside Hotel Ltd", "Business, paying by corporate card"],
      ["Card", "Issued in Nigeria", "3-D Secure passed"],
      ["On Paystack", "Card first seen Mar 2025", "11 payments to 3 businesses"],
      ["Disputes and chargebacks", "None"],
      ["Restrictions and blocklists", "None"],
      ["Sanctions and PEP", "No match"]
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
    ,
    { id: "kola", name: "Kola Shoes", held: 450000, late: "Due today", rule: "disputes", severity: "Medium", dueIn: null,
      created: "Wed 18 Nov, 06:10", assignee: "Ife O.", status: "Closed", heldOn: "Wed 18 Nov" }
  ],

  // Full case detail for every case other than Ebun's (fictional). Payments in each payout add up to "held".
  details: {
    gadget: {
      caseId: "H-48216", sender: "41 card holders in 9 countries", since: "Since 09:20", payoutDue: "Wed 18 Nov",
      flaggedNote: "Flagged NGN 574,000.00 · 41 cards from abroad · Wed 18 Nov, 07:05 to 09:05",
      payout: [
        { who: "Kunle Adebayo", via: "Card •••• 3381", amount: 15000, when: "Tue 17 Nov, 18:20" },
        { who: "Bisi Lawal", via: "Transfer", amount: 12500, when: "Tue 17 Nov, 19:02" },
        { who: "Emeka Nwosu", via: "Card •••• 9045", amount: 10500, when: "Wed 18 Nov, 06:40" }
      ],
      clear: { amount: 38000, label: "3 payments from regular buyers" }, earlier: [],
      pattern: [["Payments a month", "22"], ["Median", "NGN 14,000.00"], ["Largest by card", "NGN 45,000.00"]],
      checks: [
        ["Who paid", "41 cards issued in 9 countries; 29 skipped or failed 3-D Secure", "risk"],
        ["Payer's history here", "None of the 41 cards has paid this business before", "risk"],
        ["Against their pattern", "41 payments in 2 hours; they usually take 22 a month", "risk"],
        ["KYC and limits", "Starter business, limit NGN 1,000,000.00 per payment", "real"],
        ["Restrictions and fraud", "6 of the cards are on a fraud blocklist", "risk"],
        ["Can it be reversed", "Card payments: can be disputed after payout", "risk"],
        ["Fits the business", "Phone cases at NGN 14,000, the price on their payment page", "both"],
        ["Delivery", "No orders shipped yet", "risk"]
      ],
      business: [
        ["Name", "Gadget Corner", "Yaba, Lagos · 8 months on Paystack"], ["Verification", "Starter business", "BVN verified Mar 2026"],
        ["Limit", "NGN 1,000,000.00 per payment"], ["Restrictions before", "None in 8 months"], ["Past holds", "None"],
        ["Disputes, 90 days", "0 of 64 payments"], ["Refunds, 90 days", "1"], ["Sanctions and PEP", "Clear", "Screened daily"],
        ["Linked accounts", "None", "Same owner, device or bank account"], ["Payout account", "•••• 2210", "Unchanged since Mar 2026"],
        ["Contact", "None", "No calls about this payout"]
      ],
      partyTitle: "Payers", partyBadge: ["6 cards blocklisted", "b-bad"],
      party: [
        ["Who", "41 card holders", "Paying by card from abroad"], ["Cards", "Issued in 9 countries", "29 skipped or failed 3-D Secure"],
        ["On Paystack", "38 of 41 cards never seen before"], ["Restrictions and blocklists", "6 cards on a fraud blocklist"],
        ["Disputes and chargebacks", "None yet"], ["Sanctions and PEP", "No match"]
      ],
      activity: [
        ["System", "Wed 18 Nov, 07:05", "First of 41 payments from cards issued abroad"],
        ["Rule R-03", "Wed 18 Nov, 09:12", "Held the payout of NGN 612,000.00"],
        ["Auto-review", "Wed 18 Nov, 09:12", "R-03 is never cleared automatically. Passed to analysts as urgent"],
        ["Kemi O.", "Wed 18 Nov, 09:20", "Took the case"],
        ["Kemi O.", "Wed 18 Nov, 09:26", "Note: payments still arriving. Looks like stolen cards being tested"]
      ],
      foot: "Kemi O. is working this case."
    },
    northgate: {
      caseId: "H-48205", sender: "Meridian Cargo Holdings", since: "Since 07:40", payoutDue: "Wed 18 Nov",
      flaggedNote: "Flagged NGN 1,800,000.00 · Transfer · Tue 17 Nov, 16:40",
      payout: [
        { who: "Meridian Cargo Holdings", via: "Transfer", amount: 1800000, when: "Tue 17 Nov, 16:40", flagged: true },
        { who: "Ola Haulage Services", via: "Transfer", amount: 250000, when: "Tue 17 Nov, 11:15" },
        { who: "Dutse Agro Ltd", via: "Card •••• 7731", amount: 200000, when: "Tue 17 Nov, 13:50" }
      ],
      clear: { amount: 450000, label: "2 payments from regular customers · held until compliance decides" }, earlier: [],
      pattern: [["Payments a month", "26"], ["Median", "NGN 310,000.00"], ["Largest payment", "NGN 1,900,000.00"]],
      checks: [
        ["Who paid", "Meridian Cargo Holdings: name close to an entry on a sanctions list", "risk"],
        ["Payer's history here", "First payment from this payer", "risk"],
        ["Against their pattern", "Within their usual range for freight jobs", "real"],
        ["KYC and limits", "Registered business, limit NGN 5,000,000.00 per payment", "real"],
        ["Restrictions and fraud", "None in 3 years", "real"],
        ["Can it be reversed", "Transfer: cannot be charged back", "real"],
        ["Fits the business", "Invoice for a Lagos to Kano freight run", "real"],
        ["Delivery", "Not checked: compliance decides", "both"]
      ],
      business: [
        ["Name", "Northgate Freight", "Apapa, Lagos · 3 years on Paystack"], ["Verification", "Registered business", "Verified Jan 2024"],
        ["Limit", "NGN 5,000,000.00 per payment"], ["Restrictions before", "None in 3 years"], ["Past holds", "1, cleared in Jun 2025"],
        ["Disputes, 90 days", "0 of 78 payments"], ["Refunds, 90 days", "0"], ["Sanctions and PEP", "Clear", "Screened daily"],
        ["Linked accounts", "None", "Same owner, device or bank account"], ["Payout account", "•••• 0937", "Unchanged since Jan 2024"],
        ["Contact", "None", "No calls about this payout"]
      ],
      partyTitle: "Counterparty", partyBadge: ["Possible sanctions match", "b-bad"],
      party: [
        ["Name", "Meridian Cargo Holdings", "Business, paying by transfer"], ["Sanctions and PEP", "Possible match", "Name close to a list entry; with compliance"],
        ["On Paystack", "First seen Tue 17 Nov", "1 payment, to this business"], ["Disputes and chargebacks", "None"],
        ["Restrictions and blocklists", "None"], ["With this business", "None before"]
      ],
      activity: [
        ["System", "Tue 17 Nov, 16:40", "Transfer of NGN 1,800,000.00 received"],
        ["Rule R-01", "Wed 18 Nov, 07:15", "Held the payout of NGN 2,250,000.00"],
        ["Auto-review", "Wed 18 Nov, 07:15", "Sanctions matches are never cleared automatically. Sent to the compliance team"],
        ["Compliance", "Wed 18 Nov, 07:40", "Took the case. Deadline set by the team"],
        ["System", "Wed 18 Nov, 07:41", "Northgate was told: “Your payout is still under review. We'll contact you as soon as we have an update.”"]
      ],
      foot: "With the compliance team. Read-only for analysts."
    },
    harbour: {
      caseId: "H-48209", sender: "6 new payers", since: "Since 08:55", payoutDue: "Wed 18 Nov",
      flaggedNote: "Flagged NGN 720,000.00 · 6 transfers · Tue 17 Nov, 22:10 to 23:55",
      payout: [
        { who: "Aliyu Sule", via: "Transfer", amount: 120000, when: "Tue 17 Nov, 23:55" },
        { who: "Yakubu Danjuma", via: "Transfer", amount: 120000, when: "Tue 17 Nov, 23:34" },
        { who: "Ibrahim Musa", via: "Transfer", amount: 120000, when: "Tue 17 Nov, 23:13" },
        { who: "Usman Ali", via: "Transfer", amount: 120000, when: "Tue 17 Nov, 22:52" },
        { who: "Bello Garba", via: "Transfer", amount: 120000, when: "Tue 17 Nov, 22:31" },
        { who: "Sani Adamu", via: "Transfer", amount: 120000, when: "Tue 17 Nov, 22:10" },
        { who: "Hauwa Bello", via: "Card •••• 5520", amount: 95000, when: "Tue 17 Nov, 12:30" },
        { who: "Musa Ibrahim", via: "Transfer", amount: 125000, when: "Tue 17 Nov, 15:05" }
      ],
      clear: { amount: 220000, label: "2 payments from regular customers · held until financial crime decides" }, earlier: [],
      pattern: [["Payments a month", "31"], ["Median", "NGN 85,000.00"], ["Largest payment", "NGN 400,000.00"]],
      checks: [
        ["Who paid", "6 payers, all with bank accounts opened this month", "risk"],
        ["Payer's history here", "None of the 6 has paid this business before", "risk"],
        ["Against their pattern", "Same amount, minutes apart, late at night", "risk"],
        ["KYC and limits", "Registered business, limit NGN 2,000,000.00 per payment", "real"],
        ["Restrictions and fraud", "None in 11 months", "real"],
        ["Can it be reversed", "Transfers: cannot be charged back", "both"],
        ["Fits the business", "No invoices match these payments", "risk"],
        ["Delivery", "Not checked: financial crime decides", "both"]
      ],
      business: [
        ["Name", "Harbour Goods Ltd", "Kano · 11 months on Paystack"], ["Verification", "Registered business", "Verified Dec 2025"],
        ["Limit", "NGN 2,000,000.00 per payment"], ["Restrictions before", "None in 11 months"], ["Past holds", "None"],
        ["Disputes, 90 days", "0 of 92 payments"], ["Refunds, 90 days", "0"], ["Sanctions and PEP", "Clear", "Screened daily"],
        ["Linked accounts", "2", "Same device as two other businesses"], ["Payout account", "•••• 6614", "Unchanged since Dec 2025"],
        ["Contact", "None", "No calls about this payout"]
      ],
      partyTitle: "Payers", partyBadge: ["Pattern match", "b-bad"],
      party: [
        ["Who", "6 individuals", "Paying by bank transfer"], ["Bank accounts", "Opened in Nov 2026", "All 6 within 2 weeks"],
        ["On Paystack", "First seen Tue 17 Nov"], ["Pattern", "Matches a known typology", "From official guidance"],
        ["Restrictions and blocklists", "None"], ["Sanctions and PEP", "No match"]
      ],
      activity: [
        ["System", "Tue 17 Nov, 22:10", "First of 6 transfers of NGN 120,000.00"],
        ["Rule R-02", "Wed 18 Nov, 08:40", "Held the payout of NGN 940,000.00"],
        ["Auto-review", "Wed 18 Nov, 08:40", "Never cleared automatically. Sent to the financial crime team"],
        ["Financial crime", "Wed 18 Nov, 08:55", "Took the case. Deadline set by the team"],
        ["System", "Wed 18 Nov, 08:56", "Harbour Goods was told: “Your payout is still under review. We'll contact you as soon as we have an update.”"]
      ],
      foot: "With the financial crime team. Read-only for analysts."
    },
    bakery: {
      caseId: "H-48197", sender: "5 customers", since: "Since Mon 16 Nov, 10:15", payoutDue: "Mon 16 Nov",
      flaggedNote: "First payout · 5 payments · Sun 15 Nov",
      payout: [
        { who: "Tade Ventures", via: "Transfer · office lunch order", amount: 42500, when: "Sun 15 Nov, 12:10" },
        { who: "Funke Adeyinka", via: "Card •••• 4102", amount: 18000, when: "Sun 15 Nov, 09:40" },
        { who: "Dami Olatunji", via: "Transfer", amount: 14500, when: "Sun 15 Nov, 15:25" },
        { who: "Ijeoma Nnadi", via: "Card •••• 7718", amount: 12000, when: "Sun 15 Nov, 10:05" },
        { who: "Seun Bello", via: "Card •••• 0921", amount: 9500, when: "Sun 15 Nov, 17:50" }
      ],
      clear: null, earlier: [],
      pattern: [["Payments so far", "5"], ["On Paystack", "3 weeks"], ["Largest payment", "NGN 42,500.00"]],
      checks: [
        ["Who paid", "5 local customers; cards passed 3-D Secure", "real"],
        ["Payer's history here", "New business: no history yet", "both"],
        ["Against their pattern", "First payout: no pattern yet", "both"],
        ["KYC and limits", "Starter business, limit NGN 200,000.00 per payment", "real"],
        ["Restrictions and fraud", "None", "real"],
        ["Can it be reversed", "3 card payments can be disputed after payout", "risk"],
        ["Fits the business", "Cakes and lunch orders at the prices on their page", "real"],
        ["Delivery", "Asked for receipts for the 2 largest orders", "both"]
      ],
      business: [
        ["Name", "Sweet Crumb Bakery", "Surulere, Lagos · 3 weeks on Paystack"], ["Verification", "Starter business", "BVN verified Oct 2026"],
        ["Limit", "NGN 200,000.00 per payment"], ["Restrictions before", "None"], ["Past holds", "None: this is their first payout"],
        ["Disputes", "None yet"], ["Refunds", "None yet"], ["Sanctions and PEP", "Clear", "Screened daily"],
        ["Linked accounts", "None", "Same owner, device or bank account"], ["Payout account", "•••• 5512", "Set Oct 2026"],
        ["Contact", "Called support 1 time", "About this payout"]
      ],
      partyTitle: "Customers", partyBadge: ["No restrictions", "b-ok"],
      party: [
        ["Who", "5 customers", "3 by card, 2 by transfer"], ["Cards", "Issued in Nigeria", "3-D Secure passed"],
        ["On Paystack", "All seen before", "At other businesses"], ["Disputes and chargebacks", "None"],
        ["Restrictions and blocklists", "None"], ["Sanctions and PEP", "No match"]
      ],
      activity: [
        ["Rule R-11", "Mon 16 Nov, 06:30", "Held the first payout of NGN 96,500.00"],
        ["Auto-review", "Mon 16 Nov, 06:30", "Couldn't clear it: a new business with no track record. Passed to analysts"],
        ["Ife O.", "Mon 16 Nov, 10:15", "Took the case"],
        ["Ife O.", "Mon 16 Nov, 10:22", "Asked for receipts for the 2 largest orders, by Thu 19 Nov"],
        ["Support", "Tue 17 Nov, 14:05", "Sweet Crumb called about the payout"],
        ["System", "Wed 18 Nov, 09:30", "Waiting on the business, so it sits at the bottom of High"]
      ],
      foot: "Waiting on Sweet Crumb until Thu 19 Nov."
    },
    bolu: {
      caseId: "H-48211", sender: "Lekki Events Co", since: null, payoutDue: "Wed 18 Nov",
      flaggedNote: "Flagged NGN 300,000.00 · Card · Tue 17 Nov, 15:30",
      payout: [
        { who: "Lekki Events Co", via: "Card •••• 6620", amount: 300000, when: "Tue 17 Nov, 15:30", flagged: true },
        { who: "Ada Nwosu", via: "Card •••• 1187", amount: 25000, when: "Tue 17 Nov, 10:15" },
        { who: "Kayode Ajayi", via: "Transfer", amount: 30000, when: "Tue 17 Nov, 12:40" },
        { who: "Rita Okon", via: "Card •••• 5034", amount: 25000, when: "Tue 17 Nov, 17:05" }
      ],
      clear: { amount: 80000, label: "3 payments from regular buyers" }, earlier: [],
      pattern: [["Payments a month", "45"], ["Median", "NGN 18,000.00"], ["Largest by card", "NGN 50,000.00"]],
      checks: [
        ["Who paid", "Lekki Events Co, card issued in Nigeria, 3-D Secure passed", "real"],
        ["Payer's history here", "First payment from this payer", "both"],
        ["Against their pattern", "6 times their largest card payment (NGN 50,000.00)", "risk"],
        ["KYC and limits", "Registered business, limit NGN 5,000,000.00 per payment", "real"],
        ["Restrictions and fraud", "None in 2 years", "real"],
        ["Can it be reversed", "Card payment: can be disputed after payout", "risk"],
        ["Fits the business", "500 event banners at NGN 600, the price on their payment page", "real"],
        ["Delivery", "Not known yet", "both"]
      ],
      business: [
        ["Name", "Bolu Prints", "Ikeja, Lagos · 2 years on Paystack"], ["Verification", "Registered business", "Verified Feb 2025"],
        ["Limit", "NGN 5,000,000.00 per payment"], ["Restrictions before", "None in 2 years"], ["Past holds", "None"],
        ["Disputes, 90 days", "0 of 135 payments"], ["Refunds, 90 days", "1"], ["Sanctions and PEP", "Clear", "Screened daily"],
        ["Linked accounts", "None", "Same owner, device or bank account"], ["Payout account", "•••• 3308", "Unchanged since Feb 2025"],
        ["Contact", "None", "No calls about this payout"]
      ],
      partyTitle: "Counterparty", partyBadge: ["No restrictions", "b-ok"],
      party: [
        ["Name", "Lekki Events Co", "Business, paying by corporate card"], ["Card", "Issued in Nigeria", "3-D Secure passed"],
        ["On Paystack", "Card first seen Jun 2026", "6 payments to 4 businesses"], ["Disputes and chargebacks", "None"],
        ["Restrictions and blocklists", "None"], ["Sanctions and PEP", "No match"], ["With this business", "None before"]
      ],
      activity: [
        ["System", "Tue 17 Nov, 15:30", "Payment of NGN 300,000.00 received by card"],
        ["Rule R-07", "Wed 18 Nov, 06:00", "Held the payout of NGN 380,000.00"],
        ["Auto-review", "Wed 18 Nov, 06:00", "Couldn't clear it: first payment from this payer, far above their card payments. Passed to analysts"],
        ["System", "Wed 18 Nov, 09:30", "Waiting for an analyst. Medium: the payout is due today"]
      ],
      foot: "In this prototype, only Ebun's case can be resolved."
    },
    kola: {
      caseId: "H-48210", sender: "4 customers", since: "Closed 08:20", payoutDue: "Wed 18 Nov",
      flaggedNote: "Held for refunds: 12 refunds on Tue 17 Nov",
      resolution: {
        outcome: "False positive", line1: "NGN 450,000.00 released · Arrives Thu 19 Nov",
        line2: "Closed by Ife O. at 08:20 · No second approval under NGN 2,000,000.00",
        reason: "The business sent proof that explains the payment",
        message: "Your payout of NGN 450,000.00 has been released and will reach your bank by Thu 19 Nov. Thank you for sending the documents."
      },
      payout: [
        { who: "Shoe Palace Abuja", via: "Transfer · wholesale order", amount: 280000, when: "Tue 17 Nov, 11:00" },
        { who: "Tobi Akande", via: "Card •••• 2245", amount: 65000, when: "Tue 17 Nov, 14:20" },
        { who: "Grace Udo", via: "Card •••• 8830", amount: 55000, when: "Tue 17 Nov, 16:10" },
        { who: "Yusuf Bala", via: "Transfer", amount: 50000, when: "Tue 17 Nov, 18:45" }
      ],
      clear: null, earlier: [],
      pattern: [["Payments a month", "58"], ["Refunds a month", "2"], ["Refunds on Tue 17 Nov", "12"]],
      checks: [
        ["Who paid", "4 customers; cards passed 3-D Secure", "real"],
        ["Payer's history here", "Shoe Palace Abuja has paid 6 times before", "real"],
        ["Against their pattern", "12 refunds in one day; they usually make 2 a month", "risk"],
        ["KYC and limits", "Registered business, limit NGN 5,000,000.00 per payment", "real"],
        ["Restrictions and fraud", "None in 4 years", "real"],
        ["Can it be reversed", "2 card payments can be disputed after payout", "risk"],
        ["Fits the business", "Shoe orders at the prices on their page", "real"],
        ["Delivery", "Proof: a supplier recall notice for 12 pairs, all refunded the same day", "real"]
      ],
      business: [
        ["Name", "Kola Shoes", "Aba, Abia · 4 years on Paystack"], ["Verification", "Registered business", "Verified Apr 2022"],
        ["Limit", "NGN 5,000,000.00 per payment"], ["Restrictions before", "None in 4 years"], ["Past holds", "None"],
        ["Disputes, 90 days", "0 of 170 payments"], ["Refunds, 90 days", "18", "12 on Tue 17 Nov, a supplier recall"],
        ["Sanctions and PEP", "Clear", "Screened daily"], ["Linked accounts", "None", "Same owner, device or bank account"],
        ["Payout account", "•••• 7740", "Unchanged since Apr 2022"], ["Contact", "None", "No calls about this payout"]
      ],
      partyTitle: "Customers", partyBadge: ["No restrictions", "b-ok"],
      party: [
        ["Who", "4 customers", "2 by card, 2 by transfer"], ["Cards", "Issued in Nigeria", "3-D Secure passed"],
        ["On Paystack", "All seen before"], ["Disputes and chargebacks", "None"],
        ["Restrictions and blocklists", "None"], ["Sanctions and PEP", "No match"]
      ],
      activity: [
        ["System", "Tue 17 Nov, 17:30", "12 refunds made in one afternoon"],
        ["Rule R-05", "Wed 18 Nov, 06:10", "Held the payout of NGN 450,000.00"],
        ["Auto-review", "Wed 18 Nov, 06:10", "Couldn't clear it: refunds far above normal. Passed to analysts"],
        ["Ife O.", "Wed 18 Nov, 07:02", "Took the case and asked Kola Shoes why there were so many refunds"],
        ["Kola Shoes", "Wed 18 Nov, 07:50", "Sent a supplier recall notice for 12 pairs"],
        ["Ife O.", "Wed 18 Nov, 08:20", "Resolved as a false positive: the business sent proof that explains the payment. Released NGN 450,000.00"]
      ],
      foot: "Closed. Nothing more to do on this case."
    }
  },

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

// Gadget Corner: the 41 card payments from abroad, NGN 14,000.00 each, every 3 minutes from 07:05 to 09:05 (fictional).
(function () {
  const first = ["Kofi", "Lena", "Marco", "Aisha", "Jonas", "Priya", "Tomás", "Yara", "Felix", "Nadia", "Omar", "Elena", "Kwame", "Sofia", "Ravi", "Ines", "Lukas", "Amara", "Diego", "Hana", "Mateo"];
  const last = ["Boateng", "Fischer", "Silva", "Rahman", "Berg", "Nair", "Costa", "Haddad", "Wagner", "Petrova", "Khalil", "Rossi", "Mensah", "Lopez", "Patel", "Duarte", "Novak", "Diallo", "Moreno", "Sato"];
  const rows = [];
  for (let i = 0; i < 41; i++) {
    const t = 7 * 60 + 5 + i * 3, hh = String(Math.floor(t / 60)).padStart(2, "0"), mm = String(t % 60).padStart(2, "0");
    rows.push({ who: first[i % first.length] + " " + last[(i * 7) % last.length], via: "Card •••• " + String(1000 + ((i * 2389) % 9000)).slice(-4), amount: 14000, when: "Wed 18 Nov, " + hh + ":" + mm });
  }
  window.DATA.details.gadget.payout.unshift(...rows.reverse());
})();

