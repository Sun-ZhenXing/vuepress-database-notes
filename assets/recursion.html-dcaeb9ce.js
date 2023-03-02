import{_ as o,M as t,p as c,q as l,R as s,N as e,V as p,t as n,a1 as k}from"./framework-8980b429.js";const r={},d=s("h1",{id:"mysql-8-0-递归查询",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#mysql-8-0-递归查询","aria-hidden":"true"},"#"),n(" MySQL 8.0+ 递归查询")],-1),u={class:"table-of-contents"},i=k(`<h2 id="_1-cte-递归查询" tabindex="-1"><a class="header-anchor" href="#_1-cte-递归查询" aria-hidden="true">#</a> 1. CTE 递归查询</h2><p>使用 CTE（公共表达式）查询：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">WITH</span> RECURSIVE cte_count<span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token number">1</span>
    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
    <span class="token keyword">SELECT</span> n <span class="token operator">+</span> <span class="token number">1</span> <span class="token keyword">FROM</span> cte_count <span class="token keyword">WHERE</span> n <span class="token operator">&lt;</span> <span class="token number">10</span>
<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> n <span class="token keyword">FROM</span> cte_count<span class="token punctuation">;</span>
</code></pre></div><p>其中 <code>(n)</code> 为查询列，不写为初始查询的字段。</p><p>第一个查询为初始查询，<code>UNION ALL</code> 为查询关系，第二个查询为递归过程。</p><p>递归的限制：</p><ul><li><code>cte_max_recursion_depth</code>：参数默认值为 <code>1000</code>，限制 CTE 递归深度，超过阈值，将被强制终止</li><li><code>max_execution_time</code>：参数限制查询的最大执行时间，超过该时间，也将被强制终止</li></ul><p>查看当前最大递归深度：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> @<span class="token variable">@cte_max_recursion_depth</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="_2-使用示例" tabindex="-1"><a class="header-anchor" href="#_2-使用示例" aria-hidden="true">#</a> 2. 使用示例</h2><h3 id="_2-1-斐波那契数列" tabindex="-1"><a class="header-anchor" href="#_2-1-斐波那契数列" aria-hidden="true">#</a> 2.1 斐波那契数列</h3><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">WITH</span> RECURSIVE factorial<span class="token punctuation">(</span>n<span class="token punctuation">,</span> fact<span class="token punctuation">)</span> <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span>
    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
    <span class="token keyword">SELECT</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> fact <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> factorial <span class="token keyword">WHERE</span> n <span class="token operator">&lt;</span> <span class="token number">20</span>
<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> factorial<span class="token punctuation">;</span>
</code></pre></div><h3 id="_2-2-递归向下查询" tabindex="-1"><a class="header-anchor" href="#_2-2-递归向下查询" aria-hidden="true">#</a> 2.2 递归向下查询</h3><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">WITH</span> RECURSIVE rec <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> A<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> m_catalogue <span class="token keyword">AS</span> A <span class="token keyword">WHERE</span> A<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token string">&#39;抱枕&#39;</span>
    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
    <span class="token keyword">SELECT</span> B<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> m_catalogue <span class="token keyword">AS</span> B<span class="token punctuation">,</span> rec <span class="token keyword">WHERE</span> B<span class="token punctuation">.</span>father_id <span class="token operator">=</span> rec<span class="token punctuation">.</span>id
<span class="token punctuation">)</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> rec<span class="token punctuation">;</span>
</code></pre></div><h3 id="_2-3-递归向上查询" tabindex="-1"><a class="header-anchor" href="#_2-3-递归向上查询" aria-hidden="true">#</a> 2.3 递归向上查询</h3><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">WITH</span> RECURSIVE rec <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> A<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> m_catalogue <span class="token keyword">AS</span> A <span class="token keyword">WHERE</span> A<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token string">&#39;方形小抱枕&#39;</span>
    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
    <span class="token keyword">SELECT</span> B<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> m_catalogue <span class="token keyword">AS</span> B<span class="token punctuation">,</span> rec <span class="token keyword">WHERE</span> B<span class="token punctuation">.</span>id <span class="token operator">=</span> rec<span class="token punctuation">.</span>father_id
<span class="token punctuation">)</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> rec<span class="token punctuation">;</span>
</code></pre></div><p>这个时候如果需要不包含递归的初始查询就比较麻烦，MySQL 不支持差集（MINUS）操作，使用左连接来模拟：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">WITH</span> RECURSIVE rec <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> A<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> m_catalogue <span class="token keyword">AS</span> A <span class="token keyword">WHERE</span> A<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token string">&#39;抱枕&#39;</span>
    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
    <span class="token keyword">SELECT</span> B<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> m_catalogue <span class="token keyword">AS</span> B<span class="token punctuation">,</span> rec <span class="token keyword">WHERE</span> B<span class="token punctuation">.</span>father_id <span class="token operator">=</span> rec<span class="token punctuation">.</span>id
<span class="token punctuation">)</span> 
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> rec
<span class="token punctuation">)</span> <span class="token keyword">AS</span> A
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> rec
<span class="token punctuation">)</span> <span class="token keyword">AS</span> B <span class="token keyword">ON</span> A<span class="token punctuation">.</span>id <span class="token operator">=</span> B<span class="token punctuation">.</span>id <span class="token operator">AND</span> B<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token string">&#39;抱枕&#39;</span>
<span class="token keyword">WHERE</span> B<span class="token punctuation">.</span>id <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还是在逻辑层面去除比较好，数据库就不引入复杂的逻辑了。</p>`,19);function y(w,E){const a=t("router-link");return c(),l("div",null,[d,s("nav",u,[s("ul",null,[s("li",null,[e(a,{to:"#_1-cte-递归查询"},{default:p(()=>[n("1. CTE 递归查询")]),_:1})]),s("li",null,[e(a,{to:"#_2-使用示例"},{default:p(()=>[n("2. 使用示例")]),_:1}),s("ul",null,[s("li",null,[e(a,{to:"#_2-1-斐波那契数列"},{default:p(()=>[n("2.1 斐波那契数列")]),_:1})]),s("li",null,[e(a,{to:"#_2-2-递归向下查询"},{default:p(()=>[n("2.2 递归向下查询")]),_:1})]),s("li",null,[e(a,{to:"#_2-3-递归向上查询"},{default:p(()=>[n("2.3 递归向上查询")]),_:1})])])])])]),i])}const h=o(r,[["render",y],["__file","recursion.html.vue"]]);export{h as default};
