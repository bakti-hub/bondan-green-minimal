/* Bondan Green navigation and small enhancements — no framework dependency */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (toggle && nav) {
    // Toggle menu saat button diklik
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Mencegah event bubbling
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-active", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup navigasi" : "Buka navigasi");
    });

    // Tutup menu saat klik link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka navigasi");
      });
    });

    // Tutup menu saat klik di luar area menu
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka navigasi");
      }
    });

    // Tutup menu saat tekan Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka navigasi");
        toggle.focus();
      }
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});

/* Smart Green Sideyard MVP dashboard */
document.addEventListener("DOMContentLoaded", () => {
 const $=id=>document.getElementById(id), history=[], limits={ph:[5.5,6.5],tds:[560,840],temp:[20,30]}, names={ph:"pH",tds:"TDS (ppm)",temp:"Suhu (°C)"};
 let current={ph:6.2,tds:840,temp:25.4};
 const time=()=>new Date().toLocaleString("id-ID",{dateStyle:"medium",timeStyle:"short"});
 const record=()=>history.push({...current,time:new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})});
 function chart(){const k=$("mvpChartParam").value,v=history.map(x=>x[k]);$("mvpLegend").textContent=names[k];$("mvpHistoryCount").textContent=history.length+" pembacaan";if(v.length<2){$("mvpChart").innerHTML='<text x="320" y="95" text-anchor="middle" fill="#68716a" font-size="12">Grafik menunggu pembacaan.</text>';return}const lo=Math.min(...v),hi=Math.max(...v),span=hi-lo||1,x=i=>28+i*584/(v.length-1),y=n=>160-(n-lo)/span*120,pts=v.map((n,i)=>x(i)+","+y(n)).join(" "),grid=[40,80,120,160].map(n=>'<line x1="28" y1="'+n+'" x2="612" y2="'+n+'" stroke="#e7eae3"/>').join("");$("mvpChart").innerHTML=grid+'<polyline points="'+pts+'" fill="none" stroke="#66866c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+v.map((n,i)=>'<circle cx="'+x(i)+'" cy="'+y(n)+'" r="3" fill="#66866c"/>').join("")+'<text x="28" y="183" fill="#68716a" font-size="10">'+history[0].time+'</text><text x="612" y="183" text-anchor="end" fill="#68716a" font-size="10">'+history[history.length-1].time+'</text>'}
 function render(){const warnings=[];Object.keys(limits).forEach(k=>{const val=current[k],[lo,hi]=limits[k],bad=val<lo||val>hi,cap=k[0].toUpperCase()+k.slice(1);$("mvp"+cap).textContent=k==="tds"?Math.round(val):val.toFixed(1);$("mvp"+cap+"State").textContent=bad?"Periksa":"Demo";$("mvp"+cap+"Hint").textContent=bad?"Di luar rentang":"Dalam rentang";$("mvp"+cap+"Meter").style.width=Math.max(2,Math.min(100,val/(k==="tds"?1500:k==="temp"?50:14)*100))+"%";$("mvpCard"+cap).classList.toggle("is-warning",bad);if(bad)warnings.push(k)});$("mvpAlerts").innerHTML=warnings.length?warnings.map(k=>'<div class="mvp-alert-item"><span class="alert-mark">!</span><div><strong>'+names[k]+' di luar rentang contoh</strong>Periksa sensor dan larutan secara manual.</div></div>').join(""):'<p>✓ Tidak ada parameter yang melewati rentang contoh.</p>';$("mvpUpdated").textContent=time();chart()}
 function refresh(){current={ph:+(5.9+Math.random()*.8).toFixed(2),tds:Math.round(650+Math.random()*230),temp:+(24+Math.random()*3).toFixed(1)};record();render();$("mvpStatusTitle").textContent="Dashboard diperbarui dalam mode demo";$("mvpStatusText").textContent="Angka acak untuk demonstrasi antarmuka, bukan data sensor nyata."}
 for(let i=0;i<6;i++){current={ph:+(6.05+i*.025).toFixed(2),tds:790+i*8,temp:+(25.1+i*.1).toFixed(1)};record()}
 $("mvpRefresh").addEventListener("click",refresh);$("mvpChartParam").addEventListener("change",chart);render();
});

/* Feature menu and lightweight in-page route for the monitoring screen */
document.addEventListener("DOMContentLoaded", () => {
  const dropdown=document.querySelector(".nav-dropdown");
  const toggle=document.querySelector(".nav-dropdown-toggle");
  const menu=document.querySelector("#feature-menu");
  const monitoring=document.querySelector("#monitoring");
  const mainSections=[...document.querySelectorAll("main > section")];
  function route(){
    const isMonitoring=location.hash==="#monitoring";
    document.body.classList.toggle("monitoring-view",isMonitoring);
    if(isMonitoring){
      document.title="Monitoring Hidroponik — Bondan Green";
      if(monitoring) window.scrollTo({top:0,behavior:"smooth"});
    }else{
      document.title="Bondan Green — Smart Green Sideyard";
    }
    if(dropdown){dropdown.classList.remove("is-open");toggle?.setAttribute("aria-expanded","false")}
  }
  if(dropdown&&toggle&&menu){
    toggle.addEventListener("click",event=>{
      event.stopPropagation();
      const open=dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded",String(open));
    });
    document.addEventListener("click",event=>{
      if(!dropdown.contains(event.target)){dropdown.classList.remove("is-open");toggle.setAttribute("aria-expanded","false")}
    });
    document.addEventListener("keydown",event=>{
      if(event.key==="Escape"){dropdown.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.focus()}
    });
    menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{dropdown.classList.remove("is-open");toggle.setAttribute("aria-expanded","false")}));
  }
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener("click",()=>{
      const target=link.getAttribute("href");
      if(target && target!=="#monitoring"){
        document.body.classList.remove("monitoring-view");
        document.title="Bondan Green — Smart Green Sideyard";
      }
    });
  });
  window.addEventListener("hashchange",route);
  route();
});
