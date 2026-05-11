import qrcode
from pathlib import Path
from PIL import Image

URL = "https://e-card-fawn-five.vercel.app/nguyen-thanh-vu-aka-homes/"
OUT = Path(r"F:\1_A_Disk_D\khuong-binh\E-card-KH\nguyen-thanh-vu-aka-homes\assets\images\qr-nguyen-thanh-vu.png")

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=14,
    border=4,
)

qr.add_data(URL)
qr.make(fit=True)

img = qr.make_image(fill_color="#10291f", back_color="#fffaf0").convert("RGB")
img.save(OUT)

print("QR created:", OUT)
print("QR URL:", URL)
