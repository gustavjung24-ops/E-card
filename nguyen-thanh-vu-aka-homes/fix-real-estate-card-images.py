from pathlib import Path
from PIL import Image, ImageOps, ImageChops

ROOT = Path(r"F:\1_A_Disk_D\khuong-binh\E-card-KH\nguyen-thanh-vu-aka-homes\assets\images")

files = [
    "sp-can-ho.jpeg",
    "sp-nha-pho.jpeg",
    "sp-dat-nen.jpeg",
    "sp-cho-thue.jpeg",
]

def trim_near_white_border(img, tolerance=18):
    img = img.convert("RGB")

    # Dò màu nền ở 4 góc, thường là trắng/kem từ ảnh mockup
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((img.width - 1, 0)),
        img.getpixel((0, img.height - 1)),
        img.getpixel((img.width - 1, img.height - 1)),
    ]
    bg_color = tuple(sum(c[i] for c in corners) // 4 for i in range(3))

    bg = Image.new("RGB", img.size, bg_color)
    diff = ImageChops.difference(img, bg)

    # Tăng tương phản để tìm vùng ảnh thật
    diff = diff.convert("L").point(lambda p: 255 if p > tolerance else 0)
    bbox = diff.getbbox()

    if bbox:
        # Nới nhẹ để không cắt mất nội dung
        left, top, right, bottom = bbox
        pad_x = int((right - left) * 0.015)
        pad_y = int((bottom - top) * 0.015)
        left = max(0, left - pad_x)
        top = max(0, top - pad_y)
        right = min(img.width, right + pad_x)
        bottom = min(img.height, bottom + pad_y)
        return img.crop((left, top, right, bottom))

    return img

for name in files:
    path = ROOT / name
    if not path.exists():
        print("MISS:", path)
        continue

    img = Image.open(path).convert("RGB")
    img = trim_near_white_border(img)

    # Xuất ảnh dọc để card crop đẹp, không có viền trắng bên trong
    img = ImageOps.fit(
        img,
        (900, 1200),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5)
    )

    img.save(path, quality=94, optimize=True)
    print("FIXED:", path)

print("Done.")
