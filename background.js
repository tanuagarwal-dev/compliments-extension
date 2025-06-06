const compliments = [
  "You're the reason this extension glows 💡",
  "You’re worth every line of this code 💖",
  "You're like an import statement — essential.",
  "Even console.log() would print your beauty 😍"
];

const getCompliment= async()=>{
  try {
    const response = await fetch('http://localhost:5000/alarm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json(); 

    return data.compliment || 'Oops! Try again.';
  } catch {
    return 'Error fetching compliment.';
  }
}

async function showNotification() {
  const genCompliment = await getCompliment()
  const compliment = compliments[Math.floor(Math.random() * compliments.length)];
chrome.notifications.create('', {
  type: 'basic',
  iconUrl: chrome.runtime.getURL("icons8-cute-48.png"),
  title: 'Heya Baby!',
  message: genCompliment
}, (notificationId) => {
  console.log("Notification shown with ID:", notificationId);
});

}

// On extension install
chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker active & alarm set!");

 
  chrome.alarms.create("dailyCompliment", {
    periodInMinutes: 360  
  });

  // Immediately show one compliment on install for dev testing
  showNotification();
});

// When the alarm fires
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyCompliment") {
    console.log("Alarm triggered, sending compliment");
    showNotification();
  }
});
