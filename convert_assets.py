import os
import sys
import time

try:
    from PIL import Image
except ImportError:
    import subprocess
    print("Pillow not found. Installing Pillow for image processing...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

dir_path = r"c:\Users\novar\.gemini\antigravity\scratch\Red Bull\hero\heroanimations"

print(f"Starting WebP conversion in {dir_path}")
start_time = time.time()
converted_count = 0

for file in os.listdir(dir_path):
    if file.lower().endswith(".jpg") or file.lower().endswith(".jpeg"):
        img_path = os.path.join(dir_path, file)
        webp_filename = os.path.splitext(file)[0] + ".webp"
        webp_path = os.path.join(dir_path, webp_filename)
        
        try:
            img = Image.open(img_path)
            # 65 quality offers huge savings with virtually unnoticeable artifacting on dark palettes
            img.save(webp_path, "webp", quality=65) 
            os.remove(img_path) # Clean up original JPG
            converted_count += 1
            if converted_count % 10 == 0:
                print(f"[{converted_count}/80] Processed {webp_filename}")
        except Exception as e:
            print(f"FAILED on {file}: {e}")

elapsed = round(time.time() - start_time, 2)
print(f"Successfully converted {converted_count} files to WebP in {elapsed} seconds!")
