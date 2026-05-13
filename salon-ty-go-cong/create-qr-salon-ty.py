import qrcode
from pathlib import Path

URL = "https://e-card-fawn-five.vercel.app/salon-ty-go-cong/"
OUT = Path(r"F:\1_A_Disk_D\khuong-binh\E-card-KH\salon-ty-go-cong\assets\images\qr-salon-ty.png")

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=14,
    border=4,
)

qr.add_data(URL)
qr.make(fit=True)

img = qr.make_image(
    fill_color="#111111",
    back_color="#ffffff"
).convert("RGB")

img.save(OUT)

print("QR created:", OUT)
print("QR URL:", URL)
