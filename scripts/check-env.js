#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Xynaps environment configuration...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('Please create a .env.local file with the following variables:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  process.exit(1);
}

// Read and check environment variables
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

console.log('📋 Environment Variables Check:');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value) {
    console.error(`❌ ${varName} is missing`);
    allGood = false;
  } else if (value.includes('your_') || value.includes('YOUR_')) {
    console.error(`❌ ${varName} contains placeholder value`);
    allGood = false;
  } else {
    console.log(`✅ ${varName} is configured`);
  }
});

console.log('\n🔧 Supabase Configuration Check:');

if (allGood) {
  console.log('✅ Environment variables are properly configured');
  console.log('\n📝 Next steps:');
  console.log('1. Make sure your Supabase project has OAuth providers configured');
  console.log('2. Verify that Google and Microsoft OAuth are enabled in Supabase Auth settings');
  console.log('3. Check that the redirect URL is set to: http://localhost:3000/auth/callback (for development)');
  console.log('4. Ensure your OAuth providers have the correct redirect URIs configured');
  console.log('\n🚀 You can now run: npm run dev');
} else {
  console.error('\n❌ Please fix the configuration issues above before proceeding');
  process.exit(1);
}
