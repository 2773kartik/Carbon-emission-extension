document.addEventListener('DOMContentLoaded', async () => {
    const dialogBox = document.getElementById('dialog-box');
    
    const carb = new Carbon();
    const tab = await carb.getActiveTab();
    const bark = carb.getTitle(tab.title);

    dialogBox.innerHTML = bark;
    // Store page.
    const mem = window.performance.memory.usedJSHeapSize;
    await PageService.savePage(tab.title, tab.url, mem);
});

const settingsBtn = document.getElementById('optOpen');
settingsBtn.onclick = () => {
    chrome.runtime.openOptionsPage();
};