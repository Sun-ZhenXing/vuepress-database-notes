import{_ as o,r as e,o as D,c,b as s,a as l,w as p,d as a,f as r}from"./app-f357348a.js";const t={},y=s("h1",{id:"mysql-8-0-递归查询",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#mysql-8-0-递归查询","aria-hidden":"true"},"#"),a(" MySQL 8.0+ 递归查询")],-1),i={class:"table-of-contents"},d=r(`<h2 id="_1-cte-递归查询" tabindex="-1"><a class="header-anchor" href="#_1-cte-递归查询" aria-hidden="true">#</a> 1. CTE 递归查询</h2><p>使用 CTE（公共表达式）查询：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">WITH</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">RECURSIVE</span><span style="color:#D4D4D4;"> cte_count(n) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">UNION ALL</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> n + </span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> cte_count </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> n &lt; </span><span style="color:#B5CEA8;">10</span></span>
<span class="line"><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> n </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> cte_count;</span></span>
<span class="line"></span></code></pre></div><p>其中 <code>(n)</code> 为查询列，不写为初始查询的字段。</p><p>第一个查询为初始查询，<code>UNION ALL</code> 为查询关系，第二个查询为递归过程。</p><p>递归的限制：</p><ul><li><code>cte_max_recursion_depth</code>：参数默认值为 <code>1000</code>，限制 CTE 递归深度，超过阈值，将被强制终止</li><li><code>max_execution_time</code>：参数限制查询的最大执行时间，超过该时间，也将被强制终止</li></ul><p>查看当前最大递归深度：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> @@cte_max_recursion_depth;</span></span>
<span class="line"></span></code></pre></div><h2 id="_2-使用示例" tabindex="-1"><a class="header-anchor" href="#_2-使用示例" aria-hidden="true">#</a> 2. 使用示例</h2><h3 id="_2-1-斐波那契数列" tabindex="-1"><a class="header-anchor" href="#_2-1-斐波那契数列" aria-hidden="true">#</a> 2.1 斐波那契数列</h3><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">WITH</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">RECURSIVE</span><span style="color:#D4D4D4;"> factorial(n, fact) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">, </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">UNION ALL</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> n + </span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">, fact * (n + </span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> factorial </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> n &lt; </span><span style="color:#B5CEA8;">20</span></span>
<span class="line"><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> * </span><span style="color:#569CD6;">from</span><span style="color:#D4D4D4;"> factorial;</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-2-递归向下查询" tabindex="-1"><a class="header-anchor" href="#_2-2-递归向下查询" aria-hidden="true">#</a> 2.2 递归向下查询</h3><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">WITH</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">RECURSIVE</span><span style="color:#D4D4D4;"> rec </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> A.* </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> m_catalogue </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> A </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> A.</span><span style="color:#CE9178;">\`name\`</span><span style="color:#D4D4D4;"> = </span><span style="color:#CE9178;">&#39;抱枕&#39;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">UNION ALL</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> B.* </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> m_catalogue </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> B, rec </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> B.father_id = rec.id</span></span>
<span class="line"><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> * </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> rec;</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-3-递归向上查询" tabindex="-1"><a class="header-anchor" href="#_2-3-递归向上查询" aria-hidden="true">#</a> 2.3 递归向上查询</h3><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">WITH</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">RECURSIVE</span><span style="color:#D4D4D4;"> rec </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> A.* </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> m_catalogue </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> A </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> A.</span><span style="color:#CE9178;">\`name\`</span><span style="color:#D4D4D4;"> = </span><span style="color:#CE9178;">&#39;方形小抱枕&#39;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">UNION ALL</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> B.* </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> m_catalogue </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> B, rec </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> B.id = rec.father_id</span></span>
<span class="line"><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> * </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> rec;</span></span>
<span class="line"></span></code></pre></div><p>这个时候如果需要不包含递归的初始查询就比较麻烦，MySQL 不支持差集（MINUS）操作，使用左连接来模拟：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">WITH</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">RECURSIVE</span><span style="color:#D4D4D4;"> rec </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> A.* </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> m_catalogue </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> A </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> A.</span><span style="color:#CE9178;">\`name\`</span><span style="color:#D4D4D4;"> = </span><span style="color:#CE9178;">&#39;抱枕&#39;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">UNION ALL</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> B.* </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> m_catalogue </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> B, rec </span><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> B.father_id = rec.id</span></span>
<span class="line"><span style="color:#D4D4D4;">) </span></span>
<span class="line"><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> * </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> * </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> rec</span></span>
<span class="line"><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> A</span></span>
<span class="line"><span style="color:#569CD6;">LEFT JOIN</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">SELECT</span><span style="color:#D4D4D4;"> * </span><span style="color:#569CD6;">FROM</span><span style="color:#D4D4D4;"> rec</span></span>
<span class="line"><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">AS</span><span style="color:#D4D4D4;"> B </span><span style="color:#569CD6;">ON</span><span style="color:#D4D4D4;"> A.id = B.id </span><span style="color:#569CD6;">AND</span><span style="color:#D4D4D4;"> B.</span><span style="color:#CE9178;">\`name\`</span><span style="color:#D4D4D4;"> = </span><span style="color:#CE9178;">&#39;抱枕&#39;</span></span>
<span class="line"><span style="color:#569CD6;">WHERE</span><span style="color:#D4D4D4;"> B.id </span><span style="color:#569CD6;">IS</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">NULL</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还是在逻辑层面去除比较好，数据库就不引入复杂的逻辑了。</p>`,19);function C(E,u){const n=e("router-link");return D(),c("div",null,[y,s("nav",i,[s("ul",null,[s("li",null,[l(n,{to:"#_1-cte-递归查询"},{default:p(()=>[a("1. CTE 递归查询")]),_:1})]),s("li",null,[l(n,{to:"#_2-使用示例"},{default:p(()=>[a("2. 使用示例")]),_:1}),s("ul",null,[s("li",null,[l(n,{to:"#_2-1-斐波那契数列"},{default:p(()=>[a("2.1 斐波那契数列")]),_:1})]),s("li",null,[l(n,{to:"#_2-2-递归向下查询"},{default:p(()=>[a("2.2 递归向下查询")]),_:1})]),s("li",null,[l(n,{to:"#_2-3-递归向上查询"},{default:p(()=>[a("2.3 递归向上查询")]),_:1})])])])])]),d])}const h=o(t,[["render",C],["__file","recursion.html.vue"]]);export{h as default};
