const fs = require('fs');
const file = 'src/components/sections/HeroKnockout.tsx';
let code = fs.readFileSync(file, 'utf8');

// Comment out useGSAP block
code = code.replace(/useGSAP\(\s*\(\)\s*=>\s*\{[\s\S]*?\}\s*,\s*\{\s*scope:\s*root,\s*dependencies:\s*\[fontSize\]\s*\}\s*\);/g, '/* useGSAP commented out for debugging */');

fs.writeFileSync(file, code);
