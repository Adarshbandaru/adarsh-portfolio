import fitz # PyMuPDF
import glob
import os

pdf_files = glob.glob("public/certificates/*.pdf")
for pdf_file in pdf_files:
    print(f"Converting {pdf_file}...")
    doc = fitz.open(pdf_file)
    page = doc.load_page(0)  # number of page
    pix = page.get_pixmap(dpi=150)
    png_file = pdf_file.replace('.pdf', '.png')
    pix.save(png_file)
    doc.close()
    print(f"Saved {png_file}")
