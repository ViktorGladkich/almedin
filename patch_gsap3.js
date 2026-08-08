const fs = require('fs');
const file = 'src/components/sections/HeroKnockout.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace the <text> block with a circle for testing
code = code.replace(
  /<text[\s\S]*?<\/text>/,
  '<circle cx="50%" cy="50%" r="200" fill="#000" />'
);

fs.writeFileSync(file, code);
