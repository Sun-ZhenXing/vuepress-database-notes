import{_ as i,M as p,p as r,q as d,R as s,N as n,V as e,t as a,a1 as l}from"./framework-8980b429.js";const u={},k=s("h1",{id:"q3c-环境搭建和基本使用",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#q3c-环境搭建和基本使用","aria-hidden":"true"},"#"),a(" Q3C 环境搭建和基本使用")],-1),m=s("p",null,"本文介绍 Q3C 环境搭建和基本使用。",-1),b={class:"table-of-contents"},v=s("h2",{id:"_1-q3c-是什么",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-q3c-是什么","aria-hidden":"true"},"#"),a(" 1. Q3C 是什么")],-1),g={class:"hint-container info"},h=s("p",{class:"hint-container-title"},"GIS 和空间数据库相关教程",-1),_={href:"https://malagis.com/the-spatial-database-course-summary.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/segasai/q3c",target:"_blank",rel:"noopener noreferrer"},q=l(`<p>PostGIS 可能是 PostgreSQL 生态下最好的空间数据库插件，而 Q3C 则是一个小众的空间数据库，主要由 C 语言编写，提供了基本的创建空间索引和空间查询函数。</p><p>为了使用 Q3C，你需要安装一个 PostgreSQL（9.1 或更高）。Q3C 1.4.x 支持 PostgreSQL 9.1 以前的版本，如果需要旧版本支持请使用 1.4.x。</p><h2 id="_2-安装-q3c" tabindex="-1"><a class="header-anchor" href="#_2-安装-q3c" aria-hidden="true">#</a> 2. 安装 Q3C</h2><details class="hint-container details"><summary>本文所使用的 Dockerfile</summary><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> postgres:14.7-bullseye</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">&quot;deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib&quot;</span> &gt; /etc/apt/sources.list <span class="token operator">\\</span>
    &amp;&amp; echo <span class="token string">&quot;deb http://mirrors.aliyun.com/debian-security/ bullseye-security main&quot;</span> &gt;&gt; /etc/apt/sources.list <span class="token operator">\\</span>
    &amp;&amp; echo <span class="token string">&quot;deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib&quot;</span> &gt;&gt; /etc/apt/sources.list <span class="token operator">\\</span>
    &amp;&amp; echo <span class="token string">&quot;deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib&quot;</span> &gt;&gt; /etc/apt/sources.list <span class="token operator">\\</span>
    &amp;&amp; apt update <span class="token operator">\\</span>
    &amp;&amp; apt install apt-transport-https ca-certificates -y <span class="token operator">\\</span>
    &amp;&amp; apt install git -y <span class="token operator">\\</span>
    &amp;&amp; apt install build-essential postgresql-server-dev-14 liblz4-dev libreadline-dev zlib1g-dev -y <span class="token operator">\\</span>
    &amp;&amp; git clone https://github.com/segasai/q3c.git <span class="token operator">\\</span>
    &amp;&amp; cd q3c <span class="token operator">\\</span>
    &amp;&amp; make <span class="token operator">\\</span>
    &amp;&amp; make install <span class="token operator">\\</span>
    &amp;&amp; cd .. <span class="token operator">\\</span>
    &amp;&amp; rm -rf q3c <span class="token operator">\\</span>
    &amp;&amp; apt remove build-essential postgresql-server-dev-14 liblz4-dev libreadline-dev zlib1g-dev -y <span class="token operator">\\</span>
    &amp;&amp; apt autoremove -y <span class="token operator">\\</span>
    &amp;&amp; apt clean</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 5432</span>
<span class="token instruction"><span class="token keyword">CMD</span> [ <span class="token string">&quot;postgres&quot;</span> ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> q3c:v1 <span class="token builtin class-name">.</span>
<span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">--name</span> pg_q3c <span class="token punctuation">\\</span>
    <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span>password <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_USER</span><span class="token operator">=</span>postgres <span class="token punctuation">\\</span>
    q3c:v1
</code></pre></div></details><p>下面我们以 PostgreSQL 14.7 示例，我们使用 Docker 创建 PostgreSQL 14.7 环境，如果你已经安装可以跳过 Docker 部分。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull postgres:14.7-bullseye
<span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">--name</span> pg_q3c <span class="token punctuation">\\</span>
    <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span>password <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_USER</span><span class="token operator">=</span>postgres <span class="token punctuation">\\</span>
    postgres:14.7-bullseye

<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pg_q3c <span class="token function">bash</span>
</code></pre></div><p>安装基本工具，确保 <code>apt</code> 可用 HTTPS 通信，如果这一步更新失败或较慢可用更换源：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> update
<span class="token function">apt</span> <span class="token function">install</span> apt-transport-https ca-certificates <span class="token parameter variable">-y</span>
</code></pre></div>`,8),f=l(`<div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> /etc/apt/sources.list /etc/apt/sources.list-bak
<span class="token builtin class-name">echo</span> <span class="token string">&#39;
deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
&#39;</span> <span class="token operator">&gt;</span> /etc/apt/sources.list

<span class="token function">apt</span> update
</code></pre></div><p>下载源代码，并安装编译依赖：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> <span class="token function">git</span>
<span class="token function">git</span> clone https://github.com/segasai/q3c.git
<span class="token function">apt</span> <span class="token function">install</span> build-essential postgresql-server-dev-14 liblz4-dev libreadline-dev zlib1g-dev <span class="token parameter variable">-y</span>
</code></pre></div><p>编译：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> q3c
<span class="token function">make</span>
<span class="token function">make</span> <span class="token function">install</span>
</code></pre></div><p>这一步如果没有出错安装就完成了。</p><p>现在我们检查一下安装效果：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">su</span> postgres
<span class="token builtin class-name">cd</span>
psql
</code></pre></div><p>然后在 PostgreSQL 提供的命令行界面种操作，创建数据库。</p><p>在指定数据库中使用下面的 SQL 来创建插件：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> EXTENSION q3c<span class="token punctuation">;</span>
</code></pre></div><p>Q3C 常见操作：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 在指定数据库中使用 Q3C 插件</span>
<span class="token keyword">CREATE</span> EXTENSION q3c<span class="token punctuation">;</span>

<span class="token comment">-- 查看当前 Q3C 版本</span>
<span class="token keyword">SELECT</span> q3c_version<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 修改当前数据库使用的 Q3C 版本</span>
<span class="token keyword">ALTER</span> EXTENSION q3c <span class="token keyword">UPDATE</span> <span class="token keyword">TO</span> <span class="token string">&#39;A.B.C&#39;</span><span class="token punctuation">;</span>

<span class="token comment">-- 查看系统中安装了哪些 Q3C 版本</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> pg_available_extension_versions <span class="token keyword">WHERE</span> name <span class="token operator">=</span><span class="token string">&#39;q3c&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-开始使用" tabindex="-1"><a class="header-anchor" href="#_3-开始使用" aria-hidden="true">#</a> 3. 开始使用</h2><p>为了开始使用 Q3C 进行搜索和交叉匹配，你应该在你的表中创建索引。</p><p>在这个演示中，我们假设你有一个名为 <code>&quot;mytable&quot;</code> 的表，其中有 <code>&quot;ra&quot;</code> 和 <code>&quot;dec&quot;</code> 列（使用度数表示的赤经和赤纬）。</p><p>首先，你将需要创建空间索引，使用命令。</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> <span class="token keyword">ON</span> mytable <span class="token punctuation">(</span>q3c_ang2ipix<span class="token punctuation">(</span>ra<span class="token punctuation">,</span> <span class="token keyword">dec</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>下一个过程是可选的，但强烈建议：使用新创建的索引对表进行聚簇。聚簇过程是根据 Q3C 空间索引值对磁盘上的数据进行排序的过程，如果你的表非常大，这将确保更快的查询。</p><p>如果数据已经以有序的方式摄入数据库（即沿着球形区域），聚簇步骤可以省略（尽管仍然推荐）。如果你的数据集很大，聚簇步骤可能需要一段时间（几个小时）。</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code>CLUSTER mytable_q3c_ang2ipix_idx <span class="token keyword">ON</span> mytable<span class="token punctuation">;</span>
</code></pre></div><p>另外，你也可以不使用 <code>CLUSTER</code>，而是在建立索引之前自己对表进行重新排序（可能更快）：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> mytable1 <span class="token keyword">AS</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> mytable <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> q3c_ang2ipix<span class="token punctuation">(</span>ra<span class="token punctuation">,</span> <span class="token keyword">dec</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>最后一步是分析你的表：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">ANALYZE</span> mytable<span class="token punctuation">;</span>
</code></pre></div><p>现在你应该能够使用 Q3C 查询了。</p><h2 id="_4-可用函数" tabindex="-1"><a class="header-anchor" href="#_4-可用函数" aria-hidden="true">#</a> 4. 可用函数</h2>`,27);function E(S,x){const t=p("router-link"),o=p("ExternalLinkIcon"),c=p("Badge");return r(),d("div",null,[k,m,s("nav",b,[s("ul",null,[s("li",null,[n(t,{to:"#_1-q3c-是什么"},{default:e(()=>[a("1. Q3C 是什么")]),_:1})]),s("li",null,[n(t,{to:"#_2-安装-q3c"},{default:e(()=>[a("2. 安装 Q3C")]),_:1})]),s("li",null,[n(t,{to:"#_3-开始使用"},{default:e(()=>[a("3. 开始使用")]),_:1})]),s("li",null,[n(t,{to:"#_4-可用函数"},{default:e(()=>[a("4. 可用函数")]),_:1})])])]),v,s("div",g,[h,s("p",null,[a("建议参考 "),s("a",_,[a("《空间数据库》课程整理汇总"),n(o)]),a(" 获得有关 GIS 和空间数据库的相关内容。")])]),s("p",null,[s("a",y,[a("Q3C"),n(o)]),a(" 是由 Sergey Koposov 开发的 PostgreSQL 插件，用于创建空间数据库索引。")]),q,s("p",null,[n(c,{type:"warning"},{default:e(()=>[a("可选")]),_:1}),a(" 更换源（Debian 11 bullseye，阿里云）：")]),f])}const C=i(u,[["render",E],["__file","q3c.html.vue"]]);export{C as default};
