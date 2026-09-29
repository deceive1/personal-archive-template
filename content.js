/*
 * 简历内容入口：示例人物和经历均为虚构，请替换成你自己的资料。
 * 普通文字不支持 HTML；换行使用 \n。可选链接留空即可隐藏。
 * 增删项目、技能、经历等，复制或删除对应数组中的对象即可。
 */
window.resumeContent = {
  profile: {
    name: '林晓',
    englishName: 'LIN XIAO',
    title: '林晓 — 个人档案',
    description: '林晓的示例个人主页，展示专业能力、项目实践与成长经历。',
    logo: 'assets/logo.svg',
    portrait: 'assets/portrait.svg',
    portraitAlt: '通用人物剪影占位图',
    avatar: 'assets/portrait.svg',
    archiveLabel: 'LX / PORTFOLIO',
    status: '持续学习，持续实践',
    headline: '认真理解问题，\n用作品表达自己。',
    introduction: '在学习与实践中积累方法，\n把想法变成清晰、易用的作品。',
    tags: ['产品思考', '前端开发', '团队协作'],
    educationLine: '示例大学 · 计算机科学与技术 · 本科',
    degree: '计算机科学与技术 · 本科',
    school: '示例大学',
    aboutTitle: '在学习与实践之间，\n找到自己的方向。',
    biography: [
      '你好，我是林晓。这是一份虚构的示例档案，用于演示个人简历网站的布局。你可以在内容配置文件中替换姓名、照片、介绍和经历。',
      '这里可以介绍你的专业背景、关注领域，以及形成这些兴趣的经历。相比罗列形容词，更适合写清楚你做过什么、负责什么。',
      '最后补充你希望继续探索的方向，或你能够为团队带来的具体价值。下面的项目与数据同样是演示内容。'
    ],
    footerNote: '保持好奇，继续实践。'
  },
  overview: [
    { label: '01 / THINKING', title: '理解问题', text: '用户需求 · 信息整理 · 方案设计', foot: '从具体场景出发', href: '#skills' },
    { label: '02 / BUILDING', title: '完成作品', text: '网站开发 · 交互设计 · 工具实践', foot: '用作品记录成长', href: '#projects' },
    { label: '03 / LEARNING', title: '持续学习', text: '课程实践 · 团队合作 · 经验分享', foot: '在协作中积累经验', href: '#education' }
  ],
  facts: [
    { value: '04', unit: '个', label: '示例项目', note: '请填写可核实的个人成果' },
    { value: '02', unit: '段', label: '示例实践', note: '请替换为真实经历' },
    { value: '01', unit: '项', label: '学习方向', note: '展示你专注的领域' },
    { value: '∞', unit: '', label: '保持学习', note: '数字与说明均可自由修改' }
  ],
  skills: [
    { label: '01 / PRODUCT', symbol: '↗', title: '需求与设计', summary: '从场景和目标出发，整理需要解决的问题。', items: ['用户需求梳理', '信息架构设计', '原型与流程表达', '反馈收集与迭代'], href: '#projects' },
    { label: '02 / TEAMWORK', symbol: '⊞', title: '组织与协作', summary: '拆解任务、同步进度，在共同目标下推进工作。', items: ['任务拆解与分工', '项目进度沟通', '文档整理', '团队成果汇报'], href: '#experience' },
    { label: '03 / DEVELOPMENT', symbol: '⌘', title: '前端开发', summary: '用清晰的结构和交互实现可用的页面。', items: ['HTML / CSS / JavaScript', '响应式布局', '浏览器调试', '可访问性基础'], href: '#projects' },
    { label: '04 / EXPLORATION', symbol: '⌁', title: '学习与探索', summary: '通过小型实践验证思路，并记录过程与收获。', items: ['资料检索与学习', '问题分析', '版本管理基础', '实践复盘'], href: '#education' }
  ],
  // category 必须对应 categories 中的 id。保留 all 作为“全部”的专用值。
  categories: [{ id: 'web', label: '网站与工具' }, { id: 'design', label: '设计与探索' }],
  // art 可选 oa / timer / home / lock，仅决定抽象封面的样式。
  // links 示例：[['在线演示', 'https://example.com'], ['源代码', 'https://github.com/你的账号/仓库']]
  projects: [
    { id: 'portfolio', category: 'web', art: 'oa', coverLabel: 'PERSONAL WEBSITE', coverWord: 'WEB',
      date: '20XX.03 — 20XX.06', role: '个人练习', title: '个人作品集网站',
      summary: '示例：整理个人介绍、项目与联系方式，制作适配桌面和手机的作品集页面。',
      tags: ['响应式布局', '静态网站'],
      details: [['项目背景', '说明项目为什么开始，以及希望解决的问题。'], ['我的工作', '描述自己负责的需求、设计、开发或协作部分。'], ['实践结果', '填写真实成果与验证方式；没有数据时可以描述可展示的交付物。']],
      links: [] },
    { id: 'taskboard', category: 'web', art: 'timer', coverLabel: 'PRODUCTIVITY TOOL', coverWord: 'PLAN',
      date: '20XX.07 — 20XX.08', role: '课程练习', title: '轻量任务看板',
      summary: '示例：围绕个人任务整理场景，探索分类、优先级与进度展示。',
      tags: ['交互设计', 'JavaScript'],
      details: [['使用场景', '说明目标用户和具体使用环境。'], ['实现思路', '介绍任务拆解、交互流程和关键技术选择。'], ['学习收获', '记录遇到的问题、解决方法及后续改进方向。']],
      links: [] },
    { id: 'library', category: 'design', art: 'home', coverLabel: 'INFORMATION DESIGN', coverWord: 'READ',
      date: '20XX · 团队实践', role: '协作成员', title: '校园阅读空间提案',
      summary: '示例：通过访谈与信息整理，设计更清晰的阅读空间导览方案。',
      tags: ['用户调研', '信息设计'],
      details: [['问题与目标', '介绍调研中发现的问题以及项目目标。'], ['个人贡献', '明确你在团队中承担的职责和交付内容。'], ['成果展示', '介绍提案、原型或报告，避免把团队全部成果写成个人贡献。']],
      links: [] },
    { id: 'dashboard', category: 'design', art: 'lock', coverLabel: 'DATA EXPLORATION', coverWord: 'DATA',
      date: '20XX · 自主学习', role: '独立实践', title: '学习记录可视化',
      summary: '示例：将学习记录整理为图表，观察投入节奏并复盘学习计划。',
      tags: ['数据整理', '可视化'],
      details: [['实践内容', '概述数据来源、整理方式与展示思路。'], ['学习收获', '说明通过这个项目掌握了哪些方法。']],
      links: [] }
  ],
  experience: [
    { date: '20XX.06 — 20XX.09', location: '示例城市', organization: '示例科技公司', role: '前端实习生（虚构示例）',
      summary: '参与团队页面开发与日常维护，在实际任务中练习需求理解、编码和沟通。',
      details: [['页面开发', '根据设计与需求完成页面，处理常见屏幕尺寸下的布局。'], ['团队协作', '整理问题清单，参与评审并跟进反馈。'], ['经验积累', '请替换为你实际完成的工作及可核实的成果。']] },
    { date: '20XX.03 — 20XX.05', location: '示例城市', organization: '校园实践团队', role: '项目成员（虚构示例）',
      summary: '围绕课程目标参与分工协作，整理资料、制作方案并完成成果汇报。', details: [] }
  ],
  education: {
    period: '20XX — 20XX', school: '示例大学', degree: '计算机科学与技术 · 本科', code: 'LEARN',
    activities: [
      { title: '课程学习 · 专业基础', text: '列出与你求职方向相关的课程、研究领域或学习成果。' },
      { title: '社团实践 · 组织与协作', text: '介绍在社团或志愿活动中承担的任务与收获。' },
      { title: '团队项目 · 从方案到汇报', text: '描述你如何与同伴分工、处理问题并完成交付。' }
    ]
  },
  honors: {
    featured: { label: '20XX / 示例奖项', title: '校园创新实践展示', description: '示例荣誉，请替换为自己的真实奖项。' },
    items: [ { title: '专业能力认证', detail: '示例认证' }, { title: '优秀志愿者', detail: '20XX' }, { title: '课程项目展示', detail: '示例荣誉' } ]
  },
  contact: {
    headline: '关于下一步，\n一起聊聊。',
    description: '欢迎交流工作机会、项目合作，\n或分享一个值得尝试的想法。',
    email: 'hello@example.com', // 占位邮箱，请替换；留空隐藏整行。
    phone: '', // 可选，例如国际区号与手机号；留空隐藏。
    github: '', // 你的公开 GitHub 主页或仓库链接；留空隐藏。
    // 不附带任何真实简历。放入文件后添加条目；支持一份或多份。
    // { title: '通用简历', description: '个人经历与项目精选', file: 'resumes/resume.pdf', downloadName: 'resume.pdf' }
    resumes: []
  }
};
