const fs = require('fs');
const file = 'src/components/sections/HeroKnockout.tsx';
let code = fs.readFileSync(file, 'utf8');

// replace fromTo to just to, so initial state is visible
code = code.replace(
  /\.fromTo\(\s*'\.hk-word',\s*\{[^}]*\},\s*\{([^}]*)\}\s*\)/g,
  ".to('.hk-word', { $1 })"
);

code = code.replace(
  /\.fromTo\(\s*'\.hk-video',\s*\{[^}]*\},\s*\{([^}]*)\},\s*0\s*\)/g,
  ".to('.hk-video', { $1 }, 0)"
);

code = code.replace(
  /\.fromTo\(\s*'\.hk-fade',\s*\{[^}]*\},\s*\{([^}]*)\},\s*'-=0\.9'\s*\)/g,
  ".to('.hk-fade', { $1 }, '-=0.9')"
);

fs.writeFileSync(file, code);
