export const MOCK_CRIME_RECORDS = [
  {
    firNo: "FIR-2026-08912",
    date: "2026-07-20",
    time: "21:30",
    station: "Indiranagar PS, Bengaluru",
    crimeType: "Chain Snatching & Armed Robbery",
    moCode: "MO-TWO-WHEELER-SNATCH",
    location: "10th Main, 100ft Road, Indiranagar",
    lat: 12.9784,
    lng: 77.6408,
    riskLevel: "HIGH",
    suspects: ["Raju alias 'Apache' Kumar", "Vikram 'Snake' Gowda"],
    gang: "Koramangala Bike Gang",
    victim: "Priya Sharma",
    status: "UNDER_INVESTIGATION",
    summary: "Two suspects on a black Pulsar motorcycle targeted pedestrian. Threat with knife.",
    kannadaSummary: "ಇಂದಿರಾನಗರ 100 ಫೀಟ್ ರಸ್ತೆಯಲ್ಲಿ ಇಬ್ಬರು ಬೈಕ್ ಸವಾರರಿಂದ ಸರಗಳ್ಳತನ."
  },
  {
    firNo: "FIR-2026-08915",
    date: "2026-07-21",
    time: "02:15",
    station: "Jayanagar PS, Bengaluru",
    crimeType: "Night House Burglary",
    moCode: "MO-NIGHT-LOCK-BREAK",
    location: "4th Block, Jayanagar",
    lat: 12.9250,
    lng: 77.5938,
    riskLevel: "HIGH",
    suspects: ["Manja 'Lock' Nathan", "Raju alias 'Apache' Kumar"],
    gang: "South Bengaluru Break-in Syndicate",
    victim: "K. N. Murthy",
    status: "PREVIOUS_RECIDIVIST",
    summary: "Locked bungalow entered by cutting window grille. Gold and cash stolen.",
    kannadaSummary: "ಜಯನಗರ 4 ನೇ ಬ್ಲಾಕ್‌ನ ಬೀಗ ಹಾಕಿದ ಮನೆಯಲ್ಲಿ ಕಳವು."
  },
  {
    firNo: "FIR-2026-08920",
    date: "2026-07-22",
    time: "18:45",
    station: "Koramangala PS, Bengaluru",
    crimeType: "Vehicle Theft (2-Wheeler)",
    moCode: "MO-MASTER-KEY-THEFT",
    location: "5th Block Parking Lot, Koramangala",
    lat: 12.9352,
    lng: 77.6245,
    riskLevel: "MEDIUM",
    suspects: ["Vikram 'Snake' Gowda"],
    gang: "Koramangala Bike Gang",
    victim: "Arun V.",
    status: "INVESTIGATING",
    summary: "Vehicle stolen using duplicate master key near commercial complex.",
    kannadaSummary: "ಕೋರಮಂಗಲ 5 ನೇ ಬ್ಲಾಕ್‌ನಲ್ಲಿ ದ್ವಿಚಕ್ರ ವಾಹನ ಕಳವು."
  },
  {
    firNo: "FIR-2026-08928",
    date: "2026-07-23",
    time: "14:10",
    station: "Whitefield PS, Bengaluru",
    crimeType: "Cyber Financial Fraud (Phishing)",
    moCode: "MO-CYBER-APK-PHISH",
    location: "ITPL Main Road, Whitefield",
    lat: 12.9860,
    lng: 77.7340,
    riskLevel: "HIGH",
    suspects: ["Suresh 'Digital' Reddy"],
    gang: "Jamtara-Karnataka Cyber Syndicate",
    victim: "Siddharth Rao",
    status: "FREEZE_ACCOUNT_SENT",
    summary: "Victim defrauded of Rs. 4.2 Lakhs via malicious bank update APK link.",
    kannadaSummary: "ವೈಟ್‌ಫೀಲ್ಡ್‌ನಲ್ಲಿ ಬ್ಯಾಂಕ್ ಎಪಿಕೆ ಲಿಂಕ್ ಮೂಲಕ 4.2 ಲಕ್ಷ ರೂ. ಸೈಬರ್ ವಂಚನೆ."
  },
  {
    firNo: "FIR-2026-08930",
    date: "2026-07-23",
    time: "20:00",
    station: "Devaraja PS, Mysuru",
    crimeType: "Commercial Shop Break-in",
    moCode: "MO-NIGHT-LOCK-BREAK",
    location: "Sayyaji Rao Road, Mysuru",
    lat: 12.3052,
    lng: 76.6552,
    riskLevel: "MEDIUM",
    suspects: ["Manja 'Lock' Nathan"],
    gang: "South Bengaluru Break-in Syndicate",
    victim: "Mysore Silks Emporium",
    status: "ACTIVE_SEARCH",
    summary: "Shutter lock pried open during heavy rain. Cash drawer looted.",
    kannadaSummary: "ಮೈಸೂರು ಸಯ್ಯಾಜಿ ರಾವ್ ರಸ್ತೆಯಲ್ಲಿ ಅಂಗಡಿ ಬೀಗ ಮುರಿದು ಕಳವು."
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "🙏 Welcome Officer. I am KSP CrimeIntel AI, running natively on Zoho Catalyst Cloud.\n\nHow can I assist your investigation today?",
    kannadaText: "🙏 ನಮಸ್ಕಾರ ಅಧಿಕಾರಿಯವರೇ. ನಾನು KSP ಕ್ರೈಮ್‌ಇಂಟೆಲ್ AI.\nಇಂದು ನಿಮ್ಮ ತನಿಖೆಯಲ್ಲಿ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    timestamp: "23:20",
    queryCard: null
  }
];

export const SAMPLE_QUERIES = [
  {
    label: "🔗 Chain Snatching Hotspots",
    query: "Show chain snatching hotspots and linked gangs in Indiranagar & Koramangala",
    response: "Found 2 active FIRs matching Chain Snatching & Bike Theft MO in Indiranagar/Koramangala. Linked to 'Koramangala Bike Gang'.",
    highlights: { count: 2, mo: "MO-TWO-WHEELER-SNATCH", risk: "HIGH" }
  },
  {
    label: "🔓 Night Burglary Recidivists",
    query: "Identify repeat offenders involved in Night Lock Break burglaries in Bengaluru & Mysuru",
    response: "Suspect Manja 'Lock' Nathan identified across 2 incidents (Jayanagar & Mysuru) using identical shutter-prying MO.",
    highlights: { count: 2, mo: "MO-NIGHT-LOCK-BREAK", risk: "HIGH" }
  },
  {
    label: "💻 Cyber APK Phishing Gangs",
    query: "Retrieve recent cyber financial fraud networks operating in Whitefield IT corridor",
    response: "Detected Suresh 'Digital' Reddy linked to Jamtara-Karnataka Cyber Syndicate. Rs 4.2L frozen.",
    highlights: { count: 1, mo: "MO-CYBER-APK-PHISH", risk: "HIGH" }
  }
];
