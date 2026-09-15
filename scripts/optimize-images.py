"""Generate responsive WebP assets from the original clinic images (Pillow)."""

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
manifest = {}
encoded = set()


def optimize(source, widths, fallback_width, quality=84, shared=False):
    relative = source.relative_to(PUBLIC)
    key = '/' + relative.as_posix()
    fingerprint = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    folder = PUBLIC / 'images' / ('doctors' if shared else 'services') / 'optimized'
    folder.mkdir(parents=True, exist_ok=True)
    stem = fingerprint if shared else f'{source.stem}-{fingerprint}'
    variants = []
    with Image.open(source) as original:
        original = ImageOps.exif_transpose(original)
        original = original.convert('RGBA' if 'A' in original.getbands() else 'RGB')
        for width in widths:
            width = min(width, original.width)
            height = round(original.height * width / original.width)
            destination = folder / f'{stem}-{width}.webp'
            if destination not in encoded:
                original.resize((width, height), Image.Resampling.LANCZOS).save(
                    destination, 'WEBP', quality=quality, method=6,
                )
                encoded.add(destination)
            variants.append(('/' + destination.relative_to(PUBLIC).as_posix(), width))
        fallback = next(url for url, width in variants if width == fallback_width)
        manifest[key] = {
            'src': fallback,
            'srcSet': ', '.join(f'{url} {width}w' for url, width in variants),
            'width': original.width,
            'height': original.height,
        }


for source in sorted((PUBLIC / 'images/doctors').glob('*/*')):
    if source.suffix.lower() in {'.png', '.jpg'}:
        optimize(source, (480, 800, 1024), 800, shared=True)

for source in sorted((PUBLIC / 'images/services').glob('*.png')):
    optimize(source, (960, 1535), 1535)

for source in sorted((PUBLIC / 'images/services/mobile').glob('*-mobile.png')):
    optimize(source, (480, 760, 941), 760)

optimize(PUBLIC / 'images/services/mobile/hand-swipe.png', (180,), 180)

(ROOT / 'src/data/responsiveImages.json').write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8',
)

for group in ('doctors', 'services'):
    entries = [(source, data) for source, data in manifest.items() if f'/{group}/' in source]
    before = sum((PUBLIC / source.lstrip('/')).stat().st_size for source, _ in entries)
    after = sum((PUBLIC / data['src'].lstrip('/')).stat().st_size for _, data in entries)
    print(f'{group}: {before / 1024:.0f} KB → {after / 1024:.0f} KB ({(1 - after / before) * 100:.1f}% smaller at default size)')
