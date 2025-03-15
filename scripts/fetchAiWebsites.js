const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// Path to save screenshots
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'tools');

// Function to ensure directory exists
async function ensureDirectoryExists(directory) {
  try {
    await mkdirAsync(directory, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Function to take a screenshot of a website
async function takeScreenshot(url, filename) {
  console.log(`Taking screenshot of ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 800
    }
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a timeout for navigation
    await page.setDefaultNavigationTimeout(30000);
    
    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait a bit for any animations to complete
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${filename}.png`),
      fullPage: false
    });
    
    console.log(`Screenshot saved for ${url}`);
    
    // Get page title and meta description
    const pageData = await page.evaluate(() => {
      const title = document.title || '';
      const metaDescription = document.querySelector('meta[name="description"]')?.content || '';
      return { title, metaDescription };
    });
    
    return {
      url,
      title: pageData.title,
      description: pageData.description || pageData.metaDescription,
      image: `src/assets/images/tools/${filename}.png`
    };
    
  } catch (error) {
    console.error(`Error taking screenshot of ${url}:`, error);
    return {
      url,
      title: url.split('//')[1].split('/')[0],
      description: `AI tool at ${url}`,
      image: 'src/assets/images/placeholder.svg'
    };
  } finally {
    await browser.close();
  }
}

// Main function to process all websites
async function processWebsites() {
  // Ensure screenshots directory exists
  await ensureDirectoryExists(SCREENSHOTS_DIR);
  
  // Path to the JSON file - use the file in the scripts directory
  const aiToolsEnPath = path.join(__dirname, 'aiTools.en.json');
  
  let websitesToProcess = [];
  let aiToolsEn = { tools: [], categories: [] };
  
  try {
    // Load websites from aiTools.en.json
    const enData = fs.readFileSync(aiToolsEnPath, 'utf8');
    aiToolsEn = JSON.parse(enData);
    
    // Check if aiToolsEn has a tools property and it's an array
    if (aiToolsEn && aiToolsEn.tools && Array.isArray(aiToolsEn.tools)) {
      // Extract website information
      websitesToProcess = aiToolsEn.tools.map(tool => ({
        url: tool.url,
        name: tool.name,
        description: tool.description || '',
        categories: tool.categories || [],
        tags: tool.tags || []
      }));
      
      console.log(`Loaded ${websitesToProcess.length} websites from aiTools.en.json`);
    } else {
      console.error('aiTools.en.json does not have a valid tools array. Using fallback list.');
      websitesToProcess = getFallbackWebsites();
      aiToolsEn = { tools: websitesToProcess, categories: [] };
    }
  } catch (error) {
    console.error('Error reading JSON files:', error);
    websitesToProcess = getFallbackWebsites();
    aiToolsEn = { tools: websitesToProcess, categories: [] };
  }
  
  // Function to get fallback websites
  function getFallbackWebsites() {
    return [
      { url: 'https://chat.openai.com/', name: 'ChatGPT', categories: ['chatbot', 'writing', 'productivity'] },
      { url: 'https://www.midjourney.com/', name: 'Midjourney', categories: ['image', 'design', 'creativity'] },
      { url: 'https://claude.ai/', name: 'Claude', categories: ['chatbot', 'writing', 'productivity'] }
    ];
  }
  
  // Process each website
  const results = [];
  for (const [index, site] of websitesToProcess.entries()) {
    // Skip if the URL is missing
    if (!site.url) {
      console.warn(`Skipping entry ${site.name || index} - missing URL`);
      continue;
    }
    
    // Generate a filename from the site name
    const filename = site.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Check if we already have a screenshot for this site
    const existingTool = aiToolsEn.tools.find(tool => tool.url === site.url);
    if (existingTool && existingTool.image && !existingTool.image.includes('placeholder')) {
      console.log(`Screenshot already exists for ${site.url}, skipping...`);
      continue;
    }
    
    const result = await takeScreenshot(site.url, filename);
    
    // Add to results with additional data
    results.push({
      id: aiToolsEn.tools.length + index + 1,
      name: site.name,
      description: result.description || site.description || `${site.name} - AI tool`,
      url: site.url,
      image: result.image,
      categories: site.categories || [],
      tags: site.tags || site.categories || []
    });
  }
  
  // Combine with existing tools, but avoid duplicates
  const combinedTools = [...aiToolsEn.tools];
  
  // Add new tools or update existing ones
  for (const newTool of results) {
    const existingIndex = combinedTools.findIndex(tool => tool.url === newTool.url);
    if (existingIndex >= 0) {
      // Update existing tool
      combinedTools[existingIndex] = {
        ...combinedTools[existingIndex],
        ...newTool,
        // Keep the original ID
        id: combinedTools[existingIndex].id
      };
    } else {
      // Add new tool
      combinedTools.push(newTool);
    }
  }
  
  // Extract all unique categories
  const allCategories = new Set();
  combinedTools.forEach(tool => {
    if (Array.isArray(tool.categories)) {
      tool.categories.forEach(category => allCategories.add(category));
    }
  });
  
  // Create updated aiTools object
  const updatedAiTools = {
    tools: combinedTools,
    categories: Array.from(allCategories)
  };
  
  // Save to aiTools.json
  await writeFileAsync(
    aiToolsEnPath,
    JSON.stringify(updatedAiTools, null, 2),
    'utf8'
  );
  
  console.log(`Processed ${results.length} websites and saved to aiTools.en.json`);
}

// Run the script
processWebsites().catch(error => {
  console.error('Error in main process:', error);
  process.exit(1);
});