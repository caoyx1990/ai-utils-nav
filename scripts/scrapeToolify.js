const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

// Output file path
const OUTPUT_FILE = path.join(__dirname, 'aiTools.en.json');

// Categories to scrape
const CATEGORIES = [
  'chatbot',
  'writing',
  'image',
  'video',
  'audio',
  'productivity',
  'design',
  'creativity',
  'marketing',
  'voice',
  'transcription',
  'meetings',
  'presentation',
  'search',
  'research',
  'development',
  'machine-learning',
  'api',
  'education',
  'organization',
  'social-media',
  'editing',
  'multimodal',
  'language-models'
];

// Function to scrape tools from a category page
async function scrapeCategory(page, category) {
  console.log(`Scraping category: ${category}`);
  
  try {
    // Navigate to the category page
    await page.goto(`https://www.toolify.ai/category/${category}`, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    // Wait for the tools to load
    await page.waitForSelector('.tool-card', { timeout: 10000 });
    
    // Extract tool information
    const tools = await page.evaluate((category) => {
      // Get all tool cards (limit to top 20)
      const toolCards = Array.from(document.querySelectorAll('.tool-card')).slice(0, 20);
      
      return toolCards.map(card => {
        // Extract tool details
        const name = card.querySelector('.tool-name')?.textContent.trim() || '';
        const description = card.querySelector('.tool-description')?.textContent.trim() || '';
        const url = card.querySelector('a.tool-link')?.href || '';
        const imageElement = card.querySelector('.tool-image img');
        const image = imageElement ? imageElement.src : '';
        
        // Get tags if available
        const tags = Array.from(card.querySelectorAll('.tool-tag'))
          .map(tag => tag.textContent.trim())
          .filter(tag => tag.length > 0);
        
        return {
          name,
          description,
          url,
          image,
          categories: [category],
          tags: tags.length > 0 ? tags : [category]
        };
      });
    }, category);
    
    console.log(`Found ${tools.length} tools in category ${category}`);
    return tools;
  } catch (error) {
    console.error(`Error scraping category ${category}:`, error);
    return [];
  }
}

// Main function to scrape all categories
async function scrapeAllCategories() {
  console.log('Starting to scrape Toolify.ai categories...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 800
    }
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a user agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Set a longer timeout for navigation
    page.setDefaultNavigationTimeout(60000);
    
    // Array to store all tools
    let allTools = [];
    
    // Process each category
    for (const category of CATEGORIES) {
      const categoryTools = await scrapeCategory(page, category);
      allTools = [...allTools, ...categoryTools];
      
      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Remove duplicates based on URL
    const uniqueTools = [];
    const urlSet = new Set();
    
    allTools.forEach(tool => {
      if (tool.url && !urlSet.has(tool.url)) {
        urlSet.add(tool.url);
        uniqueTools.push(tool);
      }
    });
    
    // Add IDs to tools
    const toolsWithIds = uniqueTools.map((tool, index) => ({
      id: index + 1,
      ...tool
    }));
    
    // Extract all unique categories
    const allCategories = new Set();
    toolsWithIds.forEach(tool => {
      if (Array.isArray(tool.categories)) {
        tool.categories.forEach(category => allCategories.add(category));
      }
    });
    
    // Create the final data structure
    const finalData = {
      tools: toolsWithIds,
      categories: Array.from(allCategories)
    };
    
    // Save to file
    await writeFileAsync(
      OUTPUT_FILE,
      JSON.stringify(finalData, null, 2),
      'utf8'
    );
    
    console.log(`Successfully scraped ${toolsWithIds.length} unique tools across ${CATEGORIES.length} categories`);
    console.log(`Data saved to ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Error in main process:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
scrapeAllCategories().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});