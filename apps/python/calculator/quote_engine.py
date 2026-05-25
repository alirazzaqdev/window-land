"""Core quote calculation logic for Window Land services."""

from dataclasses import dataclass, field
from typing import Optional
from .materials import PRICING, EXTRA_COSTS, SERVICE_DISPLAY_NAMES, TIMELINE_WEEKS, VAT_RATE


@dataclass
class QuoteRequest:
    service: str
    subtype: str = "normal"
    width: float = 1.0
    height: float = 1.0
    floors: int = 1
    extras: list[str] = field(default_factory=list)
    quantity: int = 1  # for unit-priced items like shower partitions


@dataclass
class BreakdownItem:
    item: str
    min: float
    max: float


@dataclass
class QuoteResult:
    service: str
    dimensions: str
    area_sqm: float
    min_aed: float
    max_aed: float
    min_with_vat: float
    max_with_vat: float
    breakdown: list[BreakdownItem]
    timeline_weeks: str
    notes: str
    disclaimer: str


def calculate_quote(req: QuoteRequest) -> QuoteResult:
    pricing = PRICING.get(req.service)
    if not pricing:
        raise ValueError(f"Unknown service: {req.service}")

    area = req.width * req.height * req.floors
    display_name = SERVICE_DISPLAY_NAMES.get(req.service, req.service.replace("_", " ").title())
    subtype_label = req.subtype.replace("_", " ").title()
    timeline = TIMELINE_WEEKS.get(req.service, "2–6")

    # ── Per-sqm services ──────────────────────────────────────────
    if "min_sqm" in pricing or req.subtype in pricing and "min_sqm" in pricing.get(req.subtype, {}):
        rates = pricing.get(req.subtype, pricing) if req.subtype in pricing else pricing
        min_material = area * rates["min_sqm"] * 0.75
        max_material = area * rates["max_sqm"] * 0.75
        min_labour = area * rates["min_sqm"] * 0.20
        max_labour = area * rates["max_sqm"] * 0.20
        min_access = area * rates["min_sqm"] * 0.05
        max_access = area * rates["max_sqm"] * 0.05
        breakdown = [
            BreakdownItem(f"{display_name} Material & Fabrication", round(min_material), round(max_material)),
            BreakdownItem("Installation Labour", round(min_labour), round(max_labour)),
            BreakdownItem("Accessories, Sealants & Fixings", round(min_access), round(max_access)),
        ]

    # ── Per-running-metre services ─────────────────────────────────
    elif "min_rm" in pricing or req.subtype in pricing and "min_rm" in pricing.get(req.subtype, {}):
        rates = pricing.get(req.subtype, pricing) if req.subtype in pricing else pricing
        rm = req.width * req.floors
        min_material = rm * rates["min_rm"] * 0.72
        max_material = rm * rates["max_rm"] * 0.72
        min_labour = rm * rates["min_rm"] * 0.22
        max_labour = rm * rates["max_rm"] * 0.22
        min_access = rm * rates["min_rm"] * 0.06
        max_access = rm * rates["max_rm"] * 0.06
        breakdown = [
            BreakdownItem(f"{display_name} Material & Fabrication", round(min_material), round(max_material)),
            BreakdownItem("Installation Labour", round(min_labour), round(max_labour)),
            BreakdownItem("Accessories & Hardware", round(min_access), round(max_access)),
        ]
        area = rm  # use RM for display

    # ── Per-unit services (shower partitions) ─────────────────────
    elif "min_unit" in pricing:
        units = req.quantity
        min_material = units * pricing["min_unit"] * 0.70
        max_material = units * pricing["max_unit"] * 0.70
        min_labour = units * pricing["min_unit"] * 0.25
        max_labour = units * pricing["max_unit"] * 0.25
        min_access = units * pricing["min_unit"] * 0.05
        max_access = units * pricing["max_unit"] * 0.05
        breakdown = [
            BreakdownItem(f"{display_name} ({units} unit{'s' if units > 1 else ''})", round(min_material), round(max_material)),
            BreakdownItem("Installation", round(min_labour), round(max_labour)),
            BreakdownItem("Accessories", round(min_access), round(max_access)),
        ]
        area = float(units)

    else:
        raise ValueError(f"Unsupported pricing model for: {req.service}")

    # ── Apply extras ──────────────────────────────────────────────
    base_min = sum(b.min for b in breakdown)
    base_max = sum(b.max for b in breakdown)

    for extra in req.extras:
        rates_e = EXTRA_COSTS.get(extra)
        if rates_e:
            extra_min = base_min * rates_e["min"]
            extra_max = base_max * rates_e["max"]
            breakdown.append(
                BreakdownItem(extra.replace("_", " ").title(), round(extra_min), round(extra_max))
            )

    total_min = sum(b.min for b in breakdown)
    total_max = sum(b.max for b in breakdown)

    return QuoteResult(
        service=f"{display_name} ({subtype_label})" if req.subtype and req.subtype != "normal" else display_name,
        dimensions=f"{req.width}m × {req.height}m × {req.floors} floor{'s' if req.floors > 1 else ''}",
        area_sqm=round(area, 2),
        min_aed=round(total_min),
        max_aed=round(total_max),
        min_with_vat=round(total_min * (1 + VAT_RATE)),
        max_with_vat=round(total_max * (1 + VAT_RATE)),
        breakdown=breakdown,
        timeline_weeks=timeline,
        notes="Estimate based on standard specifications. Final price subject to site visit and approved drawings.",
        disclaimer="This is an approximate estimate only. Contact us for a detailed quotation.",
    )
