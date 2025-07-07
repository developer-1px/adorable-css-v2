
import os
import re

def find_broken_links(base_path):
    broken_links = []
    all_md_files = []

    for root, _, files in os.walk(base_path):
        for file in files:
            if file.endswith(".md"):
                all_md_files.append(os.path.join(root, file))

    for md_file_path in all_md_files:
        with open(md_file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Markdown link pattern: [text](link)
        links = re.findall(r'\[.*?\]\((.*?)\)', content)

        for link in links:
            # External links and anchors are skipped
            if link.startswith("http://") or link.startswith("https://") or link.startswith("#"):
                continue

            # Absolute path handling (relative to project root)
            if link.startswith("/"):
                target_path = os.path.join(base_path, link[1:])
            else:
                # Relative path handling
                target_path = os.path.join(os.path.dirname(md_file_path), link)

            # Remove query parameters or hash
            target_path = target_path.split('?')[0].split('#')[0]

            # Handle .md extension (optional)
            if not target_path.endswith(".md") and not os.path.exists(target_path):
                if os.path.exists(target_path + ".md"):
                    target_path += ".md"

            if not os.path.exists(target_path):
                broken_links.append({
                    "source_file": os.path.relpath(md_file_path, base_path),
                    "broken_link": link,
                    "resolved_path_attempt": os.path.relpath(target_path, base_path) if os.path.exists(os.path.dirname(target_path)) else target_path
                })
    return broken_links

# Current working directory for docs folder
docs_path = "/Users/user/Desktop/adorable-css-v2/docs"
broken_links_report = find_broken_links(docs_path)

if broken_links_report:
    print("--- Broken Links Report ---")
    for item in broken_links_report:
        print(f"Source: {item['source_file']}")
        print(f"  Broken Link: {item['broken_link']}")
        print(f"  Attempted Path: {item['resolved_path_attempt']}")
        print("-" * 20)
else:
    print("No broken links found in the docs directory.")
