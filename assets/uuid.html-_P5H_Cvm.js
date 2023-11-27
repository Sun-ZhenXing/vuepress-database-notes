import{_ as o,r as p,o as c,c as t,b as s,a as n,w as e,d as a,e as r}from"./app-Y4KcrCk8.js";const d={},D=s("h1",{id:"uuid",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#uuid","aria-hidden":"true"},"#"),a(" UUID")],-1),i={class:"table-of-contents"},u=r(`<h2 id="1-uuid-函数" tabindex="-1"><a class="header-anchor" href="#1-uuid-函数" aria-hidden="true">#</a> 1. UUID 函数</h2><p><code>UUID()</code> 返回一个 UUID 字符串：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> UUID();</span></span>
<span class="line"></span></code></pre></div><p><code>UUID_SHORT()</code> 返回一个 <code>short</code>（2 字节）整数 UUID：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> UUID_SHORT();</span></span>
<span class="line"></span></code></pre></div><h2 id="2-mysql-80-新特性" tabindex="-1"><a class="header-anchor" href="#2-mysql-80-新特性" aria-hidden="true">#</a> 2. MySQL 8.0 新特性</h2><p>MySQL 8.0 支持新的函数：</p><ul><li><code>UUID_TO_BIN()</code></li><li><code>BIN_TO_UUID()</code></li><li><code>IS_UUID()</code></li></ul><p>将 UUID 转换为二进制数据：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> UUID_TO_BIN(UUID());</span></span>
<span class="line"></span></code></pre></div><p>例如 <code>m_user</code> 表的主键是二进制的 UUID，查询二进制存储的 UUID：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> BIN_TO_UUID(id) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> ID, </span><span style="color:#CE9178;">\`username\`</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">\`m_user\`</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span></code></pre></div><p>检测字符串是否满足 UUID：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> IS_UUID(</span><span style="color:#CE9178;">&#39;{12345678-1234-5678-1234-567812345678}&#39;</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> A,</span></span>
<span class="line"><span style="color:#D4D4D4;">       IS_UUID(</span><span style="color:#CE9178;">&#39;12345678123456781234567812345678&#39;</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> B,</span></span>
<span class="line"><span style="color:#D4D4D4;">       IS_UUID(</span><span style="color:#CE9178;">&#39;12345678-1234-5678-1234-567812345678&#39;</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> C;</span></span>
<span class="line"></span></code></pre></div><p>结果：</p><div class="language-console" data-ext="console"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">+------+------+------+</span></span>
<span class="line"><span style="color:#D4D4D4;">| A    | B    | C    |</span></span>
<span class="line"><span style="color:#D4D4D4;">+------+------+------+</span></span>
<span class="line"><span style="color:#D4D4D4;">|    1 |    1 |    1 |</span></span>
<span class="line"><span style="color:#D4D4D4;">+------+------+------+</span></span>
<span class="line"></span></code></pre></div>`,16);function y(U,_){const l=p("router-link");return c(),t("div",null,[D,s("nav",i,[s("ul",null,[s("li",null,[n(l,{to:"#1-uuid-函数"},{default:e(()=>[a("1. UUID 函数")]),_:1})]),s("li",null,[n(l,{to:"#2-mysql-80-新特性"},{default:e(()=>[a("2. MySQL 8.0 新特性")]),_:1})])])]),u])}const h=o(d,[["render",y],["__file","uuid.html.vue"]]);export{h as default};