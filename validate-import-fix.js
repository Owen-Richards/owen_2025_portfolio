// Quick validation script to test page loading after import fix
const pages = [
  'http://localhost:3000',
  'http://localhost:3000/work',
  'http://localhost:3000/about',
  'http://localhost:3000/contact',
  'http://localhost:3000/blog',
];

async function validatePages() {
  console.log('🔍 Validating pages after import fix...\n');

  for (const url of pages) {
    try {
      const response = await fetch(url);
      const status = response.ok ? '✅' : '❌';
      console.log(`${status} ${url} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }

  console.log('\n🎉 Import fix validation complete!');
}

validatePages();
