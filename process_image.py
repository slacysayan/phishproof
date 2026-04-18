import sys
import subprocess
try:
    from PIL import Image, ImageDraw
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image, ImageDraw

source_path = r"C:\Users\sayan\.gemini\antigravity\brain\bcd27335-77ba-48b7-9b5d-5b66d03fb2a4\phishproof_logo_vector_simple_1776531537229.png"
dest_path = r"d:\phishproof\frontend\public\kavach.webp"

if not __import__('os').path.exists(source_path):
    print("Source image not found!")
    sys.exit(1)

print("Opening:", source_path)
img = Image.open(source_path).convert("RGBA")
width, height = img.size

# Crop top 80% to remove text at the bottom.
crop_h = int(height * 0.8)
cropped = img.crop((0, 0, width, crop_h))

# Flood fill white corners with transparent
ImageDraw.floodfill(cropped, xy=(0, 0), value=(255, 255, 255, 0), thresh=45)
ImageDraw.floodfill(cropped, xy=(width-1, 0), value=(255, 255, 255, 0), thresh=45)
ImageDraw.floodfill(cropped, xy=(0, crop_h-1), value=(255, 255, 255, 0), thresh=45)
ImageDraw.floodfill(cropped, xy=(width-1, crop_h-1), value=(255, 255, 255, 0), thresh=45)

cropped.save(dest_path, "WEBP", quality=90)
print("Saved logo to:", dest_path)
