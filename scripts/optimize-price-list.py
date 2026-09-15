"""Prepare a compact price-list PDF and one-page-at-a-time web previews.

Requires Pillow, pypdf and pdftoppm. The original PDF remains unchanged.
"""

import json
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
SOURCE = PUBLIC / 'documents/price-list-2026-06-10.pdf'
OUTPUT = ROOT / 'output/pdf/price-list-2026-06-10-web.pdf'
PREVIEW = PUBLIC / 'documents/price-list-2026-06-10-pages'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
PREVIEW.mkdir(parents=True, exist_ok=True)

reader = PdfReader(SOURCE)
assert not reader.get_fields(), 'Do not modify signed or interactive forms'
writer = PdfWriter(clone_from=SOURCE)
for page in writer.pages:
    assert len(page.images) == 1, 'Expected one scanned image per page'
    image = page.images[0].image.convert('RGB')
    image.thumbnail((1300, 2000), Image.Resampling.LANCZOS)
    page.images[0].replace(image, quality=62, subsampling=2, optimize=True)
    page.compress_content_streams()
writer.write(OUTPUT)
destination = PUBLIC / 'documents' / OUTPUT.name
shutil.copyfile(OUTPUT, destination)

pages = []
with tempfile.TemporaryDirectory(prefix='arcticdent-price-pages-') as temporary:
    subprocess.run([
        'pdftoppm', '-scale-to', '2000', '-png', str(SOURCE), str(Path(temporary) / 'page'),
    ], check=True)
    for index, source in enumerate(sorted(Path(temporary).glob('page-*.png')), start=1):
        with Image.open(source) as image:
            image = image.convert('RGB')
            image_path = PREVIEW / f'page-{index:02d}.webp'
            image.save(image_path, 'WEBP', quality=82, method=6)
            pages.append({
                'src': '/' + image_path.relative_to(PUBLIC).as_posix(),
                'width': image.width,
                'height': image.height,
            })

assert len(pages) == len(reader.pages) == len(PdfReader(OUTPUT).pages)
metadata = {
    'pdf': '/' + destination.relative_to(PUBLIC).as_posix(),
    'bytes': destination.stat().st_size,
    'pages': pages,
}
(ROOT / 'src/data/priceList.json').write_text(json.dumps(metadata, indent=2) + '\n')
print(f'PDF: {SOURCE.stat().st_size / 1024**2:.2f} MB -> {OUTPUT.stat().st_size / 1024**2:.2f} MB')
print(f'Preview: {len(pages)} pages, first page {(PUBLIC / pages[0]["src"].lstrip("/")).stat().st_size / 1024:.0f} KB')
