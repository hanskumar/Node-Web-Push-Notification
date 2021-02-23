// Url Encription
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const vapidPublicKey ='BLRDb1JVexAW0TSTBSwl6AsP9I1ISX-lOB6jM3A3GFKek7h1Yu4Y-dE_Mbb4lJzlvPVSN0qljzTP66nOob1Z2S0';
const convertedVapidKey = urlB64ToUint8Array(vapidPublicKey);


// Check for service worker
if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
}


// Register SW, Register Push, Send Push
async function send() {
    // Register Service Worker
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/"
    });

    // Register Push Notification
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey
    });
    console.log("Push Registered...");
  
    // Send Push Notification
    await fetch("/send", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    });
    console.log("Push Sent...");
}
