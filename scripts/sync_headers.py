from pathlib import Path

delimit = '<!-- END HEADER -->'

root = Path('index.html')
root_lines = root.read_text(encoding='utf-8')
root_head = ''.join(root_lines.split(delimit)[0])

changed = []
for p in sorted(Path('.').rglob('*.html')):
	# ignore if we're on the main index.html
	if p.name == 'index.html' and p.parent == Path('.').resolve():
		continue
	
	text = p.read_text(encoding='utf-8')

	if delimit not in text:
		print(f"||| skipped {p.parent}/{p.name}")
		continue

	rest = text.split(delimit)[1]
	new = root_head + delimit + rest

	if new != text:
		p.write_text(new, encoding='utf-8')
		changed.append(str(p))

print(f"Updated {len(changed)} files")
for c in changed:
	print("- " + c)
