const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');


//Search jobslists.json and filter it
const searchjobslists = async searchText => {
    const res = await fetch('https://recruitercache.planate.com/api');
    const jobslists = await res.json();
    
    console.log(jobslists.objects);
    //console.log(jobslists.objects[location.country].location.country);
    //console.log(jobslists.tags);
    let matches = jobslists.objects.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.title.match(regex) || data.id.match(regex);
        
    });
   
    //console.log(matches);

   // if(searchText.Length === 0) {
      //  matches = [];
        //matchlist.innerHTML = '';
   // }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
            <h4>${match.title} <span class="text-primary">${match.location.country}</span></h4>
            
            </div>
        `).join('');
      
        matchlist.innerHTML = html;
    }
}

search.addEventListener('input', () => searchjobslists(search.value));