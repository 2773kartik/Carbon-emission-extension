const displayPages = async () => {
    const visitedPages = await PageService.getPages();
    const pageList = document.getElementById('page-list');
    pageList.innerHTML = '';
    
    visitedPages.forEach(page => {
        const pageItem = document.createElement('li');
        pageList.appendChild(pageItem);
        
        const pageLink = document.createElement('a');
        pageLink.title = page.title;
        pageLink.innerHTML = page.title;
        pageLink.href = page.url;
        pageLink.onclick = async (ev) => {
            ev.preventDefault();
            await chrome.tabs.create({ url: ev.target.href, active: false });
        };
        pageItem.appendChild(pageLink);

        const pageItem2 = document.createElement('li');
        pageList.appendChild(pageItem2);
        const val = document.createElement('p');
        val.title = page.memory;
        val.innerHTML = page.memory + '     ' + page.green;
        pageItem2.appendChild(val);
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    await displayPages();
    
    // Clear history
    const clearHistoryBtn = document.getElementById('clear-history');
    clearHistoryBtn.onclick = async () => {
        await PageService.clearPages();
        await displayPages();
    };
    await Carbon.quiet();
});