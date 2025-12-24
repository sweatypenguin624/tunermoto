import requests
from bs4 import BeautifulSoup
import json
import time

BASE_URL = "https://tunermotorsports.in"
COLLECTION_URL = f"{BASE_URL}/collections/all?page="

products = []

def get_product_handles():
    handles = []
    page = 1

    while True:
        print(f"Fetching collection page {page}...")
        url = COLLECTION_URL + str(page)
        r = requests.get(url)

        if r.status_code != 200:
            break

        soup = BeautifulSoup(r.text, "html.parser")
        items = soup.select("a.full-unstyled-link")

        if not items:
            break

        for item in items:
            href = item.get("href")
            if href and "/products/" in href:
                handles.append(href.split("/products/")[1].strip("/"))

        page += 1
        time.sleep(1)

    return list(set(handles))


def get_product_data(handle):
    url = f"{BASE_URL}/products/{handle}.json"
    print(f"Scraping product: {handle}")

    r = requests.get(url)

    if r.status_code != 200:
        print("Failed:", url)
        return None

    data = r.json().get("product")
    if not data:
        return None

    product = {
        "id": data.get("id"),
        "title": data.get("title"),
        "handle": data.get("handle"),
        "vendor": data.get("vendor"),
        "product_type": data.get("product_type"),
        "tags": data.get("tags"),
        "body_html": data.get("body_html"),
        "options": data.get("options"),
        "variants": [],
        "images": []
    }

    # Variants
    for v in data.get("variants", []):
        product["variants"].append({
            "id": v.get("id"),
            "title": v.get("title"),
            "sku": v.get("sku"),
            "price": v.get("price"),
            "compare_at_price": v.get("compare_at_price"),
            "available": v.get("available")
        })

    # Images
    for img in data.get("images", []):
        product["images"].append(img.get("src"))

    return product


if __name__ == "__main__":
    print("🔍 Starting scrape...")
    handles = get_product_handles()

    print(f"Found {len(handles)} products.")
    print("Scraping each product...\n")

    for handle in handles:
        pdata = get_product_data(handle)
        if pdata:
            products.append(pdata)
        time.sleep(0.5)

    with open("products.json", "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print("\n✅ Done! Saved all products to products.json")
