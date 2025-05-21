import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load external script
    const script = document.createElement('script');
    script.src = "https://stage-widget.intelswift.com/script.js?tenantId=f965d825-f413-4e7d-b14e-c81018e3371b&botId=682d99a03b98d464ef31c200&uuid=e48f7162-888b-4125-9e81-8bd8bd0a699f&end=true";
    script.async = true;
    document.body.appendChild(script);

    // Logic after load
    const onLoad = () => {
      const propsInterval = setInterval(() => {
        const tenantId = localStorage.getItem("wws-tenant-id");
        const botId = localStorage.getItem("wws-bot-id");
        const uuid = localStorage.getItem("wws-uuid");
        const host = window.location.hostname;
        const language = navigator.language || navigator.userLanguage;

        if (
          uuid && uuid !== "undefined" &&
          tenantId && tenantId !== "undefined" &&
          botId && botId !== "undefined" &&
          host && host !== "undefined"
        ) {
          clearInterval(propsInterval);
          const iframe = document.getElementById("iframeWidgetContainer");
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              tenantId,
              botId,
              uuid,
              host,
              contact_language: language
            }, "*");
          }
        }
      }, 1000);
    };

    window.addEventListener('load', onLoad);
    
    return () => {
      window.removeEventListener('load', onLoad);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      {/* Your app content here */}
    </div>
  );
}

export default App;
