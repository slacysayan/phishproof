// Social engineering scenarios
export const SOCIAL_SCENARIOS = [
  {
    id: 'social-1', category: 'social', type: 'whatsapp', questionType: 'legit_or_scam',
    isScam: true, difficulty: 'easy',
    content: {
      senderName: 'Mom',
      senderNumber: '+91 7000112233',
      messages: [
        { text: 'Beta, this is Mom. I dropped my phone. Using my friend number.', isIncoming: true, time: '11:02' },
        { text: 'Please urgently send Rs.8,000 to this UPI: help.number@okaxis. I will return tonight', isIncoming: true, time: '11:03' },
      ],
    },
    redFlags: ['New unknown number claiming to be family', 'Urgency', 'Different UPI handle'],
    annotationTargets: ['dropped my phone', 'Rs.8,000', 'help.number@okaxis'],
    teachingMoment: 'The new number scam: pretending to be a relative from an unknown number. Always call the ORIGINAL number to verify.',
    actionAdvice: 'Call Mom on her original number. Never send money to an unverified new number.',
  },
  {
    id: 'social-2', category: 'social', type: 'whatsapp', questionType: 'legit_or_scam',
    isScam: true, difficulty: 'medium',
    content: {
      senderName: 'Unknown',
      senderNumber: '+91 6000889977',
      messages: [
        { text: 'Hi, are you free to chat? My name is Sneha', isIncoming: true, time: '20:12' },
        { text: 'I got your number from a mutual friend. Do you want to do easy work from home? Earn Rs.5,000/day just by liking YouTube videos!', isIncoming: true, time: '20:14' },
      ],
    },
    redFlags: ['Unsolicited friendly DM', 'Too-good-to-be-true income', 'Liking YouTube pyramid scheme'],
    annotationTargets: ['Rs.5,000/day', 'liking YouTube videos'],
    teachingMoment: 'The like YouTube for money scam traps you into paying a Task Fee. It is a classic cashback fraud.',
    actionAdvice: 'Block. Report. Never pay to work.',
  },
  {
    id: 'social-3', category: 'social', type: 'whatsapp', questionType: 'what_would_you_do',
    isScam: true, difficulty: 'hard',
    content: {
      senderName: 'Rahul (Best Friend)',
      senderNumber: '+91 9811223344',
      messages: [
        { text: 'Bhai urgent help! My phone is blocked, I need Rs.15,000 for fees right now', isIncoming: true, time: '14:32' },
        { text: 'Please send to rahul.fees@ybl quickly, I will return tomorrow morning. Do not call, I am in class', isIncoming: true, time: '14:33' },
      ],
    },
    question: 'Your best friend Rahul urgently asks for Rs 15,000 on WhatsApp. He says do not call. What do you do?',
    options: [
      { id: 'a', text: 'Send the money because it is urgent', correct: false, reason: 'Urgency + do not call = scam signature. Always verify by voice.' },
      { id: 'b', text: 'Call or voice note Rahul on his number to verify', correct: true, reason: 'Perfect. Do not call is a huge red flag. The scammer has his account but not his voice.' },
      { id: 'c', text: 'Send Rs.1,000 as a token amount', correct: false, reason: 'Even a smaller amount sends a signal that you can be scammed more.' },
      { id: 'd', text: 'Ask for his mother maiden name as a test', correct: false, reason: 'Any public info can be guessed. Voice verification is stronger.' },
    ],
    redFlags: ['Do not call phrase', 'Urgency', 'Unknown VPA'],
    annotationTargets: ['Rs.15,000', 'Do not call', 'rahul.fees@ybl'],
    teachingMoment: 'WhatsApp account takeovers are common. Scammers block voice verification by saying I am in class or phone broken.',
    actionAdvice: 'Always voice verify. Enable two-step verification on your own WhatsApp too.',
  },
  {
    id: 'social-4', category: 'social', type: 'whatsapp', questionType: 'legit_or_scam',
    isScam: false, difficulty: 'easy',
    content: {
      senderName: 'Aarti (Cousin)',
      senderNumber: '+91 9845123450',
      messages: [
        { text: 'Hey! Are you coming for Diwali dinner Saturday? Mom asked me to check', isIncoming: true, time: '19:02' },
      ],
    },
    redFlags: [],
    annotationTargets: [],
    teachingMoment: 'Known contact, normal friendly message, no money, no links.',
    actionAdvice: 'Reply normally.',
  },
  {
    id: 'social-5', category: 'social', type: 'whatsapp', questionType: 'legit_or_scam',
    isScam: true, difficulty: 'medium',
    content: {
      senderName: 'WhatsApp Support',
      senderNumber: '+1 415 000 9999',
      messages: [
        { text: 'This is WhatsApp Security. Someone tried to log into your account.', isIncoming: true, time: '10:30' },
        { text: 'Please forward the 6-digit code we just sent to your number to verify ownership.', isIncoming: true, time: '10:31' },
      ],
    },
    redFlags: ['WhatsApp never messages you', 'Foreign number', 'Asks for verification code'],
    annotationTargets: ['WhatsApp Security', 'forward the 6-digit code'],
    teachingMoment: 'Forwarding your WhatsApp 6-digit code lets the scammer TAKE OVER your account. Never share.',
    actionAdvice: 'Never share the code. Turn on Two-Step Verification in WhatsApp settings.',
  },
  {
    id: 'social-6', category: 'social', type: 'call', questionType: 'legit_or_scam',
    isScam: true, difficulty: 'hard',
    content: {
      callerName: 'Inspector Sharma',
      callerOrg: 'Mumbai Police',
      callerNumber: '+91 8800997766',
      dialogue: [
        { speaker: 'Caller', text: 'A parcel in your name was seized at Mumbai airport containing drugs. This is Mumbai Police Cyber Cell.' },
        { speaker: 'Caller', text: 'To avoid arrest, transfer Rs.50,000 immediately as bond. This is a Supreme Court ordered digital arrest.' },
      ],
    },
    redFlags: ['Digital arrest does not exist', 'Drug parcel trope', 'Urgent bond payment', 'Scare tactics'],
    annotationTargets: ['digital arrest', 'Rs.50,000', 'drugs'],
    teachingMoment: 'The digital arrest scam is the #1 phone scam in India. There is NO such thing. Real police never demand money over phone.',
    actionAdvice: 'Hang up. Tell family. Report to 1930 and local police station in person.',
  },
  {
    id: 'social-7', category: 'social', type: 'whatsapp', questionType: 'legit_or_scam',
    isScam: true, difficulty: 'medium',
    content: {
      senderName: 'CEO Mr. Kapoor',
      senderNumber: '+91 9099088077',
      messages: [
        { text: 'Hi, this is Rajat Kapoor, CEO. I am in a meeting and need urgent help.', isIncoming: true, time: '15:12' },
        { text: 'Please buy 5 Amazon gift cards of Rs.2,000 each. I will reimburse. Share codes quickly.', isIncoming: true, time: '15:13' },
      ],
    },
    redFlags: ['CEO impersonation', 'Gift card scam signature', 'Unknown number'],
    annotationTargets: ['CEO', 'Amazon gift cards', 'Share codes'],
    teachingMoment: 'Gift cards are untraceable. Any boss asking you to buy and share codes is a scammer.',
    actionAdvice: 'Verify via official company channel. Report to HR.',
  },
  {
    id: 'social-8', category: 'social', type: 'sms', questionType: 'true_or_false',
    statement: 'A real friend will always be okay with you verifying via voice call before sending money.',
    isTrue: true, difficulty: 'easy', isScam: false,
    redFlags: [], annotationTargets: [],
    teachingMoment: 'Anyone who refuses voice verification is not your friend. They are a scammer with your friend account.',
    actionAdvice: 'Always insist on a quick voice call before sending money.',
  },
  {
    id: 'social-9', category: 'social', type: 'whatsapp', questionType: 'legit_or_scam',
    isScam: true, difficulty: 'medium',
    content: {
      senderName: 'Crypto Mentor Sir',
      senderNumber: '+91 8234567890',
      messages: [
        { text: 'Bhai, I earned Rs.1.2L in 3 days using my crypto signal group', isIncoming: true, time: '21:05' },
        { text: 'Join my VIP group, just Rs.500 entry, guaranteed profit or refund. Limited seats!', isIncoming: true, time: '21:06' },
      ],
    },
    redFlags: ['Guaranteed profit', 'Paid entry to signal group', 'FOMO limited seats'],
    annotationTargets: ['Guaranteed profit', 'Rs.500 entry', 'Limited seats'],
    teachingMoment: 'No genuine trader sells signals. Guaranteed profit is illegal under SEBI rules.',
    actionAdvice: 'Block. Report on WhatsApp. Never pay for signals.',
  },
  {
    id: 'social-10', category: 'social', type: 'call', questionType: 'what_would_you_do',
    isScam: true, difficulty: 'easy',
    content: {
      callerName: 'Recorded Voice',
      callerOrg: 'Automated Call',
      callerNumber: '+91 6112233445',
      dialogue: [
        { speaker: 'Caller', text: '(Recording) Your Aadhaar card has been misused in a money laundering case. Press 1 to connect to an officer immediately.' },
      ],
    },
    question: 'Your phone plays a recorded message saying your Aadhaar was misused. What do you do?',
    options: [
      { id: 'a', text: 'Press 1 to speak to the officer', correct: false, reason: 'Pressing 1 connects you to the scam call center.' },
      { id: 'b', text: 'Hang up and call 1947 (Aadhaar helpline) directly', correct: true, reason: 'Correct. Hang up on automated scams, then verify via official helpline only.' },
      { id: 'c', text: 'Stay on the line to find out more', correct: false, reason: 'Do not engage with scammers.' },
      { id: 'd', text: 'Give your Aadhaar number to clear your name', correct: false, reason: 'Never share Aadhaar over phone.' },
    ],
    redFlags: ['Automated call', 'Scary claim', 'Call-to-action to press number'],
    annotationTargets: ['Aadhaar card has been misused', 'Press 1'],
    teachingMoment: 'Automated scare calls prey on fear. Hang up and verify through official helplines (Aadhaar: 1947, cyber: 1930).',
    actionAdvice: 'Hang up. Call 1947 if worried.',
  },
];
