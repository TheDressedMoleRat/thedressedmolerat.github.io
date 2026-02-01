from pathlib import Path
root=Path('index.html')
root_text='\n'.join(root.read_text(encoding='utf-8').splitlines()[:39])
errors=[]
for p in sorted(Path('.').rglob('*.html')):
    if p.resolve()==root.resolve():
        continue
    text='\n'.join(p.read_text(encoding='utf-8').splitlines()[:39])
    if text!=root_text:
        errors.append(str(p))
print('MISMATCH COUNT:', len(errors))
for e in errors:
    print(e)
if not errors:
    print('All files match the root first 39 lines')
