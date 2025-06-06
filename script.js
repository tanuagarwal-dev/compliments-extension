const compliments = [
  "You light up the internet with your smile. 😄",
  "You're the 💖 in <body> and </body>.",
  "You're brighter than my VS Code theme.",
  "You debug life better than most.",
  "Your kindness is the best framework ever!"
];

function getRandomComps(){
    return compliments[Math.floor(Math.random()*compliments.length)];

}


const moodList = document.getElementById('mood-list')
let selectedMood = 'compliment'

moodList.addEventListener('click', (e)=>{
    if(e.target.tagName.toLowerCase() == 'li'){
        [...moodList.querySelectorAll('li')].forEach(li => li.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedMood = e.target.dataset.mood
    }
})

document.getElementById('new-comp').addEventListener('click', async () => {
  document.getElementById('comps').textContent = 'Loading...';
//   const mood = document.getElementById('input').value.trim().toLowerCase()

  try {
    const response = await fetch('http://localhost:5000/compliment-mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood: selectedMood }),
    });

    const data = await response.json();
    console.log(data);
    document.getElementById('comps').textContent = data.compliment || 'Oops! Try again.';
    // applyRandomTheme();
  } catch {
    document.getElementById('comps').textContent = 'Error fetching compliment.';
  }
});


function updateStreak(){
    const today = new Date()
    const todayStr = today.toDateString();
    console.log(todayStr)
    chrome.storage.local.get(['lastComplimentDate', 'streak'], (result)=>{
        const lastDate = result.lastComplimentDate || '';
        console.log(result)
        let streak = result.streak || 0;

        if(lastDate!=todayStr){
            const yesterday = new Date();
            yesterday.setDate(today.getDate()-1)
            const yesterdayStr = yesterday.toDateString();
            if(lastDate=== yesterdayStr){
                streak ++;
            } else{
                streak = 1;
            }
            
            chrome.storage.local.set({
                lastComplimentDate: todayStr, streak
            })
        }
        document.getElementById('streak').textContent = `🔥 Streak: ${streak} day${streak !== 1 ? 's' : ''}`;
    })
}


document.getElementById("save-fav").addEventListener("click", ()=>{
    const compliment = document.getElementById("comps").textContent;
    chrome.storage.local.get(["favorites"], (result)=>{
        const favorites= result.favorites || [];
        if(!favorites.includes(compliment)){
            favorites.push(compliment)
            chrome.storage.local.set({ favorites})
            alert("saved to favorites")
            loadFavorites()
        } else{
            alert("already in favorites")
        }
    })
})

function deleteFav(index){
    chrome.storage.local.get(["favorites"], (result)=>{
        const favorites= result.favorites || [];
        favorites.splice(index, 1)
        chrome.storage.local.set({favorites}, ()=>{
            loadFavorites();
        })
    })
}


function loadFavorites(){
    chrome.storage.local.get(["favorites"], (result)=>{
        const list = document.getElementById("fav-list")
        list.innerHTML = "";
        const favorites = result.favorites || [];
        if (favorites.length === 0) {
            list.innerHTML = "<li><em>No favorites saved yet.</em></li>";
            return;
        }
        favorites.forEach((c,index)=>{
            const li= document.createElement("li");
            li.classList.add("fav-item");
            const text = document.createElement("span");
            text.textContent = `${c}`;
            text.classList.add("fav-text");

            const deleteBtn = document.createElement("span");
            deleteBtn.textContent = "❌"
            deleteBtn.style.marginLeft="10px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.title = "delete this fav"
            deleteBtn.classList.add("delete-btn");

            deleteBtn.addEventListener("click", ()=>{
                deleteFav(index)
            })
            li.appendChild(text);
            li.appendChild(deleteBtn)
            list.appendChild(li)
        })
    })
}

document.getElementById("reset").addEventListener("click", ()=>{
    if(confirm("are you sure you want to delete all?")){
        chrome.storage.local.set({favorites: []}, ()=>{
            loadFavorites();
            alert("favorites cleared")
        })
    }
})

// , 'theme-bold'
const themes = ['default', 'theme-soft', 'theme-techie', 'theme-glam', 'theme-romantic', 'theme-calm'];
// complimentBox.className = themes[Math.floor(Math.random() * themes.length)];
function applyRandomTheme(){
    const compBox = document.getElementById("root");
    themes.forEach(t=>compBox.classList.remove(t))
    const selectedTheme = themes[Math.floor(Math.random() * themes.length)];
  compBox.classList.add(selectedTheme);
}

document.getElementById("theme").addEventListener("click", applyRandomTheme)


const shareBtn = document.getElementById("share");
const popup = document.getElementById("popup")

shareBtn.addEventListener("click", ()=>{
    popup.classList.toggle("hidden");

})

document.addEventListener("click", (e)=>{
    if(!shareBtn.contains(e.target) && !popup.contains(e.target)){
        popup.classList.add("hidden")
    }
})

document.getElementById("copy-btn").addEventListener("click", ()=>{
    const compliment = document.getElementById("comps").textContent;
    navigator.clipboard.writeText(compliment); 
    alert("Copied to clipboard!");
})

document.getElementById("whatsapp-btn").addEventListener("click", ()=>{
    const compliment = document.getElementById("comps").textContent;
    const encoded = encodeURIComponent(compliment);
    window.open(`https://wa.me/?text=${encoded}`, "_blank")
})

document.getElementById("insta-btn").addEventListener("click", ()=>{
    const compliment = document.getElementById("comps").textContent;
    navigator.clipboard.writeText(`🌟 Insta Vibes: ${compliment}`); 
    alert("Copied! Paste in your Insta story caption ✨");
})


document.addEventListener("DOMContentLoaded", () => {
    updateStreak();
  document.getElementById("comps").textContent = getRandomComps();
  loadFavorites()
});