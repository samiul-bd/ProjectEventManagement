function debugExample() {
    const resultElement = document.getElementById('debug-result');
    resultElement.textContent = 'Check console for debugging info';
    
    function normalize(string) {
        const normalized = string.replace(/[^\w]/g, "").toLowerCase();
        // Add a debugger statement for manual inspection
        debugger;
        return normalized;
    }
    
    // This will trigger the debugger if DevTools is open
    const testString = "Hello World!";
    const result = normalize(testString);
    console.log('Normalized:', result);
}

function performanceTest() {
    const resultElement = document.getElementById('performance-result');
    resultElement.textContent = 'Running performance test...';
    
    console.time('Performance Test');
    
    // Simulate CPU-intensive task
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i * 2;
    }
    
    console.timeEnd('Performance Test');
    resultElement.textContent = `Performance test completed. Sum: ${sum}`;
}

function coverageTest() {
    const resultElement = document.getElementById('coverage-result');
    resultElement.textContent = 'Coverage test initiated. Check DevTools Coverage tab.';
    
    // Some code that will be analyzed for coverage
    function unusedFunction() {
        return "This function is not called";
    }
    
    function usedFunction() {
        return "This function is used";
    }
    
    const result = usedFunction();
    console.log('Used function result:', result);
}

function lighthouseTest() {
    const resultElement = document.getElementById('lighthouse-result');
    resultElement.textContent = 'Run Lighthouse from DevTools Audits tab';
    
    // Simulate a complex operation that Lighthouse might evaluate
    const container = document.createElement('div');
    container.className = 'lighthouse-test';
    container.innerHTML = '<h3>Lighthouse Test Content</h3>';
    document.body.appendChild(container);
    
    // Simulate loading resources
    const img = new Image();
    img.src = 'https://via.placeholder.com/300';
    img.alt = 'Placeholder image for Lighthouse test';
    document.body.appendChild(img);
    
    // Accessibility test
    const button = document.createElement('button');
    button.textContent = 'Accessible Button';
    button.setAttribute('aria-label', 'This button is accessible');
    document.body.appendChild(button);
}