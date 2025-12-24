import requests
from bs4 import BeautifulSoup
import time

def scrape_zhihu_trending():
    """
    Scrapes the top 10 trending questions from Zhihu
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
    }
    
    # First try the web scraping approach since API might be restricted
    return scrape_zhihu_trending_fallback(headers)

def scrape_zhihu_trending_fallback(headers):
    """
    Fallback method to scrape Zhihu trending using web scraping
    """
    try:
        url = 'https://www.zhihu.com/buzz'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for trending items - updated selector for current Zhihu structure
        # Zhihu typically uses div elements with specific classes for trending items
        trending_items = soup.find_all('div', class_='Item')[:10]  # Adjust selector as needed
        
        if not trending_items:
            # Try alternative selector
            trending_items = soup.find_all('a', class_='[href^="/question"]')[:10]
        
        titles = []
        for item in trending_items:
            # Try different possible title elements
            title_elem = item.find('h2') or item.find('h3') or item.find('p') or item
            if title_elem:
                title = title_elem.get_text().strip()
                if title:
                    titles.append(title)
        
        if not titles:
            # Another fallback - look for the most common structure
            all_links = soup.find_all('a', href=True)
            for link in all_links:
                if '/question' in link['href'] and len(titles) < 10:
                    title = link.get_text().strip()
                    if title:
                        titles.append(title)
        
        return titles[:10]  # Ensure we return at most 10 items
    
    except Exception as e:
        print(f"Fallback scraping error: {e}")
        return []

def main():
    print("正在获取知乎热榜前10...")
    titles = scrape_zhihu_trending()
    
    if titles:
        print("\n知乎热榜前10:")
        print("=" * 50)
        for i, title in enumerate(titles, 1):
            print(f"{i}. {title}")
    else:
        print("未能获取到热榜数据，请检查网络连接或稍后重试。")

if __name__ == "__main__":
    main()