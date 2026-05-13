(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function l(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=l(s);fetch(s.href,o)}})();const u={uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",lowercase:"abcdefghijklmnopqrstuvwxyz",numbers:"0123456789",symbols:"!@#$%^&*()_+-=[]{}|;:,.<>?"};function T(t){const{length:e,includeUppercase:l,includeLowercase:a,includeNumbers:s,includeSymbols:o}=t;let c="";const i=[];l&&(c+=u.uppercase,i.push(g(u.uppercase))),a&&(c+=u.lowercase,i.push(g(u.lowercase))),s&&(c+=u.numbers,i.push(g(u.numbers))),o&&(c+=u.symbols,i.push(g(u.symbols))),c.length===0&&(c=u.lowercase);let r="";const d=e-i.length;for(let p=0;p<d;p++)r+=g(c);for(const p of i){const m=Math.floor(Math.random()*(r.length+1));r=r.slice(0,m)+p+r.slice(m)}return r}function g(t){const e=new Uint32Array(1);return crypto.getRandomValues(e),t[e[0]%t.length]}function A(t){let e=0;const l=[],a=Math.min(t.length*4,40);e+=a,t.length<8?l.push("建议密码长度至少8位"):t.length<12&&l.push("建议密码长度增加到12位以上");let s=0;/[a-z]/.test(t)&&(s+=7),/[A-Z]/.test(t)&&(s+=8),/[0-9]/.test(t)&&(s+=7),/[^a-zA-Z0-9]/.test(t)&&(s+=8),e+=s,/[a-z]/.test(t)||l.push("添加小写字母增强强度"),/[A-Z]/.test(t)||l.push("添加大写字母增强强度"),/[0-9]/.test(t)||l.push("添加数字增强强度"),/[^a-zA-Z0-9]/.test(t)||l.push("添加特殊符号增强强度");const o=new Set(t.split("")).size,c=Math.min(o*2,30);e+=c,/(.)\1{2,}/.test(t)&&(e-=10,l.push("避免连续重复字符")),/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(t)&&(e-=5,l.push("避免连续字母序列")),/(?:012|123|234|345|456|567|678|789|890)/.test(t)&&(e-=5,l.push("避免连续数字序列")),e=Math.max(0,Math.min(100,e));let i,r,d;return e<40?(i="weak",r="弱",d="#ef4444"):e<60?(i="medium",r="中等",d="#f59e0b"):e<80?(i="strong",r="强",d="#10b981"):(i="very-strong",r="非常强",d="#06b6d4"),{level:i,score:e,label:r,color:d,suggestions:l.slice(0,3)}}async function M(t){try{return await navigator.clipboard.writeText(t),!0}catch{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{return document.execCommand("copy"),document.body.removeChild(e),!0}catch{return document.body.removeChild(e),!1}}}function N(){const t=document.querySelector(".copy-toast");t&&t.remove();const e=document.createElement("div");e.className="copy-toast",e.textContent="✓ 密码已复制到剪贴板",document.body.appendChild(e),requestAnimationFrame(()=>{e.classList.add("show")}),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},2500)}function P(){const t=document.getElementById("app");if(!t){console.error("App element not found");return}let e={length:16,includeUppercase:!0,includeLowercase:!0,includeNumbers:!0,includeSymbols:!0},l="";t.innerHTML=`
    <div class="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div class="w-full max-w-2xl">
        <!-- 标题区域 -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="indicator-light" style="color: var(--amber-primary);"></div>
            <h1 class="text-3xl md:text-4xl font-bold" style="color: var(--amber-light); font-family: 'Inter', sans-serif;">
              安全密码生成器
            </h1>
            <div class="indicator-light" style="color: var(--amber-primary);"></div>
          </div>
          <p class="text-base" style="color: var(--muted-foreground);">
            生成高强度随机密码，保护您的账户安全
          </p>
        </div>
        
        <!-- 主卡片 -->
        <div class="card mb-6">
          <!-- 密码显示区 -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-3" style="color: var(--muted-foreground);">
              生成的密码
            </label>
            <div class="password-display" id="passwordDisplay">
              <span id="passwordText" style="color: var(--amber-light);">点击生成按钮开始</span>
            </div>
          </div>
          
          <!-- 强度指示器 -->
          <div class="mb-6" id="strengthSection" style="display: none;">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm" style="color: var(--muted-foreground);">密码强度</span>
              <span class="text-sm font-medium" id="strengthLabel">--</span>
            </div>
            <div class="strength-bar">
              <div class="strength-fill" id="strengthFill" style="width: 0%;"></div>
            </div>
            <div id="suggestionsContainer" class="mt-3 text-sm" style="color: var(--muted-foreground);"></div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex gap-3">
            <button class="btn-primary flex-1" id="generateBtn">
              <span class="flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                生成密码
              </span>
            </button>
            <button class="btn-secondary" id="copyBtn" disabled>
              <span class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                复制
              </span>
            </button>
          </div>
        </div>
        
        <!-- 配置卡片 -->
        <div class="card">
          <h2 class="text-lg font-semibold mb-6" style="color: var(--foreground);">密码配置</h2>
          
          <!-- 长度设置 -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-medium" style="color: var(--muted-foreground);">密码长度</label>
              <span class="text-lg font-mono font-bold" id="lengthValue" style="color: var(--amber-primary);">16</span>
            </div>
            <input 
              type="range" 
              id="lengthSlider" 
              min="8" 
              max="64" 
              value="16" 
              class="w-full"
            />
            <div class="flex justify-between text-xs mt-1" style="color: var(--muted-foreground);">
              <span>8位</span>
              <span>64位</span>
            </div>
          </div>
          
          <!-- 字符类型选择 -->
          <div>
            <label class="block text-sm font-medium mb-3" style="color: var(--muted-foreground);">
              字符类型
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label class="char-type-label selected" id="uppercaseLabel">
                <label class="checkbox-wrapper">
                  <input type="checkbox" id="uppercase" checked />
                  <span class="checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                </label>
                <div>
                  <div class="font-medium">大写字母</div>
                  <div class="text-xs font-mono" style="color: var(--muted-foreground);">A-Z</div>
                </div>
              </label>
              
              <label class="char-type-label selected" id="lowercaseLabel">
                <label class="checkbox-wrapper">
                  <input type="checkbox" id="lowercase" checked />
                  <span class="checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                </label>
                <div>
                  <div class="font-medium">小写字母</div>
                  <div class="text-xs font-mono" style="color: var(--muted-foreground);">a-z</div>
                </div>
              </label>
              
              <label class="char-type-label selected" id="numbersLabel">
                <label class="checkbox-wrapper">
                  <input type="checkbox" id="numbers" checked />
                  <span class="checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                </label>
                <div>
                  <div class="font-medium">数字</div>
                  <div class="text-xs font-mono" style="color: var(--muted-foreground);">0-9</div>
                </div>
              </label>
              
              <label class="char-type-label selected" id="symbolsLabel">
                <label class="checkbox-wrapper">
                  <input type="checkbox" id="symbols" checked />
                  <span class="checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                </label>
                <div>
                  <div class="font-medium">特殊符号</div>
                  <div class="text-xs font-mono" style="color: var(--muted-foreground);">!@#$%^&*</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- 页脚 -->
        <div class="text-center mt-6 text-sm" style="color: var(--muted-foreground);">
          <p>使用加密安全随机数生成器 • 本地生成，不上传服务器</p>
        </div>
      </div>
    </div>
  `;const a=document.getElementById("passwordText"),s=document.getElementById("strengthSection"),o=document.getElementById("strengthFill"),c=document.getElementById("strengthLabel"),i=document.getElementById("suggestionsContainer"),r=document.getElementById("lengthSlider"),d=document.getElementById("lengthValue"),p=document.getElementById("generateBtn"),m=document.getElementById("copyBtn"),y=document.getElementById("uppercase"),f=document.getElementById("lowercase"),b=document.getElementById("numbers"),v=document.getElementById("symbols"),L=document.getElementById("uppercaseLabel"),E=document.getElementById("lowercaseLabel"),B=document.getElementById("numbersLabel"),C=document.getElementById("symbolsLabel");function I(){e={length:parseInt(r.value,10),includeUppercase:y.checked,includeLowercase:f.checked,includeNumbers:b.checked,includeSymbols:v.checked}}function k(){L.classList.toggle("selected",y.checked),E.classList.toggle("selected",f.checked),B.classList.toggle("selected",b.checked),C.classList.toggle("selected",v.checked)}function S(n){s.style.display="block",o.style.width=`${n.score}%`,o.style.background=n.color,c.textContent=`${n.label} (${n.score}分)`,c.style.color=n.color,n.suggestions.length>0?i.innerHTML=n.suggestions.map(h=>`<div class="flex items-center gap-2"><span>•</span><span>${h}</span></div>`).join(""):i.innerHTML='<div class="flex items-center gap-2" style="color: var(--success);"><span>✓</span><span>密码强度良好</span></div>'}function x(){I(),!e.includeUppercase&&!e.includeLowercase&&!e.includeNumbers&&!e.includeSymbols&&(e.includeLowercase=!0,f.checked=!0,k()),l=T(e),a.textContent=l,a.style.color="var(--amber-light)";const n=A(l);S(n),m.disabled=!1,a.style.opacity="0",a.style.transform="translateY(-10px)",requestAnimationFrame(()=>{a.style.transition="all 0.3s ease",a.style.opacity="1",a.style.transform="translateY(0)"})}async function w(){if(!l)return;await M(l)&&(N(),m.style.transform="scale(0.95)",setTimeout(()=>{m.style.transform="scale(1)"},150))}p.addEventListener("click",x),m.addEventListener("click",w),r.addEventListener("input",()=>{d.textContent=r.value}),[y,f,b,v].forEach(n=>{n.addEventListener("change",()=>{k(),l&&x()})}),document.addEventListener("keydown",n=>{if((n.ctrlKey||n.metaKey)&&n.key==="g"&&(n.preventDefault(),x()),(n.ctrlKey||n.metaKey)&&n.key==="c"&&l){const h=document.activeElement;h?.tagName!=="INPUT"&&h?.tagName!=="TEXTAREA"&&w()}})}P();
