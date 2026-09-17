#!/usr/bin/env python3
"""Compose the 1200×630 Jeff's Radius Decks share card from a job-site photo."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps

ROOT = Path("/workspace")
SRC = ROOT / "public/gallery/complete-radius.jpg"
OUT = ROOT / ".grok/og-raw.png"

PAPER = (243, 235, 224)  # #F3EBE0
INK = (27, 21, 17)  # #1B1511
CEDAR = (143, 58, 30)  # #8F3A1E
FOREST = (36, 53, 44)  # #24352C
MUTED = (107, 94, 82)  # #6B5E52

W, H = 1200, 630
BAND_H = 140
TITLE = "JEFF'S RADIUS DECKS"
TAG = "Bethlehem, Georgia  ·  Custom Radius & Fast Redecks"

SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"


def tracked_width(font: ImageFont.FreeTypeFont, text: str, tracking: float) -> float:
    if not text:
        return 0.0
    return sum(font.getlength(ch) for ch in text) + tracking * (len(text) - 1)


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill,
    tracking: float,
) -> None:
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + tracking


def cover_crop(im: Image.Image) -> Image.Image:
    fitted = ImageOps.fit(
        im,
        (W, H),
        method=Image.Resampling.LANCZOS,
        centering=(0.48, 0.70),
    )
    fitted = ImageEnhance.Contrast(fitted).enhance(1.05)
    fitted = ImageEnhance.Color(fitted).enhance(1.06)
    warm = Image.new("RGB", fitted.size, CEDAR)
    return Image.blend(fitted, warm, 0.04)


def main() -> None:
    photo = cover_crop(Image.open(SRC).convert("RGB"))

    wash = Image.new("L", (W, H), 0)
    wash_draw = ImageDraw.Draw(wash)
    for i in range(56):
        alpha = int(70 * (i / 55) ** 1.4)
        y = H - BAND_H - 56 + i
        wash_draw.line([(0, y), (W, y)], fill=alpha)
    photo = Image.composite(Image.new("RGB", (W, H), INK), photo, wash)

    draw = ImageDraw.Draw(photo)
    band_top = H - BAND_H
    draw.rectangle([0, band_top, W, H], fill=PAPER)
    draw.rectangle([0, band_top, W, band_top + 5], fill=CEDAR)

    title_font = ImageFont.truetype(SERIF, 56)
    tag_font = ImageFont.truetype(SANS, 15)
    title_track = 5.2
    tag_track = 1.9

    title_w = tracked_width(title_font, TITLE, title_track)
    tag_w = tracked_width(tag_font, TAG, tag_track)
    title_box = title_font.getbbox(TITLE)
    tag_box = tag_font.getbbox(TAG)
    title_h = title_box[3] - title_box[1]
    tag_h = tag_box[3] - tag_box[1]

    # Stack: title, 14px, 2px cedar rule, 12px, tag — vertically centered in the plate.
    stack_h = title_h + 14 + 2 + 12 + tag_h
    stack_top = band_top + 5 + (BAND_H - 5 - stack_h) / 2

    title_x = (W - title_w) / 2
    title_y = stack_top - title_box[1]
    draw_tracked(draw, (title_x, title_y), TITLE, title_font, INK, title_track)

    rule_w = 64
    rule_y = stack_top + title_h + 14
    rule_x = (W - rule_w) / 2
    draw.rectangle([rule_x, rule_y, rule_x + rule_w, rule_y + 2], fill=CEDAR)

    tag_x = (W - tag_w) / 2
    tag_y = rule_y + 2 + 12 - tag_box[1]
    draw_tracked(draw, (tag_x, tag_y), TAG, tag_font, MUTED, tag_track)

    photo.save(OUT, "PNG")
    print(f"wrote {OUT} {photo.size}")


if __name__ == "__main__":
    main()
