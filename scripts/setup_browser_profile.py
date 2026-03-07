#!/usr/bin/env python3
"""
One-time interactive login to create a persistent browser profile.

Usage:
    python scripts/setup_browser_profile.py <url> <profile_name>

Examples:
    python scripts/setup_browser_profile.py "https://substack.com/sign-in" substack
    python scripts/setup_browser_profile.py "https://medium.com/m/signin" medium

After running, a browser window opens. Log in manually, then press Enter
in the terminal to save the session and close the browser.
"""
import sys
import asyncio
from pathlib import Path

from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

PROFILES_DIR = Path(__file__).parent / ".browser-profiles"


async def setup_profile(url: str, profile_name: str) -> None:
    profile_dir = PROFILES_DIR / profile_name
    profile_dir.mkdir(parents=True, exist_ok=True)

    print(f"Opening browser for profile '{profile_name}'...")
    print(f"Navigate to: {url}")
    print("Log in manually, then come back here and press Enter.\n")

    browser_config = BrowserConfig(
        headless=False,
        use_persistent_context=True,
        user_data_dir=str(profile_dir),
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        await crawler.arun(url=url, config=CrawlerRunConfig())
        input("\n✅ Press Enter after you've logged in to save the session...")

    print(f"Profile saved to: {profile_dir}")
    print(f"Use with: python scripts/authenticated_extract.py <url> --profile {profile_name}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python scripts/setup_browser_profile.py <login_url> <profile_name>")
        sys.exit(1)
    asyncio.run(setup_profile(sys.argv[1], sys.argv[2]))
