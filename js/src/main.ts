import { Hterm } from "./hterm";
import { Xterm } from "./xterm";
import { Terminal, WebTTY, protocols } from "./webtty";
import { ConnectionFactory } from "./websocket";

// @TODO remove these
declare var gotty_auth_token: string;
declare var gotty_term: string;

const elem = document.getElementById("terminal")
const action = document.getElementById("action")

if (elem !== null) {
    var term: Terminal;
    if (gotty_term == "hterm") {
        term = new Hterm(elem);
    } else {
        term = new Xterm(elem);
    }
    const httpsEnabled = window.location.protocol == "https:";
    //const url = (httpsEnabled ? 'wss://' : 'ws://') + window.location.host + window.location.pathname + 'ws';
    const url = (httpsEnabled ? 'wss://' : 'ws://') + window.location.host + window.location.pathname + 'ws/?param='+encodeURIComponent(window.location.href);
    const args = window.location.search;
    const factory = new ConnectionFactory(url, protocols);
   var  wt = new WebTTY(term, factory, args, gotty_auth_token);
   var   closer = wt.open();
    if (action!==null ) {
    action.onclick=function() {
      if (action.getAttribute("value")=="pause") {
      closer();
       var st='font-family: "DejaVu Sans Mono", "Everson Mono", FreeMono, Menlo, Terminal, monospace, "Apple Symbols";border-radius: 15px; font-size: xx-large; color: black; background: white; opacity: 0.75; padding: 0.2em 0.5em 0.2em 0.5em; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); user-select: none; transition: opacity 180ms ease-in;display: none;'
       action.setAttribute("value","restart")
      document.getElementsByClassName('xterm-overlay')[0].setAttribute('style',st)
      } else {

       var st='font-family: "DejaVu Sans Mono", "Everson Mono", FreeMono, Menlo, Terminal, monospace, "Apple Symbols";border-radius: 15px; font-size: xx-large; color: black; background: white; opacity: 0.75; padding: 0.2em 0.5em 0.2em 0.5em; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); user-select: none; transition: opacity 180ms ease-in;display: none;'
    wt = new WebTTY(term, factory, args, gotty_auth_token);
    closer = wt.open();
       action.setAttribute("value","pause")
      document.getElementsByClassName('xterm-overlay')[0].setAttribute('style',st)
      }

   }
   }

    window.addEventListener("unload", () => {
        closer();
        term.close();
    });
};
