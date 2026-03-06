import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = '/home/z/my-project/public/ads';

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const adImages = [
  {
    filename: 'banking-newcomer.png',
    prompt: 'Professional banking banner advertisement, modern sleek design with Canadian elements, maple leaf motif, blue and gold color scheme, premium financial services, welcoming newcomers, clean corporate design, high quality marketing banner, landscape orientation'
  },
  {
    filename: 'money-transfer.png',
    prompt: 'International money transfer advertisement banner, global connection visualization, world map with glowing transfer lines, Canadian and international flags, modern fintech design, green and blue colors, trustworthy financial services, professional marketing banner'
  },
  {
    filename: 'telecom-mobile.png',
    prompt: 'Modern mobile phone and internet service advertisement, sleek smartphone with 5G network visualization, purple and pink gradient, wireless connection waves, Canadian telecom services, affordable plans theme, contemporary tech design banner'
  },
  {
    filename: 'employment-jobs.png',
    prompt: 'Job search and career opportunities banner, professional handshake, diverse team collaboration, Canadian workplace, modern office environment, orange and amber colors, employment services, success and growth theme, corporate banner design'
  },
  {
    filename: 'education-language.png',
    prompt: 'Language learning and education banner, books and graduation cap, French and English flags, online learning platform, Canadian education theme, cyan and blue colors, knowledge and growth, professional education services banner'
  },
  {
    filename: 'travel-flights.png',
    prompt: 'Air travel and flights advertisement banner, airplane flying over Canadian landscape, globe with flight paths, vacation and family reunion theme, sky blue colors, Air Canada style, professional travel services banner'
  },
  {
    filename: 'insurance-health.png',
    prompt: 'Health insurance and protection banner, family health coverage visualization, medical shield symbol, Canadian healthcare theme, green and teal colors, security and care, professional insurance services marketing banner'
  },
  {
    filename: 'immigration-services.png',
    prompt: 'Immigration consultation services banner, Canadian flag and maple leaf, newcomer welcome theme, official documents and pathway to citizenship, professional legal services, red and white accents, trustworthy immigration help banner'
  }
];

async function generateImages() {
  const zai = await ZAI.create();
  
  console.log('🎨 Starting image generation for advertisements...\n');
  
  for (const ad of adImages) {
    try {
      console.log(`📸 Generating: ${ad.filename}`);
      console.log(`   Prompt: ${ad.prompt.substring(0, 60)}...`);
      
      const response = await zai.images.generations.create({
        prompt: ad.prompt,
        size: '1344x768'
      });
      
      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      const outputPath = path.join(outputDir, ad.filename);
      
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`   ✅ Saved to: ${outputPath}`);
      console.log(`   📦 Size: ${(buffer.length / 1024).toFixed(1)} KB\n`);
      
      // Wait a bit between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error: any) {
      console.error(`   ❌ Failed: ${error.message}\n`);
    }
  }
  
  console.log('🎉 Image generation complete!');
}

generateImages().catch(console.error);
