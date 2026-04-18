{
  "product": {
    "name": "PhishProof",
    "tagline": "A premium, Duolingo-adjacent scam-spotting game for Indian teens",
    "north_star_wow_moment": "Present a hyper-realistic scam UI, let the student almost tap ‘Legit’, then freeze + annotate the exact trick directly on the scenario surface.",
    "platform": "Mobile-first web (390px target), pure frontend CRA React",
    "non_negotiables": [
      "No login, no API, instantly playable",
      "No white backgrounds anywhere (only clay or glass surfaces)",
      "Always-animated dark gradient background (15s loop)",
      "60fps on mid-range Android; respect prefers-reduced-motion",
      "Mascot ‘Kavach’ always visible",
      "All interactive + key info elements must include data-testid"
    ]
  },

  "brand_attributes": {
    "tone": ["playful", "serious", "protective", "tactile", "premium-mobile-game"],
    "personality": [
      "Duolingo-adjacent progression + rewards",
      "Indian teen-friendly realism (UPI/SMS/WhatsApp familiarity)",
      "‘Safety is a superpower’ vibe"
    ],
    "visual_style_fusion": [
      "Claymorphism for primary interactive objects (buttons, nodes)",
      "Liquid glass panels for overlays, missions, breakdown teaching cards",
      "Animated deep gradient sky + subtle noise for immersion"
    ]
  },

  "typography": {
    "fonts": {
      "heading": {
        "family": "Nunito",
        "weights": [800],
        "usage": "All headings, XP numbers, badge titles"
      },
      "body": {
        "family": "Inter",
        "weights": [400, 600],
        "usage": "Body copy, labels, helper text"
      },
      "scenario_mono": {
        "family": "JetBrains Mono",
        "weights": [400, 600],
        "usage": "SMS/email/URL bars/OTP text; anything that must feel ‘system’"
      }
    },
    "scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight",
      "h2": "text-base md:text-lg font-semibold text-white/85",
      "h3": "text-xl font-extrabold",
      "body": "text-sm text-white/80 leading-relaxed md:text-base",
      "caption": "text-xs text-white/60",
      "mono": "font-mono text-[12px] leading-snug text-white/85"
    },
    "letter_spacing": {
      "headings": "tracking-tight",
      "mono": "tracking-normal",
      "buttons": "tracking-wide"
    }
  },

  "color_system": {
    "required_palette": {
      "correct_green": "#4CAF50",
      "wrong_red": "#F44336",
      "warning_amber": "#FF9800",
      "xp_gold": "#FFD700",
      "primary_indigo": "#5C6BC0",
      "scam_red": "#E53935",
      "safe_green": "#43A047"
    },
    "supporting_neutrals": {
      "ink": "#0B1020",
      "navy": "#0F1630",
      "midnight": "#0A0F22",
      "glass_white": "rgba(255,255,255,0.18)",
      "clay_white": "rgba(255,255,255,0.72)",
      "stroke_soft": "rgba(255,255,255,0.14)",
      "text_primary": "rgba(255,255,255,0.92)",
      "text_secondary": "rgba(255,255,255,0.78)",
      "text_muted": "rgba(255,255,255,0.60)"
    },
    "color_usage_matrix": {
      "primary_indigo": [
        "Primary CTAs (Start, Continue)",
        "Skill nodes (default unlocked)",
        "Progress accents (XP bar fill base)"
      ],
      "correct_green_safe_green": [
        "Correct answer feedback",
        "Safe choice chips",
        "Success rings/glows (short-lived)"
      ],
      "wrong_red_scam_red": [
        "Wrong answer feedback",
        "Scam indicators + red-flag highlights",
        "Danger meter high state"
      ],
      "warning_amber": [
        "‘Suspicious’ state",
        "Hints + caution banners",
        "Medium danger meter"
      ],
      "xp_gold": [
        "XP counters",
        "Stars",
        "Badge borders + confetti accent"
      ],
      "neutrals": [
        "All reading surfaces (glass/clay)",
        "Device frames",
        "HUD background"
      ]
    },
    "contrast_rules": [
      "All text on glass must be >= white/78 with subtle shadow for legibility.",
      "Never place long paragraphs directly on animated gradient; always on glass panels.",
      "Use colored glows only as accents (rings, outlines), not as large fills behind text."
    ]
  },

  "design_tokens_css": {
    "instructions": "Add these to /app/frontend/src/index.css under :root and .dark overrides. Keep Tailwind for layout; use CSS vars for clay/glass/shadows.",
    "css": "@layer base {\n  :root {\n    /* Fonts */\n    --font-heading: 'Nunito', ui-sans-serif, system-ui;\n    --font-body: 'Inter', ui-sans-serif, system-ui;\n    --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular;\n\n    /* Core colors */\n    --pp-correct: 76 175 80;      /* #4CAF50 */\n    --pp-wrong: 244 67 54;        /* #F44336 */\n    --pp-warning: 255 152 0;      /* #FF9800 */\n    --pp-xp: 255 215 0;           /* #FFD700 */\n    --pp-indigo: 92 107 192;      /* #5C6BC0 */\n    --pp-scam: 229 57 53;         /* #E53935 */\n    --pp-safe: 67 160 71;         /* #43A047 */\n\n    /* Surfaces */\n    --pp-glass: rgba(255,255,255,0.18);\n    --pp-glass-stroke: rgba(255,255,255,0.14);\n    --pp-clay: rgba(255,255,255,0.72);\n    --pp-clay-stroke: rgba(255,255,255,0.10);\n\n    /* Text */\n    --pp-text: rgba(255,255,255,0.92);\n    --pp-text-2: rgba(255,255,255,0.78);\n    --pp-text-3: rgba(255,255,255,0.60);\n\n    /* Radii */\n    --pp-r-lg: 24px;\n    --pp-r-md: 18px;\n    --pp-r-sm: 14px;\n    --pp-r-pill: 999px;\n\n    /* Shadows (tuned for dark bg) */\n    --pp-shadow-clay-1: 0 18px 40px rgba(0,0,0,0.45);\n    --pp-shadow-clay-2: inset 0 1px 0 rgba(255,255,255,0.35);\n    --pp-shadow-clay-3: inset 0 -10px 24px rgba(0,0,0,0.22);\n\n    --pp-shadow-glass-1: 0 18px 50px rgba(0,0,0,0.55);\n    --pp-shadow-glass-2: inset 0 1px 0 rgba(255,255,255,0.18);\n\n    /* Focus ring */\n    --pp-ring: rgba(92,107,192,0.55);\n\n    /* Motion */\n    --pp-ease-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    --pp-ease-out: cubic-bezier(0.16, 1, 0.3, 1);\n  }\n}\n"
  },

  "background_system": {
    "animated_gradient_css": {
      "class_name": "pp-animated-bg",
      "css": ".pp-animated-bg {\n  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #533483);\n  background-size: 400% 400%;\n  animation: ppGradient 15s ease infinite;\n}\n@keyframes ppGradient {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}\n\n/* Noise overlay (cheap + performant) */\n.pp-noise::before {\n  content: '';\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"160\" height=\"160\" filter=\"url(%23n)\" opacity=\"0.18\"/></svg>');\n  mix-blend-mode: overlay;\n  opacity: 0.22;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .pp-animated-bg { animation: none; }\n}\n",
      "tailwind_usage": "<div className=\"min-h-dvh pp-animated-bg pp-noise text-white\">..."
    },
    "gradient_restriction_note": "Background gradient is allowed as a full-viewport section because it is the app’s core environment; all reading content must sit on glass/clay surfaces to preserve readability. Do not add additional gradients elsewhere beyond small decorative orbs (<20% viewport)."
  },

  "surface_recipes": {
    "clay_surface": {
      "name": "Clay",
      "definition": "Soft, tactile, slightly inflated surfaces for primary actions and nodes.",
      "css_recipe": {
        "background": "rgba(255,255,255,0.72)",
        "border": "1px solid rgba(255,255,255,0.10)",
        "shadow": "var(--pp-shadow-clay-1), var(--pp-shadow-clay-2), var(--pp-shadow-clay-3)",
        "radius": "var(--pp-r-lg)"
      },
      "tailwind_example": "rounded-[var(--pp-r-lg)] bg-[rgba(255,255,255,0.72)] border border-white/10 shadow-[var(--pp-shadow-clay-1),var(--pp-shadow-clay-2),var(--pp-shadow-clay-3)]"
    },
    "glass_surface": {
      "name": "LiquidGlass",
      "definition": "Frosted panels for overlays, teaching cards, missions, HUD containers.",
      "css_recipe": {
        "background": "rgba(255,255,255,0.18)",
        "border": "1px solid rgba(255,255,255,0.14)",
        "backdrop": "blur(24px) saturate(180%)",
        "shadow": "var(--pp-shadow-glass-1), var(--pp-shadow-glass-2)",
        "radius": "var(--pp-r-lg)"
      },
      "tailwind_example": "rounded-[var(--pp-r-lg)] bg-[rgba(255,255,255,0.18)] border border-white/15 shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)] backdrop-blur-[24px] backdrop-saturate-[180%]"
    }
  },

  "components": {
    "component_path": {
      "shadcn_ui": "/app/frontend/src/components/ui",
      "use_these": {
        "Button": "button.jsx",
        "Card": "card.jsx",
        "Progress": "progress.jsx",
        "Badge": "badge.jsx",
        "Dialog": "dialog.jsx",
        "Drawer": "drawer.jsx",
        "Tabs": "tabs.jsx",
        "Tooltip": "tooltip.jsx",
        "Carousel": "carousel.jsx",
        "ScrollArea": "scroll-area.jsx",
        "Sonner": "sonner.jsx"
      }
    },

    "GlassCard": {
      "base": "Use shadcn Card but override className to glass recipe.",
      "anatomy": ["CardHeader (optional)", "CardContent", "CardFooter"],
      "tailwind": {
        "wrapper": "rounded-[var(--pp-r-lg)] bg-[rgba(255,255,255,0.18)] border border-white/15 shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)] backdrop-blur-[24px] backdrop-saturate-[180%]",
        "title": "font-[var(--font-heading)] font-extrabold text-white",
        "body": "font-[var(--font-body)] text-white/80"
      },
      "micro_interactions": [
        "Hover (desktop): slight lift translate-y-[-2px] + highlight stroke",
        "Tap: scale 0.98 (no transition: all)"
      ],
      "data_testid": "glass-card"
    },

    "ClayButton": {
      "base": "Use shadcn Button with custom variants: primary, danger, success, ghost-glass.",
      "sizes": {
        "md": "h-12 px-5 text-sm",
        "lg": "h-14 px-6 text-base"
      },
      "tailwind": {
        "base": "rounded-[18px] min-h-12 px-5 font-[var(--font-heading)] font-extrabold tracking-wide text-[#0B1020] bg-[rgba(255,255,255,0.72)] border border-white/10 shadow-[var(--pp-shadow-clay-1),var(--pp-shadow-clay-2),var(--pp-shadow-clay-3)] transition-[background-color,box-shadow,opacity] duration-200",
        "hover": "hover:bg-[rgba(255,255,255,0.78)]",
        "active": "active:translate-y-[1px] active:shadow-[0_10px_26px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-8px_18px_rgba(0,0,0,0.22)]",
        "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-ring)] focus-visible:ring-offset-0"
      },
      "variants": {
        "primary": "text-white bg-[rgb(var(--pp-indigo))] border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-10px_24px_rgba(0,0,0,0.25)] hover:bg-[rgba(92,107,192,0.92)]",
        "success": "text-white bg-[rgb(var(--pp-correct))] hover:bg-[rgba(76,175,80,0.92)]",
        "danger": "text-white bg-[rgb(var(--pp-wrong))] hover:bg-[rgba(244,67,54,0.92)]",
        "ghost_glass": "text-white bg-[rgba(255,255,255,0.12)] border border-white/15 backdrop-blur-[18px] shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)]"
      },
      "micro_interactions": [
        "GSAP press: scale 0.98 then elastic back to 1",
        "Correct: quick glow ring in safe green (300ms) then fade",
        "Wrong: shake X-axis 10px with back.out ease"
      ],
      "data_testid_examples": [
        "data-testid=\"welcome-start-button\"",
        "data-testid=\"game-legit-button\"",
        "data-testid=\"game-scam-button\""
      ]
    },

    "SkillNode": {
      "definition": "Duolingo-like circular node with lock/unlock, stars, and mascot reaction anchor.",
      "sizes": {
        "node": "w-[76px] h-[76px]",
        "node_large": "w-[92px] h-[92px]"
      },
      "tailwind": {
        "unlocked": "rounded-full bg-[rgba(255,255,255,0.72)] border border-white/10 shadow-[var(--pp-shadow-clay-1),var(--pp-shadow-clay-2),var(--pp-shadow-clay-3)]",
        "locked": "rounded-full bg-[rgba(255,255,255,0.22)] border border-white/10 backdrop-blur-[10px] shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)] opacity-70",
        "completed_ring": "ring-4 ring-[rgba(67,160,71,0.55)]",
        "current_pulse": "after:content-[''] after:absolute after:inset-[-10px] after:rounded-full after:border after:border-white/20 after:animate-[ppPulse_1.6s_ease-in-out_infinite]"
      },
      "connector": {
        "type": "SVG path behind nodes",
        "style": "stroke: rgba(255,255,255,0.22); stroke-width: 10; stroke-linecap: round; filter: drop-shadow(0 10px 24px rgba(0,0,0,0.35));",
        "progress": "overlay stroke in indigo with stroke-dasharray animation"
      },
      "data_testid": "skill-map-node"
    },

    "GameHUD": {
      "layout": "Sticky top HUD inside glass capsule; never blocks scenario tap targets.",
      "elements": ["Hearts (5)", "XP bar", "Streak flame", "Progress dots"],
      "tailwind": {
        "container": "sticky top-3 z-30 mx-auto w-[min(420px,calc(100%-24px))] rounded-[var(--pp-r-pill)] bg-[rgba(255,255,255,0.14)] border border-white/15 backdrop-blur-[22px] shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)] px-3 py-2",
        "xp_bar": "h-2 rounded-full bg-white/15",
        "xp_fill": "h-2 rounded-full bg-[rgb(var(--pp-xp))]",
        "hearts": "flex gap-1",
        "dot": "h-1.5 w-1.5 rounded-full bg-white/25",
        "dot_active": "bg-[rgb(var(--pp-indigo))]"
      },
      "data_testid_examples": [
        "data-testid=\"hud-hearts\"",
        "data-testid=\"hud-xp-bar\"",
        "data-testid=\"hud-streak\""
      ]
    },

    "ScenarioDeviceFrame": {
      "definition": "A clay outer shell + inner glass screen to host realistic scenario renderers.",
      "tailwind": {
        "outer": "rounded-[32px] bg-[rgba(255,255,255,0.22)] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)] p-3",
        "inner": "rounded-[26px] overflow-hidden bg-[rgba(0,0,0,0.35)] border border-white/10"
      },
      "performance": [
        "Avoid heavy blur inside the inner screen; keep blur on outer overlays only.",
        "Use translateZ(0) only on animated elements, not entire tree."
      ],
      "data_testid": "scenario-device-frame"
    },

    "ScenarioRenderers": {
      "shared_rules": [
        "Use JetBrains Mono for message content and URLs.",
        "Use realistic spacing, timestamps, and system icons (Lucide).",
        "All scenario surfaces must be readable: use solid dark panels inside device frame (not gradient).",
        "Add subtle scanlines/noise only at 6–10% opacity."
      ],
      "AndroidSMS": {
        "look": "Material-ish header + message bubbles; scam SMS includes shortened links, urgency, OTP bait.",
        "tailwind": {
          "screen": "bg-[#0B1020] text-white",
          "header": "h-12 px-3 flex items-center justify-between bg-[#111A33]",
          "bubble_in": "max-w-[85%] rounded-2xl bg-white/10 border border-white/10 px-3 py-2",
          "bubble_out": "max-w-[85%] ml-auto rounded-2xl bg-[rgba(92,107,192,0.22)] border border-white/10 px-3 py-2",
          "meta": "text-[11px] text-white/55"
        },
        "data_testid": "scenario-android-sms"
      },
      "WhatsAppChat": {
        "look": "WhatsApp-like chat with green-ish outgoing bubble tint (but keep within palette; use safe green at low opacity).",
        "tailwind": {
          "screen": "bg-[#0B1020]",
          "header": "h-12 px-3 flex items-center gap-2 bg-[#0F1630]",
          "bubble_in": "rounded-2xl bg-white/10 border border-white/10 px-3 py-2",
          "bubble_out": "ml-auto rounded-2xl bg-[rgba(67,160,71,0.18)] border border-white/10 px-3 py-2",
          "reply_chip": "inline-flex items-center rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[12px]"
        },
        "data_testid": "scenario-whatsapp"
      },
      "BHIM_UPI": {
        "look": "BHIM-like pay screen: amount, payee, UPI ID, warning banners, PIN prompt.",
        "tailwind": {
          "screen": "bg-[#0B1020]",
          "top": "px-4 pt-4 pb-3 bg-[#111A33]",
          "amount": "font-[var(--font-heading)] text-3xl text-white",
          "field": "rounded-xl bg-white/10 border border-white/10 px-3 py-2",
          "cta": "rounded-2xl h-12 bg-[rgb(var(--pp-indigo))] text-white font-extrabold",
          "warning": "rounded-xl bg-[rgba(255,152,0,0.16)] border border-[rgba(255,152,0,0.35)] text-white/90 px-3 py-2"
        },
        "data_testid": "scenario-bhim-upi"
      },
      "PhoneCall": {
        "look": "Incoming call UI + dialogue transcript; scam uses ‘KYC’, ‘bank verification’, ‘remote app’ cues.",
        "tailwind": {
          "screen": "bg-[#0B1020]",
          "caller": "text-center pt-10",
          "actions": "mt-8 grid grid-cols-2 gap-3 px-6",
          "accept": "h-14 rounded-full bg-[rgb(var(--pp-safe))] text-white font-extrabold",
          "decline": "h-14 rounded-full bg-[rgb(var(--pp-scam))] text-white font-extrabold"
        },
        "data_testid": "scenario-phone-call"
      },
      "EmailViewer": {
        "look": "Gmail-ish header, sender, subject, CTA button, suspicious domain.",
        "tailwind": {
          "screen": "bg-[#0B1020]",
          "header": "h-12 px-3 flex items-center justify-between bg-[#111A33]",
          "subject": "font-[var(--font-heading)] text-lg",
          "from": "text-[12px] text-white/70",
          "body": "mt-3 rounded-2xl bg-white/5 border border-white/10 p-3"
        },
        "data_testid": "scenario-email"
      },
      "FakeWebsite": {
        "look": "Browser chrome with URL bar; fake site uses lookalike domain + urgent banner.",
        "tailwind": {
          "screen": "bg-[#0B1020]",
          "chrome": "h-10 px-2 flex items-center gap-2 bg-[#111A33]",
          "url": "flex-1 rounded-full bg-black/30 border border-white/10 px-3 py-1 font-mono text-[12px] text-white/85",
          "page": "p-4",
          "banner": "rounded-xl bg-[rgba(229,57,53,0.16)] border border-[rgba(229,57,53,0.35)] px-3 py-2"
        },
        "data_testid": "scenario-fake-website"
      }
    },

    "BreakdownAnnotatedOverlay": {
      "definition": "Freeze the scenario, then overlay callouts with arrows and highlighted rectangles.",
      "implementation": {
        "overlay": "Absolute positioned layer inside ScenarioDeviceFrame; use pointer-events-none for callouts; highlight boxes are pointer-events-auto only if tappable.",
        "highlight": "Use semi-transparent red/amber fills + dashed border + glow.",
        "tailwind": {
          "callout": "max-w-[220px] rounded-2xl bg-[rgba(255,255,255,0.18)] border border-white/15 backdrop-blur-[18px] shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)] p-3",
          "flag_red": "bg-[rgba(229,57,53,0.18)] border border-[rgba(229,57,53,0.35)]",
          "flag_amber": "bg-[rgba(255,152,0,0.16)] border border-[rgba(255,152,0,0.35)]"
        }
      },
      "data_testid": "breakdown-annotated-overlay"
    },

    "ResultsStarsXP": {
      "definition": "3-star result + XP counter tick-up + badge unlock.",
      "tailwind": {
        "stars": "flex items-center justify-center gap-3",
        "star": "h-12 w-12 text-[rgb(var(--pp-xp))] drop-shadow-[0_12px_24px_rgba(255,215,0,0.25)]",
        "xp": "mt-4 text-center font-[var(--font-heading)] text-4xl text-[rgb(var(--pp-xp))]"
      },
      "data_testid": "results-stars-xp"
    },

    "DailyMissionsDrawer": {
      "base": "Use shadcn Drawer for mobile slide-up.",
      "tailwind": {
        "panel": "rounded-t-[28px] bg-[rgba(255,255,255,0.18)] border border-white/15 backdrop-blur-[24px] shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)]",
        "mission": "rounded-2xl bg-white/10 border border-white/10 p-3"
      },
      "data_testid": "daily-missions-drawer"
    }
  },

  "layout_grid": {
    "mobile_first": {
      "viewport_target": "390px",
      "container": "mx-auto w-full max-w-[420px] px-3",
      "vertical_rhythm": "Use 16–24px gaps; prefer gap-4/gap-6; avoid cramped stacks.",
      "touch_targets": "All tappables min-h-12 min-w-12; spacing between primary actions >= 12px."
    },
    "page_scaffolds": {
      "Welcome": {
        "structure": [
          "Top: Kavach mascot (sticky-ish, always visible)",
          "Hero copy + short promise",
          "Name input (optional) + Start CTA",
          "Mini preview carousel of scam types"
        ],
        "tailwind": {
          "page": "min-h-dvh pp-animated-bg pp-noise",
          "stack": "mx-auto w-full max-w-[420px] px-3 pt-6 pb-10 flex flex-col gap-6",
          "cta_row": "grid grid-cols-1 gap-3"
        },
        "data_testid": {
          "name_input": "welcome-name-input",
          "start": "welcome-start-button"
        }
      },
      "SkillMap": {
        "structure": [
          "Sticky HUD",
          "Scrollable vertical path with 6 category nodes",
          "Bottom: Daily missions button (glass pill)"
        ],
        "tailwind": {
          "scroll": "pb-24",
          "path": "relative mx-auto w-full max-w-[420px] px-3 pt-4"
        },
        "data_testid": {
          "map": "skill-map",
          "missions": "skill-map-daily-missions-button"
        }
      },
      "GameRound": {
        "structure": [
          "Sticky HUD",
          "ScenarioDeviceFrame (center)",
          "Prompt + question type UI",
          "Primary actions (Legit/Scam or options)"
        ],
        "tailwind": {
          "stack": "mx-auto w-full max-w-[420px] px-3 pt-4 pb-10 flex flex-col gap-4",
          "actions": "grid grid-cols-2 gap-3"
        },
        "data_testid": {
          "frame": "scenario-device-frame",
          "actions": "game-actions"
        }
      },
      "Breakdown": {
        "structure": [
          "Frozen scenario with annotations",
          "3 teaching cards (glass)",
          "Continue button"
        ],
        "tailwind": {
          "cards": "grid grid-cols-1 gap-3",
          "continue": "mt-2"
        },
        "data_testid": {
          "teaching_cards": "breakdown-teaching-cards",
          "continue": "breakdown-continue-button"
        }
      },
      "Results": {
        "structure": [
          "Stars + XP tick-up",
          "Badge unlock (if any)",
          "Next node CTA + back to map"
        ],
        "tailwind": {
          "stack": "mx-auto w-full max-w-[420px] px-3 pt-6 pb-10 flex flex-col gap-5"
        },
        "data_testid": {
          "xp": "results-xp-counter",
          "next": "results-next-button",
          "map": "results-back-to-map-button"
        }
      }
    }
  },

  "motion_grammar": {
    "libraries": {
      "gsap": "GSAP 3",
      "framer_motion": "Framer Motion 11"
    },
    "principles": [
      "Use motion to teach: reveal → pause → annotate → reward.",
      "Prefer transform + opacity animations for 60fps.",
      "Avoid animating blur/backdrop-filter continuously; only on entrance/exit.",
      "Use back.out and elastic for game feel; keep durations short (180–420ms).",
      "Respect prefers-reduced-motion: swap to fades + no shakes/confetti."
    ],
    "choreography": {
      "welcome_mascot_entrance": {
        "sequence": [
          "Mascot drops in from y:-24 with back.out(1.8)",
          "Shield shine sweep (mask) 600ms",
          "CTA buttons pop-in stagger 80ms"
        ]
      },
      "answer_correct": {
        "sequence": [
          "Button press scale 0.98",
          "HUD XP bar fill pulses",
          "Confetti micro-burst (small) near top",
          "Mascot expression: proud"
        ],
        "timing_ms": 650
      },
      "answer_wrong": {
        "sequence": [
          "Device frame shakes (x: [-10, 10, -6, 6, 0]) 320ms",
          "Hearts decrement with pop",
          "Mascot expression: worried"
        ]
      },
      "reveal_breakdown": {
        "sequence": [
          "Freeze scenario (stop internal animations)",
          "Dim overlay 0→1 opacity 180ms",
          "Red-flag boxes draw-in (stroke-dash) 260ms",
          "Callouts slide-in with back.out stagger 90ms"
        ]
      },
      "level_up_badge_unlock": {
        "sequence": [
          "Full-screen glass overlay fades in",
          "Badge scales 0.6→1 with elastic",
          "Confetti burst (large) + XP tick-up",
          "Mascot dance loop 1.2s"
        ]
      }
    },
    "reduced_motion": {
      "rules": [
        "Disable background gradient animation",
        "Replace shakes with color flash",
        "Replace confetti with subtle sparkle icon fade"
      ]
    }
  },

  "mascot_kavach": {
    "always_visible_rule": "Kavach sits as a floating assistant anchored bottom-right (or top-right on Welcome), never covering primary buttons; can be dragged slightly (optional).",
    "svg_skeleton": {
      "note": "Skeleton only; main agent should implement as inline SVG component with props: expression, size.",
      "structure": [
        "Shield body (rounded path)",
        "Face window (glass inset)",
        "Eyes + brows (swap per expression)",
        "Mouth (swap per expression)",
        "Glow outline (indigo)"
      ],
      "expressions": {
        "idle": "soft smile, blink loop",
        "proud": "wide smile, star eyes",
        "worried": "downturned mouth, brows inward",
        "alert": "open mouth small, brows up",
        "wink": "one eye closed",
        "dance": "tilt + bounce + sparkle"
      }
    },
    "tailwind_container": "fixed z-40 right-3 bottom-24 sm:bottom-6",
    "data_testid": "kavach-mascot"
  },

  "libraries_and_setup": {
    "required": [
      {
        "name": "gsap",
        "install": "npm i gsap",
        "usage": "Use for timeline choreography, shakes, path drawing."
      },
      {
        "name": "framer-motion",
        "install": "npm i framer-motion",
        "usage": "Use for component-level entrance/exit, layout transitions."
      },
      {
        "name": "canvas-confetti",
        "install": "npm i canvas-confetti",
        "usage": "Confetti bursts on correct/level-up; keep bursts short."
      }
    ],
    "icons": {
      "rule": "Use lucide-react only (no emoji icons).",
      "install": "npm i lucide-react"
    }
  },

  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid (kebab-case, role-based).",
    "examples": [
      "data-testid=\"skill-map-node-upi-fraud\"",
      "data-testid=\"scenario-choice-option-1\"",
      "data-testid=\"breakdown-red-flag-1\"",
      "data-testid=\"results-xp-counter\""
    ]
  },

  "instructions_to_main_agent": [
    "Replace default shadcn light tokens in index.css with PhishProof tokens; ensure body uses pp-animated-bg wrapper and text colors are white-based.",
    "Create utility classes (or small CSS modules) for pp-glass and pp-clay; do not rely on Tailwind defaults for shadows.",
    "Implement pages: Welcome, SkillMap, GameRound, Breakdown, Results; plus overlays: BadgeUnlock, LevelUpBurst, DailyMissions (Drawer).",
    "Build ScenarioRenderers as separate React components in JS (not TSX). Each renderer must look like a real app screen inside ScenarioDeviceFrame.",
    "Implement Breakdown annotated overlay with absolute-positioned highlights + callouts; animate draw-in using GSAP.",
    "Use prefers-reduced-motion to disable background animation and heavy effects.",
    "Ensure every button/input/choice has data-testid."
  ]
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
