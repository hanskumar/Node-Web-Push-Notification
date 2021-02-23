console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Push Notification using Node.js,Service Worker",
    icon: "https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"
  });
});