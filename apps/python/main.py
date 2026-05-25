"""Window Land — Quote Calculator Microservice."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from calculator.quote_engine import QuoteRequest, calculate_quote

app = FastAPI(
    title="Window Land Quote API",
    description="Aluminium & glass installation quote calculator for Window Land Dubai",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://windowland.ae", "https://www.windowland.ae", "http://localhost:3000", "http://localhost:3001"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


class CalculateRequest(BaseModel):
    service: str = Field(..., description="Service key e.g. curtain_wall, pergola")
    subtype: str = Field("normal", description="Subtype e.g. thermal, lift_and_slide, louvered")
    width: float = Field(..., gt=0, le=500, description="Width in metres")
    height: float = Field(3.0, gt=0, le=100, description="Height in metres")
    floors: int = Field(1, ge=1, le=50, description="Number of floors/levels")
    extras: list[str] = Field(default_factory=list, description="Extra options")
    quantity: int = Field(1, ge=1, le=100, description="Quantity (for unit-priced items)")


class BreakdownItemOut(BaseModel):
    item: str
    min: float
    max: float


class CalculateResponse(BaseModel):
    service: str
    dimensions: str
    area_sqm: float
    estimate: dict
    breakdown: list[BreakdownItemOut]
    timeline_weeks: str
    notes: str
    disclaimer: str


@app.get("/health")
def health():
    return {"status": "ok", "service": "window-land-quote-api"}


@app.post("/calculate", response_model=CalculateResponse)
def calculate(req: CalculateRequest):
    try:
        result = calculate_quote(
            QuoteRequest(
                service=req.service,
                subtype=req.subtype,
                width=req.width,
                height=req.height,
                floors=req.floors,
                extras=req.extras,
                quantity=req.quantity,
            )
        )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    return {
        "service": result.service,
        "dimensions": result.dimensions,
        "area_sqm": result.area_sqm,
        "estimate": {
            "min_aed": result.min_aed,
            "max_aed": result.max_aed,
            "min_with_vat": result.min_with_vat,
            "max_with_vat": result.max_with_vat,
            "currency": "AED",
        },
        "breakdown": [
            {"item": b.item, "min": b.min, "max": b.max} for b in result.breakdown
        ],
        "timeline_weeks": result.timeline_weeks,
        "notes": result.notes,
        "disclaimer": result.disclaimer,
    }


@app.get("/services")
def list_services():
    """List all available service keys."""
    from calculator.materials import SERVICE_DISPLAY_NAMES, PRICING
    return {
        "services": [
            {"key": k, "name": v, "subtypes": list(PRICING[k].keys()) if isinstance(next(iter(PRICING[k].values())), dict) else []}
            for k, v in SERVICE_DISPLAY_NAMES.items()
        ]
    }
