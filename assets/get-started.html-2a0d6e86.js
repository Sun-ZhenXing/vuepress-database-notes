import{_ as l,r as t,o as r,c,b as s,a,w as i,d as e,f as p}from"./app-f357348a.js";const d={},_=s("h1",{id:"postgis-入门",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#postgis-入门","aria-hidden":"true"},"#"),e(" PostGIS 入门")],-1),h={class:"table-of-contents"},g=s("h2",{id:"_1-安装-postgis",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-安装-postgis","aria-hidden":"true"},"#"),e(" 1. 安装 PostGIS")],-1),u={href:"https://registry.hub.docker.com/r/postgis/postgis/tags",target:"_blank",rel:"noopener noreferrer"},k=p(`<div class="language-bash" data-ext="sh"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#DCDCAA;">docker</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">pull</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">postgis/postgis:14-3.3-alpine</span></span>
<span class="line"></span></code></pre></div><p>测试 PostgreSQL 安装的 PostGIS 插件版本：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> postgis_full_version();</span></span>
<span class="line"></span></code></pre></div>`,3);function f(x,D){const o=t("router-link"),n=t("ExternalLinkIcon");return r(),c("div",null,[_,s("nav",h,[s("ul",null,[s("li",null,[a(o,{to:"#_1-安装-postgis"},{default:i(()=>[e("1. 安装 PostGIS")]),_:1})])])]),g,s("p",null,[e("安装 PostgreSQL 14 + PostGIS 3.3 的 Docker 版本，可用查看 "),s("a",u,[e("其他可用 tags"),a(n)]),e("。")]),k])}const b=l(d,[["render",f],["__file","get-started.html.vue"]]);export{b as default};