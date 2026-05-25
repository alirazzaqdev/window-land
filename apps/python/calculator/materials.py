"""UAE market pricing database for glass & aluminium works (AED)."""

PRICING = {
    "curtain_wall": {
        "thermal":  {"min_sqm": 380, "max_sqm": 550},
        "normal":   {"min_sqm": 280, "max_sqm": 420},
    },
    "sliding_doors": {
        "lift_and_slide": {"min_rm": 850,  "max_rm": 1400},
        "bifold":         {"min_rm": 650,  "max_rm": 950},
        "automatic":      {"min_rm": 1100, "max_rm": 1800},
        "standard":       {"min_rm": 380,  "max_rm": 650},
    },
    "pergola": {
        "louvered": {"min_sqm": 280, "max_sqm": 450},
        "fixed":    {"min_sqm": 180, "max_sqm": 320},
    },
    "glass_balustrade": {"min_rm": 420, "max_rm": 680},
    "acp_cladding":     {"min_sqm": 120, "max_sqm": 220},
    "office_partitions":{"min_sqm": 180, "max_sqm": 350},
    "shower_partitions":{"min_unit": 1800, "max_unit": 4500},
    "tempered_glass":   {"min_sqm": 95,  "max_sqm": 180},
    "double_glazing":   {"min_sqm": 180, "max_sqm": 320},
    "ventilation_windows": {"min_sqm": 320, "max_sqm": 520},
}

EXTRA_COSTS = {
    "powder_coating":     {"min": 0.08, "max": 0.12},  # % of base cost
    "tempered_glass":     {"min": 0.10, "max": 0.18},
    "double_glazing":     {"min": 0.15, "max": 0.25},
    "motorised":          {"min": 0.20, "max": 0.35},
    "custom_ral_colour":  {"min": 0.05, "max": 0.10},
}

SERVICE_DISPLAY_NAMES = {
    "curtain_wall":        "Curtain Wall System",
    "sliding_doors":       "Sliding Door System",
    "pergola":             "Aluminium Pergola",
    "glass_balustrade":    "Glass Balustrade",
    "acp_cladding":        "ACP Cladding",
    "office_partitions":   "Office Partitions",
    "shower_partitions":   "Shower Partition",
    "tempered_glass":      "Tempered Glass Works",
    "double_glazing":      "Double Glazing",
    "ventilation_windows": "Ventilation Windows",
}

TIMELINE_WEEKS = {
    "curtain_wall":       "4–8",
    "sliding_doors":      "2–4",
    "pergola":            "3–5",
    "glass_balustrade":   "2–3",
    "acp_cladding":       "3–6",
    "office_partitions":  "2–4",
    "shower_partitions":  "1–2",
    "tempered_glass":     "1–3",
    "double_glazing":     "2–4",
    "ventilation_windows":"2–4",
}

VAT_RATE = 0.05
